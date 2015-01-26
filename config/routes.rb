Rails.application.routes.draw do
  root 'welcome#index'

  resources :timetable, controller: :activity_allocation, only: [:new, :show, :create]
end
