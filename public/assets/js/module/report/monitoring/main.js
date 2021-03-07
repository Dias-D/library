$(function () {
    $('form').selectFinder({
        id: "productLine-machine"
    });

    $('form').on('submit', function () {
        return false;
    });


    $('#label').hide();
});

$(function () {
    var reloadTime = (2 * 60 * 1000); // Two minutes to refresh data
    var getVarValue = function (value) {
        if (!(!!value)) {
            return "-";
        }

        return parseFloat(value).toFixed(1);
    };

    var VariableTpl = (function () {

        var getTemplate = function (data, type, text) {
            var html = '';

            html += '<table class="table table-bordered table-hover">';
            html += '<thead>';
            html += '<tr>';
            html += '<th colspan="14" class="text-center ' + type + '">' + text + '</th>';
            html += '</tr>';
            html += '<tr>';
            html += '<td class="text-center">Máquina</td>';
            html += '<td class="text-center">Template</td>';
            html += '<td class="text-center">Variável</td>';
            html += '<td class="text-center">Receita</td>';
            html += '<td class="text-center">Lote</td>';
            html += '<td class="text-center">Data</td>';
            html += '<td class="text-center">Valor</td>';
            html += '<td class="text-center">LSL</td>';
            html += '<td class="text-center">LCL</td>';
            html += '<td class="text-center">LWL</td>';
            html += '<td class="text-center">TGT</td>';
            html += '<td class="text-center">UWL</td>';
            html += '<td class="text-center">UCL</td>';
            html += '<td class="text-center">USL</td>';
            html += '</tr>';
            html += '</thead>';

            html += '<tbody>';

            $.map(data, function (val, idx) {
                html += '<tr>';
                html += '<td class="text-center">' + val.production_line + '</td>';
                html += '<td class="text-center">' + val.machine + '</td>';
                html += '<td class="text-center">' + val.variable + '</td>';
                html += '<td class="text-center">' + val.recipe + '</td>';
                html += '<td class="text-center">' + val.lot + '</td>';
                html += '<td class="text-center">' + val.date + '</td>';
                html += '<td class="text-center">' + getVarValue(val.variable_value) + '</td>';
                html += '<td class="text-center lsl">' + getVarValue(val.lsl) + '</td>';
                html += '<td class="text-center lcl">' + getVarValue(val.lcl) + '</td>';
                html += '<td class="text-center lwl">' + getVarValue(val.lwl) + '</td>';
                html += '<td class="text-center tgt">' + getVarValue(val.tgt) + '</td>';
                html += '<td class="text-center uwl">' + getVarValue(val.uwl) + '</td>';
                html += '<td class="text-center ucl">' + getVarValue(val.ucl) + '</td>';
                html += '<td class="text-center usl">' + getVarValue(val.usl) + '</td>';
                html += '</tr>';

            });

            html += '</tbody>';
            html += '</table>';

            return html;
        }

        return {
            get: function (data, type, text) {
                return getTemplate(data, type, text);
            }
        };

    })();
    var
            $form = $('form'),
            $reloadButton = $('.cancel-tracking'),
            $label = $('#label'),
            getVariablesData = function (productionLineId, machineId) {
                return $.ajax(
                        {
                            url: host + 'report/monitoring',
                            type: 'post',
                            data: {
                                production_line: productionLineId,
                                machine: machineId
                            },
                            dataType: 'json'
                        }
                );

            },
            startVariableTracking = function () {
                var
                        productionLineId = $form.find('#productionline_id').val(),
                        machineId = $form.find('#machine_id').val(),
                        $loader = $('.loader'),
                        $tracking = $('.tracking');

                if (!productionLineId || !machineId) {
                    alert('Erro com parâmetros selectionados, tente novamente');
                    loader.addClass('hidden');
                    window.location = host + 'report/monitoring';
                }

                $.when(getVariablesData(productionLineId, machineId)).done(function (resp) {
                    var
                            variables = resp,
                            spec = '',
                            warning = '',
                            control = '',
                            _html = '';


                    if (variables.spec.length > 0) {
                        spec = VariableTpl.get(variables.spec, 'spec-type', 'Variáveis fora do limite de especificação');
                    }

                    if (variables.control.length > 0) {
                        control = VariableTpl.get(variables.control, 'control-type', 'Variáveis fora do limite de controle');
                    }

                    if (variables.warning.length > 0) {
                        warning = VariableTpl.get(variables.warning, 'warning-type', 'Variáveis fora do limite de atenção');
                    }

                    _html += spec + control + warning;

                    $('#table-wrapper').empty().append(_html);

                    $loader.addClass('hidden');
                    $reloadButton.removeClass('hidden');
                    $label.show();

                    if (variables.spec.length == 0 && variables.control.length == 0 && variables.warning.length == 0) {
                        $loader.addClass('hidden');

                        $('#table-wrapper').empty().append('<p class="text-center text-lg">Não há variáveis fora de limite<p>');
                    }

                    $tracking.show();

                    setTimeout(function () {
                        $loader.removeClass('hidden');
                        $reloadButton.addClass('hidden');

                        startVariableTracking();
                    }, reloadTime);

                }).fail(function () {
                    alert('Foi encotrado um erro inesperado, tente novamente');
                    window.location = host + 'report/monitoring';

                });

            };

    $('form').on('submit', function () {
        startVariableTracking();
    });
})

