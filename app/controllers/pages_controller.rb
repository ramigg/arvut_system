class PagesController < ApplicationController

  respond_to :html, :js
  
  # Accepts the following:
  # stream/assignment
  # stream/assignment/new
  def index
    klass ||= params[:klass]
    item ||= params[:item]
    modifier ||= params[:modifier]
    @menu, @stream_header, @pages = generate_data(klass, item, modifier)
    @stream_subclass = @stream_header.singularize.downcase
    @profile = current_user
    respond_with @pages
  end

  private
  def generate_data(klass, item, modifier)
    new_only = modifier == 'new'
    menu = generate_menu
    stream = case klass
    when 'stream'
      stream_header = item.humanize.pluralize
      generate_stream(item, new_only, false)
    else
      # Default: stream/all
      stream_header = 'All Content'
      generate_stream('all', new_only, false)
    end

    [menu, stream_header, stream]
  end

  def generate_stream(data, new_only = true, count_only = true)
    conditions = data == 'all' ? "" : "page_type = '#{data}'"
    if count_only
      Page.count(:all, :conditions => conditions)
    else
      Page.find(:all, :conditions => conditions, :order => :is_sticky)
    end
  end

  def generate_menu
    [
      {:title => 'All Content', :count => generate_stream('all'),        :path => 'stream/all',        :icon => 'empty_icon'},
      {:title => 'Assignments', :count => generate_stream('assignment'), :path => 'stream/assignment', :icon => 'assignment_icon'},
      {:title => 'Articles',    :count => generate_stream('article'),    :path => 'stream/article',    :icon => 'article_icon'},
      {:title => 'Messages',    :count => generate_stream('message'),    :path => 'stream/message',    :icon => 'message_icon'},
      {:title => 'Events',      :count => generate_stream('event'),      :path => 'stream/event',      :icon => 'event_icon'},
    ]
  end
end
