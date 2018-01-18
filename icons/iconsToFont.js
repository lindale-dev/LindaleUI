const webfontsGenerator = require('webfonts-generator');
 
webfontsGenerator({
    files: [
        './src/brush-plus.svg',
        './src/cube-plus.svg',
        './src/curve.svg',
        './src/curve-plus.svg',
        './src/eyedropper-plus.svg',
        './src/list-plus.svg',
        './src/marker-multiple-plus.svg',
        './src/mask-exclusive.svg',
        './src/mask-inclusive.svg',
        './src/surface.svg',
        './src/surface-plus.svg',
        './src/teapot.svg',
    ],
    dest: './',
    fontName: 'LindaleIcons',
    css: true,
    templateOptions: {
        classPrefix: 'l-icon-',
        baseSelector: '.l-icon',
    },
    types: ['eot', 'woff', 'woff2', 'ttf', 'svg' ],
    order: ['eot', 'woff', 'woff2', 'ttf', 'svg' ],
    fontHeight: 1000
}, 

function(error) {
    if (error) {
        console.log('Fail!', error);
    } else {
        console.log('Done!');
    }
})