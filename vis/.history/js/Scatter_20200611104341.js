var widthax = 225;
var heightax = 205;
// var padding = { top: 10, bottom: 10, left: 10, right: 10 }
var K = 0;
var r = 0

var kssvg = 0;

var orret_g = 0

var ScattermyChart;

var name_x = [];

var k_in_num = 0
// var zoom = d3.behavior.zoom().scaleExtent([1, 8]).on("zoom", zoomed);

// function zoomed() {
//     kssvg.attr("transform",
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
    kssvg = d3.select("#Scatter").append("svg")
        .attr('id', 'kSsView')
        .attr("width", widthax)
        .attr("height", heightax)
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

function ScatterPaint_gain_loss(coor, p, num, pf) {
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
    console.log(coor)


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

    var xAxisWidth = widthax;
    var yAxisWidth = heightax;
    var xScale = d3.scale.linear()
        .domain([min_x, max_x])
        .range([10, xAxisWidth - 10]);
    var yScale = d3.scale.linear()
        .domain([min_y, max_y])
        .range([yAxisWidth - 10, 10]);

    // var color = ['#00a676', '#f9c80e', '#3abeff', '#df19c1', '#ff206e', '#f08700', '#0091c9']
    var color = ['#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD']
    var a = d3.rgb(255, 0, 0); //红色
    // var b = d3.rgb(0, 255, 0); //绿色
    var b = '#00FF00'

    var compute = d3.interpolate(a, b);

    // var linear = d3.scale.linear()
    //     .domain([-550, 550])
    //     .range([0, 1]);
    if (p == -1)
        tcircle = kssvg.append('g').selectAll("circle")
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
            // return 'white'
            if (d.label == 0)
                return 'red'
            // return compute(linear(parseFloat(num_coor[i][91])))
            else if (d.label == 2)
                // return '#00FF00'
                return '#00FF00'
            else
                return 'yellow'
        })
        // .attr("fill-opacity", 0.5)
        .attr("id", "circleid")
        .attr("cx", function (d) {
            //console.log(d);
            return xScale(d.x);
        })
        .attr("cy", function (d) {
            // console.log(yScale(d.y))
            return yScale(d.y);
        })
        .attr("r", 3)
        .attr('stroke', (d, i) => {
            //if (d.l == num)
            // return 
            // if (d.label == 0)
            //     return 'red'
            // // return compute(linear(parseFloat(num_coor[i][91])))
            // else if (d.label == 2)
            //     // return '#00FF00'
            //     return '#00FF00'
            // else
            //     return 'yellow'
            return 'white'
            // //else 'none';
            // if (coor[i]['xval'] <= 0)
            //     return 'red'
            // // return compute(linear(parseFloat(num_coor[i][91])))
            // else
            //     return '#00FF00'
            // return 'blue'
        })
        .attr('stroke-width', 0.5)
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
    else {
        tcircle = kssvg.append('g').selectAll("circle")
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
            // .on("mouseover", function (d, i) {
            //     // tooltip.html("Code: " + d.id + "</br>" + "Value: " + d.val)
            //     //     .style("left", (d3.event.pageX - 15) + "px")
            //     //     .style("top", (d3.event.pageY + 0) + "px")
            //     //     .style("opacity", 1.0)
            //     // console.log(d)
            //     d3.select(this)
            //         .attr("fill", d => {
            //             if (d.val > 0)
            //                 return '#00FF00'
            //             else
            //                 return 'red'
            //         })
            //         .attr('fill-opacity', 1)

            // })
            // .on("mousemove", d => {
            //     // tooltip.style("left", (d3.event.pageX - 15) + "px")
            //     //     .style("top", (d3.event.pageY + 0) + "px")
            // })
            // .on("mouseout", function (d, i) {
            //     d3.select(this)
            //         .attr("fill", d => {
            //             return 'white';
            //         });
            //     // tooltip.style("opacity", 0.1)
            // })
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
        r = kssvg.append("g")
            .call(brush)
            .selectAll("rect")
            .style("fill-opacity", 0.3)
    }


    // console.log(tcircle)

    // coor.length = 0;


}
