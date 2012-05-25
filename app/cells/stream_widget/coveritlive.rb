module StreamWidget
  class Coveritlive < Apotomo::Widget

    def display
      @stream_preset = current_preset(param :stream_preset_id)
      return if @stream_preset.nil? || ! @stream_preset.show_coveritlive

      render
    end

  end
end

