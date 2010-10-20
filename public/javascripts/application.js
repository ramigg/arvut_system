$(function (){
    // Basic report generator
    if (typeof $.datepicker == 'function') {
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
};

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
    $("select#user_country_id").change(function(){
        var id_value_string = $(this).val();
        $("select#user_region_id").attr('disabled', 'disabled');
        $("select#user_region_id option").remove();
        $(def_row).appendTo("select#user_region_id");
        $("select#user_location_id").attr('disabled', 'disabled');
        $("select#user_location_id option").remove();
        $(def_row).appendTo("select#user_location_id");
        if (id_value_string == "") {
            // if the id is empty remove all the sub_selection options from being selectable and do not do any ajax
            return;
        } else {
            // Send the request and update sub category dropdown
            $.ajax({
                dataType: "json",
                cache: false,
                url: '/en/region_ids/' + id_value_string,
                timeout: 4000,
                error: function(XMLHttpRequest, errorTextStatus, error){
                    alert("Failed to submit : " + errorTextStatus+" ;" + error);
                },
                success: function(data){
                    // Fill sub category select
                    $.each(data, function(i, j){
                        var row = "<option value=\"" + j[1] + "\">" + j[0] + "</option>";
                        $(row).appendTo("select#user_region_id");
                        $("select#user_region_id").removeAttr('disabled');
                    });
                }
            });
        }
    });
    $("select#user_region_id").change(function(){
        var id_value_string = $(this).val();
        $("select#user_location_id").attr('disabled', 'disabled');
        $("select#user_location_id option").remove();
        $(def_row).appendTo("select#user_location_id");
        if (id_value_string == "") {
            // if the id is empty remove all the sub_selection options from being selectable and do not do any ajax
            return;
        } else {
            // Send the request and update sub category dropdown
            var country_id =  $("select#user_country_id").val();
            $.ajax({
                dataType: "json",
                cache: false,
                url: '/en/location_ids/' + country_id + '/' + id_value_string,
                timeout: 4000,
                error: function(XMLHttpRequest, errorTextStatus, error){
                    alert("Failed to submit : " + errorTextStatus+" ;" + error);
                },
                success: function(data){
                    // Fill sub category select
                    $.each(data, function(i, j){
                        var row = "<option value=\"" + j[1] + "\">" + j[0] + "</option>";
                        $(row).appendTo("select#user_location_id");
                        $("select#user_location_id").removeAttr('disabled');
                    });
                }
            });
        }
    });
});

//
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
    var toggleLoading = function(){
        $(this).toggleClass('throbber');
    };

    $('a[data-remote=true]')
    .live('ajax:loading', toggleLoading)
    .live('ajax:complete', toggleLoading);

    $('.side_menu a[data-remote=true]')
    .bind('click', function () {
        $('li.current').removeClass('current');
        $(this).parent().parent().addClass('current');
    });
    
    if (typeof $.colorbox == 'function') {
        $('a.in-iframe').live('click', function(){
            colorbox_iframe(this, '710px', '85%', false);
            return false;
        });
        $('a.in-wide-iframe').live('click', function(){
            colorbox_iframe(this, '80%', false, '80%');
            return false;
        });
    }
    if (typeof $.autoResize == 'function') {
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
        //                alert('document will be marked as read');
        },
        onCleanup:function(){
            $("body").css("overflow", "auto");
        //                alert('refresh the stream and menu');
        }
    });
}

