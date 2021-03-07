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
            html += '<td class="text-center control-min">' + (recipe_data && getVarValue(recipe_data.min)) + '</td>';
            html += '<td class="text-center control-lsl">' + (recipe_data && getVarValue(recipe_data.lsl)) + '</td>';
            html += '<td class="text-center control-lcl">' + (recipe_data && getVarValue(recipe_data.lcl)) + '</td>';
            html += '<td class="text-center control-lwl">' + (recipe_data && getVarValue(recipe_data.lwl)) + '</td>';
            html += '<td class="text-center control-tgt">' + (recipe_data && getVarValue(recipe_data.tgt)) + '</td>';
            html += '<td class="text-center control-uwl">' + (recipe_data && getVarValue(recipe_data.uwl)) + '</td>';
            html += '<td class="text-center control-ucl">' + (recipe_data && getVarValue(recipe_data.ucl)) + '</td>';
            html += '<td class="text-center control-usl">' + (recipe_data && getVarValue(recipe_data.usl)) + '</td>';
            html += '<td class="text-center control-max">' + (recipe_data && getVarValue(recipe_data.max)) + '</td>';
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
    var machineVars = function (recipe_id) {
        return $.ajax({
            url: host + 'variable/var_limits/' + recipe_id,
            type: 'get',
            dataType: 'json'
        });
    };

    $("#recipe_id").on("change", function () {
        var
                $that = $(this),
                recipeId = $that.val(),
                machineId = $('#machine_id').val() || null;

        if (!machineId && !isSupplier) {
            Dialog.show('Selecione uma máquina');
            return false;
        }

        if (!recipeId) {
            $('#machine-variables-wrap').find("tbody").empty();
            $("#variables").hide();
            return;
        }

        var processDialog = Dialog.processing();

        machineVars(recipeId)
                .done(function (response) {

                    processDialog.close();

                    if (response.data === undefined || !response.data.length) {

                        Dialog.show('A ficha técnica selecionada não possui variáveis');

                        $('#machine-variables-wrap').find("tbody").empty();
                        $("#variables").hide();

                        return;
                    }

                    var _html = [];

                    $.map(response.data, function (val, idx) {

                        var selectOpt = val.select_values || {};
                        var tpl = VariableTpl.get(val.id, val.name, val.recipe_data, val.variable_tag_type_id, selectOpt);

                        _html.push(tpl);
                    });

                    $("#recipe-variable-tbl tbody").empty().append(_html.join(''));
                    $("#variables").show();
                })
                .fail(function (error) {
                    processDialog.close();
                    Dialog.show('Foi encontrado um erro, tente novamente');
                });
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


});






