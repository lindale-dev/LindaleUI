const webfontsGenerator = require('webfonts-generator');
 
webfontsGenerator({
    files: [
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