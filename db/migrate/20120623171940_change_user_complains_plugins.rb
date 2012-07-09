class ChangeUserComplainsPlugins < ActiveRecord::Migration
  def self.up
    change_column :user_complains, :plugins, :text
  end

  def self.down
    change_column :user_complains, :plugins, :string
  end
end
