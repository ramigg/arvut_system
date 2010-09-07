class Question < ActiveRecord::Base
  belongs_to :author, :class_name => "User"
  belongs_to :approver, :class_name => "User"
  has_many :answers
  has_many :questionnaires_questions
  has_many :questionnaires, :through => :questionnaires_questions
#  has_and_belongs_to_many :questionnaires


  has_many :entries, :class_name => "QuestionPair", :foreign_key => :entry_id, :dependent => :destroy
  has_one :other, :class_name => "QuestionPair", :foreign_key => :other_id, :dependent => :destroy

  accepts_nested_attributes_for :entries, :allow_destroy => true, :reject_if => proc { |a| a['label'].blank? }
  accepts_nested_attributes_for :other, :allow_destroy => true, :reject_if => proc { |a| a['label'].blank? }

  validates :title, :presence => true
  validates_associated :entries, :other

  attr_accessor :my_type

  after_find :set_my_type



  def my_type=(value = '')
    self.question_type = value
  end


  def set_my_type
    self.my_type = self.question_type
  end

end
