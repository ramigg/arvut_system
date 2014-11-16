module StreamWidget
  class SpecialSchedule < Apotomo::Widget

    def display
      @stream_preset = current_preset(param :stream_preset_id)
      return if @stream_preset.nil? || !@stream_preset.show_special_schedule

      render
    end

  end
end

