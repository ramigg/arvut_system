class StreamPresetObserver < ActiveRecord::Observer

  def sweep(stream_preset)
    preset_name = stream_preset.name.downcase
    path = ::Rails.application.config.action_controller.page_cache_directory

    # remove old ones
    Language.all.each { |lang|
      FileUtils.rm_rf("#{path}/#{lang.locale}/tv/#{preset_name}.html")
    }
    Language.all.each { |lang|
      I18n.locale = lang.locale
      content = StaticPagesController.new.tv(preset_name, lang.locale, true)
      FileUtils.mkdir_p "#{path}/#{lang.locale}/tv"
      File.open("#{path}/#{lang.locale}/tv/#{preset_name}.html", 'wb+') do |f|
        f.write content
      end
    }
  end

  alias_method :after_update, :sweep
  alias_method :after_create, :sweep
  alias_method :after_destroy, :sweep
end