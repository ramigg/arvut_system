class AddNewRoles < ActiveRecord::Migration
  def self.up
    role = Role.create(:role => 'Moderator')
    role.save
    role = Role.create(:role => 'Reports')
    role.save
  end

  def self.down
  end
end
