const withTM = require('next-transpile-modules')(['@proton/web-sdk']);

module.exports = withTM({
  images: {
    domains: [
      'cloudflare-ipfs.com',
      'gateway.pinata.cloud',
      'ipfs.io',
      'bloks.io',
    ],
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: /\.(js|ts)x?$/,
      use: ['@svgr/webpack', 'url-loader'],
    });

    return config;
  }
});