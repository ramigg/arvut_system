class ConvertDescriptionOfQuestionToText < ActiveRecord::Migration
  def self.up
    change_column :questions, :description, :text
  end

  def self.down
    change_column :questions, :description, :string
  end
end
