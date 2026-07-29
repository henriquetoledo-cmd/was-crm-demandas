// ---------- Configuração (fluxo WAS + espelha a base ENTREGAS DESIGN - WAS do Notion) ----------
const STAGES = [
  { key: 1, label: '1 · Briefing (Social Media)' },
  { key: 2, label: '2 · Aprovação do cliente' },
  { key: 3, label: '3 · Captação e execução (equipe)' },
  { key: 4, label: '4 · Aprovação do cliente' },
  { key: 5, label: '5 · Programar posts' },
  { key: 0, label: 'Outros' },
];
const KANBAN_STAGES = STAGES.filter((s) => s.key !== 0);

const STATUS_DEFS = [
  { key: 'em_briefing', label: 'Em briefing', color: 'yellow', stage: 1 },
  { key: 'aprovacao_briefing', label: 'Aprovação do briefing', color: 'green', stage: 2 },
  { key: 'aguardando_captacao', label: 'Aguardando captação', color: 'red', stage: 3 },
  { key: 'a_fazer_design', label: 'A fazer - Design', color: 'brown', stage: 3 },
  { key: 'em_criacao_design', label: 'Em criação (design)', color: 'yellow', stage: 3 },
  { key: 'em_ajuste_design', label: 'Em ajuste (design)', color: 'orange', stage: 3 },
  { key: 'pronto_envio_design', label: 'Pronto para envio (design)', color: 'pink', stage: 3 },
  { key: 'em_aprovacao_cliente', label: 'Em aprovação (cliente)', color: 'green', stage: 4 },
  { key: 'aprovado', label: 'Aprovado', color: 'green', stage: 4 },
  { key: 'postar', label: 'Postar', color: 'blue', stage: 5 },
  { key: 'programado', label: 'Programado', color: 'purple', stage: 5 },
  { key: 'postado', label: 'Postado', color: 'purple', stage: 5 },
  { key: 'aguardando_infos', label: 'Aguardando infos/materiais', color: 'gray', stage: 0 },
  { key: 'freela', label: 'Freela', color: 'gray', stage: 0 },
  { key: 'stand_by', label: 'Stand By', color: 'gray', stage: 0 },
  { key: 'arquivado', label: 'Arquivado', color: 'default', stage: 0 },
];

const DONE_STATUSES = ['aprovado', 'postar', 'programado', 'postado', 'stand_by', 'arquivado'];

const FORMATO_OPTIONS = [
  { name: 'Feed', color: 'green' }, { name: 'Story', color: 'green' }, { name: 'Estático', color: 'green' },
  { name: 'Carrossel', color: 'green' }, { name: 'Reels', color: 'green' }, { name: 'Vídeo', color: 'green' },
  { name: 'GIF / Motion', color: 'green' },
  { name: 'Cardápio', color: 'gray' }, { name: 'Cartaz', color: 'gray' }, { name: 'Backdrop', color: 'gray' },
  { name: 'Faixa', color: 'gray' }, { name: 'Flyer', color: 'gray' }, { name: 'Banner', color: 'gray' },
  { name: 'Adesivo', color: 'gray' }, { name: 'Totem', color: 'gray' }, { name: 'Brindes', color: 'gray' },
  { name: 'Apresentação', color: 'purple' }, { name: 'Moodboard', color: 'purple' }, { name: 'Identidade visual', color: 'purple' },
];

const PLATAFORMA_OPTIONS = [
  { name: 'Instagram', color: 'pink' }, { name: 'TikTok', color: 'brown' }, { name: 'LinkedIn', color: 'default' },
  { name: 'Facebook', color: 'blue' }, { name: 'Ads', color: 'yellow' }, { name: 'Site', color: 'orange' },
  { name: 'Off (físico/impresso)', color: 'gray' }, { name: 'Cliente', color: 'red' }, { name: 'YouTube', color: 'red' },
];

const PRIORIDADE_OPTIONS = [
  { key: 'normal', label: 'Normal', color: 'green' },
  { key: 'alta', label: 'Alta', color: 'orange' },
  { key: 'urgente', label: 'Urgente', color: 'red' },
];

const FORECAST_OPTIONS = [
  { key: 'prevista', label: 'Prevista', color: 'green' },
  { key: 'nao_prevista', label: 'Não prevista', color: 'red' },
];

const REFACAO_OPTIONS = [
  { key: '', label: '—', color: 'gray' },
  { key: 'v1', label: 'V1', color: 'blue' },
  { key: 'v2', label: 'V2', color: 'purple' },
  { key: 'v3', label: 'V3', color: 'pink' },
  { key: 'v4', label: 'V4', color: 'orange' },
  { key: 'v5', label: 'V5', color: 'red' },
  { key: 'v6', label: 'V6', color: 'gray' },
];

const ROLE_OPTIONS = ['Coringa', 'Social Media', 'Designer', 'Filmmaker'];
const ROLE_COLORS = { Coringa: 'purple', 'Social Media': 'blue', Designer: 'pink', Filmmaker: 'orange' };

const SLASH_ITEMS = [
  { key: 'h2', label: 'Título 2', icon: 'H2', hint: 'título médio' },
  { key: 'h3', label: 'Título 3', icon: 'H3', hint: 'título pequeno' },
  { key: 'ul', label: 'Lista com marcadores', icon: '•', hint: 'lista simples' },
  { key: 'ol', label: 'Lista numerada', icon: '1.', hint: 'lista ordenada' },
  { key: 'quote', label: 'Citação', icon: '❝', hint: 'bloco de citação' },
  { key: 'divider', label: 'Divisor', icon: '—', hint: 'linha separadora' },
  { key: 'subpage', label: 'Nova subpágina', icon: '📄', hint: 'cria página dentro desta' },
  { key: 'image', label: 'Imagem', icon: '🖼', hint: 'cole o link de uma imagem' },
  { key: 'video', label: 'Vídeo', icon: '🎬', hint: 'YouTube, Vimeo ou link direto' },
  { key: 'pdf', label: 'PDF', icon: '📑', hint: 'cole o link de um PDF' },
  { key: 'html', label: 'Incorporar HTML', icon: '</>', hint: 'cole um trecho de HTML/embed' },
];

const WEEKDAY_LABELS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MONTH_LABELS = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];

function statusDef(key) { return STATUS_DEFS.find((s) => s.key === key) || STATUS_DEFS[0]; }

function formatDateBR(iso) {
  if (!iso) return '';
  const parts = iso.split('-');
  if (parts.length !== 3) return iso;
  const [y, m, d] = parts;
  return `${d}/${m}/${y}`;
}

