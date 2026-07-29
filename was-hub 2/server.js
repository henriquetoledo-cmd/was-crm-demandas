// WAS — servidor local, sem dependências externas.
// Rodar com: node server.js
// Abrir: http://localhost:4000 (interno) | http://localhost:4000/portal (cliente)

const http = require('http');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const url = require('url');

const PORT = process.env.PORT || 4000;
const DATA_FILE = path.join(__dirname, 'data', 'db.json');
const PUBLIC_DIR = path.join(__dirname, 'public');

const CLIENT_COLOR_PALETTE = ['blue', 'green', 'yellow', 'purple', 'pink', 'orange', 'brown', 'red', 'gray'];

// Roster real de clientes (puxado da propriedade "Projeto" da base ENTREGAS DESIGN - WAS no Notion)
const REAL_CLIENTS = [
  { name: 'WAS (interno)', color: 'blue' },
  { name: 'Baile do Addam', color: 'green' },
  { name: 'Lucato', color: 'yellow' },
  { name: 'LMA Group', color: 'blue' },
  { name: 'Resenha 3 (LMA)', color: 'brown' },
  { name: 'Yardz', color: 'pink' },
  { name: 'Talents', color: 'orange' },
  { name: 'Lofy', color: 'gray' },
  { name: 'Chuvisco', color: 'gray' },
  { name: 'Por Ai App', color: 'gray' },
  { name: 'Hubla', color: 'gray' },
  { name: 'Guiza', color: 'gray' },
  { name: 'Pagorun', color: 'gray' },
  { name: 'Bruno Diegues', color: 'gray' },
  { name: 'Pagode do Kimzão', color: 'gray' },
  { name: 'Marmee', color: 'gray' },
  { name: 'Wigoo', color: 'gray' },
  { name: 'Dra. Ana', color: 'gray' },
  { name: 'Arena Litoral', color: 'gray' },
  { name: 'Fisio G', color: 'gray' },
  { name: 'Dr. Luis Plumacher', color: 'gray' },
  { name: 'Toledo Odontologia', color: 'gray' },
  { name: 'Toy Forma', color: 'gray' },
  { name: 'Bitez', color: 'gray' },
  { name: 'T Dreams', color: 'gray' },
  { name: 'T Brands', color: 'gray' },
  { name: 'BREX', color: 'gray' },
  { name: 'Canopus', color: 'default' },
];

// Equipe real da WAS.
const REAL_TEAM = [
  { name: 'Henrique', roles: ['Coringa'] },
  { name: 'Vitória', roles: ['Coringa'] },
  { name: 'Rebecca', roles: ['Social Media'] },
  { name: 'Lucas', roles: ['Social Media', 'Designer'] },
  { name: 'Enzo', roles: ['Filmmaker'] },
  { name: 'Giuseppe', roles: ['Designer'] },
  { name: 'Giovanne', roles: ['Designer'] },
  { name: 'Rennan', roles: ['Designer'] },
];

// Páginas padrão criadas automaticamente para cada cliente.
// "Calendário de Entrega" é do tipo 'calendar' — não é editada manualmente,
// e sim gerada ao vivo a partir das demandas do cliente (prazo designer / prazo final).
const DEFAULT_PAGES = [
  { title: 'Calendário de Entrega', type: 'calendar' },
  { title: 'Planejamento', type: 'page' },
  { title: 'Brand Guide', type: 'page' },
  { title: 'Relatórios de Desempenho', type: 'page' },
];

const STATUS_RENAME = { nao_utilizado: 'arquivado' };

// ---------- Persistência ----------
function emptyTenant(name, slug) {
  return {
    id: id(), name, slug, plan: 'free', created_at: new Date().toISOString(),
    users: [], clients: [], demands: [], strategies: [], pages: [], team: [],
    automations: [], customColumns: [], viewPrefs: { tableColumnOrder: [] },
  };
}

function emptyDB() {
  return { tenants: {} };
}

