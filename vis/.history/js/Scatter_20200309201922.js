var widtha = 384;
var heighta = 307;
// var padding = { top: 10, bottom: 10, left: 10, right: 10 }
var K = 0;
var r = 0

var ssvg = 0;

var orret_g = 0

var ScattermyChart;
var zoom = d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

function zoomed() {
    ssvg.attr("transform",
        "translate(" + zoom.translate() + ")" +
        "scale(" + zoom.scale() + ")"
    );
}

function interpolateZoom(translate, scale) {
    var self = this;
    return d3.transition().duration(350).tween("zoom", function () {
        var iTranslate = d3.interpolate(zoom.translate(), translate),
            iScale = d3.interpolate(zoom.scale(), scale);
        return function (t) {
            zoom
                .scale(iScale(t))
                .translate(iTranslate(t));
            zoomed();
        };
    });
}


function PP() {
    ssvg = d3.select("#Tsne").append("svg")
        .attr('id', 'SView')
        .attr("width", widtha)
        .attr("height", heighta)
        // .append('g')
        .call(zoom)
        .append('g')
        .attr('class', 'zoomg')
    // .append("g")
    // // .attr("transform", "translate(0,100)")
    // .attr("transform", "translate(0, 0)");
}

var pr = [];

var coort = [];

var tcircle = 0;
var flag = -1;
var heatmapInstance = 0;

PP()

function DrawHeat(data) {

    // console.log(data)
    // if (heatmapInstance != 0) {
    //     heatmapInstance.remove();
    //     heatmapInstance = 0;
    // }
    heatmapInstance = h337.create({
        container: document.querySelector("#Tsne"),
        radius: 25,
        // maxOpacity: .5,
        // minOpacity: 0,
        blur: .75,
    })
    var points = []
    var kmax = 0;
    var padding = {
        top: 5,
        right: 10,
        bottom: 5,
        left: 10
    };

    var xAxisWidth = widtha - padding.right;
    var yAxisWidth = heighta - padding.bottom;
    var xScale = d3.scale.linear()
        .domain([d3.min(data, function (d) {
            return d.x;
        }), d3.max(data, function (d) {
            return d.x;
        })])
        .range([padding.left, xAxisWidth]);
    var yScale = d3.scale.linear()
        .domain([d3.min(data, function (d) {
            return d.y;
        }), d3.max(data, function (d) {
            return d.y;
        })])
        .range([padding.top, yAxisWidth]);
    var min_xx = 999999,
        min_yy = 999999,
        max_xx = -999999,
        max_yy = -999999
    for (var i in data) {
        if (min_xx > data[i].x) min_xx = data[i].x;
        if (min_yy > data[i].y) min_yy = data[i].y;
        if (max_xx < data[i].x) max_xx = data[i].x;
        if (max_yy < data[i].y) max_yy = data[i].y;
    }

    var kk_data = []
    for (var i = Math.floor(min_xx + 5) - 10; i <= Math.floor(max_xx - 5) + 10; i += 10) {
        for (var j = Math.floor(min_yy + 5) - 10; j <= Math.floor(max_yy - 5) + 10; j += 10) {
            var m_val = 0,
                m_num = 0;
            for (var k in data) {
                if (data[k].x >= i - 5 && data[k].x < i + 5 && data[k].y >= j - 5 && data[k].y < j + 5) {
                    m_val += parseFloat(data[k].val)
                    m_num++;
                }
            }
            var n_val = 0;
            if (m_num != 0) n_val = m_val / m_num;
            var rcx = {
                x: i,
                y: j,
                val: n_val
            }
            // if (m_num != 0)
            kk_data.push(rcx);
        }
    }

    // kk_data = [data[1], data[2], data[3]]
    var kmin = 999999
    console.log(kk_data)
    for (i in kk_data) {
        // console.log(kk_data[i])
        if (kmax < parseFloat(kk_data[i]['val']))
            kmax = Math.round(parseFloat(kk_data[i]['val']), 0)
        kmin = Math.min(kmin, Math.round(parseFloat(kk_data[i]['val']), 0))
        points.push({
            x: Math.round(xScale(kk_data[i].x), 0),
            y: Math.round(yScale(kk_data[i].y), 0),
            value: parseFloat(kk_data[i]['val']),
            // value: -1
            // radius: 70
        })
    }
    // for (var i = 1; i <= 370; i += 5) {
    //     for (var j = 1; j <= 370; j += 5) {
    //         points.push({
    //             x: i,
    //             y: j,
    //             value: 0
    //         })
    //     }

    // }
    console.log(kmin)
    var heat_data = {
        max: Math.floor(kmax),
        min: Math.floor(-250),
        data: points
    }
    heatmapInstance.setData(heat_data)
}

