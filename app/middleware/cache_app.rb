require 'rack/utils'

class CacheApp
  include Rack::Utils

  def initialize(app)
    @app = app
  end

  def call(env)
    # /events/render_event_response?locale=ru&source=stream_container&type=update_presets&stream_preset_id=3
    if env['REQUEST_PATH'] =~ /events\/render_event_response/ &&
        env['QUERY_STRING'] =~ /type=update_presets/
      # Try to get info from cache
      key = "Sviva-Tova:#{env['REQUEST_PATH']}?#{env['QUERY_STRING'].gsub(/&_=\d+/, '')}"
      value = Rails.cache.read(key)
      supplied_by = 'MiddlewareCache'
      unless value
        value = generate_presets(env, key)
        #@cache.set(key, result, 12.seconds, true) rescue nil
        Rails.cache.write(key, value, :expires_in => 30.seconds) rescue nil
        supplied_by = 'Middleware'
      end

      return [200, {'Content-Type' => 'application/x-javascript', 'X-Supplied-by' => supplied_by}, [value]]
    end
    if env['REQUEST_PATH'] =~ /events\/render_event_response/ &&
        env['QUERY_STRING'] =~ /type=classboard/
      # Try to get info from cache.
      # This cache is generated via cronjob only
      # rails runner -e production EventDataReader::ClassBoard.store_in_cache
      key = 'SvivaTova:Classboard-yml'
      data = Rails.cache.read(key)
      classboard = data ? YAML::load(data) : {
          :urls => {:sketches => '', :thumbnails => ''},
          :thumbnails => []
      }
      return [200, {'Content-Type' => 'application/x-javascript', 'X-Supplied-by' => 'Middleware'}, [display_classboard(env, classboard)]]
    end
    if env['REQUEST_PATH'] =~ /events\/render_event_response/ &&
        env['QUERY_STRING'] =~ /type=more_questions/
      # Try to get info from cache
      key = "Sviva-Tova:#{env['REQUEST_PATH']}?#{env['QUERY_STRING'].gsub(/&_=\d+/, '')}"
      value = Rails.cache.fetch(key) do
        more_questions(env)
      end
      return [200, {'Content-Type' => 'application/x-javascript', 'X-Supplied-by' => 'Middleware'}, [value]]
    end

    @app.call(env)
  end

  def method_missing(method, *args, &block)
    @@method = method.to_s
  end

  private

  def more_questions(env)
    params = parse_query(env['QUERY_STRING'])

    last_question_id = params['last_question_id'].to_i

    (@questions, @total_questions) = CopyQuestion.approved_questions(last_question_id)

    if @questions.empty?
      if last_question_id == 0 || @total_questions == 0
        # questions => no new questions
        text = "
        $('dl#questions').html(\"<dd class='even'>#{I18n.t 'kabtv.kabtv.no_questions_yet'}</dd>\");
        kabtv.questions.last_question_id = 0;
        "
      else
        text = ''
      end
    else
      content = ''
      @questions.each_with_index { |q, idx|
        klass = ((last_question_id + 1 + idx) & 1) == 0 ? 'odd' : 'even'
        name = q.qname.empty? ? I18n.t('kabtv.kabtv.guest') : q.qname
        from = q.qfrom.empty? ? I18n.t('kabtv.kabtv.somewhere') : q.qfrom
        style = q.lang == 'Hebrew' ? 'style="direction:rtl"' : ''
        if q.stimulator_id.to_i > 0
          user = User.find(q.stimulator_id)
          img = "<img src='/images/#{user.avatar_url(:thumb)}' />"
        else
          img = "<img src='/images/user.png' />"
        end

        content += <<-HTML
        <dt class="#{klass}" #{style}>#{img}<span class="who">#{name}</span> @ <span class="where">#{from}</span></dt>
        <dd class="#{klass}" #{style}>#{q.qquestion}</dd>
        HTML
      }
      if last_question_id == 0
        # no questions => questions
        text = "
        $('dl#questions').html('#{escape_javascript content}');
        kabtv.questions.last_question_id = #{@questions.last.id};
        "
      else
        # questions => more questions
        text = "
        $('dl#questions').append('#{escape_javascript content}');
        kabtv.questions.last_question_id =+ #{@questions.last.id};
        "
      end
    end

    text
  end

  def display_classboard(env, data)
    params = parse_query(env['QUERY_STRING'])

    images = []
    reset = false
    sketches_url = data[:urls][:sketches]
    sketches = data[:thumbnails]
    last_one = params['total'].to_i
    total = sketches.size
    reset = last_one > total
    sketches = reset ? sketches : (sketches[last_one .. total] || [])
    images = sketches.map { |img|
      "<img alt='' src='#{sketches_url}/#{img}'></img>"
    }
    text = if images.empty? && !reset
             # Nothing to show (and it was not reset)
             total == 0 ?
                 # No sketches on server
                 "$('.images').html('')" :
                 # No new sketches
                 ''
           else
             reset ?
                 # Less files... Or reset had happened or some images were removed
                 "$('.images').html('#{escape_javascript images.join('')}');" :
                 # New files were added
                 "$('.images').append('#{escape_javascript images.join('')}');"
           end

    text
  end

  def current_preset(preset_id = 0, session = nil)
    if session['stream_preset_id'] and (preset_id == 0 || preset_id.nil?)
      preset_id = session[:stream_preset_id]
    elsif preset_id == 0 || preset_id.nil?
      return nil
    end
    StreamPreset.find(preset_id)
  end

  def generate_presets(env, key)
    params = parse_query(env['QUERY_STRING'])
    session = parse_query(env['HTTP_COOKIE'])
    stream_preset = current_preset(params['stream_preset_id'], session)
    unless stream_preset
      # Unable to find preset id (maybe due to old session)- try to reload page
      return ['window.location.reload();']
    end

    presets, languages, lang_options, images = get_presets(stream_preset, params['locale'])
    <<-VIEW
      var timestamp = '#{stream_preset.updated_at.to_s}';
      var preset_data = #{stream_preset.to_json.html_safe};
      var presets = #{presets.to_json.html_safe};
      var languages = #{languages.to_json.html_safe};
      var lang_options = "#{lang_options.html_safe}";
      var images = #{images.to_json.html_safe};
      var technologies = #{Technology.find_all_by_name(["WMV", "Flash"]).to_json.html_safe};
      kabtv.tabs.flash_technology = #{Technology.find_by_name('Flash').try(:id)};
    VIEW
  end

  def get_presets(stream_preset, locale)
    all_languages = Language.all
    locale_id = all_languages.select { |al| al.locale == locale }.first.id
    preset_languages = stream_preset.preset_languages.where("language_id is not null and quality_id is not null and technology_id is not null").uniq
    languages = preset_languages.map { |p| {:id => p.id, :tid => p.technology.try(:id), :lid => p.language.try(:id), :qid => p.quality.try(:id)} }
    lang_options = languages.map { |l|
      language_id = l[:lid]
      "<option #{"selected='selected'".html_safe if language_id == locale_id} value='#{language_id}'>#{all_languages.select { |al| al.id == language_id }.first.language}</option>"
    }.join
    images = preset_languages.map { |pl|
      image_path = stream_preset.stream_state.inactive_image(pl.language_id)
      {:lang => pl.language_id, :image => "<img src='#{image_path.try(:filename)}' alt='#{I18n.t 'kabtv.kabtv.no_broadcast'}' />"}
    }

    stream_items = preset_languages.map { |pl|
      pl.stream_items.flatten.reject { |si| si.stream_url.empty? }.map { |i|
        {:id => i.id, :def => i.is_default, :tid => i.technology.id, :pid => pl.language.id, :plid => i.preset_language.id, :qd => i.quality.id, :qname => i.quality.name, :url => i.stream_url}
      }
    }.flatten
    [stream_items, languages, lang_options, images]
  end

  JS_ESCAPE_MAP = {
      '\\' => '\\\\',
      '</' => '<\/',
      "\r\n" => '\n',
      "\n" => '\n',
      "\r" => '\n',
      '"' => '\\"',
      "'" => "\\'"}

  # Escape carrier returns and single and double quotes for JavaScript segments.
  def escape_javascript(javascript)
    if javascript
      javascript.gsub(/(\\|<\/|\r\n|[\n\r"'])/) { JS_ESCAPE_MAP[$1] }
    else
      ''
    end
  end

end
