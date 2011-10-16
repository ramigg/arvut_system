(function($)
{
    // Button Push application
    $.ButtonUpdateApp = function(
      comet_app,
      users_group_id,
      user_self_id)
    {
      var _self = this;
      var user_id = user_self_id;
      var group_id = users_group_id;
      var channel = "/auth/1";

      function connectionEsteblished()
      {
        _self.update_others = function(is_click, today_clicks, today_total, today_all_clicks, today_all_total, today_group_clicks, today_group_total) {
          //alert("update others " + group_id + " " + today_all_clicks
          //  + " " + today_all_total + " " + today_group_clicks + " " + today_group_total );

          comet_app.publish(channel, {
            "group_id":group_id,
            "user_id": user_id,
            "is_click": is_click,
            "today_clicks": today_clicks,
            "today_total": today_total,
            "today_all_clicks": today_all_clicks,
            "today_all_total": today_all_total,
            "today_group_clicks": today_group_clicks,
            "today_group_total": today_group_total});
        };

        comet_app.subscribe(channel, function(message) {
          if (message.data.user_id == user_id)
          {
            $('.clicks-set-info span').html(message.data.today_total);
            if (message.data.is_click) set_we();
            if(message.data.today_clicks > message.data.today_total) {
              refresh_clicks_chart(1, 1);
            } else {
              refresh_clicks_chart(message.data.today_clicks, message.data.today_total);
            }
            refresh_chart_text(message.data.today_clicks, message.data.today_total);
          }

          if (message.data.group_id == group_id)
          {
            refresh_group_clicks_chart(message.data.today_group_clicks, message.data.today_group_total);
            refresh_group_chart_text(message.data.today_group_clicks, message.data.today_group_total);
          }

          refresh_all_clicks_chart(message.data.today_all_clicks, message.data.today_all_total);
          refresh_all_chart_text(message.data.today_all_clicks, message.data.today_all_total);
        })
      };

      function resetMethods() {
        comet_app.unsubscribe(channel);

        _self.update_others = function(is_click, today_clicks,
          today_total, today_all_clicks, today_all_total,
          today_group_clicks, today_group_total) {};
      };

      comet_app.addHooks(
        connectionEsteblished, //connectionEstablished, // hook for event, may be null
        resetMethods, //connectionBroken, // hook for event, may be null
        resetMethods //connectionClosed // hook for event, may be null
      );

      if (comet_app.isConnected())
        connectionEsteblished();
      else
        resetMethods();
    };
})(jQuery);
