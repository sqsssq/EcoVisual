var myChart;

function Sun() {
    myChart = echarts.init(document.getElementById('Sun'));
    var data = [{
        name: '志愿者',
        value: 300,
        children: [{
            name: '收入(True)',
            value: 31,
            children: [{
                name: '收入(High)',
                value: 20,
                children: [{
                    name: '收益(High)',
                    value: 6,
                }, {
                    name: '亏损(Low)',
                    value: 14
                }]
            }, {
                name: '拖延症(Low)',
                value: 11,
                children: [{
                    name: '收益(High)',
                    value: 6
                }, {
                    name: '亏损(Low)',
                    value: 5
                }]
            }]
        }, {
            name: '收入(False)',
            value: 269,
            children: [{
                name: '拖延症(High)',
                value: 59,
                children: [{
                    name: '收益(Low)',
                    value: 11
                }, {
                    name: '亏损(High)',
                    value: 48
                }]
            }, {
                name: '拖延症(Low)',
                value: 210,
                children: [{
                    name: '亏损(High)',
                    value: 157
                }, {
                    name: '收益(Low)',
                    value: 53
                }]
            }]
        }]
    }];

    option = {
        visualMap: {
            type: 'continuous',
            min: 0,
            max: 300,
            inRange: {
                color: ['#2D5F73', '#538EA6', '#F2D1B3', '#F2B8A2', '#F28C8C']
            }
        },
        series: {
            type: 'sunburst',
            data: data,
            radius: [0, '95%'],
            label: {
                rotate: 'radial'
            }
        }
    };
    myChart.setOption(option)
}
Sun()