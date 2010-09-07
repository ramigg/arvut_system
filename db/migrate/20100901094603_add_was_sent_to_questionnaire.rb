class AddWasSentToQuestionnaire < ActiveRecord::Migration
  def self.up
    add_column :questionnaires, :was_sent, :boolean, :default => false
  end

  def self.down
    remove_column :questionnaires, :was_sent
  end
end
