module StreamWidget
  class Sketches < Apotomo::Widget
    responds_to_event :classboard, :with => :display_classboard
    
    def display
      return unless current_preset.show_sketches

      render
    end

    def display_classboard
      images = []
      begin
        data = EventDataReader::ClassBoard.new.classboard
        sketches_url = data[:urls][:sketches]
        sketches = data[:thumbnails]
        last_one = params[:total].to_i
        total = sketches.size
        last_one = 0 if last_one > total
        sketches = sketches[last_one .. total] || []
        images = sketches.map{ |img|
          "<img alt='' src='#{sketches_url}/#{img}'></img>"
        }
      end
      text = if images.empty?
        total == 0 ?
          '$(\'.images\').html(\'\')' :
          ''
      else
        total > last_one && last_one != 0 ?
          # New files were added
          "$('.images').append('#{escape_javascript images.join('').html_safe}');" :
          # Less files... Supposedly reset happened
          "$('.images').html('#{escape_javascript images.join('').html_safe}');"
      end
      render :text => text, :content_type => Mime::JS
    end
  end
end
