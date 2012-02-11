class StreamPresetObserver < ActiveRecord::Observer

  def sweep(stream_preset)
    preset_id = stream_preset.id
    path = ::Rails.application.config.action_controller.page_cache_directory

    # remove old ones
    Language.all.each do |lang|
      FileUtils.rm_rf("#{path}/#{lang.locale}/tv/#{preset_id}.html")
    end

    Language.all.each do |lang|
      I18n.locale = lang.locale
      content = StaticPagesController.new.tv(preset_id, lang.locale, true) rescue nil
      if content
        FileUtils.mkdir_p "#{path}/#{lang.locale}/tv"
        File.open("#{path}/#{lang.locale}/tv/#{preset_id}.html", 'wb+') do |f|
          f.write content
        end
      end
    end

  end

  alias_method :after_update, :sweep
  alias_method :after_create, :sweep
  alias_method :after_destroy, :sweep
end