function debounce(fn, wait) {
  let t;
  return (...args) => {
    clearTimeout(t);
    t = setTimeout(() => fn(...args), wait);
  };
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function addDaysStr(iso, days) {
  const d = new Date(iso + 'T00:00:00');
  d.setDate(d.getDate() + days);
  return d.toISOString().slice(0, 10);
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function initials(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

// ---------- Estado ----------
const state = {
  page: 'dashboard',
  clients: [],
  demands: [],
  pages: [],
  team: [],
  automations: [],
  filters: {
    client: new Set(), format: new Set(), platform: new Set(), priority: new Set(), responsible: new Set(),
    prazoDesignerFrom: '', prazoDesignerTo: '', prazoFinalFrom: '', prazoFinalTo: '',
  },
  openFilterKey: null,
  currentClientId: null,
  currentPageId: null,
  expandedFolders: new Set(),
  collapsedStages: new Set(),
  demandsView: 'kanban',
  selectedDemandIds: new Set(),
  calendarCursor: null,
  automacoesTab: 'regras',
  focusTitleForPageId: null,
};

// ---------- API helpers ----------
async function api(path, opts) {
  const res = await fetch('/api' + path, {
    headers: { 'Content-Type': 'application/json' },
    ...opts,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erro' }));
    throw new Error(err.error || 'Erro na requisição');
  }
  return res.json();
}

async function loadAll() {
  const [clients, demands, team, automations] = await Promise.all([
    api('/clients'),
    api('/demands'),
    api('/team'),
    api('/automations'),
  ]);
  state.clients = clients;
  state.demands = demands;
  state.team = team;
  state.automations = automations;
}

function clientById(id) {
  return state.clients.find((c) => c.id === id);
}
function clientName(id) {
  const c = clientById(id);
  return c ? c.name : '—';
}
function clientColor(id) {
  const c = clientById(id);
  return c && c.color ? c.color : 'default';
}
function activeTeamNames() {
  return state.team.filter((t) => t.active).map((t) => t.name);
}

// ---------- Toasts (substituem alert()) ----------
function toast(message, type) {
  const root = document.getElementById('toast-root');
  const el = document.createElement('div');
  el.className = `toast ${type || 'info'}`;
  el.textContent = message;
  root.appendChild(el);
  requestAnimationFrame(() => el.classList.add('show'));
  setTimeout(() => {
    el.classList.remove('show');
    setTimeout(() => el.remove(), 250);
  }, 3200);
}

// ---------- Confirmação customizada (substitui confirm()) ----------
function confirmDialog(message, opts) {
  opts = opts || {};
  return new Promise((resolve) => {
    const root = document.getElementById('confirm-root');
    root.innerHTML = `
      <div class="modal-backdrop confirm-backdrop">
        <div class="modal confirm-modal">
          <p class="confirm-message">${escapeHtml(message)}</p>
          <div class="modal-footer">
            <button class="btn secondary" id="confirm-no">Cancelar</button>
            <button class="btn ${opts.danger === false ? '' : 'danger-solid'}" id="confirm-yes">${escapeHtml(opts.confirmLabel || 'Confirmar')}</button>
          </div>
        </div>
      </div>
    `;
    const cleanup = (val) => { root.innerHTML = ''; resolve(val); };
    document.getElementById('confirm-no').onclick = () => cleanup(false);
    document.getElementById('confirm-yes').onclick = () => cleanup(true);
    root.querySelector('.confirm-backdrop').addEventListener('click', (e) => {
      if (e.target.classList.contains('confirm-backdrop')) cleanup(false);
    });
  });
}

// ---------- Navegação ----------
document.querySelectorAll('.nav-item').forEach((el) => {
  el.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach((n) => n.classList.remove('active'));
    el.classList.add('active');
    state.page = el.dataset.page;
    state.currentClientId = null;
    render();
  });
});

function render() {
  const main = document.getElementById('main');
  updateNavBadges();
  if (state.page === 'dashboard') return renderDashboard(main);
  if (state.page === 'clientes') return renderClientes(main);
  if (state.page === 'cliente-detail') return renderClienteDetail(main);
  if (state.page === 'demandas') return renderDemandas(main);
  if (state.page === 'notificacoes') return renderNotificacoes(main);
  if (state.page === 'automacoes') return renderAutomacoes(main);
}

const DEADLINE_FIELD_LABELS = { prazo_final: 'Prazo final', prazo_designer: 'Prazo designer', capture_date: 'Captação' };
const DEADLINE_DAYS_LABELS = { 0: 'no dia', 1: '1 dia antes', 2: '2 dias antes', 3: '3 dias antes', 5: '5 dias antes', 7: '7 dias antes' };

function computeDeadlineAlerts() {
  const today = todayStr();
  return (state.automations || [])
    .filter((a) => a.active && a.kind === 'deadline')
    .map((auto) => {
      const field = auto.trigger.field;
      const daysBefore = Number(auto.trigger.daysBefore) || 0;
      const targetDate = addDaysStr(today, daysBefore);
      const items = state.demands.filter((d) => {
        if (DONE_STATUSES.includes(d.status)) return false;
        if (field === 'capture_date') {
          if (d.needs_capture === false) return false;
          return d.capture_date === targetDate;
        }
        return d[field] === targetDate;
      });
      return { auto, field, daysBefore, items };
    })
    .filter((g) => g.items.length);
}

function computeNotifications() {
  const today = todayStr();
  const tomorrow = addDaysStr(today, 1);
  const overdue = [];
  const dueToday = [];
  const dueTomorrow = [];
  const captureSoon = [];
  const designerSoon = [];
  const waitingClient = [];

  state.demands.forEach((d) => {
    const done = DONE_STATUSES.includes(d.status);
    if (d.prazo_final && !done) {
      if (d.prazo_final < today) overdue.push(d);
      else if (d.prazo_final === today) dueToday.push(d);
      else if (d.prazo_final === tomorrow) dueTomorrow.push(d);
    }
    if (d.needs_capture !== false && d.capture_date && (d.capture_date === today || d.capture_date === tomorrow)) {
      captureSoon.push(d);
    }
    if (d.prazo_designer && !done && (d.prazo_designer === today || d.prazo_designer === tomorrow)) {
      designerSoon.push(d);
    }
    if (['em_aprovacao_cliente', 'aprovacao_briefing'].includes(d.status)) {
      waitingClient.push(d);
    }
  });

  const deadlineAlerts = computeDeadlineAlerts();
  return { overdue, dueToday, dueTomorrow, captureSoon, designerSoon, waitingClient, deadlineAlerts };
}

function updateNavBadges() {
  const badge = document.getElementById('nav-badge-notif');
  if (!badge) return;
  const n = computeNotifications();
  const alertIds = new Set();
  n.deadlineAlerts.forEach((g) => g.items.forEach((d) => alertIds.add(d.id)));
  n.overdue.forEach((d) => alertIds.add(d.id));
  n.dueToday.forEach((d) => alertIds.add(d.id));
  const urgent = alertIds.size;
  if (urgent > 0) {
    badge.textContent = urgent;
    badge.style.display = 'inline-flex';
  } else {
    badge.style.display = 'none';
  }
}

// ---------- Menu de contexto (clique direito) ----------
function showContextMenu(x, y, items) {
  const root = document.getElementById('ctx-menu-root');
  const menuWidth = 200;
  const left = Math.min(x, window.innerWidth - menuWidth - 12);
  const top = Math.min(y, window.innerHeight - items.length * 34 - 24);
  root.innerHTML = `
    <div class="ctx-menu" style="left:${left}px; top:${top}px">
      ${items.map((it, i) => `<div class="ctx-item ${it.danger ? 'danger' : ''}" data-i="${i}"><span class="ctx-icon">${it.icon || ''}</span>${escapeHtml(it.label)}</div>`).join('')}
    </div>
  `;
  root.querySelectorAll('.ctx-item').forEach((el, i) => {
    el.onclick = (e) => {
      e.stopPropagation();
      closeContextMenu();
      items[i].onClick();
    };
  });
  setTimeout(() => document.addEventListener('click', closeContextMenu, { once: true }), 0);
}
function closeContextMenu() {
  const root = document.getElementById('ctx-menu-root');
  if (root) root.innerHTML = '';
}

// ---------- Dashboard ----------
function renderDashboard(main) {
  const totalClients = state.clients.filter((c) => c.status === 'ativo').length;
  const totalDemands = state.demands.length;
  const overdue = state.demands.filter((d) => d.prazo_final && d.prazo_final < todayStr() && !DONE_STATUSES.includes(d.status)).length;
  const waitingClient = state.demands.filter((d) => d.status === 'em_aprovacao_cliente' || d.status === 'aprovacao_briefing').length;

  const recentDemands = [...state.demands]
    .sort((a, b) => (b.created_at || '').localeCompare(a.created_at || ''))
    .slice(0, 6);

  main.innerHTML = `
    <div class="page-header">
      <div>
        <h1>Dashboard</h1>
        <p>Visão geral da operação da WAS</p>
      </div>
    </div>
    <div class="grid-cards">
      <div class="stat-card"><div class="num">${totalClients}</div><div class="label">Clientes ativos</div></div>
      <div class="stat-card"><div class="num">${totalDemands}</div><div class="label">Demandas no pipeline</div></div>
      <div class="stat-card"><div class="num" style="color:${overdue ? 'var(--red)' : 'var(--text)'}">${overdue}</div><div class="label">Atrasadas</div></div>
      <div class="stat-card"><div class="num" style="color:${waitingClient ? 'var(--yellow)' : 'var(--text)'}">${waitingClient}</div><div class="label">Aguardando cliente</div></div>
    </div>
    <div class="page-header"><h1 style="font-size:16px">Últimas demandas</h1></div>
    <div class="card-list">
      ${recentDemands.length ? recentDemands.map((d) => {
        const sd = statusDef(d.status);
        return `
        <div class="client-card" data-open="${d.id}">
          <div>
            <div class="name">${escapeHtml(d.title)}</div>
            <div class="meta"><span class="tag tag-${clientColor(d.client_id)}">${escapeHtml(clientName(d.client_id))}</span> · vence ${formatDateBR(d.prazo_final) || 'sem data'}</div>
          </div>
          <span class="tag tag-${sd.color}">${sd.label}</span>
        </div>
      `;
      }).join('') : '<div class="empty-state">Nenhuma demanda cadastrada ainda.</div>'}
    </div>
  `;
  main.querySelectorAll('.client-card[data-open]').forEach((el) => {
    el.onclick = () => openDemandModal(state.demands.find((d) => d.id === el.dataset.open));
  });
}

// ---------- Clientes (galeria estilo Notion) ----------
function renderClientes(main) {
  main.innerHTML = `
    <div class="page-header">
      <div>
        <h1>Clientes</h1>
        <p>${state.clients.length} cadastrados</p>
      </div>
      <button class="btn" id="btn-new-client">+ Novo cliente</button>
    </div>
    <div class="clients-grid" id="client-grid"></div>
  `;
  document.getElementById('btn-new-client').onclick = () => openClientModal();
  const grid = document.getElementById('client-grid');
  if (!state.clients.length) {
    grid.innerHTML = '<div class="empty-state">Nenhum cliente cadastrado. Clique em "Novo cliente" para começar.</div>';
    return;
  }
  grid.innerHTML = state.clients.map((c) => {
    const portalUrl = `${location.origin}/portal?slug=${c.portal_slug}`;
    const activeDemands = state.demands.filter((d) => d.client_id === c.id && d.status !== 'arquivado').length;
    const metaParts = [c.segment, c.contact_name].filter(Boolean);
    return `
    <div class="client-tile" data-open="${c.id}">
      <div class="ct-top">
        <div class="ct-avatar tag-${c.color || 'default'}">${initials(c.name)}</div>
        <span class="badge ${c.status}">${c.status}</span>
      </div>
      <div class="ct-name">${escapeHtml(c.name)}</div>
      <div class="ct-meta">${metaParts.length ? escapeHtml(metaParts.join(' · ')) : `${activeDemands} demanda${activeDemands === 1 ? '' : 's'} ativa${activeDemands === 1 ? '' : 's'}`}</div>
      <div class="ct-actions">
        <button class="icon-btn" data-edit="${c.id}" title="Editar">✏️</button>
        <button class="icon-btn" data-copy="${portalUrl}" title="Copiar link do portal">🔗</button>
        <button class="icon-btn danger" data-del="${c.id}" title="Excluir">🗑</button>
      </div>
    </div>`;
  }).join('');

  grid.querySelectorAll('.client-tile').forEach((tile) => {
    tile.onclick = async (e) => {
      if (e.target.closest('.icon-btn')) return;
      state.currentClientId = tile.dataset.open;
      state.currentPageId = null;
      state.calendarCursor = null;
      state.page = 'cliente-detail';
      document.querySelectorAll('.nav-item').forEach((n) => n.classList.remove('active'));
      state.pages = await api('/pages?client_id=' + state.currentClientId);
      render();
    };
  });
  grid.querySelectorAll('[data-edit]').forEach((btn) => {
    btn.onclick = (e) => { e.stopPropagation(); openClientModal(state.clients.find((c) => c.id === btn.dataset.edit)); };
  });
  grid.querySelectorAll('[data-del]').forEach((btn) => {
    btn.onclick = async (e) => {
      e.stopPropagation();
      const ok = await confirmDialog('Excluir este cliente e todas as demandas/páginas vinculadas?');
      if (!ok) return;
      await api('/clients/' + btn.dataset.del, { method: 'DELETE' });
      await loadAll();
      render();
      toast('Cliente excluído.', 'success');
    };
  });
  grid.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(btn.dataset.copy);
      const original = btn.textContent;
      btn.textContent = '✅';
      setTimeout(() => (btn.textContent = original), 1200);
      toast('Link do portal copiado.', 'success');
    };
  });
}

function openClientModal(client) {
  const isEdit = !!client;
  client = client || { name: '', segment: '', status: 'ativo', contact_name: '', contact_email: '', notes: '' };
  showModal(`
    <h2>${isEdit ? 'Editar cliente' : 'Novo cliente'}</h2>
    <label>Nome</label>
    <input type="text" id="f-name" value="${escapeHtml(client.name)}" style="width:100%" />
    <label>Segmento</label>
    <input type="text" id="f-segment" value="${escapeHtml(client.segment)}" style="width:100%" />
    <label>Status</label>
    <select id="f-status" style="width:100%">
      ${['ativo', 'pausado', 'prospect', 'encerrado'].map((s) => `<option value="${s}" ${client.status === s ? 'selected' : ''}>${s}</option>`).join('')}
    </select>
    <label>Contato (nome)</label>
    <input type="text" id="f-contact-name" value="${escapeHtml(client.contact_name)}" style="width:100%" />
    <label>Contato (email)</label>
    <input type="email" id="f-contact-email" value="${escapeHtml(client.contact_email)}" style="width:100%" />
    <label>Notas</label>
    <textarea id="f-notes">${escapeHtml(client.notes)}</textarea>
    ${!isEdit ? '<p style="color:var(--text-dim);font-size:12px;margin-top:10px">Assim que criado, o cliente já recebe a estrutura padrão: Calendário de Entrega, Planejamento e Brand Guide e Acessos.</p>' : ''}
    <div class="modal-footer">
      <button class="btn secondary" id="btn-cancel">Cancelar</button>
      <button class="btn" id="btn-save">Salvar</button>
    </div>
  `);
  document.getElementById('btn-cancel').onclick = closeModal;
  document.getElementById('btn-save').onclick = async () => {
    const payload = {
      name: document.getElementById('f-name').value.trim(),
      segment: document.getElementById('f-segment').value.trim(),
      status: document.getElementById('f-status').value,
      contact_name: document.getElementById('f-contact-name').value.trim(),
      contact_email: document.getElementById('f-contact-email').value.trim(),
      notes: document.getElementById('f-notes').value.trim(),
    };
    if (!payload.name) { toast('Informe o nome do cliente.', 'warn'); return; }
    if (isEdit) await api('/clients/' + client.id, { method: 'PUT', body: JSON.stringify(payload) });
    else await api('/clients', { method: 'POST', body: JSON.stringify(payload) });
    closeModal();
    await loadAll();
    render();
    toast(isEdit ? 'Cliente atualizado.' : 'Cliente criado com a estrutura padrão.', 'success');
  };
}

// ---------- Workspace do cliente (páginas dentro de páginas, estilo Notion) ----------
function buildPageTree(pages, parentId) {
  return pages
    .filter((p) => p.parent_id === parentId)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((p) => ({ ...p, children: buildPageTree(pages, p.id) }));
}

function pageIcon(n) {
  if (n.type === 'folder') return '📁';
  if (n.type === 'calendar') return '📅';
  return '📄';
}

function renderPageTreeNodes(nodes, depth) {
  return nodes.map((n) => {
    const isOpen = state.expandedFolders.has(n.id);
    const isActive = state.currentPageId === n.id;
    const hasChildren = n.children && n.children.length > 0;
    let html = `
      <div class="page-tree-row" style="padding-left:${depth * 14}px">
        <span class="ptree-toggle" data-toggle="${n.id}">${hasChildren ? (isOpen ? '▾' : '▸') : ''}</span>
        <span class="page-tree-item ${isActive ? 'active' : ''}" data-id="${n.id}" data-type="${n.type}">
          <span class="ptree-icon">${pageIcon(n)}</span>
          <span class="ptree-title">${escapeHtml(n.title)}</span>
        </span>
        <span class="ptree-add" data-addchild="${n.id}" title="Nova subpágina">+</span>
      </div>
    `;
    if (hasChildren && isOpen) {
      html += renderPageTreeNodes(n.children, depth + 1);
    }
    return html;
  }).join('');
}

