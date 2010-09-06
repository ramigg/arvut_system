class CreateAnswerTables < ActiveRecord::Migration
  def self.up
    create_table :questionnaire_answers do |t|
      t.integer :questionnaire_id
      t.integer :author_id
      t.timestamps
    end
    create_table :answers do |t|
      t.integer :question_id
      t.integer :questionnaire_answer_id
      t.string :type
      t.text :text_value
      t.integer :int_value
      t.integer :question_pair_id
      t.timestamps
    end
    create_table :answers_question_pairs, :id => false do |t|
      t.integer :answer_id
      t.integer :question_pair_id
    end
  end

  def self.down
    drop_table :questionnaire_answers
    drop_table :answers
    drop_table :text_answers
    drop_table :scale_answers
    drop_table :list_answers
    drop_table :radio_answers
    drop_table :checkbox_answers
    drop_table :checkbox_answers_question_pairs
  end
end
