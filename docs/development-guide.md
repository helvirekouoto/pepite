# Development Guide

## Prérequis

- Node.js (via nvm sur le VPS — `source ~/.nvm/nvm.sh`)
- `uv` (Python runner, requis par les scripts BMAD — installé sans sudo via `curl -LsSf https://astral.sh/uv/install.sh | sh`)
- Accès SSH configuré vers GitHub (clé déjà générée sur le VPS, `origin` en SSH)
- Un fichier `.env` local (jamais committé, copié depuis `.env.example`) avec les secrets nécessaires

## Installation

```bash
cd /home/agent/pepite
npm install
```

## Vérifications

```bash
npm run check   # node --check sur tous les scripts Node de scripts/
```

Aucune suite de tests automatisés (unitaires/e2e) formelle dans ce repo. La vérification "fonctionnelle" du site se fait via des scripts Playwright ad hoc (non versionnés), et celle des scripts Node via l'exécution directe avec un JSON de test.

## Lancer un script `ops`

```bash
node scripts/<nom>.js '{"cle": "valeur"}'
```
Voir `docs/architecture-ops.md` pour la liste des scripts et leurs secrets requis.

## Travailler sur le site (`site/`)

Aucun serveur de dev requis — ouvrir les fichiers HTML directement, ou servir le dossier `site/` avec n'importe quel serveur statique simple pour tester les liens relatifs. Respecter strictement les conventions de structure existantes (header/nav identique, breadcrumb, footer avec lien dashboard, snippet GA4) sur toute nouvelle page — c'est ce qui permet à l'agent de générer du contenu cohérent en autonomie.

## Travailler sur les compétences/skills (`.claude/skills/`)

- Un skill = un dossier avec un `SKILL.md` (frontmatter `name`/`description` + corps en sections `## Déclenchement`, `## Comportement attendu`, `## Outils associés`).
- Les 34 skills Pépite et les 46 skills BMAD (`bmad-*`) cohabitent sans collision de nom.
- Pour qu'un nouveau skill soit découvert nativement par l'outil `Skill` de Claude Code, il doit être visible depuis la racine réelle du process (`/home/agent/.claude/skills`, actuellement un lien symbolique vers `/home/agent/pepite/.claude/skills`) — pas seulement présent dans le repo.

## Workflow BMAD sur ce projet

Ce projet est **brownfield** (site + agent déjà en production). Avant tout workflow de planification BMAD (PRD, architecture), une documentation de l'existant (cette doc, générée par `bmad-document-project`) doit exister — c'est fait. Utiliser `bmad-generate-project-context` pour un résumé condensé si un futur agent BMAD a besoin de contexte rapide sans lire toute cette doc.

## Convention de commit

Commits atomiques et fréquents, push immédiat après chaque changement (y compris mineur) — convention actuellement renforcée par une note temporaire dans `CLAUDE.md` (« concours de push »), à retirer une fois la période terminée pour revenir à la préférence normale de commits atomiques mais moins fréquents.
