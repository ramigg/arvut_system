class CreateRoles < ActiveRecord::Migration
  def self.up
    create_table :roles do |t|
      t.string :role
    end

    create_table :roles_users, :id => false do |t|
      t.integer :role_id
      t.integer :user_id
      t.timestamps
    end

    role = Role.create(:role => 'Anonymous')
    role.save
    regular = Role.create(:role => 'Regular')
    regular.save
    role = Role.create(:role => 'Admin')
    role.save
    role = Role.create(:role => 'Super')
    role.save

    User.all.each { |u|
      u.roles << regular
      u.save
    }
  end

  def self.down
    drop_table :roles
    drop_table :roles_users
  end
end
