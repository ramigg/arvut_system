class PagesController < ApplicationController

  respond_to :html, :js
  before_filter :adjust_format_for_ie8
  
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
    @page.toggle_read(current_user)
    render :template => 'shared/toggle_is_read.js.erb'
  end

end
