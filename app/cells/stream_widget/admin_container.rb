module StreamWidget
  class AdminContainer < Apotomo::Widget
    # responds_to_event :presetUpdated, :with => :redraw

    after_add do |me, parent|
      
      me.root.respond_to_event :display_images, :with => :display_images, :on => me.name
      me.root.respond_to_event :display_presets, :with => :display_presets, :on => me.name
    end

    has_widgets do |me|
      me << widget('stream_widget/admin_stream_preset', 'admin_form', :display)
      me << widget('stream_widget/admin_stream_images', 'admin_images_form', :display)
    end

    def display
      set_admin_display_mode('admin_form')
      render
    end
    
    def display_images
      set_admin_display_mode('admin_images_form')
      replace :view  => :display
    end
    def display_presets
      set_admin_display_mode('admin_form')
      replace :view  => :display
    end


  end
end