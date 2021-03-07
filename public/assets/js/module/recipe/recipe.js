$(function () {


    var VariableTpl = (function (varId) {

        var getTemplate = function (varId, varName) {

            var html = '';

            html += '<tr>';
            html += '<td class="text-center">' + varName + '</td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="MIN" name="data[' + varId + '][limits][min]" id="tgt" type="number" step="0.001"></td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="LSL" name="data[' + varId + '][limits][lsl]" id="tgt" type="number" step="0.001"></td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="LCL" name="data[' + varId + '][limits][lcl]" id="tgt" type="number" step="0.001"></td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="LWL" name="data[' + varId + '][limits][lwl]" id="tgt" type="number" step="0.001"></td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="TGT" name="data[' + varId + '][limits][tgt]" id="tgt" type="number" step="0.001"></td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="UWL" name="data[' + varId + '][limits][uwl]" id="tgt" type="number" step="0.001"></td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="UCL" name="data[' + varId + '][limits][ucl]" id="tgt" type="number" step="0.001"></td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="USL" name="data[' + varId + '][limits][usl]" id="tgt" type="number" step="0.001"></td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="MAX" name="data[' + varId + '][limits][max]" id="tgt" type="number" step="0.001"></td>';
            html += '<td class="text-center valign-middle">';
            html += '<span>';
            html += '<input id="chk-lsl-' + varId + '" name="data[' + varId + '][alert_config][lsl]" type="checkbox">';
            html += '</span>';
            html += '</td>';
            html += '</tr>';

            return html;
        }

        return {
            get: function (varId, varName) {
                return getTemplate(varId, varName);
            }
        };

    })();

    /**
     * Search variables 
     * 
     * @param {int} machineId
     * @returns {jqXHR}
     */
    var machineVars = function (machine_id) {
        return $.ajax({
            url: host + 'variable/by_machine/' + machine_id,
            type: 'get',
            dataType: 'json'
        });
    };

    $("#machine_id").on("change", function () {
        var
                $that = $(this),
                machineId = $that.val();

        if (!machineId) {
            $('#machine-variables-wrap').find("tbody").empty();
            $("#variables").hide();
            return;
        }

        var processDialog = Dialog.processing();

        machineVars(machineId)
                .done(function (response) {
                    processDialog.close();

                    if (response.data === undefined || !response.data.length) {

                        Dialog.show('A maquina selecionada não possui variáveis');

                        $('#machine-variables-wrap').find("tbody").empty();
                        $("#variables").hide();

                        return;
                    }

                    var _html = [];

                    $.map(response.data, function (val, idx) {
                        var tpl = VariableTpl.get(val.id, val.name);

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
    $('#recipe_type').on('change', function () {
        if ($(this).val() == 2) {
            $('.supplier').removeClass('hidden');
            $('#supplier_id').removeAttr('disabled');
        } else {
            $('.supplier').addClass('hidden');
            $('#supplier_id').attr('disabled', 'disabled');
        }
    });
});






