import assert from 'node:assert/strict';
import { test } from 'node:test';
import worker from '../cloudflare/worker.mjs';

test('canonical tools redirect keeps query parameters', async () => {
  const response = await worker.fetch(new Request('https://christiquis.pw/tools?q=json'), {});
  assert.equal(response.status, 308);
  assert.equal(response.headers.get('location'), 'https://christiquis.pw/tools/?q=json');
});

test('tool pages, assets, sitemap, and missing pages go to the tools service unchanged', async () => {
  for (const path of ['/tools/', '/tools/json-formatter/', '/tools/_next/static/test.js', '/tools/sitemap.xml', '/tools/missing/']) {
    const request = new Request('https://christiquis.pw' + path);
    const status = path.includes('missing') ? 404 : 200;
    const response = await worker.fetch(request, { BST_TOOLS: { fetch: async received => {
      assert.equal(received, request);
      return new Response('tool', { status, headers: { 'Content-Security-Policy': "default-src 'self'" } });
    } } });
    assert.equal(response.status, status);
    assert.ok(response.headers.get('Content-Security-Policy'));
  }
});

test('portfolio routes and similarly named paths stay on the portfolio', async () => {
  for (const path of ['/', '/_next/static/test.js', '/toolsmith/', '/robots.txt']) {
    const response = await worker.fetch(new Request('https://christiquis.pw' + path), { ASSETS: { fetch: async () => new Response('portfolio') } });
    assert.equal(await response.text(), 'portfolio');
  }
});

test('HEAD is forwarded, writes are rejected, and service failures return an uncached 503', async () => {
  const response = await worker.fetch(new Request('https://christiquis.pw/tools/', { method: 'HEAD' }), { BST_TOOLS: { fetch: async req => {
    assert.equal(req.method, 'HEAD'); return new Response(null);
  } } });
  assert.equal(response.status, 200);
  assert.equal((await worker.fetch(new Request('https://christiquis.pw/tools/', { method: 'POST' }), {})).status, 405);
  const failure = await worker.fetch(new Request('https://christiquis.pw/tools/'), { BST_TOOLS: { fetch: async () => { throw new Error('offline'); } } });
  assert.equal(failure.status, 503);
  assert.equal(failure.headers.get('cache-control'), 'no-store');
});
