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

// Calcula o intervalo [start, end] (strings ISO yyyy-mm-dd) para um período do dashboard.
// Retorna null quando é "todo o período" (sem filtro).
function computeDateRange(period, customStart, customEnd) {
  const today = todayStr();
  if (period === 'this_month') {
    const [y, m] = today.split('-');
    const start = `${y}-${m}-01`;
    const lastDay = new Date(Number(y), Number(m), 0).getDate();
    const end = `${y}-${m}-${String(lastDay).padStart(2, '0')}`;
    return { start, end };
  }
  if (period === 'last_month') {
    const d = new Date(today + 'T00:00:00');
    d.setDate(1);
    d.setMonth(d.getMonth() - 1);
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const lastDay = new Date(y, d.getMonth() + 1, 0).getDate();
    return { start: `${y}-${m}-01`, end: `${y}-${m}-${String(lastDay).padStart(2, '0')}` };
  }
  if (period === 'next_30') {
    return { start: today, end: addDaysStr(today, 30) };
  }
  if (period === 'custom') {
    if (!customStart && !customEnd) return null;
    return { start: customStart || '0000-01-01', end: customEnd || '9999-12-31' };
  }
  return null; // 'all'
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

function formatDateTimeBR(iso) {
  if (!iso) return '';
  const d = new Date(iso);
  if (isNaN(d.getTime())) return '';
  const pad = (n) => String(n).padStart(2, '0');
  return `${pad(d.getDate())}/${pad(d.getMonth() + 1)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

function renderCommentText(text) {
  return escapeHtml(text).replace(/@([^\s@][\wÀ-ÿ]*(?:\s[\wÀ-ÿ]+)?)/g, (match, name) => {
    const isKnown = (state.team || []).some((t) => match.includes('@' + t.name));
    return isKnown ? `<span class="mention-chip">${match}</span>` : match;
  });
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
  focusTitleForDemandId: null,
  lastUsedClientId: null,
  customColumns: [],
  tableColumnOrder: [],
  tableColumnWidths: {},
  tableSelection: null,
  tableClipboard: null,
  tableUndoStack: [],
  dashboardFilters: { clientId: '', responsible: '', period: 'all', customStart: '', customEnd: '' },
  currentUser: null,
  calendarDateFilter: 'both',
  minhasDemandasFilters: { period: 'all', customStart: '', customEnd: '', showDone: false },
  users: [],
};

// ---------- API helpers ----------
async function api(path, opts) {
  const res = await fetch('/api' + path, {
    headers: { 'Content-Type': 'application/json' },
    credentials: 'same-origin',
    ...opts,
  });
  if (res.status === 401) {
    window.location.href = '/login';
    throw new Error('Não autenticado');
  }
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Erro' }));
    throw new Error(err.error || 'Erro na requisição');
  }
  return res.json();
}

async function loadAll() {
  const isAdmin = state.currentUser && state.currentUser.role === 'admin';
  const [clients, demands, team, automations, customColumns, viewPrefs, formatOptions, platformOptions, notifications, users] = await Promise.all([
    api('/clients'),
    api('/demands'),
    api('/team'),
    api('/automations'),
    api('/custom-columns'),
    api('/view-prefs'),
    api('/format-options'),
    api('/platform-options'),
    api('/notifications'),
    isAdmin ? api('/users') : Promise.resolve([]),
  ]);
  state.clients = clients;
  state.demands = demands;
  state.team = team;
  state.automations = automations;
  state.customColumns = customColumns;
  state.tableColumnOrder = normalizeColumnOrder(viewPrefs.tableColumnOrder, customColumns);
  state.tableColumnWidths = viewPrefs.columnWidths || {};
  state.customFormatOptions = formatOptions || [];
  state.customPlatformOptions = platformOptions || [];
  state.mentionNotifications = notifications || [];
  state.users = users || [];
}

function renderUserBadge() {
  const el = document.getElementById('sidebar-user');
  if (!el || !state.currentUser) return;
  const u = state.currentUser;
  el.innerHTML = `
    <div class="su-avatar">${initials(u.name)}</div>
    <div class="su-info">
      <div class="su-name">${escapeHtml(u.name)}</div>
      <div class="su-tenant">${escapeHtml(u.tenantName)}</div>
    </div>
    <button class="su-password" id="btn-change-password" title="Alterar senha">🔒</button>
    <button class="su-logout" id="btn-logout" title="Sair">⏻</button>
  `;
  document.getElementById('btn-logout').onclick = async () => {
    await api('/auth/logout', { method: 'POST' });
    window.location.href = '/login';
  };
  document.getElementById('btn-change-password').onclick = openChangePasswordModal;
}

function openChangePasswordModal() {
  showModal(`
    <h2>Alterar senha</h2>
    <label>Senha atual</label>
    <input type="password" id="f-current-password" style="width:100%" autocomplete="current-password" />
    <label style="margin-top:10px">Nova senha</label>
    <input type="password" id="f-new-password" style="width:100%" autocomplete="new-password" />
    <label style="margin-top:10px">Confirmar nova senha</label>
    <input type="password" id="f-confirm-password" style="width:100%" autocomplete="new-password" />
    <div class="modal-footer">
      <button class="btn secondary" id="btn-cancel">Cancelar</button>
      <button class="btn" id="btn-save">Salvar</button>
    </div>
  `);
  document.getElementById('btn-cancel').onclick = closeModal;
  const submit = async () => {
    const currentPassword = document.getElementById('f-current-password').value;
    const newPassword = document.getElementById('f-new-password').value;
    const confirmPassword = document.getElementById('f-confirm-password').value;
    if (!currentPassword || !newPassword) { toast('Preencha a senha atual e a nova senha.', 'warn'); return; }
    if (newPassword.length < 4) { toast('A nova senha precisa ter pelo menos 4 caracteres.', 'warn'); return; }
    if (newPassword !== confirmPassword) { toast('As senhas não coincidem.', 'warn'); return; }
    try {
      await api('/auth/password', { method: 'PUT', body: JSON.stringify({ currentPassword, newPassword }) });
      closeModal();
      toast('Senha alterada com sucesso.', 'success');
    } catch (e) {
      toast(e.message || 'Não foi possível alterar a senha.', 'error');
    }
  };
  document.getElementById('btn-save').onclick = submit;
  document.getElementById('f-confirm-password').addEventListener('keydown', (e) => { if (e.key === 'Enter') submit(); });
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
  if (state.page === 'briefing') return renderBriefingKanban(main);
  if (state.page === 'demandas') return renderDemandas(main);
  if (state.page === 'minhas-demandas') return renderMinhasDemandas(main);
  if (state.page === 'notificacoes') return renderNotificacoes(main);
  if (state.page === 'automacoes') return renderAutomacoes(main);
  if (state.page === 'visao-cliente') return renderVisaoCliente(main);
}

function renderVisaoCliente(main) {
  const origin = window.location.origin;
  const clients = state.clients.filter((c) => c.status === 'ativo');
  main.innerHTML = `
    <div class="page-header">
      <div>
        <h1>Visão Cliente</h1>
        <p>Link público e individual de cada cliente — cada um só vê as próprias demandas, nunca as de outro cliente</p>
      </div>
    </div>
    <div class="clients-grid" id="vc-grid">
      ${clients.map((c) => {
        const url = origin + '/portal?slug=' + encodeURIComponent(c.portal_slug || '');
        const activeDemands = state.demands.filter((d) => d.client_id === c.id && d.status !== 'arquivado').length;
        return `
          <div class="client-tile vc-tile">
            <div class="ct-top">
              <div class="ct-avatar tag-${c.color || 'default'}">${initials(c.name)}</div>
              <span class="badge ${c.status}">${c.status}</span>
            </div>
            <div class="ct-name">${escapeHtml(c.name)}</div>
            <div class="ct-meta">${activeDemands} demanda${activeDemands === 1 ? '' : 's'} ativa${activeDemands === 1 ? '' : 's'}</div>
            <div class="vc-url" title="${escapeHtml(url)}">${escapeHtml(url)}</div>
            <div class="ct-actions vc-actions">
              <button class="btn secondary small vc-copy" data-url="${escapeHtml(url)}">Copiar link</button>
              <a class="btn small" href="${escapeHtml(url)}" target="_blank" rel="noopener">Abrir</a>
            </div>
          </div>
        `;
      }).join('') || '<div class="empty-state">Nenhum cliente ativo ainda.</div>'}
    </div>
  `;
  main.querySelectorAll('.vc-copy').forEach((btn) => {
    btn.onclick = async (e) => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(btn.dataset.url);
        toast('Link copiado.', 'success');
      } catch (err) {
        toast('Não foi possível copiar — copie manualmente.', 'error');
      }
    };
  });
}

const DEADLINE_FIELD_LABELS = { prazo_final: 'Prazo final', prazo_designer: 'Prazo designer', capture_date: 'Captação' };
const DEADLINE_DAYS_LABELS = { 0: 'no dia', 1: '1 dia antes', 2: '2 dias antes', 3: '3 dias antes', 5: '5 dias antes', 7: '7 dias antes' };

// ---------- Individualização: cada pessoa só vê o que é dela; admin (Henrique/Vitória) vê tudo ----------
function myTeamRoles() {
  const myName = state.currentUser && state.currentUser.name;
  if (!myName) return [];
  const member = state.team.find((t) => t.name === myName);
  return member ? (member.roles || []) : [];
}

// "Faz parte do card" = é a pessoa responsável pela demanda (modelo atual é de responsável único).
function isRelevantToMe(d) {
  if (isAdminUser()) return true;
  const myName = state.currentUser && state.currentUser.name;
  return !!myName && d.responsible === myName;
}

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
        if (!isRelevantToMe(d)) return false;
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

const STAGE_ALERT_STATUS_OPTIONS = ['aguardando_captacao', 'a_fazer_design', 'pronto_envio_design'];
const STAGE_ALERT_AUDIENCE_LABELS = {
  filmmakers: 'Filmmakers', designers: 'Designers', social_media: 'Social Media', responsible: 'Responsável pela demanda',
};
function audienceRole(audience) {
  return { filmmakers: 'Filmmaker', designers: 'Designer', social_media: 'Social Media' }[audience] || null;
}

// Admin sempre vê. Pessoa comum só vê o alerta se ela for a responsável (audience 'responsible')
// ou se o cargo dela bater com a audiência do alerta (ex.: só Designers veem alerta pra Designers).
function amInAudience(audience, d) {
  if (isAdminUser()) return true;
  const myName = state.currentUser && state.currentUser.name;
  if (audience === 'responsible') return !!myName && d.responsible === myName;
  const role = audienceRole(audience);
  return !!role && myTeamRoles().includes(role);
}

function computeStageAlerts() {
  const autos = (state.automations || []).filter((a) => a.active && a.kind === 'stage_alert');
  return autos.map((auto) => {
    const status = auto.trigger.status;
    const audience = auto.action.audience;
    const items = state.demands.filter((d) => d.status === status && amInAudience(audience, d));
    const role = audienceRole(audience);
    const audienceNames = role ? activeTeamNames().filter((n) => (state.team.find((t) => t.name === n).roles || []).includes(role)) : null;
    return { auto, status, audience, audienceNames, items };
  }).filter((g) => g.items.length);
}

function computeWeeklySummary() {
  const hasActive = (state.automations || []).some((a) => a.active && a.kind === 'weekly_summary');
  if (!hasActive) return null;
  if (new Date().getDay() !== 1) return null; // só aparece na segunda-feira
  const today = todayStr();
  const days = [];
  for (let i = 0; i < 7; i++) {
    const dateStr = addDaysStr(today, i);
    const items = state.demands.filter((d) => d.prazo_final === dateStr && !DONE_STATUSES.includes(d.status));
    if (items.length) days.push({ dateStr, items });
  }
  const total = days.reduce((sum, g) => sum + g.items.length, 0);
  if (!total) return null;
  return { days, total };
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
    if (!isRelevantToMe(d)) return;
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
  const weeklySummary = computeWeeklySummary();
  const stageAlerts = computeStageAlerts();
  return { overdue, dueToday, dueTomorrow, captureSoon, designerSoon, waitingClient, deadlineAlerts, weeklySummary, stageAlerts };
}

function myMentionNotifications() {
  const myName = state.currentUser && state.currentUser.name;
  if (!myName) return [];
  return (state.mentionNotifications || []).filter((n) => n.to === myName);
}

function updateNavBadges() {
  const badge = document.getElementById('nav-badge-notif');
  if (!badge) return;
  const n = computeNotifications();
  const alertIds = new Set();
  n.deadlineAlerts.forEach((g) => g.items.forEach((d) => alertIds.add(d.id)));
  n.overdue.forEach((d) => alertIds.add(d.id));
  n.dueToday.forEach((d) => alertIds.add(d.id));
  const unreadMentions = myMentionNotifications().filter((m) => !m.read).length;
  const urgent = alertIds.size + unreadMentions;
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
function computeFormatCounts() {
  const counts = {};
  state.demands.filter((d) => !DONE_STATUSES.includes(d.status)).forEach((d) => {
    (d.format || []).forEach((f) => { counts[f] = (counts[f] || 0) + 1; });
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

const HEALTH_DEFS = {
  critico: { label: 'Atenção', color: 'red', icon: '🔴' },
  atencao: { label: 'Fique de olho', color: 'yellow', icon: '🟡' },
  em_dia: { label: 'Em dia', color: 'green', icon: '🟢' },
};

function computeClientHealth() {
  return state.clients
    .filter((c) => c.status === 'ativo')
    .map((c) => {
      const demands = state.demands.filter((d) => d.client_id === c.id);
      const pipeline = demands.filter((d) => !DONE_STATUSES.includes(d.status));
      const overdue = pipeline.filter((d) => d.prazo_final && d.prazo_final < todayStr());
      const waiting = demands.filter((d) => d.status === 'em_aprovacao_cliente' || d.status === 'aprovacao_briefing');
      let status = 'em_dia';
      if (overdue.length > 0) status = 'critico';
      else if (waiting.length >= 2 || pipeline.length >= 5) status = 'atencao';
      const score = overdue.length * 3 + waiting.length + pipeline.length * 0.3;
      return { client: c, pipeline: pipeline.length, overdue: overdue.length, waiting: waiting.length, status, score };
    })
    .filter((h) => h.pipeline > 0)
    .sort((a, b) => b.score - a.score);
}

const DELIVERED_STATUSES = ['postar', 'programado', 'postado'];
const MONTH_LABELS_PT = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];

function computeMonthlyDeliveries(demandsForMetric) {
  const counts = {};
  demandsForMetric.forEach((d) => {
    if (!DELIVERED_STATUSES.includes(d.status)) return;
    const dateStr = d.prazo_final || d.prazo_designer;
    if (!dateStr) return;
    const key = dateStr.slice(0, 7); // YYYY-MM
    counts[key] = (counts[key] || 0) + 1;
  });
  const keys = Object.keys(counts).sort();
  if (!keys.length) return [];
  // pega os últimos 6 meses com dados (ou intervalo entre o mais antigo e o mais recente, o que for menor)
  const recent = keys.slice(-6);
  return recent.map((key) => {
    const [y, m] = key.split('-');
    return { key, label: `${MONTH_LABELS_PT[Number(m) - 1]}/${y.slice(2)}`, count: counts[key] };
  });
}

function computeStatusPendingCounts(pipeline) {
  const counts = {};
  pipeline.forEach((d) => { counts[d.status] = (counts[d.status] || 0) + 1; });
  return Object.entries(counts)
    .map(([key, count]) => ({ key, label: statusDef(key).label, count }))
    .sort((a, b) => b.count - a.count);
}

function computeDeliveredFormatCounts(demandsForMetric) {
  const counts = {};
  demandsForMetric.forEach((d) => {
    if (!DELIVERED_STATUSES.includes(d.status)) return;
    (d.format || []).forEach((fm) => { counts[fm] = (counts[fm] || 0) + 1; });
  });
  return Object.entries(counts).sort((a, b) => b[1] - a[1]);
}

function computeWorkload(demandsForWorkload) {
  const byName = {};
  demandsForWorkload.forEach((d) => {
    if (!d.responsible || DONE_STATUSES.includes(d.status)) return;
    byName[d.responsible] = (byName[d.responsible] || 0) + 1;
  });
  return Object.entries(byName).sort((a, b) => b[1] - a[1]);
}

// Sinaliza sobrecarga por pessoa: cruza nº de demandas abertas + atrasadas +
// vencendo essa semana + urgentes. Thresholds pensados pra um time pequeno de
// social media/design (ajustar aqui se o time crescer bastante).
const WORKLOAD_LEVEL_META = {
  ok: { label: 'Tranquilo', dot: '🟢' },
  warn: { label: 'Atenção', dot: '🟡' },
  over: { label: 'Sobrecarregado', dot: '🔴' },
};
function computeWorkloadHealth() {
  const today = todayStr();
  const weekEnd = addDaysStr(today, 7);
  return activeTeamNames().map((name) => {
    const mine = state.demands.filter((d) => d.responsible === name && !DONE_STATUSES.includes(d.status));
    const open = mine.length;
    const overdue = mine.filter((d) => d.prazo_final && d.prazo_final < today).length;
    const dueThisWeek = mine.filter((d) => d.prazo_final && d.prazo_final >= today && d.prazo_final <= weekEnd).length;
    const urgent = mine.filter((d) => d.priority === 'urgente').length;
    let level = 'ok';
    if (overdue >= 3 || open >= 9) level = 'over';
    else if (overdue >= 1 || open >= 5 || urgent >= 2) level = 'warn';
    return { name, open, overdue, dueThisWeek, urgent, level };
  }).filter((w) => w.open > 0).sort((a, b) => b.open - a.open);
}

function renderDashboard(main) {
  const f = state.dashboardFilters;
  const dateRange = computeDateRange(f.period, f.customStart, f.customEnd);
  const scoped = state.demands.filter((d) => {
    if (f.clientId && d.client_id !== f.clientId) return false;
    if (f.responsible && d.responsible !== f.responsible) return false;
    if (dateRange) {
      if (!d.prazo_final || d.prazo_final < dateRange.start || d.prazo_final > dateRange.end) return false;
    }
    return true;
  });

  const totalClients = state.clients.filter((c) => c.status === 'ativo').length;
  const pipeline = scoped.filter((d) => !DONE_STATUSES.includes(d.status));
  const totalDemands = pipeline.length;
  const overdue = pipeline.filter((d) => d.prazo_final && d.prazo_final < todayStr()).length;
  const soon = pipeline.filter((d) => {
    if (!d.prazo_final || d.prazo_final < todayStr()) return false;
    const days = Math.round((new Date(d.prazo_final) - new Date(todayStr())) / 86400000);
    return days <= 3;
  }).length;
  const waitingClient = scoped.filter((d) => d.status === 'em_aprovacao_cliente' || d.status === 'aprovacao_briefing').length;
  const urgent = pipeline.filter((d) => d.priority === 'urgente').length;
  const readyToPost = scoped.filter((d) => d.status === 'postar' || d.status === 'programado').length;

  const upcomingCaptures = state.demands.filter((d) => {
    if (f.clientId && d.client_id !== f.clientId) return false;
    if (f.responsible && d.responsible !== f.responsible) return false;
    if (DONE_STATUSES.includes(d.status)) return false;
    return d.needs_capture !== false && d.capture_date && d.capture_date >= todayStr();
  }).sort((a, b) => (a.capture_date < b.capture_date ? -1 : 1));

  const workloadHealth = computeWorkloadHealth();
  const maxWorkloadOpen = workloadHealth.length ? Math.max(...workloadHealth.map((w) => w.open)) : 0;

  const formatCounts = (() => {
    const counts = {};
    pipeline.forEach((d) => (d.format || []).forEach((fm) => { counts[fm] = (counts[fm] || 0) + 1; }));
    return Object.entries(counts).sort((a, b) => b[1] - a[1]);
  })();
  const maxFormatCount = formatCounts.length ? formatCounts[0][1] : 0;

  const workload = computeWorkload(scoped);
  const maxWorkload = workload.length ? workload[0][1] : 0;

  const health = computeClientHealth();
  const monthly = computeMonthlyDeliveries(scoped);
  const maxMonthly = monthly.length ? Math.max(...monthly.map((m) => m.count)) : 0;
  const statusPending = computeStatusPendingCounts(pipeline);
  const maxStatusPending = statusPending.length ? statusPending[0].count : 0;
  const deliveredFormatCounts = computeDeliveredFormatCounts(scoped);
  const maxDeliveredFormat = deliveredFormatCounts.length ? deliveredFormatCounts[0][1] : 0;

  main.innerHTML = `
    <div class="page-header">
      <div>
        <h1>Dashboard</h1>
        <p>Visão geral da operação da WAS</p>
      </div>
    </div>

    <div class="dash-filters">
      <select id="dash-filter-client">
        <option value="">Todos os clientes</option>
        ${state.clients.filter((c) => c.status === 'ativo').map((c) => `<option value="${c.id}" ${f.clientId === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
      </select>
      <select id="dash-filter-responsible">
        <option value="">Todos os responsáveis</option>
        ${activeTeamNames().map((n) => `<option value="${escapeHtml(n)}" ${f.responsible === n ? 'selected' : ''}>${escapeHtml(n)}</option>`).join('')}
      </select>
      <select id="dash-filter-period">
        <option value="all" ${f.period === 'all' ? 'selected' : ''}>Todo o período</option>
        <option value="this_month" ${f.period === 'this_month' ? 'selected' : ''}>Este mês</option>
        <option value="last_month" ${f.period === 'last_month' ? 'selected' : ''}>Mês passado</option>
        <option value="next_30" ${f.period === 'next_30' ? 'selected' : ''}>Próximos 30 dias</option>
        <option value="custom" ${f.period === 'custom' ? 'selected' : ''}>Personalizado</option>
      </select>
      ${f.period === 'custom' ? `
        <input type="date" id="dash-filter-start" value="${f.customStart || ''}" />
        <span style="color:var(--text-dim);font-size:12px">até</span>
        <input type="date" id="dash-filter-end" value="${f.customEnd || ''}" />
      ` : ''}
      ${(f.clientId || f.responsible || f.period !== 'all') ? '<button class="btn secondary small" id="dash-filter-clear">Limpar filtros</button>' : ''}
    </div>

    <div class="grid-cards">
      <div class="stat-card"><div class="num">${totalClients}</div><div class="label">Clientes ativos</div></div>
      <div class="stat-card"><div class="num">${totalDemands}</div><div class="label">Demandas no pipeline</div></div>
      <div class="stat-card"><div class="num" style="color:${overdue ? 'var(--red)' : 'var(--text)'}">${overdue}</div><div class="label">Atrasadas</div></div>
      <div class="stat-card"><div class="num" style="color:${soon ? 'var(--yellow)' : 'var(--text)'}">${soon}</div><div class="label">Vencem em até 3 dias</div></div>
      <div class="stat-card"><div class="num" style="color:${urgent ? 'var(--red)' : 'var(--text)'}">${urgent}</div><div class="label">Prioridade urgente</div></div>
      <div class="stat-card"><div class="num" style="color:${waitingClient ? 'var(--yellow)' : 'var(--text)'}">${waitingClient}</div><div class="label">Aguardando cliente</div></div>
      <div class="stat-card"><div class="num">${readyToPost}</div><div class="label">Prontas p/ postar</div></div>
    </div>

    <div class="dash-panel" style="margin-bottom:20px">
      <h2>🎬 Próximas captações</h2>
      <p class="dash-panel-sub">Agenda de captação por ordem de data, a partir de hoje</p>
      ${upcomingCaptures.length ? `
        <div class="notif-list">
          ${upcomingCaptures.slice(0, 8).map((d) => `
            <div class="notif-row" data-open-capture="${d.id}">
              <span class="notif-icon">🎬</span>
              <div class="notif-body">
                <div class="notif-title">${escapeHtml(d.title)}</div>
                <div class="notif-meta">${escapeHtml(clientName(d.client_id))}${d.responsible ? ' · ' + escapeHtml(d.responsible) : ''}</div>
              </div>
              <div class="sub" style="flex-shrink:0">${formatDateBR(d.capture_date)}</div>
            </div>
          `).join('')}
        </div>
        ${upcomingCaptures.length > 8 ? `<p class="dash-panel-sub" style="margin:10px 0 0">+${upcomingCaptures.length - 8} outra${upcomingCaptures.length - 8 === 1 ? '' : 's'} captação${upcomingCaptures.length - 8 === 1 ? '' : 'ões'} agendada${upcomingCaptures.length - 8 === 1 ? '' : 's'}</p>` : ''}
      ` : '<div class="empty-state">Nenhuma captação agendada no momento.</div>'}
    </div>

    <div class="dash-panel dash-panel-wide" style="margin-bottom:20px">
      <h2>Entregas do mês</h2>
      <p class="dash-panel-sub">Visão completa: histórico de entregas, o que ainda está pendente e por formato</p>
      ${monthly.length ? `
        <div class="format-bars">
          ${monthly.map((m) => `
            <div class="format-bar-row">
              <span class="format-bar-label">${escapeHtml(m.label)}</span>
              <div class="format-bar-track"><div class="format-bar-fill" style="width:${maxMonthly ? Math.round((m.count / maxMonthly) * 100) : 0}%"></div></div>
              <span class="format-bar-count">${m.count}</span>
            </div>
          `).join('')}
        </div>
      ` : '<div class="empty-state">Nenhuma entrega com prazo definido ainda.</div>'}

      <div class="dash-subgrid">
        <div class="dash-subpanel">
          <h3>Status pendentes</h3>
          <p class="dash-panel-sub">Tudo que ainda não foi entregue, por etapa atual</p>
          ${statusPending.length ? `
            <div class="format-bars">
              ${statusPending.map((s) => `
                <div class="format-bar-row">
                  <span class="format-bar-label">${escapeHtml(s.label)}</span>
                  <div class="format-bar-track"><div class="format-bar-fill" style="width:${maxStatusPending ? Math.round((s.count / maxStatusPending) * 100) : 0}%"></div></div>
                  <span class="format-bar-count">${s.count}</span>
                </div>
              `).join('')}
            </div>
          ` : '<div class="empty-state">Nada pendente — tudo entregue.</div>'}
        </div>

        <div class="dash-subpanel">
          <h3>Entregas por formato</h3>
          <p class="dash-panel-sub">O que já foi (ou está pronto pra ser) postado, por formato</p>
          ${deliveredFormatCounts.length ? `
            <div class="format-bars">
              ${deliveredFormatCounts.map(([name, count]) => `
                <div class="format-bar-row">
                  <span class="format-bar-label">${escapeHtml(name)}</span>
                  <div class="format-bar-track"><div class="format-bar-fill" style="width:${maxDeliveredFormat ? Math.round((count / maxDeliveredFormat) * 100) : 0}%"></div></div>
                  <span class="format-bar-count">${count}</span>
                </div>
              `).join('')}
            </div>
          ` : '<div class="empty-state">Nenhuma entrega com formato definido ainda.</div>'}
        </div>
      </div>
    </div>

    <div class="dash-split">
      <div class="dash-panel">
        <h2>Demandas por tipo</h2>
        ${formatCounts.length ? `
          <div class="format-bars">
            ${formatCounts.map(([name, count]) => `
              <div class="format-bar-row">
                <span class="format-bar-label">${escapeHtml(name)}</span>
                <div class="format-bar-track"><div class="format-bar-fill" style="width:${maxFormatCount ? Math.round((count / maxFormatCount) * 100) : 0}%"></div></div>
                <span class="format-bar-count">${count}</span>
              </div>
            `).join('')}
          </div>
        ` : '<div class="empty-state">Nenhuma demanda ativa com formato definido.</div>'}
      </div>

      <div class="dash-panel">
        <h2>Carga de trabalho por responsável</h2>
        <p class="dash-panel-sub">Quem está com mais demandas em aberto — e quem pode estar sobrecarregado</p>
        ${workloadHealth.length ? `
          <div class="format-bars">
            ${workloadHealth.map((w) => `
              <div class="format-bar-row" title="${w.overdue} atrasada${w.overdue === 1 ? '' : 's'} · ${w.dueThisWeek} vencendo essa semana${w.urgent ? ' · ' + w.urgent + ' urgente' + (w.urgent === 1 ? '' : 's') : ''}">
                <span class="format-bar-label">${WORKLOAD_LEVEL_META[w.level].dot} ${escapeHtml(w.name)}</span>
                <div class="format-bar-track"><div class="format-bar-fill workload-${w.level}" style="width:${maxWorkloadOpen ? Math.round((w.open / maxWorkloadOpen) * 100) : 0}%"></div></div>
                <span class="format-bar-count">${w.open}</span>
              </div>
            `).join('')}
          </div>
          <p class="dash-panel-sub" style="margin:12px 0 0">
            ${WORKLOAD_LEVEL_META.ok.dot} Tranquilo &nbsp; ${WORKLOAD_LEVEL_META.warn.dot} Atenção &nbsp; ${WORKLOAD_LEVEL_META.over.dot} Sobrecarregado
            ${workloadHealth.some((w) => w.level === 'over') ? ` — <strong style="color:var(--red)">${workloadHealth.filter((w) => w.level === 'over').map((w) => w.name).join(', ')}</strong> precisa de ajuda ou redistribuição de demandas` : ''}
          </p>
        ` : '<div class="empty-state">Nenhuma demanda em aberto com responsável definido.</div>'}
      </div>
    </div>

    <div class="dash-panel" style="margin-bottom:30px">
      <h2>Termômetro de clientes</h2>
      <p class="dash-panel-sub">Quem está mais encavalado e quem está em dia</p>
      ${health.length ? `
        <div class="health-list health-list-scroll">
          ${health.map((h) => {
            const def = HEALTH_DEFS[h.status];
            const metaParts = [];
            if (h.overdue) metaParts.push(`${h.overdue} atrasada${h.overdue === 1 ? '' : 's'}`);
            if (h.waiting) metaParts.push(`${h.waiting} aguardando cliente`);
            metaParts.push(`${h.pipeline} no pipeline`);
            return `
              <div class="health-row" data-open="${h.client.id}">
                <span class="health-dot">${def.icon}</span>
                <div class="health-info">
                  <div class="health-name">${escapeHtml(h.client.name)}</div>
                  <div class="health-meta">${metaParts.join(' · ')}</div>
                </div>
                <span class="tag tag-${def.color}">${def.label}</span>
              </div>
            `;
          }).join('')}
        </div>
      ` : '<div class="empty-state">Nenhum cliente com demandas ativas ainda.</div>'}
    </div>
  `;

  document.getElementById('dash-filter-client').onchange = (e) => {
    state.dashboardFilters.clientId = e.target.value;
    renderDashboard(main);
  };
  document.getElementById('dash-filter-responsible').onchange = (e) => {
    state.dashboardFilters.responsible = e.target.value;
    renderDashboard(main);
  };
  document.getElementById('dash-filter-period').onchange = (e) => {
    state.dashboardFilters.period = e.target.value;
    renderDashboard(main);
  };
  const startInput = document.getElementById('dash-filter-start');
  if (startInput) startInput.onchange = (e) => {
    state.dashboardFilters.customStart = e.target.value;
    renderDashboard(main);
  };
  const endInput = document.getElementById('dash-filter-end');
  if (endInput) endInput.onchange = (e) => {
    state.dashboardFilters.customEnd = e.target.value;
    renderDashboard(main);
  };
  const clearBtn = document.getElementById('dash-filter-clear');
  if (clearBtn) clearBtn.onclick = () => {
    state.dashboardFilters = { clientId: '', responsible: '', period: 'all', customStart: '', customEnd: '' };
    renderDashboard(main);
  };
  main.querySelectorAll('[data-open-capture]').forEach((el) => {
    el.onclick = () => {
      const demand = state.demands.find((d) => d.id === el.dataset.openCapture);
      if (demand) openDemandModal(demand);
    };
  });
  main.querySelectorAll('.health-row[data-open]').forEach((el) => {
    el.onclick = async () => {
      state.currentClientId = el.dataset.open;
      state.currentPageId = null;
      state.calendarCursor = null;
      state.page = 'cliente-detail';
      document.querySelectorAll('.nav-item').forEach((n) => n.classList.remove('active'));
      state.pages = await api('/pages?client_id=' + state.currentClientId);
      render();
    };
  });
}

// Notificações e telas em tempo real: enquanto o app estiver aberto, busca dados
// novos periodicamente (pra refletir o que outra pessoa do time mexeu no kanban,
// na tabela ou em qualquer demanda) e atualiza o badge + a tela atual sozinho.
const AUTO_REFRESH_PAGES = ['dashboard', 'demandas', 'notificacoes', 'minhas-demandas', 'cliente-detail'];
function startGlobalAutoRefresh() {
  setInterval(async () => {
    if (document.querySelector('.modal-backdrop')) return; // não interrompe quem está editando um card
    const active = document.activeElement;
    if (active && ['INPUT', 'TEXTAREA', 'SELECT'].includes(active.tagName)) return; // não interrompe quem está digitando/filtrando
    if (document.querySelector('.demand-card.dragging')) return; // não interrompe um drag em andamento
    try {
      await loadAll();
      if (AUTO_REFRESH_PAGES.includes(state.page)) render();
      else updateNavBadges();
    } catch (e) { /* silencioso — tenta de novo no próximo ciclo */ }
  }, 12000);
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
    ${!isEdit ? '<p style="color:var(--text-dim);font-size:12px;margin-top:10px">Assim que criado, o cliente já recebe a estrutura padrão: Calendário de Entrega, Planejamento, Brand Guide e Relatórios de Desempenho.</p>' : ''}
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

function sectionIcon(title, type) {
  if (title === 'Calendário de Entrega') return '📅';
  if (title === 'Planejamento') return '🗓️';
  if (title === 'Brand Guide') return '🎨';
  if (title === 'Relatórios de Desempenho') return '📊';
  return pageIcon({ type });
}

function renderClienteDetail(main) {
  const client = clientById(state.currentClientId);
  if (!client) {
    state.page = 'clientes';
    return renderClientes(main);
  }

  if (!state.currentPageId) {
    return renderClientHub(main, client);
  }

  const currentPage = state.pages.find((p) => p.id === state.currentPageId);
  if (!currentPage) {
    state.currentPageId = null;
    return renderClientHub(main, client);
  }

  main.innerHTML = `
    <div class="page-header">
      <div>
        <div class="crumb">
          <a href="#" id="crumb-clients">Clientes</a> <span>/</span>
          <a href="#" id="crumb-hub">${escapeHtml(client.name)}</a> <span>/</span>
          <span>${escapeHtml(currentPage.title)}</span>
        </div>
      </div>
    </div>
    <div class="page-editor" id="page-editor"></div>
  `;

  document.getElementById('crumb-clients').onclick = (e) => {
    e.preventDefault();
    state.page = 'clientes';
    state.currentClientId = null;
    state.currentPageId = null;
    render();
  };
  document.getElementById('crumb-hub').onclick = (e) => {
    e.preventDefault();
    state.currentPageId = null;
    renderClienteDetail(main);
  };

  renderPageEditor(currentPage);
}

// Hub do cliente: lugares clicáveis (não uma barra) — cada card leva pra uma página cheia sobre aquele assunto.
function renderClientHub(main, client) {
  const rootPages = state.pages
    .filter((p) => p.client_id === client.id && !p.parent_id)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  main.innerHTML = `
    <div class="page-header">
      <div>
        <a href="#" id="back-to-clients" class="back-link">&larr; Voltar para Clientes</a>
        <h1 style="margin-top:8px"><span class="tag tag-${client.color || 'default'} tag-lg">${escapeHtml(client.name)}</span></h1>
        <p>Escolha uma seção para abrir</p>
      </div>
    </div>
    <div class="section-grid" id="section-grid"></div>
  `;

  document.getElementById('back-to-clients').onclick = (e) => {
    e.preventDefault();
    state.page = 'clientes';
    state.currentClientId = null;
    render();
  };

  const grid = document.getElementById('section-grid');
  grid.innerHTML = rootPages.map((p) => {
    const children = state.pages.filter((c) => c.parent_id === p.id);
    let meta;
    if (p.type === 'calendar') {
      const withDate = state.demands.filter((d) => d.client_id === client.id && (d.prazo_final || d.prazo_designer)).length;
      meta = `${withDate} demanda${withDate === 1 ? '' : 's'} com prazo`;
    } else if (children.length) {
      meta = `${children.length} subpágina${children.length === 1 ? '' : 's'}`;
    } else if (p.content && p.content.trim()) {
      meta = `Atualizado em ${formatDateBR((p.updated_at || '').slice(0, 10)) || 'recentemente'}`;
    } else {
      meta = 'Vazio — clique para começar';
    }
    return `
      <div class="section-tile" data-open="${p.id}">
        <div class="section-icon">${sectionIcon(p.title, p.type)}</div>
        <div class="section-name">${escapeHtml(p.title)}</div>
        <div class="section-meta">${meta}</div>
      </div>
    `;
  }).join('') + `
    <div class="section-tile add" id="add-section-tile">
      <div class="section-icon">+</div>
      <div class="section-name">Nova seção</div>
      <div class="section-meta">Criar página adicional</div>
    </div>
  `;

  grid.querySelectorAll('.section-tile[data-open]').forEach((el) => {
    el.onclick = () => {
      state.currentPageId = el.dataset.open;
      state.calendarCursor = null;
      renderClienteDetail(main);
    };
  });
  document.getElementById('add-section-tile').onclick = () => quickCreatePage(null);
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
  const dateFilter = state.calendarDateFilter || 'both';

  editor.innerHTML = `
    <div class="editor-toolbar">
      <h2 style="margin:0;font-size:17px;font-weight:700">📅 ${escapeHtml(page.title)}</h2>
      <span class="synced-badge">sincronizado com Demandas</span>
      <select id="cal-date-filter" class="cal-date-filter">
        <option value="both" ${dateFilter === 'both' ? 'selected' : ''}>🚀🎨 Prazo final + designer</option>
        <option value="prazo_final" ${dateFilter === 'prazo_final' ? 'selected' : ''}>🚀 Prazo de postagem/entrega</option>
        <option value="prazo_designer" ${dateFilter === 'prazo_designer' ? 'selected' : ''}>🎨 Prazo do designer</option>
      </select>
      <div class="cal-nav">
        <button class="icon-btn" id="cal-prev" title="Mês anterior">‹</button>
        <span class="cal-month-label">${MONTH_LABELS[m]} de ${y}</span>
        <button class="icon-btn" id="cal-next" title="Próximo mês">›</button>
        <button class="btn secondary small" id="cal-today">Hoje</button>
      </div>
    </div>
    <p class="cal-hint">Arraste um card pra outro dia para mudar o prazo — como no Excel/Notion.</p>
    <div class="cal-scroll"><div class="cal-grid">
      ${WEEKDAY_LABELS.map((w) => `<div class="cal-weekday">${w}</div>`).join('')}
      ${cells.map((cell) => {
        if (!cell.inMonth) return `<div class="cal-cell out-month"><div class="cal-daynum">${cell.day}</div></div>`;
        const finalItems = dateFilter === 'prazo_designer' ? [] : demands.filter((d) => d.prazo_final === cell.dateStr);
        const designerOnly = dateFilter === 'prazo_final' ? [] : demands.filter((d) => d.prazo_designer === cell.dateStr && (dateFilter === 'prazo_designer' || d.prazo_final !== cell.dateStr));
        const items = [
          ...finalItems.map((d) => ({ d, icon: '🚀', field: 'prazo_final' })),
          ...designerOnly.map((d) => ({ d, icon: '🎨', field: 'prazo_designer' })),
        ];
        const isToday = cell.dateStr === today;
        return `
          <div class="cal-cell ${isToday ? 'is-today' : ''}" data-date="${cell.dateStr}">
            <div class="cal-daynum">${cell.day}${isToday ? ' <span class="cal-today-dot">hoje</span>' : ''}</div>
            <div class="cal-items">
              ${items.map(({ d, icon, field }) => {
                const sd = statusDef(d.status);
                return `<div class="cal-chip tag-${sd.color}" draggable="true" data-open="${d.id}" data-drag-id="${d.id}" data-drag-field="${field}">${icon} ${escapeHtml(d.title)}</div>`;
              }).join('')}
            </div>
          </div>
        `;
      }).join('')}
    </div></div>
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
  editor.querySelector('#cal-date-filter').onchange = (e) => {
    state.calendarDateFilter = e.target.value;
    renderCalendarPage(editor, page);
  };
  editor.querySelectorAll('.cal-chip').forEach((chip) => {
    chip.onclick = () => openDemandModal(state.demands.find((d) => d.id === chip.dataset.open));
    chip.addEventListener('dragstart', (e) => {
      e.stopPropagation();
      e.dataTransfer.setData('text/plain', JSON.stringify({ id: chip.dataset.dragId, field: chip.dataset.dragField }));
      e.dataTransfer.effectAllowed = 'move';
      chip.classList.add('dragging');
    });
    chip.addEventListener('dragend', () => chip.classList.remove('dragging'));
  });
  editor.querySelectorAll('.cal-cell[data-date]').forEach((cellEl) => {
    cellEl.addEventListener('dragover', (e) => {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'move';
      cellEl.classList.add('drag-over');
    });
    cellEl.addEventListener('dragleave', () => cellEl.classList.remove('drag-over'));
    cellEl.addEventListener('drop', async (e) => {
      e.preventDefault();
      cellEl.classList.remove('drag-over');
      let payload;
      try { payload = JSON.parse(e.dataTransfer.getData('text/plain')); } catch (err) { return; }
      const demand = state.demands.find((d) => d.id === payload.id);
      const newDate = cellEl.dataset.date;
      if (!demand || demand[payload.field] === newDate) return;
      demand[payload.field] = newDate;
      renderCalendarPage(editor, page);
      await api('/demands/' + payload.id, { method: 'PUT', body: JSON.stringify({ [payload.field]: newDate }) });
      toast('Prazo atualizado.', 'success');
    });
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
        <button class="btn secondary" id="btn-export-csv">⬇ Exportar CSV</button>
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
  document.getElementById('btn-export-csv').onclick = () => exportDemandsCSV(filtered);
  const viewRoot = document.getElementById('demands-view');
  if (state.demandsView === 'table') renderDemandTable(viewRoot, filtered);
  else renderKanban(viewRoot, filtered);
}

function csvEscape(value) {
  const str = String(value === undefined || value === null ? '' : value);
  if (/[",\n]/.test(str)) return '"' + str.replace(/"/g, '""') + '"';
  return str;
}

function exportDemandsCSV(list) {
  const headers = ['Demanda', 'Cliente', 'Status', 'Formato', 'Plataforma', 'Responsável', 'Prioridade', 'Prazo designer', 'Prazo final', 'Captação necessária', 'Visível ao cliente', 'Link'];
  const rows = list.map((d) => [
    d.title,
    clientName(d.client_id),
    statusDef(d.status).label,
    (d.format || []).join(' / '),
    (d.platform || []).join(' / '),
    d.responsible || '',
    (PRIORIDADE_OPTIONS.find((p) => p.key === d.priority) || {}).label || d.priority || '',
    formatDateBR(d.prazo_designer) || '',
    formatDateBR(d.prazo_final) || '',
    d.needs_capture ? 'Sim' : 'Não',
    d.visible_to_client ? 'Sim' : 'Não',
    d.link || '',
  ]);
  const csv = [headers, ...rows].map((row) => row.map(csvEscape).join(',')).join('\r\n');
  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `demandas-was-${todayStr()}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
  toast('CSV exportado.', 'success');
}

function renderKanban(root, filtered) {
  root.innerHTML = `<div class="kanban" id="kanban"></div><div class="board-footer" id="kanban-footer"></div>`;
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
                  <button class="col-add-btn" data-add="${col.key}" title="Nova demanda nesta coluna">+</button>
                </div>
                <div class="col-body" data-status="${col.key}">
                  ${items.map((d) => renderDemandCard(d)).join('')}
                  <button class="col-add-footer" data-add="${col.key}">+ Adicionar demanda</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>
        `}
      </div>
    `;
  }).join('');

  document.getElementById('kanban-footer').innerHTML = `${filtered.length} demanda${filtered.length === 1 ? '' : 's'} no total`;

  kanban.querySelectorAll('.stage-label').forEach((el) => {
    el.onclick = () => {
      const key = Number(el.dataset.stage);
      if (state.collapsedStages.has(key)) state.collapsedStages.delete(key);
      else state.collapsedStages.add(key);
      renderDemandas(document.getElementById('main'));
    };
  });

  wireDemandCardEvents(kanban);

  kanban.querySelectorAll('[data-add]').forEach((el) => {
    el.onclick = (e) => {
      e.stopPropagation();
      openDemandModal(null, el.dataset.add);
    };
  });

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

// ---------- Kanban de Briefing (Ideação → Aprovação cliente → Aprovado) ----------
// Não é um recurso separado: reaproveita as próprias demandas nos 3 primeiros status do fluxo.
// Ao cair em "Aprovado" o card já está com status a_fazer_design — aparece direto no
// "A Fazer - Design" do kanban de produção (Demandas), visível pro time inteiro (inclusive social media).
const BRIEFING_COLUMNS = [
  { key: 'em_briefing', label: '💡 Ideação' },
  { key: 'aprovacao_briefing', label: '📤 Aprovação do cliente' },
  { key: 'a_fazer_design', label: '✅ Aprovado — no A Fazer do time' },
];

function renderBriefingKanban(main) {
  const filtered = state.demands.filter((d) => BRIEFING_COLUMNS.some((c) => c.key === d.status));
  main.innerHTML = `
    <div class="page-header">
      <div>
        <h1>🧠 Briefing</h1>
        <p>Ideação e aprovação de conteúdo com o cliente. Ao aprovar, o card já cai no "A Fazer" do time de produção.</p>
      </div>
    </div>
    <div class="kanban" id="briefing-kanban"></div>
    <div class="board-footer" id="briefing-footer"></div>
  `;
  const kanban = document.getElementById('briefing-kanban');
  kanban.innerHTML = `
    <div class="stage-cols">
      ${BRIEFING_COLUMNS.map((col) => {
        const items = filtered.filter((d) => d.status === col.key);
        return `
          <div class="kanban-col" data-status="${col.key}">
            <div class="col-head">
              <h3>${col.label}</h3>
              <span class="count">${items.length}</span>
              <button class="col-add-btn" data-add="${col.key}" title="Novo briefing nesta coluna">+</button>
            </div>
            <div class="col-body" data-status="${col.key}">
              ${items.map((d) => renderDemandCard(d)).join('')}
              <button class="col-add-footer" data-add="${col.key}">+ Adicionar</button>
            </div>
          </div>
        `;
      }).join('')}
    </div>
  `;
  document.getElementById('briefing-footer').innerHTML = `${filtered.length} briefing${filtered.length === 1 ? '' : 's'} no total`;

  wireDemandCardEvents(kanban);

  kanban.querySelectorAll('[data-add]').forEach((el) => {
    el.onclick = (e) => {
      e.stopPropagation();
      openDemandModal(null, el.dataset.add);
    };
  });

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
      const justApproved = newStatus === 'a_fazer_design';
      demand.status = newStatus; // atualização otimista
      renderBriefingKanban(document.getElementById('main'));
      await api('/demands/' + demandId, { method: 'PUT', body: JSON.stringify({ status: newStatus }) });
      if (justApproved) toast('Aprovado! Já está no "A Fazer" do time de produção.', 'success');
    });
  });
}

