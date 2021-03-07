$(function () {

    $('#access_type_id').on('change', function () {
        if ($(this).val() == 2) {
            $('.supplier').removeClass('hidden');
            $('#supplier_id').removeAttr('disabled');
        } else {
            $('.supplier').addClass('hidden');
            $('#supplier_id').attr('disabled', 'disabled');
        }
    });
});