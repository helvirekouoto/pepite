# Pépite — Agent CMO autonome (VPS)

Pépite est un agent CMO autonome exécuté directement par Claude sur ce VPS (pas de Vercel, pas de Next.js, pas de Claude Agent SDK). `CLAUDE.md` est son prompt système.

Objectifs initiaux : 100+ visiteurs en 2 mois, 5 leads qualifiés, amélioration continue du SEO, des conversions et des canaux d'acquisition, publication automatique de contenu.

## État de cette version (MVP)

Construit :
- `CLAUDE.md` — identité et instructions système de Pépite.
- `.claude/skills/` — 34 compétences réparties sur les 9 sous-agents (3 à 4 chacun, voir le détail dans chaque fichier `agents/*.md` → « Compétences associées »).
- `agents/` — les 9 rôles de sous-agents (documents de rôle, pas des processus séparés), dont `design-agent.md` (création de site à partir d'une idée de business).
- `site-template/` — gabarit de site statique (HTML/CSS sans dépendance) servant de base à toute création de site.
- `settings/` — `agent.config.json`, `goals.json`, `integrations.json`, `approval-policy.json`, `content-calendar.json`, `growth-backlog.json`.
- `commands/` — `daily-cmo-review.md` (revue marketing quotidienne), `create-website-from-idea.md` (site complet à partir d'une idée de business, puis boucle de croissance autonome).
- `scripts/` — `supabase_query.js`, `supabase_upsert.js`, `github_create_branch.js`, `github_commit_changes.js`, `github_open_pr_or_push.js` (publication via `git`/SSH local, sans token GitHub), `fetch_ga4_report.js`, et le socle partagé `scripts/lib/cli.js`.
- `.mcp.json` — déclaration des MCP Supabase et GitHub (à activer si ces serveurs sont installés sur le VPS ; sinon les scripts `scripts/*.js` servent de repli).

Pas encore construits (à ajouter progressivement, voir section 13 de la spécification d'origine) :
- Scripts : `fetch_gsc_report.js`, `fetch_crm_leads.js`, `dataforseo_keyword_research.js`, `semrush_domain_report.js`, `web_trend_search.js`, `publish_content.js`.
- Commandes : `weekly-growth-plan.md`, `run-seo-audit.md`, `publish-marketing-content.md`, `launch-growth-experiment.md`.

Repo GitHub cible configuré : `helvirekouoto/pepite`, remote `origin` en SSH (voir `settings/integrations.json`).

Un projet Supabase dédié à Pépite a été créé (organisation `helvire`, région `eu-west-1`) :
- Project ref : `vbazcwxpqqnygairexcf`
- URL API : `https://vbazcwxpqqnygairexcf.supabase.co`
- Les 7 tables (`marketing_metrics`, `seo_opportunities`, `content_assets`, `landing_pages`, `growth_experiments`, `agent_logs`, `leads`) sont créées, avec RLS activée et aucune policy (accès réservé à la clé `service_role`, utilisée uniquement côté scripts serveur).
- À faire sur le VPS : définir `SUPABASE_URL=https://vbazcwxpqqnygairexcf.supabase.co` et `SUPABASE_SERVICE_ROLE_KEY=...` (la clé service_role se récupère dans le dashboard Supabase → Project Settings → API ; ne jamais la coller dans une conversation Claude).
- Ce projet est distinct du projet `Glitchback` (`tpdnvrgxsurhesdmwdqr`), qui est une autre application et n'est pas utilisé par Pépite.

## Installation

```bash
cd pepite
npm install
```

Vérifier la syntaxe de tous les scripts :

```bash
npm run check
```

## Variables d'environnement (VPS uniquement, jamais dans le chat)

Configurer sur le VPS (ex. fichier `.env` non commité, ou variables systemd/shell) uniquement celles nécessaires aux outils que vous activez :

```
SUPABASE_URL=
SUPABASE_SERVICE_ROLE_KEY=

GOOGLE_APPLICATION_CREDENTIALS=
GA4_PROPERTY_ID=
GSC_SITE_URL=

GITHUB_TOKEN=
GITHUB_OWNER=
GITHUB_REPO=

CRM_API_KEY=
CRM_BASE_URL=

SEMRUSH_API_KEY=

DATAFORSEO_LOGIN=
DATAFORSEO_PASSWORD=

CMS_API_KEY=
CMS_BASE_URL=
SITE_ADMIN_TOKEN=
```

Pour la version MVP actuelle, seules ces variables sont réellement utilisées : `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`, `GOOGLE_APPLICATION_CREDENTIALS`, `GA4_PROPERTY_ID`, `GITHUB_TOKEN`, `GITHUB_OWNER`, `GITHUB_REPO`.

## Convention d'appel des scripts

Chaque script lit un objet JSON en argument unique et écrit un JSON sur stdout (erreurs sur stderr, exit code 1) :

```bash
node scripts/supabase_query.js '{"table":"agent_logs","limit":5}'
node scripts/supabase_upsert.js '{"table":"agent_logs","data":{"agent":"orchestrator-cmo","action":"daily_review","status":"done"}}'
node scripts/fetch_ga4_report.js '{"startDate":"7daysAgo","endDate":"today","metrics":["sessions","totalUsers"]}'
node scripts/github_create_branch.js '{"newBranch":"pepite/seo-article-1"}'
node scripts/github_commit_changes.js '{"branch":"pepite/seo-article-1","commitMessage":"Ajoute article SEO","files":[{"path":"content/mon-article.md","content":"..."}]}'
node scripts/github_open_pr_or_push.js '{"branch":"pepite/seo-article-1","targetBranch":"main","mode":"pull_request"}'
```

## Tests avant automatisation complète

Avant de laisser Pépite publier automatiquement en continu :

1. Tester `supabase_query` et `supabase_upsert` sur une table de test.
2. Tester `fetch_ga4_report` avec les credentials du VPS.
3. Tester `github_create_branch` + `github_commit_changes` + `github_open_pr_or_push` (mode `pull_request`) sur une branche de test, sur un repo non critique.
4. Vérifier que chaque action est bien journalisée dans Supabase (`agent_logs`).
5. Seulement ensuite, envisager le mode `direct_push`.

## Base Supabase recommandée

Tables à créer côté Supabase (SQL non fourni ici — à créer via le MCP Supabase ou le dashboard, en cohérence avec les champs ci-dessous) :

- **marketing_metrics** — `id`, `source`, `metric_name`, `metric_value`, `dimension`, `period_start`, `period_end`, `created_at`
- **seo_opportunities** — `id`, `keyword`, `page_url`, `volume`, `difficulty`, `current_position`, `opportunity_score`, `status`, `created_at`
- **content_assets** — `id`, `title`, `slug`, `type`, `status`, `target_keyword`, `url`, `created_by_agent`, `published_at`
- **landing_pages** — `id`, `title`, `url`, `goal`, `target_audience`, `conversion_goal`, `status`, `created_at`
- **growth_experiments** — `id`, `title`, `hypothesis`, `expected_impact`, `effort`, `confidence`, `status`, `result`, `created_at`
- **agent_logs** — `id`, `agent`, `action`, `tool_used`, `summary`, `status`, `created_at`
- **leads** — `id`, `email`, `name`, `source`, `campaign`, `status`, `score`, `created_at`

## Politique de publication

Publication automatique activée par défaut (`settings/approval-policy.json`). Garde-fous : jamais de secret committé, jamais de suppression massive sans raison claire, toujours un log dans `agent_logs`, commits explicites.

## Prochaines étapes suggérées

1. Configurer `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` et créer les 7 tables ci-dessus.
2. Configurer les credentials Google (GA4) et tester `fetch_ga4_report.js`.
3. Configurer `GITHUB_TOKEN` / `GITHUB_OWNER` / `GITHUB_REPO` vers le repo réel du site, tester le cycle branche → commit → PR sur un contenu non critique.
4. Lancer `commands/daily-cmo-review.md` une première fois pour valider la boucle complète.
5. Construire ensuite `fetch_gsc_report.js`, puis les commandes restantes (`create-landing-page.md`, `run-seo-audit.md`, etc.) selon les besoins réels observés.
