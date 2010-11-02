class KabtvQuestion < Kabtv
  set_table_name 'questions'
  
  def self.approved_questions
    find_by_sql(
      'SELECT qfrom, qname, qquestion, who FROM questions WHERE (isquestion = 1) AND (is_hidden=0 OR is_hidden IS NULL) AND (approved <> 0) ORDER BY id DESC'
    )
  end
end
