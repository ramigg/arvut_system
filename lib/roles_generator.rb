# To create a questionnaire run
# RolesGenerator::GenerateAdmin.run(email)

module RolesGenerator

  class GenerateAdmin
    def self.run(email)
      user = User.where(:email => email).first
      role = Role.where(:role => 'Admin').first
      user.roles << role
      user.save
    end
  end
end
