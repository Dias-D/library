$(function () {
    $('#update-params-file').on('click', function () {
        BootstrapDialog.show({
            title: 'Atualizar arquivos de parâmetros',
            closable: false,
            closeByBackdrop: false,
            closeByKeyboard: false,
            message: '<form method="post" enctype="multipart/form-data"><div class="row"><div class="form-group"><div class="col-md-12"><label class="control-label">Arquivo: </label><input type="file" id="param_file" name="param_file" class="col-md-4 form-control" /></div></div></div></form>',
            buttons: [
                {
                    label: 'Atualizar',
                    icon: 'glyphicon glyphicon-check',
                    cssClass: 'btn-warning',
                    action: function ($dialog) {
                        $form = $dialog.getModalBody().find('form');
                        $form.submit();

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

    $("#recipe-variable").stickyTableHeader();
    $('.input-filter').inputFilter();

    var recipeData = function (recipeId) {
        return $.ajax({
            url: host + 'recipe/data/' + recipeId,
            type: 'get',
            dataType: 'json'
        });
    };

    var setRecipeAsActive = function (recipeId, lotNumber, lotNumber2) {
        return $.ajax({
            url: host + 'recipe/active/',
            type: 'post',
            dataType: 'json',
            data: {
                recipeId: recipeId,
                lotNumber: lotNumber,
                lotNumber2: lotNumber2,
            }
        });
    };

    var createModalHtml = function (data) {
        var html = "";
        var getVarValue = function (value) {
            if (!(!!value)) {
                return "-";
            }

            return parseFloat(value).toFixed(2);
        }

        html += '<table class="table table-bordered table-hover">';
        html += '<thead>';
        html += '<tr>';
        html += '<th class="text-center">Variável</th>';
        html += '<th class="text-center">Limite Inferior de Especificação</th>';
        html += '<th class="text-center">Objetivo</th>';
        html += '<th class="text-center">Limite Superior de Especificação</th>';

        html += '</tr>';
        html += '</thead>';
        html += '<tbody>';
        // create table rows
        $.each(data.recipe_data, function (idx, val) {
            html += '<tr>';
            html += '<td class="text-center">' + val.name + '</td>';
            html += (!!val.recipe_data && '<td class="text-center">' + getVarValue(val.recipe_data.lsl) + '</td>') || '<td class="text-center">-</td>';
            html += (!!val.recipe_data && '<td class="text-center">' + getVarValue(val.recipe_data.tgt) + '</td>') || '<td class="text-center">-</td>';
            html += (!!val.recipe_data && '<td class="text-center">' + getVarValue(val.recipe_data.usl) + '</td>') || '<td class="text-center">-</td>';

            html += '</tr>';
        });

        html += '</tbody>';
        html += '</table>';

        return html;
    }

    $('#recipes-tbl').on('click', '.clone-recipe', function (e) {
        var $that = $(this),
            action = host + $that.data('url'),
            recipeName = $that.data('recipe-name');

        BootstrapDialog.show({
            title: 'Confirmar',
            message: 'Deseja realmente copiar <strong>' + recipeName + '</strong>?',
            type: BootstrapDialog.TYPE_WARNING,
            size: BootstrapDialog.SIZE_SMALL,
            closable: false,
            closeByBackdrop: false,
            closeByKeyboard: false,
            cssClass: 'delete-dialog',
            buttons: [
                {
                    label: 'Sim',
                    action: function () {
                        Dialog.processing();

                        window.location.href = action
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

    });

    $('body').on('keypress', '#lot-number', treatInput);

    $('#recipes-tbl').on('click', '.view-recipe', function (e) {

        e.preventDefault();

        var $that = $(this);
        var recipeDataTable = '';
        var recipeId = $that.data('recipe');

        var setRecipeAsActiveModal = function () {
            BootstrapDialog.show({
                title: 'Número de lote',
                closable: false,
                closeByBackdrop: false,
                closeByKeyboard: false,
                message: '<form class="lot-number-frm"> \
                            <div class="row"> \
                                <div class="form-group"> \
                                    <div class="col-md-6"> \
                                        <label class="control-label">Lote</label> \
                                        <input type="text" id="lot-number" class="col-md-4 form-control" /> \
                                    </div> \
                                    <div class="col-md-6"> \
                                        <label class="control-label">Lote 2</label> \
                                        <input type="text" id="lot-number2" class="col-md-4 form-control" /> \
                                    </div> \
                                </div> \
                            </div> \
                        </form>',
                buttons: [
                    {
                        label: 'Continuar',
                        icon: 'glyphicon glyphicon-check',
                        cssClass: 'btn-warning',
                        action: function ($dialog) {

                            var
                                $button = this,
                                $form = $dialog.getModalBody().find('form'),
                                $lotNumberEl = $form.find('#lot-number'), // Lot number input element
                                $lotNumberEl2 = $form.find('#lot-number2'), // Lot number input element
                                lotNumber = '',
                                lotNumber2 = '';

                            if ($lotNumberEl.val() == '') {
                                $lotNumberEl.focus();

                                return false;
                            }

                            lotNumber = $lotNumberEl.val();
                            lotNumber2 = $lotNumberEl2.val();

                            if (lotNumber == '') {
                                Dialog.show('Número de lote inválido, tente novamente');

                                return false;
                            }

                            let confirmChargeRecipe = function () {
                                $button.spin();
                                $dialog.enableButtons(false);
                                $dialog.setTitle('Salvando...');
                                $lotNumberEl.prop('disabled', true);

                                setRecipeAsActive(recipeId, lotNumber, lotNumber2).done(function (resp) {

                                    if (resp.status === 'error') {
                                        alert(resp.message);
                                        return;
                                    }

                                    Dialog.show('Ficha técnica carregada com sucesso', {
                                        type: BootstrapDialog.TYPE_SUCCESS,
                                        buttons: [
                                            {
                                                label: 'Ok',
                                                action: function (dialogRef) {
                                                    dialogRef.close();
                                                    window.location = host;
                                                }
                                            }
                                        ]
                                    });

                                    $lotNumberEl.prop('disabled', false);
                                    $dialog.close();
                                }).fail(function () {
                                    $button.stopSpin();
                                    $dialog.enableButtons(true);
                                    $lotNumberEl.prop('disabled', false);

                                    alert('Ocorreu um erro, por favor, tente novamente.');
                                    $dialog.close();
                                    return;
                                });
                            }

                            alertChargeRecipe(confirmChargeRecipe);

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
        };

        BootstrapDialog.show({
            title: 'Carregando dados da ficha técnica...',
            closable: false,
            closeByBackdrop: false,
            closeByKeyboard: false,
            cssClass: 'recipe-modal',
            onshown: function ($dialog) {
                $dialog.enableButtons(false);
                $.when(recipeData(recipeId)).done(function (resp) {

                    if (resp === '' || typeof resp.data === "undefined") {

                        $dialog.close();

                        BootstrapDialog.show({
                            title: 'Erro!',
                            message: 'Foi encontrado um erro, tente novamente.',
                            buttons: [{
                                label: 'OK',
                                action: function (dialog) {
                                    dialog.close()
                                }
                            }]
                        });
                        return;
                    }

                    if (resp.status == 'error') {
                        $dialog.close();

                        BootstrapDialog.show({
                            title: 'Erro!',
                            message: resp.message,
                            buttons: [{
                                label: 'OK',
                                action: function (dialog) {
                                    dialog.close()
                                }
                            }]
                        });
                        return;
                    }

                    $dialog.setTitle('Ficha Técnica ' + resp.data.recipe_name);
                    recipeDataTable = createModalHtml(resp.data);

                    $dialog.getModalBody().html(recipeDataTable);
                    $dialog.enableButtons(true);
                });
            },
            message: '<div class="loader-image"><i class="fa fa-3x fa-cog fa-spin"></i></div>',
            buttons: [
                {
                    label: 'Carregar',
                    icon: 'glyphicon glyphicon-check',
                    cssClass: 'btn-warning',
                    action: function () {
                        setRecipeAsActiveModal();

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
});


function treatInput(event) {
    var value = String.fromCharCode(event.which);
    var pattern = new RegExp(/[0-9]/i);
    //var pattern = new RegExp(/[a-zA-Z0-9\.\\\-/]/i);
    return pattern.test(value);
}


function alertChargeRecipe(_function) {
    BootstrapDialog.show({
        title: 'Confirmar',
        message: 'Os valores preenchidos estão corretos? Depois de salvos, os valores não podem ser alterados.',
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
                    _function.call();
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



