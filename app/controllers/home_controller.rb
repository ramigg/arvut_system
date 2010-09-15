class HomeController < ApplicationController

  # Login help must be accessible to even non-authenticated users
  skip_before_filter :authenticate_user!, :only => :login_help

  #TODO Email should be sent asynchronousely
  #TODO Email should be sent via external provider (Gmail?)
  #TODO Implement other in questionnaire answer
  #FIXME Export to excel should work without warning

  def index
    # State machine stuff
    current_user.came_home
    eval current_user.redirect, binding()
    return
  end

  def dashboard
    # Last 10 questionnaires
    @last_10_questionnaires = current_user.last_10_questionnaires

    require 'feed_tools'
    @feed = FeedTools::Feed.open(I18n.t('home.views.feed'))

    # Statistics
    @start = 4.week.ago.strftime('%Y-%m-%d')
    @finish = Time.now.strftime('%Y-%m-%d')
  end

  def login_help
    @resource = User.new
    @resource_name = @resource.class.to_s.underscore
  end
end
