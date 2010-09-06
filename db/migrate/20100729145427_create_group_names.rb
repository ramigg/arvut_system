class CreateGroupNames < ActiveRecord::Migration
  def self.up
    create_table :users_groups do |t|
      t.string :name

      t.timestamps
    end
  end

  def self.down
    drop_table :users_groups
  end
end
