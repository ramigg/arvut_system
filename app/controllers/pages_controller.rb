class PagesController < ApplicationController

  respond_to :html, :js
  
  def show
    @page = Page.find(params[:id])

    @qa = QuestionnaireAnswer.new
    @qa.author = current_user
    @qa.answers = QuestionnaireAnswer.prepare_answers(@page)

    @questionnaire_answers = []
    @questionnaire_answers << @qa

    @profile = current_user
  end

  # put
  def update
    @page = Page.find(params[:id])
    if @page.update_attributes(params[:page])
      flash[:notice] = "Successfully updated page."
    end
    respond_with(:admin, @page, :location => home_url)
  end

end
