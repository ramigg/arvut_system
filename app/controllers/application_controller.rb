require "application_responder"

class ApplicationController < ActionController::Base
  self.responder = ApplicationResponder

  before_filter :set_locale, :authenticate_user!
  protect_from_forgery
  layout 'application'
  helper :layout
  helper_method :is_mobile?

  # Include widgets
  include Apotomo::Rails::ControllerMethods
    has_widgets do |root|
      root << widget(:blog_widget, 'blog', :display)
      root << widget(:profile_widget, 'profile', :display, :user => current_user)
      root << widget(:tags_widget, 'tags', :display)
      #root << widget(:banners_widget, 'banners', :display)
      root << widget(:social_button, 'social_button', :display, :user => current_user)
    end

  def set_locale
    I18n.locale = @locale = params[:locale]
#    cookies[:sviva_tova_locale] = {:value => @locale, :expires => 10.years.from_now, :domain => 'localhost' }
    response.headers['Set-Cookie'] = "sviva_tova_locale=#{@locale}; path=/; expires=#{I18n.l(1.year.from_now, :locale => :en, :format => "%a, %d-%b-%Y %H:%M:%S GMT")}"
  end

  # For any url_for (except devise)
  def default_url_options(options={})
    { :locale => (params[:locale] || I18n.locale) }
  end

  # Devise plugin only
  def self.default_url_options(options={})
    { :locale => I18n.locale }
  end

  def check_if_admin
    redirect_to :home unless current_user.is_admin?
  end

  def check_if_restricted
    redirect_to :home unless current_user.is_restricted?
  end

  def check_if_moderator
    redirect_to :home unless current_user.is_admin? || current_user.is_super_moderator? || current_user.is_moderator?
  end

  def check_if_groupmanager
    redirect_to :home unless current_user.is_admin? || current_user.is_groupmanager?
  end

  def check_if_reports
    redirect_to :home unless current_user.is_admin? || current_user.is_reports?
  end

  def is_mobile?
    # All mobiles
    #/android.+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.match(request.user_agent) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.match(request.user_agent[0..3])
    # Selected mobiles
    /iphone|ipad|ipod|android|blackberry|symbian|windows\sce/i.match(request.user_agent)
  end

  def is_ios?
    /iphone|ipod|ipad/i.match(request.user_agent)
  end

  def is_3gp?
    /android|symbian|blackberry/i.match(request.user_agent)
  end

  def is_microsoft?
    /windows\sce/i.match(request.user_agent)
  end
end

module Devise::Controllers::Helpers
  def after_sign_in_path_for(resource_or_scope)
    scope = Devise::Mapping.find_scope!(resource_or_scope)
    home_path = :"#{scope}_root_path"
    respond_to?(home_path, true) ? send(home_path) : root_path
  end

  def stored_location_for(resource_or_scope)
    scope = Devise::Mapping.find_scope!(resource_or_scope)
    url = session.delete(:"#{scope}_return_to")
    url
  end

  def adjust_format_for_ie8
    request.format = :js if request.xhr? && request.env['HTTP_ACCEPT'] == '*/*' # IE8 problems
  end

end
