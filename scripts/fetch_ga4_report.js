#!/usr/bin/env node
// Récupère les métriques Google Analytics 4 (Analytics Data API).
// Entrée (JSON, argv[2]): { startDate?: "7daysAgo", endDate?: "today", metrics?: string[], dimensions?: string[] }
// Secrets attendus (VPS): GOOGLE_APPLICATION_CREDENTIALS (chemin vers le fichier de credentials du service account), GA4_PROPERTY_ID

require('dotenv').config();
const { google } = require('googleapis');
const { readInput, requireEnv, output, fail } = require('./lib/cli');

async function main() {
  const input = readInput();
  const propertyId = requireEnv('GA4_PROPERTY_ID');
  requireEnv('GOOGLE_APPLICATION_CREDENTIALS');

  const startDate = input.startDate || '7daysAgo';
  const endDate = input.endDate || 'today';
  const metrics = input.metrics && input.metrics.length ? input.metrics : ['sessions', 'totalUsers', 'conversions'];
  const dimensions = input.dimensions || [];

  const auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/analytics.readonly'],
  });

  const analyticsData = google.analyticsdata({ version: 'v1beta', auth });

  const response = await analyticsData.properties.runReport({
    property: `properties/${propertyId}`,
    requestBody: {
      dateRanges: [{ startDate, endDate }],
      metrics: metrics.map((name) => ({ name })),
      dimensions: dimensions.map((name) => ({ name })),
    },
  });

  const { dimensionHeaders = [], metricHeaders = [], rows = [] } = response.data;

  const result = rows.map((row) => {
    const record = {};
    (row.dimensionValues || []).forEach((value, i) => {
      record[dimensionHeaders[i].name] = value.value;
    });
    (row.metricValues || []).forEach((value, i) => {
      record[metricHeaders[i].name] = value.value;
    });
    return record;
  });

  output({ propertyId, startDate, endDate, metrics, dimensions, rowCount: result.length, rows: result });
}

main().catch(fail);
