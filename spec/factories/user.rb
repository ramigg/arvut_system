Factory.define :user, :default_strategy => :build do |u|
  u.email { Factory.next(:username) }
  u.password { Factory.next(:password) }
  u.roles { Factory.next(:roles) }
end