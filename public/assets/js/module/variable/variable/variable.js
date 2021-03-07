$(function () {
    $("#variable_tag_type_id").on("change", function () {
        var
                $that = $(this),
                $selectionBox = $("#select_id"),
                selText = $that.find("option:selected").val();

        if (3 == selText) {
            $selectionBox.prop("disabled", false);
        } else {
            $selectionBox.val("");
            $selectionBox.prop("disabled", true);
        }
    });

});

