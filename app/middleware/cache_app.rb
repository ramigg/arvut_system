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
    if env['PATH_INFO'] =~ /events\/render_event_response/ &&
        env['QUERY_STRING'] =~ /type=update_presets/
      # Try to get info from cache
      key = "Sviva-Tova:#{env['PATH_INFO']}?#{env['QUERY_STRING']}"
      value = @cache.get(key, true) || generate_presets(env, key)
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
    @current_preset ||= StreamPreset.find(preset_id)
  end

  def generate_presets(env, key)
    params = parse_query(env['QUERY_STRING'])
    session = parse_query(env['HTTP_COOKIE'])
    stream_preset = current_preset(params['stream_preset_id'], session)
    unless stream_preset
      # Unable to find preset id (maybe due to old session)- try to reload page
      return ['window.location.reload();']
    end

    languages = stream_preset.stream_items.map(&:language_id).uniq
    presets = get_presets(stream_preset, languages)
    result = <<-VIEW
      var timestamp = '#{stream_preset.updated_at.to_s}';
      var presets_data = #{stream_preset.to_json.html_safe};
      var presets = #{presets.to_json.html_safe};
    VIEW

    @cache.set(key, result, 15.seconds, true)
    result
  end

  def get_presets(stream_preset, languages)
    presets = {}
    languages.each { |language_id|
      items = stream_preset.stream_items.select { |item|
        item.language_id == language_id && !item.description.empty? && !item.stream_url.empty?
      }
      options_list = []
      image = ''
      items.each { |item|
        options_list << "<option #{"selected='selected'".html_safe if item.is_default} value='#{item.stream_url}'>#{item.description}</option>"
        image_path = item.stream_preset.inactive_image(item.language_id)
        image = "<img src='#{image_path.try(:filename)}' alt='#{I18n.t 'kabtv.kabtv.no_broadcast'}' />" if image_path
      }
      presets[language_id] = {:options => options_list.join(','), :image => image}
    }

    presets
  end
end