function ScatterPaint(coor, p, num) {
    // PP()

    // console.log(num)
    coort = coor

    if (tcircle != 0) tcircle.remove()
    if (r != 0) r.remove()

    // DrawHeat(coor)

    var padding = {
        top: 5,
        right: 10,
        bottom: 5,
        left: 10
    };

    var xAxisWidth = widtha - padding.right;
    var yAxisWidth = heighta - padding.bottom;
    var xScale = d3.scale.linear()
        .domain([d3.min(coor, function (d) {
            return d.x;
        }), d3.max(coor, function (d) {
            return d.x;
        }) * 1.2])
        .range([padding.left, xAxisWidth]);
    var yScale = d3.scale.linear()
        .domain([d3.min(coor, function (d) {
            return d.y;
        }), d3.max(coor, function (d) {
            return d.y;
        })])
        .range([padding.top, yAxisWidth]);


    // var color = ['#00a676', '#f9c80e', '#3abeff', '#df19c1', '#ff206e', '#f08700', '#0091c9', '#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD']
    // var color = ['#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD']
    // 可以自动生成颜色
    var color = [];
    for (i = 0; i < 80; i++) {
        var letters = '0123456789ABCDEF'.split('');
        var rand_color = '#';
        for (var j = 0; j < 6; j++) {
            rand_color += letters[Math.round(Math.random() * 15)];
        }
        color[i] = rand_color;
    }

    tcircle = ssvg.selectAll("circle")
        .data(coor)
        .enter()
        .append("circle")
        .attr("fill", d => {
            return color[d.label]
        })
        .attr("fill-opacity", "1")
        .attr("id", "circleid")
        .attr("cx", function (d) {
            //console.log(d);
            // if (d.l == num)
            return padding.left + xScale(d.x);
        })
        .attr("cy", function (d) {
            // if (d.l == num)
            return yScale(d.y);
        })
        .attr("r", 1)
        // .attr('stroke', d => {
        //     return color[d.label]
        // })
        // .attr('stroke-width', 0.8)
        .attr('fill-opacity', 1)
        .on("mouseover", function (d, i) {
            // console.log(d)
            d3.select(this)
                .attr("fill", "yellow");
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("fill", d => {
                    return color[d.label]
                });
        });

    // console.log(tcircle)

    // coor.length = 0;

    var brush = d3.svg.brush()
        .x(xScale)
        .y(yScale)
        .extent([
            [0, 0],
            [0, 0]
        ])
        .on("brush", brushed)

    function brushed() {
        var extent = brush.extent();
        var xmin = extent[0][0];
        var xmax = extent[1][0];
        var ymin = extent[0][1];
        var ymax = extent[1][1];

        for (var i in coor) {
            // console.log(i)
            if (coor[i].x >= xmin && coor[i].x <= xmax && coor[i].y >= ymin && coor[i].y <= ymax) {
                // console.log(coor[i])
                if (flag == -1)
                    flag = coor[i].label;
                // return "red";
            }
        }

        // console.log(flag)

        if (K == 0 && flag != -1) {

            console.log(flag)
            var coor_p = {}

            for (var i in p) {
                // console.log(p[i][0])
                if (p[i][0].label == flag) {
                    coor_p[i] = p[i];
                }
            }

            // console.log(coor_p)

            var coor_path = PathCalc(coor_p, -1, -1);

            // console.log(coor_path[1])

            var n__ = []
            for (var i in coor_path[1]) {
                n__.push(i)
            }

            OrRect(n__, color[flag])

            if (LineName != 0) LineName.remove();

            LinePaint_2(coor_path[0], coor_path[2], color[flag])

            K = 1;
        }
    }

    // console.log(flag)
    r = ssvg.append("g")
        .call(brush)
        .selectAll("rect")
        .style("fill-opacity", 0.3)
}

