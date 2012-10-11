class CommentsController < ApplicationController

  before_filter :set_params

  def index
    parent_id = params[:parent_id]
    @parent_page = Page.find(parent_id) rescue nil
    return unless @parent_page
    @comments = Page.comments(@parent_page.id, @lang_id)

    if @parent_page && @parent_page.comments_enabled?
      @new_comment = Page.new(
          :language_id => @lang_id,
          :parent_id => @parent_page.id
      )
    end

  end

  def create
    args = params[:page].merge(
        :author_id => current_user.id,
        :status => 'PUBLISHED',
        :page_type => 'message',
        :publish_at => Time.zone.now
    )

    @new_comment = Page.new(args)
    @new_comment.assets.sort! { |a, b| a.position <=> b.position } if @new_comment.assets.present?
    parent = Page.find(@new_comment.parent_id) rescue nil
    if parent && parent.comments_enabled? && @new_comment.save
      @new_comment = Page.new(
          :language_id => @lang_id,
          :parent_id => parent.id
      )
    end
    @comments = Page.comments(parent.id, @lang_id)
    render :index
  end

  private

  def set_params
    @lang_id = Language.get_id_by_locale(@locale)
  end

end
