module StreamWidget
  class AdminStreamImages < Apotomo::Widget
    responds_to_event :submit, :with => :process_form

    def display
      @stream_images = StreamImage.order("language_id ASC, stream_state_id ASC") || []
      render
    end

    def new
      @stream_preset = StreamPreset.new
      3.times do
        @stream_preset.stream_items << StreamItem.new
      end
      replace :view => :display
    end

    def edit
      @stream_preset = StreamPreset.find(param(:stream_preset_id))
      replace :view => :display
    end

    def process_form
      params[:stream_images].each_value do |stream_image|
        destroy_flag = !["0", 0, nil, false].include?(stream_image.delete(:_destroy))
        if !stream_image[:id] || stream_image[:id].empty?
          @stream_image = StreamImage.new
        else
          @stream_image = StreamImage.find(stream_image[:id]) || StreamImage.new
        end
        if destroy_flag
          @stream_image.destroy
        else
          @stream_image.update_attributes(stream_image)
        end
      end
      Cache.clear
      render
    end
  end
end