function ScatterPaint_gain_loss(coor, p, num_coor, num) {
    // PP()
    // for (var i in coor) {
    //     coor[i]['val'] = parseFloat(num_coor[i][91])
    // }

    // console.log(coor)

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltipx")
        .style("opacity", 0.0)

    if (tcircle != 0) tcircle.remove()
    if (r != 0) r.remove()


    DrawHeat(coor)
    var padding = {
        top: 5,
        right: 10,
        bottom: 5,
        left: 10
    };
    let max_x = -999999,
        min_x = 99999,
        max_y = -99999,
        min_y = 999999

    for (var i in coor) {
        max_x = Math.max(max_x, parseFloat(coor[i].x))
        max_y = Math.max(max_y, parseFloat(coor[i].y))
        min_x = Math.min(min_x, parseFloat(coor[i].x))
        min_y = Math.min(min_y, parseFloat(coor[i].y))
    }

    var xAxisWidth = widtha - 2 * padding.right;
    var yAxisWidth = heighta - padding.bottom;
    var xScale = d3.scale.linear()
        .domain([min_x, max_x])
        .range([padding.left, xAxisWidth]);
    var yScale = d3.scale.linear()
        .domain([min_y, max_y])
        .range([padding.top, yAxisWidth]);

    var h_line = [-25, 25, -50, 50, min_x, max_x],
        s_line = [-25, 25, -50, 50, min_y, max_y]
    ssvg.selectAll('#x_line')
        .attr('id', 'x_line')
        .data(h_line)
        .enter()
        .append('g')
        .append('line')
        .attr('x1', d => {
            return xScale(d)
        })
        .attr('y1', (d, i) => {
            return yScale(min_y)
        })
        .attr('x2', d => {
            return xScale(d)
        })
        .attr('y2', (d, i) => {
            return yScale(max_y)
        })
        .attr('fill', 'none')
        .attr('stroke', '#0a3c75')
        .attr('stroke-width', 0.1)
        .attr('stroke-opacity', 0.4)
        .attr('stroke-dasharray', 5.5)

    ssvg.selectAll('#x_line')
        .attr('id', 'x_line')
        .data(s_line)
        .enter()
        .append('g')
        .append('line')
        .attr('x1', d => {
            return xScale(min_x)
        })
        .attr('y1', d => {
            return yScale(d)
        })
        .attr('x2', d => {
            return xScale(max_x)
        })
        .attr('y2', d => {
            return yScale(d)
        })
        .attr('fill', 'none')
        .attr('stroke', '#0a3c75')
        .attr('stroke-width', 0.1)
        .attr('stroke-opacity', 0.4)
        .attr('stroke-dasharray', 5.5)


    var xAxis = d3.svg.axis().scale(xScale).ticks(0).tickFormat(d3.format()).orient("bottom");
    var yAxis = d3.svg.axis().scale(yScale).ticks(0).tickFormat(d3.format()).orient("left"); //添加一个g用于放x轴

    ssvg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 0 + "," + yScale(0) + ")")
        .call(xAxis)
    ssvg.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + xScale(0) + "," + 0 + ")")
        .call(yAxis)


    // var color = ['#00a676', '#f9c80e', '#3abeff', '#df19c1', '#ff206e', '#f08700', '#0091c9']
    var color = ['#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD']
    var a = d3.rgb(255, 0, 0); //红色
    // var b = d3.rgb(0, 255, 0); //绿色
    var b = '#00FF00'

    var compute = d3.interpolate(a, b);

    var linear = d3.scale.linear()
        .domain([-550, 550])
        .range([0, 1]);
    tcircle = ssvg.append('g').selectAll("circle")
        .data(coor)
        .enter()
        .append("circle")
        .attr("fill", (d, i) => {
            // if (d.l == num)
            if (coor[i]['xval'] <= 0)
                return 'red'
            // return compute(linear(parseFloat(num_coor[i][91])))
            else
                return '#00FF00'
            // else return 'none'
        })
        // .attr("fill-opacity", 0.5)
        .attr("id", "circleid")
        .attr("cx", function (d) {
            //console.log(d);
            return xScale(d.x);
        })
        .attr("cy", function (d) {
            return yScale(d.y);
        })
        .attr("r", 1.8)
        .attr('stroke', (d, i) => {
            //if (d.l == num)
            return 'gray'
            // if (coor[i]['val'] <= 0)
            //     return 'red'
            // // return compute(linear(parseFloat(num_coor[i][91])))
            // else
            //     return '#00FF00'
            // //else 'none';
        })
        .attr('stroke-width', 0.1)
        .attr('fill-opacity', 0.3)
        .on("mouseover", function (d, i) {
            // tooltip.html("Code: " + d.id + "</br>" + "Value: " + d.val)
            //     .style("left", (d3.event.pageX - 15) + "px")
            //     .style("top", (d3.event.pageY + 0) + "px")
            //     .style("opacity", 1.0)
            // console.log(d)
            d3.select(this)
                .attr("fill", "yellow")
                .attr('fill-opacity', 1)
        })
        .on("mousemove", d => {
            // tooltip.style("left", (d3.event.pageX - 15) + "px")
            //     .style("top", (d3.event.pageY + 0) + "px")
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("fill", d => {
                    if (coor[i]['val'] <= 0)
                        return 'red'
                    // return compute(linear(parseFloat(num_coor[i][91])))
                    else
                        return '#00FF00'
                });
            // tooltip.style("opacity", 0.1)
        });

    console.log(tcircle)

    coor.length = 0;

    // var brush = d3.svg.brush()
    //     .x(xScale)
    //     .y(yScale)
    //     .extent([
    //         [0, 0],
    //         [0, 0]
    //     ])
    //     .on("brush", brushed)

    // function brushed() {
    //     var extent = brush.extent();
    //     var xmin = extent[0][0];
    //     var xmax = extent[1][0];
    //     var ymin = extent[0][1];
    //     var ymax = extent[1][1];

    //     for (var i in coor) {
    //         // console.log(i)
    //         if (coor[i].x >= xmin && coor[i].x <= xmax && coor[i].y >= ymin && coor[i].y <= ymax) {
    //             // console.log(coor[i])
    //             if (flag == -1)
    //                 flag = coor[i].label;
    //             // return "red";
    //         }
    //     }

    //     // console.log(flag)

    //     if (K == 0 && flag != -1) {

    //         // console.log(flag)
    //         var coor_p = {}

    //         for (var i in p) {
    //             // console.log(p[i][0])
    //             if (p[i][0].label == flag) {
    //                 coor_p[i] = p[i];
    //             }
    //         }

    //         // console.log(coor_p)

    //         var coor_path = PathCalc(coor_p, -1, -1);

    //         // console.log(coor_path[1])

    //         var n__ = []
    //         for (var i in coor_path[1]) {
    //             n__.push(i)
    //         }

    //         OrRect(n__, color[flag])

    //         if (LineName != 0) LineName.remove();

    //         LinePaint_2(coor_path[0], coor_path[2], color[flag])

    //         K = 1;
    //     }
    // }

    // // console.log(flag)
    // r = ssvg.append("g")
    //     .call(brush)
    //     .selectAll("rect")
    //     .style("fill-opacity", 0.3)
}

