/*
* Unobtrusive autocomplete
*
* To use it, you just have to include the HTML attribute autocomplete
* with the autocomplete URL as the value
*
* Example:
* <input type="text" autocomplete="/url/to/autocomplete">
*
*/

$(document).ready(function(){
    attach_autocomplete();
});

function attach_autocomplete()
{
    $('input[autocomplete]').live('focus', function(){
        if ($(this).attr('autocomplete') == 'off') return;
        source_url = $(this).attr('autocomplete');
        $(this).autocomplete({
            minLength: 3,
            select: function(event, ui) {
                var id = $(this).attr('id');
                id = '#' + id + '_id';
                $(id).val(ui.item.id);
            },
            source: function( request, response ) {
                $.ajax({
                    url: source_url,
                    dataType: "json",
                    data: {
                        term: request.term,
                        additional: 'country_id',
                        country_id: country_id
                    },
                    success: function( data ) {
                        response( data );
                    }
                });
            }
        });
    });
}