function renderClienteDetail(main) {
  const client = clientById(state.currentClientId);
  if (!client) {
    state.page = 'clientes';
    return renderClientes(main);
  }
  const tree = buildPageTree(state.pages, null);
  const currentPage = state.pages.find((p) => p.id === state.currentPageId);

  main.innerHTML = `
    <div class="page-header">
      <div>
        <a href="#" id="back-to-clients" class="back-link">&larr; Voltar para Clientes</a>
        <h1 style="margin-top:8px"><span class="tag tag-${client.color || 'default'} tag-lg">${escapeHtml(client.name)}</span></h1>
        <p>Workspace do cliente — páginas, calendário, planejamento e acessos</p>
      </div>
    </div>
    <div class="client-workspace">
      <div class="ptree-panel">
        <button class="btn secondary small" id="btn-new-root-page" style="width:100%;margin-bottom:10px">+ Nova página</button>
        <div class="ptree-list" id="ptree-list">
          ${tree.length ? renderPageTreeNodes(tree, 0) : '<div class="empty-state" style="padding:16px">Nenhuma página ainda.</div>'}
        </div>
      </div>
      <div class="page-editor" id="page-editor"></div>
    </div>
  `;

  document.getElementById('back-to-clients').onclick = (e) => {
    e.preventDefault();
    state.page = 'clientes';
    state.currentClientId = null;
    render();
  };

  document.getElementById('btn-new-root-page').onclick = () => quickCreatePage(null);

  document.querySelectorAll('.ptree-toggle').forEach((el) => {
    el.onclick = (e) => {
      e.stopPropagation();
      const id = el.dataset.toggle;
      if (state.expandedFolders.has(id)) state.expandedFolders.delete(id);
      else state.expandedFolders.add(id);
      renderClienteDetail(main);
    };
  });
  document.querySelectorAll('.ptree-add').forEach((el) => {
    el.onclick = (e) => {
      e.stopPropagation();
      quickCreatePage(el.dataset.addchild);
    };
  });
  document.querySelectorAll('.page-tree-item').forEach((el) => {
    el.onclick = () => {
      const id = el.dataset.id;
      state.currentPageId = id;
      state.calendarCursor = null;
      state.expandedFolders.add(id);
      renderClienteDetail(main);
    };
  });

  renderPageEditor(currentPage);
}

// Cria a página direto (sem popup) e abre com o título pronto para reescrever.
async function quickCreatePage(parentId) {
  const page = await api('/pages', {
    method: 'POST',
    body: JSON.stringify({ client_id: state.currentClientId, parent_id: parentId, type: 'page', title: 'Nova página' }),
  });
  state.pages = await api('/pages?client_id=' + state.currentClientId);
  if (parentId) state.expandedFolders.add(parentId);
  state.currentPageId = page.id;
  state.calendarCursor = null;
  state.focusTitleForPageId = page.id;
  render();
  return page;
}

function renderPageEditor(page) {
  const editor = document.getElementById('page-editor');
  if (!editor) return;
  if (!page) {
    editor.innerHTML = '<div class="empty-state">Selecione uma página à esquerda, ou crie uma nova. Dentro da página, use "/" para inserir títulos, listas, divisores ou uma subpágina.</div>';
    return;
  }

  if (page.type === 'calendar') {
    renderCalendarPage(editor, page);
    return;
  }

  const children = state.pages.filter((p) => p.parent_id === page.id);

  editor.innerHTML = `
    <div class="editor-toolbar">
      <input type="text" id="page-title-input" value="${escapeHtml(page.title)}" />
      <span class="editor-status" id="editor-status"></span>
      <button class="btn danger small" id="btn-del-page">Excluir</button>
    </div>
    <div class="page-content" id="page-content" contenteditable="true">${page.content || ''}</div>
    <div class="page-children">
      <div class="page-children-label">Subpáginas</div>
      <div class="page-children-list">
        ${children.map((c) => `<div class="page-child-chip" data-open="${c.id}">${pageIcon(c)} ${escapeHtml(c.title)}</div>`).join('')}
        <div class="page-child-chip add" id="btn-add-subpage">+ Nova subpágina</div>
      </div>
    </div>
  `;

  const contentEl = document.getElementById('page-content');
  const statusEl = document.getElementById('editor-status');
  const titleInput = document.getElementById('page-title-input');

  function flashSaved() {
    statusEl.textContent = 'Salvo ✓';
    statusEl.classList.add('show');
    setTimeout(() => statusEl.classList.remove('show'), 1200);
  }

  const autosaveContent = debounce(async () => {
    await api('/pages/' + page.id, { method: 'PUT', body: JSON.stringify({ content: contentEl.innerHTML }) });
    const idx = state.pages.findIndex((p) => p.id === page.id);
    if (idx > -1) state.pages[idx].content = contentEl.innerHTML;
    flashSaved();
  }, 500);

  contentEl.addEventListener('input', autosaveContent);
  contentEl.addEventListener('keydown', (e) => {
    if (e.key === '/') {
      e.preventDefault();
      openSlashMenu(contentEl, page, autosaveContent);
    } else if (e.key === 'Escape') {
      closeSlashMenu();
    }
  });
  contentEl.addEventListener('click', (e) => {
    const chip = e.target.closest('.page-chip');
    if (chip) {
      state.currentPageId = chip.dataset.pageId;
      state.calendarCursor = null;
      state.expandedFolders.add(page.id);
      renderClienteDetail(document.getElementById('main'));
    }
  });

  titleInput.addEventListener('input', debounce((e) => {
    savePageTitle(page, e.target.value, flashSaved);
  }, 500));

  if (state.focusTitleForPageId === page.id) {
    state.focusTitleForPageId = null;
    setTimeout(() => { titleInput.focus(); titleInput.select(); }, 0);
  }

  document.getElementById('btn-del-page').onclick = () => deletePage(page);
  document.getElementById('btn-add-subpage').onclick = () => quickCreatePage(page.id);
  editor.querySelectorAll('.page-child-chip[data-open]').forEach((chip) => {
    chip.onclick = () => {
      state.currentPageId = chip.dataset.open;
      state.calendarCursor = null;
      state.expandedFolders.add(page.id);
      renderClienteDetail(document.getElementById('main'));
    };
  });
}

// Menu "/" estilo Notion, disparado dentro do editor de páginas. Nada de popups nativos.
function openSlashMenu(contentEl, page, autosaveContent) {
  closeSlashMenu();
  const sel = window.getSelection();
  if (!sel.rangeCount) return;
  const savedRange = sel.getRangeAt(0).cloneRange();
  let rect = savedRange.getBoundingClientRect();
  if (!rect || (rect.top === 0 && rect.left === 0)) rect = contentEl.getBoundingClientRect();

  const root = document.getElementById('ctx-menu-root');
  root.innerHTML = `
    <div class="slash-menu" style="left:${rect.left}px; top:${rect.bottom + 6}px">
      ${SLASH_ITEMS.map((it, i) => `
        <div class="slash-item" data-i="${i}">
          <span class="slash-icon">${it.icon}</span>
          <div><div class="slash-label">${it.label}</div><div class="slash-hint">${it.hint}</div></div>
        </div>
      `).join('')}
    </div>
  `;

  const restore = () => {
    sel.removeAllRanges();
    sel.addRange(savedRange);
    contentEl.focus();
  };

  root.querySelectorAll('.slash-item').forEach((el, i) => {
    el.onclick = async (e) => {
      e.stopPropagation();
      const item = SLASH_ITEMS[i];
      closeSlashMenu();
      restore();
      if (item.key === 'h2') document.execCommand('formatBlock', false, 'H2');
      else if (item.key === 'h3') document.execCommand('formatBlock', false, 'H3');
      else if (item.key === 'ul') document.execCommand('insertUnorderedList');
      else if (item.key === 'ol') document.execCommand('insertOrderedList');
      else if (item.key === 'quote') document.execCommand('formatBlock', false, 'BLOCKQUOTE');
      else if (item.key === 'divider') document.execCommand('insertHTML', false, '<hr/>');
      else if (item.key === 'subpage') {
        const newPage = await api('/pages', {
          method: 'POST',
          body: JSON.stringify({ client_id: state.currentClientId, parent_id: page.id, type: 'page', title: 'Nova página' }),
        });
        state.pages = await api('/pages?client_id=' + state.currentClientId);
        document.execCommand('insertHTML', false, `<span class="page-chip" contenteditable="false" data-page-id="${newPage.id}">📄 Nova página</span>&nbsp;`);
        state.expandedFolders.add(page.id);
        state.focusTitleForPageId = newPage.id;
        autosaveContent();
        return;
      } else if (['image', 'video', 'pdf', 'html'].includes(item.key)) {
        openEmbedModal(item.key, (value) => {
          restore();
          document.execCommand('insertHTML', false, buildEmbedHtml(item.key, value));
          autosaveContent();
        });
        return;
      }
      autosaveContent();
    };
  });

  setTimeout(() => document.addEventListener('click', closeSlashMenu, { once: true }), 0);
}
function closeSlashMenu() {
  const root = document.getElementById('ctx-menu-root');
  if (root && root.querySelector('.slash-menu')) root.innerHTML = '';
}

// Blocos de mídia inseridos via "/", sempre com prévia direto na página (sem sair do site).
function youtubeEmbedUrl(url) {
  const watchMatch = url.match(/[?&]v=([\w-]{6,})/);
  const shortMatch = url.match(/youtu\.be\/([\w-]{6,})/);
  const id = (watchMatch && watchMatch[1]) || (shortMatch && shortMatch[1]);
  return id ? `https://www.youtube.com/embed/${id}` : null;
}
function vimeoEmbedUrl(url) {
  const m = url.match(/vimeo\.com\/(\d+)/);
  return m ? `https://player.vimeo.com/video/${m[1]}` : null;
}

function buildEmbedHtml(kind, value) {
  if (kind === 'image') {
    return `<div class="embed-block embed-image" contenteditable="false"><img src="${escapeHtml(value)}" alt="" /></div>&nbsp;`;
  }
  if (kind === 'video') {
    const yt = youtubeEmbedUrl(value);
    const vim = vimeoEmbedUrl(value);
    if (yt || vim) {
      return `<div class="embed-block embed-video" contenteditable="false"><iframe src="${escapeHtml(yt || vim)}" allowfullscreen></iframe></div>&nbsp;`;
    }
    return `<div class="embed-block embed-video" contenteditable="false"><video controls src="${escapeHtml(value)}"></video></div>&nbsp;`;
  }
  if (kind === 'pdf') {
    return `<div class="embed-block embed-pdf" contenteditable="false"><iframe src="${escapeHtml(value)}"></iframe></div>&nbsp;`;
  }
  if (kind === 'html') {
    return `<div class="embed-block embed-html" contenteditable="false"><iframe sandbox="allow-same-origin allow-popups" srcdoc="${escapeHtml(value)}"></iframe></div>&nbsp;`;
  }
  return '';
}

function openEmbedModal(kind, onInsert) {
  const conf = {
    image: { title: 'Inserir imagem', label: 'Link da imagem', placeholder: 'https://...', textarea: false },
    video: { title: 'Inserir vídeo', label: 'Link do YouTube, Vimeo ou vídeo direto', placeholder: 'https://youtube.com/watch?v=...', textarea: false },
    pdf: { title: 'Inserir PDF', label: 'Link do PDF', placeholder: 'https://.../arquivo.pdf', textarea: false },
    html: { title: 'Incorporar HTML', label: 'Cole o trecho de HTML/embed', placeholder: '<iframe ...></iframe>', textarea: true },
  }[kind];

  showModal(`
    <h2>${conf.title}</h2>
    <label>${conf.label}</label>
    ${conf.textarea
      ? `<textarea id="embed-value" placeholder="${escapeHtml(conf.placeholder)}" style="min-height:140px"></textarea>`
      : `<input type="text" id="embed-value" placeholder="${escapeHtml(conf.placeholder)}" style="width:100%" />`}
    <p style="color:var(--text-dim);font-size:12px;margin-top:10px">A prévia aparece direto na página, sem precisar sair do site.</p>
    <div class="modal-footer">
      <button class="btn secondary" id="btn-cancel">Cancelar</button>
      <button class="btn" id="btn-insert">Inserir</button>
    </div>
  `);
  document.getElementById('btn-cancel').onclick = closeModal;
  document.getElementById('btn-insert').onclick = () => {
    const value = document.getElementById('embed-value').value.trim();
    if (!value) { toast('Cole um link ou código antes de inserir.', 'warn'); return; }
    closeModal();
    onInsert(value);
  };
  setTimeout(() => document.getElementById('embed-value').focus(), 0);
}

