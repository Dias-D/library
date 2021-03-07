var allLimits = [];
var recipeVariables = [];
var recipeVariablesNames = [];
var Attribute = (function ($, window, document) {

    $('.select2').select2();

    var
        getHtml = function (id, values) {
            var
                html = '<div class="row">';
            if (values.length == 0) {
                values = ['', '', '', '', '', '', '', '', '', ''];
            }

            //html += '<div class="form-group">';
            html += '<div class="col-md-1">';
            html += '<input required type="number" value="' + values[0] + '" name="sample[' + id + '][]"  step="any" class="form-control parsley-validated ' + checkLimit(id, values[0]) + '" data-required="true">';
            html += '</div>';
            html += '<div class="col-md-1">';
            html += '<input required type="number" value="' + values[1] + '" name="sample[' + id + '][]"  step="any" class="form-control parsley-validated ' + checkLimit(id, values[1]) + '" data-required="true">';
            html += '</div>';
            html += '<div class="col-md-1">';
            html += '<input type="number" value="' + values[2] + '" name="sample[' + id + '][]"  step="any" class="form-control parsley-validated ' + checkLimit(id, values[2]) + '" data-required="true">';
            html += '</div>';
            html += '<div class="col-md-1">';
            html += '<input type="number" value="' + values[3] + '" name="sample[' + id + '][]"  step="any" class="form-control parsley-validated ' + checkLimit(id, values[3]) + '" data-required="true">';
            html += '</div>';
            html += '<div class="col-md-1">';
            html += '<input type="number" value="' + values[4] + '" name="sample[' + id + '][]"  step="any" class="form-control parsley-validated ' + checkLimit(id, values[4]) + '" data-required="true">';
            html += '</div>';
            html += '<div class="col-md-1">';
            html += '<input type="number" value="' + values[5] + '" name="sample[' + id + '][]"  step="any" class="form-control parsley-validated ' + checkLimit(id, values[5]) + '" data-required="true">';
            html += '</div>';
            html += '<div class="col-md-1">';
            html += '<input type="number" value="' + values[6] + '" name="sample[' + id + '][]"  step="any" class="form-control parsley-validated ' + checkLimit(id, values[6]) + '" data-required="true">';
            html += '</div>';
            html += '<div class="col-md-1">';
            html += '<input type="number" value="' + values[7] + '" name="sample[' + id + '][]"  step="any" class="form-control parsley-validated ' + checkLimit(id, values[7]) + '" data-required="true">';
            html += '</div>';
            html += '<div class="col-md-1">';
            html += '<input type="number" value="' + values[8] + '" name="sample[' + id + '][]"  step="any" class="form-control parsley-validated ' + checkLimit(id, values[8]) + '" data-required="true">';
            html += '</div>';
            html += '<div class="col-md-1">';
            html += '<input type="number" value="' + values[9] + '" name="sample[' + id + '][]"  step="any" class="form-control parsley-validated ' + checkLimit(id, values[9]) + '" data-required="true">';
            html += '</div>';
            html += '<span class="remAttrAlign"><a href="#" class="remAttr">Remover</a></span>';
            // html += '</div>';
            //html += '<br>';
            html += '</div>';

            return html;

        },
        getSample = function (id, value) {

            var html = '';
            html += '<div class="variable-sample" id="' + id + '">';
            html += '   <div id="select-options">';
            html += '       <h3 class="portlet-title">';
            html += '           <u>' + value + '</u>';
            html += '       </h3>';
            html += '       <div id="total" class="row">';
            html += '           <div class="col-md-2 jumbotron" id="media"><h5>Média:</h5> <span>0</span></div>';
            html += '           <div class="col-md-2 jumbotron" id="desvio"><h5>Desvio:</h5> <span>0</span></div>';
            html += '           <div class="col-md-2 jumbotron" id="min"><h5>Min.:</h5> <span>0</span></div>';
            html += '           <div class="col-md-2 jumbotron" id="max"><h5>Máx.:</h5> <span>0</span></div>';
            html += '       </div>';
            html += '       <div class="clearfix"></div>';
            html += '       <div class="row">';
            html += '           <div class="col-sm-12">';
            html += '               <div class="progress">';
            html += '                   <div class="min progress-bar progress-bar-tertiary" style="width: 11%">MIN<br /><span>0.000</span></div>';
            html += '                   <div class="lsl progress-bar progress-bar-light" style="width: 11%">LSL<br /><span>0.000</span></div>';
            html += '                   <div class="lcl progress-bar progress-bar-danger" style="width: 11%">LCL<br /><span>0.000</span></div>';
            html += '                   <div class="lwl progress-bar progress-bar-warning" style="width: 11%">LWL<br /><span>0.000</span></div>';
            html += '                   <div class="tgt progress-bar progress-bar-success" style="width: 12%">TGT<br /><span>0.000</span></div>';
            html += '                   <div class="uwl progress-bar progress-bar-warning" style="width: 11%">UWL<br /><span>0.000</span></div>';
            html += '                   <div class="ucl progress-bar progress-bar-danger" style="width: 11%">UCL<br /><span>0.000</span></div>';
            html += '                   <div class="usl progress-bar progress-bar-light " style="width: 11%">USL<br /><span>0.000</span></div>';
            html += '                   <div class="max progress-bar progress-bar-tertiary" style="width: 11%">MAX<br /><span>0.000</span></div>';
            html += '               </div>';
            html += '           </div>';
            html += '       </div>';
            html += '       <br />';
            html += '       <div id="samples"></div>';
            html += '   </div>';
            html += '   <div class="row">';
            html += '       <div class="col-md-12">';
            html += '           <button type="button" id="add-samples" data-id="' + id + '" class="btn btn-secondary pull-right">';
            html += '               Inserir Valores';
            html += '           </button>';
            html += '       </div>';
            html += '   </div>';
            html += '   <br />';
            html += '</div>';

            return html;
        },
        getTotalAttributes = function () {
            var totalOptions = $('#samples').find('input').length || 0;

            return parseInt(totalOptions);
        },
        getMedia = function (id) {
            var totalMedia = 0,
                totalDev = 0,
                sumMedia = 0,
                media = 0,
                min = 0,
                deviation = 0,
                samples = [],
                max = 0,
                firstValue = true;

            $('#' + id + ' #samples input').each(function () {
                let value = $(this).val();

                if (value.length > 0) {
                    totalMedia += 1;
                }

                samples.push(getFloat(value));

                if (value.length > 0) {
                    sumMedia += getFloat(value);
                    min = (getFloat(value) < min || firstValue) ? getFloat(value) : min;
                    max = (getFloat(value) > max) ? getFloat(value) : max;
                    firstValue = false;
                }
            });

            media = (sumMedia / totalMedia).toFixed(3);
            samples.forEach(function (item, index) {
                deviation += Math.pow((item - media), 2);
            });

            totalDev = totalMedia - 1;

            deviation = Math.sqrt((deviation / totalDev)).toFixed(3);

            deviation = (deviation - 1.923).toFixed(3);

            return { 'media': media.toString().replace('.', ','), 'min': min.toString().replace('.', ','), 'max': max.toString().replace('.', ','), 'deviation': deviation.toString().replace('.', ',') };
        },
        setTotal = function (id) {
            let media = Attribute.getMedia(id);

            setMin(id, media.min);
            setMax(id, media.max);
            setDeviation(id, media.deviation);
            setMedia(id, media.media);
        },
        setMedia = function (id, media) {
            $('#' + id + ' #media span').html((media != undefined) ? media : 0);
        },
        setMin = function (id, min) {
            $('#' + id + ' #min span').html((min != undefined) ? min : 0);
        },
        setMax = function (id, max) {
            $('#' + id + ' #max span').html((max != undefined) ? max : 0);
        },
        setDeviation = function (id, dev) {

            (dev != 'Infinity') ? $('#' + id + ' #desvio span').html((dev != undefined) ? dev : 0) : '';
        },
        setLimits = function (id, limit) {
            $('#' + id + ' .progress>.min>span').html((limit.min == null) ? '0,000' : getFloat(limit.min).toFixed(3).replace('.', ','));
            $('#' + id + ' .progress>.lsl>span').html((limit.lsl == null) ? '0,000' : getFloat(limit.lsl).toFixed(3).replace('.', ','));
            $('#' + id + ' .progress>.lcl>span').html((limit.lcl == null) ? '0,000' : getFloat(limit.lcl).toFixed(3).replace('.', ','));
            $('#' + id + ' .progress>.lwl>span').html((limit.lwl == null) ? '0,000' : getFloat(limit.lwl).toFixed(3).replace('.', ','));
            $('#' + id + ' .progress>.tgt>span').html((limit.tgt == null) ? '0,000' : getFloat(limit.tgt).toFixed(3).replace('.', ','));
            $('#' + id + ' .progress>.uwl>span').html((limit.uwl == null) ? '0,000' : getFloat(limit.uwl).toFixed(3).replace('.', ','));
            $('#' + id + ' .progress>.ucl>span').html((limit.ucl == null) ? '0,000' : getFloat(limit.ucl).toFixed(3).replace('.', ','));
            $('#' + id + ' .progress>.usl>span').html((limit.usl == null) ? '0,000' : getFloat(limit.usl).toFixed(3).replace('.', ','));
            $('#' + id + ' .progress>.max>span').html((limit.max == null) ? '0,000' : getFloat(limit.max).toFixed(3).replace('.', ','));

            populateLimits(limit);
        },
        getFloat = function (n) {
            return isNaN(parseFloat(n)) ? 0 : parseFloat(n);
        },
        populateLimits = function (limit) {
            allLimits[limit.variable_tag_id] = [limit.min, limit.lsl, limit.lcl, limit.lwl, limit.tgt, limit.uwl, limit.ucl, limit.usl, limit.max];
        },
        checkLimit = function (id, value) {

            if (value == '')
                return '';

            let colors = ['grey', 'white', 'red', 'orange', 'green', 'orange', 'red', 'white', 'grey'];

            if (getFloat(value) < getFloat(allLimits[id][0]) && getFloat(allLimits[id][0]) != 0)
                return colors[0];
            if (getFloat(value) < getFloat(allLimits[id][1]) && getFloat(allLimits[id][1]) != 0)
                return colors[1];
            if (getFloat(value) < getFloat(allLimits[id][2]) && getFloat(allLimits[id][2]) != 0)
                return colors[2];
            if (getFloat(value) < getFloat(allLimits[id][3]) && getFloat(allLimits[id][3]) != 0)
                return colors[3];
            if (getFloat(allLimits[id][4]) != 0 && (nextIndexValue(allLimits[id], 5) == -1) || (getFloat(value) <= getFloat(allLimits[id][nextIndexValue(allLimits[id], 5)])))
                return colors[4];
            if (getFloat(allLimits[id][5]) != 0 && (nextIndexValue(allLimits[id], 6) == -1) || (getFloat(value) <= getFloat(allLimits[id][nextIndexValue(allLimits[id], 6)])))
                return colors[5];
            if (getFloat(allLimits[id][6]) != 0 && (nextIndexValue(allLimits[id], 7) == -1) || (getFloat(value) <= getFloat(allLimits[id][nextIndexValue(allLimits[id], 7)])))
                return colors[6];
            if (getFloat(allLimits[id][7]) != 0 && (allLimits[id][8] == null) || (getFloat(value) <= getFloat(allLimits[id][8])))
                return colors[7];
            if (getFloat(value) > getFloat(allLimits[id][8]) && getFloat(allLimits[id][8]) != 0)
                return colors[8];

        },
        nextIndexValue = function (values, index) {
            for (let i = index; i < values.length; i++) {
                if (values[i] != null)
                    return i;
            }

            return -1;
        }

    return {
        create: function (id, value) {
            return getSample(id, value);
        },
        popule: function (id, values) {
            return getHtml(id, values);
        },
        getTotalAttributes: function () {
            return getTotalAttributes();
        },
        getMedia: function (id) {
            return getMedia(id);
        },
        setTotal: function (id) {
            return setTotal(id);
        },
        setMin: function (id, min) {
            return setMin(id, min);
        },
        setMax: function (id, max) {
            return setMax(id, max);
        },
        setMedia: function (id, media) {
            return setMedia(id, media);
        },
        setDeviation: function (id, dev) {
            return setDeviation(id, dev);
        },
        setLimits: function (id, limit) {
            return setLimits(id, limit);
        },
        checkLimit(id, value) {
            return checkLimit(id, value);
        }
    };

})(jQuery, window, document);

