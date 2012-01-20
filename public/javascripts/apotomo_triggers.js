$(".apotomo-click").live("click", function () {
    $.ajax({url:$(this).attr("data-event-url")});
    return false;
});
$('form[data-event-url]').live("submit", function (event) {
    $.ajax({
        type:"POST",
        url:$(this).attr("data-event-url"),
        data:$(this).serialize()
    });

    // Prevent the form submission (default action).
    event.preventDefault();
    return false;
});