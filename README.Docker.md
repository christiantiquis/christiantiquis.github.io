# Container preview

Run `docker compose up --build`, then visit http://localhost:3000.

The build stage exports the Next.js portfolio to static HTML. The final image serves that export using an unprivileged Nginx server on port 8080, mapped to local port 3000.

Rebuild the image after changing site content. Docker is optional; GitHub Pages hosts the static output directly.
