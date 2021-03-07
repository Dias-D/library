$(document).ready(function () {
    if (!$.fn.dataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable();
    }
});

$(function () {

    $('.select2').select2();

    const chartHisto = []; // global
    const chartLimit = []; // global
    const graphData = [];

    const getGraphData = function (recipeId, machineId, startDate, endDate, lot, lot2, variableId) {
        return $.ajax({
            url: host + 'report/histogram/graph_data',
            data: {
                recipeId: recipeId,
                machineId: machineId,
                startDate: startDate,
                endDate: endDate,
                lot: lot,
                lot2: lot2,
                variableId: variableId
            },
            type: 'post',
            dataType: 'json'
        });
    };

    const getRecipeLot = function (startDate, endDate) {
        let recipe_id = $('#recipe_id').val();
        let machine = $('#machine_id').val();

        return $.ajax({
            url: host + 'recipe/get_filters',
            data: { start_date: startDate, end_date: endDate, recipe_id: recipe_id, machine_id: machine },
            type: 'post',
            dataType: 'json'
        });
    };

    const updateGraph = function () {

        let that = $('#variable_tag_id').val();
        let machine = $('#machine_id').val();
        let recipe = $('#recipe_id').val();
        let processDialog = '';
        let startDate = $('#start_date').val();
        let endDate = $('#end_date').val();
        let lot = $('#lot').val();
        let lot2 = $('#lot2').val();


        //let cacheData = graphData.find((element) => (element.id == that));

        //if (cacheData == undefined) {
        processDialog = Dialog.processing();
        $.when(getGraphData(recipe, machine, startDate, endDate, lot, lot2, that)).done(function (resp) {
            processDialog.close();

            if (undefined === resp.data || 0 === resp.data.length) {
                //Dialog.show("Máquina não possui variáveis");
                return;
            }

            graphData.push({ id: that, 'data': resp.data });

            if (typeof resp.data.chartData.length == 'undefine' || resp.data.chartData.length == 0) {
                $("#div-charts").hide();
                $("#no-data").show();
            } else {
                buildChart(resp.data.chartData);
                populateTable(resp.data.recipeValues);
                $("#div-charts").show();
                $("#no-data").hide();
            }
        });
    };

    $('#recipe_id').on('change', function () {
        let startDate = $('#start_date').val();
        let endDate = $('#end_date').val();
        let recipe_lot = $('#recipe-lot');
        let variable_id_option = $('#variable_tag_id option');
        let lot_option = $('#lot option');
        let lot2_option = $('#lot2 option');
        let variable_id = $('#variable_tag_id');
        let lot = $('#lot');
        let lot2 = $('#lot2');

        variable_id_option.remove();
        variable_id.append($('<option>', {
            value: '',
            text: '- Selecione -'
        }));

        lot_option.remove();
        lot.append($('<option>', {
            value: '',
            text: '- Selecione -'
        }));

        lot2_option.remove();
        lot2.append($('<option>', {
            value: '',
            text: '- Selecione -'
        }));

        //lot.prop('disabled', true);

        if ($(this).val() == "") {
            return;
        }

        var processing = Dialog.processing();

        $.when(getRecipeLot(startDate, endDate)).done(function (resp) {
            if (resp.data.variables.length === 0 || resp.data.lots.length === 0) {
                recipe_lot.hide();
                processing.close();
                Dialog.show("Máquina não possui variáveis e/ou lote cadastrados");
            }
            if (resp.data.variables.length !== 0 || resp.data.lots.length !== 0) {
                recipe_lot.show();
            }

            Object.entries(resp.data.variables).forEach(([key, value]) => {
                $('#variable_tag_id').append($('<option>', {
                    value: value.id,
                    text: value.name
                }));
            });

            Object.entries(resp.data.lots).forEach(([key, value]) => {
                $('#lot').append($('<option>', {
                    value: value.lot_number,
                    "data-filter": value.recipe_id,
                    text: value.lot_number
                }));
            });

            Object.entries(resp.data.lots2).forEach(([key, value]) => {
                $('#lot2').append($('<option>', {
                    value: value.lot_number2,
                    "data-filter": value.recipe_id,
                    text: value.lot_number2
                }));
            });

            processing.close();

        });

    });

    $('#lot').on('change', function () {
        updateGraph();
    });
    $('#lot2').on('change', function () {
        updateGraph();
    });

    $('#variable_tag_id').on('change', function () {
        updateGraph();
    });

    $("input[type='datetime-local']").on('change', function () {
        if ($('#end_date').val().length == 16 && $('#start_date').val().length == 16)
            $("#productionline_id").prop('disabled', false);
        else
            $("#productionline_id").prop('disabled', true);
    });

    $('form').selectFinder({
        id: "productLine-machine"
    });
    $('form').selectFinder({
        id: "machine-variable"
    });
    $('form').selectFinder({
        id: "recipe-lot"
    });
    $('form').selectFinder({
        id: "machine-recipe"
    });

});

