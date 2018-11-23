namespace :build do
  desc 'Build client and copy assets to public'
  task :client do
    exec 'yarn --cwd client install && yarn --cwd client build && rm -rf public/* && cp -a client/build/. public/'
  end
end
