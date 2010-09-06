class AddStatusToQuestionnaire < ActiveRecord::Migration
  def self.up
    add_column :questionnaires, :status, :string
    add_index  :questionnaires, :status

  end

  def self.down
    remove_column :questionnaires, :status
    remove_index :questionnaires, :status
  end
end
