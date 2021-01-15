# config valid for current version and patch releases of Capistrano
lock "~> 3.15.0"

set :application, "eid4u"
set :repo_url, 'https://github.com/ging/ETSIT-erasmus.git'
set :branch, :master

# Default branch is :master
# ask :branch, `git rev-parse --abbrev-ref HEAD`.chomp

# Default deploy_to directory is /var/www/my_app_name
 set :deploy_to, "/u/apps/eid4u"
 set :deploy_via, :remote_cache
 set :rbenv_ruby, '2.5.1'
 set :keep_releases, 3
 set :rails_env,     "production"
 set :use_sudo,      false

set :linked_dirs, fetch(:linked_dirs, []).push('log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'vendor/bundle', 'vendor/certs', 'public/system', 'public/erasmus')
 append :linked_files, 'config/database.yml', 'config/config.yml', 'config/secrets.yml', 'vendor/certs/cert.pem', 'vendor/certs/key.pem', 'vendor/saml2-node/eidas.json'

 set :pty,             true
 set :stages,          ["staging", "production"]
 set :default_stage,   "production"
 set :puma_bind,       "unix://#{shared_path}/tmp/sockets/#{fetch(:application)}-puma.sock"
 set :puma_state,      "#{shared_path}/tmp/pids/puma.state"
 set :puma_pid,        "#{shared_path}/tmp/pids/puma.pid"
 set :puma_access_log, "#{release_path}/log/puma.error.log"
 set :puma_error_log,  "#{release_path}/log/puma.access.log"
 set :puma_preload_app, true
 set :puma_worker_timeout, nil
 set :puma_init_active_record, true

# Default value for :format is :airbrussh.
# set :format, :airbrussh

# You can configure the Airbrussh format using :format_options.
# These are the defaults.
# set :format_options, command_output: true, log_file: "log/capistrano.log", color: :auto, truncate: :auto

# Default value for :pty is false
# set :pty, true

# Default value for :linked_files is []
# append :linked_files, "config/database.yml"

# Default value for linked_dirs is []
# append :linked_dirs, "log", "tmp/pids", "tmp/cache", "tmp/sockets", "public/system"

# Default value for default_env is {}
# set :default_env, { path: "/opt/ruby/bin:$PATH" }

# Default value for local_user is ENV['USER']
# set :local_user, -> { `git config user.name`.chomp }

# Default value for keep_releases is 5
# set :keep_releases, 5

# Uncomment the following to require manually verifying the host key before first deploy.
# set :ssh_options, verify_host_key: :secure
