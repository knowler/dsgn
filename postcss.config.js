const { argv } = require('yargs');
const isProduction = !!(argv.env && argv.env.production);

const cssnanoConfig = { preset: 'default' };

module.exports = {
  plugins: {
    tailwindcss: './resources/styles/tailwind.js',
    autoprefixer: true,
    cssnano: isProduction ? cssnanoConfig : false
  }
};
