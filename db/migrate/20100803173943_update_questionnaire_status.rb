class UpdateQuestionnaireStatus < ActiveRecord::Migration
  def self.up
    Questionnaire.all.each { |q|
      q.status = 'PUBLISHED'
      q.save
    }
  end

  def self.down
  end
end
