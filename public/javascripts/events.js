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
                    total: kabtv.sketches.total
                },
                success: kabtv.sketches.transit_init
            });
        },

        startPollingSketches: function (){
            kabtv.sketches.pollID = setInterval(kabtv.sketches.pollSketches, 30000);
        },

        stopPollingSketches: function (){
            if (kabtv.sketches.pollID == 0) return;
            clearInterval(kabtv.sketches.pollID);
            kabtv.sketches.pollID = 0;
        },

        transit_init: function (data){
            // Note: data is already inserted by JS received from server
            kabtv.sketches.$images = $('.content .images img');
            if (kabtv.sketches.total == 0 && kabtv.sketches.$images.length > 0) { // The first time some images were added
                kabtv.sketches.total = kabtv.sketches.$images.length;
                kabtv.sketches.$last = kabtv.sketches.$current = kabtv.sketches.$images.last();
                kabtv.sketches.$first = kabtv.sketches.$images.first();
                kabtv.sketches.$last.css('z-index', 10); // Become the upper for sure
                $('#sketches .title').text(kabtv.sketches.total + '/' + kabtv.sketches.total);
            } else if (kabtv.sketches.total != 0 && kabtv.sketches.total != kabtv.sketches.$images.length) { // Only if more images are here now
                kabtv.sketches.total = kabtv.sketches.$images.length;
                kabtv.sketches.$last = kabtv.sketches.$images.last();
                $('#sketches .title').text((kabtv.sketches.$current.index() + 1) + '/' + kabtv.sketches.total);
                $('#new_sketches').show();
            }
        },

        first: function (){
            kabtv.sketches.transit_to(kabtv.sketches.$first);
        },

        last: function (){
            kabtv.sketches.transit_to(kabtv.sketches.$last);
            $('#new_sketches').hide();
        },

        prev: function (){
            kabtv.sketches.$item = kabtv.sketches.$current.prev();
            kabtv.sketches.transit_to(kabtv.sketches.$item);
        },

        next: function (){
            kabtv.sketches.$item = kabtv.sketches.$current.next();
            kabtv.sketches.transit_to(kabtv.sketches.$item);
        },

        transit_to: function ($item){
            if (kabtv.sketches.total <= 1 || $item.length == 0 ||
                kabtv.sketches.$current === $item || kabtv.sketches.$in_transition) return;
            kabtv.sketches.$in_transition = true;

            $item.css('z-index', 9); // Beneath the upper one
            $('#sketches .title').text(($item.index() + 1) + '/' + kabtv.sketches.total);
            kabtv.sketches.$current.animate({
                opacity: 0
            }, 1000, 'linear', // Hide the upper one
            function(){
                kabtv.sketches.$item.css('z-index', 10); // Become the upper
                kabtv.sketches.$current.css({
                    'z-index': 1,
                    'opacity': 1
                }); // Go back
                kabtv.sketches.$current = $item;
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
        show_day: function(me, day){
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
                    last_question_id: last_question_id
                }
            });
        },

        startPollingQuestions: function (){
            kabtv.questions.pollID = setInterval(kabtv.questions.pollQuestions, 30000);
        },

        stopPollingQuestions: function (){
            if (kabtv.questions.pollID == 0) return;
            clearInterval(kabtv.questions.pollID);
            kabtv.questions.pollID = 0;
        },

        toggleAskAndQuestions: function (){
            $(".question-list").toggle();
            $(".question-ask").toggle();
        }
    });

})(jQuery);


(function ($) {

    if (!window.kabtv) {
        window.kabtv = {};
    }
    if (!kabtv.tabs) {
        kabtv.tabs = {};
    }

    $.extend(kabtv.tabs, {
        presets : {},
        presets_data : {},
        timestamp: 0,

        url_for_presets_update: '',
        pollID: 0,
        pollPresets: function() {
            $.ajax({
                url: kabtv.tabs.url_for_presets_update,
                data: {
                    timestamp: kabtv.tabs.timestamp
                },
                success: kabtv.tabs.init
            });
            $.ajax({
                url: 'http://live.kab.tv/button.php',
                data: {
                    image: 'tech',
                    lang: 'ru',
                    no_image: 1
                },
                dataType: 'jsonp',
                success: function(msg){
                    $('.online-status').html(msg.res);
                }
            });

        },

        // init
        init: function(data){
            if (data == "")
                return;
            eval(data);
            var lang_id = $("select#language_id").val();
            $("select#quality option").remove();
            $(kabtv.tabs.presets[lang_id].options).appendTo('#quality');
            $("select#quality").prev().text( $("select#quality :selected").text() );
            var stream_url = $("select#quality").val();
            kabtv.tabs.draw_player(stream_url);
        },
        
        startPollingPresets: function (){
            var elem = $("select#language_id");
            var parent = $("#uniform-" + elem[0].id);
            if (parent.length == 0) elem.uniform();
            elem = $("select#quality");
            parent = $("#uniform-" + elem[0].id);
            if (parent.length == 0) elem.uniform();

            kabtv.tabs.pollID = setInterval(kabtv.tabs.pollPresets, 30000);
        },

        stopPollingPresets: function (){
            if (kabtv.tabs.pollID == 0) return;
            clearInterval(kabtv.tabs.pollID);
            kabtv.tabs.pollID = 0;
            kabtv.tabs.timestamp = 0;
        },
        select_me: function(me) {
            $('.tabs span').removeClass('active');
            $(me).parent().addClass('active');
            $('.content>div').hide();
            var name = $(me).text().toLowerCase();
            $('.content #' + name).show();
            return false;
        },

        object: '<object width="400" height="305" name="player" id="player" type="video/x-ms-wmv" data="URL_PATTERN"> \
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
        </object>',
        draw_player: function(url){
            if (url == null) return;
            if (kabtv.tabs.presets_data.stream_preset.is_active) {
                var object = kabtv.tabs.object.replace(/URL_PATTERN/g, url);
                $('#object').html(object);
            } else {
                var lang_id = $("select#language_id").val();
                $('#object').html(kabtv.tabs.presets[lang_id].image);
            }
        }
    });

})(jQuery);
