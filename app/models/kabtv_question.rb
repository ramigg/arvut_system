class KabtvQuestion < Kabtv
  set_table_name 'questions'
  
  def self.approved_questions(last_question_id = 0)
    sql = <<-SQL
      SELECT qfrom, qname, qquestion, who
        FROM questions WHERE
         (id > #{last_question_id}) AND
         (isquestion = 1) AND (is_hidden=0 OR is_hidden IS NULL) AND (approved <> 0)
        ORDER BY id ASC
    SQL
    find_by_sql(sql)
  end
end
