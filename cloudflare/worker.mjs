export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === "/tools") {
      url.pathname = "/tools/";
      return Response.redirect(url.href, 308);
    }
    if (url.pathname.startsWith("/tools/")) {
      if (!["GET", "HEAD"].includes(request.method)) {
        return new Response("Method not allowed", { status: 405, headers: { Allow: "GET, HEAD" } });
      }
      try {
        return await env.BST_TOOLS.fetch(request);
      } catch {
        return new Response("BST Tools is temporarily unavailable. Please try again shortly.", {
          status: 503,
          headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-store", "Retry-After": "60" },
        });
      }
    }
    return env.ASSETS.fetch(request);
  },
};
