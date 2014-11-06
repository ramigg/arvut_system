require 'open-uri'

class UserLocationValidator < ActiveModel::EachValidator
  def validate_each(object, attribute, value)
    return true unless value
    unless value.country == object.country
      object.errors[attribute] << (options[:message] || " #{value.city} is not in #{object.country.name}")
    end
  end
end

class User < ActiveRecord::Base
  # The user may be author of question/questionnaire
  has_many :questions, :foreign_key => :author_id, :dependent => :nullify
  has_many :questionnaires, :foreign_key => :author_id, :dependent => :nullify # created by myself
  # This is not answer, this is link to an *original* questionnaire that the user answered to!!!
  has_many :answered_questionnaires, :source => :questionnaire, :through => :questionnaire_answers, :uniq => true
  has_many :questionnaire_answers, :foreign_key => :author_id, :dependent => :destroy # which I answered

  has_many :user_activities, :dependent => :destroy
  has_many :activities, :through => :user_activities

  has_and_belongs_to_many :roles
  belongs_to :language
  belongs_to :user_list

  has_many :page_userflags

  belongs_to :country
  belongs_to :region
  belongs_to :location
  #  validates :location, :presence => true

  has_many :pages

  has_many :button_clicks

  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable, :lockable and :timeoutable
  devise :database_authenticatable, :registerable, :omniauthable,
         :recoverable, :rememberable, :trackable,
         :validatable, :confirmable, :lockable, :token_authenticatable, :encryptable, :encryptor => :sha1

  scope :wanted_noitification, Proc.new { |locale|
    lang = Language.get_id_by_locale(locale)
    where(:notifybyemail => 'yes', :language_id => lang)
  }

  # Selects users with their clicks count to generate report.
  # The report is for 1 week
  scope :users_clicks, Proc.new {
    find_by_sql("
      SELECT email, user_id, button_click_set, (last_name || ' ' || first_name) as name,
      date(button_clicks.created_at) as sdate, count(*) as clicks
      FROM users INNER JOIN button_clicks ON button_clicks.user_id = users.id
      WHERE (date(button_clicks.created_at) > '2011-04-12')
      GROUP BY sdate, user_id, email, button_click_set, first_name, last_name
      ORDER BY sdate DESC, clicks DESC
    ")
  }
  #joins(:button_clicks).
  #select("email, user_id, button_click_set, (last_name || ' ' || first_name) as name, date(button_clicks.created_at) as sdate, count(*) as clicks").
  #where("date(button_clicks.created_at) > ?", -1.weeks.from_now.to_date).
  #group(:sdate, :user_id, :email, :button_click_set, :first_name, :last_name).
  #order("sdate DESC, clicks DESC")

  # Counts all user button_click_set which were active in the last 2 weeks
  scope :users_recent_button_click_set,
        select("SUM(CASE WHEN button_click_set is null THEN 1 WHEN button_click_set < 0 THEN 1 WHEN button_click_set > 48 THEN 48 ELSE button_click_set END) as total").
            where('id IN ('+ButtonClick.two_weeks_active_users.to_sql+')')

  # Counts user button_click_set which were active in the last 2 weeks
  # and from the same group!
  scope :users_recent_button_click_set_for_group,
        lambda { |email|
          select("SUM(CASE WHEN button_click_set is null THEN 1 WHEN button_click_set < 0 THEN 1 WHEN button_click_set > 48 THEN 48 ELSE button_click_set END) as total").
              where('id IN ('+ButtonClick.two_weeks_active_users_filter_by_scope(User.group_users_by_email(email)).to_sql+')')
        }

  scope :group_users_by_email,
        lambda { |email|
          select(:id).
              where('email IN (' + UserList.group_emails_by_email(email).to_sql + ')')
        }

  before_create :update_user_list
  after_destroy :roles_cleanup

  has_attached_file :avatar,
                    styles:          { original: ['170x170>', :png], thumb: ['40x40#', :png] },
                    convert_options: { all: "-strip" },
                    default_url:     '/images/user.png'
  validates_attachment :avatar, content_type: { content_type: ['image/jpg', 'image/jpeg', 'image/png', 'image/gif'] }

  def delete_avatar=(value)
    @delete_avatar = !value.to_i.zero?
  end

  def delete_avatar
    !!@delete_avatar
  end

  alias_method :delete_avatar?, :delete_avatar

  before_validation :clear_avatar

  def clear_avatar
    self.avatar = nil if delete_avatar? && !avatar.dirty?
  end

  REQUIRED_FIELDS = [
      :first_name,
      :last_name,
      :gender,
      :birthday,
      :notifybyemail,
      :language_id,
      :country,
      :region,
      :location_id,
  ]

  REQUIRED_FIELDS.each { |req|
#    validates req, :presence => true
  }

  state_machine :state, :initial => :idle do


    event :sign_in do # add event to devise #Done
      transition any => :signed_in
    end

    event :came_home do # add event to home_controller #Done
      transition :signed_in => :profile_edit, :if => :update_profile?
      transition :signed_in => :answer_new_questionnaire, :if => :has_new_questionnaire?
      transition any => :dashboard
    end

    event :came_to_answer_questionnaire do # add event to questionnaire_answers_controller #Done
      transition :signed_in => :specific_q_and_profile_edit, :if => :update_profile?
      transition :signed_in => :specific_q
      transition :dashboard => :specific_q
    end

    event :finished_answering_questionnaire do # add event to questionnaire_answers_controller #Done
      transition any => :dashboard
    end

    event :sign_out do # add event to devise #Done
      transition any => :signed_out
    end

    event :specific_questionnaire_is_already_answered_or_not_found do # add event to questionnaire_answers_controller #Done
      transition any => :dashboard
    end

    event :finished_editing_profile do # add event to profiles_controller #Done
      transition :specific_q_and_profile_edit => :specific_q
      transition :profile_edit => :answer_new_questionnaire, :if => :has_new_questionnaire?
      transition any => :dashboard
    end

    state :specific_q do
      def redirect
        "redirect_to new_questionnaire_answer_url"
      end
    end

    state :dashboard do
      def redirect
        "redirect_to dashboard_url"
      end
    end

    state :signed_out do
      def redirect
        "redirect_to dashboard_url"
      end
    end

    state :profile_edit do
      def redirect
        "redirect_to edit_profile_url(#{self.id})"
      end
    end

    state :specific_q_and_profile_edit do
      def redirect
        "redirect_to edit_profile_url(#{self.id})"
      end
    end

    state :answer_new_questionnaire do
      def redirect
        questionnaire = last_unanswered_questionnaire
        questionnaire ?
            "redirect_to new_questionnaire_answer_url(:questionnaire_id => #{questionnaire.id})" :
            "redirect_to dashboard_url"
      end
    end

  end

  def has_new_questionnaire?
    last_unanswered_questionnaire
  end

  #  Returns last unanswered questionnaire or nil if none exists
  def last_unanswered_questionnaire
    last_unanswered = unanswered_questionnaires.last rescue nil
    the_very_last = Questionnaire.by_language_published(I18n.locale).last
    last_unanswered == the_very_last ? last_unanswered : nil
  end

  #  returns array of unanswered questionnaires in the same language of the user
  def unanswered_questionnaires
    (Questionnaire.by_language_published(I18n.locale).all - answered_questionnaires) rescue []
  end

  # checks whether the profile should be updated
  def update_profile?
    REQUIRED_FIELDS.each { |field|
      value = self.send field
      return true if value.nil? || value.empty?
    }
    false
  end

  #  Allowed activities: ['login', 'logout', 'submit profile', 'submit questionnaire_answer']
  def register_activity(name)
    activities << Activity.get_activity(name) rescue "Activity - '#{name}' is not allowed!"
  end

  Role.all.each { |rr|
    define_method("is_#{rr.role.downcase}?") {
      roles.map { |r| r.role }.include?("#{rr.role}")
    }
  }

  def last_10_questionnaires
    last_10 = Questionnaire.last_10_published(I18n.locale)
    last_10.all.map { |q|
      {
          :id       => q.id,
          :date     => q.created_at,
          :title    => q.title,
          :answered => q.answered_questionnaire?(self)
      }
    }
  end

  # Make login email case insensitive
  def self.find_for_authentication(conditions)
    if conditions[:email]
      conditions[:email].strip!
      conditions[:email].downcase!
    end
    super(conditions)
  end

  # One time function to normalize emails to downcase
  def self.convert_email_to_downcase
    User.all.each do |e|
      begin
        e.email.strip!
        e.email.downcase!
        e.save!
      rescue Exception => ex
        puts e.email, ex
      end

    end
  end

  def is_restricted?
    is_admin? || is_super_moderator? || is_moderator? || is_reports? || is_groupmanager? || is_super? || is_stream_manager? || is_translator?
  end

  def active?
    !self.confirmed_at.nil?
  end

  def avatar_url(type = :thumb)
    if avatar
      URI.escape(avatar.url(type))
    else
      nil
    end
  end

  def date_to_show_pages_from
    Date.today - 10.days #confirmed_at - 10.day # Give new users something to see...
  end


  private

  def update_user_list
    self.email     = self.email.strip.downcase
    u_l            = UserList.where(:email => self.email).first
    self.user_list = u_l
  end

  def roles_cleanup
    roles.clear unless roles.empty?
  end

end

