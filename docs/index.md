# Project Documentation Index

Généré par `bmad-document-project` (scan exhaustif) le 2026-07-17.

## Project Overview

- **Type :** multi-part (3 parties : `site`, `ops`, `agent` — voir note sur la part `agent` dans `project-overview.md`, qui ne correspond à aucun type de projet standard)
- **Langage principal :** HTML/CSS/JS vanilla (`site`), Node.js (`ops`), Markdown/JSON (`agent`)
- **Architecture :** site statique multi-page + scripts CLI + définition d'agent Claude Code, orchestrés ensemble par un heartbeat autonome récurrent

## Quick Reference

#### site (Cadeau Malin)
- **Type :** web (statique, sans build/framework)
- **Tech Stack :** HTML5, CSS pur, JS vanilla, GA4, Supabase Auth (dashboard)
- **Root :** `site/`

#### ops (scripts d'exécution)
- **Type :** backend/cli (Node.js)
- **Tech Stack :** `@supabase/supabase-js`, `googleapis`, `axios`, `dotenv`, `git` local via SSH
- **Root :** `scripts/`

#### agent (définition de Pépite)
- **Type :** *sui generis* — prompt système + rôles + compétences, pas un logiciel exécuté classiquement
- **Tech Stack :** Markdown (prompt/rôles/skills) + JSON (config), lus par Claude Code
- **Root :** `CLAUDE.md`, `agents/`, `commands/`, `settings/`, `.claude/skills/`

## Generated Documentation

- [Project Overview](./project-overview.md)
- [Architecture — site](./architecture-site.md)
- [Architecture — ops](./architecture-ops.md)
- [Architecture — agent](./architecture-agent.md)
- [Source Tree Analysis](./source-tree-analysis.md)
- [Component Inventory](./component-inventory.md)
- [Development Guide](./development-guide.md)
- [Deployment Guide](./deployment-guide.md)
- [Integration Architecture](./integration-architecture.md)

## Existing Documentation

- [README.md](../README.md) — vue d'ensemble humaine du repo, état MVP (note : quelques mentions de `GITHUB_TOKEN` y sont désormais obsolètes, le flux réel n'utilise plus de token — voir `architecture-ops.md`)
- [CLAUDE.md](../CLAUDE.md) — prompt système complet de Pépite
- [site-template/README.md](../site-template/README.md) — conventions du gabarit de site de référence

## Getting Started

1. Lire `project-overview.md` pour comprendre la nature hybride du projet (site + agent).
2. `docs/development-guide.md` pour l'installation (`npm install`, `npm run check`).
3. `docs/deployment-guide.md` pour comprendre le déploiement (GitHub Pages) et le point d'attention important sur le heartbeat (`CronCreate` actif vs `scripts/heartbeat.sh` non cronté).
4. Pour toute nouvelle fonctionnalité structurante (pas la boucle marketing quotidienne, déjà gérée par Pépite seule) : utiliser les workflows BMAD (`bmad-prd`, `bmad-architecture`...) en pointant vers cet index comme contexte brownfield.

## Brownfield PRD Command

Ce projet est brownfield. Pour planifier une nouvelle fonctionnalité avec BMAD, lancer le workflow PRD (`bmad-prd`) en lui fournissant `docs/index.md` comme point d'entrée du contexte existant.
