class Admin::QuestionnairesController < ApplicationController
  before_filter :check_if_moderator

  respond_to :html


  # get
  def index
    locale = I18n.default_locale || 'en'
    lang_id = Language.get_id_by_locale(locale)
    @questionnaires = Questionnaire.where(:language_id => lang_id).all.sort_by { |e| e.created_at }.reverse[0...10]
  end

  # get
  def show

  end

  # get
  def new
    locale = I18n.default_locale || 'en'
    lang_id = Language.get_id_by_locale(locale)
    @questionnaire = Questionnaire.new(:language_id => lang_id, :author_id => current_user.id)
    3.times do
      question = Checkbox.new(:author_id => current_user.id)
      @questionnaire.questions << question
      4.times { question.entries.build }

    end
    respond_with(@questionnaire)
  end

  # post
  def create
    @questionnaire = Questionnaire.new(params[:questionnaire])
    @questionnaire.status = 'DRAFT'
    if @questionnaire.save
      flash[:notice] = 'Successfully created questionnaire'
    end
    respond_with(@questionnaire, :location => questionnaires_url)
  end

  # get
  def edit
    @questionnaire = Questionnaire.find(params[:id])
  end

  # put
  def update
    @questionnaire = Questionnaire.find(params[:id])
    if @questionnaire.update_attributes(params[:questionnaire])
      flash[:notice] = "Successfully updated questionnaire."
    end
    respond_with(@questionnaire, :location => questionnaires_url)
  end

  #  put
  def approve
    change_status('PUBLISHED')
    flash[:notice] = 'Successfully destroyed questionnaire'
    respond_with(@questionnaire, :location => questionnaires_url)
  end

  #  put
  def draft
    change_status('DRAFT')
    flash[:notice] = 'Successfully destroyed questionnaire'
    respond_with(@questionnaire, :location => questionnaires_url)
  end

  # delete
  def destroy
    change_status('DELETED')
    flash[:notice] = 'Successfully destroyed questionnaire'
    respond_with(@questionnaire, :location => questionnaires_url)
  end

  private

  def change_status(status)
    @questionnaire = Questionnaire.find(params[:id])
    @questionnaire.update_attribute(:status, status)
  end

end