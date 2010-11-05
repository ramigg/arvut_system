class KabtvQuestion < Kabtv
  set_table_name 'questions'
  
  def self.approved_questions(last_question_id = 0)
    sql = <<-SQL
      SELECT id, qfrom, qname, qquestion, who, lang
        FROM questions WHERE
         (id > #{last_question_id}) AND
         (isquestion = 1) AND (is_hidden=0 OR is_hidden IS NULL) AND (approved <> 0)
        ORDER BY id ASC
    SQL
    new_questions = find_by_sql(sql)
    sql = <<-SQL
      SELECT count(*) AS total
        FROM questions WHERE
         (isquestion = 1) AND (is_hidden=0 OR is_hidden IS NULL) AND (approved <> 0 AND approved IS NOT NULL)
    SQL
    total_questions = find_by_sql(sql)

    [new_questions, total_questions[0].total.to_i]
  end

  def self.ask_question(question)
    return nil if question[:qquestion].empty?
    question.merge!(
      :lang => map_locale_2_language(I18n.locale),
      :isquestion => 1,
      :is_hidden => 0,
      :timestamp => Time.now.to_s(:db)
    )
    KabtvQuestion.new(question).save(:validate => false)
  end

end
