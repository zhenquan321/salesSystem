module.exports = {
  apps: [
    {
      name: 'salesSystem',
      script: './dist/index.js',
      watch: true,
      env: {
        NODE_ENV: 'production'
      }
    }
  ]
};
