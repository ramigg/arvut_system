$(function () {
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
        $('.xdatepicker').datepicker({
            changeMonth: true,
            changeYear: true,
            showButtonPanel: true,
            dateFormat: 'dd.mm.yy',
            onClose: function (dateText, inst) {
                var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
                month = parseInt(month) + 1;
                var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
                $(this).val("1." + month + "." + year);
            }
        });
    }
});
// AJAX Report generators
$(function () {
    $("#report_new")
        .bind("ajax:success", function (data, status) {
            $("#users").html(status);
        });
});

// Export report to Excel
function excel() {
    var $report = $('#report_new');
    var action = $report.attr('action');
    $report.attr('action', action + '.xls').removeAttr('data-remote');
    $report.submit().attr('action', action).attr('data-remote', 'true');
}

// Used in Questionnaire editor
function remove_fields(link, is_new_record) {
    $(link).closest("div.add_other").children("p.add_other").children("a").show();
    if (is_new_record) {
        $(link).closest(".fields").remove();
    }
    else {
        $(link).prev("input[type=hidden]").val("1");
        $(link).closest(".fields").hide();
    }
}

// Used in Questionnaire editor
function add_fields(link, association, content, hide_onclick) {
    var new_id = new Date().getTime();
    var regexp = new RegExp("new_" + association, "g");
    $(link).parent().before(content.replace(regexp, new_id));
    if (hide_onclick) {
        $(link).hide();
    }
}

