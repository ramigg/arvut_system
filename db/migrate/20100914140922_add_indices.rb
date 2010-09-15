class AddIndices < ActiveRecord::Migration
  def self.up
    change_table :user_activities do |t|
      t.index :activity_id
      t.index :created_at
    end
  end

  def self.down
  end
end
