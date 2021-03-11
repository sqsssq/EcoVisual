var colors = Highcharts.getOptions().colors,
    sunburstData = [{
        name: "(root)",
        id: "1",
        parent: "",
        value: 397316,
        color: colors[2]
    }],
    data = [{
            name: "生小/中/大病",
            id: "15",
            value: 518,
            color: colors[0],
            x: -5,
            low: 3738,
            high: 4256
        }, {
            name: "不生病",
            id: "14",
            value: 115,
            color: colors[0],
            x: -5,
            low: 3623,
            high: 3738
        }, 
        // {
        //     name: "贫困",
        //     id: "13",
        //     value: 218,
        //     color: colors[0],
        //     x: -5,
        //     low: 3405,
        //     high: 3623
        // }, {
        //     name: "贫困",
        //     id: "12",
        //     value: 445,
        //     color: colors[0],
        //     x: -5,
        //     low: 2960,
        //     high: 3405
        // }, 
        {
            name: "生小/中/大病",
            id: "11",
            value: 651,
            color: colors[0],
            x: -5,
            low: 2309,
            high: 2960
        }, {
            name: "不生病",
            id: "10",
            value: 234,
            color: colors[0],
            x: -5,
            low: 2075,
            high: 2309
        }, 
        // {
        //     name: "富裕",
        //     id: "9",
        //     value: 1470,
        //     color: colors[0],
        //     x: -5,
        //     low: 605,
        //     high: 2075
        // }, {
        //     name: "富裕",
        //     id: "8",
        //     value: 605,
        //     color: colors[0],
        //     x: -5,
        //     low: 0,
        //     high: 605
        // },
        {
            name: "健康投资5/10",
            id: "7",
            value: 633,
            color: colors[0],
            x: -4,
            low: 3623,
            high: 4256
        }, {
            name: "不进行健康投资",
            id: "6",
            value: 663,
            color: colors[0],
            x: -4,
            low: 2960,
            high: 3623
        }, {
            name: "受到小/中/大负面冲击",
            id: "5",
            value: 885,
            color: colors[0],
            x: -4,
            low: 2075,
            high: 2960
        }, {
            name: "未受到负面冲击",
            id: "4",
            value: 2075,
            color: colors[0],
            x: -4,
            low: 0,
            high: 2075
        }, {
            name: "生中病或大病",
            id: "3",
            value: 1296,
            color: colors[0],
            x: -3,
            low: 2960,
            high: 4256
        }, {
            name: "生小病或无病",
            id: "2",
            value: 2960,
            color: colors[0],
            x: -3,
            low: 0,
            high: 2960
        },
        {
            name: "",
            id: "1",
            value: 4256,
            color: colors[4],
            x: -2,
            low: 0,
            high: 4256
        }
    ];

// Add new series type for the flame series

(function (H) {
    H.seriesType('flame', 'columnrange', {
        cursor: 'pointer',
        dataLabels: {
            enabled: true,
            format: '{point.name}',
            inside: true,
            align: 'center',
            crop: true,
            overflow: 'true',
            color: 'black',
            style: {
                textOutline: 'none',
                fontWeight: 'normal'
            }
        },
        point: {
            events: {
                click: function () {
                    var point = this,
                        chart = point.series.chart,
                        series = point.series,
                        xAxis = series.xAxis,
                        yAxis = series.yAxis;

                    xAxis.setExtremes(xAxis.min, point.x, false);
                    yAxis.setExtremes(point.low, point.high, false);

                    chart.showResetZoom();
                    chart.redraw();
                }
            }
        },
        pointPadding: 0,
        groupPadding: 0
    }, {
        drawDataLabels: H.seriesTypes.line.prototype.drawDataLabels
    });
}(Highcharts));

// Create the chart

var chart = Highcharts.chart('container', {
    chart: {
        inverted: true
    },
    title: {
        // align: 'left',
        text: null
    },
    // subtitle: {
    //     align: 'left',
    //     text: 'Highcharts chart rendering process'
    // },
    legend: {
        enabled: false
    },
    xAxis: [{
        visible: false
    }, {
        visible: false,
        startOnTick: false,
        endOnTick: false,
        minPadding: 0,
        maxPadding: 0
    }],
    yAxis: [{
        visible: false
    }, {
        visible: false,
        min: 0,
        maxPadding: 0,
        startOnTick: false,
        endOnTick: false
    }],
    series: [{
        type: 'flame',
        data: data,
        yAxis: 1,
        xAxis: 1
    }, {
        visible: false,
        size: '100%',
        type: 'sunburst',
        data: sunburstData,
        allowDrillToNode: true,
        cursor: 'pointer',
        levels: [{
            level: 1,
            levelIsConstant: false,
            dataLabels: {
                enabled: false
            }
        }],
        dataLabels: {
            textPath: {
                attributes: {
                    dy: 5
                },
                enabled: true
            }
        }
    }],
    tooltip: {
        headerFormat: "",
        pointFormat: 'selfSize of <b>{point.name}</b> is <b>{point.value}</b>'
    },
    exporting: {
        enabled: false
    },
    credits: {
        enabled: false
    }
});

// Set up buttons for the chart layout change

var icicleButton = document.getElementById('icicle'),
    flameButton = document.getElementById('flame'),
    sunburstButton = document.getElementById('sunburst'),
    activeButtonIndex = 1,
    allButtons = [icicleButton, flameButton, sunburstButton];

icicleButton.onclick = function () {
    chart.update({
        chart: {
            inverted: true
        },
        xAxis: [{}, {
            reversed: false
        }],
        // title: {
        //     text: 'Flame chart (layout: icicle)'
        // },
        series: [{
            visible: true
        }, {
            visible: false
        }]
    }, true, false, activeButtonIndex !== 2);

    allButtons[activeButtonIndex].disabled = false;
    icicleButton.disabled = true;
    activeButtonIndex = 0;
};

flameButton.onclick = function () {
    chart.update({
        chart: {
            inverted: true
        },
        xAxis: [{}, {
            reversed: true
        }],
        // title: {
        //     text: 'Flame chart (layout: flame)'
        // },
        series: [{
            visible: true
        }, {
            visible: false
        }]
    }, true, false, activeButtonIndex !== 2);

    allButtons[activeButtonIndex].disabled = false;
    flameButton.disabled = true;
    activeButtonIndex = 1;
};

sunburstButton.onclick = function () {
    chart.update({
        chart: {
            inverted: false
        },
        xAxis: [{}, {
            reversed: true
        }],
        // title: {
        //     text: 'Flame chart (layout: sunburst)'
        // },
        series: [{
            visible: false
        }, {
            visible: true
        }]
    }, true, false, false);

    allButtons[activeButtonIndex].disabled = false;
    sunburstButton.disabled = true;
    activeButtonIndex = 2;
};