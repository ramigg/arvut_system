(function ($) {

    if (!window.kabtv) {
        window.kabtv = {};
    }
    if (!kabtv.sketches) {
        kabtv.sketches = {};
    }

    $.extend(kabtv.sketches, {
        total: 0,
        $current: 0,
        $images: 0,
        $first: 0,
        $last: 0,
        $in_transition: false,
        url_for_classboard: '',

        pollID: 0,
        pollSketches: function() {
            $.ajax({
                url: kabtv.sketches.url_for_classboard,
                data: {
                    total: kabtv.sketches.total,
                    stream_preset_id: kabtv.tabs.stream_preset_id
                },
                success: kabtv.sketches.transit_init
            });
        },

        startPollingSketches: function () {
            kabtv.sketches.pollID = setInterval(kabtv.sketches.pollSketches, 30000);
        },

        stopPollingSketches: function () {
            if (kabtv.sketches.pollID == 0) return;
            clearInterval(kabtv.sketches.pollID);
            kabtv.sketches.pollID = 0;
        },

        transit_init: function (data) {
            // Note: data is already inserted by JS received from server
            show_new_sketches = false;
            transition_to_last = false;
            kabtv.sketches.$images = $('.content .images img');
            if (kabtv.sketches.total == 0) {
                // There were no images before
                if (kabtv.sketches.$images.length > 0) {
                    // But now there is something...
                    // The first time some images were added
                    kabtv.sketches.total = kabtv.sketches.$images.length;
                    kabtv.sketches.$last = kabtv.sketches.$current = kabtv.sketches.$images.last();
                    kabtv.sketches.$first = kabtv.sketches.$images.first();
                    kabtv.sketches.$last.css('z-index', 10); // Become the upper for sure
                    $('#sketches .title').text(kabtv.sketches.total + '/' + kabtv.sketches.total);
                } else {
                    // And still there are no images
                }
            } else {
                // There were some images
                if (kabtv.sketches.$images.length > 0) {
                    // And now we have some...
                    if (kabtv.sketches.$images.length < kabtv.sketches.total) {
                        // And now there are less: full or partial reset
                        kabtv.sketches.total = kabtv.sketches.$images.length;
                        kabtv.sketches.$last = kabtv.sketches.$current = kabtv.sketches.$images.last();
                        kabtv.sketches.$first = kabtv.sketches.$images.first();
                        kabtv.sketches.$last.css('z-index', 10); // Become the upper for sure
                        $('#sketches .title').text(kabtv.sketches.total + '/' + kabtv.sketches.total);
                    } else if (kabtv.sketches.total < kabtv.sketches.$images.length) {
                        // Only if new amount of images are here now (either appended or resetted)
                        if (kabtv.sketches.$current == kabtv.sketches.$last) {
                            // We're on the last image...
                            transition_to_last = true;
                        } else {
                            show_new_sketches = true;
                        }
                        kabtv.sketches.total = kabtv.sketches.$images.length;
                        kabtv.sketches.$last = kabtv.sketches.$images.last();
                        $('#sketches .title').text((kabtv.sketches.$current.index() + 1) + '/' + kabtv.sketches.total);
                    }
                } else {
                    // And now there are nothing: full reset
                    kabtv.sketches.total = 0;
                    kabtv.sketches.$last = kabtv.sketches.$current = kabtv.sketches.$first = 0;
                    $('#sketches .title').text('0/0');
                }
            }
            if (show_new_sketches)
                $('#new_sketches').show();
            else
                $('#new_sketches').hide();
            kabtv.sketches.$in_transition = false;
            if (transition_to_last)
                kabtv.sketches.last();
        },

        first: function () {
            if (kabtv.sketches.total <= 1)
                return;
            kabtv.sketches.$item = kabtv.sketches.$first;
            kabtv.sketches.transit_to();
        },

        last: function () {
            if (kabtv.sketches.total <= 1)
                return;
            kabtv.sketches.$item = kabtv.sketches.$last;
            kabtv.sketches.transit_to();
            $('#new_sketches').hide();
        },

        prev: function () {
            if (kabtv.sketches.total <= 1)
                return;
            kabtv.sketches.$item = kabtv.sketches.$current.prev();
            kabtv.sketches.transit_to();
        },

        next: function () {
            if (kabtv.sketches.total <= 1)
                return;
            kabtv.sketches.$item = kabtv.sketches.$current.next();
            kabtv.sketches.transit_to();
        },

        transit_to: function () {
            if (kabtv.sketches.$item.length == 0 ||
                kabtv.sketches.$current === kabtv.sketches.$item || kabtv.sketches.$in_transition) return;
            kabtv.sketches.$in_transition = true;

            kabtv.sketches.$item.css('z-index', 9); // Beneath the upper one
            kabtv.sketches.$current.animate({
                    opacity: 0
                }, 1000, 'linear', // Hide the upper one
                function() {
                    kabtv.sketches.$item.css('z-index', 10); // Become the upper
                    kabtv.sketches.$current.css({
                        'z-index': 1,
                        'opacity': 1
                    }); // Go back
                    kabtv.sketches.$current = kabtv.sketches.$item;
                    $('#sketches .title').text((kabtv.sketches.$current.index() + 1) + '/' + kabtv.sketches.total);
                    kabtv.sketches.$in_transition = false;
                }
            );
        }
    });

})(jQuery);

