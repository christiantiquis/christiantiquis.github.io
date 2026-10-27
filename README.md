# Chris Tiquis — Personal portfolio

Personal portfolio of **Christian (Chris) Tiquis**, a software engineer and full-stack developer working with TypeScript, React, Java, and Spring Boot. **BST** is my personal brand and username; **Chris** is the name I go by.

[Portfolio](https://christiantiquis.github.io) · [GitHub profile](https://github.com/christiantiquis) · [LinkedIn](https://www.linkedin.com/in/christiantiquis/)

## What’s included

- Introduction with a BST logo and a connected-particle background.
- About, technology stack, work, and contact sections.
- Responsive layouts, keyboard navigation, and a skip-to-content link.
- A pause/resume control, reduced-motion support, and animation that pauses offscreen or in hidden tabs.
- Page metadata and a static export for GitHub Pages.

The Work section currently explains that public projects are being prepared. Add real project descriptions, source links, and demos as they become available.

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
npm run build
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
- `src/app/globals.css` — colors, typography, responsive layout, logo framing, and reduced-motion styles.
- `src/app/layout.js` — page title, description, social metadata, and favicon.
- `public/BST.jpg` — original BST logo; CSS frames it in the header without changing the image file.
- `next.config.mjs` — static export, unoptimized images, and development build directory.

Profile content was adapted from the README in the [christiantiquis profile repository](https://github.com/christiantiquis/christiantiquis). The two repositories do not sync automatically; update both when your stack, availability, or project details change.

## GitHub Pages deployment

The workflow in `.github/workflows/nextjs.yml` builds and deploys `out/` when changes are pushed to `main`. It can also be run manually from the Actions tab.

In the repository’s **Settings → Pages**, select **GitHub Actions** as the build and deployment source. Export and image settings are maintained directly in `next.config.mjs`; the Configure Pages action does not rewrite that file.

This repository is a user site, served at `https://christiantiquis.github.io` with no repository-name path prefix. If moving it to another repository or domain, review asset paths, canonical URL, and social metadata.

## Repository About details

GitHub’s repository **About** sidebar is separate from this README and the website’s About section. Updating or pushing this file does not change the repository description, website URL, or topics.

Suggested repository details:

- **Description:** Chris Tiquis’s personal portfolio — full-stack software engineer. Built with Next.js and React, featuring BST branding.
- **Website:** `https://christiantiquis.github.io`
- **Topics:** `portfolio`, `personal-website`, `nextjs`, `react`, `tailwindcss`, `github-pages`

Set these through the gear icon beside **About** on the repository homepage, or with GitHub CLI/API access. They only need updating when the repository’s purpose, site URL, or technologies change.
