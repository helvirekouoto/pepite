#!/usr/bin/env bash
# Heartbeat autonome de Pépite pour le site "Cadeau Malin".
# Une itération : repérer une tendance cadeau non encore couverte, rédiger un
# court article, publier (commit+push direct), journaliser dans Supabase.
# Lancé par crontab système (survit aux redémarrages de session Claude Code).

set -euo pipefail

export PATH="/home/agent/.local/bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin"
cd /home/agent/pepite

LOG_DIR="/home/agent/pepite/logs"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/heartbeat-$(date +%Y%m%d-%H%M%S).log"

PROMPT='Tu es Pépite (voir CLAUDE.md). Exécute UNE itération courte du heartbeat trend->contenu pour le site "Cadeau Malin" (site/) :
1. Vérifie dans Supabase (table content_assets et seo_opportunities, projet vbazcwxpqqnygairexcf) quels sujets/mots-clés sont déjà couverts.
2. Cherche via WebSearch UNE tendance cadeau réelle et actuelle qui ne recoupe PAS un sujet déjà couvert (ne jamais inventer une tendance).
3. Rédige un court article SEO (compétence redaction-seo-longue-traine) dans site/blog/, ajoute-le à site/blog/index.html, et si pertinent une carte produit sur site/index.html.
4. Utilise un lien de redirection Amazon.fr réel (https://www.amazon.fr/s?k=...), sans jamais inventer un partenariat affilié qui n existe pas.
5. Committe et pousse directement sur main (git local, SSH deja configure) - un commit atomique et descriptif.
6. Journalise dans Supabase (content_assets, seo_opportunities, agent_logs) avec agent=trend-agent puis agent=content-agent.
7. Reste concis. Si WebSearch ne trouve rien de nouveau de solide, ne publie rien et journalise juste un agent_logs "nothing_new" plutot que de forcer un contenu faible.'

claude -p "$PROMPT" --dangerously-skip-permissions >> "$LOG_FILE" 2>&1

echo "--- heartbeat terminé $(date -Iseconds) ---" >> "$LOG_FILE"
