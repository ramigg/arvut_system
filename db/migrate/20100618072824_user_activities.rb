class UserActivities < ActiveRecord::Migration
  def self.up
    create_table :activities do |t|
      t.string :title
      t.timestamps
    end
    create_table :user_activities do |t|
      t.integer :user_id
      t.integer :activity_id
      t.timestamps
    end
  end

  def self.down
    drop_table :activities
    drop_table :user_activities
  end
end