(function ($) {
    if (!window.kabtv) {
        window.kabtv = {};
    }
    if (!kabtv.schedule) {
        kabtv.schedule = {};
    }

    $.extend(kabtv.schedule, {
        show_day: function(me, day) {
            var $me = $(me);
            $me.parent().children().removeClass('active');
            $me.addClass('active');
            $(".weekdays>div").hide();
            $(".D_" + day).show();
        }
    });

})(jQuery);

(function ($) {

    if (!window.kabtv) {
        window.kabtv = {};
    }
    if (!kabtv.questions) {
        kabtv.questions = {};
    }

    $.extend(kabtv.questions, {
        url_for_more_questions: '',
        pollID: 0,
        pollQuestions: function() {
            $.ajax({
                url: kabtv.questions.url_for_more_questions,
                data: {
                    last_question_id: last_question_id,
                    stream_preset_id: kabtv.tabs.stream_preset_id
                }
            });
        },

        startPollingQuestions: function () {
            kabtv.questions.pollID = setInterval(kabtv.questions.pollQuestions, 30000);
        },

        stopPollingQuestions: function () {
            if (kabtv.questions.pollID == 0) return;
            clearInterval(kabtv.questions.pollID);
            kabtv.questions.pollID = 0;
        },

        toggleAskAndQuestions: function () {
            $(".question-list").toggle();
            $(".question-ask").toggle();
        }
    });

})(jQuery);

function create_flash_object(clip, url) {
    $("#object").html('');
    $f('object',
        { src: 'flowplayer/flowplayer.commercial-3.2.7.swf', wmode: 'transparent', id: 'player' },
        {
            key: '#\@432d5aedb59612f8458',
            clip: {
                url: clip,
                live: true,
                bufferLength: 5,
                provider: 'rtmp',
                scaling: 'fit',
                onBeforePause : function() {
                    return false;
                }
            },
            plugins: {
                rtmp: {
                    url: 'flowplayer.rtmp-3.2.3.swf',
                    proxyType: 'HTTP',
                    netConnectionUrl: url
                },
                controls: {
                    "borderRadius":"0px",
                    "timeColor":"#ffffff",
                    "bufferGradient":"none",
                    "backgroundColor":"rgba(0, 0, 0, 0)",
                    "volumeSliderGradient":"none",
                    "timeBorderRadius":20,
                    "progressGradient":"none",
                    "time":false,
                    "height":26,
                    "volumeColor":"#4599ff",
                    "tooltips": {
                        "marginBottom":5,
                        "buttons":true,
                        "fullscreen": 'Full Screen'
                    },
                    "opacity":1,
                    "timeFontSize":12,
                    "border":"0px",
                    "bufferColor":"#a3a3a3",
                    "volumeSliderColor":"#ffffff",
                    "buttonColor":"#ffffff",
                    "autoHide":{
                        "enabled":true,
                        "hideDelay":500,
                        "mouseOutDelay":500,
                        "hideStyle":"fade",
                        "hideDuration":400,
                        "fullscreenOnly":true
                    },
                    "backgroundGradient":"medium",
                    "width":"100pct",
                    "display":"block",
                    "sliderBorder":"1px solid rgba(128, 128, 128, 0.7)",
                    "buttonOverColor":"#ffffff",
                    "url":"flowplayer.controls-3.2.5.swf",
                    "timeBgColor":"rgb(0, 0, 0, 0)",
                    "scrubberBarHeightRatio":0.2,
                    "bottom":0,
                    "buttonOffColor":"rgba(130,130,130,1)",
                    "stop":true,
                    "zIndex":1,
                    "sliderColor":"#000000",
                    "scrubberHeightRatio":0.6,
                    "tooltipTextColor":"#ffffff",
                    "spacing":{"time":6,"volume":8,"all":2},
                    "sliderGradient":"none",
                    "timeBgHeightRatio":0.8,
                    "volumeSliderHeightRatio":0.6,
                    "name":"controls",
                    "timeSeparator":" ",
                    "volumeBarHeightRatio":0.2,
                    "left":"50pct",
                    "tooltipColor":"rgba(0, 0, 0, 0)",
                    "durationColor":"#b8d9ff",
                    "play":false,
                    "timeBorder":"0px solid rgba(0, 0, 0, 0.3)",
                    "progressColor":"#4599ff",
                    "scrubber":false,
                    "volumeBorder":"1px solid rgba(128, 128, 128, 0.7)",
                    "builtIn":false,
                    "margins":[2,12,2,12]
                }
            }
        }
    );
    $('#object').css('background-color', 'black');
}

