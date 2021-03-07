$(function () {
    // Create the chart
    $('#container').highcharts('StockChart', {
        rangeSelector: {
            enabled: false
        },
        navigator: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        title: {
            text: 'USD to EUR exchange rate'
        },
        yAxis: {
            title: {
                text: 'Exchange rate'
            },
            plotLines: [{
                    value: 1,
                    color: 'green',
                    dashStyle: 'shortdash',
                    width: 2,
                    label: {
                        text: 'Last quarter minimum'
                    }
                }, {
                    value: 3,
                    color: 'red',
                    dashStyle: 'shortdash',
                    width: 2,
                    label: {
                        text: 'Last quarter maximum'
                    }
                }]
        },
        series: [{
                name: 'USD to EUR',
                data: [[1], [0.8], [3]],
                tooltip: {
                    valueDecimals: 2
                }
            }]
    });
});