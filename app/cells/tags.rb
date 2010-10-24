module Tags

  class Container < Apotomo::Widget

    has_widgets do |me|
      for t in Page.all_tags(I18n.locale)
        me << widget('tags/tag', "tag-#{t.id}", :display, :tag => t.name)
      end
    end
    
    def container
      render
    end
  end

  private
  
  class Tag < Apotomo::Widget
    def display
      @tag = param :tag
      render
    end
  end

end
