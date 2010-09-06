class AddExcerptToQuestionnaire < ActiveRecord::Migration
  def self.up
    add_column :questionnaires, :excerpt, :text
  end

  def self.down
    remove_column :questionnaires, :excerpt
  end
end