var decodeEntities = (function () {
    // this prevents any overhead from creating the object each time
    var element = document.createElement('div');

    function decodeHTMLEntities(str) {
        if (str && typeof str === 'string') {
            // strip script/html tags
            str = str.replace(/<script[^>]*>([\S\s]*?)<\/script>/gmi, '');
            str = str.replace(/<\/?\w(?:[^"'>]|"[^"]*"|'[^']*')*>/gmi, '');
            element.innerHTML = str;
            str = element.textContent;
            element.textContent = '';
        }

        return str;
    }

    return decodeHTMLEntities;
})();

function buildChart(chartData) {

    let data = chartData.histoChart;

    let
        rangesAmc = chartData.yAbove,
        rangesVmc = chartData.rAbove,
        ranges = chartData.gPart,
        rangesVmb = chartData.rBelow,
        rangesAmb = chartData.yBelow,
        averages = chartData.averages,
        varEu = chartData.eu ? decodeEntities(chartData.eu) : ' ';

    chartHisto.update({
        title: {
            text: 'Histograma ' + chartData.varName
        },

        xAxis: [{
            title: { text: 'Data' },
            alignTicks: false
        }, {
            title: { text: 'Histogram' },
            alignTicks: false,
            opposite: true
        }],

        yAxis: [{
            title: { text: 'Data' }
        }, {
            title: {text: chartData.varName},
            opposite: true
        }],

        plotOptions: {
            histogram: {
                accessibility: {
                    pointDescriptionFormatter: function (point) {
                        var ix = point.index + 1,
                            x1 = point.x.toFixed(3),
                            x2 = point.x2.toFixed(3),
                            val = point.y;
                        return ix + '. ' + x1 + ' to ' + x2 + ', ' + val + '.';
                    }
                }
            }
        },

        series: [{
            name: 'Curva Normal',
            type: 'bellcurve',
            baseSeries: 's1',
            zIndex: 1
        }, {
            name: 'Histograma',
            type: 'histogram',
            xAxis: 1,
            yAxis: 1,
            baseSeries: 's1',
            data: data,
            id: 's1',
            marker: {
                radius: 1.5
            }
        }]
    });

    chartLimit.update({
        title: {
            text: chartData.varName
        },
        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: varEu
        },
        series: [
            {
                name: chartData.varName,
                data: averages,
                showInLegend: false,
                zIndex: 1,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[0]
                }
            }, {
                name: 'Objetivo',
                data: ranges,
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                color: '#2af0aa',
                fillOpacity: 0.3,
                zIndex: 0,
                marker: {
                    enabled: false
                }
            },
            {
                name: 'Limites Superior De Alerta',
                data: rangesAmc,
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                color: '#f8ff66',
                fillOpacity: 0.3,
                zIndex: 0,
                marker: {
                    enabled: false
                }
            },
            {
                name: 'Limites Inferior De Alerta',
                data: rangesAmb,
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                color: '#f8ff66',
                fillOpacity: 0.3,
                zIndex: 0,
                marker: {
                    enabled: false
                }
            },

            {
                name: 'Limites Superior De Controle',
                data: rangesVmc,
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                color: '#ff6868',
                fillOpacity: 0.3,
                zIndex: 0,
                marker: {
                    enabled: false
                }
            },
            {
                name: 'Limites Inferior de Controle',
                data: rangesVmb,
                type: 'arearange',
                lineWidth: 0,
                linkedTo: ':previous',
                color: '#ff6868',
                fillOpacity: 0.3,
                zIndex: 0,
                marker: {
                    enabled: false
                }
            }
        ]
    });

    chartData

}

function populateTable(tableData) {
    Object.entries(tableData).forEach(([key, value]) => {
        $("#" + key).html(value);
    });

}

Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

document.addEventListener('DOMContentLoaded', function () {

    chartHisto = Highcharts.chart('histo', {
        title: {
            text: 'Highcharts Histogram'
        },
        credits: {
            text: 'BMS Tecnologia',
            href: 'http://www.bmstecnologia.com.br'
        },
        xAxis: [{
            title: { text: 'Data' },
            alignTicks: false
        }, {
            title: { text: 'Histogram' },
            alignTicks: false,
            opposite: true
        }],

        yAxis: [{
            title: { text: 'Data' }
        }, {
            title: { text: 'Histogram' },
            opposite: true
        }],

        plotOptions: {
            histogram: {
                accessibility: {
                    pointDescriptionFormatter: function (point) {
                        var ix = point.index + 1,
                            x1 = point.x.toFixed(3),
                            x2 = point.x2.toFixed(3),
                            val = point.y;
                        return ix + '. ' + x1 + ' to ' + x2 + ', ' + val + '.';
                    }
                }
            }
        },

        series: [{
            name: 'Histogram',
            type: 'bellcurve',
            baseSeries: 's1',
            zIndex: 1
        }, {
            name: 'Histogram',
            type: 'histogram',
            xAxis: 1,
            yAxis: 1,
            baseSeries: 's1',
            data: [],
            id: 's1',
            marker: {
                radius: 1.5
            }
        }]
    });


    chartLimit = Highcharts.chart('limit', {

        exporting: {
            enabled: false
        },
        credits: {
            text: 'BMS Tecnologia',
            href: 'http://www.bmstecnologia.com.br'
        },
        title: {
            text: ''
        },

        xAxis: {
            type: 'datetime'
        },

        yAxis: {
            title: {
                text: null
            }
        },

        tooltip: {
            crosshairs: true,
            shared: true,
            valueSuffix: ''
        },

        legend: {},

        series: [{
            name: '',
            data: [],
            zIndex: 1,
            marker: {
                fillColor: 'white',
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[0]
            }
        }, {
            name: 'Limites',
            data: [],
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: '#2af0aa',
            fillOpacity: 0.3,
            zIndex: 0,
            marker: {
                enabled: false
            }
        }, {
            name: 'Limites lower',
            data: [],
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: '#f8ff66',
            fillOpacity: 0.3,
            zIndex: 0,
            marker: {
                enabled: false
            }
        }, {
            name: 'Limites upper',
            data: [],
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: '#f8ff66',
            fillOpacity: 0.3,
            zIndex: 0,
            marker: {
                enabled: false
            }
        }, {
            name: 'Limites lower',
            data: [],
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: '#ff6868',
            fillOpacity: 0.3,
            zIndex: 0,
            marker: {
                enabled: false
            }
        }, {
            name: 'Limites upper',
            data: [],
            type: 'arearange',
            lineWidth: 0,
            linkedTo: ':previous',
            color: '#ff6868',
            fillOpacity: 0.3,
            zIndex: 0,
            marker: {
                enabled: false
            }
        }]
    });

    $("#recipe_id").click(function () {
        $(this).removeAttr("size");
        contVisible = $('#recipe_id:not([style*="display: none"])').length * 4;
        $(this).attr("size", contVisible);

    }).mouseleave(function () {
        $(this).removeAttr("size");
    });
});
