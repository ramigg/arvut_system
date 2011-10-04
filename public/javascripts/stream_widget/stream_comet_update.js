
var LZ77 = function (settings) {

  settings = settings || {};

  // PRIVATE
  var referencePrefix = "`";
  var referenceIntBase = settings.referenceIntBase || 96;
  var referenceIntFloorCode = " ".charCodeAt(0);
  var referenceIntCeilCode = referenceIntFloorCode + referenceIntBase - 1;
  var maxStringDistance = Math.pow(referenceIntBase, 2) - 1;
  var minStringLength = settings.minStringLength || 5;
  var maxStringLength = Math.pow(referenceIntBase, 1) - 1 + minStringLength;
  var defaultWindowLength = settings.defaultWindowLength || 144;
  var maxWindowLength = maxStringDistance + minStringLength;

  var encodeReferenceInt = function (value, width) {
    if ((value >= 0) && (value < (Math.pow(referenceIntBase, width) - 1))) {
      var encoded = "";
      while (value > 0) {
        encoded = (String.fromCharCode((value % referenceIntBase) + referenceIntFloorCode)) + encoded;
        value = Math.floor(value / referenceIntBase);
      }
      var missingLength = width - encoded.length;
      for (var i = 0; i < missingLength; i++) {
        encoded = String.fromCharCode(referenceIntFloorCode) + encoded;
      }
      return encoded;
    } else {
      throw "Reference int out of range: " + value + " (width = " + width + ")";
    }
  };

  var encodeReferenceLength = function (length) {
    return encodeReferenceInt(length - minStringLength, 1);
  };

  var decodeReferenceInt = function (data, width) {
    var value = 0;
    for (var i = 0; i < width; i++) {
      value *= referenceIntBase;
      var charCode = data.charCodeAt(i);
      if ((charCode >= referenceIntFloorCode) && (charCode <= referenceIntCeilCode)) {
        value += charCode - referenceIntFloorCode;
      } else {
        throw "Invalid char code in reference int: " + charCode;
      }
    }
    return value;
  };

  var decodeReferenceLength = function (data) {
    return decodeReferenceInt(data, 1) + minStringLength;
  };

  // PUBLIC

  /**
   * Compress data using the LZ77 algorithm.
   *
   * @param data
   * @param windowLength
   */
  this.compress = function (data, windowLength) {
    windowLength = windowLength || defaultWindowLength;
    if (windowLength > maxWindowLength) {
      throw "Window length too large";
    }
    var compressed = "";
    var pos = 0;
    var lastPos = data.length - minStringLength;
    while (pos < lastPos) {
      var searchStart = Math.max(pos - windowLength, 0);
      var matchLength = minStringLength;
      var foundMatch = false;
      var bestMatch = {distance:maxStringDistance, length:0};
      var newCompressed = null;
      while ((searchStart + matchLength) < pos) {
        var isValidMatch = ((data.substr(searchStart, matchLength) == data.substr(pos, matchLength)) && (matchLength < maxStringLength));
        if (isValidMatch) {
          matchLength++;
          foundMatch = true;
        } else {
          var realMatchLength = matchLength - 1;
          if (foundMatch && (realMatchLength > bestMatch.length)) {
            bestMatch.distance = pos - searchStart - realMatchLength;
            bestMatch.length = realMatchLength;
          }
          matchLength = minStringLength;
          searchStart++;
          foundMatch = false;
        }
      }
      if (bestMatch.length) {
        newCompressed = referencePrefix + encodeReferenceInt(bestMatch.distance, 2) + encodeReferenceLength(bestMatch.length);
        pos += bestMatch.length;
      } else {
        if (data.charAt(pos) != referencePrefix) {
          newCompressed = data.charAt(pos);
        } else {
          newCompressed = referencePrefix + referencePrefix;
        }
        pos++;
      }
      compressed += newCompressed;
    }
    return compressed + data.slice(pos).replace(/`/g, "``");
  };

  /**
   * Decompresses LZ77 compressed data.
   *
   * @param data
   */
  this.decompress = function (data) {
    var decompressed = "";
    var pos = 0;
    while (pos < data.length) {
      var currentChar = data.charAt(pos);
      if (currentChar != referencePrefix) {
        decompressed += currentChar;
        pos++;
      } else {
        var nextChar = data.charAt(pos + 1);
        if (nextChar != referencePrefix) {
          var distance = decodeReferenceInt(data.substr(pos + 1, 2), 2);
          var length = decodeReferenceLength(data.charAt(pos + 3));
          decompressed += decompressed.substr(decompressed.length - distance - length, length);
          pos += minStringLength - 1;
        } else {
          decompressed += referencePrefix;
          pos += 2;
        }
      }
    }
    return decompressed;
  };
};

// LZW-compress a string
function lzw_encode(s) {
    var dict = {};
    var data = (s + "").split("");
    var out = [];
    var currChar;
    var phrase = data[0];
    var code = 256;
    for (var i=1; i<data.length; i++) {
        currChar=data[i];
        if (dict[phrase + currChar] != null) {
            phrase += currChar;
        }
        else {
            out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
            dict[phrase + currChar] = code;
            code++;
            phrase=currChar;
        }
    }
    out.push(phrase.length > 1 ? dict[phrase] : phrase.charCodeAt(0));
    for (var i=0; i<out.length; i++) {
        out[i] = String.fromCharCode(out[i]);
    }
    return out.join("");
}

// Decompress an LZW-encoded string
function lzw_decode(s) {
    var dict = {};
    var data = (s + "").split("");
    var currChar = data[0];
    var oldPhrase = currChar;
    var out = [currChar];
    var code = 256;
    var phrase;
    for (var i=1; i<data.length; i++) {
        var currCode = data[i].charCodeAt(0);
        if (currCode < 256) {
            phrase = data[i];
        }
        else {
           phrase = dict[currCode] ? dict[currCode] : (oldPhrase + currChar);
        }
        out.push(phrase);
        currChar = phrase.charAt(0);
        dict[code] = oldPhrase + currChar;
        code++;
        oldPhrase = phrase;
    }
    return out.join("");
}

(function($) {
    // Stream Comet Push application
    $.SteamCometUpdateApp = function(comet_app) {
        var _self = this;
        var channel_2 = "/auth/2";
        var channel_3 = "/auth/3";
        var channel_4 = "/auth/4";
        var channel_5 = "/auth/5";

        function connectionEsteblished() {
            _self.update_others = function(data) {
                //4178 - LZW_encode. (size in bytes)
                //2842 - LZ77. (size in bytes)
                //3200 - No encoding. (size in bytes)
                // Note that string length is not byte size.
                //lz77 = new LZ77();
                //c1 = lz77.compress(data);
                //compressed = lzw_encode(data);
                //one = data.length;
                //two = compressed.length;
                //three = c1.length;
                //comet_app.publish(channel_2, compressed);
                //comet_app.publish(channel_2, c1);
                comet_app.publish_multi_packet(channel_2, data);
            };

            _self.update_others_label = function(data) {
                comet_app.publish(channel_3, data);
            };

            _self.update_others_sketches = function(data) {
                comet_app.publish(channel_4, data);
            };

            comet_app.subscribe_multi_packet(channel_2, function(data) {
                //lz77 = new LZ77();
                //uncompressed = lz77.compress(data);
                kabtv.tabs.init(data);
            });

            comet_app.subscribe(channel_3, function(data) {
                 $('.online-status').html(data.data.res);
            });

            comet_app.subscribe(channel_4, function(data) {
                 kabtv.sketches.transit_init(data.data);
            });
        };


        function sanityCheck() {
          if (comet_app.isConnected()) {
            connectionEsteblished();
          }
        };

        function resetMethods() {
          comet_app.unsubscribe_multi_packet(channel_2);
          comet_app.unsubscribe(channel_3);
          comet_app.unsubscribe(channel_4);
          _self.update_others = function(data) { sanityCheck(); };
          _self.update_others_label = function(data) { sanityCheck(); };
          _self.update_others_sketches = function(data) { sanityCheck(); };
        };

        function resetMethodsAndTimestamp() {
          kabtv.tabs.timestamp = "";
          resetMethods();
        };

        comet_app.addHooks(
            connectionEsteblished, //connectionEstablished, // hook for event, may be null
            resetMethods, //connectionBroken, // hook for event, may be null
            resetMethodsAndTimestamp //connectionClosed // hook for event, may be null
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

function publish_sketches_4_comet() {
    function publish_data_to_comet(data) {
        if (typeof(stream_comet_update_app) != "undefined"
            && stream_comet_update_app != null) {
            stream_comet_update_app.update_others_sketches(data);
        }
    }

    $.ajax({
        url: kabtv.sketches.url_for_classboard,
        data: {
            total: kabtv.sketches.total
        },
        success: publish_data_to_comet
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
