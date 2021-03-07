$(function () {
    $('form').on('submit', function () {
        Dialog.processing({
            title: 'Buscando...'
        });
    });

    const getRecipeLot = function (startDate, endDate, machine) {

        return $.ajax({
            url: host + 'recipe/recipe_lot',
            data: { 'startDate': startDate, 'endDate': endDate, 'variable_tag_id': '', 'machine_id': machine },
            type: 'post',
            dataType: 'json'
        });
    };

    $('#log-sheet').DataTable({
        paging: false,
        scrollCollapse: true,
        ordering: false,
        info: false,
        searching: false,
        scrollY: 400,
        scrollX: true,
        dom: 'Bfrtip',
        buttons: [{
            extend: 'excel',
            exportOptions: {
                format: {
                    body: function (data, row, column, node) {
                        data = $('<p>' + data + '</p>').text();
                        return $.isNumeric(data.replace(',', '.')) ? data.replace(',', '.') : data;
                    }
                }
            }
        },
        {
            extend: 'csv'
        }
        ],
        fixedColumns: {
            leftColumns: 1
        },
    });


    $('form').selectFinder({
        id: "productLine-machine"
    });


    $("input[type='datetime-local']").on('change', function () {
        if ($('#end_date').val().length == 16 && $('#start_date').val().length == 16) {
            $("#productionline_id").prop('disabled', false);
        } else {
            $("#productionline_id").prop('disabled', true);
        }
    });

    $("input[type='datetime-local']").on('change', function () {
        var
            $startDate = $('#start_date'),
            $endDate = $('#end_date'),
            date1 = null,
            date2 = null,
            start = null,
            end = null,
            daysDiff = 0;


        if (!isValidDate($startDate.val()) && !isValidDate($endDate.val())) {
            return;

        }

        date1 = new Date($startDate.val());
        date2 = new Date($endDate.val()); //less than 1
        start = Math.floor(date1.getTime() / (3600 * 24 * 1000)); //days as integer from..
        end = Math.floor(date2.getTime() / (3600 * 24 * 1000)); //days as integer from..
        daysDiff = end - start; // exact dates

        //new Date(date1.getTime() + (3600 * 24 * 1000))
        if (daysDiff > 31) {
            var newEndDate = new Date(date1.getTime() + (3600 * 24 * 1000));
            $endDate.val(newEndDate.toISOString().substr(0, 10) + "T23:59");
            Dialog.show('Máximo de 1 mês permitido para o intervalo de datas');

            return;
        }

    });

    $('#machine_id').on('change', function () {
        let startDate = $('#start_date').val();
        let endDate = $('#end_date').val();
        let machine = $('#machine_id').val();
        let recipe_lot = $('#recipe-lot');
        let processDialog = '';

        let recipe_id_option = $('#recipe_id option');
        let lot_option = $('#lot option');
        let lot2_option = $('#lot2 option');
        let recipe_id = $('#recipe_id');
        let lot = $('#lot');
        let lot2 = $('#lot2');

        recipe_id_option.remove();
        recipe_id.append($('<option>', {
            value: '',
            text: '- Selecione -'
        }));

        lot_option.remove();
        lot.append($('<option>', {
            value: '',
            text: '- Selecione -'
        }));

        lot2_option.remove();
        lot2.append($('<option>', {
            value: '',
            text: '- Selecione -'
        }));
        //lot.prop('disabled', true);

        recipe_lot.show();

        processDialog = Dialog.processing();
        $.when(getRecipeLot(startDate, endDate, machine)).done(function (resp) {

            processDialog.close();
            if (undefined === resp.data || 0 === resp.data.length) {
                return;
            }

            Object.entries(resp.data.recipes).forEach(([key, value]) => {
                $('#recipe_id').append($('<option>', {
                    value: value.id,
                    text: value.name
                }));
            });
            //List lots
            Object.entries(resp.data.lots).forEach(([key, value]) => {
                $('#lot').append($('<option>', {
                    value: value.lot_number,
                    "data-filter": value.recipe_id,
                    text: value.lot_number
                }));
            });
            //List lots 2
            Object.entries(resp.data.lots2).forEach(([key, value]) => {
                $('#lot2').append($('<option>', {
                    value: value.lot_number,
                    "data-filter": value.recipe_id,
                    text: value.lot_number
                }));
            });
        }).fail(function () {
            processDialog.close();
            Dialog.show('Foi encontrado um erro ao buscar fichas técnicas');
        });
    }
    );
});


$(function () {
    $('#recipe_id').select2();
    $('#recipe_id').on('change', function () {
        var
            $that = $(this),
            $lot = $('#lot'),
            $lot2 = $('#lot2'),
            selected = $that.val(),
            recipeId = null;

        $lot.find('option').show().end().prop('disabled', false);
        $lot2.find('option').show().end().prop('disabled', false);

        if (!!selected) {
            recipeId = null;
            if (selected.length > 1) {
                $lot.find('option').show().first().prop('selected', true).end().end().prop('disabled', true);
                $lot2.find('option').show().first().prop('selected', true).end().end().prop('disabled', true);

                return;
            }

            recipeId = selected.pop();

            $lot.find('option:not(:first)').hide().end().find('option[data-filter="' + recipeId + '"]').show();
            $lot2.find('option:not(:first)').hide().end().find('option[data-filter="' + recipeId + '"]').show();
        }
    });

    $('#lot, #lot2').on('change', function () {
        var $that = $(this),
            selectedOpt = null,
            recipeId = null;

        if (!!$that.val()) {
            selectedOpt = $that.find('option[value="' + $that.val() + '"]');
            recipeId = selectedOpt.data('filter');

            $("#recipe_id").select2("val", recipeId);
        }
    });

    var tableHeight = $('#log-sheet').outerHeight();

    if (tableHeight < 400) {
        $('.dataTables_scrollBody').height((tableHeight + 30));
    }
})