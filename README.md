# Christian Tiquis — Personal portfolio

A responsive personal portfolio built with Next.js 15, React 19, and Tailwind CSS 4. Content is based on the profile README in the `christiantiquis` repository.

## Local development

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Production

```sh
npm run build
```

The site exports static files into `out/`. The GitHub Actions workflow deploys that directory to GitHub Pages on pushes to `main`. No Node.js server is required in production.

For a container preview, use `docker compose up --build` and open http://localhost:3000.

## Editing

- `src/app/page.js`: introduction, about, technology lists, work status, and contact links.
- `src/app/globals.css`: responsive layout, colors, and reduced-motion support.
- `src/app/layout.js`: metadata and favicon.

When projects are ready, replace the work status with real project descriptions and source/demo links. Keep claims and availability aligned with your profile README.

## Checks

```sh
npm run lint
npm run build
```
