// ---------- Configuração (fluxo WAS + espelha a base ENTREGAS DESIGN - WAS do Notion) ----------
const STAGES = [
  { key: 1, label: '1 · Briefing (Social Media)' },
  { key: 2, label: '2 · Aprovação do cliente' },
  { key: 3, label: '3 · Captação e execução (equipe)' },
  { key: 4, label: '4 · Aprovação do cliente' },
  { key: 5, label: '5 · Programar posts' },
  { key: 0, label: 'Outros' },
];

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

const SLASH_ITEMS = [
  { key: 'h2', label: 'Título 2', icon: 'H2', hint: 'título médio' },
  { key: 'h3', label: 'Título 3', icon: 'H3', hint: 'título pequeno' },
  { key: 'ul', label: 'Lista com marcadores', icon: '•', hint: 'lista simples' },
  { key: 'ol', label: 'Lista numerada', icon: '1.', hint: 'lista ordenada' },
  { key: 'quote', label: 'Citação', icon: '❝', hint: 'bloco de citação' },
  { key: 'divider', label: 'Divisor', icon: '—', hint: 'linha separadora' },
  { key: 'subpage', label: 'Nova subpágina', icon: '📄', hint: 'cria página dentro desta' },
];

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

// ---------- Estado ----------
const state = {
  page: 'dashboard',
  clients: [],
  demands: [],
  pages: [],
  filters: { client: new Set(), format: new Set(), platform: new Set(), priority: new Set(), responsible: new Set() },
  filtersPanelOpen: false,
  currentClientId: null,
  currentPageId: null,
  expandedFolders: new Set(),
  collapsedStages: new Set([0]), // "Outros" começa recolhido
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
  const [clients, demands] = await Promise.all([
    api('/clients'),
    api('/demands'),
  ]);
  state.clients = clients;
  state.demands = demands;
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
  if (state.page === 'dashboard') return renderDashboard(main);
  if (state.page === 'clientes') return renderClientes(main);
  if (state.page === 'cliente-detail') return renderClienteDetail(main);
  if (state.page === 'demandas') return renderDemandas(main);
}

// ---------- Context menu (clique direito) ----------
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
        <div class="client-card">
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
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
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
      if (!confirm('Excluir este cliente e todas as demandas/páginas vinculadas?')) return;
      await api('/clients/' + btn.dataset.del, { method: 'DELETE' });
      await loadAll();
      render();
    };
  });
  grid.querySelectorAll('[data-copy]').forEach((btn) => {
    btn.onclick = (e) => {
      e.stopPropagation();
      navigator.clipboard.writeText(btn.dataset.copy);
      const original = btn.textContent;
      btn.textContent = '✅';
      setTimeout(() => (btn.textContent = original), 1200);
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
    if (!payload.name) return alert('Informe o nome do cliente.');
    if (isEdit) await api('/clients/' + client.id, { method: 'PUT', body: JSON.stringify(payload) });
    else await api('/clients', { method: 'POST', body: JSON.stringify(payload) });
    closeModal();
    await loadAll();
    render();
  };
}

// ---------- Workspace do cliente (páginas dentro de páginas, estilo Notion) ----------
function buildPageTree(pages, parentId) {
  return pages
    .filter((p) => p.parent_id === parentId)
    .sort((a, b) => (a.order || 0) - (b.order || 0))
    .map((p) => ({ ...p, children: buildPageTree(pages, p.id) }));
}

function flattenPages(nodes, depth, out) {
  nodes.forEach((n) => {
    out.push({ id: n.id, title: n.title, depth });
    if (n.children && n.children.length) flattenPages(n.children, depth + 1, out);
  });
  return out;
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
      state.expandedFolders.add(id);
      renderClienteDetail(main);
    };
  });

  renderPageEditor(currentPage);
}

async function quickCreatePage(parentId) {
  const title = prompt(parentId ? 'Nome da nova subpágina:' : 'Nome da nova página:');
  if (!title || !title.trim()) return;
  const page = await api('/pages', {
    method: 'POST',
    body: JSON.stringify({ client_id: state.currentClientId, parent_id: parentId, type: 'page', title: title.trim() }),
  });
  state.pages = await api('/pages?client_id=' + state.currentClientId);
  if (parentId) state.expandedFolders.add(parentId);
  state.currentPageId = page.id;
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
      state.expandedFolders.add(page.id);
      renderClienteDetail(document.getElementById('main'));
    }
  });

  document.getElementById('page-title-input').addEventListener('input', debounce((e) => {
    savePageTitle(page, e.target.value, flashSaved);
  }, 500));
  document.getElementById('btn-del-page').onclick = () => deletePage(page);
  document.getElementById('btn-add-subpage').onclick = () => quickCreatePage(page.id);
  editor.querySelectorAll('.page-child-chip[data-open]').forEach((chip) => {
    chip.onclick = () => {
      state.currentPageId = chip.dataset.open;
      state.expandedFolders.add(page.id);
      renderClienteDetail(document.getElementById('main'));
    };
  });
}