// function ScatterPaint_gain_loss_H(coor, p, num_coor, num) {
//     // PP()

//     // if (tcircle != 0) tcircle.remove()
//     // if (r != 0) r.remove()

//     console.log(coor)
//     console.log(num_coor)

//     var padding = {
//         top: 5,
//         right: 10,
//         bottom: 5,
//         left: 10
//     };

//     // var xAxisWidth = widtha - padding.right;
//     // var yAxisWidth = heighta - padding.bottom;
//     // var xScale = d3.scale.linear()
//     //     .domain([d3.min(coor, function (d) {
//     //         return d.x;
//     //     }), d3.max(coor, function (d) {
//     //         return d.x;
//     //     }) * 1.2])
//     //     .range([padding.left, xAxisWidth]);
//     // var yScale = d3.scale.linear()
//     //     .domain([d3.min(coor, function (d) {
//     //         return d.y;
//     //     }), d3.max(coor, function (d) {
//     //         return d.y;
//     //     })])
//     //     .range([padding.top, yAxisWidth]);

//     // // DrawHeat(coor, num_coor)


//     // // var color = ['#00a676', '#f9c80e', '#3abeff', '#df19c1', '#ff206e', '#f08700', '#0091c9']
//     // var color = ['#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD']
//     // var a = d3.rgb(255, 0, 0); //红色
//     // // var b = d3.rgb(0, 255, 0); //绿色
//     // var b = '#00FF00'

//     // var compute = d3.interpolate(a, b);

