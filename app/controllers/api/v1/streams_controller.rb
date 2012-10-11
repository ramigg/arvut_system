class Api::V1::StreamsController < Api::V1::ApiController

  def set_stream_items
    result = update_preset_languages(params)

    respond_to do |format|
      format.json { render :json => result }
    end

  end

  def set_mobile_audio_streams
    begin
      #if warden.authenticated?
      #  return true
      #else
      #  error!('401 Unauthorized', 401)
      #end
      request_hash = {stream_preset_id: 2, preset_languages: []}
      params[:streams].each do |stream|
        lang = Language.by_locale(stream[:language]).first
        raise "Language '#{stream[:language]}' doesn't exist. Please use 'get_lookup_table' api method to retrieve available languages." unless lang
        item = {
            technology_id: 2,
            language_id: lang.id,
            stream_items: [{
                               url: stream[:stream_url],
                               quality_id: 1,
                               technology_id: 2,
                               is_default: true
                           }]
        }
        request_hash[:preset_languages] << item

      end
      result = update_preset_languages(request_hash)
    rescue Exception => e
      response.status = 500
      result = {error: e.message}
    end
    respond_to do |format|
      format.json { render :json => result }
    end
  end


  def get_lookup_table
    begin
      table_string = params[:table]
      raise "Table #{table_string} can't be accessed" unless %w(technologies qualities languages).include?(table_string)
      table = table_string.singularize.camelize.constantize.all
      result = table
    rescue Exception => e
      result = {error: e.message}
      response.status = 500
    end
    respond_to do |format|
      format.json { render :json => result }
    end
  end

  def test
    respond_to do |format|
      format.json { render :json => {message: 'success'} }
    end
  end

  private

  def update_preset_languages(opts)
    preset = StreamPreset.find(opts[:stream_preset_id])

    opts[:preset_languages].each do |preset_language|
      PresetLanguage.find_or_create_by_stream_preset_id_and_language_id(
          stream_preset_id: preset.id,
          language_id: preset_language[:language_id]
      ).tap do |pl|
        pl.stream_items.each { |e| e.delete }
        preset_language[:stream_items].each do |stream_item|
          StreamItem.create(
              stream_url: stream_item[:url],
              is_default: stream_item[:is_default],
              technology_id: stream_item[:technology_id],
              quality_id: stream_item[:quality_id],
              preset_language_id: pl.id,
          )
        end
      end
    end
    {message: 'success'}
  rescue Exception => e
    response.status = 500
    {error: e.message}
  end

end

#language = Language.find_by_locale(params[:locale])
#
#pl = preset.preset_languages.where('language_id = ?', language.id).first
#@stream_url = pl.stream_items.where('is_default = TRUE').first.stream_url rescue nil
#
