module StreamWidget
  class AdminStreamPreset < Apotomo::Widget
    before_filter :set_presets

    respond_to_event :new_preset, :with => :new
    respond_to_event :edit_preset, :with => :edit
    responds_to_event :submit, :with => :process_form
    # respond_to_event :presetUpdated, :with => :redraw
    
    def display
      @stream_preset = current_preset
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
      if param(:stream_preset)[:id].empty?
        @stream_preset = StreamPreset.new
      else
        @stream_preset = StreamPreset.find(param(:stream_preset)[:id]) || StreamPreset.new
      end
      @success = @stream_preset.update_attributes(param(:stream_preset))
      render
    end
    
    def redraw
      render
    end
    
    def set_presets
      @stream_presets = StreamPreset.all
    end
  end
end