function ensureTenantShape(t) {
  if (!t.pages) t.pages = [];
  if (!t.clients) t.clients = [];
  if (!t.demands) t.demands = [];
  if (!t.strategies) t.strategies = [];
  if (!t.team) t.team = [];
  if (!t.automations) t.automations = [];
  if (!t.customColumns) t.customColumns = [];
  if (!t.viewPrefs) t.viewPrefs = { tableColumnOrder: [] };
  if (!t.users) t.users = [];
  if (!t.plan) t.plan = 'free';
}

function loadDB() {
  let db;
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    db = emptyDB();
  } else {
    db = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }
  if (!db.tenants) db.tenants = {};

  // migração: arquivo do formato antigo (single-tenant, sem "tenants") vira o tenant "was"
  if (Array.isArray(db.clients) || Array.isArray(db.demands) || Array.isArray(db.team)) {
    const legacy = {
      id: 'was', name: 'We Are Sinergy', slug: 'was', plan: 'agency', created_at: new Date().toISOString(),
      users: [],
      clients: db.clients || [], demands: db.demands || [], strategies: db.strategies || [], pages: db.pages || [],
      team: db.team || [], automations: db.automations || [], customColumns: db.customColumns || [],
      viewPrefs: db.viewPrefs || { tableColumnOrder: [] },
    };
    delete db.clients; delete db.demands; delete db.strategies; delete db.pages; delete db.team;
    delete db.automations; delete db.customColumns; delete db.viewPrefs;
    db.tenants.was = legacy;
  }

  if (!db.tenants.was) {
    db.tenants.was = emptyTenant('We Are Sinergy', 'was');
    db.tenants.was.id = 'was';
    db.tenants.was.plan = 'agency';
  }

  // roster/equipe real da WAS — só é aplicado ao tenant "was", nunca a tenants criados via cadastro público
  ensureTenantShape(db.tenants.was);
  ensureRoster(db.tenants.was);
  ensureTeam(db.tenants.was);

  Object.values(db.tenants).forEach((t) => {
    ensureTenantShape(t);
    ensureDefaultPagesForAllClients(t);
    migrateStatuses(t);
    ensureUsersFromTeam(t); // garante login individual (senha padrão 1234) pra cada membro da equipe
  });

  saveDB(db); // idempotente — garante que o arquivo sempre existe, mesmo na primeira vez
  return db;
}

function saveDB(db) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

// ---------- Autenticação ----------
function hashPassword(password) {
  return crypto.createHash('sha256').update('was-hub-salt-v1:' + password).digest('hex');
}

function verifyPassword(password, hash) {
  return hashPassword(password) === hash;
}

function ensureUsersFromTeam(tenant) {
  const existingNames = new Set(tenant.users.map((u) => u.name.trim().toLowerCase()));
  tenant.team.forEach((t) => {
    if (existingNames.has(t.name.trim().toLowerCase())) return;
    tenant.users.push({
      id: id(),
      name: t.name,
      email: null,
      passwordHash: hashPassword('1234'),
      role: (t.roles || []).includes('Coringa') ? 'admin' : 'member',
      team_member_id: t.id,
      created_at: new Date().toISOString(),
    });
  });
}

const sessions = new Map(); // token -> { tenantId, userId, createdAt }

function parseCookies(req) {
  const header = req.headers.cookie;
  const out = {};
  if (!header) return out;
  header.split(';').forEach((pair) => {
    const idx = pair.indexOf('=');
    if (idx === -1) return;
    out[pair.slice(0, idx).trim()] = decodeURIComponent(pair.slice(idx + 1).trim());
  });
  return out;
}

function getSession(req) {
  const token = parseCookies(req).was_session;
  if (!token) return null;
  const sess = sessions.get(token);
  if (!sess) return null;
  return { token, ...sess };
}

function createSession(tenantId, userId) {
  const token = crypto.randomBytes(24).toString('hex');
  sessions.set(token, { tenantId, userId, createdAt: Date.now() });
  return token;
}

function setSessionCookie(res, token) {
  const maxAge = 60 * 60 * 24 * 30;
  res.setHeader('Set-Cookie', `was_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}`);
}

function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', 'was_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0');
}

function publicUser(u, tenant) {
  return { id: u.id, name: u.name, email: u.email, role: u.role, tenantId: tenant.id, tenantName: tenant.name, tenantSlug: tenant.slug, tenantPlan: tenant.plan };
}

