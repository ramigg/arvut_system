class AddLanguages < ActiveRecord::Migration
  def self.up
    create_table :languages do |t|
      t.string :locale
      t.string :language
      t.timestamps
    end
    add_column  :questionnaires, :language_id, :integer
    add_index :languages, :language

    add_column  :users, :language_id, :integer
  end

  def self.down
    remove_column :questionnaires, :language_id
    remove_column :users, :language_id
    drop_table :languages
  end
end