const getSample = function (lot, recipe, lotNumberExtrusion, lotNumberPrint, sampleOrigin) {
    return $.ajax({
        url: host + 'variable/variablevalues/sample',
        data: { 'recipeId': recipe, 'recipeVariables': recipeVariables, 'lot': lot, 'lotNumberPrint': lotNumberPrint, 'lotNumberExtrusion': lotNumberExtrusion, 'sampleOrigin': sampleOrigin },
        type: 'post',
        dataType: 'json'
    });
};

const getVariables = function (recipe, machine) {
    return $.ajax({
        url: host + 'variable/variablevalues/get_variables_by_recipe',
        data: { 'recipeId': recipe, 'machineId': machine },
        type: 'post',
        dataType: 'json'
    });
};

const getAtributtes = function (lot, lot_extrusion, lot_printer) {
    return $.ajax({
        url: host + 'variable/variablevalues/get_atributtes_by_lot',
        data: { 'lot': lot, 'lot_extrusion': lot_extrusion, 'lot_extrusion': lot_extrusion },
        type: 'post',
        dataType: 'json'
    });
};

$(function () {
    /**
     * Add row of the sample values
     */
    $('#variable-samples').on('click', '#add-samples', function () {
        let id = $(this).data('id');

        $(Attribute.popule(id, [])).appendTo($('div.variable-sample#' + id).find("#samples"));
        Attribute.setTotal();
    });

    /**
     * Remove row of the sample values
     */
    $('#variable-samples').on('click', '.remAttr', function (evt) {
        evt.preventDefault();

        $(this).parents('.row').empty().remove();
        Attribute.setTotal();
    });

    /**
     * Calcule total by group samples
     */
    $('#variable-samples').on('blur', 'input', function (evt) {
        let id = $(this).parent().parent().parent().parent().parent().attr('id');
        let value = $(this).val();

        //add color class
        if (value.length > 0) {
            $(this).removeClass().addClass('form-control parsley-validated');
            $(this).addClass(Attribute.checkLimit(id, value));
        }

        //sum total
        Attribute.setTotal(id);
    });

    $('#recipe_id').on('change', function () {

        let recipe_id = $(this).val();
        var machine_id = $(this).find(':selected').data('machine-id');
        var processDialog = Dialog.processing();
        var variablesSelect = $('#variable_tag_id');

        $("#variable-samples").html("");
        $("#table-extrusion").html("");
        $("#table-printer").html("");

        $.when(getVariables(recipe_id, machine_id)).done(function (resp) {

            processDialog.close();

            if (undefined === resp.data || 0 === resp.data.length) {
                recipeVariables = [];
                recipeVariablesNames = [];
                return;
            }

            if (resp.data.length > 0) {

                //Clear select
                variablesSelect.empty().trigger('change');

                Object.entries(resp.data).forEach(([key, value]) => {
                    recipeVariables.push(value.id);
                    recipeVariablesNames[value.id] = value.name;
                });

            }
        });
        processDialog.close();

    });

    $('form').on('blur', '#recipe_id, #lot, #day', function (evt) {

        let recipe_id = $('#recipe_id').val();
        let lot = $('#lot').val();
        let day = $('#day').val();

        if (recipe_id != '' && lot != '' && day != '') {
            $('.load-variables').removeAttr('disabled');
        }

    });

    $('form').on('submit', function () {
        var totalAttrs = Attribute.getTotalAttributes();

        if (parseInt(totalAttrs) === 0) {
            Dialog.show('Não existe opções para seleção adicionadas');
            return false;
        }

        if (parseInt(totalAttrs) === 1) {
            Dialog.show('Seleção deve conter no mínimo 2 opções');
            return false;
        }
    });

    $(".load-variables").click(function () {
        $("#variable-samples").html("");
        $("#table-extrusion").html("");
        $("#table-printer").html("");

        var val = $(this);
        if (val != "") {

            Object.entries(recipeVariables).forEach(([key, value]) => {
                let variableId = value;
                let variableName = recipeVariablesNames[value];

                $(Attribute.create(variableId, variableName)).appendTo($('#variable-samples'));
            });

            let lot = $('#lot').val();
            let recipe = $('#recipe_id').val();
            let lotNumberExtrusion = $('#lot_number_extrusion').val();
            let lotNumberPrint = $('#lot_number_print').val();
            let sampleOrigin = $('#sample_origin').val();

            if (lot.length > 0 && recipe.length > 0) {

                var processDialog = Dialog.processing();

                $.when(getSample(lot, recipe, lotNumberExtrusion, lotNumberPrint, sampleOrigin))
                    .done(function (resp) {

                        processDialog.close();

                        if (resp.message != undefined && resp.message != '') {
                            Dialog.show(resp.message);
                        }

                        if (undefined === resp.data || 0 === resp.data.length) {
                            return;
                        }

                        if (resp.data.limits != undefined) {

                            Object.entries(resp.data.limits).forEach(([key, value]) => {
                                let variableId = key;
                                let variableLimits = value;

                                Attribute.setLimits(variableId, variableLimits);
                            });
                        }


                        if (resp.data.totals != undefined) {

                            Object.entries(resp.data.totals).forEach(([key, value]) => {
                                let variableId = key;
                                let variableCalcs = value;

                                Attribute.setMedia(variableId, variableCalcs.media);
                                Attribute.setMin(variableId, variableCalcs.min);
                                Attribute.setMax(variableId, variableCalcs.max);
                                Attribute.setDeviation(variableId, variableCalcs.desvio);

                            });

                            Object.entries(resp.data.samples).forEach(([key, _value]) => {
                                let variableId = key;
                                let variableSamples = _value;
                                let count = 0;
                                let values = [];

                                Object.entries(variableSamples).forEach(([key, value]) => {
                                    if (count == 10) {
                                        $(Attribute.popule(variableId, values)).appendTo($('div.variable-sample#' + variableId).find("#samples"));
                                        values = [];
                                        count = 0;
                                    }

                                    count++;
                                    values.push(value);

                                });
                                if (values.length > 0) {
                                    $(Attribute.popule(variableId, values)).appendTo($('div.variable-sample#' + variableId).find("#samples"));
                                }

                            });
                        }

                        if (resp.data.extrusion_base.variables.length) {

                            let recipe = resp.data.extrusion_base.header['recipe'];
                            let date = resp.data.extrusion_base.header['date'];

                            tableExtrusion = "<h4 class='portlet-title' style='padding-top:50px;'>Base: Extrusão  -  Ficha Técnica: " + recipe + "  -  Data: " + date + "</h4>";
                            tableExtrusion += '<table class="table table-bordered table-condensed datatable dataTable no-footer">';

                            Object.entries(resp.data.extrusion_base.variables).forEach(([key, value]) => {
                                tableExtrusion += "<thead>";
                                tableExtrusion += "<tr>";
                                tableExtrusion += "<th  class='text-center'><h4>" + value.variable + "</h4></th>";
                                tableExtrusion += "</tr>";
                                tableExtrusion += "</thead>";
                                tableExtrusion += "<tr>";
                                tableExtrusion += "<td style='text-align:center;'><h5>" + value['samples'].join(' - ') + "</h5></td>";
                                tableExtrusion += "</tr>";
                            });

                            tableExtrusion += '</table>';

                            $("#table-extrusion").html(tableExtrusion);
                        }

                        if (resp.data.printer_base.variables.length) {

                            let recipe = resp.data.printer_base.header['recipe'];
                            let date = resp.data.printer_base.header['date'];

                            tablePrinter = "<h4 class='portlet-title' style='padding-top:50px;'>Base: Impressão   -   Ficha Técnica: " + recipe + "   -   Data: " + date + "</h4>";
                            tablePrinter += '<table class="table table-bordered table-condensed datatable dataTable no-footer">';

                            Object.entries(resp.data.printer_base.variables).forEach(([key, value]) => {
                                tablePrinter += "<thead>";
                                tablePrinter += "<tr>";
                                tablePrinter += "<th style='text-align:center;'><h4>" + value.variable + "</h4></th>";
                                tablePrinter += "</tr>";
                                tablePrinter += "</thead>";
                                tablePrinter += "<tr>";
                                tablePrinter += "<td style='text-align:center;'><h5>" + value['samples'].join(" - ") + "</h5></td>";
                                tablePrinter += "</tr>";
                            });

                            tablePrinter += '</table>';

                            $("#table-printer").html(tablePrinter);
                        }
                    });
            }
        }

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