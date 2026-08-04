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

// Subpastas de "Relatórios de Desempenho" (fechamento mensal): uma pasta por ano,
// com uma subpágina por mês, pra organizar onde cada fechamento mensal fica salvo.
const MONTH_FOLDER_NAMES = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
const REPORT_FOLDER_YEARS = [2026];

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
  if (!t.notifications) t.notifications = [];
  if (!t.customFormatOptions) t.customFormatOptions = [];
  if (!t.customPlatformOptions) t.customPlatformOptions = [];
  if (!t.cadenceNotified) t.cadenceNotified = {};
  t.demands.forEach((d) => { if (!Array.isArray(d.comments)) d.comments = []; if (typeof d.capture_link !== 'string') d.capture_link = ''; });
}

const DONE_STATUSES_SRV = ['aprovado', 'postar', 'programado', 'postado', 'stand_by', 'arquivado'];

function isoWeekKey(d) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  const dayNum = date.getUTCDay() || 7;
  date.setUTCDate(date.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1));
  const weekNo = Math.ceil((((date - yearStart) / 86400000) + 1) / 7);
  return `${date.getUTCFullYear()}-W${String(weekNo).padStart(2, '0')}`;
}

// Toda segunda-feira, gera (uma única vez por semana) uma notificação individual pra cada
// colaborador ativo com as demandas em que ele é responsável e vencem naquela semana.
function maybeGenerateWeeklySummary(root, tenant) {
  const hasActive = (tenant.automations || []).some((a) => a.active && a.kind === 'weekly_summary');
  if (!hasActive) return;
  const now = new Date();
  if (now.getDay() !== 1) return; // só roda na segunda
  const weekKey = isoWeekKey(now);
  if (tenant.lastWeeklySummaryWeek === weekKey) return; // já gerado essa semana
  const todayStr = now.toISOString().slice(0, 10);
  const sundayDate = new Date(now);
  sundayDate.setDate(sundayDate.getDate() + 6);
  const sundayStr = sundayDate.toISOString().slice(0, 10);

  (tenant.team || []).filter((m) => m.active).forEach((member) => {
    const items = (tenant.demands || []).filter((d) =>
      d.responsible === member.name &&
      d.prazo_final && d.prazo_final >= todayStr && d.prazo_final <= sundayStr &&
      !DONE_STATUSES_SRV.includes(d.status)
    );
    if (!items.length) return;
    tenant.notifications.push({
      id: id(),
      type: 'weekly_summary',
      to: member.name,
      from: 'Automação',
      message: `Resumo da semana: você tem ${items.length} entrega${items.length === 1 ? '' : 's'} com prazo até domingo (${items.map((d) => d.title).slice(0, 3).join(', ')}${items.length > 3 ? '...' : ''}).`,
      demand_ids: items.map((d) => d.id),
      read: false,
      created_at: new Date().toISOString(),
    });
  });
  tenant.lastWeeklySummaryWeek = weekKey;
  saveDB(root);
}

