class Answer < ActiveRecord::Base
  belongs_to :question
  belongs_to :questionnaire_answer
  
  # For checkbox answers
  has_and_belongs_to_many :values, :class_name => "QuestionPair"
  accepts_nested_attributes_for :values

  # For Radio buttons
  belongs_to :value, :class_name => 'QuestionPair', :foreign_key => :question_pair_id

  # Class of question/answer
  self.inheritance_column = :user_type
  attr_accessor :my_type
  def my_type=(value = '')
    self.user_type = value
  end

  class AnswerCheckValidator <  ActiveModel::EachValidator
    # implement the method called during validation
    def validate_each(record, attribute, value)
    end
  end

  class AnswerValidator <  ActiveModel::Validator
    # implement the method where the validation logic must reside
    def validate(record)
      return unless record.errors.empty?

      if (record.user_type == 'ScaleAnswer' && record.int_value.nil?) ||
          (record.user_type == 'ListAnswer' && record.value.nil?)
        record.errors[:base] << I18n.t('answer.model.select_one_option')
      elsif (record.user_type == 'RadioAnswer')
        if record.question.other.nil?
          if record.value.nil?
            record.errors[:base] << I18n.t('answer.model.select_one_option')
          end
        else
          # Select other...
          if record.value.nil?
            if (record.text_value.nil? || record.text_value.empty?)
              record.errors[:base] << I18n.t('answer.model.select_one_option')
            end
          end
        end
      elsif record.user_type == 'FreeTextAnswer' && (record.text_value.nil? || record.text_value.empty?)
        record.errors[:base] << I18n.t('answer.model.write_an_answer')
      elsif record.user_type == 'FreeTextAnswer' && (record.text_value.mb_chars.length < 10)
        record.errors[:base] << I18n.t('answer.model.answer_too_short')
      elsif record.user_type == 'CheckboxAnswer'
#        Commented due to be not understandable for normal people
#        
#        unless record.value.nil?
#          if (record.text_value.nil? || record.text_value.empty?)
#            record.errors[:base] << I18n.t('answer.model.write_an_answer')
#            return
#          end
#        end
        if (record.values.nil? || record.values.empty?) && record.value.nil?
          record.errors[:base] << I18n.t('answer.model.select_at_least_one')
        end
      end
    end
  end


  #  validates :int_value, :answer_check => true, :on => :create
  #  validates :text_value, :answer_check => true, :on => :create
  #  validates :question_pair_id, :answer_check => true, :on => :create
  #  validates :values, :answer_check => true, :on => :create
  validates_with AnswerValidator

  after_destroy :values_cleanup

  private

  def values_cleanup
    values.clear unless values.empty?
  end
end
