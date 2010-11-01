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
  scope :ordered,  order('is_sticky', 'publish_at DESC')
  
  #TODO Add new_pages scope
  scope :new_pages,  order('is_sticky', 'publish_at DESC')

  # Returns pages for the given user
  def self.get_my_pages(user, pageno, locale = :en )
    language_id = Language.get_id_by_locale(locale)
    conditions = user.is_admin? ? [] : ['author_id = ? AND language_id = ?', user, language_id]
    paginate :page => pageno,
      :order => ['updated_at DESC, publish_at DESC'],
      :conditions => conditions
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
