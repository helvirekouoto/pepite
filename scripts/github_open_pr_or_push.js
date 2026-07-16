#!/usr/bin/env node
// Pousse une branche vers GitHub (via SSH, remote origin), puis soit merge directement
// dans la branche cible, soit expose une URL de comparaison pour ouvrir une PR à la main.
// Entrée (JSON, argv[2]): { branch, targetBranch?: "main", mode?: "direct_push"|"pull_request", commitMessage? }
// Aucun secret requis : utilise la clé SSH déjà configurée sur le VPS (remote origin).
//
// Note: la création d'une vraie Pull Request GitHub passe par l'API REST, qui nécessite
// un token. En mode "pull_request" ici, on pousse la branche et on renvoie l'URL de
// comparaison GitHub à ouvrir manuellement (aucune PR n'est créée automatiquement).

const path = require('path');
const { execFileSync } = require('child_process');
const { readInput, output, fail } = require('./lib/cli');

const REPO_DIR = path.resolve(__dirname, '..');

function git(args) {
  return execFileSync('git', args, { cwd: REPO_DIR, encoding: 'utf8' }).trim();
}

function remoteSlug() {
  const url = git(['remote', 'get-url', 'origin']);
  const match = url.match(/github\.com[:/](.+?)(?:\.git)?$/);
  return match ? match[1] : null;
}

async function main() {
  const input = readInput();
  const branch = input.branch;
  const targetBranch = input.targetBranch || 'main';
  const mode = input.mode || 'direct_push';

  if (!branch) fail(new Error('Paramètre requis manquant: branch'));
  if (!['direct_push', 'pull_request'].includes(mode)) {
    fail(new Error(`mode invalide: ${mode} (attendu direct_push ou pull_request)`));
  }

  git(['push', 'origin', `${branch}:${branch}`]);

  if (mode === 'pull_request') {
    const slug = remoteSlug();
    const prUrl = slug ? `https://github.com/${slug}/compare/${targetBranch}...${branch}?expand=1` : null;
    output({ branch, targetBranch, mode, status: 'branch_pushed', prUrl });
    return;
  }

  git(['fetch', 'origin', targetBranch]);
  git(['checkout', targetBranch]);
  git(['pull', 'origin', targetBranch]);

  const beforeSha = git(['rev-parse', targetBranch]);
  git(['merge', '--no-ff', branch, '-m', input.commitMessage || `Merge ${branch} into ${targetBranch} (Pépite)`]);
  const afterSha = git(['rev-parse', targetBranch]);

  if (beforeSha === afterSha) {
    output({ branch, targetBranch, mode, mergeSha: afterSha, status: 'already_up_to_date' });
    return;
  }

  git(['push', 'origin', targetBranch]);

  output({ branch, targetBranch, mode, mergeSha: afterSha, status: 'merged' });
}

main().catch(fail);
