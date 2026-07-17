# Architecture — Part: `agent` (définition de Pépite)

## Résumé exécutif

Cette partie n'est pas un logiciel qu'on exécute ; c'est la **définition comportementale** d'un agent Claude Code, lue et suivie à chaque tour de raisonnement. Elle définit qui est Pépite, ses sous-agents, ses compétences activables, ses garde-fous, et sa boucle de croissance.

## Point d'entrée

`CLAUDE.md` (racine du repo) — chargé comme system prompt par Claude Code à chaque démarrage de session. Contient :
- La mission et les objectifs initiaux (100+ visiteurs/2 mois, 5 leads qualifiés, SEO/CRO/growth continus).
- L'« architecture mentale » : Pépite comme orchestrateur, entouré de 9 rôles de sous-agents (pas des process séparés — des postures que Pépite adopte selon la tâche).
- La politique de publication automatique (voir `settings/approval-policy.json`).
- Les règles de sécurité sur les secrets (jamais dans le chat, jamais en dur dans le code).
- La boucle de croissance standard (8 étapes : analyser → identifier → prioriser → créer → publier → mesurer → enregistrer → recommencer).

## Sous-agents (`agents/*.md`)

10 fichiers : `orchestrator-cmo.md` (rôle central) + 9 rôles spécialisés (design, analytics, SEO, tendances, contenu, CRO, growth, CRM, marketing-ops). Chaque fichier de rôle spécialisé a une section `## Compétences associées` listant 3-4 skills dédiés — voir `docs/component-inventory.md` pour le détail complet.

## Compétences (`.claude/skills/`)

80 dossiers au total :
- **34 compétences Pépite** (kebab-case, sans préfixe) — une par cas d'usage métier (ex. `redaction-seo-longue-traine`, `gestion-crm-leads`).
- **46 compétences BMAD** (préfixe `bmad-*`) — ajoutées via `npx bmad-method install --modules bmm --tools claude-code`, aucune collision de nom avec les 34 existantes.

Ces deux ensembles sont invocables nativement via l'outil `Skill` de Claude Code — mais seulement depuis que `/home/agent/.claude/skills` a été lié symboliquement vers `/home/agent/pepite/.claude/skills` (le process Claude Code tourne avec pour racine `/home/agent`, pas `/home/agent/pepite` — sans ce lien, aucun des deux ensembles n'aurait été découvert nativement, et les skills Pépite fonctionnaient jusque-là comme de la documentation lue manuellement via `CLAUDE.md`, pas comme des skills invoqués par nom).

## Commandes (`commands/*.md`)

2 fichiers, routines nommées composant plusieurs compétences dans un ordre précis :
- `daily-cmo-review.md` — revue marketing quotidienne (GA4 + Search Console si dispo + CRM + comparaison objectifs → actions).
- `create-website-from-idea.md` — création complète d'un site à partir d'une idée de business, puis enchaînement automatique sur la boucle de croissance.

Ces commandes ne sont pas des slash-commands natives Claude Code (elles ne vivent pas dans `.claude/commands/`) — ce sont des routines documentées que Pépite suit en les lisant, au même titre que les 34 skills métier avant le lien symbolique.

## Configuration (`settings/`)

6 fichiers JSON :
- `agent-config.json` — config générale de l'agent.
- `goals.json` — objectifs chiffrés.
- `integrations.json` — état réel des intégrations actives (Supabase, GA4, Gmail, Playwright, GitHub SSH) et leurs limites précises (ex. Gmail = brouillons uniquement).
- `approval-policy.json` — `default_policy: "automatic"`, liste des actions autorisées sans validation humaine, et garde-fous (`never_commit_secrets`, etc.).
- `content-calendar.json`, `growth-backlog.json` — état du contenu planifié et du backlog de croissance.

## Comportement d'exécution observé

- Publication automatique par défaut (voir `approval-policy.json`), avec une note contextuelle temporaire dans `CLAUDE.md` demandant de committer/pusher à chaque micro-changement plutôt que de grouper (« concours de push »), à retirer une fois la période terminée.
- Journalisation systématique dans Supabase (`agent_logs`, `growth_experiments`) de chaque action et décision, y compris le raisonnement (pas juste le résultat).
- Garde-fous explicites : jamais de secret en dur, jamais de suppression massive de contenu sans raison claire, jamais de page cassée volontairement.

## Testing strategy

Aucun test automatisé formel pour cette partie — la validation se fait par :
- `npm run check` (vérification syntaxique des scripts Node, voir part `ops`).
- QA manuelle/Playwright avant chaque publication de contenu (liens internes valides, zéro erreur console) — voir compétence `optimisation-technique-nouveau-site`.
