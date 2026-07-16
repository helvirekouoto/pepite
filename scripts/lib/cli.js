// Petit socle commun aux scripts-outils de Pépite : lecture d'input JSON en argument,
// lecture de variables d'environnement obligatoires, et sortie JSON homogène sur stdout/stderr.
// Convention d'appel : `node scripts/<outil>.js '<JSON>'` → JSON sur stdout, exit code 0/1.

function readInput() {
  const arg = process.argv[2];
  if (!arg) return {};
  try {
    return JSON.parse(arg);
  } catch (err) {
    fail(new Error(`Argument JSON invalide: ${err.message}`));
  }
}

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    fail(new Error(
      `Variable d'environnement manquante: ${name}. ` +
      `À définir sur le VPS (jamais en dur dans le code ni collée dans la conversation).`
    ));
  }
  return value;
}

function output(data) {
  process.stdout.write(JSON.stringify(data, null, 2) + '\n');
}

function fail(err) {
  process.stderr.write(JSON.stringify({ error: err.message || String(err) }, null, 2) + '\n');
  process.exit(1);
}

module.exports = { readInput, requireEnv, output, fail };
