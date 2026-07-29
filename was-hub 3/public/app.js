// ---------- Configuração (espelha a base ENTREGAS DESIGN - WAS do Notion) ----------
const STATUS_DEFS = [
  { key: 'em_briefing', label: 'Em briefing', color: 'yellow', group: 'todo' },
  { key: 'aguardando_infos', label: 'Aguardando infos/materiais', color: 'gray', group: 'in_progress' },
  { key: 'aguardando_captacao', label: 'Aguardando captação', color: 'red', group: 'in_progress' },
  { key: 'a_fazer_design', label: 'A fazer - Design', color: 'brown', group: 'in_progress' },
  { key: 'em_criacao_design', label: 'Em criação (design)', color: 'yellow', group: 'in_progress' },
  { key: 'em_ajuste_design', label: 'Em ajuste (design)', color: 'orange', group: 'in_progress' },
  { key: 'pronto_envio_design', label: 'Pronto para envio (design)', color: 'pink', group: 'in_progress' },
  { key: 'em_aprovacao_cliente', label: 'Em aprovação (cliente)', color: 'green', group: 'in_progress' },
  { key: 'freela', label: 'Freela', color: 'gray', group: 'in_progress' },
  { key: 'aprovado', label: 'Aprovado', color: 'green', group: 'complete' },
  { key: 'postar', label: 'Postar', color: 'blue', group: 'complete' },
  { key: 'programado', label: 'Programado', color: 'purple', group: 'complete' },
  { key: 'postado', label: 'Postado', color: 'purple', group: 'complete' },
  { key: 'stand_by', label: 'Stand By', color: 'gray', group: 'complete' },
  { key: 'nao_utilizado', label: 'Não utilizado', color: 'default', group: 'complete' },
];

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

function statusDef(key) { return STATUS_DEFS.find((s) => s.key === key) || STATUS_DEFS[0]; }
function priorityDef(key) { return PRIORIDADE_OPTIONS.find((p) => p.key === key) || PRIORIDADE_OPTIONS[0]; }

// ---------- Estado ----------
const state = {
  page: 'dashboard',
  clients: [],
  demands: [],
  strategies: [],
  demandClientFilter: '',
  stratClientFilter: '',
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
  const [clients, demands, strategies] = await Promise.all([
    api('/clients'),
    api('/demands'),
    api('/strategies'),
  ]);
  state.clients = clients;
  state.demands = demands;
  state.strategies = strategies;
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
  const doneStatuses = ['aprovado', 'postar', 'programado', 'postado', 'stand_by', 'nao_utilizado'];
  const overdue = state.demands.filter((d) => d.prazo_final && d.prazo_final < todayStr() && !doneStatuses.includes(d.status)).length;
  const waitingClient = state.demands.filter((d) => d.status === 'em_aprovacao_cliente').length;

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
            <div class="meta"><span class="tag tag-${clientColor(d.client_id)}">${escapeHtml(clientName(d.client_id))}</span> · vence ${d.prazo_final || 'sem data'}</div>
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
        <div class="name">
          <span class="tag tag-${c.color || 'default'}">${escapeHtml(c.name)}</span>
          <span class="badge ${c.status}">${c.status}</span>
        </div>
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

// ---------- Demandas (Kanban por status, espelha a view "Por status" do Notion) ----------
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
  kanban.innerHTML = STATUS_DEFS.map((col) => {
    const items = filtered.filter((d) => d.status === col.key);
    return `
      <div class="kanban-col">
        <div class="col-head">
          <span class="col-dot tag-${col.color}" style="background:currentColor"></span>
          <h3>${col.label}</h3>
          <span class="count">${items.length}</span>
        </div>
        <div class="col-body">
          ${items.map((d) => {
            const tags = [
              ...(d.format || []).map((f) => `<span class="tag tag-${(FORMATO_OPTIONS.find((o) => o.name === f) || {}).color || 'gray'}">${escapeHtml(f)}</span>`),
              ...(d.platform || []).map((p) => `<span class="tag tag-${(PLATAFORMA_OPTIONS.find((o) => o.name === p) || {}).color || 'gray'}">${escapeHtml(p)}</span>`),
            ].join('');
            return `
            <div class="demand-card" data-id="${d.id}">
              <div class="title">${escapeHtml(d.title)}</div>
              ${tags ? `<div class="tag-group">${tags}</div>` : ''}
              <div class="sub">
                <span><span class="priority-dot ${d.priority}"></span>${escapeHtml(clientName(d.client_id))}</span>
                <span>${d.prazo_final || d.prazo_designer || ''}</span>
              </div>
            </div>
          `;
          }).join('')}
        </div>
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
    title: '', description: '', format: [], platform: [], status: 'em_briefing',
    prazo_designer: '', prazo_final: '', responsible: '', priority: 'normal',
    forecast: 'prevista', refacao: '', visible_to_client: false, link: '',
  };
  if (!state.clients.length) return alert('Cadastre um cliente antes de criar demandas.');
  showModal(`
    <h2>${isEdit ? 'Editar demanda' : 'Nova demanda'}</h2>
    <label>Projeto / Cliente</label>
    <select id="f-client" style="width:100%">
      ${state.clients.map((c) => `<option value="${c.id}" ${demand.client_id === c.id ? 'selected' : ''}>${escapeHtml(c.name)}</option>`).join('')}
    </select>
    <label>Demanda</label>
    <input type="text" id="f-title" value="${escapeHtml(demand.title)}" style="width:100%" />
    <label>Descrição</label>
    <textarea id="f-desc" style="min-height:60px">${escapeHtml(demand.description)}</textarea>

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

    <label>Status</label>
    <select id="f-status" style="width:100%">
      ${STATUS_DEFS.map((s) => `<option value="${s.key}" ${demand.status === s.key ? 'selected' : ''}>${s.label}</option>`).join('')}
    </select>

    <div class="two-col">
      <div>
        <label>Prazo designer</label>
        <input type="date" id="f-prazo-designer" value="${demand.prazo_designer || ''}" />
      </div>
      <div>
        <label>Prazo final</label>
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
        <input type="text" id="f-resp" value="${escapeHtml(demand.responsible)}" />
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
    const format = Array.from(document.querySelectorAll('#f-format input:checked')).map((i) => i.value);
    const platform = Array.from(document.querySelectorAll('#f-platform input:checked')).map((i) => i.value);
    const payload = {
      client_id: document.getElementById('f-client').value,
      title: document.getElementById('f-title').value.trim(),
      description: document.getElementById('f-desc').value.trim(),
      format,
      platform,
      status: document.getElementById('f-status').value,
      prazo_designer: document.getElementById('f-prazo-designer').value,
      prazo_final: document.getElementById('f-prazo-final').value,
      responsible: document.getElementById('f-resp').value.trim(),
      priority: document.getElementById('f-priority').value,
      forecast: document.getElementById('f-forecast').value,
      refacao: document.getElementById('f-refacao').value,
      link: document.getElementById('f-link').value.trim(),
      visible_to_client: document.getElementById('f-visible').checked,
    };
    if (!payload.title) return alert('Informe o nome da demanda.');
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
