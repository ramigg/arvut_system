class StreamPresetObserver < ActiveRecord::Observer

  def sweep(stream_preset)
    # remove old ones
    Language.all.each { |lang|
      FileUtils.rm_rf("public/#{lang.locale}/tv/#{stream_preset.name.downcase}.html")
    }
  end

  alias_method :after_update, :sweep
  alias_method :after_create, :sweep
  alias_method :after_destroy, :sweep
end