$(document).ready(function () {
    var def_row = "<option value=\"" + "" + "\">" + "Please select" + "</option>";
    $("select#user_country_id").live('change', function () {
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
                error: function (XMLHttpRequest, errorTextStatus, error) {
                    alert("Failed to submit : " + errorTextStatus + " ;" + error);
                },
                success: function (data) {
                    // Fill sub category select
                    $.each(data, function (i, j) {
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
    $("select#user_region_id").live('change', function () {
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
            var country_id = $("select#user_country_id").val();
            $.ajax({
                dataType: "json",
                cache: false,
                url: SITE_URL + '/en/profiles/location_ids/' + country_id + '/' + id_value_string,
                timeout: 4000,
                error: function (XMLHttpRequest, errorTextStatus, error) {
                    alert("Failed to submit : " + errorTextStatus + " ;" + error);
                },
                success: function (data) {
                    // Fill sub category select
                    $.each(data, function (i, j) {
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

function change_language() {
    var idx = $('#languages').get(0).selectedIndex;
    var href = $('#languages').get(0).options[idx].value;

    location = href;
}

function new_item() {
    var idx = $('#new-item').get(0).selectedIndex;
    var href = $('#new-item').get(0).options[idx].value;

    location = href;
}

$(function () {
    if (document.location.href.match(/\/(show_button_content)/) == null) {
        var update_link = document.location.href.match(/\/(stream|events|pages|profiles)\//);
        if (update_link != null) {
            var pattern = new RegExp('http://(.+)/(' + LANGS + ')/([^#]+)');
            var tail = document.location.href.match(pattern);
            if (tail != null) {
                document.location.href = 'http://' + tail[1] + '/' + tail[2] + '#' + tail[3];
            }
        }
    }
    $("#throbber").ajaxSend(function (evt, request, settings) {
        if (document.location.href.match(/\#events\//) && settings.url.match(/source=(stream_container|questions|sketches)|type=(update_current_state)/))
            return;
        $(this).addClass('throbber');
    });

    $("#throbber").ajaxComplete(function () {
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
        if (hash_str != null) {
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
        $('a.in-iframe').live('click', function () {
            colorbox_iframe(this, '710px', '85%', false);
            return false;
        });
        $('a.in-wide-iframe').live('click', function () {
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
function colorbox_iframe(obj, width, height, innerHeight) {
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
        onComplete: function () {
            $("body").css("overflow", "hidden");
            $("#colorbox").css("display", "block");
            //                alert('document will be marked as read');
        },
        onCleanup: function () {
            $("body").css("overflow", "auto");
            //                alert('refresh the stream and menu');
        }
    });
}
function trim_val_of_elements(arrElm) {
    $.each(arrElm, function (indexInArray, valueOfElement) {
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

function rotate_banner() {
    $('#ad' + current_ad).hide();
    current_ad = (current_ad + 1) % total_ads;
    $('#ad' + current_ad).show();
}

$(function () {
    if (total_ads == 0) {
        $('.skin_bg').hide();
        $('.wrapper').css('margin-top', 20);
    } else if (total_ads > 1) {
        // init rotation
        setInterval(rotate_banner, 10000);
    }

});

// Количество снежинок на странице (Ставьте в границах 30-40, больше не рекомендую)
var snowmax = 35;

// Установите цвет снега, добавьте столько цветов сколько пожелаете
var snowcolor = new Array("#AAAACC", "#DDDDFF", "#CCCCDD", "#F3F3F3", "#F0FFFF", "#FFFFFF", "#EFF5FF")

// Поставьте шрифты из которых будет создана снежинка ставьте столько шрифтом сколько хотите
var snowtype = new Array("Arial Black", "Arial Narrow", "Times", "Comic Sans MS");

// Символ из какого будут сделаны снежинки (по умолчанию * )
var snowletter = "*";

// Скорость падения снега (рекомендую в границах от 0.3 до 2)
var sinkspeed = 0.6;

// Максимальный размер снежинки
var snowmaxsize = 22;

// Установите минимальный размер снежинки
var snowminsize = 8;

// Устанавливаем положение снега
// Впишите 1 чтобы снег был по всему сайту, 2 только слева
// 3 только по центру, 4 снег справа
var snowingzone = 1;


/*
 //   * ПОСЛЕ ЭТОЙ ФРАЗЫ БОЛЬШЕ НЕТ КОНФИГУРАЦИИ*
 */

// НИЧЕГО НЕ ИЗМЕНЯТЬ

var snow = new Array();
var marginbottom;
var marginright;
var timer;
var i_snow = 0;
var x_mv = new Array();
var crds = new Array();
var lftrght = new Array();
var browserinfos = navigator.userAgent;
var ie5 = document.all && document.getElementById && !browserinfos.match(/Opera/);
var ns6 = document.getElementById && !document.all;
var opera = browserinfos.match(/Opera/);
var browserok = ie5 || ns6 || opera;
function randommaker(range) {
    rand = Math.floor(range * Math.random());
    return rand;
}
function initsnow() {
    if (ie5 || opera) {
        marginbottom = document.body.clientHeight;
        marginright = document.body.clientWidth;
    } else if (ns6) {
        marginbottom = window.innerHeight;
        marginright = window.innerWidth;
    }
    var snowsizerange = snowmaxsize - snowminsize;
    for (i = 0; i <= snowmax; i++) {
        crds[i] = 0;
        lftrght[i] = Math.random() * 15;
        x_mv[i] = 0.03 + Math.random() / 10;
        snow[i] = document.getElementById("s" + i);
        snow[i].style.fontFamily = snowtype[randommaker(snowtype / length)];
        snow[i].size = randommaker(snowsizerange) + snowminsize;
        snow[i].style.fontSize = snow[i].size + "px";
        snow[i].style.color = snowcolor[randommaker(snowcolor.length)];
        snow[i].sink = sinkspeed * snow[i].size / 5;
        if (snowingzone == 1) {
            snow[i].posx = randommaker(marginright - snow[i].size)
        }
        if (snowingzone == 2) {
            snow[i].posx = randommaker(marginright / 2 - snow[i].size)
        }
        if (snowingzone == 3) {
            snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 4
        }
        if (snowingzone == 4) {
            snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 2
        }
        snow[i].posy = randommaker(2 * marginbottom - marginbottom - 2 * snow[i].size);
        snow[i].style.left = snow[i].posx + "px";
        snow[i].style.top = snow[i].posy + "px";
    }
    movesnow();
}
function movesnow() {
    for (i = 0; i <= snowmax; i++) {
        crds[i] += x_mv[i];
        snow[i].posy += snow[i].sink;
        snow[i].style.left = snow[i].posx + lftrght[i] * Math.sin(crds[i]) + "px";
        snow[i].style.top = snow[i].posy + "px";
        if (snow[i].posy >= marginbottom - 2 * snow[i].size || parseInt(snow[i].style.left) > (marginright - 3 * lftrght[i])) {
            if (snowingzone == 1) {
                snow[i].posx = randommaker(marginright - snow[i].size)
            }
            if (snowingzone == 2) {
                snow[i].posx = randommaker(marginright / 2 - snow[i].size)
            }
            if (snowingzone == 3) {
                snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 4
            }
            if (snowingzone == 4) {
                snow[i].posx = randommaker(marginright / 2 - snow[i].size) + marginright / 2
            }
            snow[i].posy = 0;
        }
    }
    var timer = setTimeout("movesnow()", 50);
}
for (i = 0; i
    <= snowmax; i++) {
    document.write("<span id='s" + i + "' style='position:absolute;top:-" + snowmaxsize + "px;z-index:1'>" + snowletter + "</span>");
}
if (browserok) {
    window.onload = initsnow;
}