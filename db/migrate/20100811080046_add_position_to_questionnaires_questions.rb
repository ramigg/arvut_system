class AddPositionToQuestionnairesQuestions < ActiveRecord::Migration
  def self.up
    add_column :questionnaires_questions, :id, :primary_key
    add_column :questionnaires_questions, :position, :integer, :default => 0
  end

  def self.down
    remove_column :questionnaires_questions, :id
    remove_column :questionnaires_questions, :position
  end
end
