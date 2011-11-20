module StreamWidget
  class AdminStreamSwitcher < Apotomo::Widget

    respond_to_event :switch_stream, :with => :switch_stream

    def display
      @stream_preset = current_preset
      render
    end

    def switch_stream
      #set_push_to_commet_flag(true)
      is_active = param :is_active
      if is_active
        current_preset.update_attribute(:is_active, true)
      else
        stream_state_id = param :stream_state_id
        current_preset.update_attributes(:is_active => false, :stream_state_id => stream_state_id)
      end
      trigger :update_current_state
      #set_push_to_commet_flag(false)
      Cache.clear
    end

  end
end
