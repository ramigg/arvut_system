class StreamController < ApplicationController

  respond_to :html, :js
  
  # Accepts the following:
  # stream/assignments
  # stream/assignments/new = :klass/:item(/:modifier)
  def index
    @stream_filter ||= params[:stream_filter]
    modifier ||= params[:modifier]

    @language_id = Language.get_id_by_locale(I18n.locale)
    @is_new = modifier == 'new'
    @user_confirmation_date = current_user.confirmed_at

    if @stream_filter == 'tag'
      @stream_header = "Tag: #{modifier}"
      @stream_subclass = "by tag"
      @pages =  Page.tagged_with(modifier).by_page_type(@stream_filter, @language_id, @user_confirmation_date).ordered
    else
      @stream_header = @stream_filter.humanize.pluralize
      @stream_subclass = @stream_header.singularize.downcase
      @pages =  Page.by_page_type(@stream_filter, @language_id, @user_confirmation_date).ordered
    end
    @tags = Page.all_tags(I18n.locale)

    @profile = current_user
    respond_with @pages

  end

end
