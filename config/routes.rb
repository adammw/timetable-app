Rails.application.routes.draw do
  root 'welcome#index'
  get :about, to: 'welcome#about'

  resources :timetable, controller: :activity_allocation, only: [:new, :show, :create]
end
