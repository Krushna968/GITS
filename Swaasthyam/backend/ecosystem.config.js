module.exports = {
  apps: [{
    name: 'krushnapersonal_db_user',
    script: './server.js',
    instances: 1,
    exec_mode: 'fork',
    env: {
      NODE_ENV: 'production',
    }
  }]
}