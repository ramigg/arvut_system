class Page < ActiveRecord::Base

  #  *Associations*

  Language.all.each do |l|
    acts_as_taggable_on "#{l.locale}_tags"
  end

  has_many :assets, :dependent => :destroy, :order => :position
  has_many :questionnaire_answers
  
  has_many :page_userflags, :dependent => :destroy

  accepts_nested_attributes_for :questionnaire_answers, :allow_destroy => true
  accepts_nested_attributes_for :assets, :allow_destroy => true
  accepts_nested_attributes_for :taggings, :allow_destroy => true

  [:article_resources, :video_resources, :audio_resources, :questions].each{|resource|
    has_many resource, :through => :assets
  }
  
  belongs_to :language
  belongs_to :author, :class_name => 'User', :foreign_key => 'author_id'

  belongs_to :stream_preset
  

  #  *Validations*

  validates :title, :presence => true
  validates :message_body, :presence => true, :if => lambda{|e| e.page_type == 'message'}


  #  *Pagination*

  cattr_accessor :per_page
  @@per_page = 10 # Default
  cattr_reader :show_on_page
  @@show_on_page = [[3, 3], [10, 10], [20, 20], [50, 50], [100, 100]]

  WillPaginate::ViewHelpers.pagination_options[:previous_label] = '&larr;'
  WillPaginate::ViewHelpers.pagination_options[:next_label] = '&rarr;'

  #  *Scopes*

  scope :published, lambda {where(:publish_at.lt => Time.zone.now, :status => 'PUBLISHED')}
  scope :by_conf_date, lambda {|user_reg_date| where(:publish_at.gt => user_reg_date)}

  scope :by_page_type, lambda {|page_type, language_id, user_reg_date|
    (page_type == 'all' || page_type == 'tag' ?
        where(:language_id => language_id) :
        where(:language_id => language_id, :page_type => page_type.singularize)).
      published.by_conf_date(user_reg_date)
  }

  #  scope :all_pages, lambda {|language_id| where(:language_id => language_id)}
  scope :ordered_all, order('is_sticky DESC', 'publish_at DESC')
  scope :ordered, order('publish_at DESC')
  
  # scope :read_pages, lambda {|user_id| 
  #   joins(:page_userflags).where(:page_userflags => {:user_id => user_id, :is_read => true}) 
  # }

  scope :completed_assignments, lambda {|language_id, user_reg_date, user_id|
    by_page_type('assignment', language_id, user_reg_date).joins(:page_userflags).where(:page_userflags => {:user_id => user_id, :is_answered => true}) 
  }
  
  scope :read_pages_by_page_type, lambda {|page_type, language_id, user_reg_date, user_id|
    by_page_type(page_type, language_id, user_reg_date).joins(:page_userflags).where(:page_userflags => {:user_id => user_id, :is_read => true})
  }
  
  def self.new_pages_by_page_type(page_type, language_id, user_reg_date, user_id)
    (by_page_type(page_type, language_id, user_reg_date) - read_pages_by_page_type(page_type, language_id, user_reg_date, user_id))
  end

  def self.search(search)
    if search
      search = "%#{search}%"
      where((:title.matches % search) | (:description.matches % search) |
        (:message_body.matches % search)  | (:subtitle.matches % search))
    else
      scoped
    end
  end

  def self.filter(page, filter)
    return scoped unless filter

    if filter[:status] && filter[:status] != ''
      page = case filter[:status]
      when 'FUTURE'
        page.where(:status => 'PUBLISHED', :publish_at.gt => Time.zone.now)
      else
        page.where(:status => filter[:status])
      end
    end
    page = page.where(:page_type => filter[:page_type]) if filter[:page_type] && filter[:page_type] != ''
    page = page.where(:author_id => filter[:author]) if filter[:author] && filter[:author] != ''
    page
  end

  # Returns pages for the given user
  def self.get_my_pages(options)
    user = options[:user]
    sort = options[:sort] || 'updated_at DESC, publish_at DESC'
    locale = options[:locale] || :en
    page = options[:page_no] || 1

    p = Page
    p = p.where(:language_id => Language.get_id_by_locale(locale)) unless user.is_admin? || user.is_super_moderator?
    p = p.where(:author_id => user) unless user.is_admin? || user.is_super_moderator?
    p = p.search(options[:search]) if options[:search]
    p = p.filter(p, options[:filter]) if options[:filter]

    p.order(sort).paginate :page => page, :per_page => Page.per_page
  end
  
  def tags(locale)
    send "#{locale}_tag_list"
  end

  def has_questions?
    questions
  end
  def self.all_tags_strings(locale)
    tag_counts_on(:"#{locale}_tags").all.map{|e| e.name}
  end
  def self.all_tags(locale)
    result = tag_counts_on(:"#{locale}_tags").all
    if result && result.size > 0
      result
    else
      nil
    end
  end
  
  def is_assignment?
    page_type == 'assignment'
  end
end
