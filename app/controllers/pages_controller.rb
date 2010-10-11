class PagesController < ApplicationController

  respond_to :html, :js
  
  def show
    @page = Page.find(params[:id])

    @questionnaire_answer = QuestionnaireAnswer.new
    @questionnaire_answer.author = current_user
    @questionnaire_answer.answers = QuestionnaireAnswer.prepare_answers(@page)

    @profile = current_user
  end

end
