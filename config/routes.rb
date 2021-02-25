Rails.application.routes.draw do
  root 'home#index'

  resources :users, only: %i[index show create update delete]
end
