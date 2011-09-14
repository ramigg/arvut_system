(function($) {
    // Stream Comet Push application
    $.SteamCometUpdateApp = function(comet_app) {
        var _self = this;
        var channel_2 = "/auth/2";
        var channel_3 = "/auth/3";

        function connectionEsteblished() {
            _self.update_others = function(data) {
                comet_app.publish(channel_2, {
                    "data":data});
            };

            _self.update_others_label = function(data) {
                comet_app.publish(channel_3, {
                    "data":data});
            };

            comet_app.subscribe(channel_2, function(data) {
                kabtv.tabs.init(data.data.data);
            });

            comet_app.subscribe(channel_3, function(data) {
                 $('.online-status').html(data.data.data.res);
            });
        };

        function resetMethods() {
            comet_app.unsubscribe(channel_2);
            comet_app.unsubscribe(channel_3);
            _self.update_others = function(data) {};
            _self.update_others_label = function(data) {};
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

function publish_stream_preset_4_comet() {
    function publish_data_to_comet(data) {
        if (typeof(stream_comet_update_app) != "undefined"
            && stream_comet_update_app != null) {
            stream_comet_update_app.update_others(data);
        }
    }

    $.ajax({
        url: kabtv.tabs.url_for_presets_update,
        data: {
            timestamp: kabtv.tabs.timestamp,
            stream_url: $("select#quality").val()
        },
        success: publish_data_to_comet
    });

    function publish_data_to_comet_label(data) {
        if (typeof(stream_comet_update_app) != "undefined"
            && stream_comet_update_app != null) {
            stream_comet_update_app.update_others_label(data);
        }
    }

    kabtv.tabs.poll_support && $.ajax({
        url: 'http://live.kab.tv/button.php',
        data: {
            image: 'tech',
            lang: 'ru',
            no_image: 1
        },
        dataType: 'jsonp',
        success: publish_data_to_comet_label
    });
}

var stream_comet_update_app = null;
function delayedUpdataAppInit() {
    if (comet_app.isConnected()) {
        stream_comet_update_app = new $.SteamCometUpdateApp(comet_app);
    } else {
        setTimeout(delayedUpdataAppInit, 100)
    }
}

$(document).ready(function() {
    delayedUpdataAppInit();
});
