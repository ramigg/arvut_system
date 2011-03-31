class AddSocialButtonPrefsToUser < ActiveRecord::Migration
  def self.up
    add_column :users, :button_click_set, :integer
  end

  def self.down
    remove_column :users, :button_click_set
  end
end
