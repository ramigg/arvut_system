class RemoveExtraFieldsFromRolesUsers < ActiveRecord::Migration
  def self.up
    remove_column :roles_users, :created_at
    remove_column :roles_users, :updated_at
  end

  def self.down
    add_column :roles_users, :created_at, :timestamp
    add_column :roles_users, :updated_at, :timestamp
  end
end