// Página "Calendário de Entrega": calendário mensal de verdade, sempre com base no dia atual.
function buildMonthGrid(year, month) {
  const first = new Date(year, month, 1);
  const startWeekday = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const cells = [];
  for (let i = startWeekday - 1; i >= 0; i--) {
    cells.push({ day: daysInPrevMonth - i, inMonth: false, dateStr: null });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true, dateStr: `${year}-${String(month + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}` });
  }
  let nextDay = 1;
  while (cells.length % 7 !== 0) {
    cells.push({ day: nextDay++, inMonth: false, dateStr: null });
  }
  return cells;
}

function renderCalendarPage(editor, page) {
  if (!state.calendarCursor) {
    const now = new Date();
    state.calendarCursor = { y: now.getFullYear(), m: now.getMonth() };
  }
  const { y, m } = state.calendarCursor;
  const cells = buildMonthGrid(y, m);
  const today = todayStr();
  const demands = state.demands.filter((d) => d.client_id === state.currentClientId && d.status !== 'arquivado');

  editor.innerHTML = `
    <div class="editor-toolbar">
      <h2 style="margin:0;font-size:17px;font-weight:700">📅 ${escapeHtml(page.title)}</h2>
      <span class="synced-badge">sincronizado com Demandas</span>
      <div class="cal-nav">
        <button class="icon-btn" id="cal-prev" title="Mês anterior">‹</button>
        <span class="cal-month-label">${MONTH_LABELS[m]} de ${y}</span>
        <button class="icon-btn" id="cal-next" title="Próximo mês">›</button>
        <button class="btn secondary small" id="cal-today">Hoje</button>
      </div>
    </div>
    <div class="cal-grid">
      ${WEEKDAY_LABELS.map((w) => `<div class="cal-weekday">${w}</div>`).join('')}
      ${cells.map((cell) => {
        if (!cell.inMonth) return `<div class="cal-cell out-month"><div class="cal-daynum">${cell.day}</div></div>`;
        const finalItems = demands.filter((d) => d.prazo_final === cell.dateStr);
        const designerOnly = demands.filter((d) => d.prazo_designer === cell.dateStr && d.prazo_final !== cell.dateStr);
        const items = [
          ...finalItems.map((d) => ({ d, icon: '🚀' })),
          ...designerOnly.map((d) => ({ d, icon: '🎨' })),
        ];
        const isToday = cell.dateStr === today;
        return `
          <div class="cal-cell ${isToday ? 'is-today' : ''}">
            <div class="cal-daynum">${cell.day}${isToday ? ' <span class="cal-today-dot">hoje</span>' : ''}</div>
            <div class="cal-items">
              ${items.map(({ d, icon }) => {
                const sd = statusDef(d.status);
                return `<div class="cal-chip tag-${sd.color}" data-open="${d.id}">${icon} ${escapeHtml(d.title)}</div>`;
              }).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;

  editor.querySelector('#cal-prev').onclick = () => {
    state.calendarCursor.m -= 1;
    if (state.calendarCursor.m < 0) { state.calendarCursor.m = 11; state.calendarCursor.y -= 1; }
    renderCalendarPage(editor, page);
  };
  editor.querySelector('#cal-next').onclick = () => {
    state.calendarCursor.m += 1;
    if (state.calendarCursor.m > 11) { state.calendarCursor.m = 0; state.calendarCursor.y += 1; }
    renderCalendarPage(editor, page);
  };
  editor.querySelector('#cal-today').onclick = () => {
    const now = new Date();
    state.calendarCursor = { y: now.getFullYear(), m: now.getMonth() };
    renderCalendarPage(editor, page);
  };
  editor.querySelectorAll('.cal-chip').forEach((chip) => {
    chip.onclick = () => openDemandModal(state.demands.find((d) => d.id === chip.dataset.open));
  });
}

async function savePageTitle(page, title, flashSaved) {
  const finalTitle = title.trim() || 'Sem título';
  if (finalTitle === page.title) return;
  await api('/pages/' + page.id, { method: 'PUT', body: JSON.stringify({ title: finalTitle }) });
  page.title = finalTitle;
  const idx = state.pages.findIndex((p) => p.id === page.id);
  if (idx > -1) state.pages[idx].title = finalTitle;
  if (flashSaved) flashSaved();
}

async function deletePage(page) {
  const hasChildren = state.pages.some((p) => p.parent_id === page.id);
  const ok = await confirmDialog(`Excluir "${page.title}"${hasChildren ? ' e todas as subpáginas' : ''}?`);
  if (!ok) return;
  await api('/pages/' + page.id, { method: 'DELETE' });
  state.pages = await api('/pages?client_id=' + state.currentClientId);
  state.currentPageId = null;
  render();
  toast('Página excluída.', 'success');
}

// ---------- Demandas: filtros ----------
function filtersActiveCount() {
  const f = state.filters;
  let n = f.client.size + f.format.size + f.platform.size + f.priority.size + f.responsible.size;
  if (f.prazoDesignerFrom || f.prazoDesignerTo) n += 1;
  if (f.prazoFinalFrom || f.prazoFinalTo) n += 1;
  return n;
}

function applyFilters(list) {
  const f = state.filters;
  return list.filter((d) => {
    if (f.client.size && !f.client.has(d.client_id)) return false;
    if (f.priority.size && !f.priority.has(d.priority)) return false;
    if (f.responsible.size && !f.responsible.has(d.responsible)) return false;
    if (f.format.size && !(d.format || []).some((v) => f.format.has(v))) return false;
    if (f.platform.size && !(d.platform || []).some((v) => f.platform.has(v))) return false;
    if (f.prazoDesignerFrom && (!d.prazo_designer || d.prazo_designer < f.prazoDesignerFrom)) return false;
    if (f.prazoDesignerTo && (!d.prazo_designer || d.prazo_designer > f.prazoDesignerTo)) return false;
    if (f.prazoFinalFrom && (!d.prazo_final || d.prazo_final < f.prazoFinalFrom)) return false;
    if (f.prazoFinalTo && (!d.prazo_final || d.prazo_final > f.prazoFinalTo)) return false;
    return true;
  });
}

const FILTER_PILLS = [
  { key: 'client', label: 'Cliente', kind: 'multi' },
  { key: 'format', label: 'Formato', kind: 'multi' },
  { key: 'platform', label: 'Plataforma', kind: 'multi' },
  { key: 'priority', label: 'Prioridade', kind: 'multi' },
  { key: 'responsible', label: 'Responsável', kind: 'multi' },
  { key: 'prazoDesigner', label: 'Prazo designer', kind: 'range', fromKey: 'prazoDesignerFrom', toKey: 'prazoDesignerTo' },
  { key: 'prazoFinal', label: 'Prazo final', kind: 'range', fromKey: 'prazoFinalFrom', toKey: 'prazoFinalTo' },
];

function filterPillOptions(key) {
  if (key === 'client') return state.clients.map((c) => ({ value: c.id, label: c.name }));
  if (key === 'format') return FORMATO_OPTIONS.map((o) => ({ value: o.name, label: o.name }));
  if (key === 'platform') return PLATAFORMA_OPTIONS.map((o) => ({ value: o.name, label: o.name }));
  if (key === 'priority') return PRIORIDADE_OPTIONS.map((o) => ({ value: o.key, label: o.label }));
  if (key === 'responsible') {
    const names = new Set(activeTeamNames());
    state.demands.forEach((d) => { if (d.responsible) names.add(d.responsible); });
    return Array.from(names).map((n) => ({ value: n, label: n }));
  }
  return [];
}

function renderFilterBar(container) {
  const active = filtersActiveCount();
  container.innerHTML = `
    <div class="filter-bar">
      ${FILTER_PILLS.map((p) => {
        let count = 0;
        if (p.kind === 'multi') count = state.filters[p.key].size;
        else count = (state.filters[p.fromKey] || state.filters[p.toKey]) ? 1 : 0;
        return `<button class="filter-pill ${count ? 'active' : ''} ${state.openFilterKey === p.key ? 'open' : ''}" data-pill="${p.key}">${p.label}${count ? ` <span class="pill-count">${count}</span>` : ''} <span class="pill-caret">▾</span></button>`;
      }).join('')}
      ${active ? '<button class="filter-clear" id="filters-clear">Limpar filtros</button>' : ''}
    </div>
    <div id="filter-popover-slot"></div>
  `;

  container.querySelectorAll('[data-pill]').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      state.openFilterKey = state.openFilterKey === btn.dataset.pill ? null : btn.dataset.pill;
      renderFilterBar(container);
      if (state.openFilterKey) {
        setTimeout(() => document.addEventListener('click', (ev) => {
          if (!ev.target.closest('.filter-popover') && !ev.target.closest('[data-pill]')) {
            state.openFilterKey = null;
            renderFilterBar(container);
          }
        }, { once: true }), 0);
      }
    };
  });
  const clearBtn = document.getElementById('filters-clear');
  if (clearBtn) clearBtn.onclick = () => {
    state.filters.client.clear(); state.filters.format.clear(); state.filters.platform.clear();
    state.filters.priority.clear(); state.filters.responsible.clear();
    state.filters.prazoDesignerFrom = ''; state.filters.prazoDesignerTo = '';
    state.filters.prazoFinalFrom = ''; state.filters.prazoFinalTo = '';
    state.openFilterKey = null;
    renderDemandas(document.getElementById('main'));
  };

  if (!state.openFilterKey) return;
  const pillDef = FILTER_PILLS.find((p) => p.key === state.openFilterKey);
  const slot = document.getElementById('filter-popover-slot');
  const pillBtn = container.querySelector(`[data-pill="${pillDef.key}"]`);
  const rect = pillBtn.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();

  if (pillDef.kind === 'multi') {
    const options = filterPillOptions(pillDef.key);
    const showSearch = options.length > 6;
    slot.innerHTML = `
      <div class="filter-popover" style="left:${rect.left - containerRect.left}px; top:${rect.bottom - containerRect.top + 6}px">
        ${showSearch ? `<div class="filter-search"><span class="filter-search-icon">🔎</span><input type="text" id="filter-search-input" placeholder="Buscar ${escapeHtml(pillDef.label.toLowerCase())}..." /></div>` : ''}
        <div class="filter-opt-list">
          ${options.length ? options.map((o) => `
            <label class="filter-opt" data-label="${escapeHtml(o.label.toLowerCase())}">
              <input type="checkbox" value="${escapeHtml(o.value)}" ${state.filters[pillDef.key].has(o.value) ? 'checked' : ''} />
              ${escapeHtml(o.label)}
            </label>
          `).join('') : '<div class="filter-popover-empty">Nada para filtrar ainda.</div>'}
        </div>
      </div>
    `;
    slot.querySelectorAll('input[type=checkbox]').forEach((cb) => {
      cb.onchange = () => {
        if (cb.checked) state.filters[pillDef.key].add(cb.value);
        else state.filters[pillDef.key].delete(cb.value);
        renderDemandas(document.getElementById('main'));
      };
    });
    const searchInput = document.getElementById('filter-search-input');
    if (searchInput) {
      searchInput.addEventListener('click', (e) => e.stopPropagation());
      searchInput.addEventListener('input', () => {
        const q = searchInput.value.trim().toLowerCase();
        slot.querySelectorAll('.filter-opt').forEach((el) => {
          el.style.display = el.dataset.label.includes(q) ? '' : 'none';
        });
      });
      setTimeout(() => searchInput.focus(), 0);
    }
  } else {
    slot.innerHTML = `
      <div class="filter-popover range" style="left:${rect.left - containerRect.left}px; top:${rect.bottom - containerRect.top + 6}px">
        <label>De</label>
        <input type="date" id="range-from" value="${state.filters[pillDef.fromKey] || ''}" />
        <label>Até</label>
        <input type="date" id="range-to" value="${state.filters[pillDef.toKey] || ''}" />
      </div>
    `;
    document.getElementById('range-from').onchange = (e) => {
      state.filters[pillDef.fromKey] = e.target.value;
      renderDemandas(document.getElementById('main'));
    };
    document.getElementById('range-to').onchange = (e) => {
      state.filters[pillDef.toKey] = e.target.value;
      renderDemandas(document.getElementById('main'));
    };
  }
}

