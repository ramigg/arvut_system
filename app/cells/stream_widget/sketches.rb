module StreamWidget
  class Sketches < Apotomo::Widget
    responds_to_event :classboard, :with => :display_classboard

    def display
      @stream_preset = (param :stream_preset) || current_preset(param :stream_preset_id)
      return if @stream_preset.nil? || ! @stream_preset.show_sketches

      render
    end

    def display_classboard
      images = []
      reset = false
      begin
        data = EventDataReader::ClassBoard.new.classboard
        sketches_url = data[:urls][:sketches].sub(/http:/, 'https:')
        sketches = data[:thumbnails]
        last_one = params[:total].to_i
        total = sketches.size
        reset = last_one > total
        sketches = reset ? sketches : (sketches[last_one .. total] || [])
        images = sketches.map{ |img|
          "<img alt='' src='#{sketches_url}/#{img}'></img>"
        }
      end
      text = if images.empty? && !reset
        # Nothing to show (and it was not reset)
        total == 0 ?
          # No sketches on server
        '$(\'.images\').html(\'\')' :
          # No new sketches
        ''
      else
        reset ?
          # Less files... Or reset had happened or some images were removed
        "$('.images').html('#{escape_javascript images.join('').html_safe}');" :
          # New files were added
        "$('.images').append('#{escape_javascript images.join('').html_safe}');"
      end
      render :text => text, :content_type => Mime::JS
    end
  end
end

