const webfontsGenerator = require('webfonts-generator');
 
webfontsGenerator({
  files: [
    './src/teapot.svg',
  ],
  dest: './',
  fontName: 'LindaleIcons',
  css: false,
}, function(error) {
  if (error) {
    console.log('Fail!', error);
  } else {
    console.log('Done!');
  }
})