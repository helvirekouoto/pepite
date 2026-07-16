#!/usr/bin/env node
// Ouvre une Pull Request ou pousse directement (merge) une branche vers la branche cible,
// selon la politique de publication automatique de Pépite.
// Entrée (JSON, argv[2]): { repo?, owner?, branch, targetBranch?: "main", mode: "direct_push"|"pull_request", title?, body?, commitMessage? }
// Secrets attendus (VPS): GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO

require('dotenv').config();
const { Octokit } = require('@octokit/rest');
const { readInput, requireEnv, output, fail } = require('./lib/cli');

async function main() {
  const input = readInput();
  const owner = input.owner || requireEnv('GITHUB_OWNER');
  const repo = input.repo || requireEnv('GITHUB_REPO');
  const branch = input.branch;
  const targetBranch = input.targetBranch || 'main';
  const mode = input.mode || 'pull_request';

  if (!branch) fail(new Error('Paramètre requis manquant: branch'));
  if (!['direct_push', 'pull_request'].includes(mode)) {
    fail(new Error(`mode invalide: ${mode} (attendu direct_push ou pull_request)`));
  }

  const token = requireEnv('GITHUB_TOKEN');
  const octokit = new Octokit({ auth: token });

  if (mode === 'direct_push') {
    const response = await octokit.repos.merge({
      owner,
      repo,
      base: targetBranch,
      head: branch,
      commit_message: input.commitMessage || `Merge ${branch} into ${targetBranch} (Pépite)`,
    });
    const mergeSha = response.data && response.data.sha ? response.data.sha : null;
    output({
      owner,
      repo,
      branch,
      targetBranch,
      mode,
      mergeSha,
      status: response.status === 204 ? 'already_up_to_date' : 'merged',
    });
    return;
  }

  const { data } = await octokit.pulls.create({
    owner,
    repo,
    head: branch,
    base: targetBranch,
    title: input.title || `Pépite: ${branch}`,
    body: input.body || 'Modification proposée automatiquement par Pépite (agent CMO).',
  });

  output({ owner, repo, branch, targetBranch, mode, prNumber: data.number, prUrl: data.html_url, status: 'pr_opened' });
}

main().catch(fail);
