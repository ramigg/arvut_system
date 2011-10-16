function size_of_obj(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
}

function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789ABCDEF";
    for (var i = 0; i < 32; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[12] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[16] = hexDigits.substr((s[16] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01

    var uuid = s.join("");
    return uuid;
}

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
        maxNetworkDelay: 5000
        //Cross origin sharing problems in HTTP
        //requestHeaders: {"username":config.username, "verify":config.verify}
      });

      _auth["page"] = document.location.href;
      $.cometd.handshake(_auth);
      delete _auth["page"];
	  }

    this.addHooks = function(connectionEstablished, connectionBroken, connectionClosed) {
      if (_connectionEstablished == null)
        _connectionEstablished = connectionEstablished;
      else {
        var tmp = _connectionEstablished;
        _connectionEstablished = function() { tmp(); connectionEstablished(); };
      }

      if (_connectionBroken == null)
        _connectionBroken = connectionBroken;
      else {
        var tmp = _connectionBroken;
        _connectionBroken = function() { tmp(); connectionBroken(); };
      }

      if (_connectionClosed == null)
        _connectionClosed = connectionClosed;
      else {
        var tmp = _connectionClosed;
        _connectionClosed = function() { tmp(); connectionClosed(); };
      }
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
              _connectionClosed();
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
      delete _auth["page"];
    };

    this.unsubscribe = function(channel) {
      if (channel in _channelHandlers) {
        $.cometd.unsubscribe(_channelHandlers[channel], _auth);
        delete _channelHandlers[channel];
      }
    };

    this.publish = function(channel, msg) {
      _auth["page"] = document.location.href;
      $.cometd.publish(channel, msg, _auth);
      delete _auth["page"];
    };


    var _multiPacketChannels = {};
    var _multiPackets = {};
    var _multiPacketsCallbacks = {};

    function receiveMultiPacket(data) {
      if (!(data.data.id in _multiPackets))
        _multiPackets[data.data.id] = {};

      _multiPackets[data.data.id][data.data.index] = data.data.data;
      if (size_of_obj(_multiPackets[data.data.id]) == data.data.size) {
        val = "";
        for(i=0; i < data.data.size; i++)
          val += _multiPackets[data.data.id][i];
        _multiPacketsCallbacks[data.channel](val);
        delete _multiPackets[data.data.id];
      }
    }

    this.subscribe_multi_packet = function(channel, receiveFunction) {
      if (channel in _multiPacketChannels)
        unsubscribe_multi_packet(channel);
      _auth["page"] = document.location.href;
      _multiPacketsCallbacks[channel] = receiveFunction;
      _multiPacketChannels[channel] = $.cometd.subscribe(channel, receiveMultiPacket, _auth);
      delete _auth["page"];
    }

    this.unsubscribe_multi_packet = function(channel) {
      if (channel in _multiPacketChannels) {
        $.cometd.unsubscribe(_multiPacketChannels[channel], _auth);
        delete _multiPacketChannels[channel];
        delete _multiPacketsCallbacks[channel];
      }
    };

    this.publish_multi_packet = function(channel, msg) {
      URI_MAX_LEN = 1900; // Actually 2083 but we leave span
      // for outer layers of abstraction (Comet stack).
      size = Math.ceil(encodeURI(msg).length / URI_MAX_LEN);
      if (size == 0)
        size++;

      PACKET_SIZE = Math.ceil(msg.length / size);

      uuid = createUUID();

      for(i=0; i<size; i++) {
        data_len = PACKET_SIZE
        if (i == size - 1)
        {
          data_len = msg.length % PACKET_SIZE;
          if (data_len == 0)
            data_len = PACKET_SIZE;
        }
        data = {
          "id": uuid,
          "size": size,
          "data": msg.substr(i*PACKET_SIZE, data_len),
          "index": i
        };

        _auth["page"] = document.location.href;
        $.cometd.publish(channel, data, _auth);
        delete _auth["page"];
      }
    };
	};
})(jQuery);
