# Deployment Guide

## Site (`site/` → GitHub Pages)

**Infrastructure** : GitHub Pages, servi via GitHub Actions (pas le mode "branche" classique).

**Pipeline** (`.github/workflows/deploy-pages.yml`) :
- Déclenché sur `push` vers `main` touchant `site/**` ou le workflow lui-même, ou manuellement (`workflow_dispatch`).
- Permissions : `contents:read`, `pages:write`, `id-token:write`.
- Étapes : `checkout` → `configure-pages` (`enablement: true`) → `upload-pages-artifact` (`path: site`) → `deploy-pages`.
- `concurrency` group `pages` (évite les déploiements concurrents).

**Prérequis one-time (déjà faits, non répétables via token)** :
1. Le repo doit être **public** (limite du plan gratuit GitHub Pages) — fait via Settings → Danger Zone.
2. `Settings → Pages → Source` doit être réglé sur **"GitHub Actions"** — action humaine unique, un simple `GITHUB_TOKEN` de workflow ne peut pas créer un site Pages pour la première fois (`Resource not accessible by integration`).

**Process de déploiement au quotidien** : un simple `git push origin main` suffit — aucune étape manuelle après la première configuration.

## Scripts `ops` (`scripts/*.js`)

Aucun déploiement au sens strict — ce sont des scripts CLI exécutés à la demande par l'agent Claude Code, directement sur le VPS. Pas de packaging, pas de conteneur, pas de registre.

## Le Heartbeat autonome — point d'attention important

Deux mécanismes distincts existent, à ne pas confondre :

1. **`scripts/heartbeat.sh`** — script bash persistant dans le repo, exécutable (`chmod +x`), contient le prompt complet d'une itération. **Il n'est actuellement PAS inscrit dans le crontab système du VPS.**
2. **Job `CronCreate`** — un job de scheduling **scopé à la session Claude Code en cours**, qui déclenche réellement le cycle toutes les 3h. Ce mécanisme meurt si la session Claude Code se termine, et expire de toute façon après 7 jours (limite de la plateforme).

**Conséquence opérationnelle** : si la session Claude Code s'arrête et n'est pas relancée avec un nouveau `CronCreate`, le heartbeat s'arrête silencieusement. Pour un heartbeat qui survit aux redémarrages de session, il faudrait que l'utilisateur exécute lui-même (le crontab système n'a jamais pu être installé automatiquement — bloqué par le classificateur de sécurité même avec autorisation explicite en temps réel) :

```bash
(crontab -l 2>/dev/null; echo "13 */2 * * * /home/agent/pepite/scripts/heartbeat.sh") | crontab -
```

## Environnement (VPS)

- Session Claude Code tournant dans une session tmux nommée `soren` (minuscule — une confusion de casse avec une session `Soren` en majuscule a été la cause originelle d'un bug de double-polling du bot Telegram).
- Plugin Telegram connecté (pairing déjà validé, `allowFrom` contient l'ID de l'utilisateur).
- Plugin Playwright (Chromium headless) pour la QA visuelle avant publication.
- MCP Supabase et Gmail actifs (Gmail en mode brouillon uniquement — aucun envoi automatique).

## Secrets

Jamais collés dans le chat. Toujours lus depuis l'environnement du VPS (`.env`, jamais committé) ou saisis directement dans les dashboards tiers (GitHub, Supabase, Google Cloud) par l'utilisateur.
