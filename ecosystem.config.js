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
      log_file: '/home/maximadmin/.pm2/logs/fixpoints.log',
      out_file: '/home/maximadmin/.pm2/logs/fixpoints-out.log',
      error_file: '/home/maximadmin/.pm2/logs/fixpoints-error.log',
      time: true,
      combine_logs: true
    }
  ]
}