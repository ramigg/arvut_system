(function($) {
    // Stream Comet Push application
    $.SteamCometUpdateApp = function(comet_app) {
        var _self = this;
        var channel = "/auth/2";

        function connectionEsteblished() {
            _self.update_others = function(data) {
                alert("COMET update_others: " + data);
                comet_app.publish(channel, {
                    "data":data});
            };

            comet_app.subscribe(channel, function(data) {
                alert("subscribe: " + data);
                kabtv.tabs.init(data);
            })
        } ;

        function resetMethods() {
            comet_app.unsubscribe(channel);

            _self.update_others = function(data) {
            };
        } ;

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

}

/var stream_comet_update_app = null;
$(document).ready(function() {
    if (comet_app != null)
        stream_comet_update_app = new $.SteamCometUpdateApp(comet_app);
        alert(" stream_comet_update_app is not null");
});

