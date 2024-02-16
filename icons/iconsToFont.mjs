import webfontsGenerator from '@vusion/webfonts-generator';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

webfontsGenerator(
  {
    files: [
      __dirname + '/src/3dbazaar.svg',
      __dirname + '/src/blobs.svg',
      __dirname + '/src/brush-plus.svg',
      __dirname + '/src/cube-corners-plus.svg',
      __dirname + '/src/cube-plus.svg',
      __dirname + '/src/curve.svg',
      __dirname + '/src/curve-exp.svg',
      __dirname + '/src/curve-plus.svg',
      __dirname + '/src/curve-handles-left.svg',
      __dirname + '/src/curve-handles-lock.svg',
      __dirname + '/src/curve-handles-right.svg',
      __dirname + '/src/distribution.svg',
      __dirname + '/src/distribution-plus.svg',
      __dirname + '/src/empty-plus.svg',
      __dirname + '/src/eyedropper.svg',
      __dirname + '/src/eyedropper-plus.svg',
      __dirname + '/src/folder-plus.svg',
      __dirname + '/src/gears.svg',
      __dirname + '/src/grid-check.svg',
      __dirname + '/src/grid-remove.svg',
      __dirname + '/src/image-plus.svg',
      __dirname + '/src/list-plus.svg',
      __dirname + '/src/magnify-arrows.svg',
      __dirname + '/src/marker-multiple-plus.svg',
      __dirname + '/src/mask-area.svg',
      __dirname + '/src/mask-area-plus.svg',
      __dirname + '/src/mask-exclusive.svg',
      __dirname + '/src/mask-inclusive.svg',
      __dirname + '/src/material.svg',
      __dirname + '/src/paint-bucket.svg',
      __dirname + '/src/path.svg',
      __dirname + '/src/path-plus.svg',
      __dirname + '/src/random-transforms.svg',
      __dirname + '/src/skatter.svg',
      __dirname + '/src/spray-plus.svg',
      __dirname + '/src/surface.svg',
      __dirname + '/src/surface-plus.svg',
      __dirname + '/src/teapot.svg',
      __dirname + '/src/teapot-check.svg',
      __dirname + '/src/teapot-remove.svg',
      __dirname + '/src/zoom-extents.svg',
    ],
    dest: __dirname,
    fontName: 'LindaleIcons',
    css: true,
    templateOptions: {
      classPrefix: 'l-icon-',
      baseSelector: '.l-icon',
    },
    types: ['eot', 'woff', 'woff2', 'ttf', 'svg'],
    order: ['eot', 'woff', 'woff2', 'ttf', 'svg'],
    fontHeight: 1000,
    normalize: true,
  },

  function (error) {
    if (error) {
      console.log('Fail!', error);
    } else {
      console.log('Done!');
    }
  }
);
