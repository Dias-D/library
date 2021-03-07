$(function () {
    var selectedVariables = [];
    var selectedLots = [];

    jQuery("#diametro").change(function () {
        var valor = jQuery(this).val();
        var _valor = valor.split('*');
        jQuery("#espessura").val(_valor[0]);
        jQuery("#diametro_interno").val(_valor[1]);
        jQuery("#diametro_externo").val(_valor[2]);
    });

    $("#objetivo_media").on("input", function () {
        var textoDigitado = $(this).val();
        $("#media_objetivo").val(textoDigitado);
        $("#diametro_mm").val(textoDigitado);
    });

    $("#_objetivo_midia").on("input", function () {
        var _textoDigitado = $(this).val();
        $("#_media_objetivo").val(_textoDigitado);
    });


    $('#buscar_dados').click(function () {
        $("#alertpdf").html('<div class="alert" style="background-color:#ff9800;"></span>Aguarde enquanto os dados são carregados no formulario</div>')
    });

    $('#form_laudo').on("submit", function () {
        setTimeout(function () {
            window.location.href = host + "report/analysiscertificate";
        }, 2000);

    });

    jQuery("#diametro").trigger('change');


    $('#select-var-orign').on('click', function () {
        var
            $that = $(this),
            lotNumber = $('#lot'),
            processDialog,
            getVarValuesByLot = function (lotNumber) {
                return $.ajax({
                    url: host + 'variable/variablevalues/variables_origin/' + lotNumber,
                    type: 'get',
                    dataType: 'json'
                });
            },
            getTemplate = function (variableValues) {

                var
                    html = '\
                                <div class="variable-origin-content"><table class="table table-border" id="lot-variables">\
                                    <thead>\
                                        <th class="text-center">Ficha Técnica</th>\
                                        <th class="text-center">Variável</th>\
                                        <th class="text-center">Origem da amostra</th>\
                                        <th></th>\
                                    </thead>\
                                    <tbody>\ ';

                $.each(variableValues, (idx, val) => {
                    var selected = '';
                    var checked = '';

                    if ($.inArray(parseInt(val.value_id), selectedVariables) !== -1) {
                        selected = 'row-selected';
                        checked = 'checked';
                    }

                    html += '<tr data-id="' + val.id + '" class="' + selected + '">';
                    html += '<td class="text-center">' + val.recipe + '</td>';
                    html += '<td class="text-center">' + val.name + '</td>';

                    html += '<td class="text-center">' + val.origin + '</td>';
                    html += '<td class="text-center"><input type="checkbox" data-lot="' + val.lot + '" value="' + val.value_id + '" ' + checked + ' /></td>';

                    html += '</tr>';
                });

                html += '</tbody>\
                        </div></table>\ ';



                return html;
            };

        if (!lotNumber.val()) {
            lotNumber.focus();
            return;
        }

        processDialog = Dialog.processing();

        getVarValuesByLot(lotNumber.val()).done(function (res) {
            processDialog.close();

            if (!res.data.length) {
                Dialog.show('Não existe variáveis para o lote inserido');

                return;
            }

            var _tpl = '';

            _tpl = getTemplate(res.data);

            BootstrapDialog.show({
                title: 'Selecione as variáveis para o certificado',
                message: _tpl,
                closable: false,
                closeByBackdrop: false,
                closeByKeyboard: false,
                cssClass: 'variable-origin-modal',
                buttons: [
                    {
                        label: 'Fechar',
                        action: function (dialogRef) {
                            dialogRef.close();

                            $('#selec_variables').val('');
                            $('#selec_lots').val('');

                            selectedVariables.length && $('#selec_variables').val(selectedVariables.join(','));
                            selectedLots.length && $('#selec_lots').val(selectedLots.join(','));
                        }
                    }
                ]
            });

        });

    });

    $('body').on('click', '#lot-variables :checkbox', (e) => {
        var $that = $(e.target),
            _parentCell = $that.parent(),
            _parentRow = _parentCell.parent(),
            baseLot = $that.data("lot"),
            totalSelectedCheckbox = 0;

        if ($that.is(':checked')) {
            _parentRow.addClass('row-selected');

            selectedVariables.push(parseInt($that.val()));

            if ($.inArray(baseLot, selectedLots) === -1 ) {
                selectedLots.push(parseInt(baseLot));
            }

            return;
        }

        totalSelectedCheckbox = $("#lot-variables").find(':checkbox[data-lot="' + baseLot + '"]:checked').length;

        _parentRow.removeClass('row-selected');

        selectedVariables = $.grep(selectedVariables, function (value) {
            return value != $that.val();
        });

        selectedLots = $.grep(selectedLots, function (value) {
            var _return = true;

            if ((value == baseLot && totalSelectedCheckbox == 0)) {
                _return = false;
            }

            return _return;
        });

    });

});