// Menu "/" estilo Notion, disparado dentro do editor de páginas.
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
        const title = prompt('Nome da nova subpágina:');
        if (title && title.trim()) {
          const newPage = await api('/pages', {
            method: 'POST',
            body: JSON.stringify({ client_id: state.currentClientId, parent_id: page.id, type: 'page', title: title.trim() }),
          });
          state.pages = await api('/pages?client_id=' + state.currentClientId);
          document.execCommand('insertHTML', false, `<span class="page-chip" contenteditable="false" data-page-id="${newPage.id}">📄 ${escapeHtml(title.trim())}</span>&nbsp;`);
          state.expandedFolders.add(page.id);
        }
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

// Página "Calendário de Entrega": gerada ao vivo a partir das demandas do cliente.
// Não é editável — sempre reflete prazo designer / prazo final / postagem em tempo real.
function renderCalendarPage(editor, page) {
  const demands = state.demands
    .filter((d) => d.client_id === state.currentClientId && d.status !== 'arquivado')
    .slice()
    .sort((a, b) => (a.prazo_final || a.prazo_designer || '9999').localeCompare(b.prazo_final || b.prazo_designer || '9999'));

  editor.innerHTML = `
    <div class="editor-toolbar">
      <h2 style="margin:0;font-size:17px;font-weight:700">📅 ${escapeHtml(page.title)}</h2>
      <span class="synced-badge">sincronizado com Demandas</span>
    </div>
    ${demands.length ? `
      <table class="calendar-table">
        <thead>
          <tr>
            <th>Demanda</th>
            <th>Status</th>
            <th>Formato</th>
            <th>Prazo designer</th>
            <th>Postagem / Entrega</th>
            <th>Captação</th>
          </tr>
        </thead>
        <tbody>
          ${demands.map((d) => {
            const sd = statusDef(d.status);
            const overdue = d.prazo_final && d.prazo_final < todayStr() && !DONE_STATUSES.includes(d.status);
            let captureCell = '—';
            if (d.needs_capture === false) captureCell = '<span class="tag tag-gray">sem captação</span>';
            else if (d.capture_date) captureCell = `🎬 ${formatDateBR(d.capture_date)}`;
            else captureCell = '<span class="tag tag-default">a definir</span>';
            return `
              <tr>
                <td>${escapeHtml(d.title)}</td>
                <td><span class="tag tag-${sd.color}">${sd.label}</span></td>
                <td>${(d.format || []).map((f) => escapeHtml(f)).join(', ') || '—'}</td>
                <td>${formatDateBR(d.prazo_designer) || '—'}</td>
                <td class="${overdue ? 'overdue-cell' : ''}">${formatDateBR(d.prazo_final) || '—'}</td>
                <td>${captureCell}</td>
              </tr>
            `;
          }).join('')}
        </tbody>
      </table>
    ` : '<div class="empty-state">Nenhuma demanda cadastrada para este cliente ainda. Crie demandas na aba Demandas — elas aparecem aqui automaticamente.</div>'}
  `;
}

async function savePageTitle(page, title, flashSaved) {
  if (!title.trim() || title === page.title) return;
  await api('/pages/' + page.id, { method: 'PUT', body: JSON.stringify({ title: title.trim() }) });
  page.title = title.trim();
  const idx = state.pages.findIndex((p) => p.id === page.id);
  if (idx > -1) state.pages[idx].title = title.trim();
  if (flashSaved) flashSaved();
}

async function deletePage(page) {
  if (!confirm(`Excluir "${page.title}"${state.pages.some((p) => p.parent_id === page.id) ? ' e todas as subpáginas' : ''}?`)) return;
  await api('/pages/' + page.id, { method: 'DELETE' });
  state.pages = await api('/pages?client_id=' + state.currentClientId);
  state.currentPageId = null;
  render();
}

// ---------- Demandas (Kanban vivo — fluxo WAS) ----------
function filtersActiveCount() {
  return Object.values(state.filters).reduce((n, s) => n + s.size, 0);
}

function applyFilters(list) {
  const f = state.filters;
  return list.filter((d) => {
    if (f.client.size && !f.client.has(d.client_id)) return false;
    if (f.priority.size && !f.priority.has(d.priority)) return false;
    if (f.responsible.size && !f.responsible.has(d.responsible)) return false;
    if (f.format.size && !(d.format || []).some((v) => f.format.has(v))) return false;
    if (f.platform.size && !(d.platform || []).some((v) => f.platform.has(v))) return false;
    return true;
  });
}

