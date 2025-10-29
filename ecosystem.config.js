module.exports = {
  apps: [{
    name: 'fixpoints',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/fixpoints',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '1G',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/fixpoints-error.log',
    out_file: '/var/log/pm2/fixpoints-out.log',
    log_file: '/var/log/pm2/fixpoints-combined.log',
    time: true
  }]
};