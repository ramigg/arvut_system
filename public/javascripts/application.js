$(function (){
    if (typeof $.fn.uniform == 'function') {
        $("select, input:checkbox, input:radio, input:file").uniform();
    }
    // Basic report generator
    if (typeof $.fn.datepicker == 'function') {
        $('.datepicker').datepicker();
        $('.datepicker').datepicker('option', {
            dateFormat: 'dd.mm.yy'
        });

        // Attendance report generator
        $('.xdatepicker').datepicker( {
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'dd.mm.yy',
            onClose: function(dateText, inst) {
                var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                month = parseInt(month) + 1;
                var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                $(this).val("1." + month + "." + year);
            }
        });
    }
});
// AJAX Report generators
$(function (){
    $("#report_new")
    .bind("ajax:success", function(data, status){
        $("#users").html(status);
    });
});

// Export report to Excel
function excel(){
    var $report = $('#report_new');
    var action = $report.attr('action');
    $report.attr('action', action + '.xls').removeAttr('data-remote');
    $report.submit().attr('action', action).attr('data-remote', 'true');
}

// Used in Questionnaire editor
function remove_fields(link, is_new_record) {
    $(link).closest("div.add_other").children("p.add_other").children("a").show();
    if(is_new_record){
        $(link).closest(".fields").remove();
    }
    else{
        $(link).prev("input[type=hidden]").val("1");
        $(link).closest(".fields").hide();
    }
}

// Used in Questionnaire editor
function add_fields(link, association, content, hide_onclick) {
    var new_id = new Date().getTime();
    var regexp = new RegExp("new_" + association, "g");
    $(link).parent().before(content.replace(regexp, new_id));
    if(hide_onclick){
        $(link).hide();
    }
}

$(document).ready(function(){
    var def_row = "<option value=\"" + "" + "\">" + "Please select" + "</option>";
    $("select#user_country_id").live('change', function(){
        var id_value_string = $(this).val();
        $("select#user_region_id").attr('disabled', 'disabled');
        $("select#user_region_id").parent().addClass('disabled');
        $("select#user_region_id option").remove();
        $(def_row).appendTo("select#user_region_id");
        $("select#user_region_id").prev().text(
            $("select#user_region_id :selected").text()
            );
        $("select#user_location_id").attr('disabled', 'disabled');
        $("select#user_location_id").parent().addClass('disabled');
        $("select#user_location_id option").remove();
        $(def_row).appendTo("select#user_location_id");
        $("select#user_location_id").prev().text(
            $("select#user_location_id :selected").text()
            );
        if (id_value_string == "") {
            // if the id is empty remove all the sub_selection options from being selectable and do not do any ajax
            return;
        } else {
            // Send the request and update sub category dropdown
            $.ajax({
                dataType: "json",
                cache: false,
                url: SITE_URL + '/en/profiles/region_ids/' + id_value_string,
                timeout: 4000,
                error: function(XMLHttpRequest, errorTextStatus, error){
                    alert("Failed to submit : " + errorTextStatus+" ;" + error);
                },
                success: function(data){
                    // Fill sub category select
                    $.each(data, function(i, j){
                        var row = "<option value=\"" + j[1] + "\">" + j[0] + "</option>";
                        $(row).appendTo("select#user_region_id");
                    });
                    $("select#user_region_id").prev().text(
                        $("select#user_region_id :selected").text()
                        );
                    $("select#user_region_id").removeAttr('disabled');
                    $("select#user_region_id").parent().removeClass('disabled');
                }
            });
        }
    });
    $("select#user_region_id").live('change', function(){
        var id_value_string = $(this).val();
        $("select#user_location_id").attr('disabled', 'disabled');
        $("select#user_location_id").parent().addClass('disabled');
        $("select#user_location_id option").remove();
        $(def_row).appendTo("select#user_location_id");
        $("select#user_location_id").prev().text(
            $("select#user_location_id :selected").text()
            );
        if (id_value_string == "") {
            // if the id is empty remove all the sub_selection options from being selectable and do not do any ajax
            return;
        } else {
            // Send the request and update sub category dropdown
            var country_id =  $("select#user_country_id").val();
            $.ajax({
                dataType: "json",
                cache: false,
                url: SITE_URL + '/en/profiles/location_ids/' + country_id + '/' + id_value_string,
                timeout: 4000,
                error: function(XMLHttpRequest, errorTextStatus, error){
                    alert("Failed to submit : " + errorTextStatus+" ;" + error);
                },
                success: function(data){
                    // Fill sub category select
                    $.each(data, function(i, j){
                        var row = "<option value=\"" + j[1] + "\">" + j[0] + "</option>";
                        $(row).appendTo("select#user_location_id");
                    });
                    $("select#user_location_id").removeAttr('disabled');
                    $("select#user_location_id").parent().removeClass('disabled');
                    $("select#user_location_id").prev().text(
                        $("select#user_location_id :selected").text()
                        );
                }
            });
        }
    });
});