//     // var linear = d3.scale.linear()
//     //     .domain([-550, 550])
//     //     .range([0, 1]);
//     // tcircle = ssvg.selectAll("circle")
//     //     .data(coor)
//     //     .enter()
//     //     .append("circle")
//     //     .attr("fill", (d, i) => {
//     //         //if (d.l == num)
//     //         if (num_coor[i][91] <= 0)
//     //             return 'red'
//     //         // return compute(linear(parseFloat(num_coor[i][91])))
//     //         else
//     //             return '#00FF00'
//     //         //else return 'none'
//     //     })
//     //     // .attr("fill-opacity", 0.5)
//     //     .attr("id", "circleid")
//     //     .attr("cx", function (d) {
//     //         //console.log(d);
//     //         return padding.left + xScale(d.x);
//     //     })
//     //     .attr("cy", function (d) {
//     //         return yScale(d.y);
//     //     })
//     //     .attr("r", 1.8)
//     //     // .attr('stroke', (d, i) => {
//     //     //     //if (d.l == num)
//     //     //     if (num_coor[i][91] <= 0)
//     //     //         return 'red'
//     //     //     // return compute(linear(parseFloat(num_coor[i][91])))
//     //     //     else
//     //     //         return '#00FF00'
//     //     //     //else 'none';
//     //     // })
//     //     // .attr('stroke-width', 0.3)
//     //     .attr('fill-opacity', 0.2)
//     //     .on("mouseover", function (d, i) {
//     //         // console.log(d)
//     //         d3.select(this)
//     //             .attr("fill", "yellow");
//     //     })
//     //     .on("mouseout", function (d, i) {
//     //         d3.select(this)
//     //             .attr("fill", d => {
//     //                 return color[d.label]
//     //             });
//     //     });

//     // // console.log(tcircle)

//     // // coor.length = 0;

//     // var brush = d3.svg.brush()
//     //     .x(xScale)
//     //     .y(yScale)
//     //     .extent([
//     //         [0, 0],
//     //         [0, 0]
//     //     ])
//     //     .on("brush", brushed)

//     // function brushed() {
//     //     var extent = brush.extent();
//     //     var xmin = extent[0][0];
//     //     var xmax = extent[1][0];
//     //     var ymin = extent[0][1];
//     //     var ymax = extent[1][1];

//     //     for (var i in coor) {
//     //         // console.log(i)
//     //         if (coor[i].x >= xmin && coor[i].x <= xmax && coor[i].y >= ymin && coor[i].y <= ymax) {
//     //             // console.log(coor[i])
//     //             if (flag == -1)
//     //                 flag = coor[i].label;
//     //             // return "red";
//     //         }
//     //     }

//     //     // console.log(flag)

//     //     if (K == 0 && flag != -1) {

//     //         // console.log(flag)
//     //         var coor_p = {}

//     //         for (var i in p) {
//     //             // console.log(p[i][0])
//     //             if (p[i][0].label == flag) {
//     //                 coor_p[i] = p[i];
//     //             }
//     //         }

//     //         // console.log(coor_p)

//     //         var coor_path = PathCalc(coor_p, -1, -1);

//     //         // console.log(coor_path[1])

//     //         var n__ = []
//     //         for (var i in coor_path[1]) {
//     //             n__.push(i)
//     //         }

//     //         OrRect(n__, color[flag])

//     //         if (LineName != 0) LineName.remove();

//     //         LinePaint_2(coor_path[0], coor_path[2], color[flag])

//     //         K = 1;
//     //     }
//     // }

//     // // console.log(flag)
//     // r = ssvg.append("g")
//     //     .call(brush)
//     //     .selectAll("rect")
//     //     .style("fill-opacity", 0.3)

//     ScattermyChart = echarts.init(document.getElementById('Tsne'));

//     var data1 = [];
//     var data2 = [];
//     var data3 = [];

//     var random = function (max) {
//         return (Math.random() * max).toFixed(3);
//     };

//     // for (var i = 0; i < 500; i++) {
//     //     data1.push([random(15), random(10), random(1), 'xxx']);
//     //     data2.push([random(10), random(10), random(1), 'yyy']);
//     //     data3.push([random(15), random(10), random(1), 'zzz']);
//     // }

//     for (var i in coor) {
//         if (parseFloat(num_coor[i][91]) <= 0)
//         data1.push([coor[i]['x'], coor[i]['y'], coor[i]['id']])
//         else
//         data2.push([coor[i]['x'], coor[i]['y'], coor[i]['id']])
//     }

