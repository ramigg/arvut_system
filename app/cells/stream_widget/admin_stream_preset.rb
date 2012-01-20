module StreamWidget
  class AdminStreamPreset < Apotomo::Widget
    before_filter :set_presets

    respond_to_event :new_preset, :with => :new
    respond_to_event :edit_preset, :with => :edit
    responds_to_event :submit, :with => :process_form
    # respond_to_event :presetUpdated, :with => :redraw
    respond_to_event :language_selected, :with => :load_preset

    def display
      @stream_preset = current_preset
      render
    end

    def new
      @stream_preset = StreamPreset.create

      default_quality = Quality.find_by_name('250K')
      default_technology = Technology.find_by_name('WMV')
      Language.all.each { |language|
        pl = PresetLanguage.create(:stream_preset_id => @stream_preset.id, :language_id => language.id,
                                   :technology_id => default_technology.id,
                                   :quality_id => default_quality.id
        )
        @stream_preset.preset_languages << pl
        3.times do
          pl.stream_items << StreamItem.new
        end
      }

      replace :view => :display
    end

    def edit
      @stream_preset = StreamPreset.find(param(:stream_preset_id))
      render
    end

    def process_form
      if param(:stream_preset)[:id].empty?
        @stream_preset = StreamPreset.new
      else
        @stream_preset = StreamPreset.find(param(:stream_preset)[:id]) || StreamPreset.new
      end
      @success = @stream_preset.update_attributes(param(:stream_preset))
      @stream_preset.update_attribute :updated_at, Time.now
      @stream_preset.save
      trigger :update_current_state
      render
    end

    def load_preset
      @pl = PresetLanguage.find_by_stream_preset_id_and_language_id(param(:stream_preset_id), param(:language_id))
      @stream_items = @pl.stream_items
      render
    end

    def set_presets
      @stream_presets = StreamPreset.all
    end
  end
end
