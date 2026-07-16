#!/usr/bin/env node
// Ajoute ou modifie des fichiers dans le repository du site, sur une branche donnée.
// Entrée (JSON, argv[2]): { repo?, owner?, branch, files: [{ path, content }], commitMessage }
// Secrets attendus (VPS): GITHUB_TOKEN, GITHUB_OWNER, GITHUB_REPO
//
// Utilise l'API Git Data (blobs/tree/commit) pour committer plusieurs fichiers en un seul commit atomique.

require('dotenv').config();
const { Octokit } = require('@octokit/rest');
const { readInput, requireEnv, output, fail } = require('./lib/cli');

async function main() {
  const input = readInput();
  const owner = input.owner || requireEnv('GITHUB_OWNER');
  const repo = input.repo || requireEnv('GITHUB_REPO');
  const branch = input.branch;
  const files = input.files;
  const commitMessage = input.commitMessage;

  if (!branch) fail(new Error('Paramètre requis manquant: branch'));
  if (!files || !files.length) fail(new Error('Paramètre requis manquant: files (liste de { path, content })'));
  if (!commitMessage) fail(new Error('Paramètre requis manquant: commitMessage'));

  const token = requireEnv('GITHUB_TOKEN');
  const octokit = new Octokit({ auth: token });

  const { data: refData } = await octokit.git.getRef({ owner, repo, ref: `heads/${branch}` });
  const latestCommitSha = refData.object.sha;

  const { data: latestCommit } = await octokit.git.getCommit({ owner, repo, commit_sha: latestCommitSha });
  const baseTreeSha = latestCommit.tree.sha;

  const blobs = await Promise.all(
    files.map(async (file) => {
      const { data: blob } = await octokit.git.createBlob({
        owner,
        repo,
        content: Buffer.from(file.content, 'utf8').toString('base64'),
        encoding: 'base64',
      });
      return { path: file.path, sha: blob.sha };
    })
  );

  const { data: newTree } = await octokit.git.createTree({
    owner,
    repo,
    base_tree: baseTreeSha,
    tree: blobs.map((b) => ({ path: b.path, mode: '100644', type: 'blob', sha: b.sha })),
  });

  const { data: newCommit } = await octokit.git.createCommit({
    owner,
    repo,
    message: commitMessage,
    tree: newTree.sha,
    parents: [latestCommitSha],
  });

  await octokit.git.updateRef({ owner, repo, ref: `heads/${branch}`, sha: newCommit.sha });

  output({
    owner,
    repo,
    branch,
    commitSha: newCommit.sha,
    filesChanged: files.map((f) => f.path),
  });
}

main().catch(fail);
