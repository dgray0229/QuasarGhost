// https://github.com/michael-ciniawsky/postcss-load-config

// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = (ctx) => ({
  parser: ctx.parser ? 'sugarss' : false,
  map: ctx.env === 'development' ? ctx.map : false,
  // to edit target browsers: use "browserslist" field in package.json

  plugins: [
    require('postcss-import'),
    require('postcss-reporter'),
    require('postcss-url'),
  ],
});