// ---------- Demandas: Kanban + Tabela ----------
function renderDemandas(main) {
  main.innerHTML = `
    <div class="page-header">
      <div>
        <h1>Demandas</h1>
        <p>${state.demands.length} no total</p>
      </div>
      <div style="display:flex;gap:8px;align-items:center">
        <div class="view-toggle">
          <button class="view-toggle-btn ${state.demandsView === 'kanban' ? 'active' : ''}" id="view-kanban">📋 Kanban</button>
          <button class="view-toggle-btn ${state.demandsView === 'table' ? 'active' : ''}" id="view-table">📊 Tabela</button>
        </div>
        <button class="btn" id="btn-new-demand">+ Nova demanda</button>
      </div>
    </div>
    <div class="toolbar" id="filter-bar-container"></div>
    <div id="demands-view"></div>
  `;
  document.getElementById('btn-new-demand').onclick = () => openDemandModal();
  document.getElementById('view-kanban').onclick = () => { state.demandsView = 'kanban'; renderDemandas(main); };
  document.getElementById('view-table').onclick = () => { state.demandsView = 'table'; renderDemandas(main); };
  renderFilterBar(document.getElementById('filter-bar-container'));

  const filtered = applyFilters(state.demands);
  const viewRoot = document.getElementById('demands-view');
  if (state.demandsView === 'table') renderDemandTable(viewRoot, filtered);
  else renderKanban(viewRoot, filtered);
}

function renderKanban(root, filtered) {
  root.innerHTML = `<div class="kanban" id="kanban"></div>`;
  const kanban = document.getElementById('kanban');
  kanban.innerHTML = KANBAN_STAGES.map((stage) => {
    const cols = STATUS_DEFS.filter((s) => s.stage === stage.key);
    const stageCount = cols.reduce((sum, col) => sum + filtered.filter((d) => d.status === col.key).length, 0);
    const collapsed = state.collapsedStages.has(stage.key);
    return `
      <div class="stage-group ${collapsed ? 'collapsed' : ''}">
        <div class="stage-label" data-stage="${stage.key}">
          <span class="stage-chevron">${collapsed ? '▸' : '▾'}</span> ${stage.label}
          <span class="count">${stageCount}</span>
        </div>
        ${collapsed ? '' : `
        <div class="stage-cols">
          ${cols.map((col) => {
            const items = filtered.filter((d) => d.status === col.key);
            return `
              <div class="kanban-col" data-status="${col.key}">
                <div class="col-head">
                  <span class="col-dot tag-${col.color}" style="background:currentColor"></span>
                  <h3>${col.label}</h3>
                  <span class="count">${items.length}</span>
                </div>
                <div class="col-body" data-status="${col.key}">
                  ${items.map((d) => renderDemandCard(d)).join('')}
                </div>
              </div>
            `;
          }).join('')}
        </div>
        `}
      </div>
    `;
  }).join('');

  kanban.querySelectorAll('.stage-label').forEach((el) => {
    el.onclick = () => {
      const key = Number(el.dataset.stage);
      if (state.collapsedStages.has(key)) state.collapsedStages.delete(key);
      else state.collapsedStages.add(key);
      renderDemandas(document.getElementById('main'));
    };
  });

  wireDemandCardEvents(kanban);

  kanban.querySelectorAll('.col-body').forEach((col) => {
    col.addEventListener('dragover', (e) => { e.preventDefault(); col.classList.add('drag-over'); });
    col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
    col.addEventListener('drop', async (e) => {
      e.preventDefault();
      col.classList.remove('drag-over');
      const demandId = e.dataTransfer.getData('text/plain');
      const newStatus = col.dataset.status;
      const demand = state.demands.find((d) => d.id === demandId);
      if (!demand || demand.status === newStatus) return;
      demand.status = newStatus; // atualização otimista
      renderDemandas(document.getElementById('main'));
      await api('/demands/' + demandId, { method: 'PUT', body: JSON.stringify({ status: newStatus }) });
    });
  });
}

function wireDemandCardEvents(root) {
  root.querySelectorAll('.demand-card').forEach((el) => {
    const demand = state.demands.find((d) => d.id === el.dataset.id);
    el.onclick = () => openDemandModal(demand);
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showContextMenu(e.pageX, e.pageY, [
        { label: 'Abrir', icon: '✏️', onClick: () => openDemandModal(demand) },
        {
          label: 'Excluir demanda', icon: '🗑', danger: true, onClick: async () => {
            const ok = await confirmDialog(`Excluir "${demand.title}"?`);
            if (!ok) return;
            await api('/demands/' + demand.id, { method: 'DELETE' });
            await loadAll();
            render();
            toast('Demanda excluída.', 'success');
          },
        },
      ]);
    });
    el.addEventListener('dragstart', (e) => {
      e.dataTransfer.setData('text/plain', el.dataset.id);
      el.classList.add('dragging');
    });
    el.addEventListener('dragend', () => el.classList.remove('dragging'));
  });
}

function renderDemandCard(d) {
  const tags = [
    ...(d.format || []).map((f) => `<span class="tag tag-${(FORMATO_OPTIONS.find((o) => o.name === f) || {}).color || 'gray'}">${escapeHtml(f)}</span>`),
    ...(d.platform || []).map((p) => `<span class="tag tag-${(PLATAFORMA_OPTIONS.find((o) => o.name === p) || {}).color || 'gray'}">${escapeHtml(p)}</span>`),
  ].join('');
  let captureBadge;
  if (d.needs_capture === false) {
    captureBadge = '<span class="tag tag-gray">sem captação</span>';
  } else if (d.capture_date) {
    captureBadge = `<span class="tag tag-orange">🎬 ${formatDateBR(d.capture_date)}</span>`;
  } else {
    captureBadge = '<span class="tag tag-default">captação a definir</span>';
  }
  const overdue = d.prazo_final && d.prazo_final < todayStr() && !DONE_STATUSES.includes(d.status);
  return `
    <div class="demand-card" data-id="${d.id}" draggable="true">
      <div class="title">${escapeHtml(d.title)}</div>
      ${tags ? `<div class="tag-group">${tags}</div>` : ''}
      <div class="tag-group">${captureBadge}${d.briefing ? '<span class="tag tag-blue">📝 briefing</span>' : ''}</div>
      <div class="sub">
        <span><span class="priority-dot ${d.priority}"></span>${escapeHtml(clientName(d.client_id))}${d.responsible ? ' · ' + escapeHtml(d.responsible) : ''}</span>
        <span class="${overdue ? 'overdue-text' : ''}">${formatDateBR(d.prazo_final) || formatDateBR(d.prazo_designer) || ''}</span>
      </div>
    </div>
  `;
}

// ---------- Tabela: edição inline (sem abrir o card) + edição em massa ----------
async function patchInline(demand, payload, opts) {
  await api('/demands/' + demand.id, { method: 'PUT', body: JSON.stringify(payload) });
  Object.assign(demand, payload);
  const idx = state.demands.findIndex((d) => d.id === demand.id);
  if (idx > -1) state.demands[idx] = { ...state.demands[idx], ...payload };
  updateNavBadges();
  if (!opts || opts.rerender !== false) renderDemandas(document.getElementById('main'));
}
const patchInlineDebounced = debounce((demand, payload) => patchInline(demand, payload, { rerender: false }), 500);

function openInlineMultiPopover(anchorEl, options, selectedValues, onChange) {
  const root = document.getElementById('ctx-menu-root');
  const rect = anchorEl.getBoundingClientRect();
  const left = Math.min(rect.left, window.innerWidth - 240);
  root.innerHTML = `
    <div class="inline-popover" style="left:${left}px; top:${rect.bottom + 4}px">
      ${options.length ? options.map((o) => `
        <label class="filter-opt">
          <input type="checkbox" value="${escapeHtml(o)}" ${selectedValues.includes(o) ? 'checked' : ''} />
          ${escapeHtml(o)}
        </label>
      `).join('') : '<div class="filter-popover-empty">Nada disponível.</div>'}
    </div>
  `;
  root.querySelectorAll('input[type=checkbox]').forEach((cb) => {
    cb.onclick = (e) => e.stopPropagation();
    cb.onchange = () => {
      let next = selectedValues.slice();
      if (cb.checked) next.push(cb.value);
      else next = next.filter((v) => v !== cb.value);
      root.innerHTML = '';
      onChange(next);
    };
  });
  setTimeout(() => document.addEventListener('click', () => { root.innerHTML = ''; }, { once: true }), 0);
}

