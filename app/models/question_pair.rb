class QuestionPair < ActiveRecord::Base
   belongs_to :entry, :class_name => 'Question', :foreign_key => :entry_id
   belongs_to :other_entry, :class_name => 'Question', :foreign_key => :other_id
   has_many :answers
   has_and_belongs_to_many :checkbox_answers, :class_name => 'Answer', :foreign_key => :question_pair_id, :association_foreign_key => :answer_id
end