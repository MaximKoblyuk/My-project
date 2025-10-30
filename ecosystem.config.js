module.exports = {
  apps: [
    {
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
      env_production: {
        NODE_ENV: 'production',
        PORT: 3000
      },
      log_file: '/var/log/pm2/fixpoints.log',
      out_file: '/var/log/pm2/fixpoints-out.log',
      error_file: '/var/log/pm2/fixpoints-error.log',
      time: true,
      combine_logs: true
    }
  ]
}