function renderDemandTable(root, filtered) {
  const sorted = [...filtered].sort((a, b) => (a.prazo_final || '9999').localeCompare(b.prazo_final || '9999'));
  const teamNames = activeTeamNames();

  root.innerHTML = `
    <div id="bulk-bar-slot"></div>
    <div class="table-wrap">
      <table class="data-table editable">
        <thead>
          <tr>
            <th style="width:30px"><input type="checkbox" id="check-all" /></th>
            <th>Demanda</th><th>Cliente</th><th>Status</th><th>Formato</th><th>Plataforma</th>
            <th>Responsável</th><th>Prioridade</th><th>Prazo designer</th><th>Prazo final</th><th>Captação</th><th></th>
          </tr>
        </thead>
        <tbody>
          ${sorted.length ? sorted.map((d) => {
            const overdue = d.prazo_final && d.prazo_final < todayStr() && !DONE_STATUSES.includes(d.status);
            const respOptions = d.responsible && !teamNames.includes(d.responsible) ? [...teamNames, d.responsible] : teamNames;
            return `
              <tr data-id="${d.id}">
                <td><input type="checkbox" class="row-check" data-id="${d.id}" ${state.selectedDemandIds.has(d.id) ? 'checked' : ''} /></td>
                <td class="td-title"><input type="text" class="cell-input cell-title" data-id="${d.id}" value="${escapeHtml(d.title)}" /></td>
                <td>
                  <select class="cell-select" data-id="${d.id}" data-field="client_id">
                    ${state.clients.map((c) => `<option value="${c.id}" ${d.client_id === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
                  </select>
                </td>
                <td>
                  <select class="cell-select tag-${statusDef(d.status).color}" data-id="${d.id}" data-field="status">
                    ${STAGES.map((stage) => `<optgroup label="${stage.label}">${STATUS_DEFS.filter((s) => s.stage === stage.key).map((s) => `<option value="${s.key}" ${d.status === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}</optgroup>`).join('')}
                  </select>
                </td>
                <td><button class="cell-multi-btn" data-id="${d.id}" data-field="format">${(d.format || []).join(', ') || '+ adicionar'}</button></td>
                <td><button class="cell-multi-btn" data-id="${d.id}" data-field="platform">${(d.platform || []).join(', ') || '+ adicionar'}</button></td>
                <td>
                  <select class="cell-select" data-id="${d.id}" data-field="responsible">
                    <option value="">—</option>
                    ${respOptions.map((n) => `<option value="${escapeHtml(n)}" ${d.responsible === n ? 'selected' : ''}>${escapeHtml(n)}</option>`).join('')}
                  </select>
                </td>
                <td>
                  <select class="cell-select" data-id="${d.id}" data-field="priority">
                    ${PRIORIDADE_OPTIONS.map((p) => `<option value="${p.key}" ${d.priority === p.key ? 'selected' : ''}>${p.label}</option>`).join('')}
                  </select>
                </td>
                <td><input type="date" class="cell-input" data-id="${d.id}" data-field="prazo_designer" value="${d.prazo_designer || ''}" /></td>
                <td class="${overdue ? 'overdue-cell' : ''}"><input type="date" class="cell-input" data-id="${d.id}" data-field="prazo_final" value="${d.prazo_final || ''}" /></td>
                <td class="cell-capture">
                  <label class="capture-toggle"><input type="checkbox" class="cell-capture-toggle" data-id="${d.id}" ${d.needs_capture !== false ? 'checked' : ''} /> 🎬</label>
                  ${d.needs_capture !== false ? `<input type="date" class="cell-input cell-capture-date" data-id="${d.id}" value="${d.capture_date || ''}" />` : ''}
                </td>
                <td><button class="icon-btn" data-expand="${d.id}" title="Abrir card completo">⤢</button></td>
              </tr>
            `;
          }).join('') : `<tr><td colspan="12"><div class="empty-state">Nenhuma demanda encontrada com esses filtros.</div></td></tr>`}
        </tbody>
      </table>
    </div>
  `;

  renderBulkBar(document.getElementById('bulk-bar-slot'));

  root.querySelectorAll('tr[data-id]').forEach((tr) => {
    const demand = state.demands.find((d) => d.id === tr.dataset.id);
    tr.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showContextMenu(e.pageX, e.pageY, [
        { label: 'Abrir', icon: '✏️', onClick: () => openDemandModal(demand) },
        {
          label: 'Excluir demanda', icon: '🗑', danger: true, onClick: async () => {
            const ok = await confirmDialog(`Excluir "${demand.title}"?`);
            if (!ok) return;
            await api('/demands/' + demand.id, { method: 'DELETE' });
            state.selectedDemandIds.delete(demand.id);
            await loadAll();
            render();
            toast('Demanda excluída.', 'success');
          },
        },
      ]);
    });
  });

  root.querySelectorAll('.row-check').forEach((cb) => {
    cb.onclick = (e) => e.stopPropagation();
    cb.onchange = () => {
      if (cb.checked) state.selectedDemandIds.add(cb.dataset.id);
      else state.selectedDemandIds.delete(cb.dataset.id);
      renderBulkBar(document.getElementById('bulk-bar-slot'));
      const headCb = document.getElementById('check-all');
      if (headCb) headCb.checked = sorted.length > 0 && sorted.every((d) => state.selectedDemandIds.has(d.id));
    };
  });
  const checkAll = document.getElementById('check-all');
  if (checkAll) {
    checkAll.checked = sorted.length > 0 && sorted.every((d) => state.selectedDemandIds.has(d.id));
    checkAll.onchange = () => {
      if (checkAll.checked) sorted.forEach((d) => state.selectedDemandIds.add(d.id));
      else sorted.forEach((d) => state.selectedDemandIds.delete(d.id));
      renderDemandas(document.getElementById('main'));
    };
  }

  root.querySelectorAll('.cell-title').forEach((input) => {
    input.onclick = (e) => e.stopPropagation();
    input.addEventListener('input', () => {
      const demand = state.demands.find((d) => d.id === input.dataset.id);
      patchInlineDebounced(demand, { title: input.value.trim() || 'Sem título' });
    });
  });

  root.querySelectorAll('.cell-select').forEach((sel) => {
    sel.onclick = (e) => e.stopPropagation();
    sel.onchange = () => {
      const demand = state.demands.find((d) => d.id === sel.dataset.id);
      patchInline(demand, { [sel.dataset.field]: sel.value });
    };
  });

  root.querySelectorAll('input[type=date].cell-input').forEach((inp) => {
    inp.onclick = (e) => e.stopPropagation();
    inp.onchange = () => {
      const demand = state.demands.find((d) => d.id === inp.dataset.id);
      patchInline(demand, { [inp.dataset.field]: inp.value });
    };
  });

  root.querySelectorAll('.cell-capture-toggle').forEach((cb) => {
    cb.onclick = (e) => e.stopPropagation();
    cb.onchange = () => {
      const demand = state.demands.find((d) => d.id === cb.dataset.id);
      patchInline(demand, { needs_capture: cb.checked, capture_date: cb.checked ? demand.capture_date : '' });
    };
  });
  root.querySelectorAll('.cell-capture-date').forEach((inp) => {
    inp.onclick = (e) => e.stopPropagation();
    inp.onchange = () => {
      const demand = state.demands.find((d) => d.id === inp.dataset.id);
      patchInline(demand, { capture_date: inp.value });
    };
  });

  root.querySelectorAll('.cell-multi-btn').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const demand = state.demands.find((d) => d.id === btn.dataset.id);
      const field = btn.dataset.field;
      const options = (field === 'format' ? FORMATO_OPTIONS : PLATAFORMA_OPTIONS).map((o) => o.name);
      openInlineMultiPopover(btn, options, demand[field] || [], (next) => {
        patchInline(demand, { [field]: next });
      });
    };
  });

  root.querySelectorAll('[data-expand]').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      openDemandModal(state.demands.find((d) => d.id === btn.dataset.expand));
    };
  });
}

function renderBulkBar(slot) {
  const n = state.selectedDemandIds.size;
  if (!n) { slot.innerHTML = ''; return; }
  slot.innerHTML = `
    <div class="bulk-bar">
      <span class="bulk-count">${n} selecionada${n === 1 ? '' : 's'}</span>
      <select id="bulk-status"><option value="">Definir status...</option>${STAGES.map((stage) => `<optgroup label="${stage.label}">${STATUS_DEFS.filter((s) => s.stage === stage.key).map((s) => `<option value="${s.key}">${s.label}</option>`).join('')}</optgroup>`).join('')}</select>
      <select id="bulk-resp"><option value="">Definir responsável...</option>${activeTeamNames().map((n2) => `<option value="${escapeHtml(n2)}">${escapeHtml(n2)}</option>`).join('')}</select>
      <select id="bulk-priority"><option value="">Definir prioridade...</option>${PRIORIDADE_OPTIONS.map((p) => `<option value="${p.key}">${p.label}</option>`).join('')}</select>
      <button class="btn danger small" id="bulk-delete">Excluir selecionadas</button>
      <button class="btn secondary small" id="bulk-cancel">Cancelar seleção</button>
    </div>
  `;
  async function applyBulk(field, value) {
    const ids = Array.from(state.selectedDemandIds);
    await Promise.all(ids.map((id) => api('/demands/' + id, { method: 'PUT', body: JSON.stringify({ [field]: value }) })));
    ids.forEach((id) => {
      const idx = state.demands.findIndex((d) => d.id === id);
      if (idx > -1) state.demands[idx][field] = value;
    });
    updateNavBadges();
    renderDemandas(document.getElementById('main'));
    toast(`${ids.length} demanda(s) atualizada(s).`, 'success');
  }
  document.getElementById('bulk-status').onchange = (e) => { if (e.target.value) applyBulk('status', e.target.value); };
  document.getElementById('bulk-resp').onchange = (e) => { if (e.target.value) applyBulk('responsible', e.target.value); };
  document.getElementById('bulk-priority').onchange = (e) => { if (e.target.value) applyBulk('priority', e.target.value); };
  document.getElementById('bulk-delete').onclick = async () => {
    const ok = await confirmDialog(`Excluir ${n} demanda(s) selecionada(s)?`);
    if (!ok) return;
    const ids = Array.from(state.selectedDemandIds);
    await Promise.all(ids.map((id) => api('/demands/' + id, { method: 'DELETE' })));
    state.selectedDemandIds.clear();
    await loadAll();
    render();
    toast(`${ids.length} demanda(s) excluída(s).`, 'success');
  };
  document.getElementById('bulk-cancel').onclick = () => {
    state.selectedDemandIds.clear();
    renderDemandas(document.getElementById('main'));
  };
}

