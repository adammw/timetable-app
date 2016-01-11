Rails.application.routes.draw do
  root 'welcome#index'
  get :about, to: 'welcome#about'

  resources :timetable, controller: :activity_allocation, only: [:new, :show, :create]

  resources :subjects, controller: :subject, only: :index do
    resources :activities, controller: :activity, only: :index
    resources :activity_groups, controller: :activity_group, only: :index
  end
end
