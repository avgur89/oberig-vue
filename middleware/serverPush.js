import fs from 'fs';

const DIST_SRC = './.nuxt/dist/fonts';
const FONT_TYPE = 'woff2';

export default function serverPushMiddleware({ isClient, res }) {
  if (isClient) return;

  // Get assets, only server (fonts at this moment)
  let assets;
  try {
    assets = fs.readdirSync(DIST_SRC).filter(file => file.includes(`.${FONT_TYPE}`));
  } catch (error) {
    console.error(`Error while generating assets for push: ${error}`);
    assets = [];
  }

  // Server push (get critical resources)
  if (assets && assets.length) {
    res.setHeader('Link', assets.map(file => `</_nuxt/fonts/${file}>; rel=preload; as=font; type="font/${FONT_TYPE}"`));
  }
}
