class AddUserComplains < ActiveRecord::Migration
  def self.up
    create_table :user_complains do |t|
      t.integer :user_id
      t.string :user_agent
      t.string :platform
      t.string :oscpu
      t.string :buildid
      t.string :plugins
      t.text   :message
      t.string :language_id
      t.string :technology_id
      t.string :quality_url

      t.timestamps
    end

    add_index :user_complains, :user_id
  end

  def self.down
    drop_table :user_complains
  end
end
