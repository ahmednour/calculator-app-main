$(function() {
    // change body class to change theme color 
    $("input").on("change", function() {
        var theme = $("input:checked");
        if (theme.attr('id') == "theme1") {
            $("body").removeClass().addClass("theme1");
        } else if (theme.attr('id') == "theme2") {
            $("body").removeClass().addClass("theme2");
        } else if (theme.attr('id') == "theme3") {
            $("body").removeClass().addClass("theme3");
        }
    });

});