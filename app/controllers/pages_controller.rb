class PagesController < ApplicationController
  protect_from_forgery :except => [:toggle_is_bookmark, :toggle_is_read]

  respond_to :html, :js
  before_filter :adjust_format_for_ie8

  has_widgets do |stream|
    stream << widget('pages_admin', 'comments_form', :display_comments_form, :current_user => current_user, :parent_id => params[:id])
    stream << widget('pages_admin', 'comments', :display_comments, :current_user => current_user, :parent_id => params[:id])
  end


  def show_button_content
    @page = Page.get_random_button_content
  end

  def show
    @page = Page.find(params[:id])

    @qa = QuestionnaireAnswer.new
    @qa.author = current_user
    @qa.answers = QuestionnaireAnswer.prepare_answers(@page)

    @questionnaire_answers = []
    @questionnaire_answers << @qa

    @profile = current_user
    PageUserflag.add_flag(@page, current_user, :is_read)

    respond_with @page
  end

  # put
  def update
    @page = Page.find(params[:id])
    # if @page.update_attributes(params[:page])
    @page.attributes = params[:page]
    if @page.save(:validate => false)
      flash[:notice] = I18n.t 'pages.update.was_successful'
      # close popup
      @passed_validation = true
      PageUserflag.add_flag(@page, current_user, :is_answered) if @page.is_assignment?
    else
      # Failure
      flash[:error] = I18n.t 'pages.update.failed'
    end
    respond_with @page
  end

  def toggle_is_read
    @page = Page.find(params[:id])
    @page.toggle_flag(current_user, 'is_read')
    render :template => 'shared/toggle_flag.js.erb'
  end

  def toggle_is_bookmark
    @page = Page.find(params[:id])
    @page.toggle_flag(current_user, 'is_bookmark')
    render :template => 'shared/toggle_flag.js.erb'
  end


end
