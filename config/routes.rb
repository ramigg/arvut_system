class CheckPath
  def self.set_pattern
    langs = Language.all.map { |e| e.locale } rescue []
    prefix = Rails.configuration.site_prefix.sub(/^\//, '')
    /#{prefix}\/(#{langs.join('|')})(\/|)|render_event_response/
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

class CheckLoggedIn
  def self.matches?(request)
    request.env['warden'].authenticated? :user
  end
end

class CheckMobileLoggedIn
  def self.is_mobile?(request)
    # All mobiles
    #/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.match(request.user_agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.match(request.user_agent[0..3])
    # Selected mobiles
    /iphone|ipad|ipod|android|blackberry|symbian|windows\sce/i.match(request.user_agent)
  end

  def self.matches?(request)
    is_mobile?(request) && request.env['warden'].authenticated?(:user) && request.cookies['mobile'] == 'true'
  end
end

Simulator::Application.routes.draw do

  devise_for :users, :controllers => {
      :registrations      => 'profiles/registrations',
      :omniauth_callbacks => 'users/omniauth_callbacks',
      :sessions           => 'users/sessions'
  }

  namespace :api do
    namespace :v1 do
      resources :tokens, :only => [:create, :destroy]
      resource :streams, :except => %w(new edit show update create destroy) do
        post 'set_stream_items'
        get 'get_lookup_table'
        get 'test'
        post 'set_stream_state'
        get 'get_stream_state'
        post 'set_mobile_audio_streams'
      end
    end
  end

  resource :tolk do
    root :to => 'tolk/locales#index'
    resources :locales, :controller => "tolk/locales" do
      get :all, :on => :member
      get :updated, :on => :member
    end
    resource :search, :controller => "tolk/searches"
  end

  #match ":controller/render_event_response", :to => "#render_event_response", :as => "apotomo_event"
  match "admin_tasks/render_event_response", :to => "admin/admin_tasks#render_event_response"

  match '*PIE.htc' => "static_files#get_htc"

  get "groups/index"
  get "groups/create"

  match '/' => "redirector#to_login"

  match 'ckeditor/images', :to => 'ckeditor#images'
  match 'ckeditor/files', :to => 'ckeditor#files'
  match 'ckeditor/create/:kind', :to => 'ckeditor#create'

  langs = Language.all.map { |e| e.locale } rescue []
  pattern = langs.join('|')

  constraints(CheckMobileLoggedIn) do
    langs.each { |l|
      match "/#{l}", :to => 'mobile#index', :locale => l
    }
  end

  constraints(CheckLoggedIn) do
    langs.each { |l|
      match "/#{l}" => "stream#index", :locale => l, :stream_filter => 'all'
    }
  end

  # Redirect to /<locale>/users/login if only /<locale> was supplied and user is not logged in
  constraints(CheckNotLoggedIn) do
    langs.each { |l|
      match "/#{l}" => "redirector#to_login"
    }
  end

  # Redirect to English when no locale is specified
  constraints(CheckPath) do
    match '*path' => "redirector#to_locale"
  end

  scope '/(:locale)', :constraints => { :locale => /#{pattern}/ } do

    root :to => 'stream#index', :stream_filter => 'all'
    match 'dashboard', :to => 'home#dashboard', :as => 'dashboard'
    resources :mobile

    match 'tv/:preset_id', :to => "static_pages#tv", :as => :tv

    devise_for :users,
               :path_names  => { :sign_in => 'login', :sign_out => 'logout', :sign_up => 'register' },
               :controllers => {
                   :confirmations      => 'profiles/confirmations',
                   :sessions           => 'users/sessions'
               }
    match "users/confirmation/awaiting/:id/:confirmation_hash",
          :to => redirect("#{Rails.configuration.site_prefix}/%{locale}/users/confirmations/awaiting/%{id}/%{confirmation_hash}"), :as => "awaiting_confirmation"
    match 'oauth_redirect', to: 'oauth#redirect', as: 'oauth_redirect'

    match 'login_help', :to => 'home#login_help', :as => 'login_help'

    resources :questionnaire_answers

    resources :profiles do
      get 'region_ids/:region_id', :on => :collection, :to => :region_ids, :format => :js
      get 'location_ids/:country_id/:location_id', :on => :collection, :to => :location_ids, :format => :js
    end

    resources :statistics
    resources :user_complains

    # HOME
    match 'stream/all', :to => 'stream#index', :stream_filter => 'all', :as => 'home'
    match 'stream/:stream_filter(/:modifier)' => 'stream#index', :as => :stream

    resources :pages do
      put 'toggle_is_read', :on => :member
      put 'toggle_is_bookmark', :on => :member
      get 'show_button_content', :on => :collection
    end

    resources :comments, :only => [:index, :create]

    resources :events

    namespace 'admin' do

      resources :pages do
        get 'tag_list', :on => :collection, :format => :js
      end
      resources :reports
      resources :user_lists do
        post 'filtered(.:format)', :to => :index, :as => 'filtered', :on => :collection
      end
      resources :users_groups
      resources :roles do
        get :autocomplete_user_email, :on => :collection
      end
      resources :basic_reports do
        get :generate_report, :on => :collection
      end
      resources :attendance_reports
      resources :questionnaire_reports do
        get :generate_report, :on => :collection
      end

      resources :questionnaires do
        put :approve, :on => :member
        put :draft, :on => :member
      end

      get 'panel', :to => 'admin_tasks#index'
      get 'clear_cache', :to => 'admin_tasks#clear_cache'
      get 'autocomplete_user_email', :to => 'admin_tasks#autocomplete_user_email', :as => 'autocomplete_user_email_admin_tasks'
      get 'remove_user', :to => 'admin_tasks#remove_user', :as => 'remove_user'
      get 'stream_management', :to => 'admin_tasks#stream_management', :as => 'stream_management'

      delete 'remove_user_action', :to => 'admin_tasks#remove_user_action', :as => 'remove_user_action'
    end

    constraints(CheckNotLoggedIn) do
      match '*path', :to => 'redirector#to_login'
    end

    # When no route found - redirect to English Home-page
    match '*path', :to => 'redirector#to_home'
  end

end