(function ($) {

    if (!window.kabtv) {
        window.kabtv = {};
    }
    if (!kabtv.tabs) {
        kabtv.tabs = {};
    }

    $.extend(kabtv.tabs, {
        presets : null,
        stream_preset_id : 0,
        preset_data : null,
        languages : null,
        lang_options: null,
        flash_technology: null,
        timestamp: 0,
        flash: pluginlist.indexOf("Flash") != -1,
        wmv: pluginlist.indexOf("Windows Media Player") != -1,
        technologies: null,

        url_for_presets_update: '',
        poll_tabs: true,
        poll_support: true,
        pollID: 0,
        pollPresets: function() {
            $.ajax({
                timeout: 5000,
                url: kabtv.tabs.url_for_presets_update,
                data: {
                    timestamp: kabtv.tabs.timestamp,
                    stream_preset_id: kabtv.tabs.stream_preset_id
                },
                success: kabtv.tabs.init
            });
            kabtv.tabs.poll_support && $.ajax({
                url: 'http://live.kab.tv/button.php',
                data: {
                    image: 'tech',
                    lang: 'ru',
                    no_image: 1
                },
                dataType: 'jsonp',
                success: function(msg) {
                    $('.online-status').html(msg.res);
                }
            });
        },

        // init
        init: function(data) {
            if (data == "")
                return;
            eval(data);

            // Check for timestamp
            if (kabtv.tabs.timestamp == timestamp)
                return;
            kabtv.tabs.timestamp = timestamp;

            // Now we have local preset_data (what to show; activity status) and presets themselves
            var reload_player = false;

            // If activity status was changed - reload player
            // If not active and stream state was changed - reload player
            if ((kabtv.tabs.preset_data == null) || (kabtv.tabs.preset_data.stream_preset.is_active != preset_data.stream_preset.is_active) ||
                (!preset_data.stream_preset.is_active && preset_data.stream_preset.stream_state_id != kabtv.tabs.preset_data.stream_preset.stream_state_id)) {
                reload_player = true;
            }

            // If presets were changed...
            // If presets are not defined, check where data comes from.
            if (kabtv.tabs.presets != presets || kabtv.tabs.preset_data != preses_data || kabtv.tabs.languages != languages || kabtv.tabs.lang_options != lang_options) {
                kabtv.tabs.presets = presets;
                kabtv.tabs.preset_data = preset_data;
                kabtv.tabs.languages = languages;
                kabtv.tabs.lang_options = lang_options;
                kabtv.tabs.technologies = technologies;

                reload_player = setup_player() || reload_player;
            }

            // Sync presets and redraw player
            if (reload_player) {
                var stream_url = $("select#quality_id").val();
                kabtv.tabs.draw_player(stream_url);
            }
        },

        startPollingPresets: function () {
            var elem = $("select#language_id");
            var parent = $("#uniform-" + elem[0].id);
            if (parent.length == 0) elem.uniform();
            elem = $("select#quality_id");
            parent = $("#uniform-" + elem[0].id);
            if (parent.length == 0) elem.uniform();

            kabtv.tabs.pollID = setInterval(kabtv.tabs.pollPresets, 15000);
        },

        stopPollingPresets: function () {
            if (kabtv.tabs.pollID == 0) return;
            clearInterval(kabtv.tabs.pollID);
            kabtv.tabs.pollID = 0;
            kabtv.tabs.timestamp = 0;
        },

        select_me: function(me, name) {
            $('.tabs span').removeClass('active');
            $(me).parent().addClass('active');
            $('.content>div').hide();
            $('.content #' + name).show();
            return false;
        },

        object: '<object width="320" height="305" name="player" id="player" type="video/x-ms-wmv" data="URL_PATTERN"> \
        <param value="URL_PATTERN" name="src"/> \
        <param value="true" name="autostart"/> \
        <param value="true" name="controller"/> \
        <param value="50" name="volume"/> \
        <param value="full" name="uiMode"/> \
        <param value="true" name="animationAtStart"/> \
        <param value="false" name="showDisplay"/> \
        <param value="true" name="ShowAudioControls"/> \
        <param value="false" name="ShowPositionControls"/> \
        <param value="false" name="transparentAtStart"/> \
        <param value="true" name="ShowControls"/> \
        <param value="true" name="ShowStatusBar"/> \
        <param value="false" name="ShowTracker"/> \
        <param value="false" name="ClickToPlay"/> \
        <param value="#000000" name="DisplayBackColor"/> \
        <param value="#ffffff" name="DisplayForeColor"/> \
        <param value="false" name="balance"/> \
        <param value="false" name="enableContextMenu"/> \
        <embed height="305" width="320" showstatusbar="1" showcontrols="1" src="URL_PATTERN" pluginspage="http://www.microsoft.com/Windows/MediaPlayer/" type="application/x-mplayer2">\
        </object>',
        objectFF7: '<object width="320" height="305" name="player" id="player" type="video/x-oleobject" classid="CLSID:22D6F312-B0F6-11D0-94AB-0080C74C7E95" data="URL_PATTERN"> \
        <param value="URL_PATTERN" name="src"/> \
        <param value="true" name="autostart"/> \
        <param value="true" name="controller"/> \
        <param value="50" name="volume"/> \
        <param value="full" name="uiMode"/> \
        <param value="true" name="animationAtStart"/> \
        <param value="false" name="showDisplay"/> \
        <param value="true" name="ShowAudioControls"/> \
        <param value="false" name="ShowPositionControls"/> \
        <param value="false" name="transparentAtStart"/> \
        <param value="true" name="ShowControls"/> \
        <param value="true" name="ShowStatusBar"/> \
        <param value="false" name="ShowTracker"/> \
        <param value="false" name="ClickToPlay"/> \
        <param value="#000000" name="DisplayBackColor"/> \
        <param value="#ffffff" name="DisplayForeColor"/> \
        <param value="false" name="balance"/> \
        <param value="false" name="enableContextMenu"/> \
        </object>',
        objectMSIE: '<object classid="clsid:6BF52A52-394A-11D3-B153-00C04F79FAA6" \
        style="background-color:#000000" id="player" name="player" type="application/x-oleobject" \
        width="320" height="288" standby="Loading Windows Media Player components...">\
        <param name="URL" value="URL_PATTERN" /><param name="AutoStart" value="1" />\
        <param name="AutoPlay" value="1" /><param name="volume" value="50" />\
        <param name="uiMode" value="full" /><param name="animationAtStart" value="1" />\
        <param name="showDisplay" value="1" /><param name="transparentAtStart" value="0" />\
        <param name="ShowControls" value="1" /><param name="ShowStatusBar" value="1" />\
        <param name="ClickToPlay" value="0" /><param name="bgcolor" value="#000000" />\
        <param name="enableContextMenu" value="0" />\
        <param name="windowlessVideo" value="1" /><param name="balance" value="0" />',

        draw_player: function(url) {
            if (url == null) return;

            var object;
            if (kabtv.tabs.preset_data.stream_preset.is_active) {
                var current_technology = $("#technologies input[@name=technology_id]:checked").val();
                if (kabtv.tabs.flash_technology == current_technology) { // Flash
                    try {
                        var match = url.match(/clip=(.*);stream=(.*)/);
                        create_flash_object(match[1], match[2]);
                    } catch(err) {
                        ;
                    }
                } else { // WMV
                    if ($.browser.msie)
                        object = kabtv.tabs.objectMSIE.replace(/URL_PATTERN/g, url);
                    else if ($.browser.mozilla && $.browser.version.slice(0, 3) == '7.0')
                        object = kabtv.tabs.objectFF7.replace(/URL_PATTERN/g, url);
                    else
                        object = kabtv.tabs.object.replace(/URL_PATTERN/g, url);
                    $('#object').html(object);
                }
            } else {
                var lang_id = $("select#language_id").val();
                object = kabtv.tabs.presets[lang_id].image;
                $('#object').html(object);
            }
        },

        detach: function() {
            var $obj = $('#player');
            if ($obj) {
                var obj = $obj[0];
                if (obj.URL) {
                    if (obj.controls && obj.controls.isAvailable('Stop')) {
                        obj.controls.stop();
                    }
                    obj.openPlayer(obj.URL);
                }
            }
        },

        fs: function() {
            var $obj = $('#player');
            if ($obj) {
                var obj = $obj[0];
                if (obj.playState && obj.playState == 3) {
                    obj.fullScreen = true;
                    obj.fullScreen = 'true';
                }
            }
        }
    });

})(jQuery);

