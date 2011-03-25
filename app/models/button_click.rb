class ButtonClick < ActiveRecord::Base
  belongs_to :user

  TIME_OUT = 30.minutes

  scope :last_click, lambda{ |user_id|
    where(:user_id => user_id).order("created_at DESC").limit(1)
  }

  def self.time_left(user_id)
    time_passed = (Time.now - last_click(user_id).first.created_at).to_i
    time_passed > TIME_OUT ? 0 : TIME_OUT - time_passed
  end

  def self.status(user_id)
    time_left(user_id) != 0
  end
end
