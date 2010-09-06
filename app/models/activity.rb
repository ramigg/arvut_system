class Activity < ActiveRecord::Base
  has_many :user_activities
  has_many :users, :through => :user_activities

  ALLOWED_ACTIVITIES = ['login', 'logout', 'submit profile', 'submit questionnaire_answer']

  def self.get_activity(activity)
    return nil unless ALLOWED_ACTIVITIES.include?(activity)
    
    opt = {:title => activity}
    where(opt).first || create(opt)
  end

end