function id() {
  return crypto.randomBytes(6).toString('hex');
}

function slugify(str) {
  const diacritics = /[\u0300-\u036f]/g;
  const base = str
    .toLowerCase()
    .normalize('NFD')
    .replace(diacritics, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
  return base + '-' + id().slice(0, 4);
}

function createDefaultPages(db, clientId) {
  DEFAULT_PAGES.forEach((def, i) => {
    db.pages.push({
      id: id(),
      client_id: clientId,
      parent_id: null,
      type: def.type,
      title: def.title,
      content: '',
      order: i,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  });
}

function ensureRoster(db) {
  const existingNames = new Set(db.clients.map((c) => c.name.trim().toLowerCase()));
  REAL_CLIENTS.forEach((rc) => {
    if (existingNames.has(rc.name.trim().toLowerCase())) return;
    const client = {
      id: id(),
      name: rc.name,
      segment: '',
      status: 'ativo',
      contact_name: '',
      contact_email: '',
      notes: '',
      color: rc.color,
      portal_slug: slugify(rc.name),
      created_at: new Date().toISOString(),
    };
    db.clients.push(client);
    createDefaultPages(db, client.id);
  });
}

function ensureTeam(db) {
  const existingNames = new Set(db.team.map((t) => t.name.trim().toLowerCase()));
  REAL_TEAM.forEach((rt) => {
    if (existingNames.has(rt.name.trim().toLowerCase())) return;
    db.team.push({
      id: id(),
      name: rt.name,
      roles: rt.roles,
      active: true,
      created_at: new Date().toISOString(),
    });
  });
}

function ensureDefaultPagesForAllClients(db) {
  // migração: a antiga página combinada vira "Brand Guide" (novo padrão de 4 seções)
  db.pages.forEach((p) => { if (p.title === 'Brand Guide e Acessos') p.title = 'Brand Guide'; });
  db.clients.forEach((c) => {
    const rootPages = db.pages.filter((p) => p.client_id === c.id && !p.parent_id);
    const rootTitles = new Set(rootPages.map((p) => p.title));
    const startOrder = rootPages.length;
    DEFAULT_PAGES.forEach((def, i) => {
      if (rootTitles.has(def.title)) return;
      db.pages.push({
        id: id(),
        client_id: c.id,
        parent_id: null,
        type: def.type,
        title: def.title,
        content: '',
        order: startOrder + i,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      });
    });
    // Migração: páginas "Calendário de Entrega" criadas antes de existir o tipo 'calendar'
    db.pages.forEach((p) => {
      if (p.client_id === c.id && p.title === 'Calendário de Entrega' && p.type !== 'calendar') {
        p.type = 'calendar';
      }
    });
  });
}

function migrateStatuses(db) {
  db.demands.forEach((d) => {
    if (STATUS_RENAME[d.status]) d.status = STATUS_RENAME[d.status];
  });
}

// ---------- Automações ----------
// Regras simples, avaliadas de forma síncrona sempre que uma demanda é criada/atualizada.
// trigger: { field: 'status'|'client_id'|'format'|'platform', op: 'equals'|'contains', value }
// action:  { field: 'responsible'|'priority'|'status', value }
function matchTrigger(demand, trigger) {
  if (!trigger) return false;
  const fieldValue = demand[trigger.field];
  if (trigger.op === 'contains') {
    return Array.isArray(fieldValue) && fieldValue.includes(trigger.value);
  }
  return fieldValue === trigger.value;
}

function applyAutomations(db, demand) {
  (db.automations || []).forEach((auto) => {
    if (!auto.active) return;
    if (auto.kind === 'deadline' || auto.kind === 'weekly_summary' || auto.kind === 'stage_alert') return; // alertas (prazo, resumo semanal, mudanca de fase) sao so informativos, nao alteram campos
    if (matchTrigger(demand, auto.trigger)) {
      demand[auto.action.field] = auto.action.value;
    }
  });
  return demand;
}

// ---------- Helpers HTTP ----------
function sendJSON(res, status, data) {
  const body = JSON.stringify(data);
  res.writeHead(status, {
    'Content-Type': 'application/json; charset=utf-8',
    'Content-Length': Buffer.byteLength(body),
  });
  res.end(body);
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf-8');
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', reject);
  });
}

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg': 'image/svg+xml',
};

