class AddLanguageIdToQuestions < ActiveRecord::Migration
  def self.up
    change_table :questions do |t|
      t.references :language
      t.index :language_id
    end
  end

  def self.down
    remove_index :questions, language_id
    remove_column :questions, language_id
  end
end
