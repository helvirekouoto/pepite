#!/usr/bin/env node
// Crée une branche GitHub pour une modification marketing ou landing page.
// Entrée (JSON, argv[2]): { repo?, owner?, baseBranch?: "main", newBranch }
// Secrets attendus (VPS): GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO

require('dotenv').config();
const { Octokit } = require('@octokit/rest');
const { readInput, requireEnv, output, fail } = require('./lib/cli');

async function main() {
  const input = readInput();
  const owner = input.owner || requireEnv('GITHUB_OWNER');
  const repo = input.repo || requireEnv('GITHUB_REPO');
  const baseBranch = input.baseBranch || 'main';
  const newBranch = input.newBranch;
  if (!newBranch) fail(new Error('Paramètre requis manquant: newBranch'));

  const token = requireEnv('GITHUB_TOKEN');
  const octokit = new Octokit({ auth: token });

  const { data: baseRef } = await octokit.git.getRef({ owner, repo, ref: `heads/${baseBranch}` });

  try {
    await octokit.git.createRef({
      owner,
      repo,
      ref: `refs/heads/${newBranch}`,
      sha: baseRef.object.sha,
    });
  } catch (err) {
    if (err.status === 422) {
      output({ owner, repo, branch: newBranch, baseBranch, status: 'already_exists' });
      return;
    }
    throw err;
  }

  output({ owner, repo, branch: newBranch, baseBranch, status: 'created' });
}

main().catch(fail);