// Cadência mensal WAS: até dia 05 cobra o fechamento mensal de cada cliente ativo;
// entre dia 15-18 cobra o fechamento parcial (só relatório). Notifica os admins
// (to: '__admins__' não bate com nenhum nome real, então só quem é admin vê —
// admins enxergam todas as notificações independente do campo "to").
// Roda no máximo uma vez por cliente/mês por tipo (tenant.cadenceNotified).
function maybeGenerateCadenceAlerts(root, tenant) {
  const hasMonthly = (tenant.automations || []).some((a) => a.active && a.kind === 'monthly_closing');
  const hasPartial = (tenant.automations || []).some((a) => a.active && a.kind === 'partial_closing');
  if (!hasMonthly && !hasPartial) return;
  const now = new Date();
  const day = now.getDate();
  const monthKey = now.toISOString().slice(0, 7);
  if (!tenant.cadenceNotified) tenant.cadenceNotified = {};
  let changed = false;
  const activeClients = (tenant.clients || []).filter((c) => c.status === 'ativo');

  if (hasMonthly && day >= 1 && day <= 5) {
    activeClients.forEach((c) => {
      if (!tenant.cadenceNotified[c.id]) tenant.cadenceNotified[c.id] = {};
      if (tenant.cadenceNotified[c.id].monthly === monthKey) return;
      tenant.notifications.push({
        id: id(),
        type: 'monthly_closing',
        to: '__admins__',
        from: 'Automação',
        message: `Fechamento mensal do cliente ${c.name}: prazo até dia 05.`,
        demand_ids: [],
        client_id: c.id,
        read: false,
        created_at: new Date().toISOString(),
      });
      tenant.cadenceNotified[c.id].monthly = monthKey;
      changed = true;
    });
  }
  if (hasPartial && day >= 15 && day <= 18) {
    activeClients.forEach((c) => {
      if (!tenant.cadenceNotified[c.id]) tenant.cadenceNotified[c.id] = {};
      if (tenant.cadenceNotified[c.id].partial === monthKey) return;
      tenant.notifications.push({
        id: id(),
        type: 'partial_closing',
        to: '__admins__',
        from: 'Automação',
        message: `Fechamento parcial (relatório) do cliente ${c.name}: prazo até dia 18.`,
        demand_ids: [],
        client_id: c.id,
        read: false,
        created_at: new Date().toISOString(),
      });
      tenant.cadenceNotified[c.id].partial = monthKey;
      changed = true;
    });
  }
  if (changed) saveDB(root);
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
    ensureReportMonthFolders(t);
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
// Hash forte com salt por usuário (PBKDF2, 100k iterações). Formato: pbkdf2$<salt>$<hash>
function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString('hex');
  const hash = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256').toString('hex');
  return `pbkdf2$${salt}$${hash}`;
}

function legacyHashPassword(password) {
  // Formato antigo (sha256 com salt fixo no código) — mantido só pra verificar contas
  // criadas antes da migração. Nunca mais usado pra criar hash novo.
  return crypto.createHash('sha256').update('was-hub-salt-v1:' + password).digest('hex');
}

function verifyPassword(password, hash) {
  if (typeof hash === 'string' && hash.startsWith('pbkdf2$')) {
    const [, salt, expected] = hash.split('$');
    const actual = crypto.pbkdf2Sync(password, salt, 100000, 32, 'sha256').toString('hex');
    try {
      return crypto.timingSafeEqual(Buffer.from(actual, 'hex'), Buffer.from(expected, 'hex'));
    } catch (e) {
      return false;
    }
  }
  // Conta antiga (pré-migração): valida no formato legado. O caller deve re-hashear
  // com hashPassword() e salvar assim que a senha bater, migrando a conta sozinha.
  return legacyHashPassword(password) === hash;
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
      visibleClientIds: 'all',
      created_at: new Date().toISOString(),
    });
  });
  // migração: usuários criados antes do campo de visibilidade existir ganham acesso a tudo,
  // preservando o comportamento atual até um admin restringir explicitamente.
  tenant.users.forEach((u) => {
    if (u.visibleClientIds === undefined) u.visibleClientIds = 'all';
  });
}

// ---------- Permissões ----------
function isAdminUser(user) {
  return !!user && user.role === 'admin';
}

function findUserBySession(tenant, session) {
  if (!session) return null;
  return tenant.users.find((u) => u.id === session.userId) || null;
}

// Bloqueia login/uso se o funcionário vinculado foi desativado, removido da equipe,
// ou se a conta foi explicitamente marcada como revogada (ex.: time excluído).
function isAccessRevoked(tenant, user) {
  if (!user) return false;
  if (user.revokedByTeamDelete) return true;
  if (!user.team_member_id) return false;
  const member = tenant.team.find((t) => t.id === user.team_member_id);
  if (!member) return true; // funcionário foi removido da equipe — acesso não deve continuar valendo
  return member.active === false;
}

function filterClientsForUser(clients, user) {
  if (!user || isAdminUser(user) || user.visibleClientIds === 'all' || !Array.isArray(user.visibleClientIds)) return clients;
  const allowed = new Set(user.visibleClientIds);
  return clients.filter((c) => allowed.has(c.id));
}

