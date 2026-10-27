const base = process.env.SMOKE_URL || 'http://127.0.0.1:8787';
async function request(path, options = {}) {
  for (let attempt = 0; attempt < 5; attempt++) {
    try {
      const response = await fetch(base + path, { signal: AbortSignal.timeout(15000), ...options });
      if (response.status >= 500) {
        await response.body?.cancel();
        throw new Error(`HTTP ${response.status} for ${path}`);
      }
      return response;
    } catch (error) {
      if (attempt === 4) throw error;
      await new Promise(resolve => setTimeout(resolve, 2000));
    }
  }
}
for (const path of ['/', '/tools/', '/tools/json-formatter/', '/tools/categories/json/', '/tools/privacy/', '/tools/sitemap.xml', '/robots.txt']) {
  const response = await request(path);
  if (response.status !== 200) throw new Error(`${path}: HTTP ${response.status}`);
  const body = await response.text();
  if (path === '/tools/') {
    if (!body.includes('https://christiquis.pw/tools/')) throw new Error('Wrong toolkit canonical');
    const asset = body.match(/src="(\/tools\/_next\/static\/[^" ]+\.js)"/);
    if (!asset) throw new Error('Missing scoped JavaScript');
    const script = await request(asset[1]);
    if (script.status !== 200 || !script.headers.get('content-type')?.includes('javascript')) throw new Error('Toolkit asset failed');
    if (!response.headers.get('content-security-policy')) throw new Error('Missing toolkit security headers');
  }
  if (path === '/robots.txt' && !body.includes('/tools/sitemap.xml')) throw new Error('Tools sitemap not advertised');
  console.log(`${response.status} ${path}`);
}
const redirect = await request('/tools?q=json', { redirect: 'manual' });
if (redirect.status !== 308 || !redirect.headers.get('location')?.endsWith('/tools/?q=json')) throw new Error('Bad mount redirect');
const missing = await request('/tools/not-a-tool/');
if (missing.status !== 404 || !(await missing.text()).includes('This tool')) throw new Error('Missing toolkit 404');
const portfolioMissing = await request('/not-a-page/');
if (portfolioMissing.status !== 404) throw new Error('Missing portfolio 404');
console.log('Mount redirect, scoped assets, security headers, and both 404 pages passed.');
