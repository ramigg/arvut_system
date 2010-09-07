class QuestionnairesQuestion < ActiveRecord::Base
  belongs_to :questionnaire
  belongs_to :question

  acts_as_list :scope => 'questionnaire_id = #{questionnaire_id} AND question_id = #{question_id}'
end
