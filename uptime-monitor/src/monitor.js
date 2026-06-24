'use strict';

const fs = require('fs');
const path = require('path');

const DEFAULT_TIMEOUT_MS = 10000;

/**
 * Check a single site. `fetchImpl` is injectable so the logic can be
 * unit-tested without touching the network.
 */
async function check(site, fetchImpl = fetch) {
  const timeoutMs = site.timeoutMs || DEFAULT_TIMEOUT_MS;
  const expect = site.expectStatus; // optional exact code; otherwise any 2xx
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  const started = Date.now();
  try {
    const res = await fetchImpl(site.url, {
      signal: controller.signal,
      redirect: 'follow',
      headers: { 'User-Agent': 'uptime-monitor (+https://github.com/actions)' },
    });
    const latencyMs = Date.now() - started;
    const up = expect != null ? res.status === expect : res.ok;
    return { name: site.name, url: site.url, up, status: res.status, latencyMs, error: null };
  } catch (e) {
    const latencyMs = Date.now() - started;
    const error = e.name === 'AbortError' ? `timeout after ${timeoutMs}ms` : e.message;
    return { name: site.name, url: site.url, up: false, status: 0, latencyMs, error };
  } finally {
    clearTimeout(timer);
  }
}

/** Roll a list of results into a summary object. */
function summarize(results, now = new Date().toISOString()) {
  return {
    checkedAt: now,
    total: results.length,
    up: results.filter((r) => r.up).length,
    down: results.filter((r) => !r.up).length,
    results,
  };
}

/** Render a human-friendly STATUS.md from a summary. */
function renderStatusMarkdown(summary) {
  const lines = [];
  lines.push('# Service Status', '');
  lines.push(`_Last checked: ${summary.checkedAt}_`, '');
  lines.push(
    summary.down
      ? `**${summary.up}/${summary.total} up** · ⚠️ ${summary.down} down`
      : `**${summary.up}/${summary.total} up** · ✅ all systems operational`,
    ''
  );
  lines.push('| Service | Status | Code | Latency |', '| --- | --- | --- | --- |');
  for (const r of summary.results) {
    const badge = r.up ? '🟢 up' : '🔴 down';
    const code = r.status || '—';
    const detail = r.up ? `${r.latencyMs} ms` : r.error || '—';
    lines.push(`| [${r.name}](${r.url}) | ${badge} | ${code} | ${detail} |`);
  }
  lines.push('');
  return lines.join('\n');
}

async function main() {
  const root = path.join(__dirname, '..');
  const sites = JSON.parse(fs.readFileSync(path.join(root, 'sites.json'), 'utf8'));

  const results = [];
  for (const site of sites) results.push(await check(site));
  const summary = summarize(results);

  const statusDir = path.join(root, 'status');
  fs.mkdirSync(statusDir, { recursive: true });
  fs.writeFileSync(path.join(statusDir, 'status.json'), JSON.stringify(summary, null, 2) + '\n');
  fs.writeFileSync(path.join(statusDir, 'STATUS.md'), renderStatusMarkdown(summary));

  console.log(`Checked ${summary.total} sites: ${summary.up} up, ${summary.down} down`);
  for (const r of summary.results) {
    console.log(`  ${r.up ? 'UP  ' : 'DOWN'} ${r.name} -> ${r.status || r.error} (${r.latencyMs}ms)`);
  }

  // Expose results to later workflow steps.
  if (process.env.GITHUB_OUTPUT) {
    const downNames = summary.results.filter((r) => !r.up).map((r) => r.name).join(', ');
    fs.appendFileSync(process.env.GITHUB_OUTPUT, `down=${summary.down}\nup=${summary.up}\ndownNames=${downNames}\n`);
  }
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err);
    process.exit(1);
  });
}

module.exports = { check, summarize, renderStatusMarkdown };
