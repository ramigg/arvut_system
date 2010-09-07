Given /^the following (.+) records?$/ do |factory, table|
  table.hashes.each { |hash|
    roles = []
    hash.delete('role').split(', ').each{ |role|
      roles << Role.find_by_role(role)
    }
    hash['roles'] = roles
    # Fill in required fields
    User::PROFILE_FIELDS.each{ |field|
      next unless field[:required]
      next if hash[field[:id]] != nil
      case field[:type]
      when 'text'
        hash[field[:id]] = 'text'
      when 'radio'
        hash[field[:id]] = field[:options].values[0]
      when 'range'
        hash[field[:id]] = field[:range].first
      end
    }
    user = Factory(factory, hash)
    user.confirm! # Force confirmation as we don't want to send email
    user.save!
  }
end

Given /^I am logged in as "([^"]*)" with password "([^"]*)"$/ do |username, password|
  #visit '/en/users/login' #user_session_url(:locale => 'en', :format => 'html')
  #current_path.should == '/'
  fill_in "Email", :with => username
  fill_in "Password", :with => password
  click_link "user_submit"
end
