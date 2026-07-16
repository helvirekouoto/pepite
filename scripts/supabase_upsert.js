#!/usr/bin/env node
// Insère ou met à jour des données marketing dans Supabase.
// Entrée (JSON, argv[2]): { table, data: object|object[], conflictKey?: string }
// Secrets attendus (VPS): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { readInput, requireEnv, output, fail } = require('./lib/cli');

async function main() {
  const input = readInput();
  if (!input.table) fail(new Error('Paramètre requis manquant: table'));
  if (!input.data) fail(new Error('Paramètre requis manquant: data'));

  const supabaseUrl = requireEnv('SUPABASE_URL');
  const supabaseKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
  const supabase = createClient(supabaseUrl, supabaseKey);

  const options = input.conflictKey ? { onConflict: input.conflictKey } : undefined;

  const { data, error } = await supabase
    .from(input.table)
    .upsert(input.data, options)
    .select();

  if (error) fail(new Error(`Erreur Supabase: ${error.message}`));

  output({ table: input.table, upserted: data });
}

main().catch(fail);
