module.exports = {
  apps: [
    {
      name: 'gardensuite-landing',
      script: './build/index.js',
      env: {
        PORT: 80,
        NODE_ENV: 'production'
      }
    }
  ]
};
