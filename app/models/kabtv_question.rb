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
    # clear cache
    StreamPreset.all.each {|sp|
      preset_id = sp.id
      Language.all.each {|lang|
        key = "Sviva-Tova:/internet/events/render_event_response?locale=#{lang.locale}&source=questions&type=more_questions&last_question_id=0&stream_preset_id=#{preset_id}"
        Rails.cache.delete key
      }
    }
  end

end
