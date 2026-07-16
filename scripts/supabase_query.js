#!/usr/bin/env node
// Lit des données marketing depuis Supabase.
// Entrée (JSON, argv[2]): { table, filters?: {col: value}, select?: "col1,col2", limit?: number }
// Secrets attendus (VPS): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY

require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const { readInput, requireEnv, output, fail } = require('./lib/cli');

async function main() {
  const input = readInput();
  if (!input.table) fail(new Error('Paramètre requis manquant: table'));

  const supabaseUrl = requireEnv('SUPABASE_URL');
  const supabaseKey = requireEnv('SUPABASE_SERVICE_ROLE_KEY');
  const supabase = createClient(supabaseUrl, supabaseKey);

  let query = supabase.from(input.table).select(input.select || '*');

  if (input.filters) {
    for (const [column, value] of Object.entries(input.filters)) {
      query = query.eq(column, value);
    }
  }

  if (input.limit) {
    query = query.limit(input.limit);
  }

  const { data, error } = await query;
  if (error) fail(new Error(`Erreur Supabase: ${error.message}`));

  output({ table: input.table, rowCount: data.length, rows: data });
}

main().catch(fail);
