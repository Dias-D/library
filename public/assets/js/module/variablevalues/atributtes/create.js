$(function () {
    $('form').selectFinder({
        id: "recipe-name"
    });
    var VariableTpl = (function (varId) {
        var getVarValue = function (value) {
            if (!(!!value)) {
                return "";
            }
            return parseFloat(value).toFixed(2);
        };
        var getTemplate = function (varId, varName, recipe_data, varType, selectOpt) {
            var objArray = {};
            var required = 'required';
            var type = 'text';
            recipe_data = recipe_data || [];
            if (!$.isArray(recipe_data) && Object.keys(recipe_data).length) {
                objArray = Object.entries(recipe_data);
                recipe_data = objArray[0].hasOwnProperty(1) ? objArray[0][1] : {};
            }

            if (varType == 1) // Variable type number
            {
                type = 'number';
            }
            var html = '';
            html += '<tr>';
            html += '<td class="text-center">' + varName + '</td>';
            if (varType != 3) {
                html += '<td class="text-center"><input class="col-md-4 form-control control-min" value="" type="' + type + '" placeholder="Valor" name="data[variables][' + varId + '][value]" ' + required + ' step="0.001"></td>';
            } else {
                html += '<td class="text-center">';
                html += '<select class="col-md-4 form-control control-min" name="data[variables][' + varId + '][value]" ' + required + '>';
                html += '<option value"">Selecione</option>';
                $.each(selectOpt, function (idx, option) {
                    html += '<option value"' + option.value + '">' + option.value + '</option>';
                });
                html += '</select>';
                html += '</td>';
            }

            html += '</tr>';
            return html;
        }

        return {
            get: function (varId, varName, recipe_data, varType, selectOpt) {
                return getTemplate(varId, varName, recipe_data, varType, selectOpt);
            }
        };
    })();
    /**
     * Search variables of a machine using recipe
     * 
     * @param {int} machineId
     * @returns {jqXHR}
     */
    var qualityAtributtes = function (recipe_id) {
        return $.ajax({
            url: host + 'variable/atr_limits/' + recipe_id,
            type: 'get',
            dataType: 'json'
        });
    };


    var getAtributtes = function (lot_number, lot_extrusion, lot_printer) {
        return $.ajax({
            url: host + 'variable/variablevalues/get_atributtes',
            data: {'lot_number': lot_number, 'lot_extrusion': lot_extrusion, 'lot_printer': lot_printer},
            type: 'post',
            dataType: 'json'
        });
    };


    $(".load-atributtes").click(function () {
        var
                $that = $(this),
                recipeId = $('#recipe_id').val(),
                lot_extrusion = $('#lot_number_extrusion').val(),
                lot_printer = $('#lot_number_print').val(),
                lot_number = $('#lot').val();

        $(".table-printer").html("");
        $(".table-extrusion").html("");
        $(".table-cut").html("");

        var processDialog = Dialog.processing();
        $.when(getAtributtes(lot_number, lot_extrusion, lot_printer), qualityAtributtes(recipeId))
                .done(function (resp1, resp2) {

                    if (resp1[0].data.extrusion) {

                        tableExtrusion = '<h4>Lote: ' + resp1[0].data.extrusion[0].lot_number + ' | Origem da Amostra: ' + resp1[0].data.extrusion[0].sample_origin + ' </h4>';

                        tableExtrusion += '<table class="table table-bordered table-condensed datatable dataTable no-footer">';
                        tableExtrusion += "<thead>";
                        tableExtrusion += "<tr>";
                        tableExtrusion += "<th class='text-center'> Variável </th>";
                        tableExtrusion += "<th class='text-center'> Valor </th>";
                        tableExtrusion += "</tr>";
                        tableExtrusion += "</thead>";

                        Object.entries(resp1[0].data.extrusion).forEach(([key, value]) => {

                            tableExtrusion += "<tr>";
                            tableExtrusion += "<td style='text-align:center;'><h5>" + value.variable + "</h5></td>";
                            tableExtrusion += "<td style='text-align:center;'><h5>" + value.value + "</h5></td>";
                            tableExtrusion += "</tr>";
                        });
                        tableExtrusion += '</table>';
                        tableExtrusion += '<hr>';
                        $(".table-extrusion").html(tableExtrusion);
                    }


                    if (resp1[0].data.cut) {

                        tableCut = '<h4>Lote: ' + resp1[0].data.cut[0].lot_number + ' |  Origem da Amostra: ' + resp1[0].data.cut[0].sample_origin + '    </h4>';
                        tableCut += '<table class="table table-bordered table-condensed datatable dataTable no-footer">';
                        tableCut += "<thead>";
                        tableCut += "<tr>";
                        tableCut += "<th class='text-center'> Variável </th>";
                        tableCut += "<th class='text-center'> Valor </th>";
                        tableCut += "</tr>";
                        tableCut += "</thead>";

                        Object.entries(resp1[0].data.cut).forEach(([key, value]) => {

                            tableCut += "<tr>";
                            tableCut += "<td style='text-align:center;'><h5>" + value.variable + "</h5></td>";
                            tableCut += "<td style='text-align:center;'><h5>" + value.value + "</h5></td>";
                            tableCut += "</tr>";
                        });
                        tableCut += '</table>';
                        tableCut += '<hr>';
                        $(".table-cut").html(tableCut);
                    }

                    if (resp1[0].data.printer) {

                        tablePrinter = '<h4>Lote: ' + resp1[0].data.printer[0].lot_number + ' | Origem da Amostra: ' + resp1[0].data.printer[0].sample_origin + '</h4>';

                        tablePrinter += '<table class="table table-bordered table-condensed datatable dataTable no-footer">';
                        tablePrinter += "<thead>";
                        tablePrinter += "<tr>";
                        tablePrinter += "<th class='text-center'> Variável </th>";
                        tablePrinter += "<th class='text-center'> Valor </th>";
                        tablePrinter += "</tr>";
                        tablePrinter += "</thead>";

                        Object.entries(resp1[0].data.printer).forEach(([key, value]) => {

                            tablePrinter += "<tr>";
                            tablePrinter += "<td style='text-align:center;'><h5>" + value.variable + "</h5></td>";
                            tablePrinter += "<td style='text-align:center;'><h5>" + value.value + "</h5></td>";
                            tablePrinter += "</tr>";
                        });
                        tablePrinter += '</table>';
                        tablePrinter += '<hr>';

                        $(".table-printer").html(tablePrinter);
                    }



                    if (resp2[0].data === undefined || !resp2[0].data.length) {

                        Dialog.show('A ficha técnica selecionada não possui variáveis');
                        $('#machine-variables-wrap').find("tbody").empty();
                        $("#variables").hide();
                        return;
                    }

                    var _html = [];
                    $.map(resp2[0].data, function (val, idx) {

                        var selectOpt = val.select_values || {};
                        var tpl = VariableTpl.get(val.id, val.name, val.recipe_data, val.variable_tag_type_id, selectOpt);
                        _html.push(tpl);
                    });
                    $("#recipe-variable-tbl tbody").empty().append(_html.join(''));
                    $("#variables").show();


                });


        processDialog.close();


    });
    var send = false;
    $('form').on('submit', function (e) {

        var $that = $(this);
        if (!send) {
            BootstrapDialog.show({
                title: 'Confirmar',
                message: 'Os valores preenchidos estão corretos? Depois de salvos, os valores não podem ser alterados, deseja continuar?',
                type: BootstrapDialog.TYPE_DANGER,
                size: BootstrapDialog.SIZE_SMALL,
                closable: false,
                closeByBackdrop: false,
                closeByKeyboard: false,
                cssClass: 'delete-dialog',
                buttons: [
                    {
                        label: 'Sim',
                        action: function (dialogRef) {
                            send = true;
                            $that.submit();
                            dialogRef.close();
                        }
                    },
                    {
                        label: 'Cancelar',
                        action: function (dialogRef) {
                            dialogRef.close();
                        }
                    }
                ]
            });
        }
        return send;
    });
    $('#sample_origin').on('change', function () {

        $('#lot_number_extrusion').val('');
        $('#lot_number_print').val('');
        $('#lot').val('');
        let inputPrint = $('#lot_number_print');
        let printHide = $('#print_hide');
        let inputPrevious = $('#lot_number_extrusion');
        let extrusionHide = $('#extrusion_hide');
        if ($('#sample_origin').val() == 1) {
            inputPrint.prop('disabled', false);
            printHide.removeClass('hide');
        } else {
            printHide.prop('disabled', true);
            printHide.addClass('hide');
        }

        if ($('#sample_origin').val() == 2) {
            inputPrevious.prop('disabled', true);
            extrusionHide.addClass('hidden');
        } else {
            inputPrevious.prop('disabled', false);
            extrusionHide.removeClass('hidden');
        }

    });
});






