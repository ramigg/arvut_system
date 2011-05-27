(function($)
{
    // Push application
    $.ButtonUpdateApp = function(users_group_id, user_self_id)
    {
      var _self = this;
      var user_id = user_self_id;
      var group_id = users_group_id;
      var channel = "/auth/1";

      function connectionEsteblished()
      {
        _self.limitChanged = function(newLimit) {
          alert("limit changed "  + group_id);
        };
        
        _self.buttonPressed = function() {
          alert("button pressed " + group_id);
        };
        
        _self.update_others = function(is_click, today_clicks, today_total, today_all_clicks, today_all_total, today_group_clicks, today_group_total) {
          //alert("update others " + group_id + " " + today_all_clicks
          //  + " " + today_all_total + " " + today_group_clicks + " " + today_group_total );
          
          app.publish(channel, {
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
        
        app.subscribe(channel, function(message) {
          
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
        _self.limitChanged = function(newLimit) {
          //alert("limit changed - reset " + group_id);
        };
        
        _self.buttonPressed = function() {
          //alert("button pressed - reset " + group_id);
        };
          
        _self.update_others = function(is_click, today_clicks, today_total, today_all_clicks, today_all_total, today_group_clicks, today_group_total) {
          //alert("update others - reset " + group_id + " " + today_all_clicks
          //  + " " + today_all_total + " " + today_group_clicks + " " + today_group_total );
        };

      };
      
      resetMethods();
      
      var app = new $.App(
        "localhost:8080", //contextPath, // CometD server path or ip
        "1", //applicationId, // String identifying the application id, base channel
        "Hello World", //username, // For authenticated applications only, if null no authentication
        "ac5c3404f57a5061f36a694eb5d56214", // For authenticated applications only, if null no authentication
        connectionEsteblished, //connectionEstablished, // hook for event, may be null
        resetMethods, //connectionBroken, // hook for event, may be null
        resetMethods //connectionClosed // hook for event, may be null
      );

      app.connect();
    };

})(jQuery);
