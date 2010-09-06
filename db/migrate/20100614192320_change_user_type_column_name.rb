class ChangeUserTypeColumnName < ActiveRecord::Migration
  def self.up
    rename_column :answers, :type, :user_type
  end
 
  def self.down
    rename_column :answers, :user_type, :type
  end
end
