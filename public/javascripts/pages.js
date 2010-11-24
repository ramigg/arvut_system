function reset_form(){
    $("#search-form #search").val('');
}
$(document).ready(function() {
		
    $('.tabs .tab').click(function(){
        $('.currenttab').removeClass('currenttab');
        $(this).addClass('currenttab');
        var i = $('.tabs .tab').index(this);
        $('.contenttabs .tab').eq(i).addClass('currenttab');
    });

    $('.datepicker').AnyTime_picker(
    {
        format: "%Y-%m-%d %H:%i %:",
        firstDOW: 1
    } );

    if ($('.sortlist').length > 0) {
        $('.sortlist').sortable({
            containment: 'parent',
            stop: function(event, ui) {
                var new_pos = $('.sortlist li').index($(ui.item));
                var update_class = $(ui.item).attr('class');
            }
        });
		
        $('.sortlist').disableSelection();
        $('.sortlist')[0].onselectstart = function () {
            return false;
        };
	
        $('.sortlist .deleteicon').live('click', function() {
            remove_asset($(this));
        });
    }
    $('#container_body li.asset').each(function(index, element){
        i = index + 1;
        name = $(element).find('legend').html();
        $('.sortlist').append('<li class="block' + i + '">' + name + '<a href="javascript:;"><span class="deleteicon"></span></a></li>');
    });

});


function add_page_asset(name, content)
{
    var new_id = new Date().getTime();
    var regexp = new RegExp("new_asset", "g");
    var block_counter = $('#container_body input.position').length + 1;

    content = content.replace(regexp, new_id);
    $('#container_body').append(content);
    $('#container_body').find('li:last')
    .addClass('block'+ block_counter)
    .find('legend:first').text(name + " - " + block_counter)
    .end().find('.position').val(block_counter)
    ;

    $('.sortlist').append('<li class="block' + block_counter + '">' + name + ' - ' + block_counter + '<a href="javascript:;"><span class="deleteicon"></span></a></li>');
}

// If field 'new' is true - do not remove element,
// just mark is as _destroy => 1, hide and move to '#destroyed_container'.
// As well we have to renumerate all visible
function remove_asset($obj)
{
    var $x = $obj.closest('li');
    var index = $obj.closest('ul').find('li').index($x);
    var is_new = $x.find('.new').val();

    if (!is_new) {
        // In order to really destroy element we have to mark it as destroyed
        // Let's clone it, move to the special container and mark as destroyed
        var $item = $('#container_body>li').eq(index).clone();
        $('#destroyed_container').append($item);
        $item.find('.destroy').attr('value', true);
    }
    $('#container_body>li').eq(index).remove();
    $('.sortlist li').eq(index).remove();

    // Renumerate positions
    $('#container_body li').each(function(index, element){
        var position = index + 1;
        $(element).find('.position').val(position);
        $('.sortlist').eq(index).find('.position').val(position);
    });
}


// Used in Question editor
function add_fields(link, association, content, hide_onclick) {
    var new_id = new Date().getTime();
    var regexp = new RegExp("new_" + association, "g");
    $(link).parent().before(content.replace(regexp, new_id));
    if(hide_onclick){
        $(link).hide();
    }
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

function change_language(){
    var idx = $('#languages').get(0).selectedIndex;
    var href = $('#languages').get(0).options[idx].value;

    if (href == '-1')
        return false;
    
    location = href;
    return false;
}

function new_item(){
    var idx = $('#new-items').get(0).selectedIndex;
    var href = $('#new-items').get(0).options[idx].value;

    if (href == '-1')
        return false;

    location = href;
    return false;
}

$(function () {
    if (typeof $.fn.uniform == 'function') {
        $("select, input:checkbox, input:radio, input:file").uniform();
    }
});

$(function () {
    var toggleLoading = function(){
        $(this).toggleClass('spinner')
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
