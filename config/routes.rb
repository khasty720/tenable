Rails.application.routes.draw do


  namespace :api do
    namespace :v1 do
      mount_devise_token_auth_for 'User', at: 'auth'

      resources :posts
    end
  end

  get '*path', to: "application#fallback_index_html", constraints: ->(request) do
    !request.xhr? && request.format.html?
  end

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
