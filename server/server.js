const pem = require('pem');
const express = require('express');
const http2 = require('http2');
const expressHTTP2Workaround = require('express-http2-workaround');
const { Nuxt, Builder } = require('nuxt');
const {
  config,
  port,
  HTTP2_HEADER_PATH,
  DIST_SRC,
  getFiles,
  fonts,
} = require('./_helpers');

// Create self-signed certificate
pem.createCertificate({ days: 100, selfSigned: true }, (err, keys) => {
  if (err) {
    throw err;
  }

  // Set dev/prod
  config.dev = !(process.env.NODE_ENV === 'production');

  // files map
  const publicFiles = getFiles(DIST_SRC);

  const app = express();
  const nuxt = new Nuxt(config);

  // Start build process in dev mode
  if (config.dev) {
    const builder = new Builder(nuxt);
    builder.build();
  }

  // Make express compatible with http2
  app.use(expressHTTP2Workaround({ express, http2 }));

  // Nuxt middleware
  app.use(nuxt.render);

  // Start server
  http2
    .createSecureServer({ key: keys.serviceKey, cert: keys.certificate }, app)
    .listen(port, (error) => {
      if (error) {
        console.error(error);
        return process.exit(1);
      }

      console.log(`Server listening on port: ${port}`);
    });

  // Handle home page req
  app.get('/', (req, res, next) => {
    // push assets
    fonts.forEach((font) => {
      const fontWithDescriptor = publicFiles.get(font);

      if (!fontWithDescriptor) {
        return;
      }

      res.stream.pushStream({ [HTTP2_HEADER_PATH]: font }, (pushStream) => {
        pushStream.respondWithFD(fontWithDescriptor.fileDescriptor, fontWithDescriptor.headers);
      });
    });

    next();
  });
});
