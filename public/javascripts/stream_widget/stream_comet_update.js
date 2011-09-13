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
