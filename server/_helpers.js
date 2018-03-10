const fs = require('fs');
const path = require('path');
const mime = require('mime');
const http2 = require('http2');
const config = require('../nuxt.config.js');

/**
 * @constant
 * @type {Number}
 */
const port = process.env.PORT || 443;

/**
 * @constant
 * @type {String}
 */
const { HTTP2_HEADER_PATH } = http2.constants;

/**
 * @constant
 * @type {String}
 */
const DIST_SRC = './.nuxt/dist';

/**
 * @constant
 * @type {String}
 */
const FONT_TYPE = 'woff2';

/**
 * @constant
 * @type {Array<String>}
 */
const fonts = fs.readdirSync(DIST_SRC).filter(file => file.includes(`.${FONT_TYPE}`));

/**
 * Get files from directory (with headers)
 *
 * @param {String} dir
 * @return {Map<any, any>}
 */
const getFiles = (dir) => {
  const filesMap = new Map();
  let files;

  try {
    files = fs.readdirSync(dir);
  } catch (error) {
    console.error(`Error while generating assets for push: ${error}`);
    files = [];
  }

  files.forEach((fileName) => {
    const filePath = path.join(dir, fileName);
    const fileDescriptor = fs.openSync(filePath, 'r');
    const stat = fs.fstatSync(fileDescriptor);
    const contentType = mime.getType(filePath);

    filesMap.set(`/${fileName}`, {
      fileDescriptor,
      headers: {
        'content-length': stat.size,
        'last-modified': stat.mtime.toUTCString(),
        'content-type': contentType
      }
    });
  });

  return filesMap;
};

module.exports = {
  port,
  config,
  HTTP2_HEADER_PATH,
  FONT_TYPE,
  DIST_SRC,
  getFiles,
  fonts,
};
