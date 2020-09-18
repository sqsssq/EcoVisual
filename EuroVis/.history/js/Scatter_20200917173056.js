var widtha = 805;
var heighta = 660;
// var padding = { top: 10, bottom: 10, left: 10, right: 10 }
var K = 0;
var r = 0

var ssvg = 0;

var orret_g = 0

var ScattermyChart;

var name_x = [];

var k_in_num = 0;
let glyphRader = 0;
var kmain = new Array();
// var main = 0;
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

colorscatter = ['#4608CC', '#E80111', '#8E552A', '#DD3C6B', '#30C9AB',
    '#5C0C31', '#92EB3F', '#2B30E5', '#BBF324', '#8AD917', '#044F23',
    '#EA40FD', '#676DA5', '#A97C75', '#CD1285', '#0CE25F', '#66FF65', '#E6660E', '#36DD9B', '#C2B4CD',
    '#E09731', '#453E6A', '#3ACFAB', '#D1DDFD', '#D50D6A', '#EEB457',
    '#AD76DC', '#3B8E4A', '#C99495', '#474BAA', '#ABC33D', '#45D618', '#534CE0',
    '#A8E6F7', '#53EC18', '#FB7C58', '#5B158C', '#A76002', '#88A45C', '#FDAB06',
    '#F05862', '#A4FE88', '#5D2A0F', '#72D33C', '#6C08E3', '#1302C8', '#1B1445',
    '#CAD467', '#DE3FE7', '#8FEFA7', '#522CA3', '#7504C5', '#195AA4', '#3B17AB',
    '#40B85D', '#D8C272', '#2FA5E3', '#69B012', '#F6AE80', '#88F189', '#EB97C7',
    '#1B81BB', '#607382', '#E9EBEF', '#DE8AAA', '#8FFBB9', '#A84054', '#480F29',
    '#F5C202', '#573EAA', '#4A0458', '#D7A9F7', '#D47867', '#EA846F', '#EC34A9',
    '#F9F3FC', '#B9EB69', '#8CDDB1', '#00BFD1', '#C6FD28', '#284CC5', '#745295'
]


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
        .attr("transform", "translate(-10, 10)");
}

var pr = [];

var coort = [];

var tcircle = 0;
var flag = -1;
var heatmapInstance = h337.create({
    container: document.querySelector("#Tsne"),
    radius: 30,
    maxOpacity: 0.8,
    minOpacity: 0.6,
    // blur: .75,
    gradient: {
        '.95': 'red',
        '.75': 'orange',
        '.4': 'blue',
        '.3': 'yellow',
        '.0': '#00FF00',
        //   '.0': "rgba(33,102,172,0)",
        //                         '.0.01':  "#FFA079",
        // '.0.08': "#FF7F50",
        // '.0.15': "#FFBB3E",
        // '.22': "#FFA500",
        // '.29': "#FFD700",
        // '.36': "#e2dc00",
        // '.43': "#ADFF2F",
        // '.5': "#00FF7F",
        // '.57': "#00CED1",
        // '.64': "#00FFFF",
        // '.71': "#1E90FF",
        // '.78': "#0000FF",
        // '.85': "#8A2BE2",
        // '.92': "#7B68EE",
        // '.99': "#EE82EE"
        // '.11': 'rgba(227, 184, 193)',
        // '.25': 'rgba(194, 140, 124)',
        // '.39': 'rgba(217, 169, 130)',
        // '.50': 'rgba(242, 206, 133)',
        // '.65': 'rgba(242, 224, 150)',
        // '.70': 'rgba(242, 238, 162)',
        // '.85': 'rgba(176, 196, 124)',
        // '.99': 'rgba(112, 153, 89)',
        // '.99': 'rgba()',
    }
});

var lay_heat = 0;

PP()

