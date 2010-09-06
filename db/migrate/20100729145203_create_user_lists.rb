class CreateUserLists < ActiveRecord::Migration
  def self.up
    create_table :user_lists do |t|
      t.string :email
      t.string :first_name
      t.string :last_name

      t.integer :users_group_id

      t.timestamps
    end
    add_index  :user_lists, :users_group_id

    add_column :users, :user_list_id, :integer
    add_index  :users, :user_list_id
  end

  def self.down
    drop_table :user_lists

    remove_column :users, :user_list_id
  end
end
