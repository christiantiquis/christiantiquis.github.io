import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import { test } from "node:test";
import sharp from "sharp";

const html = await readFile(new URL("../out/index.html", import.meta.url), "utf8");

test("the exported homepage can paint without a blocking CSS request", () => {
  assert.doesNotMatch(html, /<link\b[^>]*rel="stylesheet"/);
  assert.match(html, /<style\b[^>]*>[\s\S]*?\.brand-header/);
});

test("the header ships responsive static images within a 5 KiB budget each", async () => {
  const logo = html.match(/<img\b[^>]*class="brand-logo-image"[^>]*>/)?.[0];
  assert.ok(logo, "header logo must be present in the initial HTML");
  assert.doesNotMatch(logo, /loading="lazy"|\/BST\.jpg|\/_next\/image/);
  assert.match(logo, /sizes="\(max-width: 720px\) 121px, 150px"/);
  for (const width of [150, 300, 450]) {
    assert.ok(logo.includes(`/brand/bst-${width}.webp ${width}w`));
    const file = new URL(`../out/brand/bst-${width}.webp`, import.meta.url);
    assert.ok((await stat(file)).size < 5 * 1024);
    const metadata = await sharp(file.pathname).metadata();
    assert.equal(metadata.width, width);
  }
});
