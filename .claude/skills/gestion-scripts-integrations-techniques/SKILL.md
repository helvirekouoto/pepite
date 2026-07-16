---
name: gestion-scripts-integrations-techniques
description: Maintient et fait évoluer les scripts et intégrations techniques de Pépite (scripts/, .mcp.json, variables d'environnement) sans jamais exposer de secret. À utiliser quand un outil doit être créé, corrigé, ou qu'une nouvelle intégration (MCP, connecteur) doit être branchée.
---

# Gestion des scripts et intégrations techniques

## Déclenchement

À utiliser quand un script sous `scripts/` doit être créé ou corrigé, ou qu'une nouvelle intégration (MCP, API externe) doit être ajoutée au projet.

## Comportement attendu

1. Vérifier si un script équivalent existe déjà avant d'en créer un nouveau (voir README « Construit » / « Pas encore construits »).
2. Suivre le socle commun `scripts/lib/cli.js` (entrée JSON, `requireEnv`, sortie JSON homogène) pour rester cohérent avec l'existant.
3. Ne jamais coder un secret en dur ; toujours lire depuis les variables d'environnement du VPS, jamais depuis la conversation.
4. Mettre à jour `.mcp.json` uniquement si un serveur MCP est réellement installé et configuré sur le VPS — sinon documenter le script de repli.
5. Tester chaque script individuellement (`npm run check` + un appel réel) avant de l'intégrer à une compétence ou une commande.
6. Mettre à jour `settings/integrations.json` pour refléter l'état réel de chaque intégration.

## Outils associés

- Tous les scripts sous `scripts/`
- `.mcp.json`, `settings/integrations.json`

Cette compétence gère l'outillage technique lui-même ; l'exécution d'une publication concrète relève de `publication-automatique`.
