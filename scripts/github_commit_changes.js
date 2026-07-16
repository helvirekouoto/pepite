#!/usr/bin/env node
// Ajoute ou modifie des fichiers dans le repo Git local (VPS), sur une branche donnée,
// puis committe. Le push se fait séparément via github_open_pr_or_push.js.
// Entrée (JSON, argv[2]): { branch, files: [{ path, content }], commitMessage }
// Aucun secret requis : opère sur le clone local (remote origin en SSH).

const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');
const { readInput, output, fail } = require('./lib/cli');

const REPO_DIR = path.resolve(__dirname, '..');

function git(args) {
  return execFileSync('git', args, { cwd: REPO_DIR, encoding: 'utf8' }).trim();
}

function assertInsideRepo(filePath) {
  const resolved = path.resolve(REPO_DIR, filePath);
  if (!resolved.startsWith(REPO_DIR + path.sep)) {
    fail(new Error(`Chemin de fichier hors du repo refusé: ${filePath}`));
  }
  return resolved;
}

async function main() {
  const input = readInput();
  const branch = input.branch;
  const files = input.files;
  const commitMessage = input.commitMessage;

  if (!branch) fail(new Error('Paramètre requis manquant: branch'));
  if (!files || !files.length) fail(new Error('Paramètre requis manquant: files (liste de { path, content })'));
  if (!commitMessage) fail(new Error('Paramètre requis manquant: commitMessage'));

  git(['checkout', branch]);

  for (const file of files) {
    const resolved = assertInsideRepo(file.path);
    fs.mkdirSync(path.dirname(resolved), { recursive: true });
    fs.writeFileSync(resolved, file.content, 'utf8');
  }

  git(['add', ...files.map((f) => f.path)]);
  git(['commit', '-m', commitMessage]);
  const commitSha = git(['rev-parse', 'HEAD']);

  output({
    branch,
    commitSha,
    filesChanged: files.map((f) => f.path),
  });
}

main().catch(fail);
