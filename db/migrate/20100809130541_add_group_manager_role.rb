class AddGroupManagerRole < ActiveRecord::Migration
  def self.up
    role = Role.create(:role => 'Groupmanager')
    role.save
  end

  def self.down
  end
end