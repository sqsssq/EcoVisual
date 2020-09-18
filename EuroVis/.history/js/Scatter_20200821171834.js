var widtha = 403;
var heighta = 320;
// var padding = { top: 10, bottom: 10, left: 10, right: 10 }
var K = 0;
var r = 0

var ssvg = 0;

var orret_g = 0

var ScattermyChart;

var name_x = [];

var k_in_num = 0
// var zoom = d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

// function zoomed() {
//     ssvg.attr("transform",
//         "translate(" + zoom.translate() + ")" +
//         "scale(" + zoom.scale() + ")"
//     );
// }

// function interpolateZoom(translate, scale) {
//     var self = this;
//     return d3.transition().duration(350).tween("zoom", function () {
//         var iTranslate = d3.interpolate(zoom.translate(), translate),
//             iScale = d3.interpolate(zoom.scale(), scale);
//         return function (t) {
//             zoom
//                 .scale(iScale(t))
//                 .translate(iTranslate(t));
//             zoomed();
//         };
//     });
// }


function PP() {
    ssvg = d3.select("#Tsne").append("svg")
        .attr('id', 'SView')
        .attr("width", widtha)
        .attr("height", heighta)
    // .append('g')
    // .call(zoom)
    // .append('g')
    // .attr('class', 'zoomg')
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

// function DrawHeat(data) {

//     // console.log(data)
//     // if (heatmapInstance != 0) {
//     //     heatmapInstance.remove();
//     //     heatmapInstance = 0;
//     // }
//     d3.csv('data/final.csv', function (HeatD) {
//         // console.log(HeatD)
//         data = HeatD
//         heatmapInstance = h337.create({
//             container: document.querySelector("#Tsne"),
//             radius: 6,
//             // maxOpacity: 0.8,
//             // minOpacity: 0.6,
//             // blur: .75,
//             gradient: {
//                 // '.2': 'red',
//                 // '.3': 'orange',
//                 // '.4': 'blue',
//                 // '.75': 'yellow',
//                 // '.95': '#00FF00',
//                 //   '.0': "rgba(33,102,172,0)",
//                 //                         '.0.01':  "#FFA079",
//                 // '.0.08': "#FF7F50",
//                 // '.0.15': "#FFBB3E",
//                 // '.22': "#FFA500",
//                 // '.29': "#FFD700",
//                 // '.36': "#e2dc00",
//                 // '.43': "#ADFF2F",
//                 // '.5': "#00FF7F",
//                 // '.57': "#00CED1",
//                 // '.64': "#00FFFF",
//                 // '.71': "#1E90FF",
//                 // '.78': "#0000FF",
//                 // '.85': "#8A2BE2",
//                 // '.92': "#7B68EE",
//                 // '.99': "#EE82EE"
//                 '.11': 'rgba(227, 184, 193)',
//                 '.25': 'rgba(194, 140, 124)',
//                 '.39': 'rgba(217, 169, 130)',
//                 '.50': 'rgba(242, 206, 133)',
//                 '.65': 'rgba(242, 224, 150)',
//                 '.70': 'rgba(242, 238, 162)',
//                 '.85': 'rgba(176, 196, 124)',
//                 '.99': 'rgba(112, 153, 89)',
//                 // '.99': 'rgba()',
//             }
//         })
//         var points = []
//         var kmax = 0;
//         var padding = {
//             top: 5,
//             right: 10,
//             bottom: 5,
//             left: 10
//         };

//         var xAxisWidth = widtha - padding.right;
//         var yAxisWidth = heighta - padding.bottom;
//         var xScale = d3.scale.linear()
//             .domain([d3.min(data, function (d) {
//                 return parseFloat(d.X);
//             }), d3.max(data, function (d) {
//                 return parseFloat(d.X);
//             })])
//             .range([padding.left, xAxisWidth]);
//         var yScale = d3.scale.linear()
//             .domain([d3.min(data, function (d) {
//                 return parseFloat(d.Y);
//             }), d3.max(data, function (d) {
//                 return parseFloat(d.Y);
//             })])
//             .range([padding.top, yAxisWidth]);
//         var min_xx = 999999,
//             min_yy = 999999,
//             max_xx = -999999,
//             max_yy = -999999
//         for (var i in data) {
//             if (min_xx > parseFloat(data[i].X)) min_xx = parseFloat(data[i].X);
//             if (min_yy > parseFloat(data[i].Y)) min_yy = parseFloat(data[i].Y);
//             if (max_xx < parseFloat(data[i].X)) max_xx = parseFloat(data[i].X);
//             if (max_yy < parseFloat(data[i].Y)) max_yy = parseFloat(data[i].Y);
//         }

//         // var kk_data = []
//         // for (var i = Math.floor(min_xx + 5) - 10; i <= Math.floor(max_xx - 5) + 10; i += 10) {
//         //     for (var j = Math.floor(min_yy + 5) - 10; j <= Math.floor(max_yy - 5) + 10; j += 10) {
//         //         var m_val = 0,
//         //             m_num = 0;
//         //         for (var k in data) {
//         //             if (parseFloat(data[k].X) >= i - 5 && parseFloat(data[k].X) < i + 5 && parseFloat(data[k].Y) >= j - 5 && parseFloat(data[k].Y) < j + 5) {
//         //                 m_val += parseFloat(data[k].val)
//         //                 m_num++;
//         //             }
//         //         }
//         //         var n_val = 0;
//         //         if (m_num != 0) n_val = m_val / m_num;
//         //         var rcx = {
//         //             x: i,
//         //             y: j,
//         //             val: n_val
//         //         }
//         //         // if (m_num != 0)
//         //         kk_data.push(rcx);
//         //     }
//         // }

//         // kk_data = [data[1], data[2], data[3]]
//         var kmin = 999999
//         // console.log(kk_data)
//         for (i in data) {
//             // console.log(data[i]["val"])
//             if (kmax < parseFloat(data[i]['val']))
//                 kmax = Math.round(parseFloat(data[i]['val']), 0)
//             kmin = Math.min(kmin, Math.round(parseFloat(data[i]['val']), 0))
//             points.push({
//                 x: Math.round(xScale(data[i].X), 0),
//                 y: Math.round(yScale(data[i].Y), 0),
//                 value: parseFloat(data[i]['val']),
//                 // value: -1
//                 // radius: 70
//             })
//         }
//         // for (var i = 1; i <= 370; i += 5) {
//         //     for (var j = 1; j <= 370; j += 5) {
//         //         points.push({
//         //             x: i,
//         //             y: j,
//         //             value: 0
//         //         })
//         //     }

//         // }
//         // console.log(points)
//         var heat_data = {
//             max: Math.floor(kmax),
//             // min: Math.floor(-250),
//             data: points
//         }
//         heatmapInstance.setData(heat_data)
//     })

// }

function ScatterPaint_gain_loss(coor, p, num, pf, rectdata) {
    // PP()
    // for (var i in coor) {
    //     coor[i]['val'] = parseFloat(num_coor[i][91])
    // }

    // console.log(coor)
    // console.log(rectdata)

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltipx")
        .style("opacity", 0.0)

    var NameValue = new Object();

    for (var i in rectdata) {
        // console.log(i);
        NameValue[rectdata[i].code] = rectdata[i][12];
    }

    console.log(NameValue)

    if (tcircle != 0) tcircle.remove()
    if (r != 0) r.remove()


    // DrawHeat(coor)
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

    var xAxisWidth = widtha;
    var yAxisWidth = heighta;
    var xScale = d3.scale.linear()
        .domain([min_x, max_x])
        .range([30, xAxisWidth - 5]);
    var yScale = d3.scale.linear()
        .domain([min_y, max_y])
        .range([yAxisWidth - 30, 5]);

    // var h_line = [-25, 25, -50, 50, min_x, max_x],
    //     s_line = [-25, 25, -50, 50, min_y, max_y]
    // ssvg.selectAll('#x_line')
    //     .attr('id', 'x_line')
    //     .data(h_line)
    //     .enter()
    //     .append('g')
    //     .append('line')
    //     .attr('x1', d => {
    //         return xScale(d)
    //     })
    //     .attr('y1', (d, i) => {
    //         return yScale(min_y)
    //     })
    //     .attr('x2', d => {
    //         return xScale(d)
    //     })
    //     .attr('y2', (d, i) => {
    //         return yScale(max_y)
    //     })
    //     .attr('fill', 'none')
    //     .attr('stroke', '#0a3c75')
    //     .attr('stroke-width', 0.1)
    //     .attr('stroke-opacity', 0.4)
    //     .attr('stroke-dasharray', 5.5)

    // ssvg.selectAll('#x_line')
    //     .attr('id', 'x_line')
    //     .data(s_line)
    //     .enter()
    //     .append('g')
    //     .append('line')
    //     .attr('x1', d => {
    //         return xScale(min_x)
    //     })
    //     .attr('y1', d => {
    //         return yScale(d)
    //     })
    //     .attr('x2', d => {
    //         return xScale(max_x)
    //     })
    //     .attr('y2', d => {
    //         return yScale(d)
    //     })
    //     .attr('fill', 'none')
    //     .attr('stroke', '#0a3c75')
    //     .attr('stroke-width', 0.1)
    //     .attr('stroke-opacity', 0.4)
    //     .attr('stroke-dasharray', 5.5)


    // var xAxis = d3.svg.axis().scale(xScale).ticks(0).tickFormat(d3.format()).orient("bottom");
    // var yAxis = d3.svg.axis().scale(yScale).ticks(0).tickFormat(d3.format()).orient("left"); //添加一个g用于放x轴

    // ssvg.append("g")
    //     .attr("class", "axis")
    //     .attr("transform", "translate(" + 0 + "," + yScale(0) + ")")
    //     .call(xAxis)
    // ssvg.append("g")
    //     .attr("class", "axis")
    //     .attr("transform", "translate(" + xScale(0) + "," + 0 + ")")
    //     .call(yAxis)


    // var color = ['#00a676', '#f9c80e', '#3abeff', '#df19c1', '#ff206e', '#f08700', '#0091c9']
    var color = ['#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD']
    var a = d3.rgb(255, 0, 0); //红色
    // var b = d3.rgb(0, 255, 0); //绿色
    var b = '#00FF00'

    var compute = d3.interpolate(a, b);

    var linear = d3.scale.linear()
        .domain([-550, 550])
        .range([0, 1]);
    if (p == -1) {
        tcircle = ssvg.append('g').selectAll("circle")
            .data(coor)
            .enter()
            .append("circle")
            .attr("fill", (d, i) => {
                // if (d.l == num)
                // if (coor[i]['val'] <= 0)
                //     return 'red'
                // // return compute(linear(parseFloat(num_coor[i][91])))
                // else
                //     return '#00FF00'
                // else return 'none'
                // console.log(d)

                if (NameValue[d.id] == 2)
                    return "#D8483E";
                else if (NameValue[d.id] == 1) {
                    return "#F3AC2A";
                } else
                    return "#41CA77";
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
            .attr("r", 3)
            .attr('stroke', (d, i) => {
                //if (d.l == num)
                // return 
                return 'red';
                // if (d.val <= 0)
                //     return 'red'
                // // return compute(linear(parseFloat(num_coor[i][91])))
                // else
                //     // return '#00FF00'
                //     return 'green'
                // //else 'none';
                // if (coor[i]['xval'] <= 0)
                //     return 'red'
                // // return compute(linear(parseFloat(num_coor[i][91])))
                // else
                //     return '#00FF00'
                // return 'blue'
            })
            .attr('stroke-width', 0.1)
        // .attr('fill-opacity', 0.3)
        // .on("mouseover", function (d, i) {
        //     // tooltip.html("Code: " + d.id + "</br>" + "Value: " + d.val)
        //     //     .style("left", (d3.event.pageX - 15) + "px")
        //     //     .style("top", (d3.event.pageY + 0) + "px")
        //     //     .style("opacity", 1.0)
        //     // console.log(d)
        //     console.log(d)
        //     d3.select(this)
        //         .attr("fill", d => {
        //             if (d.val > 0)
        //                 return '#00FF00'
        //             else
        //                 return 'red'
        //         })
        //         .attr('fill-opacity', 1)
        // })
        // .on("mouseout", function (d, i) {
        //     // if (k_in_num)
        //     d3.select(this)
        //         .attr("fill", d => {
        //             return 'white';
        //         });
        //     // tooltip.style("opacity", 0.1)
        // });
        var brush = d3.svg.brush()
            .x(xScale)
            .y(yScale)
            .extent([
                [0, 0],
                [0, 0]
            ])
            .on("brush", brushed)

        // console.log(coor)

        var name_brush = {};

        function brushed() {
            var extent = brush.extent();
            var xmin = extent[0][0];
            var xmax = extent[1][0];
            var ymin = extent[0][1];
            var ymax = extent[1][1];

            // console.log(ymin)
            // console.log(ymax)
            // console.log(xmax)
            // console.log(xmin)
            // console.log(coor[0])
            var nnnnn = []
            let identity = []
            for (var i in coor) {
                if (coor[i].x >= xmin && coor[i].x <= xmax && coor[i].y >= ymin && coor[i].y <= ymax) {
                    name_brush[coor[i].id] = 1;
                    nnnnn.push(coor[i].id)
                    identity.push(coor[i]);
                }
            }

            // console.log(nnnnn)
            // console.log(name_brush[nnnnn[0]])

            // if (K == 0) {
            var coor_p = {}

            for (var i in pf) {
                // console.log(pf[i][0])
                if (name_brush[pf[i][0].id] == 1) {
                    coor_p[i] = pf[i];
                }
            }

            // console.log(coor_p)
            // console.log(coor)

            var coor_path = PathCalc(coor_p, -1, -1);
            // console.log()

            // console.log(coor_path[1])

            // var n__ = []
            // for (var i in coor_path[1]) {
            //     n__.push(i)
            // }

            // OrRect(n__, color[flag])

            if (LineName != 0) LineName.remove();

            LinePaint_2(coor_path[0], coor_path[2], color[1])
            // K = 1;
            // }
            if (identity.length != 0)
                d3.csv('data/box.csv', function (d1) {
                    d = []
                    for (let i in d1) {
                        if (parseInt(d1[i].biao) == num)
                            d.push(d1[i])
                    }
                    // PaintTypeZ(d, name_brush);
                })

            // console.log(flag)



        }

        // console.log(flag)
        r = ssvg.append("g")
            .call(brush)
            .selectAll("rect")
            .style("fill-opacity", 0.3)
    } else {
        tcircle = ssvg.append('g').selectAll("circle")
            .data(coor)
            .enter()
            .append("circle")
            .attr("fill", (d, i) => {
                // console.log(d)
                if (d.l == num)
                    // if (coor[i]['val'] <= 0)
                    //     return 'red'
                    // // return compute(linear(parseFloat(num_coor[i][91])))
                    // else
                    //     return '#00FF00'
                    // else return 'none'
                    return 'white'
                else
                    return 'none'
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
            .attr("r", 3)
            .attr('stroke', (d, i) => {
                if (d.l == num)
                    // return 
                    if (d.val <= 0)
                        return 'red'
                // return compute(linear(parseFloat(num_coor[i][91])))
                else
                    // return '#00FF00'
                    return 'green'
                else 'none';
                // if (coor[i]['xval'] <= 0)
                //     return 'red'
                // // return compute(linear(parseFloat(num_coor[i][91])))
                // else
                //     return '#00FF00'
                // return 'blue'
            })
            .attr('stroke-width', 0.1)
            // .attr('fill-opacity', 0.3)
            .on("mouseover", function (d, i) {
                // tooltip.html("Code: " + d.id + "</br>" + "Value: " + d.val)
                //     .style("left", (d3.event.pageX - 15) + "px")
                //     .style("top", (d3.event.pageY + 0) + "px")
                //     .style("opacity", 1.0)
                // console.log(d)
                d3.select(this)
                    .attr("fill", d => {
                        if (d.val > 0)
                            return '#00FF00'
                        else
                            return 'red'
                    })
                    .attr('fill-opacity', 1)

            })
            // .on("mousemove", d => {
            //     // tooltip.style("left", (d3.event.pageX - 15) + "px")
            //     //     .style("top", (d3.event.pageY + 0) + "px")
            // })
            .on("mouseout", function (d, i) {
                d3.select(this)
                    .attr("fill", d => {
                        return 'white';
                    });
                // tooltip.style("opacity", 0.1)
            })
            .on('click', function (d, i) {
                d3.select(this)
                    .attr('r', 5)
                    .attr('fill', d => {
                        if (d.val > 0)
                            return '#00FF00'
                        else
                            return 'red'
                    })
                kname = d.id;
                if (d_num == 0) {
                    if (judge_cir_line == 0)
                        Paintjudge(kname);
                    else
                        PaintCir(kname);
                    PaintSha(number, kname, i);
                    IceLine(kname, num)
                } else {
                    // if (cnt_num < 1) {
                    //     cnt_num++;
                    //     name_in.push(d)
                    //     if (judge_cir_line == 1)
                    //         PaintCir(d)
                    //     else
                    //         Paintjudge(d)
                    // } else {
                    cnt_num++;
                    name_x.push(kname)
                    if (judge_cir_line == 1) {
                        PaintCir_2(name_x)
                    } else {
                        Paintjudge_2(name_x)
                    }
                    // name_in = []
                    // cnt_num = 0
                    // }
                    IceLine_2(name_x, num)
                    PaintSha_2(number, name_x, i);
                }
            });
        var brush = d3.svg.brush()
            .x(xScale)
            .y(yScale)
            .extent([
                [0, 0],
                [0, 0]
            ])
            .on("brush", brushed)

        // console.log(coor)

        var name_brush = {};

        function brushed() {
            var extent = brush.extent();
            var xmin = extent[0][0];
            var xmax = extent[1][0];
            var ymin = extent[0][1];
            var ymax = extent[1][1];

            // console.log(ymin)
            // console.log(ymax)
            // console.log(xmax)
            // console.log(xmin)
            // console.log(coor[0])
            var nnnnn = []
            let identity = []
            for (var i in coor) {
                if (coor[i].l == num && coor[i].x >= xmin && coor[i].x <= xmax && coor[i].y >= ymin && coor[i].y <= ymax) {
                    name_brush[coor[i].id] = 1;
                    nnnnn.push(coor[i].id)
                    identity.push(coor[i]);
                }
            }

            // console.log(nnnnn)
            // console.log(name_brush[nnnnn[0]])

            // if (K == 0) {
            var coor_p = {}

            for (var i in pf) {
                // console.log(pf[i][0])
                if (name_brush[pf[i][0].id] == 1) {
                    coor_p[i] = pf[i];
                }
            }

            // console.log(coor_p)
            // console.log(coor)

            var coor_path = PathCalc(coor_p, -1, -1);
            // console.log()

            // console.log(coor_path[1])

            // var n__ = []
            // for (var i in coor_path[1]) {
            //     n__.push(i)
            // }

            // OrRect(n__, color[flag])

            if (LineName != 0) LineName.remove();

            LinePaint_2(coor_path[0], coor_path[2], color[1])
            // K = 1;
            // }
            if (identity.length != 0)
                d3.csv('data/box.csv', function (d1) {
                    d = []
                    for (let i in d1) {
                        if (parseInt(d1[i].biao) == num)
                            d.push(d1[i])
                    }
                    PaintTypeZ(d, name_brush);
                })

            // console.log(flag)



        }

        // console.log(flag)
        r = ssvg.append("g")
            .call(brush)
            .selectAll("rect")
            .style("fill-opacity", 0.3)
    }


    // console.log(tcircle)

    // coor.length = 0;


}

var scatterlinein = 0;

function scatterline(name) {
    // PP()
    // for (var i in coor) {
    //     coor[i]['val'] = parseFloat(num_coor[i][91])
    // }

    // console.log(coor)
    // console.log(rectdata)
    d3.json('data/ts/alldriving.json', function (coor) {

        if (scatterlinein != 0)
        {
            scatterlinein.remove();
            scatterlinein = 0;
        }
            var tooltip = d3.select("body")
            .append("div")
            .attr("class", "tooltipx")
            .style("opacity", 0.0)

        var NameValue = new Object();


        console.log(NameValue)

        // if (tcircle != 0) tcircle.remove()
        // if (r != 0) r.remove()
        tcircle.attr('opacity', 0.3);


        // DrawHeat(coor)
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

        var xAxisWidth = widtha;
        var yAxisWidth = heighta;
        var xScale = d3.scale.linear()
            .domain([min_x, max_x])
            .range([30, xAxisWidth - 5]);
        var yScale = d3.scale.linear()
            .domain([min_y, max_y])
            .range([yAxisWidth - 30, 5]);

        // var h_line = [-25, 25, -50, 50, min_x, max_x],
        //     s_line = [-25, 25, -50, 50, min_y, max_y]
        // ssvg.selectAll('#x_line')
        //     .attr('id', 'x_line')
        //     .data(h_line)
        //     .enter()
        //     .append('g')
        //     .append('line')
        //     .attr('x1', d => {
        //         return xScale(d)
        //     })
        //     .attr('y1', (d, i) => {
        //         return yScale(min_y)
        //     })
        //     .attr('x2', d => {
        //         return xScale(d)
        //     })
        //     .attr('y2', (d, i) => {
        //         return yScale(max_y)
        //     })
        //     .attr('fill', 'none')
        //     .attr('stroke', '#0a3c75')
        //     .attr('stroke-width', 0.1)
        //     .attr('stroke-opacity', 0.4)
        //     .attr('stroke-dasharray', 5.5)

        // ssvg.selectAll('#x_line')
        //     .attr('id', 'x_line')
        //     .data(s_line)
        //     .enter()
        //     .append('g')
        //     .append('line')
        //     .attr('x1', d => {
        //         return xScale(min_x)
        //     })
        //     .attr('y1', d => {
        //         return yScale(d)
        //     })
        //     .attr('x2', d => {
        //         return xScale(max_x)
        //     })
        //     .attr('y2', d => {
        //         return yScale(d)
        //     })
        //     .attr('fill', 'none')
        //     .attr('stroke', '#0a3c75')
        //     .attr('stroke-width', 0.1)
        //     .attr('stroke-opacity', 0.4)
        //     .attr('stroke-dasharray', 5.5)


        // var xAxis = d3.svg.axis().scale(xScale).ticks(0).tickFormat(d3.format()).orient("bottom");
        // var yAxis = d3.svg.axis().scale(yScale).ticks(0).tickFormat(d3.format()).orient("left"); //添加一个g用于放x轴

        // ssvg.append("g")
        //     .attr("class", "axis")
        //     .attr("transform", "translate(" + 0 + "," + yScale(0) + ")")
        //     .call(xAxis)
        // ssvg.append("g")
        //     .attr("class", "axis")
        //     .attr("transform", "translate(" + xScale(0) + "," + 0 + ")")
        //     .call(yAxis)


        // var color = ['#00a676', '#f9c80e', '#3abeff', '#df19c1', '#ff206e', '#f08700', '#0091c9']
        var color = ['#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD']
        var a = d3.rgb(255, 0, 0); //红色
        // var b = d3.rgb(0, 255, 0); //绿色
        var b = '#00FF00'

        var compute = d3.interpolate(a, b);

        var linear = d3.scale.linear()
            .domain([-550, 550])
            .range([0, 1]);

        linelist = [];

        for (let i in coor) {
            if (coor[i].id == name) {
                linelist.push(coor[i]);
            }
        }

        var lineGen = d3.svg.line()
            .x(function (d) {
                return xScale(d.x);
            })
            .y(function (d) {
                return yScale(d.y);
            });

        console.log(linelist)

        scatterlinein = ssvg.append('path')
            .attr('d', lineGen(linelist))
            // .attr('fill', 'blue');
            .attr('stroke', 'blue')
            .attr('stroke-width', 2)
            .attr('fill', 'none');

    })
}