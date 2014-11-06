class AddForeignInfoToUser < ActiveRecord::Migration
  def self.up
    add_column :users, :sn_provider, :string
    add_column :users, :sn_id, :string
    add_column :users, :sn_data, :json
  end

  def self.down
    remove_column :users, :sn_data
    remove_column :users, :sn_id
    remove_column :users, :sn_provider
  end
end