function serveStatic(req, res, pathname) {
  let filePath = pathname === '/' ? '/index.html' : pathname;
  if (filePath === '/portal') filePath = '/portal.html';
  if (filePath === '/login') filePath = '/login.html';
  if (filePath === '/signup') filePath = '/signup.html';
  filePath = path.join(PUBLIC_DIR, filePath);

  if (!filePath.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    return res.end('Forbidden');
  }

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain' });
      return res.end('Not found');
    }
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream' });
    res.end(content);
  });
}

// ---------- API ----------
async function handleAPI(req, res, pathname, query) {
  const root = loadDB();
  const method = req.method;
  const parts = pathname.split('/').filter(Boolean); // ['api','clients', ':id']
  const resource = parts[1]; // clients | demands | strategies | pages | team | automations | portal | auth
  const resId = parts[2];

  try {
    // ---- PORTAL (leitura pública, filtrada por slug do cliente — procura em todos os tenants) ----
    if (resource === 'portal' && method === 'GET') {
      const slug = resId;
      let client = null, tenant = null;
      for (const t of Object.values(root.tenants)) {
        const c = t.clients.find((c) => c.portal_slug === slug);
        if (c) { client = c; tenant = t; break; }
      }
      if (!client) return sendJSON(res, 404, { error: 'Cliente não encontrado' });
      const demands = tenant.demands.filter((d) => d.client_id === client.id && d.visible_to_client && d.status !== 'arquivado');
      const strategies = tenant.strategies.filter((s) => s.client_id === client.id && s.visible_to_client);
      return sendJSON(res, 200, { client, demands, strategies });
    }

    // ---- AUTH (login / logout / cadastro público / usuário atual) ----
    if (resource === 'auth') {
      if (resId === 'login' && method === 'POST') {
        const body = await readBody(req);
        const email = (body.email || '').trim().toLowerCase();
        const password = body.password || '';
        let found = null, foundTenant = null;
        for (const t of Object.values(root.tenants)) {
          const u = t.users.find((u) => u.name.trim().toLowerCase() === email || (u.email || '').trim().toLowerCase() === email);
          if (u) { found = u; foundTenant = t; break; }
        }
        if (!found || !verifyPassword(password, found.passwordHash)) {
          return sendJSON(res, 401, { error: 'E-mail/usuário ou senha inválidos' });
        }
        const token = createSession(foundTenant.id, found.id);
        setSessionCookie(res, token);
        return sendJSON(res, 200, { user: publicUser(found, foundTenant) });
      }
      if (resId === 'logout' && method === 'POST') {
        const session = getSession(req);
        if (session) sessions.delete(session.token);
        clearSessionCookie(res);
        return sendJSON(res, 200, { ok: true });
      }
      if (resId === 'signup' && method === 'POST') {
        const body = await readBody(req);
        const companyName = (body.companyName || '').trim();
        const userName = (body.userName || '').trim();
        const email = (body.email || '').trim().toLowerCase();
        const password = body.password || '';
        if (!companyName || !userName || !email || !password) {
          return sendJSON(res, 400, { error: 'Preencha todos os campos.' });
        }
        if (password.length < 4) {
          return sendJSON(res, 400, { error: 'A senha precisa ter pelo menos 4 caracteres.' });
        }
        const emailTaken = Object.values(root.tenants).some((t) => t.users.some((u) => (u.email || '').trim().toLowerCase() === email));
        if (emailTaken) return sendJSON(res, 400, { error: 'Já existe uma conta com esse e-mail.' });

        const tenant = emptyTenant(companyName, slugify(companyName));
        tenant.plan = 'free';
        const user = {
          id: id(), name: userName, email, passwordHash: hashPassword(password), role: 'admin',
          team_member_id: null, created_at: new Date().toISOString(),
        };
        const member = { id: id(), name: userName, roles: ['Coringa'], active: true, created_at: new Date().toISOString() };
        user.team_member_id = member.id;
        tenant.team.push(member);
        tenant.users.push(user);
        root.tenants[tenant.id] = tenant;
        saveDB(root);

        const token = createSession(tenant.id, user.id);
        setSessionCookie(res, token);
        return sendJSON(res, 201, { user: publicUser(user, tenant) });
      }
      if (resId === 'me' && method === 'GET') {
        const session = getSession(req);
        if (!session || !root.tenants[session.tenantId]) return sendJSON(res, 401, { error: 'Não autenticado' });
        const tenant = root.tenants[session.tenantId];
        const user = tenant.users.find((u) => u.id === session.userId);
        if (!user) return sendJSON(res, 401, { error: 'Não autenticado' });
        return sendJSON(res, 200, { user: publicUser(user, tenant) });
      }
      return sendJSON(res, 404, { error: 'Rota de autenticação não encontrada' });
    }

    // ---- a partir daqui, toda rota exige sessão válida ----
    const session = getSession(req);
    if (!session || !root.tenants[session.tenantId]) {
      return sendJSON(res, 401, { error: 'Não autenticado' });
    }
    const db = root.tenants[session.tenantId];

    // ---- CLIENTS ----
    if (resource === 'clients') {
      if (method === 'GET' && !resId) return sendJSON(res, 200, db.clients);
      if (method === 'POST') {
        const body = await readBody(req);
        const client = {
          id: id(),
          name: body.name || 'Sem nome',
          segment: body.segment || '',
          status: body.status || 'ativo',
          contact_name: body.contact_name || '',
          contact_email: body.contact_email || '',
          notes: body.notes || '',
          color: CLIENT_COLOR_PALETTE[db.clients.length % CLIENT_COLOR_PALETTE.length],
          portal_slug: slugify(body.name || 'cliente'),
          created_at: new Date().toISOString(),
        };
        db.clients.push(client);
        createDefaultPages(db, client.id);
        saveDB(root);
        return sendJSON(res, 201, client);
      }
      if (method === 'PUT' && resId) {
        const idx = db.clients.findIndex((c) => c.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        db.clients[idx] = { ...db.clients[idx], ...body, id: resId };
        saveDB(root);
        return sendJSON(res, 200, db.clients[idx]);
      }
      if (method === 'DELETE' && resId) {
        db.clients = db.clients.filter((c) => c.id !== resId);
        db.demands = db.demands.filter((d) => d.client_id !== resId);
        db.strategies = db.strategies.filter((s) => s.client_id !== resId);
        db.pages = db.pages.filter((p) => p.client_id !== resId);
        saveDB(root);
        return sendJSON(res, 200, { ok: true });
      }
    }

    // ---- TEAM (equipe WAS) ----
    if (resource === 'team') {
      if (method === 'GET' && !resId) return sendJSON(res, 200, db.team);
      if (method === 'POST') {
        const body = await readBody(req);
        const member = {
          id: id(),
          name: body.name || 'Sem nome',
          roles: Array.isArray(body.roles) ? body.roles : [],
          active: body.active === undefined ? true : !!body.active,
          created_at: new Date().toISOString(),
        };
        db.team.push(member);
        saveDB(root);
        return sendJSON(res, 201, member);
      }
      if (method === 'PUT' && resId) {
        const idx = db.team.findIndex((t) => t.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        db.team[idx] = { ...db.team[idx], ...body, id: resId };
        saveDB(root);
        return sendJSON(res, 200, db.team[idx]);
      }
      if (method === 'DELETE' && resId) {
        db.team = db.team.filter((t) => t.id !== resId);
        saveDB(root);
        return sendJSON(res, 200, { ok: true });
      }
    }

    // ---- AUTOMATIONS ----
    if (resource === 'automations') {
      if (method === 'GET' && !resId) return sendJSON(res, 200, db.automations);
      if (method === 'POST') {
        const body = await readBody(req);
        const auto = {
          id: id(),
          name: body.name || 'Automação',
          kind: body.kind || 'field',
          active: body.active === undefined ? true : !!body.active,
          trigger: body.trigger || {},
          action: body.action || {},
          created_at: new Date().toISOString(),
        };
        db.automations.push(auto);
        saveDB(root);
        return sendJSON(res, 201, auto);
      }
      if (method === 'PUT' && resId) {
        const idx = db.automations.findIndex((a) => a.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        db.automations[idx] = { ...db.automations[idx], ...body, id: resId };
        saveDB(root);
        return sendJSON(res, 200, db.automations[idx]);
      }
      if (method === 'DELETE' && resId) {
        db.automations = db.automations.filter((a) => a.id !== resId);
        saveDB(root);
        return sendJSON(res, 200, { ok: true });
      }
    }

    // ---- PAGES (documentos/pastas por cliente, estilo Notion) ----
    if (resource === 'pages') {
      if (method === 'GET' && !resId) {
        let list = db.pages;
        if (query.client_id) list = list.filter((p) => p.client_id === query.client_id);
        return sendJSON(res, 200, list);
      }
      if (method === 'POST') {
        const body = await readBody(req);
        const page = {
          id: id(),
          client_id: body.client_id,
          parent_id: body.parent_id || null,
          type: body.type === 'folder' ? 'folder' : 'page',
          title: body.title || (body.type === 'folder' ? 'Nova pasta' : 'Nova página'),
          content: body.content || '',
          order: db.pages.filter((p) => p.client_id === body.client_id && p.parent_id === (body.parent_id || null)).length,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
        db.pages.push(page);
        saveDB(root);
        return sendJSON(res, 201, page);
      }
      if (method === 'PUT' && resId) {
        const idx = db.pages.findIndex((p) => p.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        db.pages[idx] = { ...db.pages[idx], ...body, id: resId, updated_at: new Date().toISOString() };
        saveDB(root);
        return sendJSON(res, 200, db.pages[idx]);
      }
      if (method === 'DELETE' && resId) {
        const toDelete = new Set([resId]);
        let added = true;
        while (added) {
          added = false;
          db.pages.forEach((p) => {
            if (p.parent_id && toDelete.has(p.parent_id) && !toDelete.has(p.id)) {
              toDelete.add(p.id);
              added = true;
            }
          });
        }
        db.pages = db.pages.filter((p) => !toDelete.has(p.id));
        saveDB(root);
        return sendJSON(res, 200, { ok: true });
      }
    }

    // ---- DEMANDS ----
    if (resource === 'demands') {
      if (method === 'GET' && !resId) {
        let list = db.demands;
        if (query.client_id) list = list.filter((d) => d.client_id === query.client_id);
        return sendJSON(res, 200, list);
      }
      if (method === 'POST') {
        const body = await readBody(req);
        let demand = {
          id: id(),
          client_id: body.client_id,
          title: body.title || 'Sem título',
          description: body.description || '',
          briefing: body.briefing || '',
          format: Array.isArray(body.format) ? body.format : [],
          platform: Array.isArray(body.platform) ? body.platform : [],
          status: body.status || 'em_briefing',
          needs_capture: body.needs_capture === undefined ? true : !!body.needs_capture,
          capture_date: body.capture_date || '',
          prazo_designer: body.prazo_designer || '',
          prazo_final: body.prazo_final || '',
          responsible: body.responsible || '',
          priority: body.priority || 'normal',
          forecast: body.forecast || 'prevista',
          refacao: body.refacao || '',
          visible_to_client: !!body.visible_to_client,
          link: body.link || '',
          custom_fields: (body.custom_fields && typeof body.custom_fields === 'object') ? body.custom_fields : {},
          created_at: new Date().toISOString(),
        };
        demand = applyAutomations(db, demand);
        db.demands.push(demand);
        saveDB(root);
        return sendJSON(res, 201, demand);
      }
      if (method === 'PUT' && resId) {
        const idx = db.demands.findIndex((d) => d.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        // custom_fields é mesclado (não substituído), pra edições em colunas diferentes não se apagarem
        const mergedCustom = { ...(db.demands[idx].custom_fields || {}), ...(body.custom_fields || {}) };
        let demand = { ...db.demands[idx], ...body, id: resId, custom_fields: mergedCustom };
        demand = applyAutomations(db, demand);
        db.demands[idx] = demand;
        saveDB(root);
        return sendJSON(res, 200, db.demands[idx]);
      }
      if (method === 'DELETE' && resId) {
        db.demands = db.demands.filter((d) => d.id !== resId);
        saveDB(root);
        return sendJSON(res, 200, { ok: true });
      }
    }

    // ---- STRATEGIES ----
    if (resource === 'strategies') {
      if (method === 'GET' && !resId) {
        let list = db.strategies;
        if (query.client_id) list = list.filter((s) => s.client_id === query.client_id);
        return sendJSON(res, 200, list);
      }
      if (method === 'POST') {
        const body = await readBody(req);
        const strat = {
          id: id(),
          client_id: body.client_id,
          title: body.title || 'Sem título',
          period: body.period || '',
          content: body.content || '',
          visible_to_client: !!body.visible_to_client,
          updated_at: new Date().toISOString(),
        };
        db.strategies.push(strat);
        saveDB(root);
        return sendJSON(res, 201, strat);
      }
      if (method === 'PUT' && resId) {
        const idx = db.strategies.findIndex((s) => s.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        db.strategies[idx] = { ...db.strategies[idx], ...body, id: resId, updated_at: new Date().toISOString() };
        saveDB(root);
        return sendJSON(res, 200, db.strategies[idx]);
      }
      if (method === 'DELETE' && resId) {
        db.strategies = db.strategies.filter((s) => s.id !== resId);
        saveDB(root);
        return sendJSON(res, 200, { ok: true });
      }
    }

    // ---- CUSTOM COLUMNS (colunas criadas pelo usuário na tabela de demandas) ----
    if (resource === 'custom-columns') {
      if (method === 'GET' && !resId) return sendJSON(res, 200, db.customColumns);
      if (method === 'POST') {
        const body = await readBody(req);
        const validTypes = ['text', 'select', 'multi', 'date', 'number', 'checkbox'];
        const type = validTypes.includes(body.type) ? body.type : 'text';
        const col = {
          id: id(),
          name: (body.name || 'Nova coluna').trim() || 'Nova coluna',
          type,
          options: Array.isArray(body.options) ? body.options : [],
          created_at: new Date().toISOString(),
        };
        db.customColumns.push(col);
        db.viewPrefs.tableColumnOrder.push(col.id);
        saveDB(root);
        return sendJSON(res, 201, col);
      }
      if (method === 'PUT' && resId) {
        const idx = db.customColumns.findIndex((c) => c.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        db.customColumns[idx] = { ...db.customColumns[idx], ...body, id: resId };
        saveDB(root);
        return sendJSON(res, 200, db.customColumns[idx]);
      }
      if (method === 'DELETE' && resId) {
        db.customColumns = db.customColumns.filter((c) => c.id !== resId);
        db.viewPrefs.tableColumnOrder = db.viewPrefs.tableColumnOrder.filter((cid) => cid !== resId);
        db.demands.forEach((d) => { if (d.custom_fields) delete d.custom_fields[resId]; });
        saveDB(root);
        return sendJSON(res, 200, { ok: true });
      }
    }

    // ---- VIEW PREFS (ordem das colunas da tabela, etc. — preferências salvas) ----
    if (resource === 'view-prefs') {
      if (method === 'GET' && !resId) return sendJSON(res, 200, db.viewPrefs);
      if (method === 'PUT' && !resId) {
        const body = await readBody(req);
        db.viewPrefs = { ...db.viewPrefs, ...body };
        saveDB(root);
        return sendJSON(res, 200, db.viewPrefs);
      }
    }

    return sendJSON(res, 404, { error: 'Rota não encontrada' });
  } catch (e) {
    return sendJSON(res, 500, { error: e.message });
  }
}

// ---------- Server ----------
const server = http.createServer(async (req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  if (pathname.startsWith('/api/')) {
    return handleAPI(req, res, pathname, parsed.query);
  }
  return serveStatic(req, res, pathname);
});

server.listen(PORT, () => {
  console.log(`WAS rodando em http://localhost:${PORT}`);
  console.log(`Portal do cliente em http://localhost:${PORT}/portal?slug=SEU_SLUG`);
});
