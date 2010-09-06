class ConvertType2QuestionType < ActiveRecord::Migration
  def self.up
    rename_column :questions, :type, :question_type
  end

  def self.down
    rename_column :questions, :question_type, :type
  end
end