function change_language(){
    var idx = $('#languages').get(0).selectedIndex;
    var href = $('#languages').get(0).options[idx].value;

    location = href;
}

function new_item(){
    var idx = $('#new-item').get(0).selectedIndex;
    var href = $('#new-item').get(0).options[idx].value;

    location = href;
}

$(function () {
    if (document.location.href.match(/\/(show_button_content)/) == null)
    {
        var update_link = document.location.href.match(/\/(stream|events|pages|profiles)\//);
        if (update_link != null) {
            var pattern = new RegExp('http://(.+)/(' + LANGS + ')/([^#]+)');
            var tail = document.location.href.match(pattern);
            if (tail != null) {
                document.location.href = 'http://' + tail[1] + '/' + tail[2] + '#' + tail[3];
            }
        }
    }
    $("#throbber").ajaxSend(function(evt, request, settings){
        if (document.location.href.match(/\#events\//) && settings.url.match(/source=(stream_container|questions|sketches)|type=(update_current_state)/))
            return;
        $(this).addClass('throbber');
    });

    $("#throbber").ajaxComplete(function(){
        $(this).removeClass('throbber');
    });

    // link parser for ajax pages history
    $('a.data-remote')
    .live('click', function (e) {
        e.preventDefault();
        var pattern = new RegExp('/(' + LANGS + ')/(.+)');
        var href = this.href.match(pattern);
        if (href != null) {
            $.bbq.pushState('#' + href[2]);
        }
        return false;
    });
    $(window).bind("hashchange", function (e) {
        var hash_str = e.fragment;
        if (hash_str != null){
            // Keep only http://.../<lang> part from href
            var pattern = new RegExp('(.+)/(' + LANGS + ')/([^#]+)');
            var tail = document.location.href.match(pattern);
            if (tail != null && tail[3] != null) {
                document.location.href = tail[1] + '/' + tail[2] + '/' + hash_str;
            }
            $.getScript(document.location.href.replace(/#/, '/'));
        } else {
            // Hash was removed
            $.getScript(document.location.href);
        }
    });
    if ($.param.fragment && $.param.fragment()) {
        $(window).trigger('hashchange');
    }

    if (typeof $.fn.colorbox == 'function') {
        $('a.in-iframe').live('click', function(){
            colorbox_iframe(this, '710px', '85%', false);
            return false;
        });
        $('a.in-wide-iframe').live('click', function(){
            colorbox_iframe(this, '80%', false, '80%');
            return false;
        });
    }
    if (typeof $.fn.autoResize == 'function') {
        $('textarea').autoResize({
            extraSpace: 40
        });
    }
});
function colorbox_iframe(obj, width, height, innerHeight)
{
    $.fn.colorbox({
        href: $(obj).attr('href'),
        iframe: true,
        open: true,
        width: width,
        height: height,
        innerHeight: innerHeight,
        arrowKey: false,
        opacity: 0.6,
        close: '',
        onComplete:function(){
            $("body").css("overflow", "hidden");
            $("#colorbox").css("display", "block");
        //                alert('document will be marked as read');
        },
        onCleanup:function(){
            $("body").css("overflow", "auto");
        //                alert('refresh the stream and menu');
        }
    });
}
function trim_val_of_elements(arrElm) {
    $.each(arrElm, function(indexInArray, valueOfElement) {
        trim_val_of_element(valueOfElement);
    });
}
function trim_val_of_element(idName) {
    var trgElm = $('#' + idName);

    if (trgElm != null && trgElm.val() != "") {
        trgElm.val(jQuery.trim(trgElm.val()));
    }
}

$(function () {
    // This kills PIE.htc with IE :(
    //    $('input:text,textarea,div.uploader span.filename').live('hover', function(event){
    //        if (event.type == 'mouseover') {
    //            $(this).addClass('shadow-class');
    //        } else {
    //            $(this).removeClass('shadow-class');
    //        }
    //    });
    });

// The following code rotates banners for different language.
// If .default is set for banners_url[x], the banner will be
// shown in all languages. If .default is not set it will be
// shown only in specific languages.
var banners_url = new Array();
var banners_img = new Array();
var banners_alt = new Array();
var banner_current = -1; // -1 for starting with index 0.

banners_url[0] = new Object();
banners_url[0].default = "https://checkout.kabbalah.info/en/projects/new_building";
banners_url[0].en = "https://checkout.kabbalah.info/en/projects/new_building";
banners_url[0].he = "https://checkout.kabbalah.info/he/projects/new_building";
banners_url[0].ru = "https://checkout.kabbalah.info/ru/projects/new_building";
banners_url[0].es = "https://checkout.kabbalah.info/es/projects/new_building";

// Not setting default, will be shown only in he.
banners_url[1] = new Object();
banners_url[1].he = "http://www.kab.co.il/kabbalah/%D7%9C%D7%A7%D7%A8%D7%90%D7%AA-%D7%97%D7%A0%D7%95%D7%9B%D7%94-%D7%9E%D7%93%D7%9C%D7%99%D7%A7%D7%99%D7%9D-%D7%90%D7%AA-%D7%94%D7%90%D7%95%D7%A8-%D7%91%D7%99%D7%97%D7%93"

//banners_url[2] = new Object();
//banners_url[2].default = "https://www.kabbalah.info/donate/en/projects/new_building";
//banners_url[2].en = "https://www.kabbalah.info/donate/en/projects/new_building";
//banners_url[2].he = "https://www.kabbalah.info/donate/he/projects/new_building";
//banners_url[2].ru = "https://www.kabbalah.info/donate/ru/projects/new_building";
//banners_url[2].es = "https://www.kabbalah.info/donate/es/projects/new_building";

banners_img[0] = new Object();
banners_img[0].default = "http://kabbalahgroup.info/internet/images/banners/unithon.jpeg";

banners_img[1] = new Object();
banners_img[1].he = "http://kabbalahgroup.info/internet/images/banners/4_12_12_b_960x206.jpeg"

//banners_img[2] = new Object();
//banners_img[2].default = "http://kabbalahgroup.info/internet/images/skin/bg_image_en.jpg";
//banners_img[2].en = "http://kabbalahgroup.info/internet/images/skin/bg_image_en.jpg";

banners_alt[0] = new Object();
banners_alt[0].default = "Unithon, one kli - one home";

banners_alt[1] = new Object();
banners_alt[1].he = "לקראת-חנוכה-מדליקים-את-האור-ביחד";

//banners_alt[2] = new Object();
//banners_alt[2].default = "Our New Home";

$(function (){
    var image = $('body .skin_container img');
    if (image.length == 0) {
        // First time here
        $('body .skin_container').html('<img />');
    }
    rotate_banners();
    setInterval(rotate_banners, 10000);
});

// Hack to enable different languages in rotating banners
function get_selected_language() {
    // Make sure not to fail Javascript if id does not exists.
    if ($('#languages').length == 0) return "en";

    var idx = $('#languages').get(0).selectedIndex;
    var value = $('#languages').get(0).options[idx].value;
    if (value.indexOf("ru") != -1) {
        return "ru";
    } else if (value.indexOf("he") != -1) {
        return "he";
    } else if (value.indexOf("es") != -1) {
        return "es";
    }
    return "en";
}

function get_value_by_language(i18n_map) {
    var lang = get_selected_language();
    if (lang in i18n_map) return i18n_map[lang];
    if ('default' in i18n_map)
        return i18n_map.default;
    else
        return null;
}

function rotate_banners() {
    var image = $('body .skin_container img');
    var find_next = true;
    while (find_next) {
        banner_current = (banner_current + 1) % banners_url.length;
        if (get_value_by_language(banners_url[banner_current]) != null) {
            find_next = false;
        }
    }
    $('body .skin_bg > a').attr('href', get_value_by_language(banners_url[banner_current])).attr('title', get_value_by_language(banners_alt[banner_current]));
    image.attr('src', get_value_by_language(banners_img[banner_current])).attr('alt', get_value_by_language(banners_alt[banner_current]));
}