// Modal de demanda: criação rápida (mínima) -> depois autosave campo a campo, sem botão "Salvar".
function openDemandModal(demand) {
  if (!demand) return openQuickCreateDemand();

  const teamOptions = activeTeamNames();
  if (demand.responsible && !teamOptions.includes(demand.responsible)) teamOptions.push(demand.responsible);

  showModal(`
    <h2>${escapeHtml(demand.title) || 'Demanda'}</h2>
    <div class="autosave-line">Alterações são salvas automaticamente <span id="autosave-indicator" class="autosave-indicator"></span></div>

    <label>Projeto / Cliente</label>
    <select id="f-client" style="width:100%">
      ${state.clients.map((c) => `<option value="${c.id}" ${demand.client_id === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
    </select>
    <label>Demanda</label>
    <input type="text" id="f-title" value="${escapeHtml(demand.title)}" style="width:100%" />

    <label>Briefing (Social Media)</label>
    <textarea id="f-briefing" placeholder="Objetivo, referências, direcionamento para quem for executar..." style="min-height:80px">${escapeHtml(demand.briefing)}</textarea>

    <label>Descrição / notas gerais</label>
    <textarea id="f-desc" style="min-height:50px">${escapeHtml(demand.description)}</textarea>

    <label>Formato</label>
    <div class="checkbox-grid" id="f-format">
      ${FORMATO_OPTIONS.map((o) => `
        <label class="chip"><input type="checkbox" value="${escapeHtml(o.name)}" ${demand.format.includes(o.name) ? 'checked' : ''}/>${escapeHtml(o.name)}</label>
      `).join('')}
    </div>

    <label>Plataforma</label>
    <div class="checkbox-grid" id="f-platform">
      ${PLATAFORMA_OPTIONS.map((o) => `
        <label class="chip"><input type="checkbox" value="${escapeHtml(o.name)}" ${demand.platform.includes(o.name) ? 'checked' : ''}/>${escapeHtml(o.name)}</label>
      `).join('')}
    </div>

    <label>Status (etapa do fluxo WAS)</label>
    <select id="f-status" style="width:100%">
      ${STAGES.map((stage) => `
        <optgroup label="${stage.label}">
          ${STATUS_DEFS.filter((s) => s.stage === stage.key).map((s) => `<option value="${s.key}" ${demand.status === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}
        </optgroup>
      `).join('')}
    </select>

    <label style="display:flex;align-items:center;gap:8px;margin-top:14px">
      <input type="checkbox" id="f-needs-capture" ${demand.needs_capture !== false ? 'checked' : ''} style="width:auto" />
      Precisa de captação
    </label>
    <div id="capture-date-wrap" style="${demand.needs_capture === false ? 'display:none' : ''}">
      <label>Dia da captação</label>
      <input type="date" id="f-capture-date" value="${demand.capture_date || ''}" />
    </div>

    <div class="two-col">
      <div>
        <label>Prazo designer</label>
        <input type="date" id="f-prazo-designer" value="${demand.prazo_designer || ''}" />
      </div>
      <div>
        <label>Postagem / entrega final</label>
        <input type="date" id="f-prazo-final" value="${demand.prazo_final || ''}" />
      </div>
    </div>

    <div class="two-col">
      <div>
        <label>Prioridade</label>
        <select id="f-priority">
          ${PRIORIDADE_OPTIONS.map((p) => `<option value="${p.key}" ${demand.priority === p.key ? 'selected' : ''}>${p.label}</option>`).join('')}
        </select>
      </div>
      <div>
        <label>Previsão</label>
        <select id="f-forecast">
          ${FORECAST_OPTIONS.map((p) => `<option value="${p.key}" ${demand.forecast === p.key ? 'selected' : ''}>${p.label}</option>`).join('')}
        </select>
      </div>
    </div>

    <div class="two-col">
      <div>
        <label>Responsável</label>
        <select id="f-resp">
          <option value="">— Sem responsável —</option>
          ${teamOptions.map((n) => `<option value="${escapeHtml(n)}" ${demand.responsible === n ? 'selected' : ''}>${escapeHtml(n)}</option>`).join('')}
        </select>
      </div>
      <div>
        <label>Refações</label>
        <select id="f-refacao">
          ${REFACAO_OPTIONS.map((r) => `<option value="${r.key}" ${demand.refacao === r.key ? 'selected' : ''}>${r.label}</option>`).join('')}
        </select>
      </div>
    </div>

    <label>Link (arquivo, drive, etc.)</label>
    <input type="text" id="f-link" value="${escapeHtml(demand.link)}" style="width:100%" />
    <label style="display:flex;align-items:center;gap:8px;margin-top:14px">
      <input type="checkbox" id="f-visible" ${demand.visible_to_client ? 'checked' : ''} style="width:auto" />
      Visível no portal do cliente
    </label>
    <div class="modal-footer">
      <button class="btn danger" id="btn-delete" style="margin-right:auto">Excluir</button>
      <button class="btn" id="btn-close">Fechar</button>
    </div>
  `);

  const indicator = document.getElementById('autosave-indicator');
  function flashSaved() {
    indicator.textContent = 'Salvo ✓';
    indicator.classList.add('show');
    setTimeout(() => indicator.classList.remove('show'), 1200);
  }
  async function patch(payload) {
    await api('/demands/' + demand.id, { method: 'PUT', body: JSON.stringify(payload) });
    Object.assign(demand, payload);
    const idx = state.demands.findIndex((d) => d.id === demand.id);
    if (idx > -1) state.demands[idx] = { ...state.demands[idx], ...payload };
    flashSaved();
    if (state.page === 'demandas') renderDemandas(document.getElementById('main'));
    if (state.page === 'dashboard') renderDashboard(document.getElementById('main'));
    updateNavBadges();
  }
  const patchDebounced = debounce(patch, 500);

  document.getElementById('f-client').onchange = (e) => patch({ client_id: e.target.value });
  document.getElementById('f-title').addEventListener('input', (e) => patchDebounced({ title: e.target.value.trim() }));
  document.getElementById('f-briefing').addEventListener('input', (e) => patchDebounced({ briefing: e.target.value }));
  document.getElementById('f-desc').addEventListener('input', (e) => patchDebounced({ description: e.target.value }));
  document.getElementById('f-status').onchange = (e) => patch({ status: e.target.value });
  document.getElementById('f-priority').onchange = (e) => patch({ priority: e.target.value });
  document.getElementById('f-forecast').onchange = (e) => patch({ forecast: e.target.value });
  document.getElementById('f-refacao').onchange = (e) => patch({ refacao: e.target.value });
  document.getElementById('f-resp').onchange = (e) => patch({ responsible: e.target.value });
  document.getElementById('f-link').addEventListener('input', (e) => patchDebounced({ link: e.target.value.trim() }));
  document.getElementById('f-visible').onchange = (e) => patch({ visible_to_client: e.target.checked });
  document.getElementById('f-prazo-designer').onchange = (e) => patch({ prazo_designer: e.target.value });
  document.getElementById('f-prazo-final').onchange = (e) => patch({ prazo_final: e.target.value });
  document.getElementById('f-needs-capture').onchange = (e) => {
    document.getElementById('capture-date-wrap').style.display = e.target.checked ? '' : 'none';
    patch({ needs_capture: e.target.checked, capture_date: e.target.checked ? demand.capture_date : '' });
  };
  document.getElementById('f-capture-date').onchange = (e) => patch({ capture_date: e.target.value });

  document.querySelectorAll('#f-format input').forEach((cb) => {
    cb.onchange = () => patch({ format: Array.from(document.querySelectorAll('#f-format input:checked')).map((i) => i.value) });
  });
  document.querySelectorAll('#f-platform input').forEach((cb) => {
    cb.onchange = () => patch({ platform: Array.from(document.querySelectorAll('#f-platform input:checked')).map((i) => i.value) });
  });

  document.getElementById('btn-close').onclick = closeModal;
  document.getElementById('btn-delete').onclick = async () => {
    const ok = await confirmDialog('Excluir esta demanda?');
    if (!ok) return;
    await api('/demands/' + demand.id, { method: 'DELETE' });
    closeModal();
    await loadAll();
    render();
    toast('Demanda excluída.', 'success');
  };
}

function openQuickCreateDemand() {
  if (!state.clients.length) { toast('Cadastre um cliente antes de criar demandas.', 'warn'); return; }
  showModal(`
    <h2>Nova demanda</h2>
    <label>Projeto / Cliente</label>
    <select id="qc-client" style="width:100%">
      ${state.clients.map((c) => `<option value="${c.id}">${escapeHtml(c.name)}</option>`).join('')}
    </select>
    <label>Demanda</label>
    <input type="text" id="qc-title" style="width:100%" placeholder="ex: Reels de lançamento" />
    <p style="color:var(--text-dim);font-size:12px;margin-top:10px">Depois de criada, os demais campos (briefing, formato, prazos, etc.) salvam automaticamente conforme você edita.</p>
    <div class="modal-footer">
      <button class="btn secondary" id="btn-cancel">Cancelar</button>
      <button class="btn" id="btn-create">Criar demanda</button>
    </div>
  `);
  document.getElementById('btn-cancel').onclick = closeModal;
  document.getElementById('btn-create').onclick = async () => {
    const title = document.getElementById('qc-title').value.trim();
    if (!title) { toast('Informe o nome da demanda.', 'warn'); return; }
    const payload = {
      client_id: document.getElementById('qc-client').value,
      title,
      format: [], platform: [],
      status: 'em_briefing',
      needs_capture: true,
      priority: 'normal',
      forecast: 'prevista',
    };
    const created = await api('/demands', { method: 'POST', body: JSON.stringify(payload) });
    await loadAll();
    render();
    openDemandModal(state.demands.find((d) => d.id === created.id) || created);
  };
}

// ---------- Notificações ----------
function notifRow(icon, title, meta, demand) {
  return `
    <div class="notif-row" data-open="${demand.id}">
      <span class="notif-icon">${icon}</span>
      <div class="notif-body">
        <div class="notif-title">${escapeHtml(title)}</div>
        <div class="notif-meta">${meta}</div>
      </div>
    </div>
  `;
}

function renderNotifSection(title, colorClass, count, itemsHtml) {
  if (!count) return '';
  return `
    <div class="notif-section">
      <div class="notif-section-title ${colorClass}">${title} <span class="count">${count}</span></div>
      <div class="notif-list">${itemsHtml}</div>
    </div>
  `;
}

function renderNotificacoes(main) {
  const n = computeNotifications();

  const overdueHtml = n.overdue.map((d) => notifRow('⚠️', d.title, `${escapeHtml(clientName(d.client_id))} · vencia em ${formatDateBR(d.prazo_final)}`, d)).join('');
  const todayHtml = n.dueToday.map((d) => notifRow('🚀', d.title, `${escapeHtml(clientName(d.client_id))} · entrega hoje`, d)).join('');
  const tomorrowHtml = n.dueTomorrow.map((d) => notifRow('🚀', d.title, `${escapeHtml(clientName(d.client_id))} · entrega amanhã`, d)).join('');
  const captureHtml = n.captureSoon.map((d) => notifRow('🎬', d.title, `${escapeHtml(clientName(d.client_id))} · captação em ${formatDateBR(d.capture_date)}`, d)).join('');
  const designerHtml = n.designerSoon.map((d) => notifRow('🎨', d.title, `${escapeHtml(clientName(d.client_id))} · prazo do designer em ${formatDateBR(d.prazo_designer)}`, d)).join('');
  const waitingHtml = n.waitingClient.map((d) => notifRow('⏳', d.title, `${escapeHtml(clientName(d.client_id))} · aguardando aprovação do cliente`, d)).join('');

  const automationHtml = n.deadlineAlerts.map((g) => {
    const label = `🔔 Alerta: ${DEADLINE_FIELD_LABELS[g.field] || g.field} (${DEADLINE_DAYS_LABELS[g.daysBefore] || g.daysBefore + ' dias antes'})`;
    const rows = g.items.map((d) => notifRow('🔔', d.title, `${escapeHtml(clientName(d.client_id))} · ${escapeHtml(DEADLINE_FIELD_LABELS[g.field] || g.field)} em ${formatDateBR(d[g.field])}`, d)).join('');
    return renderNotifSection(label, 'blue', g.items.length, rows);
  }).join('');

  const sections = [
    renderNotifSection('Atrasadas', 'red', n.overdue.length, overdueHtml),
    renderNotifSection('Vencem hoje', 'orange', n.dueToday.length, todayHtml),
    renderNotifSection('Vencem amanhã', 'yellow', n.dueTomorrow.length, tomorrowHtml),
    renderNotifSection('Captação nos próximos dias', 'orange', n.captureSoon.length, captureHtml),
    renderNotifSection('Prazo do designer nos próximos dias', 'yellow', n.designerSoon.length, designerHtml),
    renderNotifSection('Aguardando aprovação do cliente', 'blue', n.waitingClient.length, waitingHtml),
    automationHtml,
  ].join('');

  main.innerHTML = `
    <div class="page-header">
      <div>
        <h1>Notificações</h1>
        <p>Tudo que precisa da sua atenção agora, num só lugar</p>
      </div>
    </div>
    ${sections || '<div class="empty-state">Tudo em dia — nenhuma pendência no momento. 🎉</div>'}
  `;

  main.querySelectorAll('.notif-row').forEach((row) => {
    row.onclick = () => openDemandModal(state.demands.find((d) => d.id === row.dataset.open));
  });
}

// ---------- Automações + Equipe ----------
function autoFieldLabel(field) {
  return { status: 'Status', client_id: 'Cliente', format: 'Formato', platform: 'Plataforma', responsible: 'Responsável', priority: 'Prioridade' }[field] || field;
}
function autoValueLabel(field, value) {
  if (field === 'status') return (STATUS_DEFS.find((s) => s.key === value) || {}).label || value;
  if (field === 'client_id') return clientName(value);
  if (field === 'priority') return (PRIORIDADE_OPTIONS.find((p) => p.key === value) || {}).label || value;
  return value;
}

function renderAutomacoes(main) {
  main.innerHTML = `
    <div class="page-header">
      <div>
        <h1>Automações</h1>
        <p>Regras que rodam sozinhas e a equipe que aparece nos campos de responsável</p>
      </div>
    </div>
    <div class="tabs">
      <button class="tab-btn ${state.automacoesTab === 'regras' ? 'active' : ''}" id="tab-regras">Regras</button>
      <button class="tab-btn ${state.automacoesTab === 'equipe' ? 'active' : ''}" id="tab-equipe">Equipe</button>
    </div>
    <div id="tab-content"></div>
  `;
  document.getElementById('tab-regras').onclick = () => { state.automacoesTab = 'regras'; renderAutomacoes(main); };
  document.getElementById('tab-equipe').onclick = () => { state.automacoesTab = 'equipe'; renderAutomacoes(main); };

  if (state.automacoesTab === 'regras') renderAutomationRules(document.getElementById('tab-content'));
  else renderTeamTab(document.getElementById('tab-content'));
}

function renderAutomationRules(root) {
  root.innerHTML = `
    <div class="page-header" style="margin-bottom:14px">
      <p style="color:var(--text-dim);font-size:12px;max-width:560px">Toda vez que uma demanda for criada ou atualizada, as regras de campo ativas rodam automaticamente. Os alertas de prazo aparecem na Central de Notificações conforme a data se aproxima.</p>
      <button class="btn secondary small" id="btn-new-automation">+ Nova automação</button>
    </div>
    <div class="card-list" id="automation-list"></div>
  `;
  document.getElementById('btn-new-automation').onclick = () => openAutomationModal();
  const list = document.getElementById('automation-list');
  if (!state.automations.length) {
    list.innerHTML = '<div class="empty-state">Nenhuma automação criada ainda.</div>';
    return;
  }
  list.innerHTML = state.automations.map((a) => {
    if (a.kind === 'deadline') {
      const fieldLabel = DEADLINE_FIELD_LABELS[a.trigger.field] || a.trigger.field;
      const daysLabel = DEADLINE_DAYS_LABELS[Number(a.trigger.daysBefore)] || `${a.trigger.daysBefore} dias antes`;
      return `
        <div class="client-card">
          <div>
            <div class="name">🔔 <span class="tag tag-blue">Alerta de prazo</span></div>
            <div class="meta">Avisar ${escapeHtml(daysLabel)} do vencimento de <strong>${escapeHtml(fieldLabel)}</strong></div>
          </div>
          <div class="actions" style="display:flex;align-items:center;gap:10px">
            <label class="switch"><input type="checkbox" data-toggle="${a.id}" ${a.active ? 'checked' : ''} /><span class="switch-slider"></span></label>
            <button class="icon-btn danger" data-del="${a.id}" title="Excluir">🗑</button>
          </div>
        </div>
      `;
    }
    return `
    <div class="client-card">
      <div>
        <div class="name">⚙️ SE <span class="tag tag-blue">${autoFieldLabel(a.trigger.field)} ${a.trigger.op === 'contains' ? 'contém' : '='} "${escapeHtml(autoValueLabel(a.trigger.field, a.trigger.value))}"</span></div>
        <div class="meta">ENTÃO <span class="tag tag-green">${autoFieldLabel(a.action.field)} = "${escapeHtml(autoValueLabel(a.action.field, a.action.value))}"</span></div>
      </div>
      <div class="actions" style="display:flex;align-items:center;gap:10px">
        <label class="switch"><input type="checkbox" data-toggle="${a.id}" ${a.active ? 'checked' : ''} /><span class="switch-slider"></span></label>
        <button class="icon-btn danger" data-del="${a.id}" title="Excluir">🗑</button>
      </div>
    </div>
  `;
  }).join('');
  list.querySelectorAll('[data-toggle]').forEach((cb) => {
    cb.onchange = async () => {
      await api('/automations/' + cb.dataset.toggle, { method: 'PUT', body: JSON.stringify({ active: cb.checked }) });
      await loadAll();
      toast(cb.checked ? 'Automação ativada.' : 'Automação pausada.', 'success');
    };
  });
  list.querySelectorAll('[data-del]').forEach((btn) => {
    btn.onclick = async () => {
      const ok = await confirmDialog('Excluir esta automação?');
      if (!ok) return;
      await api('/automations/' + btn.dataset.del, { method: 'DELETE' });
      await loadAll();
      renderAutomacoes(document.getElementById('main'));
      toast('Automação excluída.', 'success');
    };
  });
}

function automationFieldOptions(kind) {
  // kind: 'trigger' ou 'action'
  return kind === 'trigger'
    ? [{ v: 'status', l: 'Status' }, { v: 'client_id', l: 'Cliente' }, { v: 'format', l: 'Formato' }, { v: 'platform', l: 'Plataforma' }]
    : [{ v: 'responsible', l: 'Responsável' }, { v: 'priority', l: 'Prioridade' }, { v: 'status', l: 'Status' }];
}

function automationValueOptions(field) {
  if (field === 'status') return STATUS_DEFS.map((s) => ({ v: s.key, l: s.label }));
  if (field === 'client_id') return state.clients.map((c) => ({ v: c.id, l: c.name }));
  if (field === 'format') return FORMATO_OPTIONS.map((o) => ({ v: o.name, l: o.name }));
  if (field === 'platform') return PLATAFORMA_OPTIONS.map((o) => ({ v: o.name, l: o.name }));
  if (field === 'responsible') return activeTeamNames().map((n) => ({ v: n, l: n }));
  if (field === 'priority') return PRIORIDADE_OPTIONS.map((p) => ({ v: p.key, l: p.label }));
  return [];
}

function openAutomationModal() {
  showModal(`
    <h2>Nova automação</h2>
    <label>Tipo</label>
    <select id="auto-kind" style="width:100%">
      <option value="field">Regra de campo (quando X, definir Y)</option>
      <option value="deadline">Alerta de prazo (avisar antes de vencer)</option>
    </select>
    <div id="auto-form-field">
      <label style="margin-top:14px">Quando</label>
      <select id="auto-trigger-field" style="width:100%">
        ${automationFieldOptions('trigger').map((o) => `<option value="${o.v}">${o.l}</option>`).join('')}
      </select>
      <label>For igual a / contiver</label>
      <select id="auto-trigger-value" style="width:100%"></select>
      <label style="margin-top:18px">Então definir</label>
      <select id="auto-action-field" style="width:100%">
        ${automationFieldOptions('action').map((o) => `<option value="${o.v}">${o.l}</option>`).join('')}
      </select>
      <label>Como</label>
      <select id="auto-action-value" style="width:100%"></select>
    </div>
    <div id="auto-form-deadline" class="hidden">
      <label style="margin-top:14px">Avisar antes de vencer o</label>
      <select id="auto-deadline-field" style="width:100%">
        ${Object.entries(DEADLINE_FIELD_LABELS).map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}
      </select>
      <label>Com quantos dias de antecedência</label>
      <select id="auto-deadline-days" style="width:100%">
        ${Object.entries(DEADLINE_DAYS_LABELS).map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}
      </select>
      <p style="color:var(--text-dim);font-size:12px;margin-top:10px">O alerta aparece na Central de Notificações assim que a data se aproximar — não precisa reabrir a demanda.</p>
    </div>
    <div class="modal-footer">
      <button class="btn secondary" id="btn-cancel">Cancelar</button>
      <button class="btn" id="btn-save">Criar automação</button>
    </div>
  `);

  function refillValue(fieldSelectId, valueSelectId) {
    const field = document.getElementById(fieldSelectId).value;
    const opts = automationValueOptions(field);
    document.getElementById(valueSelectId).innerHTML = opts.map((o) => `<option value="${escapeHtml(o.v)}">${escapeHtml(o.l)}</option>`).join('');
  }
  refillValue('auto-trigger-field', 'auto-trigger-value');
  refillValue('auto-action-field', 'auto-action-value');
  document.getElementById('auto-trigger-field').onchange = () => refillValue('auto-trigger-field', 'auto-trigger-value');
  document.getElementById('auto-action-field').onchange = () => refillValue('auto-action-field', 'auto-action-value');

  document.getElementById('auto-kind').onchange = (e) => {
    const isDeadline = e.target.value === 'deadline';
    document.getElementById('auto-form-field').classList.toggle('hidden', isDeadline);
    document.getElementById('auto-form-deadline').classList.toggle('hidden', !isDeadline);
  };

  document.getElementById('btn-cancel').onclick = closeModal;
  document.getElementById('btn-save').onclick = async () => {
    const kind = document.getElementById('auto-kind').value;
    let payload;
    if (kind === 'deadline') {
      payload = {
        kind: 'deadline',
        active: true,
        trigger: { field: document.getElementById('auto-deadline-field').value, daysBefore: Number(document.getElementById('auto-deadline-days').value) },
        action: {},
      };
    } else {
      const triggerField = document.getElementById('auto-trigger-field').value;
      const actionField = document.getElementById('auto-action-field').value;
      payload = {
        kind: 'field',
        active: true,
        trigger: {
          field: triggerField,
          op: (triggerField === 'format' || triggerField === 'platform') ? 'contains' : 'equals',
          value: document.getElementById('auto-trigger-value').value,
        },
        action: { field: actionField, value: document.getElementById('auto-action-value').value },
      };
    }
    await api('/automations', { method: 'POST', body: JSON.stringify(payload) });
    closeModal();
    await loadAll();
    renderAutomacoes(document.getElementById('main'));
    toast('Automação criada.', 'success');
  };
}

function renderTeamTab(root) {
  root.innerHTML = `
    <div class="page-header" style="margin-bottom:14px">
      <p style="color:var(--text-dim);font-size:12px">A equipe aparece no campo Responsável das demandas e nas ações de automação.</p>
      <button class="btn secondary small" id="btn-new-member">+ Novo funcionário</button>
    </div>
    <div class="clients-grid" id="team-grid"></div>
  `;
  document.getElementById('btn-new-member').onclick = () => openTeamModal();
  const grid = document.getElementById('team-grid');
  if (!state.team.length) {
    grid.innerHTML = '<div class="empty-state">Nenhum funcionário cadastrado ainda.</div>';
    return;
  }
  grid.innerHTML = state.team.map((t) => `
    <div class="client-tile" data-edit="${t.id}" style="cursor:pointer">
      <div class="ct-top">
        <div class="ct-avatar tag-blue">${initials(t.name)}</div>
        <span class="badge ${t.active ? 'ativo' : 'encerrado'}">${t.active ? 'ativo' : 'inativo'}</span>
      </div>
      <div class="ct-name">${escapeHtml(t.name)}</div>
      <div class="ct-meta"><div class="tag-group">${(t.roles || []).map((r) => `<span class="tag tag-${ROLE_COLORS[r] || 'gray'}">${escapeHtml(r)}</span>`).join('')}</div></div>
      <div class="ct-actions">
        <button class="icon-btn" data-edit2="${t.id}" title="Editar">✏️</button>
        <button class="icon-btn danger" data-del="${t.id}" title="Excluir">🗑</button>
      </div>
    </div>
  `).join('');
  grid.querySelectorAll('[data-edit]').forEach((tile) => {
    tile.onclick = (e) => {
      if (e.target.closest('.icon-btn')) return;
      openTeamModal(state.team.find((t) => t.id === tile.dataset.edit));
    };
  });
  grid.querySelectorAll('[data-del]').forEach((btn) => {
    btn.onclick = async (e) => {
      e.stopPropagation();
      const ok = await confirmDialog('Excluir este funcionário da equipe?');
      if (!ok) return;
      await api('/team/' + btn.dataset.del, { method: 'DELETE' });
      await loadAll();
      renderAutomacoes(document.getElementById('main'));
      toast('Funcionário removido.', 'success');
    };
  });
}

function openTeamModal(member) {
  const isEdit = !!member;
  member = member || { name: '', roles: [], active: true };
  showModal(`
    <h2>${isEdit ? 'Editar funcionário' : 'Novo funcionário'}</h2>
    <label>Nome</label>
    <input type="text" id="f-name" value="${escapeHtml(member.name)}" style="width:100%" />
    <label>Cargo(s)</label>
    <div class="checkbox-grid" id="f-roles">
      ${ROLE_OPTIONS.map((r) => `<label class="chip"><input type="checkbox" value="${r}" ${member.roles.includes(r) ? 'checked' : ''}/>${r}</label>`).join('')}
    </div>
    <label style="display:flex;align-items:center;gap:8px;margin-top:14px">
      <input type="checkbox" id="f-active" ${member.active !== false ? 'checked' : ''} style="width:auto" />
      Ativo (aparece nos campos de responsável)
    </label>
    <div class="modal-footer">
      ${isEdit ? '<button class="btn danger" id="btn-delete" style="margin-right:auto">Excluir</button>' : ''}
      <button class="btn secondary" id="btn-cancel">Cancelar</button>
      <button class="btn" id="btn-save">Salvar</button>
    </div>
  `);
  document.getElementById('btn-cancel').onclick = closeModal;
  if (isEdit) {
    document.getElementById('btn-delete').onclick = async () => {
      const ok = await confirmDialog('Excluir este funcionário da equipe?');
      if (!ok) return;
      await api('/team/' + member.id, { method: 'DELETE' });
      closeModal();
      await loadAll();
      renderAutomacoes(document.getElementById('main'));
      toast('Funcionário removido.', 'success');
    };
  }
  document.getElementById('btn-save').onclick = async () => {
    const payload = {
      name: document.getElementById('f-name').value.trim(),
      roles: Array.from(document.querySelectorAll('#f-roles input:checked')).map((i) => i.value),
      active: document.getElementById('f-active').checked,
    };
    if (!payload.name) { toast('Informe o nome do funcionário.', 'warn'); return; }
    if (isEdit) await api('/team/' + member.id, { method: 'PUT', body: JSON.stringify(payload) });
    else await api('/team', { method: 'POST', body: JSON.stringify(payload) });
    closeModal();
    await loadAll();
    renderAutomacoes(document.getElementById('main'));
    toast(isEdit ? 'Funcionário atualizado.' : 'Funcionário adicionado.', 'success');
  };
}

// ---------- Modal ----------
function showModal(html) {
  const root = document.getElementById('modal-root');
  root.innerHTML = `<div class="modal-backdrop" id="modal-backdrop"><div class="modal">${html}</div></div>`;
  document.getElementById('modal-backdrop').addEventListener('click', (e) => {
    if (e.target.id === 'modal-backdrop') closeModal();
  });
}
function closeModal() {
  document.getElementById('modal-root').innerHTML = '';
  closeContextMenu();
}

// ---------- Init ----------
(async function init() {
  await loadAll();
  render();
})();
