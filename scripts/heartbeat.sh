#!/usr/bin/env bash
# Heartbeat autonome de Pépite pour le site "Cadeau Malin".
# Une itération : audit de l'existant, veille tendances réelle (WebSearch
# multi-angles), recherche mots-clés/intention, détection d'opportunité,
# anticipation saisonnière, puis rédaction d'un article SEO + fiche produit
# dédiée, publication (commit+push direct) et journalisation complète dans
# Supabase (y compris le raisonnement, pas juste le résultat).
# Lancé par crontab système (survit aux redémarrages de session Claude Code).

set -euo pipefail

export PATH="/home/agent/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
cd /home/agent/pepite

LOG_DIR="/home/agent/pepite/logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/heartbeat-$(date +%Y%m%d-%H%M%S).log"

PROMPT='Tu es Pépite (voir CLAUDE.md). Exécute UNE itération complète du heartbeat trend->contenu pour le site "Cadeau Malin" (site/). Ne saute aucune étape danalyse - une seule recherche superficielle ne suffit pas :

1. AUDIT EXISTANT - Charge veille-tendances. Vérifie dans Supabase (content_assets et seo_opportunities, projet vbazcwxpqqnygairexcf) quels sujets/mots-clés/produits sont déjà couverts, pour ne rien répéter.

2. VEILLE TENDANCES REELLE - Charge veille-tendances. Fais PLUSIEURS requêtes WebSearch (au moins 3, sous des angles différents : nouveautés produits, viralité réseaux sociaux, saisonnalité/occasions à venir compte tenu de la date du jour) pour repérer des signaux de tendance cadeaux réels et récents. Ne jamais inventer une tendance ou un produit non trouvé par la recherche.

3. RECHERCHE MOTS-CLES ET INTENTION - Charge recherche-mots-cles-intention. Pour chaque tendance repérée à létape 2, évalue lintention de recherche probable (informationnelle vs transactionnelle) et le potentiel relatif, même en labsence doutil de volume dédié (raisonnement qualitatif explicite, pas une estimation inventée présentée comme un chiffre).

4. DETECTION OPPORTUNITES - Charge detection-opportunites-contenu. Croise les tendances (étape 2), les mots-clés priorisés (étape 3) et lexistant (étape 1) pour ne retenir QUE les 1 à 2 opportunités les plus pertinentes et non redondantes.

5. ANTICIPATION - Charge anticipation-croissance. Ne te limite pas à ce qui est déjà tendance aujourdhui : réfléchis explicitement à ce qui va probablement être recherché dans les prochaines semaines (occasion saisonnière proche, rentrée, fêtes, événement prévisible) compte tenu de la date du jour, et priorise en conséquence si pertinent.

6. REDACTION ARTICLE - Charge redaction-seo-longue-traine. Rédige un article SEO pour la meilleure opportunité retenue, dans site/blog/. Ajoute-le à site/blog/index.html.

6bis. FICHE PRODUIT - Cette étape est OBLIGATOIRE à chaque itération qui publie, jamais optionnelle. Crée en plus une fiche produit dédiée dans site/produits/<slug>.html (nouveau dossier si absent), sur le modèle dune vraie page produit e-commerce : titre précis du produit, pourquoi il est tendance maintenant (1-2 phrases factuelles), 3-4 points clés, CTA vers le lien Amazon.fr. Ajoute un lien vers cette fiche produit depuis larticle de blog ET depuis la page catégorie concernée (site/categories/*.html), et une carte produit sur site/index.html si la tendance est forte.

6ter. ICONE VISUELLE - Obligatoire, jamais optionnelle. Chaque nouvelle carte produit (index.html, catégorie, fiche produit) doit avoir une icône SVG en ligne cohérente avec le reste du site : class="product-icon", viewBox="0 0 24 24", fill="none", stroke="currentColor", stroke-width="1.5", inspirée du produit (regarde les icônes déjà présentes dans site/index.html et site/categories/*.html comme modèle de style). Ne jamais utiliser une image externe ou hotlinkée (aucune dépendance externe, aucun risque de lien mort ou de droit dauteur) - uniquement du SVG dessiné à la main, simple et minimal.

7. LIEN PRODUIT - Utilise un lien de redirection Amazon.fr réel (https://www.amazon.fr/s?k=...) sur la fiche produit ET dans larticle, sans jamais inventer un partenariat affilié qui nexiste pas.

8. PUBLICATION - Committe et pousse directement sur main (git local, SSH déjà configuré) - un commit atomique et descriptif.

9. JOURNALISATION COMPLETE - Journalise dans Supabase : le raisonnement (pas juste le résultat) dans growth_experiments (hypothèse = pourquoi cette tendance/ce timing, résultat attendu), les mots-clés dans seo_opportunities, larticle ET la fiche produit dans content_assets (deux lignes distinctes, type=seo_article et type=fiche_produit), un résumé dans agent_logs (agent=trend-agent pour lanalyse, agent=content-agent pour la rédaction).

10. Si après une vraie analyse (étapes 1 à 5) rien de solide et non redondant ne ressort, ne publie rien et journalise un agent_logs "nothing_new" avec le raisonnement qui a mené à cette conclusion - mais larrêt prématuré après une seule recherche nest jamais acceptable.'

claude -p "$PROMPT" --dangerously-skip-permissions >> "$LOG_FILE" 2>&1

echo "--- heartbeat terminé $(date -Iseconds) ---" >> "$LOG_FILE"
