# Source Tree Analysis

Arbre annoté complet (hors `node_modules/`, `.git/`, `_bmad/` interne, `.claude/skills/` détaillé séparément dans `docs/component-inventory.md`).

```
pepite/
├── CLAUDE.md                    # [agent] Prompt système de Pépite — point d'entrée de toute session
├── README.md                     # Vue d'ensemble humaine du repo (état MVP, install, conventions)
├── package.json                  # [ops] Dépendances Node + script `check`
├── package-lock.json
├── .env.example                  # Modèle des variables d'env (jamais de vraies valeurs committées)
├── .env                          # [gitignored] Variables réelles du VPS
├── .mcp.json                     # Déclaration MCP Supabase/GitHub — vestige, voir docs/architecture-ops.md
├── .gitignore                    # node_modules/, .env*, _bmad/config.user.toml
│
├── agents/                       # [agent] 10 fichiers — orchestrateur + 9 rôles de sous-agents
│   ├── orchestrator-cmo.md       #   Rôle central, pas de compétences propres (coordonne les autres)
│   ├── design-agent.md           #   Création de site à partir d'une idée de business
│   ├── analytics-agent.md        #   Performance, trafic, conversions
│   ├── seo-agent.md              #   Ranking, mots-clés, audit technique
│   ├── trend-agent.md            #   Veille tendances, concurrence
│   ├── content-agent.md          #   Rédaction (marketing, SEO, email, réseaux sociaux)
│   ├── cro-agent.md              #   Conversion, parcours utilisateur, A/B
│   ├── growth-agent.md           #   Initiatives de croissance, acquisition
│   ├── crm-agent.md              #   Leads, scoring, nurturing
│   └── marketing-ops-agent.md    #   Publication, scripts, GitHub, Supabase
│
├── commands/                     # [agent] Routines nommées composant plusieurs compétences
│   ├── daily-cmo-review.md
│   └── create-website-from-idea.md
│
├── settings/                     # [agent] Configuration
│   ├── agent-config.json
│   ├── goals.json
│   ├── integrations.json         #   État réel des intégrations (source de vérité, à jour)
│   ├── approval-policy.json      #   Ce qui est autorisé sans validation humaine
│   ├── content-calendar.json
│   └── growth-backlog.json
│
├── .claude/
│   └── skills/                   # [agent] 80 compétences (34 Pépite + 46 BMAD `bmad-*`)
│                                  #   Lié symboliquement depuis /home/agent/.claude/skills
│                                  #   pour être découvert nativement par l'outil Skill
│
├── scripts/                      # [ops] Scripts CLI Node.js
│   ├── lib/cli.js                #   Socle commun (input JSON, env, output/fail)
│   ├── github_create_branch.js
│   ├── github_commit_changes.js  #   assertInsideRepo() — garde-fou path traversal
│   ├── github_open_pr_or_push.js
│   ├── supabase_query.js
│   ├── supabase_upsert.js
│   ├── fetch_ga4_report.js
│   └── heartbeat.sh              #   Prompt complet d'une itération heartbeat (voir architecture-ops.md)
│
├── site/                         # [site] Le site public Cadeau Malin — voir architecture-site.md
│   ├── index.html
│   ├── styles.css
│   ├── quiz.html
│   ├── dashboard.html            #   Dashboard privé, Google Sign-In + Supabase + GA4
│   ├── categories/                #   8 pages catégorie
│   ├── blog/                      #   10 articles + index
│   └── produits/                  #   6 fiches produit
│
├── site-template/                 # Gabarit HTML/CSS de référence pour toute nouvelle création de site
│                                  #   (jamais modifié directement — copié vers site/ lors de l'usage)
│
├── logs/                         # Logs d'exécution du heartbeat (vide au moment du scan)
│
├── .github/workflows/
│   └── deploy-pages.yml          # Déploiement GitHub Pages sur push (site/**)
│
├── _bmad/                        # Framework BMAD-METHOD (module bmm, tool claude-code)
│   ├── config.toml               #   Config résolue (output_folder = "_bmad-output")
│   ├── bmm/, core/                #   Config par module
│   └── custom/                   #   Overrides jamais touchés par l'installeur (gitignore *.user.toml)
│
└── docs/                         # Cette documentation (bmad-document-project)
```

## Points d'entrée

- **Agent** : `CLAUDE.md` (chargé par Claude Code au démarrage de session).
- **Site** : `site/index.html` (racine du site déployé).
- **Ops** : chaque script de `scripts/` est un point d'entrée indépendant, invoqué à la demande par l'agent.

## Points d'intégration entre parties

Voir `docs/integration-architecture.md` pour le détail complet des flux entre `site`, `ops`, Supabase, GA4, GitHub Actions, et l'agent lui-même.
