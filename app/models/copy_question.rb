require 'net/http'
require 'uri'

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
    lang = Kabtv.map_locale_2_language(I18n.locale)
    Net::HTTP.post_form(URI.parse("http://kab.tv/ask.php?lang=#{lang}"), {
      'QName' =>  question[:qname],
      'QFrom' =>  question[:qfrom],
      'QQuestion' =>  question[:qquestion],
      'ask' =>  1,
      'isquestion' => 1,
      'is_hidden' => 0,
    })
  end

  def self.copy_remote
    remote =
      begin
        Timeout::timeout(25) {
          open('http://www.kab.tv/vod/question/copy_remote') { |f|
            YAML::load(f)
          }
        }
      rescue Timeout::Error
        ''
      end

    transaction {
      CopyQuestion.delete_all
      remote.each{ |r|
        l = CopyQuestion.new(r)
        l.remote_question_id = r['id']
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
