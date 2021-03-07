$(function () {
    var tableHeight = $('#log-sheet').outerHeight();

    if (tableHeight < 400) {
        $('.dataTables_scrollBody').height((tableHeight + 30));
    }

    $('form').on('submit', function () {
        Dialog.processing({
            title: 'Buscando...'
        });
    });
});

$(function () {
    var
            getRecipeQuality = function (startDate, endDate, machine) {
                return $.ajax({
                    url: host + 'recipe/quality',
                    data: {startDate: startDate, endDate: endDate, machine_id: machine},
                    type: 'post',
                    dataType: 'json'
                });
            };

    $('#log-sheet').DataTable({
        //fixedHeader: true
        paging: false,
        scrollCollapse: true,
        ordering: false,
        info: false,
        searching: false,
        scrollY: 400,
        scrollX: true,
        fixedColumns: {
            leftColumns: 1
        }
    });

    $('#search-lot').on('click', function () {
        var
                $that = $(this),
                startDate = $('#start_date').val(),
                endDate = $('#end_date').val(),
                $recipeList = $('#recipe_id'),
                $lotVariablesList = $('#lot-variables'),
                $searchButtonWrap = $('#btn-search-wrap'),
                $variableSelect = $('#variable'),
                machineQuality = 3,
                _processDialog = null;

        _processDialog = Dialog.processing();

        $.when(getRecipeQuality(startDate, endDate, machineQuality)).done(function (res) {
            var
                    data = res.data,
                    recipeOptions = [],
                    variableOptions = [];

            _processDialog.close();

            if (!!data.recipes.length === false && data.recipes instanceof Array) {
                Dialog.show('Não há fichas técnicas para o intervalo de data selecionado');
                return false;
            }

            $lotVariablesList.removeClass('hidden');
            $searchButtonWrap.removeClass('hidden');

            Object.entries(data.recipes).forEach(([key, value]) => {
                recipeOptions.push('<option value="' + value.id + '">' + value.name + '</option>');
            });

            Object.entries(data.variables).forEach(([key, value]) => {
                variableOptions.push('<option value="' + value.id + '" data-recipe-id="' + value.recipe_id + '">' + value.name + '</option>');
            });

            $recipeList.find('option:gt(0)').remove().end().append(recipeOptions.join(''));
            $variableSelect.find('option:gt(0)').remove().end().append(variableOptions.join(''));
            $variableSelect.find('option:gt(0)').hide();

            $recipeList.prop('disabled', false);

        });
    });

    $('body').on('change', '#recipe_id', function () {
        var
                $that = $(this),
                variable = $('#variable'),
                recipeId = $that.val();

        if (recipeId == '') {
            variable.find('option:gt(0)').hide();
            return;
        }

        variable.find('option:gt(0)').hide();
        variable.find('option[data-recipe-id="' + recipeId + '"]').show();
    });

});


