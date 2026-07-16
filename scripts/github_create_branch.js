#!/usr/bin/env node
// Crée une branche locale (repo Git déjà cloné sur le VPS, remote origin en SSH)
// pour une modification marketing ou landing page.
// Entrée (JSON, argv[2]): { baseBranch?: "main", newBranch }
// Aucun secret requis : utilise la clé SSH déjà configurée sur le VPS.

const path = require('path');
const { execFileSync } = require('child_process');
const { readInput, output, fail } = require('./lib/cli');

const REPO_DIR = path.resolve(__dirname, '..');

function git(args) {
  return execFileSync('git', args, { cwd: REPO_DIR, encoding: 'utf8' }).trim();
}

function branchExists(branch) {
  try {
    git(['rev-parse', '--verify', `refs/heads/${branch}`]);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  const input = readInput();
  const baseBranch = input.baseBranch || 'main';
  const newBranch = input.newBranch;
  if (!newBranch) fail(new Error('Paramètre requis manquant: newBranch'));

  if (branchExists(newBranch)) {
    output({ branch: newBranch, baseBranch, status: 'already_exists' });
    return;
  }

  git(['fetch', 'origin', baseBranch]);
  git(['checkout', '-B', newBranch, `origin/${baseBranch}`]);

  output({ branch: newBranch, baseBranch, status: 'created' });
}

main().catch(fail);
