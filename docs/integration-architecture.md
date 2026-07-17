# Integration Architecture

Comment les 3 parties (`site`, `ops`, `agent`) et les services externes communiquent.

## Vue d'ensemble des flux

```
┌─────────────┐     lit/écrit prompts       ┌───────────────┐
│  Utilisateur │ ───────────────────────────▶│  Claude Code   │
│  (Telegram)  │◀─────────────────────────── │  = agent Pépite│
└─────────────┘     réponses (reply tool)    │  (session tmux │
                                              │   "soren")     │
                                              └───────┬───────┘
                                                      │ invoque
                              ┌───────────────────────┼───────────────────────┐
                              ▼                       ▼                       ▼
                     ┌────────────────┐      ┌────────────────┐     ┌────────────────┐
                     │ scripts/*.js   │      │ MCP Supabase    │     │ MCP Playwright  │
                     │ (part: ops)    │      │ (plugin claude) │     │ (QA visuelle)   │
                     └───────┬────────┘      └────────┬───────┘     └────────────────┘
                             │                          │
                    git push │ SSH                      │ SQL/RLS
                             ▼                          ▼
                     ┌────────────────┐      ┌──────────────────────────┐
                     │ GitHub (repo)  │      │ Supabase (Postgres+Auth  │
                     │ helvirekouoto/ │      │ +Edge Functions)         │
                     │ pepite         │      │ tables: marketing_metrics│
                     └───────┬────────┘      │ seo_opportunities,       │
                             │ push→trigger    │ content_assets,          │
                             ▼                │ landing_pages,           │
                     ┌────────────────┐      │ growth_experiments,      │
                     │ GitHub Actions │      │ agent_logs, leads        │
                     │ deploy-pages.yml│      └────────────┬─────────────┘
                     └───────┬────────┘                   │
                             ▼                             │ invoke (client)
                     ┌────────────────┐                    ▼
                     │ GitHub Pages   │           ┌──────────────────┐
                     │ (part: site)   │◀──────────│ dashboard.html    │
                     │ helvirekouoto  │  fetch     │ (Google Sign-In,  │
                     │ .github.io/    │  GA4 data  │ Edge Function     │
                     │ pepite/        │──────────▶│ "ga4-report")      │
                     └───────┬────────┘           └──────────────────┘
                             │ gtag.js (public)
                             ▼
                     ┌────────────────┐
                     │ Google Analytics│
                     │ 4 (G-MNCJ1GVHY5)│
                     └────────────────┘
```

## Points d'intégration détaillés

| De | Vers | Type | Détail |
|---|---|---|---|
| Utilisateur | Agent | Telegram (plugin MCP) | Polling unique par bot — deux sessions simultanées avec le même token cassent la connexion (bug déjà rencontré et corrigé) |
| Agent (`ops`) | GitHub | `git` + SSH (pas d'API REST, pas de token) | `github_create_branch.js` → `github_commit_changes.js` → `github_open_pr_or_push.js` |
| GitHub | GitHub Pages | GitHub Actions | Sur push touchant `site/**`, build+deploy automatique |
| Agent | Supabase | MCP Supabase (plugin) + `scripts/supabase_*.js` en repli | Lecture/écriture des 7 tables ; clé `service_role` (jamais exposée côté client) |
| `site/dashboard.html` | Supabase | `@supabase/supabase-js` côté client, clé **publishable** (non secrète) | Auth (Google OAuth via Supabase Auth) + lecture des tables (RLS restreinte à l'email exact du propriétaire) |
| `site/dashboard.html` | Edge Function `ga4-report` | `supabase.functions.invoke()`, `verify_jwt: true` | La fonction vérifie elle-même que le JWT correspond à l'email propriétaire avant d'appeler l'API GA4 |
| Edge Function `ga4-report` | Google GA4 Data API | Service account (JWT RS256 signé côté Edge Function, secrets `GA4_SERVICE_ACCOUNT_KEY`/`GA4_PROPERTY_ID`) | Distinct du snippet gtag.js public — reporting privé, pas tracking |
| Toutes les pages `site/*.html` | Google Analytics 4 | gtag.js, Measurement ID `G-MNCJ1GVHY5` (non secret) | Tracking public, vérifié présent sur chaque nouvelle page par QA |
| Agent | Gmail | MCP Gmail (plugin) | `create_draft` uniquement — aucun envoi automatique possible avec cet outil |

## Authentification — deux mécanismes bien séparés

1. **GitHub** : clé SSH déployée sur le VPS (pas de token, pas de secret dans le repo).
2. **Dashboard privé** : Google OAuth via Supabase Auth, restreint à un seul email exact (`helvire.kouoto.pro@gmail.com`) par une policy RLS `using (auth.jwt() ->> 'email' = '...')` — jamais de policy publique/anonyme sur les données du dashboard.

## Cycle heartbeat (boucle continue)

```
CronCreate (job récurrent, scopé session) 
   → prompt "exécute une itération heartbeat"
   → Pépite : audit Supabase (éviter redondance) 
   → veille WebSearch réelle (jamais Google Trends, bloqué 429 sur ce VPS)
   → mots-clés/intention → détection d'1-2 opportunités
   → création contenu/design (avec icônes SVG + snippet GA4 obligatoires)
   → QA Playwright → commit+push atomique
   → vérification déploiement live
   → log Supabase (agent_logs, growth_experiments) — raisonnement inclus, pas juste le résultat
```

Voir `docs/deployment-guide.md` pour la distinction importante entre ce job `CronCreate` (actif) et `scripts/heartbeat.sh` (présent dans le repo mais pas dans le crontab système).
