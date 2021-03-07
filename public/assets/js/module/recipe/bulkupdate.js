$(function () {
    var enableFields = function (fields) {
        fields.each(function () {
            $(this).removeAttr('readonly');
        });
    };


    var VariableTpl = (function (varId) {

        var getTemplate = function (varId, varName) {

            var html = '';

            html += '<tr>';
            html += '<td class="text-center valign-middle">' + varName + '</td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="MIN" name="data[' + varId + '][limits][min]" id="min" type="number" step="0.001"></td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="LSL" name="data[' + varId + '][limits][lsl]" id="lsl" type="number" step="0.001"></td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="LCL" name="data[' + varId + '][limits][lcl]" id="lcl" type="number" step="0.001"></td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="LWL" name="data[' + varId + '][limits][lwl]" id="lwl" type="number" step="0.001"></td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="UWL" name="data[' + varId + '][limits][uwl]" id="uwl" type="number" step="0.001"></td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="UCL" name="data[' + varId + '][limits][ucl]" id="ucl" type="number" step="0.001"></td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="USL" name="data[' + varId + '][limits][usl]" id="usl" type="number" step="0.001"></td>';
            html += '<td class="text-center"><input class="col-md-4 form-control" value="" placeholder="MAX" name="data[' + varId + '][limits][max]" id="max" type="number" step="0.001"></td>';
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

    var $selectRecipes = $('#recipe_id').select2({
        placeholder: "Escolha receitas para aplicar a atualização",
        matcher: function (params, data) {
            var _option = data.element,
                    optionParent = $(_option).attr('data-parent'),
                    machineId = $("#machine_id").val();

            if (!machineId) {
                return null;
            }

            if (machineId == optionParent) {
                return data;
            }

            return null;
        }
    });

    $("#machine_id").on("change", function () {
        var
                $that = $(this),
                machineId = $that.val();

        if (!machineId) {
            $("#variables").hide();
            $("#recipe-variable-tbl tbody").empty();

            $selectRecipes.prop('disabled', true);
            $selectRecipes.val(null).trigger("change");

            $('#machine-variables-wrap').find("tbody").empty();
            return;
        }

        $selectRecipes.prop('disabled', false);


        var processDialog = Dialog.processing();

        machineVars(machineId)
                .done(function (response) {
                    processDialog.close();

                    if (response.data === undefined || !response.data.length) {

                        Dialog.show('A maquina selecionada não possui variáveis');

                        $('#machine-variables-wrap').find("#tbody").empty();
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


    $('form').on('submit', function () {
        var
                $that = $(this),
                $recipe = $('#recipe_id'),
                formFields = $that.find('input, select, textarea').not(':hidden'),
                _submit = true;

        if ($recipe.val() === null) {
            Dialog.show('Escolha uma ou mais fichas técnicas para aplicar a alteração');

            enableFields(formFields);
            $('.loader').addClass('hidden').parent().prop('disabled', false);

            return false;
        }

        return _submit;
    });
});






