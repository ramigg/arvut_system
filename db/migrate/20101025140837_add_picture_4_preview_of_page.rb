class AddPicture4PreviewOfPage < ActiveRecord::Migration
  def self.up
    change_table :pages do |t|
      t.string :picture4preview
    end
  end

  def self.down
    remove_column :pages, :picture4preview
  end
end
