class AddProfileFieldsToUser < ActiveRecord::Migration
  def self.up
    add_column :users, :gender, :string, :null => true
    add_column :users, :birthday, :string, :null => true
    add_column :users, :notifybyemail, :string, :null => true
  end

  def self.down
    remove_column :users, :gender
    remove_column :users, :birthday
    remove_column :users, :notifybyemail
  end
end
