(function($)
{
	// Push application
  $.CometApp = function(
    contextPath, // CometD server path or ip
    applicationId, // String identifying the application id, base channel
    username, // For authenticated applications only, if null no authentication
    verify, // For authenticated applications only, if null no authentication
    connectionEstablished, // hook for event, may be null
    connectionBroken, // hook for event, may be null
    connectionClosed // hook for event, may be null
    )
	{
	  // Initialization
	  var _self = this;
	  var _contextPath = contextPath;
	  var _applicationId = applicationId;
	  var _auth = {};
    var _connected = false;
    var _channelHandlers = {};

    // Hooks
    var _connectionEstablished = connectionEstablished;
    var _connectionBroken = connectionBroken;
    var _connectionClosed = connectionClosed;

	  if (username != null && verify != null) {
      _auth = {"username":username, "verify":verify, "appId":applicationId}
    }

	  // End of initialization

	  // Private member functions
	  function handshake() {
      var cometdURL = "http://" + _contextPath + "/cometd";
		  $.cometd.configure({
        url: cometdURL,
        logLevel: 'debug',
        maxNetworkDelay: 6*30000
        //Cross origin sharing problems in HTTP
        //requestHeaders: {"username":config.username, "verify":config.verify}
      });

      _auth["page"] = document.location.href;
      $.cometd.handshake(_auth);
      delete _auth["page"]
	  }

    this.addHooks = function(connectionEstablished, connectionBroken, connectionClosed) {
      if (_connectionEstablished == null)
        _connectionEstablished = connectionEstablished;
      else
        _connectionEstablished = function() { _connectionEstablished(); connectionEstablished(); };

      if (_connectionBroken == null)
        _connectionBroken = connectionBroken;
      else
        _connectionBroken = function() { _connectionBroken(); connectionBroken(); };

      if (_connectionClosed == null)
        _connectionClosed = connectionClosed;
      else
        _connectionClosed = function() { _connectionClosed(); connectionClosed(); };
    }

    this.isConnected = function() {
      return _connected;
    }

    this.connect = function() {
      $.cometd.addListener('/meta/connect',
        function(message) {
			    if ($.cometd.isDisconnected()) {
			      _connectionClosed();
			      return;
		      }

		      var wasConnected = _connected;
		      _connected = message.successful;

		      if (!wasConnected && _connected) {
		        if (_connectionEstablished != null) {
  			      _connectionEstablished();
            }
		      } else if (wasConnected && !_connected)	{
		        if (_connectionBroken != null)
			      	_connectionBroken();
		    	}
			});

			$.cometd.addListener('/meta/disconnect',
        function(message) {
			    if (message.successful)
			    {
			        _connected = false;
			    }
			  });

			handshake();
    }

    this.addListener = function(channel, listenerFunction) {
      $.cometd.addListener(channel, listenerFunction);
    }

    this.disconnect = function() {
    	$.cometd.disconnect();
    };

    this.subscribeToServiceChannel = function(channel, receiveFunction) {
      // TODO!!!
    }

    this.publishToService = function(channel, message) {
      // TODO!!!
    }

    this.subscribe = function(channel, receiveFunction) {
      if (channel in _channelHandlers)
        unsubscribe(channel);
      _auth["page"] = document.location.href;
   	  _channelHandlers[channel] = $.cometd.subscribe(channel, receiveFunction, _auth);
      delete _auth["page"]
    };

    this.unsubscribe = function(channel) {
      if (channel in _channelHandlers) {
        $.cometd.unsubscribe(_channelHandlers[channel], _auth);
        delete  _channelHandlers[channel];
      }
    };

    this.publish = function(channel, msg) {
      _auth["page"] = document.location.href;
    	$.cometd.publish(channel, msg, _auth)
      delete _auth["page"]
    };
	};
})(jQuery);