function wireDemandCardEvents(root) {
  root.querySelectorAll('.card-title-input').forEach((input) => {
    input.addEventListener('click', (e) => e.stopPropagation());
    input.addEventListener('mousedown', (e) => e.stopPropagation());
    input.addEventListener('input', () => {
      const demand = state.demands.find((d) => d.id === input.dataset.id);
      patchInlineDebounced(demand, { title: input.value.trim() || 'Sem título' });
    });
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') input.blur();
    });
  });
  root.querySelectorAll('.demand-card').forEach((el) => {
    const demand = state.demands.find((d) => d.id === el.dataset.id);
    el.onclick = (e) => {
      if (e.target.closest('.card-title-input')) return;
      openDemandModal(demand);
    };
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
  const urg = urgencyClass(d);
  return `
    <div class="demand-card ${urg}" data-id="${d.id}" draggable="true">
      <input type="text" class="title card-title-input" data-id="${d.id}" value="${escapeHtml(d.title)}" />
      ${tags ? `<div class="tag-group">${tags}</div>` : ''}
      <div class="tag-group">${captureBadge}${d.briefing ? '<span class="tag tag-blue">📝 briefing</span>' : ''}${d.capture_link ? `<a href="${escapeHtml(d.capture_link)}" target="_blank" rel="noopener" class="tag tag-purple" onclick="event.stopPropagation()">🔗 material</a>` : ''}</div>
      <div class="sub">
        <span><span class="priority-dot ${d.priority}"></span>${escapeHtml(clientName(d.client_id))}${d.responsible ? ' · ' + escapeHtml(d.responsible) : ''}</span>
        <span class="${urg ? urg + '-text' : ''}">${formatDateBR(d.prazo_final) || formatDateBR(d.prazo_designer) || ''}</span>
      </div>
    </div>
  `;
}

// ---------- Colunas da tabela: builtin + customizadas, reordenáveis ----------
const BUILTIN_COLUMN_IDS = ['title', 'client', 'status', 'format', 'platform', 'responsible', 'priority', 'prazo_designer', 'prazo_final', 'captacao'];
const BUILTIN_COLUMN_LABELS = {
  title: 'Demanda', client: 'Cliente', status: 'Status', format: 'Formato', platform: 'Plataforma',
  responsible: 'Responsável', priority: 'Prioridade', prazo_designer: 'Prazo designer', prazo_final: 'Prazo final', captacao: 'Captação',
};

function normalizeColumnOrder(saved, customColumns) {
  const customIds = (customColumns || []).map((c) => c.id);
  const all = [...BUILTIN_COLUMN_IDS, ...customIds];
  const cleaned = (saved || []).filter((cid) => all.includes(cid));
  all.forEach((cid) => { if (!cleaned.includes(cid)) cleaned.push(cid); });
  return cleaned;
}

function columnLabel(colId) {
  if (BUILTIN_COLUMN_LABELS[colId]) return BUILTIN_COLUMN_LABELS[colId];
  const custom = state.customColumns.find((c) => c.id === colId);
  return custom ? custom.name : colId;
}

function saveColumnOrder() {
  api('/view-prefs', { method: 'PUT', body: JSON.stringify({ tableColumnOrder: state.tableColumnOrder }) });
}
function saveColumnWidths() {
  api('/view-prefs', { method: 'PUT', body: JSON.stringify({ columnWidths: state.tableColumnWidths }) });
}

// valor "puro" de uma célula (usado por copiar/colar) — arrays voltam como cópia
function getCellValue(colId, d) {
  if (colId === 'title') return d.title || '';
  if (colId === 'client') return d.client_id || '';
  if (colId === 'status') return d.status || '';
  if (colId === 'format' || colId === 'platform') return (d[colId] || []).slice();
  if (colId === 'responsible') return d.responsible || '';
  if (colId === 'priority') return d.priority || '';
  if (colId === 'prazo_designer') return d.prazo_designer || '';
  if (colId === 'prazo_final') return d.prazo_final || '';
  if (colId === 'captacao') return null; // campo composto, fora da seleção estilo Excel
  return (d.custom_fields && d.custom_fields[colId]) || '';
}

function buildCellPayload(colId, value) {
  if (colId === 'title') return { title: (value || '').toString().trim() || 'Sem título' };
  if (colId === 'client') return { client_id: value };
  if (colId === 'status') return { status: value };
  if (colId === 'format' || colId === 'platform') return { [colId]: Array.isArray(value) ? value.slice() : [] };
  if (colId === 'responsible') return { responsible: value };
  if (colId === 'priority') return { priority: value };
  if (colId === 'prazo_designer') return { prazo_designer: value };
  if (colId === 'prazo_final') return { prazo_final: value };
  return { custom_fields: { [colId]: value } };
}

// null = coluna não é "limpável" (campos obrigatórios como cliente/status/prioridade)
function clearCellPayload(colId) {
  if (colId === 'client' || colId === 'status' || colId === 'priority' || colId === 'captacao') return null;
  if (colId === 'format' || colId === 'platform') return buildCellPayload(colId, []);
  if (colId === 'title') return { title: 'Sem título' };
  return buildCellPayload(colId, '');
}

function mergePayload(existing, incoming) {
  const merged = { ...existing, ...incoming };
  if (existing.custom_fields || incoming.custom_fields) {
    merged.custom_fields = { ...(existing.custom_fields || {}), ...(incoming.custom_fields || {}) };
  }
  return merged;
}

async function applyBatchChanges(changes, verb, opts = {}) {
  const ids = Object.keys(changes);
  if (!ids.length) return;
  if (!opts.skipUndo) {
    const undoChanges = {};
    ids.forEach((rid) => {
      const d = state.demands.find((x) => x.id === rid);
      if (!d) return;
      const prev = {};
      Object.keys(changes[rid]).forEach((key) => {
        if (key === 'custom_fields') {
          prev.custom_fields = {};
          Object.keys(changes[rid].custom_fields || {}).forEach((ck) => {
            prev.custom_fields[ck] = (d.custom_fields && d.custom_fields[ck]) ?? '';
          });
        } else {
          prev[key] = d[key];
        }
      });
      undoChanges[rid] = prev;
    });
    state.tableUndoStack.push(undoChanges);
    if (state.tableUndoStack.length > 30) state.tableUndoStack.shift();
  }
  await Promise.all(ids.map((rid) => api('/demands/' + rid, { method: 'PUT', body: JSON.stringify(changes[rid]) }).then((updated) => {
    const idx = state.demands.findIndex((d) => d.id === rid);
    if (idx > -1) state.demands[idx] = updated;
  })));
  updateNavBadges();
  renderDemandas(document.getElementById('main'));
  toast(`${ids.length} célula(s) ${verb}.`, 'success');
}

function cellHasValue(colId, d) {
  const v = getCellValue(colId, d);
  if (v === null || v === undefined) return false;
  if (Array.isArray(v)) return v.length > 0;
  return String(v).trim() !== '';
}

// Estilo Excel: Ctrl+Seta pula para a borda do próximo bloco de dados preenchidos na coluna.
function jumpEdge(rowIds, colId, startR, dir, maxR) {
  const d0 = state.demands.find((x) => x.id === rowIds[startR]);
  const startFilled = d0 && cellHasValue(colId, d0);
  let r = startR;
  if (startFilled) {
    while (r + dir >= 0 && r + dir <= maxR) {
      const dn = state.demands.find((x) => x.id === rowIds[r + dir]);
      if (!dn || !cellHasValue(colId, dn)) break;
      r += dir;
    }
  } else {
    while (r + dir >= 0 && r + dir <= maxR) {
      r += dir;
      const dn = state.demands.find((x) => x.id === rowIds[r]);
      if (dn && cellHasValue(colId, dn)) break;
    }
  }
  return Math.max(0, Math.min(maxR, r));
}

function inSelectionRange(sel, r, c) {
  if (!sel) return false;
  const r1 = Math.min(sel.r1, sel.r2), r2 = Math.max(sel.r1, sel.r2);
  const c1 = Math.min(sel.c1, sel.c2), c2 = Math.max(sel.c1, sel.c2);
  return r >= r1 && r <= r2 && c >= c1 && c <= c2;
}

function applySelectionHighlight(root) {
  if (!root) return;
  root.querySelectorAll('td[data-row][data-col]').forEach((td) => {
    const r = Number(td.dataset.row);
    const c = state.tableColumnOrder.indexOf(td.dataset.col);
    td.classList.toggle('cell-selected', inSelectionRange(state.tableSelection, r, c));
  });
}

// Listener único (fica sempre ativo, mas só age quando a tabela de Demandas está na tela).
function handleTableKeydown(e) {
  if (state.page !== 'demandas' || state.demandsView !== 'table') return;
  const sel = state.tableSelection;

  // Ctrl+Z / Cmd+Z desfaz a última edição em massa feita na tabela (funciona mesmo sem
  // um intervalo selecionado no momento — só precisa já ter havido alguma edição).
  if ((e.ctrlKey || e.metaKey) && !e.shiftKey && e.key.toLowerCase() === 'z') {
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA')) return; // deixa o undo nativo do campo agir
    const last = state.tableUndoStack.pop();
    if (!last) { toast('Nada para desfazer.', 'info'); return; }
    e.preventDefault();
    applyBatchChanges(last, 'desfeita(s)', { skipUndo: true });
    return;
  }

  if (!sel) return;
  const rowIds = state.tableRowIds || [];
  const cols = state.tableColumnOrder;
  const maxR = rowIds.length - 1;
  const maxC = cols.length - 1;
  const meta = e.ctrlKey || e.metaKey;
  const isRange = sel.r1 !== sel.r2 || sel.c1 !== sel.c2;

  // Copiar é inofensivo (não altera nada) — sempre permitido, mesmo com um campo focado,
  // a menos que o usuário tenha texto selecionado dentro do campo (aí respeita a cópia nativa de texto).
  if (meta && e.key.toLowerCase() === 'c') {
    const active = document.activeElement;
    if (active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA') && active.selectionStart !== active.selectionEnd) return;
    const d = state.demands.find((x) => x.id === rowIds[sel.r1]);
    if (!d) return;
    const colId = cols[sel.c1];
    const value = getCellValue(colId, d);
    if (value === null) return;
    e.preventDefault();
    state.tableClipboard = { colId, value };
    toast('Célula copiada.', 'info');
    return;
  }

  // Shift+Seta (e Shift+Ctrl+Seta, estilo "pular para borda dos dados" do Excel) estende a
  // seleção mesmo a partir de uma única célula. Shift+Esquerda/Direita dentro de um campo com
  // foco é ignorado aqui para não brigar com a seleção nativa de texto do input.
  if (e.shiftKey && ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    const active = document.activeElement;
    const inField = active && (active.tagName === 'INPUT' || active.tagName === 'TEXTAREA');
    if (inField && (e.key === 'ArrowLeft' || e.key === 'ArrowRight')) return;
    e.preventDefault();
    let { r2, c2 } = sel;
    if (meta) {
      if (e.key === 'ArrowDown') r2 = jumpEdge(rowIds, cols[sel.c2], r2, 1, maxR);
      if (e.key === 'ArrowUp') r2 = jumpEdge(rowIds, cols[sel.c2], r2, -1, maxR);
      if (e.key === 'ArrowRight') c2 = maxC;
      if (e.key === 'ArrowLeft') c2 = 0;
    } else {
      if (e.key === 'ArrowUp') r2 = Math.max(0, r2 - 1);
      if (e.key === 'ArrowDown') r2 = Math.min(maxR, r2 + 1);
      if (e.key === 'ArrowLeft') c2 = Math.max(0, c2 - 1);
      if (e.key === 'ArrowRight') c2 = Math.min(maxC, c2 + 1);
    }
    state.tableSelection = { r1: sel.r1, c1: sel.c1, r2, c2 };
    applySelectionHighlight(document.getElementById('demands-view'));
    return;
  }

  // Os demais atalhos (navegação sem shift, colar, limpar) só agem quando um INTERVALO de
  // células já foi selecionado (arrastando o mouse ou via shift+seta) — assim nunca atrapalham
  // a digitação normal num campo único.
  if (!isRange) return;

  if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault();
    let { r2, c2 } = sel;
    if (e.key === 'ArrowUp') r2 = Math.max(0, r2 - 1);
    if (e.key === 'ArrowDown') r2 = Math.min(maxR, r2 + 1);
    if (e.key === 'ArrowLeft') c2 = Math.max(0, c2 - 1);
    if (e.key === 'ArrowRight') c2 = Math.min(maxC, c2 + 1);
    state.tableSelection = { r1: r2, c1: c2, r2, c2 };
    applySelectionHighlight(document.getElementById('demands-view'));
    return;
  }

  if (meta && e.key.toLowerCase() === 'v') {
    e.preventDefault();
    const clip = state.tableClipboard;
    if (!clip) return;
    const r1 = Math.min(sel.r1, sel.r2), r2 = Math.max(sel.r1, sel.r2);
    const c1 = Math.min(sel.c1, sel.c2), c2 = Math.max(sel.c1, sel.c2);
    const changes = {};
    for (let r = r1; r <= r2; r++) {
      for (let c = c1; c <= c2; c++) {
        const colId = cols[c];
        if (colId !== clip.colId) continue; // colar só dentro da mesma coluna copiada
        const rid = rowIds[r];
        if (!rid) continue;
        changes[rid] = mergePayload(changes[rid] || {}, buildCellPayload(colId, clip.value));
      }
    }
    applyBatchChanges(changes, 'colada(s)');
    return;
  }

  if (e.key === 'Delete' || e.key === 'Backspace') {
    e.preventDefault();
    const r1 = Math.min(sel.r1, sel.r2), r2 = Math.max(sel.r1, sel.r2);
    const c1 = Math.min(sel.c1, sel.c2), c2 = Math.max(sel.c1, sel.c2);
    const changes = {};
    for (let r = r1; r <= r2; r++) {
      for (let c = c1; c <= c2; c++) {
        const colId = cols[c];
        const payload = clearCellPayload(colId);
        if (!payload) continue;
        const rid = rowIds[r];
        if (!rid) continue;
        changes[rid] = mergePayload(changes[rid] || {}, payload);
      }
    }
    applyBatchChanges(changes, 'limpa(s)');
    return;
  }
}
document.addEventListener('keydown', handleTableKeydown);

const COLUMN_TYPE_OPTIONS = [
  { key: 'text', label: 'Texto' },
  { key: 'select', label: 'Seleção única' },
  { key: 'multi', label: 'Múltipla escolha' },
  { key: 'date', label: 'Data' },
  { key: 'number', label: 'Número' },
  { key: 'checkbox', label: 'Caixa de seleção' },
];
const COLUMN_OPTION_COLORS = ['green', 'blue', 'purple', 'yellow', 'orange', 'pink', 'red', 'brown', 'gray'];

function openAddColumnModal() {
  showModal(`
    <h2>Nova coluna</h2>
    <label>Nome</label>
    <input type="text" id="nc-name" style="width:100%" placeholder="ex: Observação interna" />
    <label>Tipo</label>
    <select id="nc-type" style="width:100%">
      ${COLUMN_TYPE_OPTIONS.map((o) => `<option value="${o.key}">${o.label}</option>`).join('')}
    </select>
    <div id="nc-options-wrap" class="hidden">
      <label>Opções (uma por linha)</label>
      <textarea id="nc-options" placeholder="Alta&#10;Média&#10;Baixa" style="min-height:80px"></textarea>
    </div>
    <div class="modal-footer">
      <button class="btn secondary" id="btn-cancel">Cancelar</button>
      <button class="btn" id="btn-create">Criar coluna</button>
    </div>
  `);
  document.getElementById('nc-type').onchange = (e) => {
    document.getElementById('nc-options-wrap').classList.toggle('hidden', !['select', 'multi'].includes(e.target.value));
  };
  document.getElementById('btn-cancel').onclick = closeModal;
  document.getElementById('btn-create').onclick = async () => {
    const name = document.getElementById('nc-name').value.trim();
    if (!name) { toast('Dê um nome pra coluna.', 'warn'); return; }
    const type = document.getElementById('nc-type').value;
    let options = [];
    if (type === 'select' || type === 'multi') {
      const lines = document.getElementById('nc-options').value.split('\n').map((l) => l.trim()).filter(Boolean);
      options = lines.map((v, i) => ({ value: v, color: COLUMN_OPTION_COLORS[i % COLUMN_OPTION_COLORS.length] }));
    }
    const col = await api('/custom-columns', { method: 'POST', body: JSON.stringify({ name, type, options }) });
    state.customColumns.push(col);
    state.tableColumnOrder.push(col.id);
    closeModal();
    renderDemandas(document.getElementById('main'));
    toast('Coluna criada.', 'success');
  };
  setTimeout(() => document.getElementById('nc-name').focus(), 0);
}

// ---------- Tabela: edição inline (sem abrir o card) + edição em massa estilo Excel ----------
async function patchInline(demand, payload, opts) {
  await api('/demands/' + demand.id, { method: 'PUT', body: JSON.stringify(payload) });
  Object.assign(demand, payload);
  const idx = state.demands.findIndex((d) => d.id === demand.id);
  if (idx > -1) state.demands[idx] = { ...state.demands[idx], ...payload };
  updateNavBadges();
  if (!opts || opts.rerender !== false) renderDemandas(document.getElementById('main'));
}
const patchInlineDebounced = debounce((demand, payload) => patchInline(demand, payload, { rerender: false }), 500);

const patchCustomFieldDebounced = debounce((demandId, colId, value) => {
  api('/demands/' + demandId, { method: 'PUT', body: JSON.stringify({ custom_fields: { [colId]: value } }) });
}, 500);
function patchCustomField(demand, colId, value) {
  demand.custom_fields = { ...(demand.custom_fields || {}), [colId]: value };
  const idx = state.demands.findIndex((d) => d.id === demand.id);
  if (idx > -1) state.demands[idx].custom_fields = demand.custom_fields;
  patchCustomFieldDebounced(demand.id, colId, value);
}

function urgencyClass(d) {
  if (DONE_STATUSES.includes(d.status)) return '';
  const today = todayStr();
  if (!d.prazo_final) return '';
  if (d.prazo_final < today) return 'urgency-red';
  if (d.prazo_final <= addDaysStr(today, 3)) return 'urgency-yellow';
  return '';
}

function openInlineSinglePopover(anchorEl, options, selectedValue, onChange) {
  const root = document.getElementById('ctx-menu-root');
  const rect = anchorEl.getBoundingClientRect();
  const left = Math.min(rect.left, window.innerWidth - 220);
  root.innerHTML = `
    <div class="inline-popover" style="left:${left}px; top:${rect.bottom + 4}px">
      ${options.length ? options.map((o) => `
        <div class="single-opt ${o.value === selectedValue ? 'active' : ''}" data-value="${escapeHtml(o.value)}">
          ${o.color ? `<span class="opt-dot tag-${o.color}"></span>` : ''}${escapeHtml(o.label)}
        </div>
      `).join('') : '<div class="filter-popover-empty">Nada disponível.</div>'}
    </div>
  `;
  root.querySelectorAll('.single-opt').forEach((el) => {
    el.onclick = (e) => {
      e.stopPropagation();
      root.innerHTML = '';
      onChange(el.dataset.value);
    };
  });
  setTimeout(() => document.addEventListener('click', () => { root.innerHTML = ''; }, { once: true }), 0);
}

function openInlineMultiPopover(anchorEl, options, selectedValues, onChange, onAddCustom) {
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
      ${onAddCustom ? `
        <div class="inline-popover-add">
          <input type="text" class="inline-popover-add-input" placeholder="+ Adicionar opção..." />
        </div>
      ` : ''}
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
  const addInput = root.querySelector('.inline-popover-add-input');
  if (addInput) {
    addInput.onclick = (e) => e.stopPropagation();
    addInput.onkeydown = async (e) => {
      if (e.key !== 'Enter') return;
      const name = addInput.value.trim();
      if (!name) return;
      addInput.disabled = true;
      await onAddCustom(name);
      root.innerHTML = '';
      onChange([...selectedValues, name]);
    };
  }
  setTimeout(() => document.addEventListener('click', () => { root.innerHTML = ''; }, { once: true }), 0);
}

function formatOptionNames() {
  return [...FORMATO_OPTIONS.map((o) => o.name), ...(state.customFormatOptions || []).map((o) => o.name)];
}
function platformOptionNames() {
  return [...PLATAFORMA_OPTIONS.map((o) => o.name), ...(state.customPlatformOptions || []).map((o) => o.name)];
}
async function addCustomFormatOption(name) {
  await api('/format-options', { method: 'POST', body: JSON.stringify({ name }) });
  if (!state.customFormatOptions.some((o) => o.name === name)) state.customFormatOptions.push({ name, color: 'gray' });
}
async function addCustomPlatformOption(name) {
  await api('/platform-options', { method: 'POST', body: JSON.stringify({ name }) });
  if (!state.customPlatformOptions.some((o) => o.name === name)) state.customPlatformOptions.push({ name, color: 'gray' });
}

function renderTableCell(colId, d, rowIndex, teamNames) {
  const attrs = `data-row="${rowIndex}" data-col="${colId}"`;
  const urg = urgencyClass(d);
  if (colId === 'title') {
    return `<td class="td-title" ${attrs}><input type="text" class="cell-input cell-title" data-id="${d.id}" value="${escapeHtml(d.title)}" /></td>`;
  }
  if (colId === 'client') {
    return `<td ${attrs}><button class="cell-select-btn" data-id="${d.id}" data-field="client_id">${escapeHtml(clientName(d.client_id))}</button></td>`;
  }
  if (colId === 'status') {
    const sd = statusDef(d.status);
    const colorClass = urg || `tag-${sd.color}`;
    return `<td ${attrs}><button class="cell-select-btn ${colorClass}" data-id="${d.id}" data-field="status">${escapeHtml(sd.label)}</button></td>`;
  }
  if (colId === 'format' || colId === 'platform') {
    return `<td ${attrs}><button class="cell-multi-btn" data-id="${d.id}" data-field="${colId}">${(d[colId] || []).join(', ') || '+ adicionar'}</button></td>`;
  }
  if (colId === 'responsible') {
    return `<td ${attrs}><button class="cell-select-btn" data-id="${d.id}" data-field="responsible">${escapeHtml(d.responsible) || '—'}</button></td>`;
  }
  if (colId === 'priority') {
    const pd = PRIORIDADE_OPTIONS.find((p) => p.key === d.priority) || {};
    return `<td ${attrs}><button class="cell-select-btn" data-id="${d.id}" data-field="priority">${escapeHtml(pd.label || d.priority)}</button></td>`;
  }
  if (colId === 'prazo_designer') {
    return `<td ${attrs}><input type="date" class="cell-input" data-id="${d.id}" data-field="prazo_designer" value="${d.prazo_designer || ''}" /></td>`;
  }
  if (colId === 'prazo_final') {
    return `<td class="${urg ? urg + '-cell' : ''}" ${attrs}><input type="date" class="cell-input" data-id="${d.id}" data-field="prazo_final" value="${d.prazo_final || ''}" /></td>`;
  }
  if (colId === 'captacao') {
    return `<td class="cell-capture">
      <label class="capture-toggle"><input type="checkbox" class="cell-capture-toggle" data-id="${d.id}" ${d.needs_capture !== false ? 'checked' : ''} /> 🎬</label>
      ${d.needs_capture !== false ? `<input type="date" class="cell-input cell-capture-date" data-id="${d.id}" value="${d.capture_date || ''}" />` : ''}
      ${d.capture_link ? `<a href="${escapeHtml(d.capture_link)}" target="_blank" rel="noopener" class="cell-capture-link" title="Abrir material de captação">🔗</a>` : ''}
    </td>`;
  }
  const val = (d.custom_fields && d.custom_fields[colId]) || '';
  return renderCustomCell(colId, d, attrs, val);
}

// Renderiza a célula de uma coluna customizada de acordo com o tipo escolhido na criação.
function renderCustomCell(colId, d, attrs, val) {
  const col = state.customColumns.find((c) => c.id === colId);
  const type = col ? col.type : 'text';
  if (type === 'select') {
    const opts = col.options || [];
    const opt = opts.find((o) => o.value === val);
    return `<td ${attrs}><button class="cell-select-btn" data-id="${d.id}" data-customcol="${colId}" data-customtype="select">${val ? escapeHtml((opt || {}).value || val) : '—'}</button></td>`;
  }
  if (type === 'multi') {
    const arr = Array.isArray(val) ? val : (val ? [val] : []);
    return `<td ${attrs}><button class="cell-multi-btn" data-id="${d.id}" data-customcol="${colId}" data-customtype="multi">${arr.join(', ') || '+ adicionar'}</button></td>`;
  }
  if (type === 'date') {
    return `<td ${attrs}><input type="date" class="cell-input cell-custom-date" data-id="${d.id}" data-customcol="${colId}" value="${val || ''}" /></td>`;
  }
  if (type === 'number') {
    return `<td ${attrs}><input type="number" class="cell-input cell-custom" data-id="${d.id}" data-customcol="${colId}" value="${val || ''}" /></td>`;
  }
  if (type === 'checkbox') {
    return `<td class="cell-capture" ${attrs}><label class="capture-toggle"><input type="checkbox" class="cell-custom-checkbox" data-id="${d.id}" data-customcol="${colId}" ${val ? 'checked' : ''} /></label></td>`;
  }
  return `<td ${attrs}><input type="text" class="cell-input cell-custom" data-id="${d.id}" data-customcol="${colId}" value="${escapeHtml(val)}" /></td>`;
}

function renderDemandTable(root, filtered) {
  const sorted = [...filtered].sort((a, b) => (a.prazo_final || '9999').localeCompare(b.prazo_final || '9999'));
  const teamNames = activeTeamNames();
  state.tableRowIds = sorted.map((d) => d.id);
  const totalCols = state.tableColumnOrder.length + 3; // checkbox + colunas + spacer da coluna "+" + expandir

  const DEFAULT_COL_WIDTH = { title: 220, client: 130, status: 150, format: 140, platform: 150, responsible: 100, priority: 90, prazo_designer: 110, prazo_final: 110, captacao: 140 };
  const headerCells = state.tableColumnOrder.map((colId) => {
    const w = state.tableColumnWidths[colId] || DEFAULT_COL_WIDTH[colId] || 120;
    return `
    <th draggable="true" data-col="${colId}" class="th-draggable" style="width:${w}px">
      <span class="th-label">${escapeHtml(columnLabel(colId))}</span>
      ${state.customColumns.some((c) => c.id === colId) ? `<span class="th-del" data-delcol="${colId}" title="Excluir coluna">×</span>` : ''}
      <span class="th-resize-handle" data-resize="${colId}"></span>
    </th>
  `;
  }).join('');

  root.innerHTML = `
    <div id="bulk-bar-slot"></div>
    <p class="table-hint">Arraste pra selecionar células · Ctrl+C / Ctrl+V pra colar em massa · Delete pra limpar · arraste a borda da coluna pra redimensionar — como no Excel.</p>
    <div class="table-wrap">
      <table class="data-table editable" style="table-layout:fixed">
        <thead>
          <tr>
            <th style="width:30px"><input type="checkbox" id="check-all" /></th>
            ${headerCells}
            <th class="th-add"><button class="th-add-btn" id="btn-add-column" title="Nova coluna">+</button></th>
            <th style="width:30px"></th>
          </tr>
        </thead>
        <tbody>
          ${sorted.length ? sorted.map((d, rowIndex) => {
            const cellsHtml = state.tableColumnOrder.map((colId) => renderTableCell(colId, d, rowIndex, teamNames)).join('');
            return `
              <tr data-id="${d.id}">
                <td><input type="checkbox" class="row-check" data-id="${d.id}" ${state.selectedDemandIds.has(d.id) ? 'checked' : ''} /></td>
                ${cellsHtml}
                <td></td>
                <td><button class="icon-btn" data-expand="${d.id}" title="Abrir card completo">⤢</button></td>
              </tr>
            `;
          }).join('') : `<tr><td colspan="${totalCols}"><div class="empty-state">Nenhuma demanda encontrada com esses filtros.</div></td></tr>`}
        </tbody>
        <tfoot>
          <tr class="table-count-row"><td colspan="${totalCols}">${sorted.length} demanda${sorted.length === 1 ? '' : 's'} no total</td></tr>
        </tfoot>
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
    input.addEventListener('input', () => {
      const demand = state.demands.find((d) => d.id === input.dataset.id);
      patchInlineDebounced(demand, { title: input.value.trim() || 'Sem título' });
    });
  });

  root.querySelectorAll('.cell-select-btn').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      const demand = state.demands.find((d) => d.id === btn.dataset.id);
      if (btn.dataset.customcol) {
        const col = state.customColumns.find((c) => c.id === btn.dataset.customcol);
        const opts = (col.options || []).map((o) => ({ value: o.value, label: o.value, color: o.color }));
        const current = (demand.custom_fields && demand.custom_fields[col.id]) || '';
        openInlineSinglePopover(btn, opts, current, (val) => patchCustomField(demand, col.id, val));
        return;
      }
      const field = btn.dataset.field;
      let options, current;
      if (field === 'client_id') {
        options = state.clients.map((c) => ({ value: c.id, label: c.name }));
        current = demand.client_id;
      } else if (field === 'status') {
        options = STATUS_DEFS.map((s) => ({ value: s.key, label: s.label, color: s.color }));
        current = demand.status;
      } else if (field === 'responsible') {
        const respOptions = demand.responsible && !teamNames.includes(demand.responsible) ? [...teamNames, demand.responsible] : teamNames;
        options = [{ value: '', label: '— Sem responsável —' }, ...respOptions.map((n) => ({ value: n, label: n }))];
        current = demand.responsible || '';
      } else if (field === 'priority') {
        options = PRIORIDADE_OPTIONS.map((p) => ({ value: p.key, label: p.label, color: p.color }));
        current = demand.priority;
      }
      openInlineSinglePopover(btn, options, current, (val) => patchInline(demand, { [field]: val }));
    };
  });

  root.querySelectorAll('input[type=date].cell-input').forEach((inp) => {
    inp.onchange = () => {
      const demand = state.demands.find((d) => d.id === inp.dataset.id);
      if (inp.dataset.customcol) { patchCustomField(demand, inp.dataset.customcol, inp.value); return; }
      patchInline(demand, { [inp.dataset.field]: inp.value });
    };
  });

  root.querySelectorAll('input[type=number].cell-custom').forEach((inp) => {
    inp.addEventListener('input', () => {
      const demand = state.demands.find((d) => d.id === inp.dataset.id);
      patchCustomField(demand, inp.dataset.customcol, inp.value);
    });
  });

  root.querySelectorAll('.cell-custom-checkbox').forEach((cb) => {
    cb.onclick = (e) => e.stopPropagation();
    cb.onchange = () => {
      const demand = state.demands.find((d) => d.id === cb.dataset.id);
      patchCustomField(demand, cb.dataset.customcol, cb.checked);
    };
  });

  root.querySelectorAll('input[type=text].cell-custom').forEach((input) => {
    input.addEventListener('input', () => {
      const demand = state.demands.find((d) => d.id === input.dataset.id);
      patchCustomField(demand, input.dataset.customcol, input.value);
    });
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
      if (btn.dataset.customcol) {
        const col = state.customColumns.find((c) => c.id === btn.dataset.customcol);
        const opts = (col.options || []).map((o) => o.value);
        const current = (demand.custom_fields && demand.custom_fields[col.id]) || [];
        openInlineMultiPopover(btn, opts, Array.isArray(current) ? current : [], (next) => patchCustomField(demand, col.id, next));
        return;
      }
      const field = btn.dataset.field;
      const options = field === 'format' ? formatOptionNames() : platformOptionNames();
      const addFn = field === 'format' ? addCustomFormatOption : addCustomPlatformOption;
      openInlineMultiPopover(btn, options, demand[field] || [], (next) => {
        patchInline(demand, { [field]: next });
      }, addFn);
    };
  });

  root.querySelectorAll('[data-expand]').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      openDemandModal(state.demands.find((d) => d.id === btn.dataset.expand));
    };
  });

  // ---- Seleção de células estilo Excel (arrastar, setas, copiar/colar/limpar) ----
  let dragging = false;
  function onMove(e) {
    if (!dragging) return;
    const el = document.elementFromPoint(e.clientX, e.clientY);
    const td = el && el.closest('td[data-row][data-col]');
    if (!td || !state.tableSelection) return;
    state.tableSelection.r2 = Number(td.dataset.row);
    state.tableSelection.c2 = state.tableColumnOrder.indexOf(td.dataset.col);
    applySelectionHighlight(root);
  }
  function onUp() {
    dragging = false;
    document.removeEventListener('mousemove', onMove);
    document.removeEventListener('mouseup', onUp);
  }
  root.querySelectorAll('td[data-row][data-col]').forEach((td) => {
    td.addEventListener('mousedown', () => {
      const r = Number(td.dataset.row);
      const c = state.tableColumnOrder.indexOf(td.dataset.col);
      dragging = true;
      state.tableSelection = { r1: r, c1: c, r2: r, c2: c };
      applySelectionHighlight(root);
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  });
  applySelectionHighlight(root);

  // ---- Reordenar colunas (arrastar cabeçalho) ----
  let dragColId = null;
  root.querySelectorAll('th.th-draggable').forEach((th) => {
    th.addEventListener('dragstart', (e) => {
      if (e.target.closest('.th-del') || e.target.closest('.th-resize-handle')) { e.preventDefault(); return; }
      dragColId = th.dataset.col;
      e.dataTransfer.effectAllowed = 'move';
    });
    th.addEventListener('dragover', (e) => { e.preventDefault(); th.classList.add('th-drag-over'); });
    th.addEventListener('dragleave', () => th.classList.remove('th-drag-over'));
    th.addEventListener('drop', (e) => {
      e.preventDefault();
      th.classList.remove('th-drag-over');
      const targetColId = th.dataset.col;
      if (!dragColId || dragColId === targetColId) return;
      const order = state.tableColumnOrder.slice();
      const fromIdx = order.indexOf(dragColId);
      const toIdx = order.indexOf(targetColId);
      order.splice(fromIdx, 1);
      order.splice(toIdx, 0, dragColId);
      state.tableColumnOrder = order;
      saveColumnOrder();
      renderDemandas(document.getElementById('main'));
    });
  });

  root.querySelectorAll('.th-resize-handle').forEach((handle) => {
    handle.addEventListener('mousedown', (e) => {
      e.stopPropagation();
      e.preventDefault();
      const th = handle.closest('th');
      const colId = handle.dataset.resize;
      const startX = e.clientX;
      const startWidth = th.offsetWidth;
      function onMove(ev) {
        th.style.width = Math.max(60, startWidth + (ev.clientX - startX)) + 'px';
      }
      function onUp() {
        document.removeEventListener('mousemove', onMove);
        document.removeEventListener('mouseup', onUp);
        state.tableColumnWidths[colId] = th.offsetWidth;
        saveColumnWidths();
      }
      document.addEventListener('mousemove', onMove);
      document.addEventListener('mouseup', onUp);
    });
  });

  root.querySelectorAll('[data-delcol]').forEach((el) => {
    el.onclick = async (e) => {
      e.stopPropagation();
      const colId = el.dataset.delcol;
      const ok = await confirmDialog('Excluir esta coluna? Os valores preenchidos nela serão perdidos.');
      if (!ok) return;
      await api('/custom-columns/' + colId, { method: 'DELETE' });
      state.customColumns = state.customColumns.filter((c) => c.id !== colId);
      state.tableColumnOrder = state.tableColumnOrder.filter((cid) => cid !== colId);
      renderDemandas(document.getElementById('main'));
      toast('Coluna excluída.', 'success');
    };
  });

  document.getElementById('btn-add-column').onclick = () => openAddColumnModal();
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
function multiBtnLabel(values, placeholder) {
  return values && values.length ? escapeHtml(values.join(', ')) : placeholder;
}

function openDemandModal(demand, defaultStatus) {
  if (!demand) return quickCreateDemandInstant(defaultStatus);

  const teamOptions = activeTeamNames();
  if (demand.responsible && !teamOptions.includes(demand.responsible)) teamOptions.push(demand.responsible);
  const hasNotes = !!(demand.briefing || demand.description);

  showModal(`
    <div class="dm-head">
      <input type="text" id="f-title" class="dm-title-input" placeholder="Sem título" value="${escapeHtml(demand.title)}" />
      <span id="autosave-indicator" class="autosave-indicator"></span>
    </div>

    <div class="field-section">
      <div class="two-col">
        <div>
          <label>Cliente</label>
          <select id="f-client" style="width:100%">
            ${state.clients.map((c) => `<option value="${c.id}" ${demand.client_id === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
          </select>
        </div>
        <div>
          <label>Status</label>
          <select id="f-status" style="width:100%">
            ${STAGES.map((stage) => `
              <optgroup label="${stage.label}">
                ${STATUS_DEFS.filter((s) => s.stage === stage.key).map((s) => `<option value="${s.key}" ${demand.status === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}
              </optgroup>
            `).join('')}
          </select>
        </div>
      </div>
    </div>

    <div class="field-section">
      <div class="two-col">
        <div>
          <label>Formato</label>
          <button type="button" class="field-multi-btn" id="f-format-btn">${multiBtnLabel(demand.format, '+ escolher formato')}</button>
        </div>
        <div>
          <label>Plataforma</label>
          <button type="button" class="field-multi-btn" id="f-platform-btn">${multiBtnLabel(demand.platform, '+ escolher plataforma')}</button>
        </div>
      </div>
      <div class="two-col" style="margin-top:12px">
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
    </div>

    <div class="field-section">
      <label style="display:flex;align-items:center;gap:8px">
        <input type="checkbox" id="f-needs-capture" ${demand.needs_capture !== false ? 'checked' : ''} style="width:auto" />
        Precisa de captação
      </label>
      <div id="capture-date-wrap" style="${demand.needs_capture === false ? 'display:none' : ''};margin-top:8px">
        <input type="date" id="f-capture-date" value="${demand.capture_date || ''}" />
        <input type="text" id="f-capture-link" placeholder="Link do material de captação (drive, etc.)" value="${escapeHtml(demand.capture_link || '')}" style="width:100%;margin-top:8px" />
      </div>
      <div class="two-col" style="margin-top:12px">
        <div>
          <label>Prazo designer</label>
          <input type="date" id="f-prazo-designer" value="${demand.prazo_designer || ''}" />
        </div>
        <div>
          <label>Entrega final</label>
          <input type="date" id="f-prazo-final" value="${demand.prazo_final || ''}" />
        </div>
      </div>
    </div>

    <div class="field-section">
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
    </div>

    <details class="field-details" open>
      <summary>Briefing e notas</summary>
      <label style="margin-top:10px">Briefing (Social Media)</label>
      <textarea id="f-briefing" placeholder="Objetivo, referências, direcionamento para quem for executar..." style="min-height:70px">${escapeHtml(demand.briefing)}</textarea>
      <label>Notas gerais</label>
      <textarea id="f-desc" style="min-height:44px">${escapeHtml(demand.description)}</textarea>
      <label>Link (arquivo, drive, etc.)</label>
      <input type="text" id="f-link" value="${escapeHtml(demand.link)}" style="width:100%" />
    </details>

    <details class="field-details" open>
      <summary>Comentários ${(demand.comments || []).length ? `(${(demand.comments || []).length})` : ''}</summary>
      <div class="comments-list" id="comments-list">
        ${(demand.comments || []).length ? (demand.comments || []).map((c) => `
          <div class="comment-row">
            <div class="comment-avatar">${initials(c.author)}</div>
            <div class="comment-body">
              <div class="comment-head">
                <span class="comment-author">${escapeHtml(c.author)}</span><span class="comment-time">${formatDateTimeBR(c.created_at)}</span>
                ${c.via === 'client' ? '<span class="tag tag-default" style="font-size:9.5px;padding:1px 6px">via cliente</span>' : ''}
                ${(state.currentUser && state.currentUser.name === c.author) ? `<button class="comment-del" data-del-comment="${c.id}" title="Excluir comentário">🗑</button>` : ''}
              </div>
              <div class="comment-text">${renderCommentText(c.text)}</div>
            </div>
          </div>
        `).join('') : '<div class="empty-state" style="padding:10px 0">Nenhum comentário ainda.</div>'}
      </div>
      <div class="comment-composer">
        <textarea id="f-comment-input" placeholder="Escreva um comentário... use @ pra marcar alguém da equipe"></textarea>
        <div id="mention-suggest" class="mention-suggest hidden"></div>
        <button class="btn small" id="btn-comment-send" style="margin-top:6px">Comentar</button>
      </div>
    </details>

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

  document.getElementById('f-client').onchange = (e) => { state.lastUsedClientId = e.target.value; patch({ client_id: e.target.value }); };
  document.getElementById('f-title').addEventListener('input', (e) => patchDebounced({ title: e.target.value.trim() }));
  document.getElementById('f-briefing').addEventListener('input', (e) => patchDebounced({ briefing: e.target.value }));
  document.getElementById('f-desc').addEventListener('input', (e) => patchDebounced({ description: e.target.value }));
  document.getElementById('f-status').onchange = (e) => patch({ status: e.target.value });
  document.getElementById('f-priority').onchange = (e) => patch({ priority: e.target.value });
  document.getElementById('f-forecast').onchange = (e) => patch({ forecast: e.target.value });
  document.getElementById('f-refacao').onchange = (e) => patch({ refacao: e.target.value });
  document.getElementById('f-resp').onchange = (e) => patch({ responsible: e.target.value });
  document.getElementById('f-link').addEventListener('input', (e) => patchDebounced({ link: e.target.value.trim() }));
  document.getElementById('f-capture-link').addEventListener('input', (e) => patchDebounced({ capture_link: e.target.value.trim() }));
  document.getElementById('f-prazo-designer').onchange = (e) => patch({ prazo_designer: e.target.value });
  document.getElementById('f-prazo-final').onchange = (e) => patch({ prazo_final: e.target.value });
  document.getElementById('f-needs-capture').onchange = (e) => {
    document.getElementById('capture-date-wrap').style.display = e.target.checked ? '' : 'none';
    patch({ needs_capture: e.target.checked, capture_date: e.target.checked ? demand.capture_date : '' });
  };
  document.getElementById('f-capture-date').onchange = (e) => patch({ capture_date: e.target.value });

  document.getElementById('f-format-btn').onclick = (e) => {
    openInlineMultiPopover(e.currentTarget, formatOptionNames(), demand.format, (next) => {
      demand.format = next;
      e.currentTarget.textContent = multiBtnLabel(next, '+ escolher formato');
      patch({ format: next });
    }, addCustomFormatOption);
  };
  document.getElementById('f-platform-btn').onclick = (e) => {
    openInlineMultiPopover(e.currentTarget, platformOptionNames(), demand.platform, (next) => {
      demand.platform = next;
      e.currentTarget.textContent = multiBtnLabel(next, '+ escolher plataforma');
      patch({ platform: next });
    }, addCustomPlatformOption);
  };

  // ---- Comentários + @menção ----
  const commentInput = document.getElementById('f-comment-input');
  const mentionBox = document.getElementById('mention-suggest');
  function closeMentionBox() { mentionBox.classList.add('hidden'); mentionBox.innerHTML = ''; }
  commentInput.addEventListener('input', () => {
    const val = commentInput.value;
    const caret = commentInput.selectionStart;
    const uptoCaret = val.slice(0, caret);
    const m = uptoCaret.match(/@([\wÀ-ÿ]*)$/);
    if (!m) { closeMentionBox(); return; }
    const query = m[1].toLowerCase();
    const matches = activeTeamNames().filter((n) => n.toLowerCase().includes(query));
    if (!matches.length) { closeMentionBox(); return; }
    mentionBox.classList.remove('hidden');
    mentionBox.innerHTML = matches.map((n) => `<div class="mention-suggest-item" data-name="${escapeHtml(n)}">${escapeHtml(n)}</div>`).join('');
    mentionBox.querySelectorAll('.mention-suggest-item').forEach((item) => {
      item.onclick = () => {
        const name = item.dataset.name;
        const before = uptoCaret.replace(/@([\wÀ-ÿ]*)$/, '@' + name + ' ');
        commentInput.value = before + val.slice(caret);
        closeMentionBox();
        commentInput.focus();
      };
    });
  });
  document.getElementById('btn-comment-send').onclick = async () => {
    const text = commentInput.value.trim();
    if (!text) return;
    const author = (state.currentUser && state.currentUser.name) || 'Alguém';
    const updated = await api('/demands/' + demand.id + '/comments', { method: 'POST', body: JSON.stringify({ text, author }) });
    demand.comments = updated.comments;
    const idx = state.demands.findIndex((d) => d.id === demand.id);
    if (idx > -1) state.demands[idx].comments = updated.comments;
    openDemandModal(demand);
  };
  document.querySelectorAll('.comment-del[data-del-comment]').forEach((btn) => {
    btn.onclick = async (e) => {
      e.stopPropagation();
      const commentId = btn.dataset.delComment;
      const ok = await confirmDialog('Excluir este comentário?');
      if (!ok) return;
      try {
        const updated = await api('/demands/' + demand.id + '/comments/' + commentId, { method: 'DELETE' });
        demand.comments = updated.comments;
        const idx = state.demands.findIndex((d) => d.id === demand.id);
        if (idx > -1) state.demands[idx].comments = updated.comments;
        openDemandModal(demand);
      } catch (err) {
        toast(err.message || 'Não foi possível excluir o comentário.', 'error');
      }
    };
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

  const titleInput = document.getElementById('f-title');
  if (state.focusTitleForDemandId === demand.id) {
    state.focusTitleForDemandId = null;
    setTimeout(() => { titleInput.focus(); titleInput.select(); }, 0);
  }
}

// Cria a demanda na hora, sem pedir nome nem cliente antes — abre direto pra edição (título em foco).
async function quickCreateDemandInstant(defaultStatus) {
  if (!state.clients.length) { toast('Cadastre um cliente antes de criar demandas.', 'warn'); return; }
  const lastClientId = state.lastUsedClientId && state.clients.some((c) => c.id === state.lastUsedClientId)
    ? state.lastUsedClientId
    : state.clients[0].id;
  const payload = {
    client_id: lastClientId,
    title: '',
    format: [], platform: [],
    status: defaultStatus || 'em_briefing',
    needs_capture: true,
    priority: 'normal',
    forecast: 'prevista',
  };
  const created = await api('/demands', { method: 'POST', body: JSON.stringify(payload) });
  await loadAll();
  render();
  state.focusTitleForDemandId = created.id;
  openDemandModal(state.demands.find((d) => d.id === created.id) || created);
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

function renderMinhasDemandas(main) {
  const myName = state.currentUser && state.currentUser.name;
  const f = state.minhasDemandasFilters;
  const dateRange = computeDateRange(f.period, f.customStart, f.customEnd);
  let mine = state.demands.filter((d) => d.responsible === myName);
  if (!f.showDone) mine = mine.filter((d) => !DONE_STATUSES.includes(d.status));
  if (dateRange) {
    mine = mine.filter((d) => d.prazo_final && d.prazo_final >= dateRange.start && d.prazo_final <= dateRange.end);
  }

  const today = todayStr();
  const overdue = mine.filter((d) => d.prazo_final && d.prazo_final < today && !DONE_STATUSES.includes(d.status));
  const thisWeek = mine.filter((d) => d.prazo_final && d.prazo_final >= today && d.prazo_final <= addDaysStr(today, 7) && !overdue.includes(d));
  const later = mine.filter((d) => d.prazo_final && d.prazo_final > addDaysStr(today, 7));
  const noDate = mine.filter((d) => !d.prazo_final);
  const doneGroup = f.showDone ? mine.filter((d) => DONE_STATUSES.includes(d.status)) : [];
  const notDoneIds = new Set([...overdue, ...thisWeek, ...later, ...noDate].map((d) => d.id));
  const doneOnly = doneGroup.filter((d) => !notDoneIds.has(d.id));

  const sortByPrazo = (arr) => [...arr].sort((a, b) => (a.prazo_final || '9999') < (b.prazo_final || '9999') ? -1 : 1);

  const group = (label, colorClass, items) => {
    if (!items.length) return '';
    return `
      <div class="dash-panel" style="margin-bottom:16px">
        <div class="notif-section-title ${colorClass}">${label} <span class="count">${items.length}</span></div>
        <div class="card-list" style="margin-top:10px">${sortByPrazo(items).map(renderDemandCard).join('')}</div>
      </div>
    `;
  };

  main.innerHTML = `
    <div class="page-header">
      <div>
        <h1>Minha Demanda</h1>
        <p>Tudo que está sob sua responsabilidade, num só lugar</p>
      </div>
    </div>

    <div class="dash-filters">
      <select id="minhas-filter-period">
        <option value="all" ${f.period === 'all' ? 'selected' : ''}>Todo o período</option>
        <option value="this_month" ${f.period === 'this_month' ? 'selected' : ''}>Este mês</option>
        <option value="next_30" ${f.period === 'next_30' ? 'selected' : ''}>Próximos 30 dias</option>
        <option value="custom" ${f.period === 'custom' ? 'selected' : ''}>Personalizado</option>
      </select>
      ${f.period === 'custom' ? `
        <input type="date" id="minhas-filter-start" value="${f.customStart || ''}" />
        <span style="color:var(--text-dim);font-size:12px">até</span>
        <input type="date" id="minhas-filter-end" value="${f.customEnd || ''}" />
      ` : ''}
      <label style="display:flex;align-items:center;gap:6px;font-size:13px;color:var(--text-dim);cursor:pointer">
        <input type="checkbox" id="minhas-filter-done" ${f.showDone ? 'checked' : ''} /> Mostrar concluídas
      </label>
      ${(f.period !== 'all' || f.showDone) ? '<button class="btn secondary small" id="minhas-filter-clear">Limpar filtros</button>' : ''}
    </div>

    ${mine.length ? `
      ${group('⚠️ Atrasadas', 'red', overdue)}
      ${group('🚀 Esta semana', 'orange', thisWeek)}
      ${group('📅 Mais adiante', 'blue', later)}
      ${group('🗓️ Sem prazo definido', 'gray', noDate)}
      ${group('✅ Concluídas', 'green', doneOnly)}
    ` : '<div class="empty-state">Nenhuma demanda sob sua responsabilidade no momento. 🎉</div>'}
  `;

  wireDemandCardEvents(main);

  const periodSel = document.getElementById('minhas-filter-period');
  if (periodSel) periodSel.onchange = (e) => { state.minhasDemandasFilters.period = e.target.value; render(); };
  const startInput = document.getElementById('minhas-filter-start');
  if (startInput) startInput.onchange = (e) => { state.minhasDemandasFilters.customStart = e.target.value; render(); };
  const endInput = document.getElementById('minhas-filter-end');
  if (endInput) endInput.onchange = (e) => { state.minhasDemandasFilters.customEnd = e.target.value; render(); };
  const doneCheck = document.getElementById('minhas-filter-done');
  if (doneCheck) doneCheck.onchange = (e) => { state.minhasDemandasFilters.showDone = e.target.checked; render(); };
  const clearBtn = document.getElementById('minhas-filter-clear');
  if (clearBtn) clearBtn.onclick = () => { state.minhasDemandasFilters = { period: 'all', customStart: '', customEnd: '', showDone: false }; render(); };
}

function renderNotificacoes(main) {
  const n = computeNotifications();
  const MENTION_TYPE_META = {
    mention: { icon: '💬', title: (m) => `${escapeHtml(m.from)} te marcou` },
    client_comment: { icon: '💬', title: (m) => `${escapeHtml(m.from)} comentou` },
    weekly_summary: { icon: '🗓️', title: () => 'Resumo da semana' },
    assignment: { icon: '🧑‍💼', title: (m) => `${escapeHtml(m.from)} te atribuiu uma demanda` },
  };
  const mentions = myMentionNotifications().sort((a, b) => (a.created_at < b.created_at ? 1 : -1));
  const mentionHtml = mentions.map((m) => {
    const meta = MENTION_TYPE_META[m.type] || MENTION_TYPE_META.mention;
    return `
    <div class="notif-row ${m.read ? '' : 'notif-unread'}" data-open="${m.demand_id}" data-mention-id="${m.id}">
      <span class="notif-icon">${meta.icon}</span>
      <div class="notif-body">
        <div class="notif-title">${meta.title(m)}</div>
        <div class="notif-meta">${escapeHtml(m.message)}</div>
      </div>
    </div>
  `;
  }).join('');
  const mentionSection = renderNotifSection('Avisos e menções', 'pink', mentions.length, mentionHtml);

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

  const stageAlertHtml = n.stageAlerts.map((g) => {
    const statusLabel = statusDef(g.status).label;
    const audienceLabel = STAGE_ALERT_AUDIENCE_LABELS[g.audience] || g.audience;
    const label = `📣 ${escapeHtml(statusLabel)} → avisar ${escapeHtml(audienceLabel)}`;
    const rows = g.items.map((d) => {
      const who = g.audienceNames ? g.audienceNames.join(', ') : (d.responsible || 'sem responsável definido');
      return notifRow('📣', d.title, `${escapeHtml(clientName(d.client_id))} · avisar ${escapeHtml(who)}`, d);
    }).join('');
    return renderNotifSection(label, 'purple', g.items.length, rows);
  }).join('');

  const sections = [
    mentionSection,
    renderNotifSection('Atrasadas', 'red', n.overdue.length, overdueHtml),
    renderNotifSection('Vencem hoje', 'orange', n.dueToday.length, todayHtml),
    renderNotifSection('Vencem amanhã', 'yellow', n.dueTomorrow.length, tomorrowHtml),
    renderNotifSection('Captação nos próximos dias', 'orange', n.captureSoon.length, captureHtml),
    renderNotifSection('Prazo do designer nos próximos dias', 'yellow', n.designerSoon.length, designerHtml),
    renderNotifSection('Aguardando aprovação do cliente', 'blue', n.waitingClient.length, waitingHtml),
    automationHtml,
    stageAlertHtml,
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
    row.onclick = () => {
      if (row.dataset.mentionId) api('/notifications/' + row.dataset.mentionId, { method: 'PUT', body: JSON.stringify({ read: true }) });
      const demand = state.demands.find((d) => d.id === row.dataset.open);
      if (demand) openDemandModal(demand);
    };
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
      ${isAdminUser() ? `<button class="tab-btn ${state.automacoesTab === 'acesso' ? 'active' : ''}" id="tab-acesso">Acesso</button>` : ''}
    </div>
    <div id="tab-content"></div>
  `;
  document.getElementById('tab-regras').onclick = () => { state.automacoesTab = 'regras'; renderAutomacoes(main); };
  document.getElementById('tab-equipe').onclick = () => { state.automacoesTab = 'equipe'; renderAutomacoes(main); };
  const tabAcesso = document.getElementById('tab-acesso');
  if (tabAcesso) tabAcesso.onclick = () => { state.automacoesTab = 'acesso'; renderAutomacoes(main); };

  if (state.automacoesTab === 'regras') renderAutomationRules(document.getElementById('tab-content'));
  else if (state.automacoesTab === 'acesso' && isAdminUser()) renderAccessTab(document.getElementById('tab-content'));
  else renderTeamTab(document.getElementById('tab-content'));
}

function isAdminUser() {
  return !!(state.currentUser && state.currentUser.role === 'admin');
}

function renderAccessTab(root) {
  root.innerHTML = `
    <div class="page-header" style="margin-bottom:14px">
      <p style="color:var(--text-dim);font-size:12px;max-width:560px">Quem tem login no WAS Hub, qual o papel de cada um (admin vê tudo, membro só o que for liberado) e quais clientes cada pessoa enxerga.</p>
      <button class="btn secondary small" id="btn-new-user">+ Novo usuário</button>
    </div>
    <div class="card-list" id="access-list"></div>
  `;
  document.getElementById('btn-new-user').onclick = () => openUserModal();
  const list = document.getElementById('access-list');
  if (!state.users.length) {
    list.innerHTML = '<div class="empty-state">Nenhum usuário carregado.</div>';
    return;
  }
  list.innerHTML = state.users.map((u) => {
    const visLabel = u.visibleClientIds === 'all' ? 'Todos os clientes' : `${(u.visibleClientIds || []).length} cliente(s) liberado(s)`;
    return `
    <div class="client-card">
      <div>
        <div class="name">${escapeHtml(u.name)} <span class="tag tag-${u.role === 'admin' ? 'purple' : 'gray'}">${u.role === 'admin' ? 'Admin' : 'Membro'}</span> <span class="tag tag-${u.active ? 'green' : 'red'}">${u.active ? 'Ativo' : 'Acesso revogado'}</span></div>
        <div class="meta">${escapeHtml(u.email || 'sem e-mail')} · ${escapeHtml(visLabel)}</div>
      </div>
      <div class="ct-actions">
        <button class="icon-btn" data-edit-user="${u.id}" title="Editar">✏️</button>
        ${u.active ? `<button class="icon-btn danger" data-revoke-user="${u.id}" title="Revogar acesso">🚫</button>` : ''}
      </div>
    </div>
  `;
  }).join('');
  list.querySelectorAll('[data-edit-user]').forEach((btn) => {
    btn.onclick = () => openUserModal(state.users.find((u) => u.id === btn.dataset.editUser));
  });
  list.querySelectorAll('[data-revoke-user]').forEach((btn) => {
    btn.onclick = async () => {
      const ok = await confirmDialog('Revogar o acesso desse usuário? Ele não vai mais conseguir entrar no WAS Hub.');
      if (!ok) return;
      try {
        await api('/users/' + btn.dataset.revokeUser, { method: 'DELETE' });
        await loadAll();
        renderAutomacoes(document.getElementById('main'));
        toast('Acesso revogado.', 'success');
      } catch (e) {
        toast(e.message || 'Não foi possível revogar o acesso.', 'error');
      }
    };
  });
}

function openUserModal(user) {
  const isEdit = !!user;
  const clientsHtml = state.clients.map((c) => {
    const checked = isEdit && Array.isArray(user.visibleClientIds) && user.visibleClientIds.includes(c.id);
    return `<label class="chip"><input type="checkbox" class="f-client-vis" value="${c.id}" ${checked ? 'checked' : ''}/>${escapeHtml(c.name)}</label>`;
  }).join('');
  const allSelected = !isEdit || user.visibleClientIds === 'all';
  showModal(`
    <h2>${isEdit ? 'Editar usuário' : 'Novo usuário'}</h2>
    <label>Nome</label>
    <input type="text" id="f-name" value="${isEdit ? escapeHtml(user.name) : ''}" style="width:100%" ${isEdit ? 'disabled' : ''} />
    <label style="margin-top:10px">E-mail</label>
    <input type="email" id="f-email" value="${isEdit ? escapeHtml(user.email || '') : ''}" style="width:100%" />
    <label style="margin-top:10px">${isEdit ? 'Redefinir senha (deixe em branco pra manter)' : 'Senha'}</label>
    <input type="password" id="f-password" style="width:100%" />
    <label style="margin-top:10px">Papel</label>
    <select id="f-role" style="width:100%">
      <option value="member" ${(!isEdit || user.role !== 'admin') ? 'selected' : ''}>Membro (vê só o que for liberado)</option>
      <option value="admin" ${(isEdit && user.role === 'admin') ? 'selected' : ''}>Admin (vê e controla tudo)</option>
    </select>
    <label style="display:flex;align-items:center;gap:8px;margin-top:14px">
      <input type="checkbox" id="f-all-clients" ${allSelected ? 'checked' : ''} style="width:auto" />
      Acesso a todos os clientes
    </label>
    <div id="f-client-picker" class="checkbox-grid" style="margin-top:8px;display:${allSelected ? 'none' : 'grid'}">${clientsHtml}</div>
    <div class="modal-footer">
      <button class="btn secondary" id="btn-cancel">Cancelar</button>
      <button class="btn" id="btn-save">Salvar</button>
    </div>
  `);
  document.getElementById('btn-cancel').onclick = closeModal;
  document.getElementById('f-all-clients').onchange = (e) => {
    document.getElementById('f-client-picker').style.display = e.target.checked ? 'none' : 'grid';
  };
  document.getElementById('btn-save').onclick = async () => {
    const email = document.getElementById('f-email').value.trim();
    const password = document.getElementById('f-password').value;
    const role = document.getElementById('f-role').value;
    const allClients = document.getElementById('f-all-clients').checked;
    const visibleClientIds = allClients ? 'all' : Array.from(document.querySelectorAll('.f-client-vis:checked')).map((i) => i.value);
    try {
      if (isEdit) {
        const payload = { email, role, visibleClientIds };
        if (password) payload.newPassword = password;
        await api('/users/' + user.id, { method: 'PUT', body: JSON.stringify(payload) });
      } else {
        const name = document.getElementById('f-name').value.trim();
        if (!name) { toast('Informe o nome.', 'warn'); return; }
        if (!password || password.length < 4) { toast('A senha precisa ter pelo menos 4 caracteres.', 'warn'); return; }
        await api('/users', { method: 'POST', body: JSON.stringify({ name, email, password, role, visibleClientIds }) });
      }
      closeModal();
      await loadAll();
      renderAutomacoes(document.getElementById('main'));
      toast(isEdit ? 'Usuário atualizado.' : 'Usuário criado.', 'success');
    } catch (e) {
      toast(e.message || 'Não foi possível salvar.', 'error');
    }
  };
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
    if (a.kind === 'weekly_summary') {
      return `
        <div class="client-card">
          <div>
            <div class="name">🗓️ <span class="tag tag-blue">Resumo semanal</span></div>
            <div class="meta">Toda segunda-feira, reúne na Central de Notificações tudo que vence na semana</div>
          </div>
          <div class="actions" style="display:flex;align-items:center;gap:10px">
            <label class="switch"><input type="checkbox" data-toggle="${a.id}" ${a.active ? 'checked' : ''} /><span class="switch-slider"></span></label>
            <button class="icon-btn danger" data-del="${a.id}" title="Excluir">🗑</button>
          </div>
        </div>
      `;
    }
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
    if (a.kind === 'stage_alert') {
      const statusLabel = statusDef(a.trigger.status).label;
      const audienceLabel = STAGE_ALERT_AUDIENCE_LABELS[a.action.audience] || a.action.audience;
      return `
        <div class="client-card">
          <div>
            <div class="name">📣 <span class="tag tag-purple">Alerta de fase</span></div>
            <div class="meta">Quando status vira <strong>${escapeHtml(statusLabel)}</strong>, avisar <strong>${escapeHtml(audienceLabel)}</strong></div>
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
      <option value="stage_alert">Alerta de fase (avisar equipe na mudança de status)</option>
      <option value="weekly_summary">Resumo semanal (toda segunda-feira)</option>
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
    <div id="auto-form-stage" class="hidden">
      <label style="margin-top:14px">Quando o status virar</label>
      <select id="auto-stage-status" style="width:100%">
        ${STAGE_ALERT_STATUS_OPTIONS.map((v) => `<option value="${v}">${escapeHtml(statusDef(v).label)}</option>`).join('')}
      </select>
      <label>Avisar</label>
      <select id="auto-stage-audience" style="width:100%">
        ${Object.entries(STAGE_ALERT_AUDIENCE_LABELS).map(([v, l]) => `<option value="${v}">${l}</option>`).join('')}
      </select>
      <p style="color:var(--text-dim);font-size:12px;margin-top:10px">O alerta aparece na Central de Notificações para todas as demandas que estiverem nesse status.</p>
    </div>
    <div id="auto-form-weekly" class="hidden">
      <p style="color:var(--text-dim);font-size:13px;margin-top:14px">Toda segunda-feira, a Central de Notificações mostra um resumo com tudo que vence naquela semana, agrupado por dia. Não requer configuração adicional.</p>
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
    const kind = e.target.value;
    document.getElementById('auto-form-field').classList.toggle('hidden', kind !== 'field');
    document.getElementById('auto-form-deadline').classList.toggle('hidden', kind !== 'deadline');
    document.getElementById('auto-form-stage').classList.toggle('hidden', kind !== 'stage_alert');
    document.getElementById('auto-form-weekly').classList.toggle('hidden', kind !== 'weekly_summary');
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
    } else if (kind === 'stage_alert') {
      payload = {
        kind: 'stage_alert',
        active: true,
        trigger: { status: document.getElementById('auto-stage-status').value },
        action: { audience: document.getElementById('auto-stage-audience').value },
      };
    } else if (kind === 'weekly_summary') {
      payload = { kind: 'weekly_summary', active: true, trigger: {}, action: {} };
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
  try {
    const me = await api('/auth/me');
    state.currentUser = me.user;
  } catch (e) {
    return; // api() já redireciona pra /login em caso de 401
  }
  renderUserBadge();
  await loadAll();
  render();
  startGlobalAutoRefresh();
})();
