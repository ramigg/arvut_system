class PagesAdmin < Apotomo::Widget

  helper_method :current_user, :ckeditor_toolbar
  responds_to_event :submit, :with => :process_form

  before_filter :prepare_params

  def prepare_params
    @lang_id = Language.get_id_by_locale(@locale)
    @parent_id = param(:parent_id)
  end

  private(:prepare_params)

  def process_form
    if params[:page][:message_body].empty?
      @success = false
      @specific_message = 'Please write something'
    else
      @page = Page.new(params[:page])
      @page.assets.sort! { |a, b| a.position <=> b.position } if @page.assets.present?
      @page.publish_at = Time.zone.now
      @success = @page.save :validate => false
    end
    render
  end

  def ckeditor_toolbar(klass = 'Min')
    is_rtl? ? "#{klass}_he" : klass
  end

  def is_rtl?
    I18n.locale == :he
  end

  def current_user
    @current_user ||= param :current_user
  end

  def display_comments
    return unless @parent_id
    @comments = Page.comments @parent_id, @lang_id
    render
  end
end
