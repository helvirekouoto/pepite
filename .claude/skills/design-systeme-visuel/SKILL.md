---
name: design-systeme-visuel
description: Adapte l'identité visuelle (couleurs, typographie, ton graphique) du gabarit `site-template/` à la marque d'un business donné, sans casser la hiérarchie et l'accessibilité déjà en place. À utiliser une fois l'architecture des pages définie, avant la publication.
---

# Design du système visuel

## Déclenchement

À utiliser quand une identité de marque doit être appliquée à un nouveau site (après `architecture-information-site`), ou quand un site existant a besoin d'un rafraîchissement visuel cohérent.

## Comportement attendu

1. Choisir une couleur d'accent et une palette cohérente avec le secteur et le ton de la marque (pas de choix arbitraire — vérifier le contraste WCAG AA sur fond clair et sombre).
2. Ajuster les variables CSS du gabarit (`--color-accent`, `--font-sans`, etc.) plutôt que de réécrire le système d'espacement ou la hiérarchie typographique existante.
3. Garder une seule police, une échelle de tailles limitée, et un espace blanc généreux — refuser la surcharge visuelle même si demandée, en expliquant pourquoi.
4. Vérifier le rendu mobile-first et le mode sombre (`prefers-color-scheme`) avant de considérer le design terminé.
5. Ne jamais sacrifier l'accessibilité (contraste, focus visible, tailles de police) pour un effet visuel.

## Outils associés

- Gabarit de référence : `site-template/styles.css`
- `github_commit_changes` (`scripts/github_commit_changes.js`) pour appliquer les ajustements

Cette compétence ne définit pas la structure des pages (`architecture-information-site`) ni le contenu textuel (`redaction-contenu-marketing`).
