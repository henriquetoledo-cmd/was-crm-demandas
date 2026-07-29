// ---------- Estado ----------
const state = {
  page: 'dashboard',
  clients: [],
  demands: [],
  strategies: [],
  demandClientFilter: '',
  stratClientFilter: '',
};

const STATUS_COLS = [
  { key: 'backlog', label: 'Backlog' },
  { key: 'em_producao', label: 'Em produção' },
  { key: 'revisao_interna', label: 'Revisão interna' },
  { key: 'aprovacao_cliente', label: 'Aprovação cliente' },
  { key: 'aprovado', label: 'Aprovado' },
  { key: 'publicado', label: 'Publicado' },
];

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
  const [clients, demands, strategies] = await Promise.all([
    api('/clients'),
    api('/demands'),
    api('/strategies'),
  ]);
  state.clients = clients;
  state.demands = demands;
  state.strategies = strategies;
}

function clientName(id) {
  const c = state.clients.find((c) => c.id === id);
  return c ? c.name : '—';
}

// ---------- Navegação ----------
document.querySelectorAll('.nav-item').forEach((el) => {
  el.addEventListener('click', () => {
    document.querySelectorAll('.nav-item').forEach((n) => n.classList.remove('active'));
    el.classList.add('active');
    state.page = el.dataset.page;
    render();
  });
});

function render() {
  const main = document.getElementById('main');
  if (state.page === 'dashboard') return renderDashboard(main);
  if (state.page === 'clientes') return renderClientes(main);
  if (state.page === 'demandas') return renderDemandas(main);
  if (state.page === 'estrategia') return renderEstrategia(main);
}

