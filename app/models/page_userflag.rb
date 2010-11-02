class PageUserflag < ActiveRecord::Base
  belongs_to :page
  belongs_to :user

  # scope for_user, lanbda{|user_id, page_id| where(:user_id => user_id, page_id => page_id)}
  
  def self.add_flag(page, user, flag_name)
    flag_name = flag_name.to_sym
    options = {:page_id => page.id, :user_id => user.id}
    record = where(options).first
    if record
      record.update_attribute(flag_name, true) 
    else
      options.merge!({flag_name => true})
      create(options)
    end
  end

end