function setup_player() {
    var current_language = $("select#language_id").val();
    var current_stream_url = $("select#quality_id").val();
    var current_stream_quality = $("select#quality").text();
    var current_technology = $("#technologies input[@name=technology_id]:checked").val();
    var presets = kabtv.tabs.presets[current_language];

    // Reset languages
    $("select#language_id option").remove();
    $(kabtv.tabs.lang_options).appendTo('select#language_id');
    $("select#language_id").prev().text($("select#language_id :selected").text());
    if (current_language == null)
        current_language = $("select#language_id").val();

    // Check that the URL present
    var url_present = $.grep(kabtv.tabs.presets, function(n, i) {
        return current_stream_url == n.url;
    });
    if (url_present.length > 0) {
        reload_player = false;
        var default_technology_id = url_present[0].tid;
        var lang_obj = $.grep(kabtv.tabs.languages, function(n, i) {
            return n.lid == current_language
        })[0];
        var lod = lang_obj;
        lod.tid = default_technology_id;
        set_player_technology(lod, default_technology_id);
    } else {
        reload_player = true; // Reload player
        var lang_obj = current_language ? $.grep(kabtv.tabs.languages, function(n, i) {
            return n.lid == current_language
        })[0] : kabtv.tabs.languages[0];
        var default_technology_id = lang_obj.tid;
        set_player_technology(lang_obj, default_technology_id);
    }

    $('#user_complain_language_id').val(current_language);
    $('#user_complain_technology_id').val(current_technology);
    $('#user_complain_quality_url').val($("select#quality_id :selected").val());

    if (current_technology == kabtv.tabs.flash_technology) {
        $('.player-btn').hide();
    } else {
        $('.player-btn').show();
    }

    return reload_player;
}

