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


Highcharts.setOptions({
    global: {
        useUTC: false
    }
});

if (typeof extrusion !== "undefined") {
    var
            rangesAmc = extrusion.yAbove,
            rangesVmc = extrusion.rAbove,
            ranges = extrusion.gPart,
            rangesVmb = extrusion.rBelow,
            rangesAmb = extrusion.yBelow,
            averages = extrusion.averages,
            varEu = extrusion.eu ? decodeEntities(extrusion.eu) : '-';

    Highcharts.chart('extrusion', {
        exporting: {
            enabled: false
        },
        credits: {
            text: 'BMS Tecnologia',
            href: 'http://www.bmstecnologia.com.br'
        },
        title: {
            text: 'Velocidade de Extrusão'
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
            valueSuffix: varEu
        },
        legend: {},
        series: [{
                name: extrusion.varName,
                data: averages,
                zIndex: 1,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[0]
                }
            }, {
                name: 'Limites',
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
            }, {
                name: 'Limites lower',
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
            }, {
                name: 'Limites upper',
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
            }, {
                name: 'Limites lower',
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
            }, {
                name: 'Limites upper',
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
            }]
    });
}

if (typeof cutting !== "undefined") {
    var
            rangesAmc = cutting.yAbove,
            rangesVmc = cutting.rAbove,
            ranges = cutting.gPart,
            rangesVmb = cutting.rBelow,
            rangesAmb = cutting.yBelow,
            averages = cutting.averages,
            varEu = cutting.eu ? decodeEntities(cutting.eu) : '-';

    Highcharts.chart('cutting', {
        exporting: {
            enabled: false
        },
        credits: {
            text: 'BMS Tecnologia',
            href: 'http://www.bmstecnologia.com.br'
        },
        title: {
            text: 'Velocidade de Corte'
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
            valueSuffix: varEu
        },
        legend: {},
        series: [{
                name: cutting.varName,
                data: averages,
                zIndex: 1,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[0]
                }
            }, {
                name: 'Limites',
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
            }, {
                name: 'Limites lower',
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
            }, {
                name: 'Limites upper',
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
            }, {
                name: 'Limites lower',
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
            }, {
                name: 'Limites upper',
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
            }]
    });

}


if (typeof cutting2 !== "undefined") {
    var
            rangesAmc2 = cutting2.yAbove,
            rangesVmc2 = cutting2.rAbove,
            ranges2 = cutting2.gPart,
            rangesVmb2 = cutting2.rBelow,
            rangesAmb2 = cutting2.yBelow,
            averages2 = cutting2.averages,
            varEu2 = cutting2.eu ? decodeEntities(cutting2.eu) : '-';

    Highcharts.chart('cutting2', {
        exporting: {
            enabled: false
        },
        credits: {
            text: 'BMS Tecnologia',
            href: 'http://www.bmstecnologia.com.br'
        },
        title: {
            text: 'Velocidade de Corte 2'
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
            valueSuffix: varEu
        },
        legend: {},
        series: [{
                name: cutting2.varName,
                data: averages2,
                zIndex: 1,
                marker: {
                    fillColor: 'white',
                    lineWidth: 2,
                    lineColor: Highcharts.getOptions().colors[0]
                }
            }, {
                name: 'Limites',
                data: ranges2,
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
                data: rangesAmb2,
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
                data: rangesAmc2,
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
                data: rangesVmb2,
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
                data: rangesVmc2,
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

}