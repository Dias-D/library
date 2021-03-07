$.fn.selectFinder = function(options) {

    const settings = $.extend({
        id: "",
        type: "select",
        disabledId: "",
        resetedId: "",
        hideId: ""
    }, options );

    if(settings.disabledId.length == 0) settings.disabledId = settings.id;
    if(settings.resetedId.length == 0) settings.resetedId = settings.id;
    if(settings.hideId.length == 0) settings.hideId = settings.id;

    const elementOrigin = $(settings.type + "[data-filter-origin='" + settings.id + "']");
    const elementDestiny = $(settings.type + "[data-filter-destiny='" + settings.id + "']");

    elementOrigin.on("change", function() {

        let isMatch = () => {
            elementDestiny.prop('disabled', false);

            $("*[data-filter-hidden='" + settings.hideId + "']").show();
            $("*[data-filter-disabled='" + settings.disabledId + "']").prop('disabled', true);
            $("*[data-filter-reseted='" + settings.resetedId + "']").prop('selectedIndex', 0);
        }

        let isNotMatch = () => {
            elementDestiny.prop('disabled', true);

            $("*[data-filter-hidden='" + settings.hideId + "']").hide();
            $("*[data-filter-disabled='" + settings.disabledId + "']").prop('disabled', false);
        }

        elementDestiny.find("option").each(function (index) {
            if ($(this).attr("data-filter") == elementOrigin.val() || index == 0)
                $(this).show();
            else
                $(this).hide();
        });

        if(elementDestiny.find("option").filter(function(){return $(this).css("display")!="none"}).length > 1)
            isMatch();
        else
            isNotMatch();

        elementDestiny.prop('selectedIndex', 0);


    });
};
