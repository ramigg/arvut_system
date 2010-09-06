class Questionnaire < ActiveRecord::Base
  belongs_to :author, :class_name => "User"
  has_many :questionnaire_answers
  has_and_belongs_to_many :questions
  accepts_nested_attributes_for :questions, :allow_destroy => true, :reject_if => proc { |a| a['title'].blank? }
  belongs_to :language
  has_many :answered_users, :source => :author, :through => :questionnaire_answers, :uniq => true

  validates :title, :presence => true
  validates :language_id, :presence => true

  scope :published, where(:status => 'PUBLISHED')
  scope :by_language_published, Proc.new { |locale|
    lang = Language.get_id_by_locale(locale)
    published.where(:language_id => lang).order(:created_at)
  }
  scope :last_10_published, Proc.new { |locale|
    lang = Language.get_id_by_locale(locale)
    published.where(:language_id => lang).order(:created_at).reverse_order.limit(10)
  }

  # removed by request of Dion
  # after_create :send_notifications

  #  Returns true if the user answered a specific questionnaire or false if didn't
  def answered_questionnaire?(user)
    answered_users.include?(user)
  end

  private
  def send_notifications
    locale = language.locale || Language.default_locale
    User.wanted_noitification(locale).each{|user|
      message = Mailer.send_notification(user, self)
      message.deliver
    }
  end

end
