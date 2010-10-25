class PageUserflag < ActiveRecord::Base
  belongs_to :page
  belongs_to :user

  # scope for_user, lanbda{|user_id, page_id| where(:user_id => user_id, page_id => page_id)}
  
  def self.mark_as_answered(page, user)
    options = {:page_id => page.id, :user_id => user.id}
    record = where(options).first
    if record
      record.update_attribute(:is_answered, true) 
    else
      options.merge!({:is_answered => true})
      create(options)
    end
  end

end