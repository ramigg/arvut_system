class IncreasePluginsField < ActiveRecord::Migration
  def self.up
    change_column :user_complains, :user_agent, :text
  end

  def self.down
  end
end
