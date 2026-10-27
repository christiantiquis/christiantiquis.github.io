# Deploying christiquis.pw to Cloudflare

The public site uses two independently deployed Workers in the same Cloudflare account:

- `chris-portfolio`: this repository’s static export, attached to `christiquis.pw`.
- `bst-tools`: the toolkit repository’s static export, mounted under `/tools/` and reached through a private service binding.

The portfolio gateway forwards `/tools/*` to the `BST_TOOLS` binding without changing the URL. The toolkit builds with `basePath: '/tools'`; its export is packaged physically under `.cloudflare-assets/tools/`. Tool scripts, styles, workers, metadata, redirects, and missing pages therefore stay under that prefix. `/tools` redirects to `/tools/`.

No Next.js server, database, or paid API is required. Cloudflare Worker requests are subject to your account’s plan limits. No resources are provisioned by local validation commands.

## One-time setup

1. Add `christiquis.pw` to your Cloudflare account and complete the domain/nameserver setup. Both Workers must belong to that account.
2. In **each GitHub repository**, add these Actions secrets (repository secrets, or secrets in the `production` environment):
   - `CLOUDFLARE_API_TOKEN`: a scoped Cloudflare token with permission to deploy Workers, configure service bindings, and attach the custom domain. Start with Cloudflare’s **Edit Cloudflare Workers** token template and restrict it to the intended account and zone.
   - `CLOUDFLARE_ACCOUNT_ID`: the account that owns the zone and both Workers.
3. Configure the `production` GitHub environment’s deployment protections as desired. Pull requests run checks and a Wrangler dry run without deploying or using production secrets.
4. Deploy **BST Tools first**, using its **Deploy BST Tools to Cloudflare** workflow on `main`. The first portfolio deployment needs the `bst-tools` service to exist.
5. Deploy this repository using **Deploy portfolio to Cloudflare** on `main`. Its Wrangler configuration attaches `christiquis.pw` as a custom domain and binds the tools service.
6. Check the portfolio, `/tools/`, `/tools/json-formatter/`, `/tools/categories/json/`, `/tools/privacy/`, `/tools/sitemap.xml`, and a nonexistent tool URL. Test a tool example and a direct browser refresh.

The workflows deploy on pushes to `main` or a manual run on `main`, only after successful validation. Toolkit updates do not rebuild the portfolio, and portfolio updates do not rebuild the toolkit. Do not enable a separate Cloudflare Git auto-deployment that bypasses these checks.

The toolkit Worker has no public `workers.dev` endpoint or custom domain of its own. The gateway reaches it using Cloudflare’s service binding. The portfolio workflow performs HTTP smoke checks after deployment. For the initial toolkit deployment there is no public gateway to check yet; verify the combined site after deploying the portfolio.

## Local checks

Portfolio:

```sh
npm ci
npm run lint
npm run test:cloudflare
npm run build
npx --yes wrangler@4.153.0 deploy --dry-run
```

Toolkit, from its own checkout:

```sh
npm ci
npm run check
npm run test:cloudflare
npx playwright install chromium
npm run test:e2e
npm run package:cloudflare
npx --yes wrangler@4.153.0 deploy --dry-run
```

On Windows, after building and packaging both apps, preview the gateway and its bound toolkit service together from the portfolio checkout:

```powershell
npx --yes wrangler@4.153.0 dev --local --port 8787 --config wrangler.json --config ..\bst-tools\wrangler.json
```

Open `http://localhost:8787/` and `http://localhost:8787/tools/`. `npm run dev` in either individual app does not run the other application. The toolkit’s own dev server exposes `http://localhost:3217/tools/`.

## URLs and indexing

The production origin is `https://christiquis.pw`. Set `SITE_URL` to that origin without a path, not to `/tools/`. The toolkit adds the `/tools` prefix to its canonical and sitemap URLs itself. Its build receives `DEPLOY_ENV=production` only on production workflow runs; PR builds remain noindex. Local Worker hosts receive an additional noindex header from the toolkit.

Root `robots.txt` advertises both `/sitemap.xml` and `/tools/sitemap.xml`. The portfolio sitemap lists the portfolio homepage; the tools sitemap lists all toolkit pages. Old `/tools/tools/<slug>/` URLs are not the new URL format.

The old GitHub Pages workflow remains available for a manual standalone portfolio deployment, but no longer runs on pushes. It does not host the toolkit or proxy `/tools/`.

## Rollback

Use Cloudflare Workers’ deployment/version history to roll back the affected Worker, then fix and validate on a branch before merging. Each service has independent deployments. GitHub Actions retains the validated static artifacts for seven days. Do not roll back one app to a routing scheme that is incompatible with the other app’s `/tools/` mount.

## References

- [Cloudflare service bindings](https://developers.cloudflare.com/workers/runtime-apis/bindings/service-bindings/)
- [Workers with static assets](https://developers.cloudflare.com/workers/static-assets/)
- [Wrangler GitHub Action](https://github.com/cloudflare/wrangler-action)
- [Next.js basePath](https://nextjs.org/docs/app/api-reference/config/next-config-js/basePath)
