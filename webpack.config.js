module.exports = {
  // ... (other existing configurations)

  resolve: {
      alias: {
          '@mui/styled-engine': '@mui/styled-engine-sc',
          // ... (any other existing aliases)
      },
      fallback: {
          http: require.resolve('stream-http'),
          https: require.resolve('https-browserify'),
          util: require.resolve('util/'),
          zlib: require.resolve('browserify-zlib'),
          stream: require.resolve('stream-browserify'),
          url: require.resolve('url/'),
          assert: require.resolve('assert/')
          // ... (any other necessary fallbacks)
      },
  },

  // ... (other existing configurations)
};
