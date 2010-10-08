$(document).ready(function() {
		
    $('.tabs .tab').click(function(){
        $('.currenttab').removeClass('currenttab');
        $(this).addClass('currenttab');
        var i = $('.tabs .tab').index(this);
        $('.contenttabs .tab').eq(i).addClass('currenttab');
    });

//    $('.datepicker').datepicker({
//        dateFormat: 'yy-mm-dd'
//    });

    $('.datepicker').AnyTime_picker(
    {
        format: "%Y-%m-%d %H:%i",
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
    .find('legend').text(name + " - " + block_counter)
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
        var $item = $('#container_body li').eq(index).clone();
        $('#destroyed_container').append($item);
        $('#destroyed_container li:last .destroy').val(true);
    }
    $('#container_body li').eq(index).remove();
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
};

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

