import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const source = new URL("../public/BST.jpg", import.meta.url);
const output = new URL("../public/brand/", import.meta.url);
await mkdir(output, { recursive: true });
for (const width of [150, 300, 450]) {
  await sharp(source.pathname)
    .resize({ width })
    .webp({ quality: 85 })
    .toFile(new URL(`bst-${width}.webp`, output).pathname);
}
