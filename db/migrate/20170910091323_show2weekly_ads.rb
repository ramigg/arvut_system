class Show2weeklyAds < ActiveRecord::Migration
  def self.up
    add_column :users, :ad_2w_was_shown, :integer
  end

  def self.down
    remove_column :users, :ad_2w_was_shown
  end
end
