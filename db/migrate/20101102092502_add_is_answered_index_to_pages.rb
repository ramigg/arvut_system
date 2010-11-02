class AddIsAnsweredIndexToPages < ActiveRecord::Migration
  def self.up
    add_index :page_userflags, :is_answered
  end

  def self.down
    remove_index :page_userflags, :is_answered
  end
end