//     option = {
//         animation: false,
//         grid: [{
//             x: '0%',
//             y: '2%',
//             width: '100%',
//             height: '98%'
//         }],
//         legend: {
//             left: '90%',
//             padding: [5, 100, 0, 0],
//             data: ['+', '-', 'scatter3']
//         },
//         tooltip: {
//             formatter: function (obj) {
//                 var value = obj.value;
//                 return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">' +
//                     'Code: ' + ' ' + value[2] +
//                     '</div>'
//                 // + schema[1].text + '：' + value[1] + '<br>'
//                 // + schema[2].text + '：' + value[2] + '<br>'
//             }
//         },
//         xAxis: {
//             show: true,
//             gridIndex: 0,
//             type: 'value',
//             min: 'dataMin',
//             max: 'dataMax',
//             splitLine: {
//                 show: true
//             },
//             axisLabel: {
//                 formatter: function () {
//                     return "";
//                 }
//             },
//         },
//         yAxis: {
//             gridIndex: 0,
//             type: 'value',
//             min: 'dataMin',
//             max: 'dataMax',
//             splitLine: {
//                 show: true
//             },
//             axisLabel: {
//                 formatter: function () {
//                     return "";
//                 }
//             },
//         },
//         dataZoom: [
//             // {
//             //     type: 'slider',
//             //     show: true,
//             //     xAxisIndex: [0],
//             //     start: 29,
//             //     end: 35
//             // },
//             // {
//             //     type: 'slider',
//             //     show: true,
//             //     yAxisIndex: [0],
//             //     left: '93%',
//             //     // handleS?ize: '0%',
//             //     width: '10%',
//             //     start: 20,
//             //     end: 30
//             // },
//             {
//                 type: 'inside',
//                 xAxisIndex: [0],
//                 start: 1,
//                 end: 100
//             },
//             {
//                 type: 'inside',
//                 yAxisIndex: [0],
//                 start: 1,
//                 end: 100
//             }
//         ],
//         series: [{
//                 name: '+',
//                 type: 'scatter',
//                 itemStyle: {
//                     normal: {
//                         opacity: 0.8
//                     }
//                 },
//                 symbolSize: function (val) {
//                     return 2;
//                 },
//                 data: data1
//             },
//             {
//                 name: '-',
//                 type: 'scatter',
//                 itemStyle: {
//                     shadowColor: 'red',
//                     normal: {
//                         opacity: 0.8
//                     }
//                 },
//                 symbolSize: function (val) {
//                     return 2;
//                 },
//                 data: data2
//             },
//             // {
//             //     name: 'scatter3',
//             //     type: 'scatter',
//             //     itemStyle: {
//             //         normal: {
//             //             opacity: 0.8,
//             //         }
//             //     },
//             //     // symbolSize: function (val) {
//             //     //     return val[2] * 40;
//             //     // },
//             //     data: data3
//             // }
//         ]
//     }
//     ScattermyChart.setOption(option)

// }

function OrRect(data, color) {
    d3.csv('data/back.csv', d => {
        // console.log(data)


        var nameList = {}

        for (var i in d) {
            nameList[d[i].code] = i
        }


        if (orret_g != 0) {
            orret_g.remove()
        }

        // console.log(nameList)

        orret_g = Codesvg.append('g')

        orret_g.selectAll('#org_r')
            .attr('id', 'org_r')
            .data(data)
            .enter()
            .append('rect')
            .attr("x", paddingx.left)
            .attr("y", d => {
                return (parseInt(nameList[d]) + 1) * 20
            })
            .attr("width", 923)
            .attr("height", 20)
            .attr("fill", color)
            .attr('fill-opacity', 0.3)
            .on('click', d => {
                if (d_num == 0) {
                    if (judge_cir_line == 0)
                        Paintjudge(d);
                    else
                        PaintCir(d);
                } else {
                    if (cnt_num < 1) {
                        cnt_num++;
                        name_in.push(d)
                        if (judge_cir_line == 1)
                            PaintCir(d)
                        else
                            Paintjudge(d)
                    } else {
                        cnt_num++;
                        name_in.push(d)
                        if (judge_cir_line == 1) {
                            PaintCir_2(name_in)
                        } else {
                            Paintjudge_2(name_in)
                        }
                    }
                }
            })
    })
}