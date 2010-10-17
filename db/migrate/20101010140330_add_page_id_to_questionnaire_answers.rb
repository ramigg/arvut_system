class AddPageIdToQuestionnaireAnswers < ActiveRecord::Migration
  def self.up
    change_table :questionnaire_answers do |t|
      t.references :page
    end
  end

  def self.down
    remove_column :questionnaire_answers, :page_id
  end
end
