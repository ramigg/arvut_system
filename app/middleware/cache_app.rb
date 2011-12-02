require 'rack/utils'

class CacheApp
  include Rack::Utils
  require "memcache"

  def initialize(app, message = "Response Time")
    @app = app
    @message = message
    @cache = MemCache.new 'localhost:11211'
  end

  def call(env)
    # /events/render_event_response?locale=ru&source=stream_container&type=update_presets&stream_preset_id=3
    if env['REQUEST_PATH'] =~ /events\/render_event_response/ &&
        env['QUERY_STRING'] =~ /type=update_presets/
      # Try to get info from cache
      key = "Sviva-Tova:#{env['REQUEST_PATH']}?#{env['QUERY_STRING']}"
      value = (Rails.env == 'production' && @cache.get(key, true)) || generate_presets(env, key)
      return [200, {'Content-Type' => 'application/x-javascript'}, [value]]
    end

    @app.call(env)
  end

  private

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
    result = <<-VIEW
      var timestamp = '#{stream_preset.updated_at.to_s}';
      var preset_data = #{stream_preset.to_json.html_safe};
      var presets = #{presets.to_json.html_safe};
      var languages = #{languages.to_json.html_safe};
      var lang_options = "#{lang_options.html_safe}";
      var images = #{images.to_json.html_safe};
      var technologies = #{Technology.find_all_by_name(["WMV", "Flash"]).to_json.html_safe};
      kabtv.tabs.flash_technology = #{Technology.find_by_name('Flash').try(:id)};
    VIEW

    @cache.set(key, result, 12.seconds, true)
    result
  end

  def get_presets(stream_preset, locale)
    all_languages = Language.all
    locale_id = all_languages.select {|al| al.locale == locale}.first.id
    preset_languages = stream_preset.preset_languages.uniq
    languages = preset_languages.map { |p| {:id => p.id, :tid => p.technology.id, :lid => p.language.id, :qid => p.quality.id} }
    lang_options = languages.map { |l|
      language_id = l[:lid]
      "<option #{"selected='selected'".html_safe if language_id == locale_id} value='#{language_id}'>#{all_languages.select{|al| al.id == language_id}.first.language}</option>"
    }.join
    images = preset_languages.map{|pl|
      image_path = stream_preset.stream_state.inactive_image(pl.language_id)
      {:lang => pl.language_id, :image => "<img src='#{image_path.try(:filename)}' alt='#{I18n.t 'kabtv.kabtv.no_broadcast'}' />"}
    }

    stream_items = preset_languages.map { |pl|
      pl.stream_items.flatten.reject { |si| si.stream_url.empty? }.map{|i|
        { :id => i.id, :def => i.is_default, :tid => i.technology.id, :pid => pl.language.id, :plid => i.preset_language.id, :qd => i.quality.id, :qname => i.quality.name, :url => i.stream_url}
      }
    }.flatten
    [stream_items, languages, lang_options, images]
  end
end