function DrawHeat() {

    // console.log(data)
    // if (heatmapInstance != 0) {
    //     heatmapInstance.remove();
    //     heatmapInstance = 0;
    // }
    d3.json('data/ts/alldriving.json', function (HeatD) {
        // console.log(HeatD)

        if (tcircle != 0) {
            tcircle.remove();
            tcircle = 0;
        }
        // if (main != 0) {
        //     main.remove();
        //     main = 0;
        // }

        if (kmain.length != 0) {
            for (let i in kmain) {
                kmain[i].remove();
            }
            kmain = new Array();
        }

        if (glyphRader != 0) {
            glyphRader.remove();
            glyphRader = 0;
        }

        data = HeatD

        var points = []
        var kmax = 0;
        var padding = {
            top: 5,
            right: 10,
            bottom: 5,
            left: 10
        };
        heatmapInstance = h337.create({
            container: document.querySelector("#Tsne"),
            radius: 10,
            maxOpacity: 0.8,
            minOpacity: 0.6,
            // blur: .75,
            gradient: {
                '.95': 'red',
                '.75': 'orange',
                '.4': 'blue',
                '.3': 'yellow',
                '.0': '#00FF00',
                //   '.0': "rgba(33,102,172,0)",
                //                         '.0.01':  "#FFA079",
                // '.0.08': "#FF7F50",
                // '.0.15': "#FFBB3E",
                // '.22': "#FFA500",
                // '.29': "#FFD700",
                // '.36': "#e2dc00",
                // '.43': "#ADFF2F",
                // '.5': "#00FF7F",
                // '.57': "#00CED1",
                // '.64': "#00FFFF",
                // '.71': "#1E90FF",
                // '.78': "#0000FF",
                // '.85': "#8A2BE2",
                // '.92': "#7B68EE",
                // '.99': "#EE82EE"
                // '.11': 'rgba(227, 184, 193)',
                // '.25': 'rgba(194, 140, 124)',
                // '.39': 'rgba(217, 169, 130)',
                // '.50': 'rgba(242, 206, 133)',
                // '.65': 'rgba(242, 224, 150)',
                // '.70': 'rgba(242, 238, 162)',
                // '.85': 'rgba(176, 196, 124)',
                // '.99': 'rgba(112, 153, 89)',
                // '.99': 'rgba()',
            }
        });


        // var xAxisWidth = widtha - padding.right;
        // var yAxisWidth = heighta - padding.bottom;
        // var xScale = d3.scale.linear()
        //     .domain([d3.min(data, function (d) {
        //         return parseFloat(d.x);
        //     }), d3.max(data, function (d) {
        //         return parseFloat(d.x);
        //     })])
        //     .range([padding.left, xAxisWidth]);
        // var yScale = d3.scale.linear()
        //     .domain([d3.min(data, function (d) {
        //         return parseFloat(d.y);
        //     }), d3.max(data, function (d) {
        //         return parseFloat(d.y);
        //     })])
        //     .range([padding.top, yAxisWidth]);var xAxisWidth = widtha;
        var min_xx = 999999,
            min_yy = 999999,
            max_xx = -999999,
            max_yy = -999999
        for (var i in data) {
            if (min_xx > parseFloat(data[i].x)) min_xx = parseFloat(data[i].x);
            if (min_yy > parseFloat(data[i].y)) min_yy = parseFloat(data[i].y);
            if (max_xx < parseFloat(data[i].x)) max_xx = parseFloat(data[i].x);
            if (max_yy < parseFloat(data[i].y)) max_yy = parseFloat(data[i].y);
        }

        var xAxisWidth = widtha;
        var yAxisWidth = heighta;
        var xScale = d3.scale.linear()
            .domain([min_xx, max_xx])
            .range([50, xAxisWidth - 50]);
        var yScale = d3.scale.linear()
            .domain([min_yy, max_yy])
            .range([50, yAxisWidth - 50]);

        // var kk_data = []
        // for (var i = Math.floor(min_xx + 5) - 10; i <= Math.floor(max_xx - 5) + 10; i += 10) {
        //     for (var j = Math.floor(min_yy + 5) - 10; j <= Math.floor(max_yy - 5) + 10; j += 10) {
        //         var m_val = 0,
        //             m_num = 0;
        //         for (var k in data) {
        //             if (parseFloat(data[k].x) >= i - 5 && parseFloat(data[k].x) < i + 5 && parseFloat(data[k].y) >= j - 5 && parseFloat(data[k].y) < j + 5) {
        //                 m_val += parseFloat(data[k].val)
        //                 m_num++;
        //             }
        //         }
        //         var n_val = 0;
        //         if (m_num != 0) n_val = m_val / m_num;
        //         var rcx = {
        //             x: i,
        //             y: j,
        //             val: n_val
        //         }
        //         // if (m_num != 0)
        //         kk_data.push(rcx);
        //     }
        // }

        // kk_data = [data[1], data[2], data[3]]
        var kmin = 999999
        // console.log(kk_data)
        for (i in data) {
            points.push({
                x: Math.round(xScale(data[i].x), 5),
                y: Math.round(yScale(data[i].y), 5),
                value: 100,
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
        // console.log(points)
        var heat_data = {
            max: Math.floor(kmax),
            // min: Math.floor(-250),
            data: points
        }
        heatmapInstance.setData(heat_data);
        console.log(1);
    })

}
// DrawHeat()

function ScatterPaint_gain_loss() {
    d3.json('data/ts/20200831db.json', function (coor) {
        d3.csv('data/box_calc.csv', function (rectdata) {
            // console.log(rdata);

            if (glyphRader != 0) {
                glyphRader.remove();
                glyphRader = 0;
            }


            if (kmain.length != 0) {
                for (let i in kmain) {
                    kmain[i].remove();
                }
                kmain = new Array();
            }

            // if (main != 0) {
            //     main.remove();
            //     main = 0;
            // }

            heatmapInstance.setData({
                max: 0,
                data: []
            });
            var tooltip = d3.select("body")
                .append("div")
                .attr("class", "tooltipx")
                .style("opacity", 0.0)

            var NameValue = new Object();

            for (var i in rectdata) {
                // console.log(i);
                NameValue[rectdata[i].code + rectdata[i].biao] = parseInt(rectdata[i][12]);
            }

            // console.log(NameValue)

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
                .range([50, xAxisWidth - 50]);

            var yScale = d3.scale.linear()
                .domain([min_y, max_y])
                .range([50, yAxisWidth - 50]);

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
            // if (p == -1) {
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

                    return colorscatter[d.label];

                    if (NameValue[d.id + d.l] == 2)
                        return "#D8483E";
                    else if (NameValue[d.id + d.l] == 1) {
                        return "#F3AC2A";
                    } else
                        return "#41CA77";
                })
                // .attr('fill-opacity', d => {
                //     if (d.label == 24)
                //     return 1;
                //     else 
                //     return 1;
                // })
                // .attr("fill-opacity", 0.5)
                .attr("id", "circleid")
                .attr("cx", function (d) {
                    //console.log(d);
                    return Math.round(xScale(d.x, 5));
                })
                .attr("cy", function (d) {
                    return Math.round(yScale(d.y, 5));
                })
                .attr("r", 4)
                .attr('stroke', (d, i) => {
                    //if (d.l == num)
                    return 'black'

                    // if (NameValue[d.id + d.l] == 2)
                    //     return "#D8483E";
                    // else if (NameValue[d.id + d.l] == 1) {
                    //     return "#F3AC2A";
                    // } else
                    //     return "#41CA77";
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
            // } else {
            //     tcircle = ssvg.append('g').selectAll("circle")
            //         .data(coor)
            //         .enter()
            //         .append("circle")
            //         .attr("fill", (d, i) => {
            //             // console.log(d)
            //             if (d.l == num)
            //                 // if (coor[i]['val'] <= 0)
            //                 //     return 'red'
            //                 // // return compute(linear(parseFloat(num_coor[i][91])))
            //                 // else
            //                 //     return '#00FF00'
            //                 // else return 'none'
            //                 return 'white'
            //             else
            //                 return 'none'
            //         })
            //         // .attr("fill-opacity", 0.5)
            //         .attr("id", "circleid")
            //         .attr("cx", function (d) {
            //             //console.log(d);
            //             return xScale(d.x);
            //         })
            //         .attr("cy", function (d) {
            //             return yScale(d.y);
            //         })
            //         .attr("r", 3)
            //         .attr('stroke', (d, i) => {
            //             if (d.l == num)
            //                 // return 
            //                 if (d.val <= 0)
            //                     return 'red'
            //             // return compute(linear(parseFloat(num_coor[i][91])))
            //             else
            //                 // return '#00FF00'
            //                 return 'green'
            //             else 'none';
            //             // if (coor[i]['xval'] <= 0)
            //             //     return 'red'
            //             // // return compute(linear(parseFloat(num_coor[i][91])))
            //             // else
            //             //     return '#00FF00'
            //             // return 'blue'
            //         })
            //         .attr('stroke-width', 0.1)
            //         // .attr('fill-opacity', 0.3)
            //         .on("mouseover", function (d, i) {
            //             // tooltip.html("Code: " + d.id + "</br>" + "Value: " + d.val)
            //             //     .style("left", (d3.event.pageX - 15) + "px")
            //             //     .style("top", (d3.event.pageY + 0) + "px")
            //             //     .style("opacity", 1.0)
            //             // console.log(d)
            //             d3.select(this)
            //                 .attr("fill", d => {
            //                     if (d.val > 0)
            //                         return '#00FF00'
            //                     else
            //                         return 'red'
            //                 })
            //                 .attr('fill-opacity', 1)

            //         })
            //         // .on("mousemove", d => {
            //         //     // tooltip.style("left", (d3.event.pageX - 15) + "px")
            //         //     //     .style("top", (d3.event.pageY + 0) + "px")
            //         // })
            //         .on("mouseout", function (d, i) {
            //             d3.select(this)
            //                 .attr("fill", d => {
            //                     return 'white';
            //                 });
            //             // tooltip.style("opacity", 0.1)
            //         })
            //         .on('click', function (d, i) {
            //             d3.select(this)
            //                 .attr('r', 5)
            //                 .attr('fill', d => {
            //                     if (d.val > 0)
            //                         return '#00FF00'
            //                     else
            //                         return 'red'
            //                 })
            //             kname = d.id;
            //             if (d_num == 0) {
            //                 if (judge_cir_line == 0)
            //                     Paintjudge(kname);
            //                 else
            //                     PaintCir(kname);
            //                 PaintSha(number, kname, i);
            //                 IceLine(kname, num)
            //             } else {
            //                 // if (cnt_num < 1) {
            //                 //     cnt_num++;
            //                 //     name_in.push(d)
            //                 //     if (judge_cir_line == 1)
            //                 //         PaintCir(d)
            //                 //     else
            //                 //         Paintjudge(d)
            //                 // } else {
            //                 cnt_num++;
            //                 name_x.push(kname)
            //                 if (judge_cir_line == 1) {
            //                     PaintCir_2(name_x)
            //                 } else {
            //                     Paintjudge_2(name_x)
            //                 }
            //                 // name_in = []
            //                 // cnt_num = 0
            //                 // }
            //                 IceLine_2(name_x, num)
            //                 PaintSha_2(number, name_x, i);
            //             }
            //         });
            //     var brush = d3.svg.brush()
            //         .x(xScale)
            //         .y(yScale)
            //         .extent([
            //             [0, 0],
            //             [0, 0]
            //         ])
            //         .on("brush", brushed)

            //     // console.log(coor)

            //     var name_brush = {};

            //     function brushed() {
            //         var extent = brush.extent();
            //         var xmin = extent[0][0];
            //         var xmax = extent[1][0];
            //         var ymin = extent[0][1];
            //         var ymax = extent[1][1];

            //         // console.log(ymin)
            //         // console.log(ymax)
            //         // console.log(xmax)
            //         // console.log(xmin)
            //         // console.log(coor[0])
            //         var nnnnn = []
            //         let identity = []
            //         for (var i in coor) {
            //             if (coor[i].l == num && coor[i].x >= xmin && coor[i].x <= xmax && coor[i].y >= ymin && coor[i].y <= ymax) {
            //                 name_brush[coor[i].id] = 1;
            //                 nnnnn.push(coor[i].id)
            //                 identity.push(coor[i]);
            //             }
            //         }

            //         // console.log(nnnnn)
            //         // console.log(name_brush[nnnnn[0]])

            //         // if (K == 0) {
            //         var coor_p = {}

            //         for (var i in pf) {
            //             // console.log(pf[i][0])
            //             if (name_brush[pf[i][0].id] == 1) {
            //                 coor_p[i] = pf[i];
            //             }
            //         }

            //         // console.log(coor_p)
            //         // console.log(coor)

            //         var coor_path = PathCalc(coor_p, -1, -1);
            //         // console.log()

            //         // console.log(coor_path[1])

            //         // var n__ = []
            //         // for (var i in coor_path[1]) {
            //         //     n__.push(i)
            //         // }

            //         // OrRect(n__, color[flag])

            //         if (LineName != 0) LineName.remove();

            //         LinePaint_2(coor_path[0], coor_path[2], color[1])
            //         // K = 1;
            //         // }
            //         if (identity.length != 0)
            //             d3.csv('data/box.csv', function (d1) {
            //                 d = []
            //                 for (let i in d1) {
            //                     if (parseInt(d1[i].biao) == num)
            //                         d.push(d1[i])
            //                 }
            //                 PaintTypeZ(d, name_brush);
            //             })

            //         // console.log(flag)



            //     }

            //     // console.log(flag)
            //     r = ssvg.append("g")
            //         .call(brush)
            //         .selectAll("rect")
            //         .style("fill-opacity", 0.3)
            // }


            // console.log(tcircle)

            // coor.length = 0;
        })
    })
}
ScatterPaint_gain_loss();
var scatterlinein = 0;

// function scatterline(name) {
//     // PP()
//     // for (var i in coor) {
//     //     coor[i]['val'] = parseFloat(num_coor[i][91])
//     // }

//     // console.log(coor)
//     // console.log(rectdata)
//     d3.json('data/ts/alldriving.json', function (coor) {

//         if (scatterlinein != 0)
//         {
//             scatterlinein.remove();
//             scatterlinein = 0;
//         }
//             var tooltip = d3.select("body")
//             .append("div")
//             .attr("class", "tooltipx")
//             .style("opacity", 0.0)

//         var NameValue = new Object();


//         console.log(NameValue)

//         // if (tcircle != 0) tcircle.remove()
//         // if (r != 0) r.remove()
//         tcircle.attr('opacity', 0.3);


//         // DrawHeat(coor)
//         var padding = {
//             top: 5,
//             right: 10,
//             bottom: 5,
//             left: 10
//         };
//         let max_x = -999999,
//             min_x = 99999,
//             max_y = -99999,
//             min_y = 999999

//         for (var i in coor) {
//             max_x = Math.max(max_x, parseFloat(coor[i].x))
//             max_y = Math.max(max_y, parseFloat(coor[i].y))
//             min_x = Math.min(min_x, parseFloat(coor[i].x))
//             min_y = Math.min(min_y, parseFloat(coor[i].y))
//         }

//         var xAxisWidth = widtha;
//         var yAxisWidth = heighta;
//         var xScale = d3.scale.linear()
//             .domain([min_x, max_x])
//             .range([30, xAxisWidth - 5]);
//         var yScale = d3.scale.linear()
//             .domain([min_y, max_y])
//             .range([yAxisWidth - 30, 5]);

//         // var h_line = [-25, 25, -50, 50, min_x, max_x],
//         //     s_line = [-25, 25, -50, 50, min_y, max_y]
//         // ssvg.selectAll('#x_line')
//         //     .attr('id', 'x_line')
//         //     .data(h_line)
//         //     .enter()
//         //     .append('g')
//         //     .append('line')
//         //     .attr('x1', d => {
//         //         return xScale(d)
//         //     })
//         //     .attr('y1', (d, i) => {
//         //         return yScale(min_y)
//         //     })
//         //     .attr('x2', d => {
//         //         return xScale(d)
//         //     })
//         //     .attr('y2', (d, i) => {
//         //         return yScale(max_y)
//         //     })
//         //     .attr('fill', 'none')
//         //     .attr('stroke', '#0a3c75')
//         //     .attr('stroke-width', 0.1)
//         //     .attr('stroke-opacity', 0.4)
//         //     .attr('stroke-dasharray', 5.5)

//         // ssvg.selectAll('#x_line')
//         //     .attr('id', 'x_line')
//         //     .data(s_line)
//         //     .enter()
//         //     .append('g')
//         //     .append('line')
//         //     .attr('x1', d => {
//         //         return xScale(min_x)
//         //     })
//         //     .attr('y1', d => {
//         //         return yScale(d)
//         //     })
//         //     .attr('x2', d => {
//         //         return xScale(max_x)
//         //     })
//         //     .attr('y2', d => {
//         //         return yScale(d)
//         //     })
//         //     .attr('fill', 'none')
//         //     .attr('stroke', '#0a3c75')
//         //     .attr('stroke-width', 0.1)
//         //     .attr('stroke-opacity', 0.4)
//         //     .attr('stroke-dasharray', 5.5)


//         // var xAxis = d3.svg.axis().scale(xScale).ticks(0).tickFormat(d3.format()).orient("bottom");
//         // var yAxis = d3.svg.axis().scale(yScale).ticks(0).tickFormat(d3.format()).orient("left"); //添加一个g用于放x轴

//         // ssvg.append("g")
//         //     .attr("class", "axis")
//         //     .attr("transform", "translate(" + 0 + "," + yScale(0) + ")")
//         //     .call(xAxis)
//         // ssvg.append("g")
//         //     .attr("class", "axis")
//         //     .attr("transform", "translate(" + xScale(0) + "," + 0 + ")")
//         //     .call(yAxis)


//         // var color = ['#00a676', '#f9c80e', '#3abeff', '#df19c1', '#ff206e', '#f08700', '#0091c9']
//         var color = ['#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD']
//         var a = d3.rgb(255, 0, 0); //红色
//         // var b = d3.rgb(0, 255, 0); //绿色
//         var b = '#00FF00'

//         var compute = d3.interpolate(a, b);

//         var linear = d3.scale.linear()
//             .domain([-550, 550])
//             .range([0, 1]);

//         linelist = [];

//         for (let i in coor) {
//             if (coor[i].id == name) {
//                 linelist.push(coor[i]);
//             }
//         }

//         var lineGen = d3.svg.line()
//             .x(function (d) {
//                 return xScale(d.x);
//             })
//             .y(function (d) {
//                 return yScale(d.y);
//             });

//         console.log(linelist)

//         scatterlinein = ssvg.append('path')
//             .attr('d', lineGen(linelist))
//             // .attr('fill', 'blue');
//             .attr('stroke', 'blue')
//             .attr('stroke-width', 2)
//             .attr('fill', 'none');

//     })
// }

// function DrawForce() {
//     d3.json('data/ts/20200831db.json', function (coor) {
//         d3.csv('data/box_calc.csv', function (rectdata) {
//             let nodes = new Array();
//             for (let i = 0; i <= 23; ++i) {
//                 nodes.push({
//                     name: i
//                 })
//             }

//             let edges = new Array();
//             let ed = new Object();

//             for (let i = 0; i < 24; ++i) {
//                 for (let j = 0; j < 24; ++j) {
//                     if (j >= i) {
//                         ed[i * 100 + j] = {
//                             source: i,
//                             target: j,
//                             relation: "",
//                             value: 0
//                         }
//                         ed[j * 100 + i] = ed[i * 100 + j];
//                     }
//                 }
//             }

//             let nameData = new Object();
//             for (let i in coor) {
//                 if (typeof (nameData[coor[i].id]) == 'undefined') {
//                     nameData[coor[i].id] = new Array();
//                 }
//                 nameData[coor[i].id].push(coor[i]);
//             }

//             for (let i in nameData) {
//                 for (let j = 0; j < 19; ++j) {
//                     ed[nameData[i][j].label * 100 + nameData[i][j + 1].label].value++;
//                 }
//             }

//             let ssss = 0;
//             for (let i = 0; i < 24; ++i) {
//                 for (let j = 0; j < 24; ++j) {
//                     if (j >= i) {
//                         edges.push(ed[i * 100 + j])
//                         ssss += ed[i * 100 + j].value;
//                     }
//                 }
//             }


//         })
//     })
// }

// DrawForce();


function getColor(idx) {
    var palette = [
        '#2ec7c9', '#b6a2de', '#5ab1ef', '#ffb980', '#d87a80',
        '#8d98b3', '#e5cf0d', '#97b552', '#95706d', '#dc69aa',
        '#07a2a4', '#9a7fd1', '#588dd5', '#f5994e', '#c05050',
        '#59678c', '#c9ab00', '#7eb00a', '#6f5553', '#c14089'
    ]
    return palette[idx % palette.length];
}

function Rader(data, x, y, zoom) {
    let main = ssvg.append('g')
        .classed('main', true)
        .attr('transform', "translate(" + x + ',' + (y) + ')');
    // 设定一些方便计算的常量
    var radius = 80 * zoom,
        // 指标的个数，即fieldNames的长度
        total = 7,
        // 需要将网轴分成几级，即网轴上从小到大有多少个正多边形
        level = 4,
        // 网轴的范围，类似坐标轴
        rangeMin = 0,
        rangeMax = 80 * zoom,
        arc = 2 * Math.PI;
    // 每项指标所在的角度
    var onePiece = arc / total;
    // 计算网轴的正多边形的坐标
    var polygons = {
        webs: [],
        webPoints: []
    };
    for (var k = level; k > 0; k--) {
        var webs = '',
            webPoints = [];
        var r = radius / level * k;
        for (var i = 0; i < total; i++) {
            var x = r * Math.sin(i * onePiece),
                y = r * Math.cos(i * onePiece);
            webs += x + ',' + y + ' ';
            webPoints.push({
                x: x,
                y: y
            });
        }
        polygons.webs.push(webs);
        polygons.webPoints.push(webPoints);
    }
    // 绘制网轴
    var webs = main.append('g')
        .classed('webs', true);
    // console.log(polygons.webs)
    webs
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', radius)
        .attr('stroke', 'black')
        .attr('fill-opacity', 0);
    webs
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', radius * 3 / 4)
        .attr('stroke', 'black')
        .attr('fill-opacity', 0);
    webs
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', radius * 2 / 4)
        .attr('stroke', 'black')
        .attr('fill-opacity', 0);
    webs
        .append('circle')
        .attr('cx', 0)
        .attr('cy', 0)
        .attr('r', radius / 4)
        .attr('stroke', 'black')
        .attr('fill-opacity', 0);
    // webs.selectAll('polygon')
    //     .data(polygons.webs)
    //     .enter()
    //     .append('polygon')
    //     .attr('points', function (d) {
    //         return d;
    //     });
    // 添加纵轴
    var lines = main.append('g')
        .classed('lines', true);
    lines.selectAll('line')
        .data(polygons.webPoints[0])
        .enter()
        .append('line')
        .attr('x1', 0)
        .attr('y1', 0)
        .attr('x2', function (d) {
            return d.x;
        })
        .attr('y2', function (d) {
            return d.y;
        });
    // 计算雷达图表的坐标
    var areasData = [];
    var values = data.values;
    for (var i = 0; i < values.length; i++) {
        var value = values[i],
            area = '',
            points = [];
        for (var k = 0; k < total; k++) {
            var r = radius * (value[k] - rangeMin) / (rangeMax - rangeMin);
            var x = r * Math.sin(k * onePiece),
                y = r * Math.cos(k * onePiece);
            area += x + ',' + y + ' ';
            points.push({
                x: x,
                y: y
            })
        }
        areasData.push({
            polygon: area,
            points: points
        });
    }
    // 添加g分组包含所有雷达图区域
    var areas = main.append('g')
        .classed('areas', true);
    // 添加g分组用来包含一个雷达图区域下的多边形以及圆点 
    areas.selectAll('g')
        .data(areasData)
        .enter()
        .append('g')
        .attr('class', function (d, i) {
            return 'area' + (i + 1);
        });
    for (var i = 0; i < areasData.length; i++) {
        // 依次循环每个雷达图区域
        var area = areas.select('.area' + (i + 1)),
            areaData = areasData[i];
        // 绘制雷达图区域下的多边形
        // console.log(areaData)
        area.append('polygon')
            .attr('points', areaData.polygon)
            .attr('stroke', function (d, index) {
                return getColor(i);
            })
            .attr('fill', function (d, index) {
                return getColor(i);
            });
        // 绘制雷达图区域下的点 
        // var circles = area.append('g')
        //     .classed('circles', true);
        // circles.selectAll('circle')
        //     .data(areaData.points)
        //     .enter()
        //     .append('circle')
        //     .attr('cx', function (d) {
        //         return d.x;
        //     })
        //     .attr('cy', function (d) {
        //         return d.y;
        //     })
        //     .attr('r', 2)
        //     .attr('stroke-width', 0.3)
        //     .attr('stroke', function (d, index) {
        //         return getColor(i);
        //     });
    }
    // 计算文字标签坐标
    // var textPoints = [];
    // var textRadius = radius + 20;
    // for (var i = 0; i < total; i++) {
    //     var x = textRadius * Math.sin(i * onePiece),
    //         y = textRadius * Math.cos(i * onePiece);
    //     textPoints.push({
    //         x: x,
    //         y: y
    //     });
    // }
    // // 绘制文字标签
    // var texts = main.append('g')
    //     .classed('texts', true);
    // texts.selectAll('text')
    //     .data(textPoints)
    //     .enter()
    //     .append('text')
    //     .attr('x', function (d) {
    //         return d.x;
    //     })
    //     .attr('y', function (d) {
    //         return d.y;
    //     })
    //     .text(function (d, i) {
    //         return data.fieldNames[i];
    //     });
    return main;
}

function DrawGlyph() {
    d3.json("data/ts/20200831db.json", function (gdata) {
        d3.csv('data/box_calc.csv', function (rectdata) {
            // console.log(gdata);
            if (tcircle != 0) {
                tcircle.remove();
                tcircle = 0;
            }
            if (r != 0) {
                r.remove();
                r = 0;
            }


            if (kmain.length != 0) {
                for (let i in kmain) {
                    kmain[i].remove();
                }
                kmain = new Array();
            }

            heatmapInstance.setData({
                max: 0,
                data: []
            });
            let max_x = -999999,
                min_x = 99999,
                max_y = -99999,
                min_y = 999999

            for (var i in gdata) {
                max_x = Math.max(max_x, parseFloat(gdata[i].x))
                max_y = Math.max(max_y, parseFloat(gdata[i].y))
                min_x = Math.min(min_x, parseFloat(gdata[i].x))
                min_y = Math.min(min_y, parseFloat(gdata[i].y))
            }

            var xAxisWidth = widtha;
            var yAxisWidth = heighta;
            var xScale = d3.scale.linear()
                .domain([min_x, max_x])
                .range([50, xAxisWidth - 50]);
            var yScale = d3.scale.linear()
                .domain([min_y, max_y])
                .range([50, yAxisWidth - 50]);

            let dicpos = new Array();
            for (let i = 0; i <= 24; ++i) {
                dicpos.push({
                    x_sum: 0,
                    y_sum: 0,
                    x_avg: 0,
                    y_avg: 0,
                    cnt: 0,
                    label: 0,
                    deci: [
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0],
                        [0, 0, 0, 0]
                    ]
                })
            }

            for (let i in gdata) {
                dicpos[gdata[i].label].x_sum += gdata[i].x;
                dicpos[gdata[i].label].y_sum += gdata[i].y;
                dicpos[gdata[i].label].cnt++;
                dicpos[gdata[i].label].label = gdata[i].label;
                // console.log(rectdata[i]);
                for (let j = 1; j <= 7; ++j) {
                    dicpos[gdata[i].label].deci[j][parseInt(rectdata[i][j])]++;
                }
            }

            // console.log(dicpos);
            let mainmin = 99999;
            let mainmax = 0;

            for (let i in dicpos) {
                if (mainmax < dicpos[i].cnt) {
                    mainmax = dicpos[i].cnt;
                }
                if (mainmin > dicpos[i].cnt) {
                    mainmin = dicpos[i].cnt;
                }
                dicpos[i].x_avg = dicpos[i].x_sum / dicpos[i].cnt;
                dicpos[i].y_avg = dicpos[i].y_sum / dicpos[i].cnt;
            }
            // console.log(dicpos)

            // glyphRader = ssvg.append('g')
            //     .selectAll('#glyph')
            //     .attr('id', 'glyph')
            //     .data(dicpos)
            //     .enter()
            //     .append('circle')
            //     .attr('cx', d => {
            //         // console.log(d);
            //         return Math.round(xScale(d.x_avg), 5);
            //     })
            //     .attr('cy', d => {
            //         return Math.round(yScale(d.y_avg), 5);
            //     })
            //     .attr('r', 10)
            //     .attr('fill', (d, i) => {
            //         // if (i != 4)
            //         //     return 'none';
            //         return colorscatter[d.label];
            //     })

            var data = {
                fieldNames: ['语文', '数学', '外语', '物理', '化学', '生物', '政治', '历史'],
                values: [
                    [10, 20, 30, 40, 50, 60, 70, 80]
                ]
            };
            let linescale = d3.scale.linear()
                .domain([mainmin, mainmax])
                .range([0.3, 1])
            for (let i in dicpos) {
                // i = 4;

                var v = [];
                for (let j = 1; j <= 7; ++j) {
                    let kmaxk = 0;
                    let kindex = 0;
                    for (let k = 0; k < 4; ++k) {
                        // console.log(dicpos[i].deci[k])
                        if (dicpos[i].deci[j][k] > kmaxk) {
                            kmaxk = dicpos[i].deci[j][k];
                            kindex = k;
                        }
                    }
                    console.log(kindex);
                    v.push((kindex + 1) * 20 * linescale(dicpos[i].cnt));
                }
                // console.log(v);
                var kdata = {
                    fieldNames: ['wealth', 'work', 'health', 'insurance', 'loan', 'investment', 'risk'],
                    values: [v]
                }
                console.log(v);
                kmain.push(Rader(kdata, Math.round(xScale(dicpos[i].x_avg), 5), Math.round(yScale(dicpos[i].y_avg), 5), linescale(dicpos[i].cnt)));
                // console.log(Math.round(xScale(dicpos[i].y_avg), 5));
                // Rader(data, Math.round(xScale(dicpos[i].x_avg), 5), 0);
                // break;
            }
        })

    })
}