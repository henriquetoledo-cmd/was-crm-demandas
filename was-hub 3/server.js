// WAS Hub — servidor local, sem dependências externas.
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

// ---------- Persistência ----------
function loadDB() {
  if (!fs.existsSync(DATA_FILE)) {
    const seed = require('./data/seed.json');
    fs.mkdirSync(path.dirname(DATA_FILE), { recursive: true });
    fs.writeFileSync(DATA_FILE, JSON.stringify(seed, null, 2));
  }
  return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
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
  const resource = parts[1]; // clients | demands | strategies | portal
  const resId = parts[2];

  try {
    // ---- PORTAL (leitura, filtrada por slug do cliente) ----
    if (resource === 'portal' && method === 'GET') {
      const slug = resId;
      const client = db.clients.find((c) => c.portal_slug === slug);
      if (!client) return sendJSON(res, 404, { error: 'Cliente não encontrado' });
      const demands = db.demands.filter((d) => d.client_id === client.id && d.visible_to_client);
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
        const demand = {
          id: id(),
          client_id: body.client_id,
          title: body.title || 'Sem título',
          description: body.description || '',
          format: Array.isArray(body.format) ? body.format : [],
          platform: Array.isArray(body.platform) ? body.platform : [],
          status: body.status || 'em_briefing',
          prazo_designer: body.prazo_designer || '',
          prazo_final: body.prazo_final || '',
          responsible: body.responsible || '',
          priority: body.priority || 'normal',
          forecast: body.forecast || 'prevista',
          refacao: body.refacao || '',
          visible_to_client: !!body.visible_to_client,
          link: body.link || '',
          created_at: new Date().toISOString(),
        };
        db.demands.push(demand);
        saveDB(db);
        return sendJSON(res, 201, demand);
      }
      if (method === 'PUT' && resId) {
        const idx = db.demands.findIndex((d) => d.id === resId);
        if (idx === -1) return sendJSON(res, 404, { error: 'Não encontrado' });
        const body = await readBody(req);
        db.demands[idx] = { ...db.demands[idx], ...body, id: resId };
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
  console.log(`WAS Hub rodando em http://localhost:${PORT}`);
  console.log(`Portal do cliente em http://localhost:${PORT}/portal?slug=SEU_SLUG`);
});
