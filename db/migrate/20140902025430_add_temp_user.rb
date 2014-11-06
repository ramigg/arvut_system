class AddTempUser < ActiveRecord::Migration
  def self.up
    create_table :temp_users do |t|
      t.string :email
      t.string :sn_provider
      t.string :sn_id
    end
    add_column :temp_users, :sn_data, :json
  end

  def self.down
    drop_table :temp_users
  end
end
