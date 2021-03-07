$(function () {
    var
            /**
             * Grab machines by production line id
             * 
             * @param {int} productionLineId
             * @returns {jqXHR}
             */
            getMachines = function (productionLineId) {
                return $.ajax({
                    url: host + 'machine/by_production_line_id/' + productionLineId,
                    type: 'get',
                    dataType: 'json'
                });
            },
            /**
             * 
             * @param {objct} $input
             * @param {object} $parent
             * @returns {void}
             */
            limitsCalc = function ($input, $parent) {
                var inputVal = parseFloat($input.val());

                if (inputVal < parseFloat($input.data('uwl')) && inputVal > parseFloat($input.data('lwl'))) {
                    $parent.css('background', 'green');
                } else if ((inputVal >= parseFloat($input.data('uwl')) && inputVal < parseFloat($input.data('ucl'))) || (inputVal <= parseFloat($input.data('lwl')) && inputVal > parseFloat($input.data('lcl')))) {
                    $parent.css('background', 'yellow');
                } else if ((inputVal >= parseFloat($input.data('ucl')) && inputVal < parseFloat($input.data('usl'))) || (inputVal <= parseFloat($input.data('lcl')) && inputVal > parseFloat($input.data('lsl')))) {
                    $parent.css('background', 'red');
                } else if (inputVal >= parseFloat($input.data('usl')) || inputVal <= parseFloat($input.data('lsl'))) {
                    $parent.css('background', 'white');
                }
            },
            createOptions = function (_list) {
                var list = _list || {};
                var htmlList = [];
                $.each(list, function (idx, val) {
                    htmlList.push('<option value="' + val.id + '">' + val.name + '</option>');
                });
                return htmlList.join("");
            },
            createVariableValueTable = function (values, isManualEditing) {
                var html = "";

                html += '<form id="form-variable-value">';

                html += '<div class="row">';
                html += '<div class="form-group">';
                html += '<div class="col-md-4">';
                html += '<label class="control-label">Receita</label>';
                html += '<select name="recipe_id" id="recipe_id" class="col-md-4 form-control">';
                html += '<option value=""></option>';
                $.each(values.recipes, function (idx, val) {
                    var selected = '';
                    if (val.id === values.data.recipe_id) {
                        selected = 'selected';
                    }
                    html += '<option ' + selected + ' value="' + val.id + '">' + val.name + '</option>';
                });
                html += '</select>';
                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '<br>';
                html += '<div class="row">';
                html += '<div class="form-group">';
                html += '<div class="col-md-4">';
                html += '<label class="control-label">Número de lote</label>';

                html += '<input type="text" name="lot_number" class="col-md-4 form-control" value="' + values.data.lot_number + '" />'

                html += '</div>';
                html += '</div>';
                html += '</div>';
                html += '<hr>';

                if (isManualEditing !== undefined && !!isManualEditing) {
                    html += '<div class="pull-right">';
                    html += '<a id="toogle-variable-manual" class="btn btn-secondary">Exibir apenas variáveis manuais</a>';
                    html += '</div>';
                    html += '<br><br>';
                }

                html += '<table id="variables-values-list" class="table table-bordered">';
                html += '<thead>';
                html += '<tr>';
                html += '<th class="text-center">Variável</th>';
                html += '<th class="text-center">Valor</th>';
                html += '</tr>';
                html += '</thead>';

                html += '<tbody>';
                // create table rows
                $.each(values.data.variables_value, function (idx, val) {
                    var disabled = '';
                    var type = 'manual';
                    var varValue = ''; //(parseFloat(val.value) && parseFloat(val.value).toFixed(1)) || '';

                    if (val.value && isNaN(val.value)) {
                        varValue = val.value;
                    } else if (val.value && !isNaN(val.value)) {
                        varValue = parseFloat(val.value).toFixed(1);
                    }

                    if (isManualEditing !== undefined && !!isManualEditing) {
                        if (val.variable.variable_tag_access_type_id != 1) {
                            disabled = 'disabled';
                            type = 'automatic';
                        }
                    }

                    html += '<tr data-type="' + type + '">';

                    html += '<td class="text-center">' + val.variable.name + '</td>';
                    html += '<td class="text-center"><input type="text" data-lcl="' + ((!!val.recipe_data && val.recipe_data.lcl) || "") + '" data-lsl="' + ((!!val.recipe_data && val.recipe_data.lsl) || "") + '" data-lwl="' + ((!!val.recipe_data && val.recipe_data.lwl) || "") + '" data-ucl="' + ((!!val.recipe_data && val.recipe_data.ucl) || "") + '" data-usl="' + ((!!val.recipe_data && val.recipe_data.usl) || "") + '" data-uwl="' + ((!!val.recipe_data && val.recipe_data.uwl) || "") + '" name="data[' + val.id + ']" class="col-md-4 form-control" value="' + varValue + '" /></td>';

                    html += '</tr>';
                });

                html += '</tbody>';
                html += '</table>';
                html += '</form>';

                return html;
            };

    $('#production_line_id').on('change', function () {
        var $that = $(this);
        var $machine = $('#machine_id');
        var processDialog = '';
        var $startDate = $('#start_date');
        var $endDate = $('#end_date');

        if ($that.val() == "") {
            $startDate.val('').prop('disabled', true);
            $endDate.val('').prop('disabled', true);
            $machine.find('option:not(:first)').remove().end().prop('disabled', true);
            return;
        }

        /**
         * @TODO
         * Review Dialog api
         */
        processDialog = Dialog.processing();
        $.when(getMachines($that.val())).done(function (resp) {
            var options = "";
            processDialog.close();
            if (undefined === resp.data || 0 === resp.data.length) {
                Dialog.show("Máquina não possui variáveis");
                $startDate.val('').prop('disabled', true);
                $endDate.val('').prop('disabled', true);
                $machine.find('option:not(:first)').remove().end().prop('disabled', true);
                return;
            }

            options = createOptions(resp.data);
            $machine.find('option:not(:first)').remove().end().prop('disabled', false).append(options);
            $startDate.prop('disabled', false);
            $endDate.prop('disabled', false);
        });
    });

    // Select all check box in variable values table
    $('#variable-values-tbl').on('change', '#select-all', function () {
        var $that = $(this);

        if ($that.is(':checked')) {
            $('#variable-values-tbl').find('tbody').find('input:checkbox').prop('checked', true);
        } else {
            $('#variable-values-tbl').find('tbody').find('input:checkbox').prop('checked', false);
        }
    });


    $('#edit-row').on('click', function () {
        var
                $table = $('#variable-values-tbl'),
                checked = $table.find(':checkbox:checked').first(),
                groupingKey = '',
                machineId = null;

        var variableValues = function (groupingKey, machineId) {
            return $.ajax({
                url: host + 'admin/recordmanagement/variable_values/' + groupingKey + '/' + machineId,
                type: 'get',
                dataType: 'json'
            });
        };

        if (!checked.length) {
            Dialog.show('Selecione uma linha para poder editar');
            return;
        }

        groupingKey = checked.parents('tr').data('grouping-key');
        machineId = $('#hidden_machine_id').val();
        if (groupingKey == '' || machineId == '') {
            Dialog.show('Parâmetros incorretos, tente novamente ou entre em contato com algum responsável');
            return;
        }

        BootstrapDialog.show({
            title: 'Carregando dados de captura...',
            closable: false,
            closeByBackdrop: false,
            closeByKeyboard: false,
            cssClass: 'recipe-modal',
            onshown: function ($dialog) {
                $dialog.enableButtons(false);
                $.when(variableValues(groupingKey, machineId)).done(function (resp) {
                    if (resp === '') {
                        alert('Foi encontrado um erro, tente novamente.');
                        $dialog.close();
                        return;
                    }

                    if (typeof resp.data === "undefined") {
                        Dialog.show('Foi encontrado um erro, tente novamente.');
                        $dialog.close();
                        return;
                    }

                    $dialog.setTitle('Variáveis capturadas');
                    recipeDataTable = createVariableValueTable(resp);

                    $dialog.getModalBody().html(recipeDataTable);

                    $form = $dialog.getModalBody().find('form');
                    $form.find('input').each(function (idx, el) {
                        var _el = $(el);
                        limitsCalc(_el, _el.parents('tr'));
                    });

                    $dialog.enableButtons(true);
                });
            },
            message: '<div class="loader-image"><i class="fa fa-3x fa-cog fa-spin"></i></div>',
            buttons: [
                {
                    label: 'Salvar',
                    icon: 'glyphicon glyphicon-check',
                    cssClass: 'btn-secondary',
                    action: function ($dialog) {
                        var
                                $button = this,
                                $form = $dialog.getModalBody().find('form'),
                                formData = '',
                                error = 0,
                                saveVariableValues = function (data) {
                                    return $.ajax({
                                        url: host + 'admin/recordmanagement/save_values/',
                                        type: 'post',
                                        dataType: 'json',
                                        data: data
                                    });
                                }

                        $form.find('input').each(function (idx, el) {
                            var $that = $(this);

                            if ($that.val() == '') {
                                $that.focus();
                                error++;

                                return;
                            }
                        });

                        if (error > 0) {
                            return;
                        }

                        formData = $form.serializeArray();

                        $button.spin();
                        $dialog.enableButtons(false);
                        $dialog.setTitle('Salvando...');

                        saveVariableValues(formData).done(function (resp) {
                            if (resp.status === 'error') {
                                alert(resp.message);
                                return false;
                            }

                            $dialog.close();
                            BootstrapDialog.show({
                                closable: false,
                                closeByBackdrop: false,
                                closeByKeyboard: false,
                                cssClass: 'recipe-modal',
                                type: BootstrapDialog.TYPE_SUCCESS,
                                message: 'Editado com sucesso',
                                buttons: [
                                    {
                                        label: 'Ok',
                                        icon: 'glyphicon glyphicon-check',
                                        cssClass: 'btn-secondary',
                                        action: function ($dialog) {
                                            $dialog.close();
                                            window.location = host + 'admin/recordmanagement/';
                                        }
                                    }
                                ]
                            });

                        }).fail(function () {
                            $button.stopSpin();
                            $dialog.enableButtons(true);
                            $dialog.setTitle('');

                            alert('Ocorreu um erro, por favor, tente novamente.');
                            return false;
                        });

                    }
                },
                {
                    label: 'Cancelar',
                    icon: 'glyphicon glyphicon-remove fa-1x',
                    cssClass: 'btn-primary',
                    action: function ($dialog) {
                        $dialog.close();
                    }
                }
            ]
        });
    });

    $('#remove-row').on('click', function () {
        var $table = $('#variable-values-tbl'),
                checked = $table.find(':checkbox:checked'),
                groupingKeyList = [],
                machineId = null,
                removeRows = function (groupoingKeyList) {
                    return $.ajax({
                        url: host + 'admin/recordmanagement/remove_variable_value/',
                        type: 'post',
                        dataType: 'json',
                        data: {
                            groupingKeys: groupoingKeyList
                        }
                    });
                }

        if (!checked.length) {
            Dialog.show('Selecione uma ou mais linhas para semre removidas');
            return;
        }

        $.each(checked, function (idx, el) {
            var groupingKey = $(el).parents('tr').data('grouping-key');
            groupingKeyList.push(groupingKey);
        });

        if (!groupingKeyList.length) {
            Dialog.show('Erro ao tentar deletar selecionados');
            console.log('Do not exist grouping keys');
            return;
        }

        var $dialogProcessing = Dialog.processing();

        removeRows(groupingKeyList).done(function (resp) {
            if (resp.status === 'error') {
                alert(resp.message);
                return false;
            }

            $dialogProcessing.close();

            BootstrapDialog.show({
                closable: false,
                closeByBackdrop: false,
                closeByKeyboard: false,
                cssClass: 'recipe-modal',
                type: BootstrapDialog.TYPE_SUCCESS,
                message: 'Deletado com sucesso',
                buttons: [
                    {
                        label: 'Ok',
                        icon: 'glyphicon glyphicon-check',
                        cssClass: 'btn-secondary',
                        action: function ($dialog) {
                            $dialog.close();
                            window.location = host + 'admin/recordmanagement/';
                        }
                    }
                ]
            });

        }).fail(function () {
            $dialogProcessing.close();

            alert('Ocorreu um erro, por favor, tente novamente.');
            return false;
        });
    });

    $('body').on('keyup', 'input', function () {
        var $that = $(this);

        limitsCalc($that, $that.parents('tr'));
    });

});

$(document).ready(function () {
    if (!$.fn.dataTable.isDataTable('#variable-values-tbl')) {

        $('#variable-values-tbl').DataTable(
                {
                    dom: 'Bfrtip',
                    buttons: ['excel']
                });
    }
});