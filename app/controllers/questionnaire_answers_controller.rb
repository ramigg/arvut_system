class QuestionnaireAnswersController < ApplicationController
  respond_to :html

  # Display list of my answered questionnaires
  def index
    redirect_to root_url
    return
  end

  def show
    redirect_to root_url
    return

    # @questionnaire = Questionnaire.find(params[:id])
    user_id = params[:user]
    questionnaire_answer_id = params[:id]
    @user = User.find(user_id) || current_user
    @questionnaire_answer = @user.questionnaire_answers.find(questionnaire_answer_id)
    
  end

  # Display a questionnaire to answer to
  def new

    # move to state
    current_user.came_to_answer_questionnaire

    # save specific questionnaire id and redirect according to state machine
    if current_user.specific_q_and_profile_edit?
      session[:specific_q_id] = params[:questionnaire_id]
      eval current_user.redirect, binding()
      return
    end

    # If came with session and without questionniare_id in params than redirect full URL and nullify session
    if session[:specific_q_id]
      questionnaire_id = session[:specific_q_id]
      session[:specific_q_id] = nil
      redirect_to new_questionnaire_answer_url(:questionnaire_id => questionnaire_id)
      return
    end

    questionnaire_id =  params[:questionnaire_id]

      # Checks if the questionnaire exists. If not it redirects to *Home*
    begin
      @questionnaire = Questionnaire.find(questionnaire_id)
    rescue
      session[:alert] = t('questionnaire_answer.controller.no_questionnaire')
      
      # State machine event
      current_user.specific_questionnaire_is_already_answered_or_not_found
      eval current_user.redirect, binding()
      return
    end

    #Check whether this questionnaire was already answered
    if false #!(current_user.is_admin? || current_user.is_moderator?) && @questionnaire.answered_questionnaire?(current_user)
      session[:alert] = t('questionnaire_answer.controller.already_answered')
      
      # State machine event
      current_user.specific_questionnaire_is_already_answered_or_not_found
      eval current_user.redirect, binding()
      return
    end


    # Create a new answers instance to be filled in form
    @questionnaire_answer = QuestionnaireAnswer.new
    @questionnaire_answer.author = current_user
    @questionnaire_answer.questionnaire = @questionnaire

    # For each question we have to create an 'answer' field
    @questionnaire_answer.answers = QuestionnaireAnswer.prepare_answers(@questionnaire)
  end

  # Record my answers
  def create
    @questionnaire_answer = QuestionnaireAnswer.new(params[:questionnaire_answer])
    if @questionnaire_answer.save
      session[:notice] = t('questionnaire_answer.controller.was_success')

      # State machine event
      current_user.finished_answering_questionnaire
      eval current_user.redirect, binding()
      return
    else
      session[:alert] = t('questionnaire_answer.controller.no_success')
      render :action => "new"
    end
    
    
  end
end