// ---------- Dashboard ----------
function renderDashboard(main) {
  const totalClients = state.clients.filter((c) => c.status === 'ativo').length;
  const totalDemands = state.demands.length;
  const overdue = state.demands.filter((d) => d.due_date && d.due_date < todayStr() && d.status !== 'publicado').length;
  const waitingClient = state.demands.filter((d) => d.status === 'aprovacao_cliente').length;

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
      ${recentDemands.length ? recentDemands.map((d) => `
        <div class="client-card">
          <div>
            <div class="name">${escapeHtml(d.title)}</div>
            <div class="meta">${escapeHtml(clientName(d.client_id))} · vence ${d.due_date || 'sem data'}</div>
          </div>
          <span class="badge ${d.status === 'publicado' ? 'ativo' : 'prospect'}">${STATUS_COLS.find((s) => s.key === d.status)?.label || d.status}</span>
        </div>
      `).join('') : '<div class="empty-state">Nenhuma demanda cadastrada ainda.</div>'}
    </div>
  `;
}

function todayStr() {
  return new Date().toISOString().slice(0, 10);
}

function escapeHtml(str) {
  return String(str ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

// ---------- Clientes ----------
function renderClientes(main) {
  main.innerHTML = `
    <div class="page-header">
      <div>
        <h1>Clientes</h1>
        <p>${state.clients.length} cadastrados</p>
      </div>
      <button class="btn" id="btn-new-client">+ Novo cliente</button>
    </div>
    <div class="card-list" id="client-list"></div>
  `;
  document.getElementById('btn-new-client').onclick = () => openClientModal();
  const list = document.getElementById('client-list');
  if (!state.clients.length) {
    list.innerHTML = '<div class="empty-state">Nenhum cliente cadastrado. Clique em "Novo cliente" para começar.</div>';
    return;
  }
  list.innerHTML = state.clients.map((c) => {
    const portalUrl = `${location.origin}/portal?slug=${c.portal_slug}`;
    return `
    <div class="client-card">
      <div>
        <div class="name">${escapeHtml(c.name)} <span class="badge ${c.status}">${c.status}</span></div>
        <div class="meta">${escapeHtml(c.segment || '—')} · ${escapeHtml(c.contact_name || '')} ${c.contact_email ? '· ' + escapeHtml(c.contact_email) : ''}</div>
        <div class="copy-link" style="margin-top:6px">Portal: <code>${portalUrl}</code> <a href="#" data-copy="${portalUrl}">copiar</a></div>
      </div>
      <div class="actions">
        <button class="btn secondary small" data-edit="${c.id}">Editar</button>
        <button class="btn danger small" data-del="${c.id}">Excluir</button>
      </div>
    </div>`;
  }).join('');

  list.querySelectorAll('[data-edit]').forEach((btn) => {
    btn.onclick = () => openClientModal(state.clients.find((c) => c.id === btn.dataset.edit));
  });
  list.querySelectorAll('[data-del]').forEach((btn) => {
    btn.onclick = async () => {
      if (!confirm('Excluir este cliente e todas as demandas/estratégias vinculadas?')) return;
      await api('/clients/' + btn.dataset.del, { method: 'DELETE' });
      await loadAll();
      render();
    };
  });
  list.querySelectorAll('[data-copy]').forEach((a) => {
    a.onclick = (e) => {
      e.preventDefault();
      navigator.clipboard.writeText(a.dataset.copy);
      a.textContent = 'copiado!';
      setTimeout(() => (a.textContent = 'copiar'), 1500);
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

// ---------- Demandas ----------
function renderDemandas(main) {
  main.innerHTML = `
    <div class="page-header">
      <div>
        <h1>Demandas</h1>
        <p>Pipeline de entregas por status</p>
      </div>
      <button class="btn" id="btn-new-demand">+ Nova demanda</button>
    </div>
    <div class="toolbar">
      <select id="filter-client">
        <option value="">Todos os clientes</option>
        ${state.clients.map((c) => `<option value="${c.id}" ${state.demandClientFilter === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
      </select>
    </div>
    <div class="kanban" id="kanban"></div>
  `;
  document.getElementById('btn-new-demand').onclick = () => openDemandModal();
  document.getElementById('filter-client').onchange = (e) => {
    state.demandClientFilter = e.target.value;
    renderDemandas(main);
  };

  const filtered = state.demandClientFilter
    ? state.demands.filter((d) => d.client_id === state.demandClientFilter)
    : state.demands;

  const kanban = document.getElementById('kanban');
  kanban.innerHTML = STATUS_COLS.map((col) => {
    const items = filtered.filter((d) => d.status === col.key);
    return `
      <div class="kanban-col">
        <h3>${col.label} <span class="count">${items.length}</span></h3>
        ${items.map((d) => `
          <div class="demand-card" data-id="${d.id}">
            <div class="title">${escapeHtml(d.title)}</div>
            <div class="sub">
              <span><span class="priority-dot priority-${d.priority}"></span>${escapeHtml(clientName(d.client_id))}</span>
              <span>${d.due_date || ''}</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }).join('');

  kanban.querySelectorAll('.demand-card').forEach((el) => {
    el.onclick = () => openDemandModal(state.demands.find((d) => d.id === el.dataset.id));
  });
}

function openDemandModal(demand) {
  const isEdit = !!demand;
  demand = demand || {
    client_id: state.demandClientFilter || (state.clients[0] ? state.clients[0].id : ''),
    title: '', description: '', type: 'post', status: 'backlog',
    due_date: '', responsible: '', priority: 'media', visible_to_client: false, link: '',
  };
  if (!state.clients.length) return alert('Cadastre um cliente antes de criar demandas.');
  showModal(`
    <h2>${isEdit ? 'Editar demanda' : 'Nova demanda'}</h2>
    <label>Cliente</label>
    <select id="f-client" style="width:100%">
      ${state.clients.map((c) => `<option value="${c.id}" ${demand.client_id === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
    </select>
    <label>Título</label>
    <input type="text" id="f-title" value="${escapeHtml(demand.title)}" style="width:100%" />
    <label>Descrição</label>
    <textarea id="f-desc" style="min-height:70px">${escapeHtml(demand.description)}</textarea>
    <label>Tipo</label>
    <select id="f-type" style="width:100%">
      ${['reel', 'carrossel', 'story', 'post', 'estrategia', 'design', 'outro'].map((t) => `<option value="${t}" ${demand.type === t ? 'selected' : ''}>${t}</option>`).join('')}
    </select>
    <label>Status</label>
    <select id="f-status" style="width:100%">
      ${STATUS_COLS.map((s) => `<option value="${s.key}" ${demand.status === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}
    </select>
    <label>Prazo</label>
    <input type="date" id="f-due" value="${demand.due_date || ''}" style="width:100%" />
    <label>Responsável</label>
    <input type="text" id="f-resp" value="${escapeHtml(demand.responsible)}" style="width:100%" />
    <label>Prioridade</label>
    <select id="f-priority" style="width:100%">
      ${['alta', 'media', 'baixa'].map((p) => `<option value="${p}" ${demand.priority === p ? 'selected' : ''}>${p}</option>`).join('')}
    </select>
    <label>Link (arquivo, drive, etc.)</label>
    <input type="text" id="f-link" value="${escapeHtml(demand.link)}" style="width:100%" />
    <label style="display:flex;align-items:center;gap:8px;margin-top:14px">
      <input type="checkbox" id="f-visible" ${demand.visible_to_client ? 'checked' : ''} style="width:auto" />
      Visível no portal do cliente
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
      if (!confirm('Excluir esta demanda?')) return;
      await api('/demands/' + demand.id, { method: 'DELETE' });
      closeModal();
      await loadAll();
      render();
    };
  }
  document.getElementById('btn-save').onclick = async () => {
    const payload = {
      client_id: document.getElementById('f-client').value,
      title: document.getElementById('f-title').value.trim(),
      description: document.getElementById('f-desc').value.trim(),
      type: document.getElementById('f-type').value,
      status: document.getElementById('f-status').value,
      due_date: document.getElementById('f-due').value,
      responsible: document.getElementById('f-resp').value.trim(),
      priority: document.getElementById('f-priority').value,
      link: document.getElementById('f-link').value.trim(),
      visible_to_client: document.getElementById('f-visible').checked,
    };
    if (!payload.title) return alert('Informe o título da demanda.');
    if (isEdit) await api('/demands/' + demand.id, { method: 'PUT', body: JSON.stringify(payload) });
    else await api('/demands', { method: 'POST', body: JSON.stringify(payload) });
    closeModal();
    await loadAll();
    render();
  };
}

// ---------- Estratégia ----------
function renderEstrategia(main) {
  main.innerHTML = `
    <div class="page-header">
      <div>
        <h1>Estratégia</h1>
        <p>Planejamento e diretrizes por cliente</p>
      </div>
      <button class="btn" id="btn-new-strat">+ Novo documento</button>
    </div>
    <div class="toolbar">
      <select id="filter-client">
        <option value="">Todos os clientes</option>
        ${state.clients.map((c) => `<option value="${c.id}" ${state.stratClientFilter === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
      </select>
    </div>
    <div id="strat-list"></div>
  `;
  document.getElementById('btn-new-strat').onclick = () => openStrategyModal();
  document.getElementById('filter-client').onchange = (e) => {
    state.stratClientFilter = e.target.value;
    renderEstrategia(main);
  };

  const filtered = state.stratClientFilter
    ? state.strategies.filter((s) => s.client_id === state.stratClientFilter)
    : state.strategies;

  const list = document.getElementById('strat-list');
  if (!filtered.length) {
    list.innerHTML = '<div class="empty-state">Nenhum documento de estratégia ainda.</div>';
    return;
  }
  list.innerHTML = filtered.map((s) => `
    <div class="strategy-doc">
      <h3>${escapeHtml(s.title)} ${s.visible_to_client ? '<span class="badge ativo">visível ao cliente</span>' : ''}</h3>
      <div class="meta">${escapeHtml(clientName(s.client_id))} ${s.period ? '· ' + escapeHtml(s.period) : ''} · atualizado em ${new Date(s.updated_at).toLocaleDateString('pt-BR')}</div>
      <div class="content">${escapeHtml(s.content)}</div>
      <div class="modal-footer" style="margin-top:14px">
        <button class="btn secondary small" data-edit="${s.id}">Editar</button>
        <button class="btn danger small" data-del="${s.id}">Excluir</button>
      </div>
    </div>
  `).join('');

  list.querySelectorAll('[data-edit]').forEach((btn) => {
    btn.onclick = () => openStrategyModal(state.strategies.find((s) => s.id === btn.dataset.edit));
  });
  list.querySelectorAll('[data-del]').forEach((btn) => {
    btn.onclick = async () => {
      if (!confirm('Excluir este documento de estratégia?')) return;
      await api('/strategies/' + btn.dataset.del, { method: 'DELETE' });
      await loadAll();
      render();
    };
  });
}

function openStrategyModal(strat) {
  const isEdit = !!strat;
  strat = strat || { client_id: state.stratClientFilter || (state.clients[0] ? state.clients[0].id : ''), title: '', period: '', content: '', visible_to_client: false };
  if (!state.clients.length) return alert('Cadastre um cliente antes de criar estratégias.');
  showModal(`
    <h2>${isEdit ? 'Editar estratégia' : 'Novo documento de estratégia'}</h2>
    <label>Cliente</label>
    <select id="f-client" style="width:100%">
      ${state.clients.map((c) => `<option value="${c.id}" ${strat.client_id === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
    </select>
    <label>Título</label>
    <input type="text" id="f-title" value="${escapeHtml(strat.title)}" style="width:100%" />
    <label>Período (ex: 2026-08)</label>
    <input type="text" id="f-period" value="${escapeHtml(strat.period)}" style="width:100%" />
    <label>Conteúdo</label>
    <textarea id="f-content" style="min-height:180px">${escapeHtml(strat.content)}</textarea>
    <label style="display:flex;align-items:center;gap:8px;margin-top:14px">
      <input type="checkbox" id="f-visible" ${strat.visible_to_client ? 'checked' : ''} style="width:auto" />
      Visível no portal do cliente
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
      if (!confirm('Excluir este documento?')) return;
      await api('/strategies/' + strat.id, { method: 'DELETE' });
      closeModal();
      await loadAll();
      render();
    };
  }
  document.getElementById('btn-save').onclick = async () => {
    const payload = {
      client_id: document.getElementById('f-client').value,
      title: document.getElementById('f-title').value.trim(),
      period: document.getElementById('f-period').value.trim(),
      content: document.getElementById('f-content').value,
      visible_to_client: document.getElementById('f-visible').checked,
    };
    if (!payload.title) return alert('Informe o título.');
    if (isEdit) await api('/strategies/' + strat.id, { method: 'PUT', body: JSON.stringify(payload) });
    else await api('/strategies', { method: 'POST', body: JSON.stringify(payload) });
    closeModal();
    await loadAll();
    render();
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
}

// ---------- Init ----------
(async function init() {
  await loadAll();
  render();
})();
