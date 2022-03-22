// We need to alter CRA's default behavior to use an external Typescript package

const { addWebpackAlias, removeModuleScopePlugin } = require('customize-cra');
const path = require('path');

module.exports = function override(config) {
  // Needed to import modules located outside of the app (esp. lindale-ui)
  config = removeModuleScopePlugin()(config);

  // Needed or we get strange "Invalid Hook Call" errors due to mismatching React versions,
  // even though the versions in the demo/package seem to match.
  config = addWebpackAlias({
    //react: path.resolve('./node_modules/react'),
    //'react-dom': path.resolve('./node_modules/react-dom')
  })(config);

  // Needed to parse Typescript files located outside of the app
  // https://stackoverflow.com/a/70256204
  // https://stackoverflow.com/questions/65893787/create-react-app-with-typescript-and-npm-link-enums-causing-module-parse-failed.
  config.module.rules[1].oneOf[3].include = [
    path.join(__dirname, './src'),
    path.join(__dirname, '../')
  ];

  return config;
};
