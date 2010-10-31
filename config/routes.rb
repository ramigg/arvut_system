class CheckPath
  def self.set_pattern
    langs = Language.all.map{|e|e.locale} rescue []
    prefix = Rails.configuration.site_prefix.sub(/^\//,'')
    /#{prefix}\/(#{langs.join('|')})(\/|)/
  end

  def self.matches?(request)
    @@pattern ||= self.set_pattern
    request.path !~ @@pattern
  end
end

class CheckNotLoggedIn
  def self.matches?(request)
    request.env['warden'].unauthenticated? :user
  end
end

Simulator::Application.routes.draw do

  match '*PIE.htc' => "static_files#get_htc"

  get "groups/index"
  get "groups/create"

  match '/' => "redirector#to_login"

  match 'ckeditor/images', :to => 'ckeditor#images'
  match 'ckeditor/files',  :to => 'ckeditor#files'
  match 'ckeditor/create/:kind', :to => 'ckeditor#create'

  langs = Language.all.map{|e|e.locale} rescue []
  pattern = langs.join('|')

  # Redirect to /<locale>/users/login if only /<locale> was supplied and user is not logged in
  constraints(CheckNotLoggedIn) do
    langs.each {|l|
      match "/#{l}" => "redirector#to_login"
    }
  end

  # Redirect to English when no locale is specified
  constraints(CheckPath) do
    match '*path' => "redirector#to_locale"
  end

  scope '/(:locale)', :constraints => {:locale => /#{pattern}/} do

    root :to => 'redirector#to_home'
    match 'dashboard', :to => 'home#dashboard', :as => 'dashboard'

    devise_for :users,
      :path_names => {:sign_in => 'login', :sign_out => 'logout', :sign_up => 'register'},
      :controllers => {:registrations => "profiles/registrations", :confirmations => "profiles/confirmations"}
    match "users/confirmation/awaiting/:id/:confirmation_hash",
      :to => redirect("#{Rails.configuration.site_prefix}/%{locale}/users/confirmations/awaiting/%{id}/%{confirmation_hash}"), :as => "awaiting_confirmation"

    match 'login_help', :to => 'home#login_help', :as => 'login_help'
    
    resources :questionnaire_answers
    
    resources :profiles do
      get 'region_ids/:region_id', :on => :collection, :to => :region_ids, :format => :js
      get 'location_ids/:country_id/:location_id', :on => :collection, :to => :location_ids, :format => :js
    end

    resources :statistics
    
    # HOME
    match 'stream/all', :to => 'stream#index',:stream_filter => 'all', :as => 'home'
    match 'stream/:stream_filter(/:modifier)' => 'stream#index', :as => :stream
    resources :pages
    resources :events do
      get 'event_data/classboard' => 'event_data#classboard', :format => :js
    end
    
    namespace 'admin' do
      resources :pages do
        get 'tag_list', :on => :collection, :format => :js
      end
      resources :reports
      resources :user_lists do
        post 'filtered(.:format)', :to => :index, :as=> 'filtered', :on => :collection
      end
      resources :users_groups
      resources :roles do
        get :autocomplete_user_email, :on => :collection
      end
      resources :basic_reports
      resources :attendance_reports

      resources :questionnaires do
        put :approve, :on => :member
        put :draft, :on => :member
      end

      get  'panel', :to => 'admin_tasks#index'
      get  'autocomplete_user_email', :to => 'admin_tasks#autocomplete_user_email', :as => 'autocomplete_user_email_admin_tasks'
      get  'remove_user', :to => 'admin_tasks#remove_user', :as => 'remove_user'
      delete 'remove_user_action', :to => 'admin_tasks#remove_user_action', :as => 'remove_user_action'
    end

    constraints(CheckNotLoggedIn) do
      match '*path', :to => 'redirector#to_login'
    end
    
    # When no route found - redirect to English Home-page
    match '*path', :to => 'redirector#to_home'
  end

end
