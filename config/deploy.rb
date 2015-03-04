# config valid only for current version of Capistrano
lock '3.3.5'

set :application, 'danoc.me'
set :repo_url, 'git@github.com:danoc/danoc.me.git'

set :log_level, :info

namespace :deploy do

  before :publishing, :build do
    on roles(:all) do
      execute "cd #{release_path} && sudo bundle install"
      execute "cd #{release_path} && npm install --production --silent --no-spin"
      execute "cd #{release_path} && ./node_modules/.bin/gulp jekyllBuild"
    end
  end

end
