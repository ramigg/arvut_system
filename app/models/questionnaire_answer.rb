class QuestionnaireAnswer < ActiveRecord::Base
  
  has_many :answers, :dependent => :destroy
  belongs_to :author, :class_name => "User"
  accepts_nested_attributes_for :answers
  belongs_to :questionnaire
  belongs_to :page
  

  # Map class of question to class of answer
  def self.map_qtype2atype(question)
    case question.question_type.to_s
    when 'Scale'
      ScaleAnswer
    when 'FreeText'
      FreeTextAnswer
    when 'List'
      ListAnswer
    when 'Checkbox'
      CheckboxAnswer
    when 'Radio'
      RadioAnswer
    else
      raise "Unknown question class: #{question.class}"
    end
  end

  # For each question we have to create an 'answer' field
  def self.prepare_answers(questionnaire)
    answers = []
    questionnaire.questions.each{|question|
      klass = QuestionnaireAnswer.map_qtype2atype(question)
      answer = klass.new
      answer.question = question
      answers << answer
    }
    answers
  end
end