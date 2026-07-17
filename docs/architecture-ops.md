# Architecture — Part: `ops` (scripts d'exécution)

## Résumé exécutif

Ensemble de scripts Node.js CLI, chacun exécutable indépendamment, qui donnent à l'agent Pépite ses capacités d'action réelles : publier sur GitHub, lire/écrire dans Supabase, récupérer des métriques GA4. Convention d'appel uniforme (JSON en argument, JSON sur stdout).

## Technology stack

| Catégorie | Techno | Version |
|---|---|---|
| Runtime | Node.js | (via nvm sur le VPS) |
| Client Supabase | `@supabase/supabase-js` | ^2.45.4 |
| Client Google APIs | `googleapis` | ^140.0.1 (GA4 Data API) |
| HTTP | `axios` | ^1.7.7 |
| Env | `dotenv` | ^16.4.5 |
| Publication Git | `git` CLI local (via `child_process.execFileSync`), SSH deploy key | pas de dépendance npm (retiré : `@octokit/rest`, plus utilisé) |

## Convention d'appel (commune à tous les scripts, via `scripts/lib/cli.js`)

```bash
node scripts/<outil>.js '<JSON>'
```
- Entrée : un unique argument JSON (`readInput()`).
- Sortie succès : JSON sur stdout (`output()`).
- Sortie erreur : JSON `{ "error": "..." }` sur stderr + exit code 1 (`fail()`).
- Secrets : lus exclusivement via variables d'environnement (`requireEnv()`), jamais en dur.

## Inventaire des scripts

| Script | Rôle | Secrets requis |
|---|---|---|
| `github_create_branch.js` | Crée une branche Git locale | Aucun |
| `github_commit_changes.js` | Ajoute/modifie des fichiers sur une branche, commit | Aucun. Garde-fou `assertInsideRepo()` contre le path traversal. |
| `github_open_pr_or_push.js` | Push la branche vers `origin` (SSH) | Aucun |
| `supabase_query.js` | Lecture Supabase | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |
| `supabase_upsert.js` | Écriture Supabase | `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY` |
| `fetch_ga4_report.js` | Rapport GA4 (Data API) | `GA4_PROPERTY_ID`, `GOOGLE_APPLICATION_CREDENTIALS` |
| `heartbeat.sh` | Orchestration d'une itération complète du cycle veille→contenu→publication | Aucun directement (délègue à Claude Code) |

**Point notable** : le repo contient aussi un `.mcp.json` (racine) déclarant des serveurs MCP Supabase et GitHub — mais ce fichier n'est **pas** le mécanisme réellement utilisé en pratique (les scripts `scripts/*.js` + le plugin Supabase MCP officiel de Claude Code servent de mécanisme réel ; `.mcp.json` référence encore `GITHUB_TOKEN`, une approche explicitement abandonnée au profit du push SSH local). À traiter comme vestige, pas comme source de vérité.

## `scripts/heartbeat.sh`

Script bash persistant (permissions exécutables) qui définit le prompt complet d'une itération de heartbeat (audit existant → veille tendances réelle via WebSearch → mots-clés/intention → détection d'opportunité → anticipation → création → publication → log Supabase). **Important** : ce script existe dans le repo mais n'est actuellement **pas** inscrit dans le crontab système du VPS — le heartbeat réellement actif tourne via un job `CronCreate` scopé à la session Claude Code en cours (expire si la session se termine, ou après 7 jours). Voir `docs/deployment-guide.md` pour le détail de cette distinction.

## Architecture pattern

Scripts CLI indépendants, sans framework, orchestrés par l'agent Claude Code (pas par un scheduler applicatif dédié côté Node). Chaque script fait une seule chose et la fait bien (principe Unix).

## Testing strategy

`npm run check` — vérifie la syntaxe (`node --check`) de tous les scripts listés dans `package.json`. Aucun test unitaire/fonctionnel automatisé au-delà de cette vérification syntaxique.
