const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function main() {
  const svgPath = path.join(__dirname, '../public/icon.svg');
  const svgBuffer = fs.readFileSync(svgPath);

  const outDir = path.join(__dirname, '../public');

  // 192x192
  await sharp(svgBuffer)
    .resize(192, 192)
    .png()
    .toFile(path.join(outDir, 'pwa-192x192.png'));
  console.log('Created pwa-192x192.png');

  // 512x512
  await sharp(svgBuffer)
    .resize(512, 512)
    .png()
    .toFile(path.join(outDir, 'pwa-512x512.png'));
  console.log('Created pwa-512x512.png');

  // 512x512 maskable (with 15% safe padding)
  const innerSize = Math.round(512 * 0.75); // 384
  const innerBuffer = await sharp(svgBuffer).resize(innerSize, innerSize).toBuffer();
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 10, g: 10, b: 10, alpha: 1 }
    }
  })
    .composite([{ input: innerBuffer, gravity: 'center' }])
    .png()
    .toFile(path.join(outDir, 'pwa-maskable-512x512.png'));
  console.log('Created pwa-maskable-512x512.png');

  // 180x180 for iOS Apple touch icon
  await sharp(svgBuffer)
    .resize(180, 180)
    .png()
    .toFile(path.join(outDir, 'apple-touch-icon.png'));
  console.log('Created apple-touch-icon.png');

  // 32x32 favicon
  await sharp(svgBuffer)
    .resize(32, 32)
    .png()
    .toFile(path.join(outDir, 'favicon.png'));
  console.log('Created favicon.png');

  // 540x960 Mobile screenshot for PWA Manifest
  await sharp(svgBuffer)
    .resize(540, 960, {
      fit: 'contain',
      background: { r: 10, g: 10, b: 10, alpha: 1 }
    })
    .png()
    .toFile(path.join(outDir, 'screenshot-mobile.png'));
  console.log('Created screenshot-mobile.png');
}

main().catch(err => {
  console.error(err);
  process.exit(1);
});