function set_player_quality(lang_id, technology_id) {
    var qualities = "";
    $.each(kabtv.tabs.presets, function (i, v) {
        if (v.tid == technology_id && v.pid == lang_id) {
            qualities += "<option value='" + v.url + "' " + (v.def ? "selected = 'selected'" : "" ) + "'>" + v.qname + "</option>";
        }
    });
    // Clear quality select
    $("select#quality_id option").remove();
    $(qualities).appendTo("#quality_id");
    $("select#quality_id").prev().text($("select#quality_id :selected").text());
}
function set_player_technology(lang_obj, technology_id) {
    // Create list of technologies
    var techs = '';
    if (kabtv.tabs.flash) {
        var f = $.grep(kabtv.tabs.technologies, function(n, i) {
            return n.technology.name == 'Flash'
        });
        if (f != 'undefined') {
            var id = f[0].technology.id;
            techs += '<input type="radio" name="technology_id" value="' + id + '"' + (lang_obj.tid == id && technology_id == kabtv.tabs.flash_technology ? 'checked="checked"' : '') + '>Flash</input>';
        }
    }
    if (kabtv.tabs.wmv) {
        var f = $.grep(kabtv.tabs.technologies, function(n, i) {
            return n.technology.name == 'WMV'
        });
        if (f != 'undefined') {
            var id = f[0].technology.id;
            techs += '<input type="radio" name="technology_id" value="' + id + '"' + (lang_obj.tid == id && technology_id != kabtv.tabs.flash_technology ? 'checked="checked"' : '') + '>WMV</input>';
        }
    }
    $("#technologies").html(techs);
    var current_language = $("select#language_id").val();
    set_player_quality(current_language, technology_id);
}
