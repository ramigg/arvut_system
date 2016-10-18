class AddAdWasShownToUsers < ActiveRecord::Migration
  def self.up
    add_column :users, :ad_was_shown, :boolean, null: false, default: false
  end

  def self.down
    remove_column :users, :ad_was_shown
  end
end
