class EmailValidator < ActiveModel::EachValidator
  def validate_each(record, attribute, value)
    record.errors[attribute] << (options[:message] || "is not an email") unless value =~ /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i
  end
end
class UserList < ActiveRecord::Base
  belongs_to :users_group
  has_one :user

  # A.G. this validator works
  validates :first_name, :presence => true, :length => {:minimum => 1, :maximum => 254}

  # A.G. this validator also works together with previous
  validates :last_name, :presence => true, :length => {:minimum => 1, :maximum => 254}

  #A.G. this is problematic validator!
  #validates :users_group_id, :presence => true

  validates :email, :presence => true,
                    :length => {:minimum => 3, :maximum => 254},
                    :uniqueness => true,
                    :format => {:with => /^([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})$/i}

  #validates :email, :first_name, :last_name, :users_group_id, :presence => true
  #validates :users_group_id, :presence => true
  #validates :email, :uniqueness => true #, :email => true

  before_save :trim_email
  after_save :update_user
  after_destroy :nullify_user

  def user_activities
    user ? user.user_activities : []
  end

  private
  def nullify_user
    user.update_attribute(:user_list_id, nil) if user
  end

  def trim_email
    self.email = self.email.strip.downcase
  end
  
  def update_user
    if self.email_changed?
      user.update_attribute(:user_list_id, nil) if user
    end

#    email = email.strip.downcase
    user = User.where(:email => email).first
    if user
      user.user_list = self
      user.save!
    end
  end
  
  scope :group_emails_by_email,     
    lambda { |email|
      select('a.email as email').
      joins('INNER JOIN user_lists as a ON user_lists.users_group_id = a.users_group_id' ).
      where(:email => email)
    }
    
  scope :group_id_by_email,
    lambda { |email|
      select('users_group_id').
      where(:email => email)
    }
  
end
