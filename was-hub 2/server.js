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
function emptyDB() {
  return { clients: [], demands: [], strategies: [], pages: [], team: [], automations: [], customColumns: [], viewPrefs: { tableColumnOrder: [] } };
}

function loadDB() {
  let db;
  if (!fs.existsSync(DATA_FILE)) {
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    db = emptyDB();
  } else {
    db = JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  }
  if (!db.pages) db.pages = [];
  if (!db.clients) db.clients = [];
  if (!db.demands) db.demands = [];
  if (!db.strategies) db.strategies = [];
  if (!db.team) db.team = [];
  if (!db.automations) db.automations = [];
  if (!db.customColumns) db.customColumns = [];
  if (!db.viewPrefs) db.viewPrefs = { tableColumnOrder: [] };

  ensureRoster(db);
  ensureTeam(db);
  ensureDefaultPagesForAllClients(db);
  migrateStatuses(db);
  saveDB(db); // idempotente — garante que o arquivo sempre existe, mesmo na primeira vez
  return db;
}

function saveDB(db) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
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
    if (auto.kind === 'deadline' || auto.kind === 'weekly_summary') return; // alertas de prazo e resumo semanal sao so informativos, nao alteram campos
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
  const db = loadDB();
  const method = req.method;
  const parts = pathname.split('/').filter(Boolean); // ['api','clients', ':id']
  const resource = parts[1]; // clients | demands | strategies | pages | team | automations | portal
  const resId = parts[2];

  try {
    // ---- PORTAL (leitura, filtrada por slug do cliente) ----
    if (resource === 'portal' && method === 'GET') {
      const slug = resId;
      const client = db.clients.find((c) => c.portal_slug === slug);
      if (!client) return sendJSON(res, 404, { error: 'Cliente não encontrado' });
      const demands = db.demands.filter((d) => d.client_id === client.id && d.visible_to_client && d.status !== 'arquivado');
      const strategies = db.strategies.filter((s) => s.client_id === client.id && s.visible_to_client);
      return sendJSON(res, 200, { client, demands, strategies });
    }

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
        saveDB(db);
        return sendJSON(res, 201, client);
      }
      if (method === 'PUT' && resId) {
        const idx = db.clients.findIndex((c) => c.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        db.clients[idx] = { ...db.clients[idx], ...body, id: resId };
        saveDB(db);
        return sendJSON(res, 200, db.clients[idx]);
      }
      if (method === 'DELETE' && resId) {
        db.clients = db.clients.filter((c) => c.id !== resId);
        db.demands = db.demands.filter((d) => d.client_id !== resId);
        db.strategies = db.strategies.filter((s) => s.client_id !== resId);
        db.pages = db.pages.filter((p) => p.client_id !== resId);
        saveDB(db);
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
        saveDB(db);
        return sendJSON(res, 201, member);
      }
      if (method === 'PUT' && resId) {
        const idx = db.team.findIndex((t) => t.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        db.team[idx] = { ...db.team[idx], ...body, id: resId };
        saveDB(db);
        return sendJSON(res, 200, db.team[idx]);
      }
      if (method === 'DELETE' && resId) {
        db.team = db.team.filter((t) => t.id !== resId);
        saveDB(db);
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
        saveDB(db);
        return sendJSON(res, 201, auto);
      }
      if (method === 'PUT' && resId) {
        const idx = db.automations.findIndex((a) => a.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        db.automations[idx] = { ...db.automations[idx], ...body, id: resId };
        saveDB(db);
        return sendJSON(res, 200, db.automations[idx]);
      }
      if (method === 'DELETE' && resId) {
        db.automations = db.automations.filter((a) => a.id !== resId);
        saveDB(db);
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
        saveDB(db);
        return sendJSON(res, 201, page);
      }
      if (method === 'PUT' && resId) {
        const idx = db.pages.findIndex((p) => p.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        db.pages[idx] = { ...db.pages[idx], ...body, id: resId, updated_at: new Date().toISOString() };
        saveDB(db);
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
        saveDB(db);
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
        saveDB(db);
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
        saveDB(db);
        return sendJSON(res, 200, db.demands[idx]);
      }
      if (method === 'DELETE' && resId) {
        db.demands = db.demands.filter((d) => d.id !== resId);
        saveDB(db);
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
        saveDB(db);
        return sendJSON(res, 201, strat);
      }
      if (method === 'PUT' && resId) {
        const idx = db.strategies.findIndex((s) => s.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        db.strategies[idx] = { ...db.strategies[idx], ...body, id: resId, updated_at: new Date().toISOString() };
        saveDB(db);
        return sendJSON(res, 200, db.strategies[idx]);
      }
      if (method === 'DELETE' && resId) {
        db.strategies = db.strategies.filter((s) => s.id !== resId);
        saveDB(db);
        return sendJSON(res, 200, { ok: true });
      }
    }

    // ---- CUSTOM COLUMNS (colunas criadas pelo usuário na tabela de demandas) ----
    if (resource === 'custom-columns') {
      if (method === 'GET' && !resId) return sendJSON(res, 200, db.customColumns);
      if (method === 'POST') {
        const body = await readBody(req);
        const col = { id: id(), name: (body.name || 'Nova coluna').trim() || 'Nova coluna', type: 'text', created_at: new Date().toISOString() };
        db.customColumns.push(col);
        db.viewPrefs.tableColumnOrder.push(col.id);
        saveDB(db);
        return sendJSON(res, 201, col);
      }
      if (method === 'PUT' && resId) {
        const idx = db.customColumns.findIndex((c) => c.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        db.customColumns[idx] = { ...db.customColumns[idx], ...body, id: resId };
        saveDB(db);
        return sendJSON(res, 200, db.customColumns[idx]);
      }
      if (method === 'DELETE' && resId) {
        db.customColumns = db.customColumns.filter((c) => c.id !== resId);
        db.viewPrefs.tableColumnOrder = db.viewPrefs.tableColumnOrder.filter((cid) => cid !== resId);
        db.demands.forEach((d) => { if (d.custom_fields) delete d.custom_fields[resId]; });
        saveDB(db);
        return sendJSON(res, 200, { ok: true });
      }
    }

    // ---- VIEW PREFS (ordem das colunas da tabela, etc. — preferências salvas) ----
    if (resource === 'view-prefs') {
      if (method === 'GET' && !resId) return sendJSON(res, 200, db.viewPrefs);
      if (method === 'PUT' && !resId) {
        const body = await readBody(req);
        db.viewPrefs = { ...db.viewPrefs, ...body };
        saveDB(db);
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
