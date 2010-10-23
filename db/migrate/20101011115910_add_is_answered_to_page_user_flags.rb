class AddIsAnsweredToPageUserFlags < ActiveRecord::Migration
  def self.up
    change_table :page_userflags do |t|
      t.boolean :is_answered
    end
  end

  def self.down
    remove_column :page_userflags, :is_answered
  end
end
