# Component Inventory

## Sous-agents et compétences (part `agent`)

| Sous-agent | Fichier | Compétences associées (`.claude/skills/`) |
|---|---|---|
| Orchestrateur | `orchestrator-cmo.md` | — (coordonne les autres, pas de compétences propres) |
| Design & Création de site | `design-agent.md` | `creation-site-web`, `architecture-information-site`, `design-systeme-visuel`, `optimisation-technique-nouveau-site` |
| Analytics Performance | `analytics-agent.md` | `analyse-performance`, `reporting-metriques-marketing`, `analyse-comportementale-cohortes`, `attribution-canaux-acquisition` |
| SEO | `seo-agent.md` | `analyse-performance` (partagée), `veille-tendances` (partagée), `audit-seo-technique`, `recherche-mots-cles-intention` |
| Tendances | `trend-agent.md` | `veille-tendances`, `analyse-concurrentielle`, `detection-opportunites-contenu`, `veille-reseaux-sociaux` |
| Contenu | `content-agent.md` | `redaction-contenu-marketing`, `redaction-seo-longue-traine`, `redaction-email-marketing`, `redaction-reseaux-sociaux` |
| CRO / Landing Page | `cro-agent.md` | `optimisation-conversion`, `analyse-parcours-utilisateur`, `optimisation-formulaires-lead`, `tests-ab` |
| Growth | `growth-agent.md` | `anticipation-croissance`, `experimentation-croissance`, `strategie-acquisition-canaux`, `analyse-cycle-vie-client` |
| CRM / Lead Gen | `crm-agent.md` | `gestion-crm-leads`, `qualification-scoring-leads`, `suivi-roi-attribution-leads`, `nurturing-relances-leads` |
| Marketing Ops | `marketing-ops-agent.md` | `publication-automatique`, `gestion-scripts-integrations-techniques`, `journalisation-donnees-supabase`, `gestion-branches-versions-github` |

**Total : 34 compétences Pépite** (2 partagées entre SEO et Analytics/Tendances, donc 32 fichiers physiques distincts référencés 34 fois).

## Compétences BMAD (46 fichiers, préfixe `bmad-*`)

Organisées en modules `Core` (compétences transverses : `bmad-help`, `bmad-party-mode`, `bmad-customize`, revues éditoriales/adversariales...) et `BMad Method`/`bmm` (workflow logiciel par phase) :

| Phase | Compétences |
|---|---|
| 1-analysis | `bmad-brainstorming`, `bmad-market-research`, `bmad-domain-research`, `bmad-technical-research`, `bmad-product-brief`, `bmad-prfaq` |
| 2-planning | `bmad-prd`, `bmad-ux` |
| 3-solutioning | `bmad-architecture`, `bmad-create-epics-and-stories`, `bmad-check-implementation-readiness` |
| 4-implementation | `bmad-sprint-planning`, `bmad-sprint-status`, `bmad-create-story`, `bmad-dev-story`, `bmad-code-review`, `bmad-checkpoint-preview`, `bmad-qa-generate-e2e-tests`, `bmad-retrospective` |
| anytime | `bmad-document-project`, `bmad-generate-project-context`, `bmad-quick-dev`, `bmad-correct-course`, `bmad-help`, `bmad-index-docs`, `bmad-shard-doc`, revues éditoriales/adversariales, agents personas (`bmad-agent-*`), `bmad-forge-idea`, `bmad-spec` |

Personas BMAD disponibles (module `bmm`, équipe `software-development`) : Mary (Analyst), Paige (Tech Writer), John (PM), Sally (UX Designer), Winston (Architect), Amelia (Dev).

## Composants UI réutilisables (part `site`)

| Composant | Utilisé dans | Description |
|---|---|---|
| Header/nav standard | Toutes les pages | Logo, liens catégories, lien quiz (accentué), lien blog |
| `.hero` | Toutes les pages | Bandeau d'intro avec `::before` dégradé décoratif |
| `product-card` (`.grid-4`) | Accueil, catégories | Icône SVG + badge tendance + titre + description + CTA |
| `.category-icon` | Section "Par catégorie" (accueil) | Icônes SVG par catégorie (`.grid-6`) |
| `article-item` | Blog index | Titre + accroche + lien |
| Breadcrumb | Fiches produit, articles | `Accueil / Catégorie ou Blog / Page` |
| Footer + lien Dashboard | Toutes les pages | `<a href=".../dashboard.html">Dashboard</a>`, discret |
| `.brain-widget` | Dashboard uniquement | SVG cerveau animé + 7 nœuds pulsants, dernière activité + prochain cycle |
| Quiz state machine | `quiz.html` | JS vanilla, 3 étapes (destinataire/budget/intérêt) → recommandation catégorie |

## Scripts (part `ops`) — voir `docs/architecture-ops.md` pour le détail

`lib/cli.js`, `github_create_branch.js`, `github_commit_changes.js`, `github_open_pr_or_push.js`, `supabase_query.js`, `supabase_upsert.js`, `fetch_ga4_report.js`, `heartbeat.sh`.