function renderFiltersPanel() {
  const panel = document.getElementById('filters-panel');
  if (!panel) return;
  if (!state.filtersPanelOpen) { panel.innerHTML = ''; panel.style.display = 'none'; return; }
  panel.style.display = 'block';

  const responsibles = Array.from(new Set(state.demands.map((d) => d.responsible).filter(Boolean))).sort();

  function group(title, key, options) {
    return `
      <div class="filter-group">
        <div class="filter-group-title">${title}</div>
        <div class="filter-options">
          ${options.map((o) => `
            <label class="filter-opt">
              <input type="checkbox" data-key="${key}" value="${escapeHtml(o.value)}" ${state.filters[key].has(o.value) ? 'checked' : ''} />
              ${o.label}
            </label>
          `).join('')}
        </div>
      </div>
    `;
  }

  panel.innerHTML = `
    <div class="filters-dropdown">
      ${group('Cliente', 'client', state.clients.map((c) => ({ value: c.id, label: escapeHtml(c.name) })))}
      ${group('Formato', 'format', FORMATO_OPTIONS.map((o) => ({ value: o.name, label: escapeHtml(o.name) })))}
      ${group('Plataforma', 'platform', PLATAFORMA_OPTIONS.map((o) => ({ value: o.name, label: escapeHtml(o.name) })))}
      ${group('Prioridade', 'priority', PRIORIDADE_OPTIONS.map((o) => ({ value: o.key, label: o.label })))}
      ${responsibles.length ? group('Responsável', 'responsible', responsibles.map((r) => ({ value: r, label: escapeHtml(r) }))) : ''}
      <div class="filters-footer">
        <a href="#" id="filters-clear">Limpar tudo</a>
      </div>
    </div>
  `;

  panel.querySelectorAll('input[type=checkbox]').forEach((cb) => {
    cb.onchange = () => {
      const key = cb.dataset.key;
      if (cb.checked) state.filters[key].add(cb.value);
      else state.filters[key].delete(cb.value);
      renderDemandas(document.getElementById('main'));
    };
  });
  const clearLink = document.getElementById('filters-clear');
  if (clearLink) clearLink.onclick = (e) => {
    e.preventDefault();
    Object.keys(state.filters).forEach((k) => state.filters[k].clear());
    renderDemandas(document.getElementById('main'));
  };
}

function renderDemandas(main) {
  main.innerHTML = `
    <div class="page-header">
      <div>
        <h1>Demandas</h1>
        <p>Pipeline de entregas por status — ${state.demands.length} no total</p>
      </div>
      <button class="btn" id="btn-new-demand">+ Nova demanda</button>
    </div>
    <div class="toolbar">
      <div class="filters-wrap">
        <button class="btn secondary small" id="btn-toggle-filters">🔎 Filtros ${filtersActiveCount() ? `<span class="filter-count">${filtersActiveCount()}</span>` : ''}</button>
        <div id="filters-panel" class="filters-panel"></div>
      </div>
    </div>
    <div class="kanban" id="kanban"></div>
  `;
  document.getElementById('btn-new-demand').onclick = () => openDemandModal();
  document.getElementById('btn-toggle-filters').onclick = (e) => {
    e.stopPropagation();
    state.filtersPanelOpen = !state.filtersPanelOpen;
    renderFiltersPanel();
    if (state.filtersPanelOpen) {
      setTimeout(() => document.addEventListener('click', (ev) => {
        if (!ev.target.closest('.filters-wrap')) { state.filtersPanelOpen = false; renderFiltersPanel(); }
      }, { once: true }), 0);
    }
  };
  renderFiltersPanel();

  const filtered = applyFilters(state.demands);

  const kanban = document.getElementById('kanban');
  kanban.innerHTML = STAGES.map((stage) => {
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
      renderDemandas(main);
    };
  });

  kanban.querySelectorAll('.demand-card').forEach((el) => {
    const demand = state.demands.find((d) => d.id === el.dataset.id);
    el.onclick = () => openDemandModal(demand);
    el.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      showContextMenu(e.pageX, e.pageY, [
        { label: 'Abrir', icon: '✏️', onClick: () => openDemandModal(demand) },
        {
          label: 'Excluir demanda', icon: '🗑', danger: true, onClick: async () => {
            if (!confirm(`Excluir "${demand.title}"?`)) return;
            await api('/demands/' + demand.id, { method: 'DELETE' });
            await loadAll();
            render();
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
      renderDemandas(main);
      await api('/demands/' + demandId, { method: 'PUT', body: JSON.stringify({ status: newStatus }) });
    });
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

// Modal de demanda: criação rápida (mínima) -> depois autosave campo a campo, sem botão "Salvar".
function openDemandModal(demand) {
  if (!demand) return openQuickCreateDemand();

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
        <input type="text" id="f-resp" value="${escapeHtml(demand.responsible)}" placeholder="ex: Ana (social), Bruno (design)" />
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
  document.getElementById('f-resp').addEventListener('input', (e) => patchDebounced({ responsible: e.target.value.trim() }));
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
    if (!confirm('Excluir esta demanda?')) return;
    await api('/demands/' + demand.id, { method: 'DELETE' });
    closeModal();
    await loadAll();
    render();
  };
}

function openQuickCreateDemand() {
  if (!state.clients.length) return alert('Cadastre um cliente antes de criar demandas.');
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
    if (!title) return alert('Informe o nome da demanda.');
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
