# Chris Tiquis — Personal portfolio

Personal portfolio of **Christian (Chris) Tiquis**, a software engineer and full-stack developer working with TypeScript, React, Java, and Spring Boot. **BST** is my personal brand and username; **Chris** is the name I go by.

[Portfolio](https://christiquis.pw) · [GitHub profile](https://github.com/christiantiquis) · [LinkedIn](https://www.linkedin.com/in/christiantiquis/)

## What’s included

- Introduction with a BST logo and a connected-particle background.
- About, technology stack, work, and contact sections.
- Responsive layouts, keyboard navigation, and a skip-to-content link.
- A pause/resume control, reduced-motion support, and animation that pauses offscreen or in hidden tabs.
- Page metadata and a static export for GitHub Pages.

The Work section features **BST Tools**, a separate browser-only toolkit served under [/tools/](https://christiquis.pw/tools/). Chris is the person behind both sites; BST is the shared personal/product brand.

## Stack

Next.js 15, React 19, and Tailwind CSS 4. The particle effect uses the browser’s Canvas API without a particle-library dependency.

## Local development

Install Node.js 22 LTS and npm, then run:

```sh
npm ci
npm run dev
```

Open [localhost:3000](http://localhost:3000). Next.js prints another port if 3000 is already in use.

## Validation and production build

```sh
npm run lint
npm run test:cloudflare
npm run build
npm run test:export
```

The production build exports static files to `out/`. No Node.js server is required to host them. Development files use `.next/dev`; production build files use `.next`.

To preview the export with Python installed:

```sh
python -m http.server 3000 --directory out
```

Alternatively, run `docker compose up --build` and open [localhost:3000](http://localhost:3000). See [README.Docker.md](README.Docker.md) for container details.

## Editing the portfolio

- `src/app/page.js` — introduction, about, technology lists, work status, and contact links.
- `src/app/components/Particles/Particles.js` — particle drawing, pointer interaction, and animation controls.
- `src/app/brand.css` — local BST header styles, matched with BST Tools until a shared UI package is released.
- `src/app/globals.css` — colors, typography, responsive layout, logo framing, and reduced-motion styles.
- `src/app/layout.js` — page title, description, social metadata, and favicon.
- `public/BST.jpg` — BST logo, framed by CSS in the header.
- `public/brand/` — responsive WebP logo variants generated from `BST.jpg` by `npm run build:images` (also run before production builds).
- `cloudflare/worker.mjs` — routes `/tools/*` through the toolkit service binding.
- `wrangler.json` — Cloudflare Worker, asset, custom-domain, and service-binding configuration.
- `next.config.mjs` — static export, unoptimized images, and development build directory.

## Mobile performance

The [November 14, 2026 PageSpeed report](https://pagespeed.web.dev/analysis/https-christiquis-pw/wq5aqado9h?form_factor=mobile) scored mobile performance at 96, with accessibility, best practices, and SEO at 100. It reported 1.8s FCP, 1.8s LCP, 4.1s Speed Index, an oversized header logo (about 67 KiB of potential savings), and about 160ms of render-blocking CSS delay.

The header now uses pre-generated 150/300/450px WebP images (1.3–3.8 KiB instead of the 70 KiB original), with responsive sizes and eager loading. A native image also avoids shipping the Next.js image component for this static asset. The original JPEG stays as the source for regeneration.

The small stylesheet is included in the HTML using Next.js `experimental.inlineCss`, eliminating its blocking network request. This experimental option trades separate stylesheet caching for faster first visits on this single-page portfolio; check the exported HTML and browser rendering when upgrading Next.js. `npm run test:export`, run after the build and in Cloudflare CI, guards CSS delivery and the responsive image size budget.

Framework JavaScript and the Cloudflare-managed analytics beacon still appear in Lighthouse diagnostics. The beacon's cache lifetime and polyfills are controlled by Cloudflare. Local measurements do not establish production PageSpeed results; re-run the linked report after merging and deploying.

Profile content was adapted from the README in the [christiantiquis profile repository](https://github.com/christiantiquis/christiantiquis). The two repositories do not sync automatically; update both when your stack, availability, or project details change.

## Cloudflare deployment

The production domain is **christiquis.pw**:

- `/` — Chris’s portfolio, served by the `chris-portfolio` Worker.
- `/tools/` — BST Tools, served by a separate `bst-tools` Worker through a service binding.
- `/tools/json-formatter/` — an example individual tool route.

`.github/workflows/cloudflare.yml` validates the portfolio, checks the Worker bundle, and deploys on pushes to `main`. Pull requests only run validation. The toolkit has its own workflow and validation gates; its source is not copied into this repository.

**First deployment:** configure Cloudflare and GitHub secrets, deploy the toolkit service, then deploy this portfolio. See [DEPLOYMENT.md](DEPLOYMENT.md) for setup, local integrated previews, and rollback instructions. Deployment requires account credentials; a local build does not publish anything.

The old GitHub Pages workflow is now manual-only and does not include the toolkit.

## Repository About details

GitHub’s repository **About** sidebar is separate from this README and the website’s About section. Updating or pushing this file does not change the repository description, website URL, or topics.

Suggested repository details:

- **Description:** Chris Tiquis’s personal portfolio — full-stack software engineer. Built with Next.js and React, featuring BST branding.
- **Website:** `https://christiquis.pw`
- **Topics:** `portfolio`, `personal-website`, `nextjs`, `react`, `tailwindcss`, `github-pages`

Set these through the gear icon beside **About** on the repository homepage, or with GitHub CLI/API access. They only need updating when the repository’s purpose, site URL, or technologies change.

## Shared UI package status

The separate local `bst-ui` repository is retained for a future package release. This app does not depend on `@bst/ui`, a local tarball, or a sibling checkout. Header markup, `src/app/brand.css`, and `public/BST.jpg` are local for now; keep them aligned with BST Tools until the shared package is released and adopted.
