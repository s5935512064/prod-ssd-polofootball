const withPlugins = require("next-compose-plugins");
const webpack = require("webpack");
const withImages = require('next-images')
const withTM = require("next-transpile-modules")(["@fancyapps/ui", "@emotion/react", "vanilla-cookieconsent"]); // pass the modules you would like to see transpiled
/** @type {import('next').NextConfig} */


const nextConfig = {
  reactStrictMode: false,

  images: {
    domains: ['scontent-kut2-2.xx.fbcdn.net', 'polofootballpark.com', 'scontent.fbkk10-1.fna.fbcdn.net', "scontent-kut2-1.xx.fbcdn.net"],
    formats: ['image/avif', 'image/webp'],
  },
  i18n: {
    // providing the locales supported by your application
    locales: ["en", "th"],
    //  default locale used when the non-locale paths are visited
    defaultLocale: "en",
  },
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    config.plugins.push(
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
      })
    );
    if (isServer) {
      require("./scripts/sitemap-generator");
    }
    return config;
  },
};

module.exports = withPlugins([nextConfig, withTM]);
