module Audit
  class QuestionnaireAnswerObserver < ActiveRecord::Observer
    def after_save(questionnaire_answer)
      questionnaire_answer.user.register_activity('submit questionnaire_answer')
    end
  end
end