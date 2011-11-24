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

    presets, languages = get_presets(stream_preset, params['locale'], params['wmv'] == 'true', params['flash'] == 'true')
    result = <<-VIEW
      var timestamp = '#{stream_preset.updated_at.to_s}';
      var presets_data = #{stream_preset.to_json.html_safe};
      var presets = #{presets.to_json.html_safe};
      var languages = #{languages.to_json.html_safe};
      kabtv.tabs.flash_technology = #{Technology.find_by_name('Flash').try(:id)};
    VIEW

    @cache.set(key, result, 12.seconds, true)
    result
  end

  def get_presets(stream_preset, locale, has_wmv, has_flash, has_cdn = false)
    language = Language.find_by_locale locale
    lid = language.id

    # look for channel
    preset_languages = stream_preset.preset_languages.select { |pl| pl.language.id = lid }
    stream_items = preset_languages.collect { |pl| pl.stream_items }.flatten

    presets = {}
    languages = []
    preset_languages = stream_preset.preset_languages
    language_ids = preset_languages.map(&:language_id).uniq
    wmv_id = Technology.find_by_name('WMV').id
    flash_id = Technology.find_by_name('Flash').id

    # for each language create list of technologies
    language_ids.each { |language_id|
      languages << "<option #{"selected='selected'".html_safe if language_id == lid} value='#{language_id}'>#{Language.find(language_id).language}</option>"
      options_list = []
      image = ''
      presets[language_id] ||= {}
      technologies = {}
      preset_languages.select { |pl| pl.language_id == language_id }.collect { |l| l.stream_items }.flatten.reject { |si| si.stream_url.empty? }.each { |item|
        tech_id = item.technology.id
        next if (!has_wmv && tech_id == wmv_id) || (!has_flash && tech_id == flash_id)
        presets[language_id][tech_id] ||= ''
        is_default = item.is_default
        if technologies[tech_id].nil?
          options_list << "<input type='radio' name='technology_id' #{"checked='checked'".html_safe if is_default} value='#{tech_id}'/><span>#{item.technology.name}</span><br/>"
          technologies[tech_id] = 1
        elsif is_default
          # reset technology to ensure it is default
          options_list.delete_if { |x| /#{item.technology.name}/.match x }
          options_list << "<input type='radio' name='technology_id' #{"checked='checked'".html_safe if is_default} value='#{tech_id}'/><span>#{item.technology.name}</span><br/>"
        end
        image_path = item.preset_language.stream_preset.stream_state.inactive_image(language_id)
        image = "<img src='#{image_path.try(:filename)}' alt='#{I18n.t 'kabtv.kabtv.no_broadcast'}' />" if image_path
        presets[language_id][tech_id] += "<option #{"selected='selected'".html_safe if is_default} value='#{item.stream_url}'>#{item.quality.name}</option>"
      }
      presets[language_id][:options] = options_list.uniq.compact.join
      presets[language_id][:image] = image
    }

    [presets, languages.join(',')]
  end
end
