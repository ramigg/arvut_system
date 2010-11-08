class CopyQuestion < ActiveRecord::Base
  
  def self.approved_questions(last_question_id = 0)
    sql = <<-SQL
      SELECT id, qfrom, qname, qquestion, who, lang, stimulator_id
        FROM copy_questions WHERE
         (remote_question_id > #{last_question_id}) AND
         (isquestion = 1) AND (is_hidden=0 OR is_hidden IS NULL) AND (approved <> 0)
        ORDER BY id ASC
    SQL
    new_questions = find_by_sql(sql)
    sql = <<-SQL
      SELECT count(*) AS total
        FROM copy_questions WHERE
         (isquestion = 1) AND (is_hidden=0 OR is_hidden IS NULL) AND (approved <> 0 AND approved IS NOT NULL)
    SQL
    total_questions = find_by_sql(sql)

    [new_questions, total_questions[0].total.to_i]
  end

  def self.ask_question(question, current_user)
    return nil if question[:qquestion].empty?
    question.merge!(
      :lang => Kabtv.map_locale_2_language(I18n.locale),
      :isquestion => 1,
      :is_hidden => 0,
      :stimulator_id => current_user.id,
      :timestamp => Time.now.to_s(:db)
    )
    KabtvQuestion.new(question).save(:validate => false)
  end

end
