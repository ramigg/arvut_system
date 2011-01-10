(function($) {

    $.fn.tagit = function(options) {

        var container = this;
        
        //        var objectTags = get_data(options.allTags
        var html_input_field = "<ul class=\"mytags\"></ul>\n";
        container.html(html_input_field);
        my_tags = container.children(".mytags");


        const BACKSPACE	= 8;
        const ENTER	= 13;
        const SPACE	= 32;
        const COMMA	= 44;

        // add the tagit CSS class.
        container.addClass("tagit");

        // create the input field.
        html_input_field = "<li class=\"tagit-new\"><input class=\"tagit-input\" type=\"text\" /></li>\n";
        my_tags.html(html_input_field);

        tag_input = my_tags.children(".tagit-new").children(".tagit-input");

        $.each( options.objectTags, function(i, value){
            create_choice(value);
        });

        var received_tags = $.parseJSON($.ajax({
            url: options.allTags,
            async: false,
            data: "tag_list_locale=" + options.locale
        }).responseText);


        $(this).click(function(e){
            if (e.target.tagName == 'A') {
                // Removes a tag when the little 'x' is clicked.
                // Event is binded to the UL, otherwise a new tag (LI > A) wouldn't have this event attached to it.
                $(e.target).parent().remove();
            }
            else {
                // Sets the focus() to the input field, if the user clicks anywhere inside the UL.
                // This is needed because the input field needs to be of a small size.
                tag_input.focus();
            }
        });

        tag_input.keypress(function(event){
            if (event.which == BACKSPACE) {
                if (tag_input.val() == "") {
                    // When backspace is pressed, the last tag is deleted.
                    $(my_tags).children(".tagit-choice:last").remove();
                }
            }
            // Comma/Space/Enter are all valid delimiters for new tags.
            else if (event.which == COMMA || event.which == ENTER) {
                event.preventDefault();

                var typed = tag_input.val();
                typed = typed.replace(/,+$/,"");
                typed = typed.trim();

                if (typed != "") {
                    if (is_new (typed)) {
                        create_choice (typed);
                    }
                    // Cleaning the input.
                    tag_input.val("");
                }
            }
        });

        tag_input.autocomplete({
            source: received_tags,
            select: function(event,ui){
                if (is_new (ui.item.value)) {
                    create_choice (ui.item.value);
                }
                // Cleaning the input.
                tag_input.val("");

                // Preventing the tag input to be update with the chosen value.
                return false;
            }
        });

        function get_data(url, target){
            $.get(url, function(data) {
                $(target).html(data);
            })
        };


        function is_new (value){
            var is_new = true;
            this.tag_input.parents("ul").children(".tagit-choice").each(function(i){
                n = $(this).children("input").val();
                if (value == n) {
                    is_new = false;
                }
            })
            return is_new;
        }
        function create_choice (value){
            var el = "";
            el  = "<li class=\"tagit-choice\">\n";
            el += value + "\n";
            el += "<a class=\"close\">x</a>\n";
            el += "<input type=\"hidden\" style=\"display:none;\" value=\""+value+"\" name=\"page[" + options.locale + "_tag_list][]\">\n";
            el += "</li>\n";
            var li_search_tags = this.tag_input.parent();
            $(el).insertBefore (li_search_tags);
            this.tag_input.val("");
        }
    };

    String.prototype.trim = function() {
        return this.replace(/^\s+|\s+$/g,"");
    };

})(jQuery);
