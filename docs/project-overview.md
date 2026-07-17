# Project Overview — Pépite / Cadeau Malin

**Généré par :** bmad-document-project (scan exhaustif) — 2026-07-17
**Repo :** `helvirekouoto/pepite` (GitHub, SSH), déployé en production sur `https://helvirekouoto.github.io/pepite/`

## Qu'est-ce que ce projet ?

Ce repo contient deux choses étroitement imbriquées, pas un seul produit logiciel classique :

1. **Cadeau Malin** — un site e-commerce d'idées cadeaux (contenu éditorial + fiches produits + liens d'achat Amazon.fr), servi statiquement via GitHub Pages.
2. **Pépite** — un agent CMO autonome (piloté par Claude Code sur un VPS) dont la mission est de faire vivre et grandir ce site en continu : recherche de tendances, rédaction SEO, publication, expérimentation growth, CRM, reporting — sans intervention humaine à chaque étape.

Le site n'est donc pas un livrable figé : c'est la sortie continue d'un agent qui tourne en boucle (« heartbeat » récurrent toutes les 3h, voir `scripts/heartbeat.sh` et `docs/integration-architecture.md`).

## Repository type

**Multi-part**, 3 parties dans un seul repo (pas un monorepo au sens outillage — juste une séparation logique claire) :

| Part ID | Nom | Rôle | Type le plus proche |
|---|---|---|---|
| `site` | Cadeau Malin | Site public, statique | web (sans build ni framework) |
| `ops` | Scripts d'exécution | Publication Git, Supabase, GA4 | backend / cli (Node.js) |
| `agent` | Définition de l'agent Pépite | Prompt système, rôles, compétences, config | *sui generis* — pas un type de projet logiciel standard, voir note ci-dessous |

**Note sur la part `agent` :** ce n'est ni du code au sens classique, ni de la documentation passive — ce sont des fichiers Markdown/JSON lus et suivis comme instructions par Claude Code à l'exécution (`CLAUDE.md` en système prompt, `agents/*.md` comme définitions de rôle, `.claude/skills/*/SKILL.md` comme procédures activables). Aucun des 12 `project_type_id` du catalogue BMAD ne correspond réellement à ce type de « projet ». Documenté séparément par honnêteté plutôt que forcé dans une case existante.

## Tech stack (résumé — détail par partie dans les fichiers d'architecture dédiés)

| Catégorie | Techno | Justification |
|---|---|---|
| Frontend | HTML5 + CSS pur + JS vanilla | Zéro dépendance, zéro build, déployable tel quel (choix explicite, voir `site-template/README.md`) |
| Hébergement | GitHub Pages + GitHub Actions | Gratuit, suffisant pour un site statique, déploiement automatique sur push |
| Backend "ops" | Node.js (scripts CLI) | `@supabase/supabase-js`, `googleapis`, `axios`, `dotenv` — voir `package.json` |
| Données | Supabase (Postgres + RLS + Auth + Edge Functions) | Mémoire marketing de l'agent + auth du dashboard privé |
| Analytics | Google Analytics 4 (gtag.js + GA4 Data API via Edge Function `ga4-report`) | Tracking public + reporting privé dans le dashboard |
| Pilotage agent | Claude Code (VPS, tmux `soren`) + plugin Telegram | Interface de contrôle humain vers Pépite |
| QA | Playwright (MCP, Chromium headless) | Vérification visuelle et liens avant chaque publication |
| Cadrage méthodologique | BMAD-METHOD (module `bmm`) | Ajouté récemment, en complément — pas en remplacement — de l'architecture agent existante |

## Repository structure (haut niveau)

```
pepite/
├── CLAUDE.md              # part: agent — prompt système de Pépite
├── agents/                # part: agent — 9 rôles de sous-agents + orchestrateur
├── commands/               # part: agent — commandes/routines nommées
├── settings/               # part: agent — config (objectifs, policy, intégrations...)
├── .claude/skills/          # part: agent — 34 compétences Pépite + 46 compétences BMAD (bmad-*)
├── scripts/                # part: ops — publication Git, Supabase, GA4
├── site/                  # part: site — le site public Cadeau Malin
├── site-template/           # gabarit de référence pour toute nouvelle création de site
├── _bmad/                 # framework BMAD-METHOD (installé, non modifié à la main)
├── docs/                  # cette documentation (générée par bmad-document-project)
└── .github/workflows/       # déploiement GitHub Pages
```

## Getting started

Voir `docs/development-guide.md` pour l'installation et `docs/deployment-guide.md` pour le déploiement — les deux sont très courts : ce projet n'a pas de build, pas de tests automatisés, et le déploiement est déclenché par un simple `git push`.

## Liens

- Site en production : https://helvirekouoto.github.io/pepite/
- Dashboard privé (Google Sign-In requis) : https://helvirekouoto.github.io/pepite/dashboard.html
- Documentation détaillée : voir `docs/index.md`
