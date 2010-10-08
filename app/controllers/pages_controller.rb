class PagesController < ApplicationController

  respond_to :html, :js
  
  # Accepts the following:
  # stream/assignments
  # stream/assignments/new = :klass/:item(/:modifier)
  def stream
    @stream_filter ||= params[:stream_filter]
    modifier ||= params[:modifier]

    if @stream_filter == 'tag'
      @stream_header = "Tag: #{modifier}"
      @stream_subclass = "by tag"
    else
      @stream_header = @stream_filter.humanize.pluralize
      @stream_subclass = @stream_header.singularize.downcase
    end
    @is_new = modifier == 'new'
    @language_id = Language.get_id_by_locale(I18n.locale)
    @tags = Page.all_tags(I18n.locale)

    @user_confirmation_date = current_user.confirmed_at

    @pages =  Page.by_page_type(@stream_filter, @language_id, @user_confirmation_date).ordered
    @profile = current_user
    respond_with @pages

  end

end
