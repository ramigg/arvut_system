class AddParentToPages < ActiveRecord::Migration
  def self.up
    change_table :pages do |t|
      t.integer :parent_id
      t.index :parent_id
      t.boolean :comments_enabled
    end
  end

  def self.down
    remove_index :pages, :parent_id
    remove_column :pages, :parent_id
    remove_column :pages, :comments_enabled
  end
end