function filterDemandsForUser(demands, user) {
  if (!user || isAdminUser(user) || user.visibleClientIds === 'all' || !Array.isArray(user.visibleClientIds)) return demands;
  const allowed = new Set(user.visibleClientIds);
  return demands.filter((d) => allowed.has(d.client_id));
}

// Notifica a pessoa quando ela é definida (ou trocada) como responsável por uma demanda —
// "faz parte do card" = é a pessoa dona da demanda. Não notifica se a pessoa se atribuiu a si mesma.
function notifyAssignment(tenant, demand, previousResponsible, actingUser) {
  const newResponsible = demand.responsible || '';
  if (!newResponsible || newResponsible === previousResponsible) return;
  const actingName = actingUser ? actingUser.name : null;
  if (newResponsible === actingName) return;
  tenant.notifications.push({
    id: id(),
    type: 'assignment',
    to: newResponsible,
    from: actingName || 'Alguém',
    message: `${actingName || 'Alguém'} te definiu como responsável por "${demand.title}"`,
    demand_id: demand.id,
    read: false,
    created_at: new Date().toISOString(),
  });
}

const sessions = new Map(); // token -> { tenantId, userId, createdAt }

// ---- Rate limit de login (por IP, em memória) — freia brute force de senha ----
const loginAttempts = new Map(); // ip -> { count, firstFailAt, blockedUntil }
const LOGIN_MAX_ATTEMPTS = 8;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_BLOCK_MS = 60 * 1000;

function clientIp(req) {
  const fwd = req.headers['x-forwarded-for'];
  if (fwd) return fwd.split(',')[0].trim();
  return (req.socket && req.socket.remoteAddress) || 'unknown';
}

function checkLoginRateLimit(key) {
  const rec = loginAttempts.get(key);
  if (!rec) return null;
  if (rec.blockedUntil && rec.blockedUntil > Date.now()) {
    return Math.ceil((rec.blockedUntil - Date.now()) / 1000);
  }
  return null;
}

function registerLoginFailure(key) {
  const now = Date.now();
  let rec = loginAttempts.get(key);
  if (!rec || now - rec.firstFailAt > LOGIN_WINDOW_MS) {
    rec = { count: 0, firstFailAt: now, blockedUntil: 0 };
  }
  rec.count += 1;
  if (rec.count >= LOGIN_MAX_ATTEMPTS) {
    rec.blockedUntil = now + LOGIN_BLOCK_MS;
    rec.count = 0;
    rec.firstFailAt = now;
  }
  loginAttempts.set(key, rec);
}

function registerLoginSuccess(key) {
  loginAttempts.delete(key);
}

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

// Em produção (Railway) o app roda atrás de HTTPS — cookie só trafega por HTTPS lá.
// Em dev local (http://localhost) não força Secure, senão o navegador descarta o cookie.
const IS_PRODUCTION = !!(process.env.RAILWAY_ENVIRONMENT || process.env.RAILWAY_STATIC_URL);
const COOKIE_SECURE_FLAG = IS_PRODUCTION ? '; Secure' : '';

function setSessionCookie(res, token) {
  const maxAge = 60 * 60 * 24 * 30;
  res.setHeader('Set-Cookie', `was_session=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${maxAge}${COOKIE_SECURE_FLAG}`);
}

function clearSessionCookie(res) {
  res.setHeader('Set-Cookie', `was_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0${COOKIE_SECURE_FLAG}`);
}

