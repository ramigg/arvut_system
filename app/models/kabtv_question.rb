class KabtvQuestion < Kabtv
  set_table_name 'questions'
  
  def KabtvQuestion.copy_remote_to_local
    transaction {
      remote = KabtvQuestion.all
      CopyQuestion.delete_all
      remote.each{ |r|
        l = CopyQuestion.new(r.attributes)
        l.remote_question_id = r.id
        l.save(:validate => false)
      }
    }
  end

end
