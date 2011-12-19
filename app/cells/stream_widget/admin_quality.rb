module StreamWidget
  class AdminQuality < Apotomo::Widget
    respond_to_event :new_quality, :with => :new
    respond_to_event :edit_quality, :with => :edit
    responds_to_event :submit, :with => :process_form

    def display
      @qualities = Quality.order("name ASC") || []
      render
    end

    def new
      @quality = Quality.create
      replace :view => :display
    end

    def edit
      @quality = Quality.find(param(:quality_id))
      replace :view => :display
    end

    def process_form
      params[:qualities].each_value do |quality|
        destroy_flag = !["0", 0, nil, false].include?(quality.delete(:_destroy))
        if !quality[:id] || quality[:id].empty?
          @quality = Quality.new
        else
          @quality = Quality.find(quality[:id]) || Quality.new
        end
        if destroy_flag
          @quality.destroy
        else
          @quality.update_attributes(quality)
        end
      end
    end

  end
end
