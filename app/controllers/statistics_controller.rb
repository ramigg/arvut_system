require 'google_visualization'
include Google::Visualization


class StatisticsController < ActionController::Metal
  include ActionController::Rendering
  
  def new
    I18n.locale = params[:locale]
    @basic = Statistics::Basic.new request

    case params[:chart]
    when 'reg-vs-active'
      reg_vs_active
    else
      reg_vs_active
    end
    
    render :text => @chart.render, :content_type => 'text/javascript'
  end

  def reg_vs_active
    target = params[:target] || 'statistics'
    date_text = @basic.revert(I18n.t('home.views.date'))
    active_text = @basic.revert(' ' + I18n.t('home.views.active'))
    registered_text = @basic.revert(' ' + I18n.t('home.views.registered'))
    title_text = @basic.revert(' ' + I18n.t('home.views.title_registered_vs_active'))
    options = {
      :columns => [
        {:type => DataType::STRING, :label => date_text},
        {:type => DataType::NUMBER, :label => active_text},
        {:type => DataType::NUMBER, :label => registered_text}
      ],
      :target => "##{target}",
      :draw_options => {
        :width => 420,
        :height => 300,
        :title => title_text,
        :titleTextStyle => {
          :color => '#2e6e9e',
        },
        :hAxis => {
#          :title => date_text,
#          :showTextEvery => 10,
        },
        :legend => 'top',
        :pointSize => 2,
      }
    }
    stat = StatisticsData::RegVsActive.new request
    data = stat.get_period params[:start], params[:finish]
    @chart = Statistics::AreaChart.new(data, options)
  end
end
