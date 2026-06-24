'use strict';

const { test } = require('node:test');
const assert = require('node:assert');
const { check, summarize, renderStatusMarkdown } = require('../src/monitor');

test('check reports up on a 200', async () => {
  const fakeFetch = async () => ({ status: 200, ok: true });
  const r = await check({ name: 'x', url: 'http://x' }, fakeFetch);
  assert.equal(r.up, true);
  assert.equal(r.status, 200);
});

test('check reports down on a 500', async () => {
  const fakeFetch = async () => ({ status: 500, ok: false });
  const r = await check({ name: 'x', url: 'http://x' }, fakeFetch);
  assert.equal(r.up, false);
});

test('check honors a custom expectStatus', async () => {
  const fakeFetch = async () => ({ status: 301, ok: false });
  const r = await check({ name: 'x', url: 'http://x', expectStatus: 301 }, fakeFetch);
  assert.equal(r.up, true);
});

test('check treats network errors as down', async () => {
  const fakeFetch = async () => {
    throw new Error('boom');
  };
  const r = await check({ name: 'x', url: 'http://x' }, fakeFetch);
  assert.equal(r.up, false);
  assert.equal(r.error, 'boom');
});

test('summarize counts up and down', () => {
  const s = summarize([{ up: true }, { up: false }, { up: true }], 'now');
  assert.equal(s.total, 3);
  assert.equal(s.up, 2);
  assert.equal(s.down, 1);
});

test('renderStatusMarkdown shows the all-good banner', () => {
  const s = summarize([{ name: 'a', url: 'http://u', up: true, status: 200, latencyMs: 5 }], 'now');
  const md = renderStatusMarkdown(s);
  assert.match(md, /all systems operational/);
  assert.match(md, /🟢 up/);
});

test('renderStatusMarkdown flags downtime', () => {
  const s = summarize([{ name: 'a', url: 'http://u', up: false, status: 0, latencyMs: 1, error: 'timeout' }], 'now');
  const md = renderStatusMarkdown(s);
  assert.match(md, /1 down/);
  assert.match(md, /🔴 down/);
});
