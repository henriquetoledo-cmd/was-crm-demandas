# WAS Hub

Central de organização da WAS: clientes, demandas (pipeline de entregas) e estratégia — com portal de acompanhamento para o cliente.

## Como rodar

Requer apenas Node.js instalado (sem instalação de pacotes, sem internet).

```bash
cd was-hub
node server.js
```

Abra: `http://localhost:4000`

Os dados ficam salvos em `data/db.json` (arquivo local). Para resetar tudo, apague esse arquivo — ele é recriado com dados de exemplo.

## O que tem

- **Dashboard**: visão geral (clientes ativos, demandas no pipeline, atrasos, aguardando aprovação do cliente).
- **Clientes**: cadastro com status (ativo/pausado/prospect/encerrado), contato, e link único do portal.
- **Demandas**: kanban por status (Backlog → Em produção → Revisão interna → Aprovação cliente → Aprovado → Publicado), filtrável por cliente.
- **Estratégia**: documentos de planejamento por cliente, com opção de marcar como visível ao cliente.
- **Portal do cliente** (`/portal?slug=...`): página somente leitura, sem login, onde o cliente vê apenas as demandas e estratégias marcadas como "visível ao cliente". O link é gerado automaticamente ao criar o cliente (aparece na tela de Clientes, com botão "copiar").

## Limitações desta primeira versão (MVP)

- **Sem autenticação na área interna** — qualquer pessoa com o link acessa. Ok para uso local/rede interna; antes de expor publicamente na internet, adicionar login.
- **Portal do cliente usa link secreto** (slug aleatório), não senha. Suficiente para uso inicial; se quiser mais segurança, dá para adicionar senha por cliente depois.
- **Banco de dados é um arquivo JSON local** — funciona bem para uso individual/pequena equipe rodando na mesma máquina ou servidor. Para múltiplos usuários simultâneos editando ao vivo ou acesso de qualquer lugar, o próximo passo é hospedar (Vercel/Railway) com um banco de verdade (Postgres/SQLite) — a estrutura do código já está pronta para essa migração.
- Sem integração com o Notion (WAS já usa Notion para roteiros/cronogramas via outras skills) — se fizer sentido futuramente, dá para sincronizar.

## Próximos passos sugeridos

1. Testar por 1-2 semanas no dia a dia e ver o que falta.
2. Adicionar autenticação simples (senha única da equipe) antes de compartilhar com mais gente.
3. Se for usar com clientes de verdade, hospedar online (posso te ajudar a subir isso no Vercel/Railway com domínio próprio, tipo hub.wearesinergy.com.br).
4. Avaliar automações: nova demanda "Aprovado" → notificação no Slack/WhatsApp; prazo vencendo → alerta.
