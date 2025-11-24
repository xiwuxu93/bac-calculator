import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';
import pngToIco from 'png-to-ico';

const projectRoot = path.join(process.cwd());
const publicDir = path.join(projectRoot, 'public');
const logoPath = path.join(publicDir, 'logo.svg');

async function generate() {
  const svgExists = fs.existsSync(logoPath);
  if (!svgExists) {
    console.error('logo.svg not found in public/, aborting');
    process.exit(1);
  }

  const svgBuffer = fs.readFileSync(logoPath);

  // Base PNG icons at multiple sizes
  const sizes = [16, 32, 48];
  const pngPaths = [];

  for (const size of sizes) {
    const filename = size === 32 ? 'favicon-32.png' : `favicon-${size}.png`;
    const outPath = path.join(publicDir, filename);
    await sharp(svgBuffer).resize(size, size).png().toFile(outPath);
    pngPaths.push(outPath);
  }

  // Manifest icons 192 and 512
  await sharp(svgBuffer).resize(192, 192).png().toFile(path.join(publicDir, 'icon-192.png'));
  await sharp(svgBuffer).resize(512, 512).png().toFile(path.join(publicDir, 'icon-512.png'));

  // Generate favicon.ico from the small PNGs
  const icoBuffer = await pngToIco(pngPaths);
  fs.writeFileSync(path.join(publicDir, 'favicon.ico'), icoBuffer);

  console.log(
    'Generated favicon.ico, favicon-16/32/48.png, icon-192.png, icon-512.png from logo.svg',
  );
}

generate().catch((error) => {
  console.error(error);
  process.exit(1);
});
