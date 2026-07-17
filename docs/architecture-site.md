# Architecture — Part: `site` (Cadeau Malin)

## Résumé exécutif

Site e-commerce d'idées cadeaux, 100% statique (HTML/CSS/JS vanilla), sans build ni framework, déployé sur GitHub Pages. Le contenu est généré en continu par l'agent Pépite (voir `docs/architecture-agent.md` et `docs/integration-architecture.md`), pas figé à la création.

## Technology stack

| Catégorie | Techno | Version/détail |
|---|---|---|
| Structure | HTML5 sémantique | Un fichier par page, pas de templating côté build |
| Style | CSS pur (`site/styles.css`) | Variables CSS (`--color-accent`, `--radius`, etc.), `@media (prefers-color-scheme: dark)`, grilles `repeat(auto-fit, minmax(...))` |
| Interactivité | JS vanilla inline | Quiz (`quiz.html`), dashboard (`dashboard.html`, `type="module"`), aucune dépendance npm côté client |
| Analytics | Google Analytics 4 (gtag.js), Measurement ID `G-MNCJ1GVHY5` | Présent sur toutes les pages (vérifié par QA automatisée à chaque nouvelle page) |
| Auth (dashboard uniquement) | Supabase Auth (Google OAuth) | Restreint à un seul email propriétaire via RLS |
| Icônes | SVG inline | Choix explicite pour éviter toute dépendance externe/droit d'auteur |

## Architecture pattern

Site multi-page classique (pas de SPA), navigation par liens `<a>` relatifs. Chaque page partage : header (nav identique), section `hero`, contenu spécifique, footer (avec lien vers le dashboard privé). Convention stricte de structure HTML répétée à l'identique sur toutes les pages d'un même type (catégories, articles blog, fiches produit) pour faciliter la génération automatique par l'agent.

## Source tree (part `site`)

```
site/
├── index.html                  # Page d'accueil (tendances, catégories, derniers articles, quiz, lead capture)
├── styles.css                  # Design system central
├── quiz.html                   # Questionnaire "Trouver le cadeau idéal" (3 étapes, JS vanilla)
├── dashboard.html               # Dashboard privé (Google Sign-In, KPIs Supabase + GA4 live)
├── categories/                 # 8 pages catégorie (high-tech, bien-etre, maison-deco, enfants,
│                                #  cafe-the, gaming, voyage, rentree)
├── blog/                       # 10 articles SEO + index.html (liste des articles)
└── produits/                   # 6 fiches produit détaillées
```

## Composants réutilisables (voir `docs/component-inventory.md` pour le détail)

- Header/nav standard (identique sur toutes les pages, avec lien "Trouver le cadeau idéal" et "Blog").
- `product-card` (grille `.grid-4`) — icône SVG, badge tendance, titre, description, CTA.
- `article-item` (liste blog) — titre + accroche + lien.
- Breadcrumb standard (`Accueil / Catégorie / Page`).
- Footer standard avec lien vers `dashboard.html`.

## Data architecture

Pas de base de données côté site — le contenu est directement écrit dans les fichiers HTML (statique). Les seules données dynamiques viennent du dashboard (`dashboard.html`), qui interroge Supabase et une Edge Function GA4 côté client, au chargement de la page (voir `docs/integration-architecture.md`).

## Development workflow

Aucun build, aucun serveur de dev requis — les fichiers HTML/CSS/JS sont directement servables tels quels. Modification = édition directe des fichiers dans `site/`, QA visuelle/liens via Playwright, puis publication (voir `docs/deployment-guide.md`).

## Testing strategy

Pas de tests automatisés formels. QA systématique avant publication via scripts Playwright ad hoc (vérification de tous les liens internes `<a href>`, zéro erreur console/`pageerror`, capture d'écran visuelle) — pratique établie tout au long du développement du site, pas un outil versionné dans le repo.
