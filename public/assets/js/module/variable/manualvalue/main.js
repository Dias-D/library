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
                html += '<input type="hidden" name="grouping_key" value="' + values.data.grouping_key + '">';
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

                    if (isManualEditing !== undefined && !!isManualEditing) {
                        if (val.variable_tag_access_type_id != 1) {
                            disabled = 'disabled';
                            type = 'automatic';
                        }
                    }

                    html += '<tr data-type="' + type + '">';

                    html += '<td class="text-center">' + val.variable_name + '</td>';
                    html += '<td class="text-center">';
                    html += '<input type="text" data-lcl="' + val.lcl + '" data-lsl="' + val.lsl + '" data-lwl="' + val.lwl + '" data-ucl="' + val.ucl + '" data-usl="' + val.usl + '" data-uwl="' + val.uwl + '" name="data[' + (val.variable_id) + ']" class="col-md-4 form-control" value="' + (val.value || "") + '" ' + disabled + ' />';
                    html += '</td>';
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

    $('body').on('click', '#toogle-variable-manual', function () {
        var $that = $(this);

        if ($that.attr('data-click-state') == 1) {
            $that.attr('data-click-state', 0)
            $that.text('Exibir apenas variáveis manuais');
            $('#variables-values-list').find('tr').show();

        } else {
            $that.attr('data-click-state', 1);
            $('#variables-values-list').find('tr[data-type="automatic"]').hide();
            $that.text('Exibir todas as variáveis');
        }
    });

    $('#edit-row').on('click', function () {
        var
                $that = $(this),
                $table = $('#variable-values-tbl'),
                checked = $table.find(':checkbox:checked').first(),
                groupingKey = '',
                machineId = null;

        if (!checked.length) {
            Dialog.show('Selecione uma linha para poder editar');
            return;
        }

        var variableValues = function (groupingKey, machineId, recipeId) {
            return $.ajax({
                url: host + 'variable/manualvalue/variable_values/' + groupingKey + '/' + machineId + '/' + recipeId,
                type: 'get',
                dataType: 'json'
            });
        };

        identifier = checked.parents('tr').data('identifier');
        identifierParts = identifier.split('-');

        groupingKey = identifierParts[0];
        recipeId = identifierParts[1];
        machineId = $('#hidden_machine_id').val();

        if (groupingKey == '' || machineId == '') {
            Dialog.show('Parâmetros incorretos, tente novamente ou entre em contato com algum responsável');
            return;
        }

        BootstrapDialog.show({
            title: 'Carregando dados da ficha técnica...',
            closable: false,
            closeByBackdrop: false,
            closeByKeyboard: false,
            cssClass: 'recipe-modal',
            onshown: function ($dialog) {
                $dialog.enableButtons(false);
                $.when(variableValues(groupingKey, machineId, recipeId)).done(function (resp) {
                    var $form = '';
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

                    $dialog.setTitle('Editar variávei manuais');
                    recipeDataTable = createVariableValueTable(resp, true);

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
                                        url: host + 'variable/manualvalue/save_values/',
                                        type: 'post',
                                        dataType: 'json',
                                        data: data
                                    });
                                }

                        $form.find('input:not(:disabled)').each(function (idx, el) {
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
                                            window.location = host + 'variable/manualvalue/';
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

    $('body').on('keyup', 'input', function () {
        var $that = $(this);

        limitsCalc($that, $that.parents('tr'));
    });

});