function publicUser(u, tenant) {
  return { id: u.id, name: u.name, email: u.email, role: u.role, visibleClientIds: u.visibleClientIds === undefined ? 'all' : u.visibleClientIds, tenantId: tenant.id, tenantName: tenant.name, tenantSlug: tenant.slug, tenantPlan: tenant.plan };
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

function ensureReportMonthFolders(db) {
  db.clients.forEach((c) => {
    const reportsPage = db.pages.find((p) => p.client_id === c.id && !p.parent_id && p.title === 'Relatórios de Desempenho');
    if (!reportsPage) return;
    REPORT_FOLDER_YEARS.forEach((year) => {
      let yearPage = db.pages.find((p) => p.client_id === c.id && p.parent_id === reportsPage.id && p.title === String(year));
      if (!yearPage) {
        yearPage = {
          id: id(), client_id: c.id, parent_id: reportsPage.id, type: 'page', title: String(year),
          content: '', order: 0, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
        };
        db.pages.push(yearPage);
      }
      const existingMonthTitles = new Set(db.pages.filter((p) => p.client_id === c.id && p.parent_id === yearPage.id).map((p) => p.title));
      MONTH_FOLDER_NAMES.forEach((label, i) => {
        if (existingMonthTitles.has(label)) return;
        db.pages.push({
          id: id(), client_id: c.id, parent_id: yearPage.id, type: 'page', title: label,
          content: '', order: i, created_at: new Date().toISOString(), updated_at: new Date().toISOString(),
        });
      });
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

const MAX_BODY_BYTES = 5 * 1024 * 1024; // 5MB — generoso pro maior payload do app (import/export), barra flood

function readBody(req) {
  return new Promise((resolve, reject) => {
    let chunks = [];
    let size = 0;
    let aborted = false;
    req.on('data', (c) => {
      if (aborted) return;
      size += c.length;
      if (size > MAX_BODY_BYTES) {
        aborted = true;
        reject(new Error('payload_too_large'));
        req.destroy();
        return;
      }
      chunks.push(c);
    });
    req.on('end', () => {
      if (aborted) return;
      const raw = Buffer.concat(chunks).toString('utf-8');
      if (!raw) return resolve({});
      try {
        resolve(JSON.parse(raw));
      } catch (e) {
        reject(e);
      }
    });
    req.on('error', (e) => { if (!aborted) reject(e); });
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
  const subResource = parts[3]; // ex: demands/:id/comments

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
      const demands = tenant.demands.filter((d) => d.client_id === client.id && d.status !== 'arquivado');
      const strategies = tenant.strategies.filter((s) => s.client_id === client.id && s.visible_to_client);
      const pages = (tenant.pages || [])
        .filter((p) => p.client_id === client.id && !p.parent_id)
        .sort((a, b) => (a.order || 0) - (b.order || 0));
      return sendJSON(res, 200, { client, demands, strategies, pages });
    }

    // ---- PORTAL: cliente adiciona comentário numa demanda (só adiciona, nunca apaga/edita) ----
    if (resource === 'portal' && resId && subResource === 'demands' && parts[4] && parts[5] === 'comments' && method === 'POST') {
      const slug = resId;
      const demandId = parts[4];
      let client = null, tenant = null;
      for (const t of Object.values(root.tenants)) {
        const c = t.clients.find((c) => c.portal_slug === slug);
        if (c) { client = c; tenant = t; break; }
      }
      if (!client) return sendJSON(res, 404, { error: 'Cliente não encontrado' });
      const idx = tenant.demands.findIndex((d) => d.id === demandId && d.client_id === client.id);
      if (idx === -1) return sendJSON(res, 404, { error: 'Entrega não encontrada' });
      const body = await readBody(req);
      const text = (body.text || '').trim();
      const authorName = (body.author || '').trim() || client.name;
      if (!text) return sendJSON(res, 400, { error: 'Comentário vazio' });
      const comment = {
        id: id(),
        author: authorName,
        text,
        via: 'client',
        created_at: new Date().toISOString(),
      };
      if (!Array.isArray(tenant.demands[idx].comments)) tenant.demands[idx].comments = [];
      tenant.demands[idx].comments.push(comment);
      if (tenant.demands[idx].responsible) {
        tenant.notifications.push({
          id: id(),
          type: 'client_comment',
          to: tenant.demands[idx].responsible,
          from: authorName,
          message: `${authorName} (${client.name}) comentou em "${tenant.demands[idx].title}": ${text}`,
          demand_id: demandId,
          read: false,
          created_at: new Date().toISOString(),
        });
      }
      saveDB(root);
      return sendJSON(res, 201, tenant.demands[idx]);
    }

    // ---- AUTH (login / logout / cadastro público / usuário atual) ----
    if (resource === 'auth') {
      if (resId === 'login' && method === 'POST') {
        const rateKey = clientIp(req);
        const block = checkLoginRateLimit(rateKey);
        if (block) return sendJSON(res, 429, { error: `Muitas tentativas. Tente de novo em ${block}s.` });

        const body = await readBody(req);
        const email = (body.email || '').trim().toLowerCase();
        const password = body.password || '';
        let found = null, foundTenant = null;
        for (const t of Object.values(root.tenants)) {
          const u = t.users.find((u) => u.name.trim().toLowerCase() === email || (u.email || '').trim().toLowerCase() === email);
          if (u) { found = u; foundTenant = t; break; }
        }
        if (!found || !verifyPassword(password, found.passwordHash)) {
          registerLoginFailure(rateKey);
          return sendJSON(res, 401, { error: 'E-mail/usuário ou senha inválidos' });
        }
        if (isAccessRevoked(foundTenant, found)) {
          registerLoginFailure(rateKey);
          return sendJSON(res, 403, { error: 'Seu acesso foi revogado. Fale com o administrador da sua empresa.' });
        }
        registerLoginSuccess(rateKey);
        // Migra senhas criadas no formato antigo (hash sem salt por usuário) pro formato novo,
        // de forma transparente, assim que a pessoa loga com sucesso.
        if (typeof found.passwordHash === 'string' && !found.passwordHash.startsWith('pbkdf2$')) {
          found.passwordHash = hashPassword(password);
          saveDB(root);
        }
        const token = createSession(foundTenant.id, found.id);
        setSessionCookie(res, token);
        return sendJSON(res, 200, { user: publicUser(found, foundTenant) });
      }
      if (resId === 'password' && method === 'PUT') {
        const session = getSession(req);
        if (!session || !root.tenants[session.tenantId]) return sendJSON(res, 401, { error: 'Não autenticado' });
        const tenant = root.tenants[session.tenantId];
        const user = tenant.users.find((u) => u.id === session.userId);
        if (!user) return sendJSON(res, 401, { error: 'Não autenticado' });
        const body = await readBody(req);
        const currentPassword = body.currentPassword || '';
        const newPassword = body.newPassword || '';
        if (!verifyPassword(currentPassword, user.passwordHash)) {
          return sendJSON(res, 400, { error: 'Senha atual incorreta' });
        }
        if (newPassword.length < 4) {
          return sendJSON(res, 400, { error: 'A nova senha precisa ter pelo menos 4 caracteres' });
        }
        user.passwordHash = hashPassword(newPassword);
        saveDB(root);
        return sendJSON(res, 200, { ok: true });
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
    const me = findUserBySession(db, session);
    if (me && isAccessRevoked(db, me)) return sendJSON(res, 403, { error: 'Seu acesso foi revogado. Fale com o administrador da sua empresa.' });
    maybeGenerateWeeklySummary(root, db);
    maybeGenerateCadenceAlerts(root, db);

    // ---- CLIENTS ----
    if (resource === 'clients') {
      if (method === 'GET' && !resId) return sendJSON(res, 200, filterClientsForUser(db.clients, me));
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
      if (method !== 'GET' && !isAdminUser(me)) return sendJSON(res, 403, { error: 'Apenas administradores podem alterar a equipe.' });
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
        // remove o funcionário do time NÃO deve deixar a conta de login órfã e ativa —
        // revoga o acesso de qualquer usuário vinculado a esse membro da equipe.
        db.users.forEach((u) => { if (u.team_member_id === resId) u.revokedByTeamDelete = true; });
        saveDB(root);
        return sendJSON(res, 200, { ok: true });
      }
    }

    // ---- USERS (contas de login, gestão de acesso — só admin) ----
    if (resource === 'users') {
      if (!isAdminUser(me)) return sendJSON(res, 403, { error: 'Apenas administradores podem gerenciar usuários.' });

      if (method === 'GET' && !resId) {
        const list = db.users.map((u) => {
          const member = db.team.find((t) => t.id === u.team_member_id);
          return {
            id: u.id, name: u.name, email: u.email, role: u.role,
            visibleClientIds: u.visibleClientIds === undefined ? 'all' : u.visibleClientIds,
            active: member ? member.active !== false : true,
            team_member_id: u.team_member_id,
            created_at: u.created_at,
          };
        });
        return sendJSON(res, 200, list);
      }

      if (method === 'POST' && !resId) {
        const body = await readBody(req);
        const name = (body.name || '').trim();
        const email = (body.email || '').trim().toLowerCase();
        const password = body.password || '';
        if (!name || !password) return sendJSON(res, 400, { error: 'Nome e senha são obrigatórios.' });
        if (password.length < 4) return sendJSON(res, 400, { error: 'A senha precisa ter pelo menos 4 caracteres.' });
        if (email) {
          const emailTaken = Object.values(root.tenants).some((t) => t.users.some((u) => (u.email || '').trim().toLowerCase() === email));
          if (emailTaken) return sendJSON(res, 400, { error: 'Já existe uma conta com esse e-mail.' });
        }
        const roles = Array.isArray(body.roles) ? body.roles : [];
        const member = { id: id(), name, roles, active: true, created_at: new Date().toISOString() };
        db.team.push(member);
        const newUser = {
          id: id(), name, email: email || null, passwordHash: hashPassword(password),
          role: body.role === 'admin' ? 'admin' : 'member',
          team_member_id: member.id,
          visibleClientIds: body.visibleClientIds === 'all' ? 'all' : (Array.isArray(body.visibleClientIds) ? body.visibleClientIds : 'all'),
          created_at: new Date().toISOString(),
        };
        db.users.push(newUser);
        saveDB(root);
        return sendJSON(res, 201, { id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role, visibleClientIds: newUser.visibleClientIds, active: true, team_member_id: member.id });
      }

      if (method === 'PUT' && resId) {
        const idx = db.users.findIndex((u) => u.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Usuário não encontrado' });
        const target = db.users[idx];
        const body = await readBody(req);
        if (body.email !== undefined) target.email = (body.email || '').trim().toLowerCase() || null;
        if (body.role !== undefined) target.role = body.role === 'admin' ? 'admin' : 'member';
        if (body.visibleClientIds !== undefined) {
          target.visibleClientIds = body.visibleClientIds === 'all' ? 'all' : (Array.isArray(body.visibleClientIds) ? body.visibleClientIds : 'all');
        }
        if (body.newPassword) {
          if (body.newPassword.length < 4) return sendJSON(res, 400, { error: 'A nova senha precisa ter pelo menos 4 caracteres.' });
          target.passwordHash = hashPassword(body.newPassword);
        }
        if (body.active !== undefined) {
          if (target.id === me.id && body.active === false) {
            return sendJSON(res, 400, { error: 'Você não pode revogar o próprio acesso.' });
          }
          const member = db.team.find((t) => t.id === target.team_member_id);
          if (member) member.active = !!body.active;
        }
        saveDB(root);
        const member = db.team.find((t) => t.id === target.team_member_id);
        return sendJSON(res, 200, { id: target.id, name: target.name, email: target.email, role: target.role, visibleClientIds: target.visibleClientIds, active: member ? member.active !== false : true, team_member_id: target.team_member_id });
      }

      if (method === 'DELETE' && resId) {
        if (resId === me.id) return sendJSON(res, 400, { error: 'Você não pode revogar o próprio acesso.' });
        const target = db.users.find((u) => u.id === resId);
        if (!target) return sendJSON(res, 404, { error: 'Usuário não encontrado' });
        const member = db.team.find((t) => t.id === target.team_member_id);
        if (member) member.active = false;
        saveDB(root);
        return sendJSON(res, 200, { ok: true });
      }
    }

    // ---- IMPORT (histórico real do CSV do Notion — arquivo bundlado no deploy, só admin, one-off) ----
    if (resource === 'import' && resId === 'notion-demands') {
      if (!isAdminUser(me)) return sendJSON(res, 403, { error: 'Apenas administradores podem importar dados.' });
      if (method !== 'POST') return sendJSON(res, 404, { error: 'Rota não encontrada' });
      const importPath = path.join(__dirname, 'import-demands.json');
      if (!fs.existsSync(importPath)) return sendJSON(res, 404, { error: 'Arquivo import-demands.json não encontrado no servidor.' });
      let raw;
      try {
        raw = JSON.parse(fs.readFileSync(importPath, 'utf-8'));
      } catch (e) {
        return sendJSON(res, 500, { error: 'Falha ao ler import-demands.json: ' + e.message });
      }
      const body = await readBody(req);
      const replaceExisting = body.replace_existing === true;
      const removedCount = replaceExisting ? db.demands.length : 0;
      if (replaceExisting) db.demands = [];
      let created = 0;
      raw.forEach((r) => {
        if (!r.client_id) return;
        db.demands.push({
          id: id(),
          client_id: r.client_id,
          title: r.title || 'Sem título',
          description: '',
          briefing: '',
          format: Array.isArray(r.format) ? r.format : [],
          platform: Array.isArray(r.platform) ? r.platform : [],
          status: r.status || 'em_briefing',
          needs_capture: !!r.needs_capture,
          capture_date: '',
          capture_link: '',
          prazo_designer: r.prazo_designer || '',
          prazo_final: r.prazo_final || '',
          responsible: r.responsible || '',
          responsible_captacao: '',
          responsible_edicao: '',
          priority: r.priority || 'normal',
          forecast: r.forecast || 'prevista',
          refacao: r.refacao || '',
          visible_to_client: false,
          link: '',
          custom_fields: {},
          comments: [],
          created_at: r.created_at || new Date().toISOString(),
          imported_from: r.imported_from || 'notion_csv',
        });
        created++;
      });
      saveDB(root);
      return sendJSON(res, 200, { ok: true, created, removed: removedCount, total: db.demands.length });
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
        let list = filterDemandsForUser(db.demands, me);
        if (query.client_id) list = list.filter((d) => d.client_id === query.client_id);
        return sendJSON(res, 200, list);
      }
      if (method === 'POST' && !resId) {
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
          capture_link: body.capture_link || '',
          prazo_designer: body.prazo_designer || '',
          prazo_final: body.prazo_final || '',
          responsible: body.responsible || '',
          responsible_captacao: body.responsible_captacao || '',
          responsible_edicao: body.responsible_edicao || '',
          priority: body.priority || 'normal',
          forecast: body.forecast || 'prevista',
          refacao: body.refacao || '',
          visible_to_client: !!body.visible_to_client,
          link: body.link || '',
          custom_fields: (body.custom_fields && typeof body.custom_fields === 'object') ? body.custom_fields : {},
          comments: [],
          created_at: new Date().toISOString(),
        };
        demand = applyAutomations(db, demand);
        db.demands.push(demand);
        notifyAssignment(db, demand, '', me);
        saveDB(root);
        return sendJSON(res, 201, demand);
      }
      // ---- comentários com @menção (gera notificação in-app pra quem foi marcado) ----
      if (resId && subResource === 'comments' && method === 'POST') {
        const idx = db.demands.findIndex((d) => d.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        const text = (body.text || '').trim();
        if (!text) return sendJSON(res, 400, { error: 'Comentário vazio' });
        const comment = {
          id: id(),
          author: body.author || 'Alguém',
          text,
          created_at: new Date().toISOString(),
        };
        if (!Array.isArray(db.demands[idx].comments)) db.demands[idx].comments = [];
        db.demands[idx].comments.push(comment);
        // detecta @Nome pra cada membro do time e gera notificação in-app
        const mentioned = (db.team || []).filter((member) => text.includes('@' + member.name));
        mentioned.forEach((member) => {
          db.notifications.push({
            id: id(),
            type: 'mention',
            to: member.name,
            from: comment.author,
            message: `${comment.author} marcou você em "${db.demands[idx].title}": ${text}`,
            demand_id: resId,
            read: false,
            created_at: new Date().toISOString(),
          });
        });
        saveDB(root);
        return sendJSON(res, 201, db.demands[idx]);
      }
      // ---- excluir comentário: só o próprio autor pode excluir o seu (nunca o de outros) ----
      if (resId && subResource === 'comments' && parts[4] && method === 'DELETE') {
        const idx = db.demands.findIndex((d) => d.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const commentId = parts[4];
        const list = db.demands[idx].comments || [];
        const cIdx = list.findIndex((c) => c.id === commentId);
        if (cIdx === -1) return sendJSON(res, 404, { error: 'Comentário não encontrado' });
        const me = (db.users || []).find((u) => u.id === session.userId);
        const myName = me ? me.name : null;
        if (!myName || list[cIdx].author !== myName) {
          return sendJSON(res, 403, { error: 'Você só pode excluir os seus próprios comentários.' });
        }
        list.splice(cIdx, 1);
        saveDB(root);
        return sendJSON(res, 200, db.demands[idx]);
      }
      if (method === 'PUT' && resId) {
        const idx = db.demands.findIndex((d) => d.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        const previousResponsible = db.demands[idx].responsible || '';
        // custom_fields é mesclado (não substituído), pra edições em colunas diferentes não se apagarem
        const mergedCustom = { ...(db.demands[idx].custom_fields || {}), ...(body.custom_fields || {}) };
        let demand = { ...db.demands[idx], ...body, id: resId, custom_fields: mergedCustom };
        demand = applyAutomations(db, demand);
        db.demands[idx] = demand;
        notifyAssignment(db, demand, previousResponsible, me);
        saveDB(root);
        return sendJSON(res, 200, db.demands[idx]);
      }
      if (method === 'DELETE' && resId) {
        db.demands = db.demands.filter((d) => d.id !== resId);
        saveDB(root);
        return sendJSON(res, 200, { ok: true });
      }
    }

    // ---- NOTIFICAÇÕES (menções em comentários) ----
    if (resource === 'notifications') {
      if (method === 'GET' && !resId) {
        const all = db.notifications || [];
        if (isAdminUser(me)) return sendJSON(res, 200, all);
        const myName = me ? me.name : null;
        return sendJSON(res, 200, all.filter((n) => n.to === myName));
      }
      if (method === 'PUT' && resId) {
        const idx = (db.notifications || []).findIndex((n) => n.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        db.notifications[idx] = { ...db.notifications[idx], ...body, id: resId };
        saveDB(root);
        return sendJSON(res, 200, db.notifications[idx]);
      }
    }

    // ---- OPÇÕES CUSTOMIZADAS de Formato / Plataforma (adicionadas direto no card) ----
    if (resource === 'format-options') {
      if (method === 'GET' && !resId) return sendJSON(res, 200, db.customFormatOptions || []);
      if (method === 'POST') {
        const body = await readBody(req);
        const name = (body.name || '').trim();
        if (!name) return sendJSON(res, 400, { error: 'Nome vazio' });
        if (!(db.customFormatOptions || []).some((o) => o.name.toLowerCase() === name.toLowerCase())) {
          db.customFormatOptions.push({ name, color: body.color || 'gray' });
          saveDB(root);
        }
        return sendJSON(res, 201, db.customFormatOptions);
      }
    }
    if (resource === 'platform-options') {
      if (method === 'GET' && !resId) return sendJSON(res, 200, db.customPlatformOptions || []);
      if (method === 'POST') {
        const body = await readBody(req);
        const name = (body.name || '').trim();
        if (!name) return sendJSON(res, 400, { error: 'Nome vazio' });
        if (!(db.customPlatformOptions || []).some((o) => o.name.toLowerCase() === name.toLowerCase())) {
          db.customPlatformOptions.push({ name, color: body.color || 'gray' });
          saveDB(root);
        }
        return sendJSON(res, 201, db.customPlatformOptions);
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
