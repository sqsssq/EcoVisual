//#region define
var width = 1540,
    height = 480;

var padding = {
    top: 20,
    right: 20,
    bottom: 20,
    left: 20
};

var svg = 0;
var zg = 0;
var cirg = 0;
var Rect_g = 0;
var con_g = 0
var g = 0;
var text_g = 0;
var type_g = 0;

var bei = 1.05
var steplen = 8

var number = 1;

var rectStep = 132;
var rectWidth = 40;
var LineName = 0;
var L = 0;
var K = 0;
var orange_rect = 0;
var firstjudge = -1;
// var color = ["#ed6522", "#ffc857", "#c5283d", "#255f85"]
// var color = ['#f7ab1e', '#2e5077', '#ec7505', '#07b27c']
// var color = ['#ff7473', '#ffc952', '#47b8e0', '#34314c']
// var color = ['#59e6f8', '#00FA9A', '#551A8B', '#00688B']
// var color = ['#037ef3', '#f85a40', '#0a8ea0', '#ffc845']
color = ['#eeeeee', '#00adb5', '#393e46', '#222831']

var title = ['工作', '健康投资', '财产保险', '借贷机会', '投资', '风险投资', '负面冲击', '买彩票', '生病', '失业', '财富分级', '风险偏好']
var title_tip = [
    ['能力弱', '能力中', '能力强'],
    ['投资0', '投资5', '投资10'],
    ['不购买', '购买'],
    ['不借', '借'],
    ['不投资', '投资'],
    ['不投资', '投资'],
    ['无', '小', '中', '大'],
    ['未中奖', '中奖', '买+未中', '买+中'],
    ['无病', '小病', '中病', '大病'],
    ['未失业', '失业'],
    ['财富低', '财富中', '财富高'],
    ['风险偏好0', '风险偏好1', '风险偏好2', '风险偏好3', '风险偏好4', '风险偏好5', '风险偏好6']
]
// var title_tip_symbol = [
//     ['💼', '💼', '💼'],
//     ['🚫', '￥', '￥'],
//     ['🚫', '￥'],
//     ['🚫', '💠'],
//     ['🚫', '💰'],
//     ['🚫', '💰'],
//     ['🚫', '⚡', '⚡', '⚡'],
//     ['🈚', '🈶'],
//     ['🚫', '🚑', '🚑', '🚑'],
//     ['⭕', '❌'],
//     ['🔺', '🔸', '🔻'],
//     ['0', '1', '2', '3', '4', '5', '6']
// ]

var title_tip_symbol = [
    ['弱', '中', '强'],
    ['否', '5', '10'],
    ['否', '是'],
    ['否', '是'],
    ['否', '是'],
    ['否', '是'],
    ['无', '小', '中', '大'],
    ['无', '中'],
    ['健康', '小', '中', '大'],
    ['否', '是'],
    ['低', '中', '高'],
    ['0', '1', '2', '3', '4', '5', '6']
]

var Rect_data = -1;

var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.0)

var People_Data;
//#endregion

function Paint() {
    svg = d3.select("#chart").append("svg")
        .attr("width", width)
        .attr("height", height)
}

// 画连接线
var LinePaint = function (path, dia, color) {
    // console.log(path)
    // LineName = Rect_g.selectAll(".lineW")
    //     .attr("class", "lineW")
    //     .data(path)
    //     .enter()
    //     .append("line")
    //     .attr("x1", (d, i) => {
    //         // console.log(d)
    //         return padding.left + d.x1 * rectStep + 40;
    //     })
    //     .attr("y1", (d, i) => {
    //         // console.log(d)
    //         var tt = 0;
    //         if (d.x1 == 0) tt = 3 * steplen / 2;
    //         if (d.x1 == 2 || d.x1 == 3 || d.x1 == 4 || d.x1 == 5 || d.x1 == 9) tt = steplen
    //         return d.y1 * bei + height - padding.top - 375 + d.n1 * steplen + tt - 10;
    //     })
    //     .attr("x2", (d, i) => {
    //         return padding.left + d.x2 * rectStep;
    //     })
    //     .attr("y2", (d, i) => {
    //         var tt = 0;
    //         if (d.x2 == 0) tt = 3 * steplen / 2;
    //         if (d.x2 == 2 || d.x2 == 3 || d.x2 == 4 || d.x2 == 5 || d.x2 == 9) tt = steplen
    //         return d.y2 * bei + height - padding.top - 375 + d.n2 * steplen + tt - 10;
    //     })
    //     .attr("stroke", color)
    //     .attr("stroke-width", 1)
    //     .attr("stroke-opacity", 0.1);


    var diagonal = d3.svg.diagonal()
        .projection(d => {
            return [d.y, d.x]
        });

    LineName = Rect_g.selectAll('#dia_g')
        .attr('id', 'dia_g')
        .data(dia)
        .enter()
        .append('g')
        .append('path')
        .attr('d', d => {
            // console.log(d)
            return diagonal(d)
        })
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 0.7)
        .attr('stroke-opacity', 0.1)
}

var LinePaint_2 = function (path, dia, color) {
    var diagonal = d3.svg.diagonal()
        .projection(d => {
            return [d.y, d.x]
        });

    LineName = Rect_g.selectAll('#dia_k')
        .attr('id', 'dia_k')
        .data(dia)
        .enter()
        .append('g')
        .append('path')
        .attr('d', d => {
            // console.log(d)
            return diagonal(d)
        })
        .attr('fill', 'none')
        .attr('stroke', color)
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 0.3)
}

var treat = -1;

var PathCalc = function (p, n, x, num) {
    // console.log(p)
    var path = []
    var p_n = {}
    var dia_path = []

    if (n == -1) {
        for (var i in p) {

            p_n[i] = p[i]

            // var num = 1;
            // for (var j = 1; j <= 11; ++j) {
            //     if (p[i][j - 1].x == 9 && p[i][j - 1].n == 1) {
            //         num = 0;
            //     }
            // }
            // var knum = 1;
            // for (var j = 1; j <= 11; ++j) {
            //     if (p[i][j].x == 9 && p[i][j].n == 1) {
            //         knum = 0;
            //     }
            // }

            for (var j = 1; j <= 11; ++j) {

                // if (treat != -1)
                // if (p[i][j].treat != treat) continue;
                a = {}
                a['name'] = i
                a["x1"] = p[i][j - 1].x;
                a["y1"] = p[i][j - 1].y;
                a["n1"] = p[i][j - 1].n;
                a["x2"] = p[i][j].x;
                a["y2"] = p[i][j].y;
                a["n2"] = p[i][j].n;
                path.push(a);

                var tt = steplen;
                var ii = 1;
                if (a['x1'] == 9 && (num == 1 || num == 10)) {
                    ii = 3;
                } else if (a['x1'] == 0 || a['x1'] == 1 || a['x1'] == 10) {
                    tt = 3 * steplen;
                } else if (a['x1'] == 6 || a['x1'] == 8) {
                    tt = 2 * steplen;
                } else if (a['x1'] != 11) {
                    tt = 6 * steplen;
                }
                let x1 = a['y1'] * bei + height - padding.top - 375 + a['n1'] * ii * tt - 10;
                if (a['x1'] == 9 && (num == 1 || num == 10)) {
                    x1 = a['y1'] * bei + height - padding.top - 375 + ii * tt - 10
                }
                // if (a['x1'] == 0) tt = 3 * steplen / 2;
                // if (a['x1'] == 2 || a['x1'] == 3 || a['x1'] == 4 || a['x1'] == 5 || a['x1'] == 9) tt = steplen

                var ttt = steplen;
                var iii = 1;
                if (a['x2'] == 9 && (num == 1 || num == 10)) {
                    iii = 3;
                } else if (a['x2'] == 0 || a['x2'] == 1 || a['x2'] == 10) {
                    ttt = 3 * steplen;
                } else if (a['x2'] == 6 || a['x2'] == 8) {
                    ttt = 2 * steplen;
                } else if (a['x2'] != 11) {
                    ttt = 6 * steplen;
                }

                let x2 = a['y2'] * bei + height - padding.top - 375 + a['n2'] * iii * ttt - 10;
                if (a['x2'] == 9 && (num == 1 || num == 10)) {
                    x2 = a['y2'] * bei + height - padding.top - 375 + iii * ttt - 10
                }
                // if (a['x2'] == 0) ttt = 3 * steplen / 2;
                // if (a['x2'] == 2 || a['x2'] == 3 || a['x2'] == 4 || a['x2'] == 5 || a['x2'] == 9) ttt = steplen

                //return d.y1 * bei + height - padding.top - 375 + d.n1 * steplen + tt - 10;

                b = {
                    source: {
                        x: x1,
                        y: padding.left + a['x1'] * rectStep + 40
                    },
                    target: {
                        x: x2,
                        y: padding.left + a['x2'] * rectStep
                    }
                }
                dia_path.push(b)
            }
        }
    } else {
        for (var i in p) {
            // console.log(p[i][n])
            // if (treat != -1)


            if (p[i][n].n == x) {
                p_n[i] = p[i]


                for (var j = 1; j <= 11; ++j) {

                    // if (treat != -1)
                    // if (p[i][j].treat != treat) continue;
                    a = {}
                    a['name'] = i
                    a["x1"] = p[i][j - 1].x;
                    a["y1"] = p[i][j - 1].y;
                    a["n1"] = p[i][j - 1].n;
                    a["x2"] = p[i][j].x;
                    a["y2"] = p[i][j].y;
                    a["n2"] = p[i][j].n;
                    path.push(a);

                    var tt = steplen;
                    var ii = 1;
                    if (a['x1'] == 9 && (num == 1 || num == 10)) {
                        ii = 3;
                    } else if (a['x1'] == 0 || a['x1'] == 1 || a['x1'] == 10) {
                        tt = 3 * steplen;
                    } else if (a['x1'] == 6 || a['x1'] == 8) {
                        tt = 2 * steplen;
                    } else if (a['x1'] != 11) {
                        tt = 6 * steplen;
                    }
                    let x1 = a['y1'] * bei + height - padding.top - 375 + a['n1'] * ii * tt - 10;
                    if (a['x1'] == 9 && (num == 1 || num == 10)) {
                        x1 = a['y1'] * bei + height - padding.top - 375 + ii * tt - 10
                    }
                    // if (a['x1'] == 0) tt = 3 * steplen / 2;
                    // if (a['x1'] == 2 || a['x1'] == 3 || a['x1'] == 4 || a['x1'] == 5 || a['x1'] == 9) tt = steplen

                    var ttt = steplen;
                    var iii = 1;
                    if (a['x2'] == 9 && (num == 1 || num == 10)) {
                        iii = 3;
                    } else if (a['x2'] == 0 || a['x2'] == 1 || a['x2'] == 10) {
                        ttt = 3 * steplen;
                    } else if (a['x2'] == 6 || a['x2'] == 8) {
                        ttt = 2 * steplen;
                    } else if (a['x2'] != 11) {
                        ttt = 6 * steplen;
                    }

                    let x2 = a['y2'] * bei + height - padding.top - 375 + a['n2'] * iii * ttt - 10;
                    if (a['x2'] == 9 && (num == 1 || num == 10)) {
                        x2 = a['y2'] * bei + height - padding.top - 375 + iii * ttt - 10
                    }
                    // if (a['x2'] == 0) ttt = 3 * steplen / 2;
                    // if (a['x2'] == 2 || a['x2'] == 3 || a['x2'] == 4 || a['x2'] == 5 || a['x2'] == 9) ttt = steplen

                    //return d.y1 * bei + height - padding.top - 375 + d.n1 * steplen + tt - 10;

                    b = {
                        source: {
                            x: x1,
                            y: padding.left + a['x1'] * rectStep + 40
                        },
                        target: {
                            x: x2,
                            y: padding.left + a['x2'] * rectStep
                        }
                    }
                    dia_path.push(b)
                }
            }
        }
    }
    // console.log(path)
    // Rect_data = p_n;
    return [path, p_n, dia_path]
}

function RectMove(data, d, num) {
    // console.log(data);

    if (LineName != 0) {
        LineName.remove();
        L = 1;
    }

    var tt = steplen;
    // if (d.x == 0) tt = 3 * steplen / 2;
    // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
    // if (d.symbol == '🈚' && d.n != 0) tt += 10
    if (d.x == 9 && (num == 1 || num == 10));
    else if (d.x == 0 || d.x == 1 || d.x == 10) {
        tt = 3 * steplen;
    } else if (d.x == 6 || d.x == 8) {
        tt = 2 * steplen;
    } else if (d.x != 11) {
        tt = 6 * steplen;
    }
    // return height - padding.top - 375 + d.start * bei + d.n * tt;
    // if (d.x == 0) tt = 3 * steplen / 2;
    // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
    if (d.x == 9 && (num == 1 || num == 10))
        orange_rect = Rect_g.append("rect")
        .attr("x", padding.left + d.x * rectStep)
        .attr("y", height - padding.top - 375 + d.start * bei + 3 * tt - 10)
        .attr("width", rectWidth)
        .attr("height", (d.end - d.start) * bei)
        .attr('fill', 'none')
        .attr("fill-opacity", 0.0)
        .attr("stroke", "orange")
        .attr("stroke-width", 3)
    else

        orange_rect = Rect_g.append("rect")
        .attr("x", padding.left + d.x * rectStep)
        .attr("y", height - padding.top - 375 + d.start * bei + d.n * tt - 10)
        .attr("width", rectWidth)
        .attr("height", (d.end - d.start) * bei)
        .attr('fill', 'none')
        .attr("fill-opacity", 0.0)
        .attr("stroke", "orange")
        .attr("stroke-width", 3)
    // console.log(d)
    var p_data = PathCalc(data, d.x, d.n, num);
    console.log(d)

    LinePaint_2(p_data[0], p_data[2], "tomato");
    Rect_data = p_data[1]

    n_data = []
    // console.log(p_data[1].keys())
    for (var i in p_data[1]) {
        n_data.push(i)
    }

    OrRect(n_data, 'tomato')

    name_in = new Array();
    for (let i in Rect_data) {
        // console.log(i);
        if (Rect_data[i][d.n].n == d.x) {
            name_in.push(i);
        }
    }
    // console.log(name_in);

    // PaintDecisionLine(DecisionList, name_in);

    // PaintDecisionRect(DecisionList, name_in);

}

function RectOut(num) {
    if (LineName != 0) {
        // LineName.remove()
        Rect_g.remove()
    }
    if (orange_rect != 0) {
        orange_rect.remove();
        orange_rect = 0;
    }

    if (orret_g != 0) {
        orret_g.remove()
        orret_g = 0
    }
    // Paint()
    if (d_num != 0) {
        d_num = 0;
    }

    if (k != 0) {
        k.remove()
        k = 0
    }

    // if (r_s_g != 0) {
    //     r_s_g.remove()
    //     r_s_g = 0;
    // }
    // if (line_g != 0) {
    //     line_g.remove();
    //     line_g = 0;
    // }
    name_in = []
    // judge_cir_line = 0
    judge_cir_line = 0
    PaintLine(0)
    console.log(num)
    PaintRect(num)
    L = 0;
}

// function PaintZhe(d1) {
//     zg = svg.append("g")
//         .attr("class", "zhe")
//         .attr("transform", "translate(" + 0 + "," + -18 + ")")

//     // 折线图
//     var zsum = [],
//         z = [],
//         k = [];

//     for (var i = 0; i <= 20; ++i) {
//         zsum.push(0);
//         z.push(0);
//         k.push(0);
//     }

//     for (var i in d1) {
//         // console.log(d1[i])
//         var nbiao = parseInt(d1[i].biao)
//         zsum[nbiao - 1] += parseFloat(d1[i].work);
//         if (parseFloat(d1[i].work) > 0) z[nbiao - 1] += parseFloat(d1[i].work);
//         else k[nbiao - 1] += parseFloat(d1[i].work);

//         if (nbiao == 20) {
//             zsum[nbiao] += parseFloat(d1[i]['91']);
//             if (parseFloat(d1[i]['91']) > 0) z[nbiao] += parseFloat(d1[i].work);
//             else k[nbiao] += parseFloat(d1[i]['91']);
//         }
//     }

//     var zmax = -1,
//         zmin = 999999;

//     for (var i in zsum) {
//         if (zsum[i] > zmax) zmax = zsum[i]
//         if (zsum[i] < zmin) zmin = zsum[i]
//     }

//     var azsum = [],
//         azz = [],
//         azf = [],
//         az = [],
//         ak = [];

//     for (var i = 1; i <= 20; ++i) {
//         azsum.push([i, zsum[i]])
//         if (zsum[i] >= 0) azz.push([i, zsum[i]])
//         else azf.push([i, zsum[i]])
//         az.push([i, z[i]])
//         ak.push([i, k[i]])
//     }

//     // console.log(azsum)

//     var Xscale = d3.scale.linear()
//         .domain([1, 20])
//         .range([50, 1300])
//     var Yscale = d3.scale.linear()
//         .domain([zmin, zmax])
//         .range([height - 410 - 10, height - 410 - 46]);

//     var LinePath = d3.svg.line()
//         .x(d => {
//             // console.log(d)
//             return Xscale(d[0]);
//         })
//         .y(d => {
//             return Yscale(d[1]);
//         })
//         .interpolate("cardinal") //插值模式

//     var asum = []
//     // asum.push(azz); asum.push(azf);
//     asum.push(azsum)


//     zg.selectAll("#bp")
//         .attr('id', 'bp')
//         .data(asum)
//         .enter()
//         .append("path")
//         .attr("d", LinePath(azsum))
//         .attr("fill", "none")
//         .attr("stroke-width", 1)
//         .attr("stroke", 'red')

//     var xAxis = d3.svg.axis().scale(Xscale).ticks(20).tickFormat(d3.format("d")).orient("bottom");
//     var yAxis = d3.svg.axis().scale(Yscale).ticks(0).tickFormat(d3.format("d")).orient("left"); //添加一个g用于放x轴
//     zg.append("g")
//         .attr("class", "axis")
//         .attr("transform", "translate(" + 0 + "," + (Yscale(0)) + ")")
//         .attr("stroke-width", 0.1)
//         .call(xAxis)
//         .append('text')
//         .text('轮数')
//         // .attr("transform", "rotate(-90)") //text旋转-90°
//         .attr("text-anchor", "end") //字体尾部对齐
//         .attr("dx", "121em")
//         .attr("dy", "0.5em") //沿y轴平移一个字体的大小
//     zg.append("g")
//         .attr("class", "axis")
//         .attr("transform", "translate(" + 50 + "," + 0 + ")")
//         .call(yAxis)
//         .append('text')
//         .text('总收益')
//         .attr("transform", "rotate(-90)") //text旋转-90°
//         .attr("text-anchor", "end") //字体尾部对齐
//         .attr("dx", "-2em")
//         .attr("dy", "-1em") //沿y轴平移一个字体的大小;



//     var area_generator = d3.svg.area()
//         // d表示传进来的数据 i表示数据的下标
//         .x(function (d, i) {
//             return Xscale(d[0]);
//         })
//         .y0(Yscale(0))
//         .y1(function (d) {
//             return Yscale(d[1]);
//         })
//         // 去除线的棱角 使其顺滑
//         .interpolate("cardinal")

//     zg
//         .append("path")
//         // d 是 path data的缩写 将data数据传人
//         .attr("d", area_generator(azsum)) // d = "M1,0L20,40L40,50L100,100L0,200"
//         // 填充颜色
//         .style("fill", "red")
//         .attr('fill-opacity', 0.3)

// }

function PaintZhe(d1) {
    zg = svg.append("g")
        .attr("class", "zhe")
        .attr("transform", "translate(" + 0 + "," + -18 + ")")

    d3.json('data/boxplot.json', function (dx) {
        // console.log(dx)

        // console.log(d1)
        var num_sum = []

        for (var i = 0; i < 21; ++i) {
            num_sum.push([]);
        }

        for (var i in d1) {
            if (d1[i]['91'] < 600)
                num_sum[d1[i].biao].push(d1[i]);
        }

        // console.log(num_sum);


        var line_num_sum = []
        var line_max = -100
        var line_min = 10000

        for (var i = 1; i <= 20; ++i) {
            var num_s = 0;
            for (var k = 0; k < num_sum[i].length; ++k) {
                for (var j = 0; j < num_sum[i].length; ++j) {
                    num_s += Math.abs(num_sum[i][k]['91'] - num_sum[i][j]['91'])
                }
            }
            // console.log(num_s)
            if (line_max < num_s * 1.0 / (num_sum[i].length * num_sum[i].length))
                line_max = num_s * 1.0 / (num_sum[i].length * num_sum[i].length)
            if (line_min > num_s * 1.0 / (num_sum[i].length * num_sum[i].length))
                line_min = num_s * 1.0 / (num_sum[i].length * num_sum[i].length)
            line_num_sum.push([i, num_s * 1.0 / (num_sum[i].length * num_sum[i].length)])
        }

        // console.log(line_num_sum)

        var line_ = []
        var l__ = []

        for (var i = 1; i <= 20; ++i) {
            // console.log(dx[i])
            line_.push([i, parseFloat(dx[i]['top'])])
            line_.push([i, parseFloat(dx[i]['low'])])
            line_.push([i, parseFloat(dx[i]['mid'])])
            line_.push([i, parseFloat(dx[i]['h4'])])
            line_.push([i, parseFloat(dx[i]['l4'])])
            l__.push({
                "x1": i,
                "y1": parseFloat(dx[i]['top']),
                "x2": i,
                "y2": parseFloat(dx[i]['h4'])
            })
            l__.push({
                "x1": i,
                "y1": parseFloat(dx[i]['l4']),
                "x2": i,
                "y2": parseFloat(dx[i]['low'])
            })

            l__.push({
                "x1": i - 0.1,
                "y1": parseFloat(dx[i]['h4']),
                "x2": i - 0.1,
                "y2": parseFloat(dx[i]['l4'])
            })
            l__.push({
                "x1": i + 0.1,
                "y1": parseFloat(dx[i]['h4']),
                "x2": i + 0.1,
                "y2": parseFloat(dx[i]['l4'])
            })
        }

        // console.log(line_)


        // console.log(azsum)

        var zmin = -600,
            zmax = 600

        var Xscale = d3.scale.linear()
            .domain([0, 21])
            .range([50, 1500])
        var Yscale = d3.scale.linear()
            .domain([zmin, zmax])
            .range([height - 410 - 10, height - 410 - 46]);
        var Y2scale = d3.scale.linear()
            .domain([line_min, line_max])
            .range([height - 410 - 10, height - 410 - 46])


        var xAxis = d3.svg.axis().scale(Xscale).ticks(20).tickFormat(d3.format("d")).orient("bottom");
        var yAxis = d3.svg.axis().scale(Yscale).ticks(2).tickFormat(d3.format("d")).orient("left"); //添加一个g用于放x轴
        var y2Axis = d3.svg.axis().scale(Y2scale).ticks(0).tickFormat(d3.format("d")).orient("right");
        zg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + 0 + "," + (Yscale(0)) + ")")
            .attr("stroke-width", 0.1)
            // .attr('stroke', '#00FF00')
            .call(xAxis)
            .append('text')
        // .text('轮数')
        // .attr("transform", "rotate(-90)") //text旋转-90°
        // .attr("text-anchor", "end") //字体尾部对齐
        // .attr("dx", "121em")
        // .attr("dy", "0.5em") //沿y轴平移一个字体的大小
        zg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + 50 + "," + 0 + ")")
            .call(yAxis)
            .append('text')
            .text('收益')
            .attr("transform", "rotate(-90)") //text旋转-90°
            .attr("text-anchor", "end") //字体尾部对齐
            .attr("dx", "-2em")
            .attr("dy", "1em") //沿y轴平移一个字体的大小;
        zg.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + 1500 + "," + 0 + ")")
            .call(y2Axis)
            .append('text')
            .text('基尼')
            .attr("transform", "rotate(-90)") //text旋转-90°
            .attr("text-anchor", "end") //字体尾部对齐
            .attr("dx", "-2em")
            .attr("dy", "-1em") //沿y轴平移一个字体的大小;

        var L_path = d3.svg.line()
            .x(d => {
                return Xscale(d[0])
            })
            .y(d => {
                return Y2scale(d[1])
            })

        zg.selectAll('#lp')
            .attr('id', 'lp')
            .data(line_num_sum)
            .enter()
            .append('path')
            .attr('d', L_path(line_num_sum))
            .attr("fill", 'none')
            .attr('stroke-width', 0.1)
            .attr('stroke', 'red')
            .attr("stroke-dasharray", function (d, i) {
                // if(i==0){
                return "5.5";

            });

        zg.selectAll("#rl")
            .attr("id", "rl")
            .data(line_)
            .enter()
            .append("line")
            .attr("x1", (d, i) => {
                return Xscale(d[0] - 0.1)
            })
            .attr("y1", d => {
                return Yscale(d[1])
            })
            .attr("x2", (d, i) => {
                return Xscale(d[0] + 0.1)
            })
            .attr("y2", d => {
                return Yscale(d[1])
            })
            .attr("stroke", d => {
                return "blue";
            })
            .attr("stroke-width", 0.5);

        zg.selectAll("#rl")
            .attr("id", "rl")
            .data(l__)
            .enter()
            .append("line")
            .attr("x1", (d, i) => {
                return Xscale(d.x1)
            })
            .attr("y1", d => {
                return Yscale(d.y1)
            })
            .attr("x2", (d, i) => {
                return Xscale(d.x2)
            })
            .attr("y2", d => {
                return Yscale(d.y2)
            })
            .attr("stroke", d => {
                return "blue";
            })
            .attr("stroke-width", 0.5);
    })
}

function PaintTypeZ(d, num = -1) {
    if (type_g != 0) type_g.remove();
    type_g = svg.append("g")
        .attr("class", "zhe")
        .attr("transform", "translate(" + 20 + "," + 400 + ")")

    // 折线图
    var zsum = [],
        z = [],
        k = [],
        num_sum = [];

    var kd = d;

    if (num != -1) {
        peo_name = num
        d = []
        for (let i in kd) {
            if (peo_name[kd[i].code] == 1)
                d.push(kd[i])
        }
    }

    // console.log(d);

    for (var i = 0; i <= 10; ++i) {
        zsum.push(0);
        z.push(0);
        k.push(0);
        num_sum.push([])
    }

    for (var i in d) {
        if (parseFloat(d[i]['work']) < 600)
            num_sum[1].push(parseFloat(d[i]['work']))
        if (parseFloat(d[i]['11']) < 600)
            num_sum[2].push(parseFloat(d[i]['11']))
        if (parseFloat(d[i]['21']) < 600)
            num_sum[3].push(parseFloat(d[i]['21']))
        if (parseFloat(d[i]['31']) < 600)
            num_sum[4].push(parseFloat(d[i]['31']))
        if (parseFloat(d[i]['41']) < 600)
            num_sum[5].push(parseFloat(d[i]['41']))
        if (parseFloat(d[i]['51']) < 600)
            num_sum[6].push(parseFloat(d[i]['51']))
        if (parseFloat(d[i]['61']) < 600)
            num_sum[7].push(parseFloat(d[i]['61']))
        if (parseFloat(d[i]['71']) < 600)
            num_sum[8].push(parseFloat(d[i]['71']))
        if (parseFloat(d[i]['81']) < 600)
            num_sum[9].push(parseFloat(d[i]['81']))
        if (parseFloat(d[i]['91']) < 600)
            num_sum[10].push(parseFloat(d[i]['91']))
    }

    var zmax = -1,
        zmin = 999999;

    for (var i = 1; i <= 10; ++i) {
        for (var j in num_sum[i]) {
            if (zmax < num_sum[i][j])
                zmax = num_sum[i][j]
            if (zmin > num_sum[i][j])
                zmin = num_sum[i][j]
        }
    }

    // console.log(num_sum);


    var line_num_sum = []
    var line_max = -100
    var line_min = 10000

    for (var i = 1; i <= 10; ++i) {
        var num_s = 0;
        num_sum[i].sort(function (a, b) {
            return a - b
        })

        // console.log(num_sum[i]);

        for (var k = 0; k < num_sum[i].length; ++k) {
            for (var j = 0; j < num_sum[i].length; ++j) {
                num_s += Math.abs(num_sum[i][k] - num_sum[i][j])
            }
        }
        // console.log(num_s)
        if (line_max < num_s * 1.0 / (num_sum[i].length * num_sum[i].length))
            line_max = num_s * 1.0 / (num_sum[i].length * num_sum[i].length)
        if (line_min > num_s * 1.0 / (num_sum[i].length * num_sum[i].length))
            line_min = num_s * 1.0 / (num_sum[i].length * num_sum[i].length)
        line_num_sum.push([i, num_s * 1.0 / (num_sum[i].length * num_sum[i].length)])
    }

    // console.log(line_num_sum)

    var line_ = []
    var l__ = []

    for (var i = 1; i <= 10; ++i) {
        // console.log(num_sum[i])
        line_.push([i, parseFloat(num_sum[i][num_sum[i].length - 1])])
        line_.push([i, parseFloat(num_sum[i][0])])
        line_.push([i, parseFloat(num_sum[i][parseInt(num_sum[i].length * 2 / 4) - 1])])
        line_.push([i, parseFloat(num_sum[i][parseInt(num_sum[i].length * 3 / 4) - 1])])
        line_.push([i, parseFloat(num_sum[i][parseInt(num_sum[i].length * 1 / 4) - 1])])
        l__.push({
            "x1": i,
            "y1": parseFloat(num_sum[i][num_sum[i].length - 1]),
            "x2": i,
            "y2": parseFloat(num_sum[i][parseInt(num_sum[i].length * 3 / 4) - 1])
        })
        l__.push({
            "x1": i,
            "y1": parseFloat(num_sum[i][parseInt(num_sum[i].length * 1 / 4) - 1]),
            "x2": i,
            "y2": parseFloat(num_sum[i][0])
        })

        l__.push({
            "x1": i - 0.05,
            "y1": parseFloat(num_sum[i][parseInt(num_sum[i].length * 3 / 4) - 1]),
            "x2": i - 0.05,
            "y2": parseFloat(num_sum[i][parseInt(num_sum[i].length * 1 / 4) - 1])
        })
        l__.push({
            "x1": i + 0.05,
            "y1": parseFloat(num_sum[i][parseInt(num_sum[i].length * 3 / 4) - 1]),
            "x2": i + 0.05,
            "y2": parseFloat(num_sum[i][parseInt(num_sum[i].length * 1 / 4) - 1])
        })
    }


    var emax, emin;

    if (Math.abs(zmax) > Math.abs(zmin)) emax = Math.abs(zmax)
    else emax = Math.abs(zmin)

    var Xscale = d3.scale.linear()
        .domain([1, 10])
        .range([20, 1205])
    var Yscale = d3.scale.linear()
        // .domain([zmin, zmax])
        .domain([-emax, emax])
        .range([height - 410 - 10, height - 410 - 46]);
    var Y2scale = d3.scale.linear()
        // .domain([zmin, zmax])
        .domain([line_min, line_max])
        .range([height - 410 - 10, height - 410 - 46]);

    // console.log(emax)


    var xAxis = d3.svg.axis().scale(Xscale).ticks(0).tickFormat(d3.format("d")).orient("bottom");
    var yAxis = d3.svg.axis().scale(Yscale).ticks(0).tickFormat(d3.format("d")).orient("left"); //添加一个g用于放x轴
    var y2Axis = d3.svg.axis().scale(Y2scale).ticks(0).tickFormat(d3.format("d")).orient("right"); //添加一个g用于放x轴

    type_g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 0 + "," + (Yscale(0)) + ")")
        .attr("stroke-width", 0.1)
        .call(xAxis)
        .append('text')
    // .text('过程')
    // // .attr("transform", "rotate(-90)") //text旋转-90°
    // .attr("text-anchor", "end") //字体尾部对齐
    // .attr("dx", "120.2em")
    // .attr("dy", "0.5em") //沿y轴平移一个字体的大小
    type_g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 20 + "," + 0 + ")")
        .call(yAxis)
        .append('text')
        .text('总收益')
        .attr("transform", "rotate(-90)") //text旋转-90°
        .attr("text-anchor", "end") //字体尾部对齐
        .attr("dx", "-2em")
        .attr("dy", "-1em") //沿y轴平移一个字体的大小;
    type_g.append("g")
        .attr("class", "axis")
        .attr("transform", "translate(" + 1205 + "," + 0 + ")")
        .call(y2Axis)
        .append('text')
        .text('基尼')
        .attr("transform", "rotate(-90)") //text旋转-90°
        .attr("text-anchor", "end") //字体尾部对齐
        .attr("dx", "-2em")
        .attr("dy", "-1em") //沿y轴平移一个字体的大小;

    var L_path = d3.svg.line()
        .x(d => {
            return Xscale(d[0])
        })
        .y(d => {
            return Y2scale(d[1])
        })

    type_g.selectAll('#lp')
        .attr('id', 'lp')
        .data(line_num_sum)
        .enter()
        .append('path')
        .attr('d', L_path(line_num_sum))
        .attr("fill", 'none')
        .attr('stroke-width', 0.1)
        .attr('stroke', 'red')
        .attr("stroke-dasharray", function (d, i) {
            // if(i==0){
            return "5,5";

        });


    type_g.selectAll("#rl")
        .attr("id", "rl")
        .data(line_)
        .enter()
        .append("line")
        .attr("x1", (d, i) => {
            return Xscale(d[0] - 0.05)
        })
        .attr("y1", d => {
            return Yscale(d[1])
        })
        .attr("x2", (d, i) => {
            return Xscale(d[0] + 0.05)
        })
        .attr("y2", d => {
            return Yscale(d[1])
        })
        .attr("stroke", d => {
            return "blue";
        })
        .attr("stroke-width", 0.5);

    type_g.selectAll("#rl")
        .attr("id", "rl")
        .data(l__)
        .enter()
        .append("line")
        .attr("x1", (d, i) => {
            return Xscale(d.x1)
        })
        .attr("y1", d => {
            return Yscale(d.y1)
        })
        .attr("x2", (d, i) => {
            return Xscale(d.x2)
        })
        .attr("y2", d => {
            return Yscale(d.y2)
        })
        .attr("stroke", d => {
            return "blue";
        })
        .attr("stroke-width", 0.5);



}

// function PaintTypeZ(d) {
//     if (type_g != 0) type_g.remove();
//     type_g = svg.append("g")
//         .attr("class", "zhe")
//         .attr("transform", "translate(" + 20 + "," + 400 + ")")

//     // 折线图
//     var zsum = [],
//         z = [],
//         k = [],
//         num_sum = [];

//     for (var i = 0; i <= 10; ++i) {
//         zsum.push(0);
//         z.push(0);
//         k.push(0);
//     }

//     for (var i in d) {
//         // console.log(d[i])
//         zsum[1] += parseFloat(d[i]['work'])
//         zsum[2] += parseFloat(d[i]['11'])
//         zsum[3] += parseFloat(d[i]['21'])
//         zsum[4] += parseFloat(d[i]['31'])
//         zsum[5] += parseFloat(d[i]['41'])
//         zsum[6] += parseFloat(d[i]['51'])
//         zsum[7] += parseFloat(d[i]['61'])
//         zsum[8] += parseFloat(d[i]['71'])
//         zsum[9] += parseFloat(d[i]['81'])
//         zsum[10] += parseFloat(d[i]['91'])

//         if (parseFloat(d[i]['work'] < 600))
//         num_sum[1].push(parseFloat(d[i]['work']))
//         if (parseFloat(d[i]['11'] < 600))
//         num_sum[2].push(parseFloat(d[i]['11']))
//         if (parseFloat(d[i]['21'] < 600))
//         num_sum[3].push(parseFloat(d[i]['21']))
//         if (parseFloat(d[i]['31'] < 600))
//         num_sum[4].push(parseFloat(d[i]['31']))
//         if (parseFloat(d[i]['41'] < 600))
//         num_sum[5].push(parseFloat(d[i]['41']))
//         if (parseFloat(d[i]['51'] < 600))
//         num_sum[6].push(parseFloat(d[i]['51']))
//         if (parseFloat(d[i]['61'] < 600))
//         num_sum[7].push(parseFloat(d[i]['61']))
//         if (parseFloat(d[i]['71'] < 600))
//         num_sum[8].push(parseFloat(d[i]['71']))
//         if (parseFloat(d[i]['81'] < 600))
//         num_sum[9].push(parseFloat(d[i]['81']))
//         if (parseFloat(d[i]['91'] < 600))
//         num_sum[10].push(parseFloat(d[i]['91']))
//     }

//     var zmax = -1,
//         zmin = 999999;

//     for (var i in zsum) {
//         if (parseFloat(zsum[i]) > zmax) zmax = parseFloat(zsum[i])
//         if (parseFloat(zsum[i]) < zmin) zmin = parseFloat(zsum[i])
//     }

//     var azsum = [],
//         azz = [],
//         azf = [],
//         az = [],
//         ak = [];

//     for (var i = 1; i <= 10; ++i) {
//         azsum.push([i, zsum[i]])
//         if (zsum[i] >= 0) azz.push([i, zsum[i]])
//         else azf.push([i, zsum[i]])
//         az.push([i, z[i]])
//         ak.push([i, k[i]])
//     }

//     // console.log(azsum)

//     var emax, emin;

//     if (Math.abs(zmax) > Math.abs(zmin)) emax = Math.abs(zmax)
//     else emax = Math.abs(zmin)

//     var Xscale = d3.scale.linear()
//         .domain([1, 10])
//         .range([20, 1300])
//     var Yscale = d3.scale.linear()
//         // .domain([zmin, zmax])
//         .domain([-emax, emax])
//         .range([height - 410 - 10, height - 410 - 46]);

//     var LinePath = d3.svg.line()
//         .x(d => {
//             // console.log(d)
//             return Xscale(d[0]);
//         })
//         .y(d => {
//             return Yscale(d[1]);
//         })
//         .interpolate("cardinal") //插值模式

//     var asum = []
//     // asum.push(azz); asum.push(azf);
//     asum.push(azsum)

//     type_g.selectAll("#dp")
//         .attr('id', 'dp')
//         .data(asum)
//         .enter()
//         .append("path")
//         .attr("d", LinePath(azsum))
//         .attr("fill", "none")
//         .attr("stroke-width", 1)
//         .attr("stroke", 'red')

//     var xAxis = d3.svg.axis().scale(Xscale).ticks(10).tickFormat(d3.format("d")).orient("bottom");
//     var yAxis = d3.svg.axis().scale(Yscale).ticks(0).tickFormat(d3.format("d")).orient("left"); //添加一个g用于放x轴
//     type_g.append("g")
//         .attr("class", "axis")
//         .attr("transform", "translate(" + 0 + "," + (Yscale(0)) + ")")
//         .attr("stroke-width", 0.1)
//         .call(xAxis)
//         .append('text')
//         .text('过程')
//         // .attr("transform", "rotate(-90)") //text旋转-90°
//         .attr("text-anchor", "end") //字体尾部对齐
//         .attr("dx", "120.2em")
//         .attr("dy", "0.5em") //沿y轴平移一个字体的大小
//     type_g.append("g")
//         .attr("class", "axis")
//         .attr("transform", "translate(" + 20 + "," + 0 + ")")
//         .call(yAxis)
//         .append('text')
//         .text('总收益')
//         .attr("transform", "rotate(-90)") //text旋转-90°
//         .attr("text-anchor", "end") //字体尾部对齐
//         .attr("dx", "-2em")
//         .attr("dy", "-1em") //沿y轴平移一个字体的大小;

//     var area_generator = d3.svg.area()
//         // d表示传进来的数据 i表示数据的下标
//         .x(function (d, i) {
//             return Xscale(d[0]);
//         })
//         .y0(Yscale(0))
//         .y1(function (d) {
//             return Yscale(d[1]);
//         })
//         // 去除线的棱角 使其顺滑
//         .interpolate("cardinal")

//     type_g
//         .append("path")
//         // d 是 path data的缩写 将data数据传人
//         .attr("d", area_generator(azsum)) // d = "M1,0L20,40L40,50L100,100L0,200"
//         // 填充颜色
//         .style("fill", "red")
//         .attr('fill-opacity', 0.3)

// }

function PaintRect(num) {
    // 导入数据
    var coorp;
    if (num == 1) coorp = "data/Scatter/1.json";
    if (num == 2) coorp = "data/Scatter/2.json";
    if (num == 3) coorp = "data/Scatter/3.json";
    if (num == 4) coorp = "data/Scatter/4.json";
    if (num == 5) coorp = "data/Scatter/5.json";
    if (num == 6) coorp = "data/Scatter/6.json";
    if (num == 7) coorp = "data/Scatter/7.json";
    if (num == 8) coorp = "data/Scatter/8.json";
    if (num == 9) coorp = "data/Scatter/9.json";
    if (num == 10) coorp = "data/Scatter/10.json";
    if (num == 11) coorp = "data/Scatter/11.json";
    if (num == 12) coorp = "data/Scatter/12.json";
    if (num == 13) coorp = "data/Scatter/13.json";
    if (num == 14) coorp = "data/Scatter/14.json";
    if (num == 15) coorp = "data/Scatter/15.json";
    if (num == 16) coorp = "data/Scatter/16.json";
    if (num == 17) coorp = "data/Scatter/17.json";
    if (num == 18) coorp = "data/Scatter/18.json";
    if (num == 19) coorp = "data/Scatter/19.json";
    if (num == 20) coorp = "data/Scatter/20.json";
    d3.csv("data/box.csv", function (d1) {
        // d3.json(coorp, function (coor) {
        d3.json('data/ScatterF.json', function (coork) {
            d3.csv("data/box_calc.csv", function (RectInData) {
                var coor = coork[num];

                if (Rect_g != 0) Rect_g.remove()
                if (text_g != 0) text_g.remove()

                Rect_g = svg.append('g')
                    .attr("tratsne_xnsform", "translate(" + 0 + "," + -15 + ")");

                text_g = svg.append('g')
                    .attr("transform", "translate(" + 0 + "," + -5 + ")");

                var code_Label = {} // 记录当前散点图中对应id的label
                for (var i in coor) {
                    if (parseInt(coor[i].l) == num) {
                        code_Label[coor[i].id] = coor[i].label
                    }
                }

                var d = []
                for (var i in d1) {
                    if (parseInt(d1[i].biao) == num)
                        d.push(d1[i])
                }

                var textk = text_g.selectAll('#textk')
                    .attr("id", "trextk")
                    .data(title)
                    .enter()
                    .append('text')
                    .attr('fill', 'black')
                    .attr('font-size', '15px')
                    .attr('text-anchor', 'middle')
                    .attr("font-family", "courier")
                    .attr('x', function (d, i) {
                        return padding.left + i * rectStep;
                    })
                    .attr('y', function (d) {
                        return height - padding.bottom + 3;
                    })
                    .attr('dx', rectWidth / 2) //dx是相对于x平移的大小
                    .attr('dy', '1em') //dy是相对于y平移的大小
                    .text(function (d) {
                        return d;
                    })

                let minx = 999;
                let maxx = 0

                for (var i = 0; i < d.length; ++i) {
                    // console.log(d[i][91])
                    if (parseFloat(d[i].work) > maxx) maxx = parseFloat(d[i].work);
                    if (parseFloat(d[i].work) < minx) minx = parseFloat(d[i].work);

                    if (parseFloat(d[i][21]) > maxx) maxx = parseFloat(d[i][21]);
                    if (parseFloat(d[i][21]) < minx) minx = parseFloat(d[i][21]);
                    if (parseFloat(d[i][11]) > maxx) maxx = parseFloat(d[i][11]);
                    if (parseFloat(d[i][11]) < minx) minx = parseFloat(d[i][11]);
                    if (parseFloat(d[i][31]) > maxx) maxx = parseFloat(d[i][31]);
                    if (parseFloat(d[i][31]) < minx) minx = parseFloat(d[i][31]);
                    if (parseFloat(d[i][41]) > maxx) maxx = parseFloat(d[i][41]);
                    if (parseFloat(d[i][41]) < minx) minx = parseFloat(d[i][41]);
                    if (parseFloat(d[i][51]) > maxx) maxx = parseFloat(d[i][51]);
                    if (parseFloat(d[i][51]) < minx) minx = parseFloat(d[i][51]);
                    if (parseFloat(d[i][61]) > maxx) maxx = parseFloat(d[i][61]);
                    if (parseFloat(d[i][61]) < minx) minx = parseFloat(d[i][61]);
                    if (parseFloat(d[i][71]) > maxx) maxx = parseFloat(d[i][71]);
                    if (parseFloat(d[i][71]) < minx) minx = parseFloat(d[i][71]);
                    if (parseFloat(d[i][81]) > maxx) maxx = parseFloat(d[i][81]);
                    if (parseFloat(d[i][81]) < minx) minx = parseFloat(d[i][81]);
                    if (parseFloat(d[i][91]) > maxx) maxx = parseFloat(d[i][91]);
                    if (parseFloat(d[i][91]) < minx) minx = parseFloat(d[i][91]);
                }
                // 计算比例尺
                var linearF = d3.scale.linear()
                    .domain([0, minx])
                    .range([0, 39])

                var linearZ = d3.scale.linear()
                    .domain([0, maxx])
                    .range([0, 39])

                var lne_line = Math.max(Math.abs(maxx), Math.abs(minx));

                var line_linear = d3.scale.linear()
                    .domain([0, lne_line])
                    .range([0, 39])

                // 减少杂化
                let RectInnerData = []
                for (var i in RectInData) {
                    if (parseInt(RectInData[i].biao) == num) {
                        RectInnerData.push(RectInData[i])
                    }
                }
                var sort_ten = [] // 第十列排序
                var sort_one = []
                var sort_ten_inner = {}
                var sort_one_inner = {}
                var code_Num = {} // 记录编号排布
                // console.log(RectInnerData)
                for (var i in RectInnerData) {
                    sort_ten.push(parseFloat(RectInnerData[i][119]))
                    sort_one.push(parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19]))
                    code_Num[RectInnerData[i].code] = i
                }
                sort_ten.sort(function (a, b) {
                    return a - b;
                })
                sort_one.sort(function (a, b) {
                    return a - b;
                })
                for (var i in sort_ten) {
                    sort_ten_inner[sort_ten[i]] = i;
                    sort_one_inner[sort_one[i]] = i;
                }
                for (var i in RectInnerData) {
                    if (parseInt(sort_ten_inner[RectInnerData[i][119]]) <= 100)
                        RectInnerData[i][11] = 0;
                    else if (parseInt(sort_ten_inner[RectInnerData[i][119]]) <= 200)
                        RectInnerData[i][11] = 1;
                    else
                        RectInnerData[i][11] = 2

                    if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 100)
                        RectInnerData[i][1] = 0;
                    else if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 200)
                        RectInnerData[i][1] = 1;
                    else
                        RectInnerData[i][1] = 2;

                }
                for (var i in RectInnerData) {
                    for (var j = 1; j <= 12; ++j) {
                        RectInnerData[i][j * 10 + 7] = title_tip_symbol[parseInt(j - 1)][parseInt(RectInnerData[i][j])]
                        RectInnerData[i][j * 10 + 8] = title_tip[parseInt(j - 1)][parseInt(RectInnerData[i][j])]
                    }
                }
                // console.log(RectInnerData)
                let RectOuterData = []
                RectOuterData[1] = []
                RectOuterData[1][0] = {
                    'val': 0,
                    'member': []
                }
                RectOuterData[1][1] = {
                    'val': 0,
                    'member': []
                }
                RectOuterData[1][2] = {
                    'val': 0,
                    'member': []
                }
                for (var i in RectInnerData) {
                    RectOuterData[1][RectInnerData[i][1]]['member'].push(RectInnerData[i])
                    RectOuterData[1][RectInnerData[i][1]].val += parseInt(code_Num[RectInnerData[i].code])
                }
                for (var i in RectOuterData[1]) {
                    RectOuterData[1][i].val /= RectOuterData[1][i]["member"].length
                }
                // for (var t = 1; t <= 20; ++t) {
                for (var k = 2; k <= 12; ++k) {
                    // console.log(k)
                    if (typeof (RectOuterData[k]) == "undefined")
                        RectOuterData[k] = []
                    for (var i in RectOuterData[k - 1]) {
                        for (var j in RectOuterData[k - 1][i]["member"]) {
                            RectOuterData[k][RectOuterData[k - 1][i]["member"][j][k]] = {
                                "val": 0,
                                "member": []
                            }
                        }
                    }
                    for (var i in RectOuterData[k - 1]) {
                        for (var j in RectOuterData[k - 1][i]["member"]) {
                            // RectOuterData[k - 1][i]["member"][j][k] 对应的分类
                            RectOuterData[k][RectOuterData[k - 1][i]["member"][j][k]].val += parseInt(code_Num[RectOuterData[k - 1][i]["member"][j]["code"]])
                            RectOuterData[k][RectOuterData[k - 1][i]["member"][j][k]].member.push(RectOuterData[k - 1][i]["member"][j])
                        }
                    }
                    for (var i in RectOuterData[k]) {
                        RectOuterData[k][i].val /= RectOuterData[k][i]["member"].length
                    }
                    RectOuterData[k].sort(function (a, b) {
                        return a.val - b.val;
                    })
                    for (var i in RectOuterData[k]) {
                        for (var j in RectOuterData[k][i]["member"]) {
                            if (i == 0)
                                code_Num[RectOuterData[k][i]["member"][j].code] = parseInt(j)
                            else
                                code_Num[RectOuterData[k][i]["member"][j].code] = parseInt(j) + RectOuterData[k][i]["member"].length
                        }
                    }
                    // console.log(code_Num)
                }
                for (var k = 11; k >= 1; --k) {
                    for (var i in RectOuterData[k + 1]) {
                        for (var j in RectOuterData[k + 1][i]["member"]) {
                            RectOuterData[k][RectOuterData[k + 1][i]["member"][j][k]] = {
                                "val": 0,
                                "member": []
                            }
                        }
                    }
                    for (var i in RectOuterData[k + 1]) {
                        for (var j in RectOuterData[k + 1][i]["member"]) {
                            // RectOuterData[k - 1][i]["member"][j][k] 对应的分类
                            // if (typeof (RectOuterData[k][RectOuterData[k - 1][i]["member"][j][k]]) == "undefined")
                            // console.log("i = " + i + "; j = " + j)
                            RectOuterData[k][RectOuterData[k + 1][i]["member"][j][k]].val += parseInt(code_Num[RectOuterData[k + 1][i]["member"][j]["code"]])
                            RectOuterData[k][RectOuterData[k + 1][i]["member"][j][k]].member.push(RectOuterData[k + 1][i]["member"][j])
                        }
                    }
                    for (var i in RectOuterData[k]) {
                        RectOuterData[k][i].val /= RectOuterData[k][i]["member"].length
                    }
                    RectOuterData[k].sort(function (a, b) {
                        return a.val - b.val;
                    })
                    for (var i in RectOuterData[k]) {
                        for (var j in RectOuterData[k][i]["member"]) {
                            if (i == 0)
                                code_Num[RectOuterData[k][i]["member"][j].code] = parseInt(j)
                            else
                                code_Num[RectOuterData[k][i]["member"][j].code] = parseInt(j) + RectOuterData[k][i]["member"].length
                        }
                    }
                    // console.log(code_Num)
                }
                // }
                //  for (var k = 2; k <= 12; ++k) {
                //         // console.log(k)
                //         if (typeof (RectOuterData[k]) == "undefined")
                //             RectOuterData[k] = []
                //         for (var i in RectOuterData[k - 1]) {
                //             for (var j in RectOuterData[k - 1][i]["member"]) {
                //                 RectOuterData[k][RectOuterData[k - 1][i]["member"][j][k]] = {
                //                     "val": 0,
                //                     "member": []
                //                 }
                //             }
                //         }
                //         for (var i in RectOuterData[k - 1]) {
                //             for (var j in RectOuterData[k - 1][i]["member"]) {
                //                 // RectOuterData[k - 1][i]["member"][j][k] 对应的分类
                //                 RectOuterData[k][RectOuterData[k - 1][i]["member"][j][k]].val += parseInt(code_Num[RectOuterData[k - 1][i]["member"][j]["code"]])
                //                 RectOuterData[k][RectOuterData[k - 1][i]["member"][j][k]].member.push(RectOuterData[k - 1][i]["member"][j])
                //             }
                //         }
                //         for (var i in RectOuterData[k]) {
                //             RectOuterData[k][i].val /= RectOuterData[k][i]["member"].length
                //         }
                //         RectOuterData[k].sort(function (a, b) {
                //             return a.val - b.val;
                //         })
                //         for (var i in RectOuterData[k]) {
                //             for (var j in RectOuterData[k][i]["member"]) {
                //                 if (i == 0)
                //                     code_Num[RectOuterData[k][i]["member"][j].code] = parseInt(j)
                //                 else
                //                     code_Num[RectOuterData[k][i]["member"][j].code] = parseInt(j) + RectOuterData[k][i]["member"].length
                //             }
                //         }
                //         // console.log(code_Num)
                //     }
                var Sankey_Rect = []
                for (var i in RectOuterData) {
                    var s_num = 0;
                    for (var j in RectOuterData[i]) {
                        // console.log( RectOuterData[i][j].member[0])
                        a = {}
                        a["x"] = i - 1
                        a["n"] = j
                        a["start"] = s_num
                        s_num += RectOuterData[i][j].member.length
                        a['tip'] = RectOuterData[i][j].member[0][i * 10 + 8]
                        a['symbol'] = RectOuterData[i][j].member[0][i * 10 + 7]
                        a['weight'] = RectOuterData[i][j].member[0][i]
                        a["end"] = s_num;
                        Sankey_Rect.push(a)
                    }
                }

                // work = []
                // final = []
                // // 格内数据
                // var ext = []
                // ext.push([0, 0])
                // for (var i = 1; i <= 9; ++i) {
                //     var t = []
                //     for (var k = 0; k < 4; ++k) {
                //         t[k] = 0
                //     }
                //     for (var k = 0; k < 304; ++k) {
                //         t[parseInt(d[k][i])]++;
                //     }
                //     ext.push(t)
                // }
                // ext.push([100, 100, 104, 0])
                // var t = []
                // for (var k = 0; k < 7; ++k) {
                //     t[k] = 0
                // }
                // for (var k = 0; k < 304; ++k) {
                //     t[parseInt(d[k].risk)]++;
                // }
                // ext.push(t)
                // var type = []
                // for (var i = 1; i <= 11; ++i) {
                //     var n = 0;
                //     for (j in ext[i]) {
                //         a = {}
                //         a["x"] = i;
                //         a["n"] = n;
                //         n++;
                //         // if (t[i][j] == 0) continue;
                //         if (j == 0) {
                //             a["start"] = 0;
                //             a["end"] = ext[i][0];
                //         } else {
                //             a["start"] = ext[i][j - 1];
                //             ext[i][j] = ext[i][j - 1] + ext[i][j];
                //             a["end"] = ext[i][j];
                //         }
                //         type.push(a);
                //     }
                // }

                // type.push({
                //     "x": 0,
                //     "start": 0,
                //     "end": 304,
                //     "n": 0
                // })
                // console.log(type);

                // console.log(Sankey_Rect)

                var Font_scale = d3.scale.linear()
                    .domain([1, 3])
                    .range([15, 20])



                // 画桑基块
                Rect_g.selectAll(".recta")
                    .attr("class", "recta")
                    .data(Sankey_Rect)
                    .enter()
                    .append("rect")
                    .attr("x", (d, i) => {
                        return padding.left + d.x * rectStep;
                    })
                    .attr("y", d => {
                        // console.log(d);
                        var tt = steplen;
                        // // if (d.x == 0) tt = 3 * steplen / 2;
                        // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
                        if (d.x == 9 && (num == 1 || num == 10)) {
                            return height - padding.top - 375 + d.start * bei + 3 * steplen - 10;
                        }
                        if (d.x == 0 || d.x == 1 || d.x == 10) {
                            tt = 3 * steplen;
                        } else if (d.x == 6 || d.x == 8) {
                            tt = 2 * steplen;
                        } else if (d.x != 11) {
                            tt = 6 * steplen;
                        }
                        return height - padding.top - 375 + d.start * bei + d.n * tt - 10;
                    })
                    // .attr("rx", 5)
                    .attr("width", rectWidth)
                    .attr("height", d => {
                        return (d.end - d.start) * bei;
                    })
                    .attr("stroke", d => {
                        return "black"
                    })
                    .attr("stroke-width", 0.5)
                    .attr('stroke-opacity', 0.5)
                    .attr("fill", d => {
                        // if (d.x != 11)
                        // return color[d.n];
                        // console.log(d.n)
                        // var colora = "#FFFFFF"
                        // var colorb = "blue"

                        // let colorx = d3.interpolate(colora, colorb);
                        // var color_scale = d3.scale.linear()
                        //     .domain([-2, 8])
                        //     .range([0, 1])
                        // if (d.x != 11)
                        //     return colorx(color_scale(parseInt(d.weight * 2)))
                        // return colorx(color_scale(parseInt(d.weight)))
                        return "white";
                    })
                    .attr("fill-opacity", d => {
                        if (d.x != 11)
                            return 1
                        else
                            return 1
                    })
                    .on("click", d => {
                        if (Rect_data == -1) {
                            Rect_data = p;
                        }
                        RectMove(Rect_data, d, num)
                    })
                    .on("mouseover", d => {
                        tooltip.html("过程：" + title[d.x] + "</br>" + "状态：" + d.tip)
                            .style("left", (d3.event.pageX - 15) + "px")
                            .style("top", (d3.event.pageY + 20) + "px")
                            .style("opacity", 1.0)
                    })
                    .on("mousemove", d => {
                        tooltip.style("left", (d3.event.pageX - 15) + "px")
                            .style("top", (d3.event.pageY + 20) + "px")
                    })
                    .on("mouseout", d => {
                        tooltip.style("opacity", 0.0)
                    })

                Rect_g.selectAll(".recta")
                    .attr("class", "recta")
                    .data(Sankey_Rect)
                    .enter()
                    .append("line")
                    .attr("x1", (d, i) => {
                        return padding.left + d.x * rectStep + rectWidth / 2;
                    })
                    .attr("y1", d => {
                        // console.log(d);
                        var tt = steplen;
                        // // if (d.x == 0) tt = 3 * steplen / 2;
                        // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
                        if (d.x == 9 && (num == 1 || num == 10)) {
                            return height - padding.top - 375 + d.start * bei + 3 * steplen - 10;
                        }
                        if (d.x == 0 || d.x == 1 || d.x == 10) {
                            tt = 3 * steplen;
                        } else if (d.x == 6 || d.x == 8) {
                            tt = 2 * steplen;
                        } else if (d.x != 11) {
                            tt = 6 * steplen;
                        }
                        return height - padding.top - 375 + d.start * bei + d.n * tt - 10;
                    })
                    // .attr("rx", 5)
                    // .attr("width", rectWidth)
                    // .attr("height", d => {
                    //     return (d.end - d.start) * bei;
                    // })
                    .attr('x2', d => {
                        return padding.left + d.x * rectStep + rectWidth / 2;
                    })
                    .attr('y2', d => {
                        let tt = steplen;
                        if (d.x == 9 && (num == 1 || num == 10)) {
                            return height - padding.top - 375 + d.start * bei + 3 * steplen - 10 + (d.end - d.start) * bei;
                        }
                        if (d.x == 0 || d.x == 1 || d.x == 10) {
                            tt = 3 * steplen;
                        } else if (d.x == 6 || d.x == 8) {
                            tt = 2 * steplen;
                        } else if (d.x != 11) {
                            tt = 6 * steplen;
                        }
                        return height - padding.top - 375 + d.start * bei + d.n * tt - 10 + (d.end - d.start) * bei;
                    })
                    .attr("stroke", d => {
                        return "black"
                    })
                    .attr("stroke-width", 1)
                    .attr("fill", d => {
                        // if (d.x != 11)
                        // return color[d.n];
                        // console.log(d.n)
                        // var colora = "#FFFFFF"
                        // var colorb = "blue"

                        // let colorx = d3.interpolate(colora, colorb);
                        // var color_scale = d3.scale.linear()
                        //     .domain([-2, 8])
                        //     .range([0, 1])
                        // if (d.x != 11)
                        //     return colorx(color_scale(parseInt(d.weight * 2)))
                        // return colorx(color_scale(parseInt(d.weight)))
                        return "none";
                    })
                    .attr("fill-opacity", d => {
                        if (d.x != 11)
                            return 1
                        else
                            return 1
                    })
                // .on("click", d => {
                //     if (Rect_data == -1) {
                //         Rect_data = p;
                //     }
                //     RectMove(Rect_data, d, num)
                // })
                // .on("mouseover", d => {
                //     tooltip.html("过程：" + title[d.x] + "</br>" + "状态：" + d.tip)
                //         .style("left", (d3.event.pageX - 15) + "px")
                //         .style("top", (d3.event.pageY + 20) + "px")
                //         .style("opacity", 1.0)
                // })
                // .on("mousemove", d => {
                //     tooltip.style("left", (d3.event.pageX - 15) + "px")
                //         .style("top", (d3.event.pageY + 20) + "px")
                // })
                // .on("mouseout", d => {
                //     tooltip.style("opacity", 0.0)
                // })
                Rect_g.selectAll(".recta")
                    .data(Sankey_Rect)
                    .enter()
                    .append('text')
                    .attr('fill', 'black')
                    .attr('font-size', (d, i) => {
                        // if (d.weight == 0 || (d.x == 11) || d.x == 7 || d.x == 10 || d.x == 9)
                        //     return '15px'
                        // else
                        //     return Font_scale(parseInt(d.weight))
                        return '12px';
                    })
                    .attr('font-weight', 'bold')
                    .attr('text-anchor', 'middle')
                    .attr("font-family", "courier")
                    .attr('x', function (d, i) {
                        return padding.left + d.x * rectStep + rectWidth - 8;
                    })
                    .attr('y', function (d) {
                        // console.log(d);
                        var tt = steplen;
                        // if (d.x == 0) tt = 3 * steplen / 2;
                        // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
                        // if (d.symbol == '🈚' && d.n != 0) tt += 10
                        if (d.x == 9 && (num == 1 || num == 10)) {

                            return height - padding.top - 375 + d.start * bei + 3 * steplen;
                        }
                        if (d.x == 0 || d.x == 1 || d.x == 10) {
                            tt = 3 * steplen;
                        } else if (d.x == 6 || d.x == 8) {
                            tt = 2 * steplen;
                        } else if (d.x != 11) {
                            tt = 6 * steplen;
                        }
                        return height - padding.top - 375 + d.start * bei + d.n * tt;
                    })
                    .attr('dx', '0em') //dx是相对于x平移的大小
                    .attr('dy', '-0em') //dy是相对于y平移的大小
                    .text(function (d) {
                        // if (d.end - d.start >= 20)
                        return d.symbol;
                    })

                var Rect_Line_Data = []; // 块内横线的数据
                var p = {}; // 计算连接线

                for (var i in d) {
                    p[d[i].code] = {};
                }
                for (var i in RectOuterData) {
                    var s_num = 0;
                    for (var j in RectOuterData[i]) {
                        for (var k in RectOuterData[i][j].member) {
                            var a = {
                                "x": i - 1, // 第几列
                                "y": parseInt(k) + s_num, // 第几行
                                "v": parseFloat(RectOuterData[i][j]["member"][k][i * 10 + 9]), // 长度
                                "n": parseInt(j),
                                "id": RectOuterData[i][j]["member"][k].code,
                                "label": code_Label[RectOuterData[i][j]["member"][k].code],
                                "treat": parseInt(RectOuterData[i][j]["member"][k].treat)
                            }
                            p[a.id][i - 1] = a;
                            Rect_Line_Data.push(a)
                        }
                        s_num += RectOuterData[i][j].member.length
                    }
                }
                // console.log(p)
                // console.log(Rect_Line_Data)

                // var p = {}

                // for (var i in d) {
                //     p[d[i].code] = {};
                // }

                // for (var k = 1; k <= 9; ++k) {
                //     var cnt = 0;
                //     for (var i in d) {
                //         a = {}
                //         if (d[i][k] == 0) {
                //             a["x"] = k;
                //             a["y"] = cnt++;
                //             a["v"] = parseFloat(d[i][k * 10 + 1]);
                //             a["n"] = parseInt(d[i][k]);
                //             a["id"] = d[i].code;
                //             a["label"] = coor[i].label;
                //             p[d[i].code][k] = a;
                //         } else {
                //             a["x"] = k;
                //             ext[k][d[i][k] - 1]++;
                //             // console.log(ext[k][d[i][k] - 1])
                //             a["y"] = ext[k][d[i][k] - 1];
                //             a["v"] = parseFloat(d[i][k * 10 + 1]);
                //             a["n"] = parseInt(d[i][k]);
                //             a["id"] = d[i].code;
                //             a["label"] = coor[i].label;
                //             p[d[i].code][k] = a;
                //         }
                //         work.push(a);
                //     }
                // }

                // var l_sort = []

                // for (var i in d) {
                //     l_sort.push(parseFloat(d[i][10]))
                // }

                // l_sort.sort(function (a, b) {
                //     return a - b;
                // })

                // var l_sort_label = {}
                // var l_sort_label_2 = {}

                // for (var i in l_sort) {
                //     // console.log(l_sort[i]);
                //     l_sort_label_2[l_sort[i]] = i
                //     if (i <= 100)
                //         l_sort_label[l_sort[i]] = 0
                //     else if (i <= 200)
                //         l_sort_label[l_sort[i]] = 1
                //     else if (i <= 304)
                //         l_sort_label[l_sort[i]] = 2
                // }

                // // console.log(l_sort_label_2)

                // for (var i in d) {
                //     a = {}
                //     a["x"] = 0;
                //     a["y"] = parseInt(p[d[i].code][1].y);
                //     a["v"] = parseFloat(d[i].work);
                //     a["n"] = 0;
                //     a["id"] = d[i].code;
                //     a["label"] = coor[i].label;
                //     // p[d[i].code] = {};
                //     p[d[i].code][0] = a;
                //     work.push(a);
                // }

                // var cnt = 0,
                //     k = 10;
                // for (var i in d) {
                //     a = {}
                //     if (l_sort_label[parseFloat(d[i][k])] == 0) {
                //         a["x"] = k;
                //         // a["y"] = cnt++;
                //         a["y"] = parseInt(l_sort_label_2[parseFloat(d[i][k])])
                //         a["v"] = parseFloat(d[i][k]);
                //         a["n"] = l_sort_label[parseFloat(d[i][k])];
                //         a["id"] = d[i].code;
                //         a["label"] = coor[i].label;
                //         p[d[i].code][k] = a;
                //     } else {
                //         a["x"] = k;
                //         ext[k][l_sort_label[parseFloat(d[i][k])] - 1]++;
                //         // console.log(ext[k][d[i][k] - 1])
                //         // a["y"] = ext[k][l_sort_label[parseFloat(d[i][k])] - 1];
                //         a["y"] = parseInt(l_sort_label_2[parseFloat(d[i][k])])
                //         a["v"] = parseFloat(d[i][k]);
                //         a["n"] = l_sort_label[parseFloat(d[i][k])];
                //         a["id"] = d[i].code;
                //         a["label"] = coor[i].label;
                //         p[d[i].code][k] = a;
                //     }
                //     work.push(a);
                // }

                // var cnt = 0,
                //     k = "risk";
                // for (var i in d) {
                //     // console.log(d[i][k])
                //     a = {}
                //     if (d[i][k] == 0) {
                //         a["x"] = 11;
                //         a["y"] = cnt++;
                //         a["v"] = parseFloat(d[i][10]);
                //         a["n"] = parseInt(d[i][k]);
                //         a["id"] = d[i].code;
                //         a["label"] = coor[i].label;
                //         p[d[i].code][11] = a;
                //     } else {
                //         a["x"] = 11;
                //         ext[11][d[i][k] - 1]++;
                //         // console.log(ext[k][d[i][k] - 1])
                //         a["y"] = ext[11][d[i][k] - 1];
                //         a["v"] = parseFloat(d[i][10]);
                //         a["n"] = parseInt(d[i][k]);
                //         a["id"] = d[i].code;
                //         a["label"] = coor[i].label;
                //         p[d[i].code][11] = a;
                //     }
                //     work.push(a);
                // }


                // 格内划线     
                Rect_g.selectAll(".line")
                    .attr("class", "line")
                    .data(Rect_Line_Data)
                    .enter()
                    .append("line")
                    .attr("x1", (d, i) => {
                        return padding.left + d.x * rectStep + 0.5 + rectWidth / 2;
                    })
                    .attr("y1", (d, i) => {
                        // console.log(d)
                        var tt = steplen;
                        // if (d.x == 0) tt = 3 * steplen / 2;
                        // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
                        if (d.x == 9 && (num == 1 || num == 10)) {
                            return d.y * bei + height - padding.top - 375 + 3 * steplen - 10;
                        }
                        if (d.x == 0 || d.x == 1 || d.x == 10) {
                            tt = 3 * steplen;
                        } else if (d.x == 6 || d.x == 8) {
                            tt = 2 * steplen;
                        } else if (d.x != 11) {
                            tt = 6 * steplen;
                        }
                        return d.y * bei + height - padding.top - 375 + d.n * tt - 10;
                    })
                    .attr("x2", (d, i) => {
                        var len;
                        len = line_linear(Math.abs(d.v)) / 2
                        if (d.v < 0)
                            len = -len;
                        // if (d.v >= 0)
                        // len = linearZ(d.v);
                        // else if (d.v <= 0)
                        // len = linearF(d.v);
                        return padding.left + d.x * rectStep + len + 0.5 + rectWidth / 2;
                    })
                    .attr("y2", (d, i) => {

                        var tt = steplen;
                        // if (d.x == 0) tt = 3 * steplen / 2;
                        // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
                        if (d.x == 9 && (num == 1 || num == 10)) {
                            return d.y * bei + height - padding.top - 375 + 3 * steplen - 10;
                        }
                        if (d.x == 0 || d.x == 1 || d.x == 10) {
                            tt = 3 * steplen;
                        } else if (d.x == 6 || d.x == 8) {
                            tt = 2 * steplen;
                        } else if (d.x != 11) {
                            tt = 6 * steplen;
                        }
                        return d.y * bei + height - padding.top - 375 + d.n * tt - 10;
                    })
                    .attr("stroke", d => {
                        if (d.v >= 0)
                            return "red";
                        else
                            return "#00FF00";
                    })
                    .attr("stroke-width", 1);


                var path = PathCalc(p, -1, -1, num);

                LinePaint(path[0], path[2], "black")

                // PaintTypeZ(d)

                // // return p;
                // ScatterPaint(coor, p, num)
                ScatterPaint_gain_loss(coor, firstjudge, num, p)
                // firstjudge = 1;
            })
        })
    })
}

function PaintIn(num) {
    Paint()
    Lun(num)
    // Pic_legend()
    // 导入数据
    var coorp;
    if (num == 1) coorp = "data/Scatter/1.json";
    if (num == 2) coorp = "data/Scatter/2.json";
    if (num == 3) coorp = "data/Scatter/3.json";
    if (num == 4) coorp = "data/Scatter/4.json";
    if (num == 5) coorp = "data/Scatter/5.json";
    if (num == 6) coorp = "data/Scatter/6.json";
    if (num == 7) coorp = "data/Scatter/7.json";
    if (num == 8) coorp = "data/Scatter/8.json";
    if (num == 9) coorp = "data/Scatter/9.json";
    if (num == 10) coorp = "data/Scatter/10.json";
    if (num == 11) coorp = "data/Scatter/11.json";
    if (num == 12) coorp = "data/Scatter/12.json";
    if (num == 13) coorp = "data/Scatter/13.json";
    if (num == 14) coorp = "data/Scatter/14.json";
    if (num == 15) coorp = "data/Scatter/15.json";
    if (num == 16) coorp = "data/Scatter/16.json";
    if (num == 17) coorp = "data/Scatter/17.json";
    if (num == 18) coorp = "data/Scatter/18.json";
    if (num == 19) coorp = "data/Scatter/19.json";
    if (num == 20) coorp = "data/Scatter/20.json";
    d3.csv("data/box.csv", function (d1) {
        d3.json('data/ScatterF.json', function (coor) {

            PaintZhe(d1)
            // console.log('skdjfjshdfkj')
            ScatterPaint_gain_loss(coor[1], firstjudge, 1, []);

            var p = PaintRect(num)
        })
    })
}

function Pic_legend() {
    //#region 图例
    g = svg.append("g")
        .attr("transform", "translate(" + 115 + "," + -90 + ")")

    var t_pic = ['图例', '工作', '健康投资', '财产保险', '借贷机会', '投资', '风险投资', '负面冲击', '买彩票', '生病', '失业', '收获']
    var t_pp = []
    var ca = 30

    for (var i in t_pic) {
        var t_z = [t_pic[i]]
        t_pp.push(t_z)
    }

    g.append("text")
        .attr("x", padding.left + 9 * rectStep + 5)
        .attr("y", height - padding.bottom - 304 - 17 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '20px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return t_pic[0];
        })


    g.append("circle")
        .attr("cx", 1310)
        .attr("cy", height - padding.bottom - 304 + 18 - ca)
        .attr("r", 10)
        .attr("fill", color[0])
        .attr("fill-opacity", 0.2)
    g.append("text")
        .attr("x", 1320)
        .attr("y", height - padding.bottom - 304 - 23 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return "工作"
        })
    g.append("text")
        .attr("x", padding.left + 9 * rectStep - 50)
        .attr("y", height - padding.bottom - 304 - 23 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return t_pic[1];
        })

    var a_t = ['否', '是']
    var b_t = ['0', '5', '10']
    var c_t = ['小', '中', '大', '无']
    var d_t = ['无', '小', '中', '大']

    g.append("circle")
        .attr("cx", 1310)
        .attr("cy", height - padding.bottom - 304 + 18 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[0])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1360)
        .attr("cy", height - padding.bottom - 304 + 18 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[1])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1310)
        .attr("cy", height - padding.bottom - 304 + 48 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[2])
        .attr("fill-opacity", 0.2)
    g.append("text")
        .attr("x", padding.left + 9 * rectStep - 50)
        .attr("y", height - padding.bottom - 304 + 7 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return t_pic[2];
        })

    var t_h = g.selectAll("#aa")
        .attr("id", "aa")
        .data(b_t)
        .enter()
        .append("text")
        .attr("x", (d, i) => {
            if (i == 2) return 1315 + (i - 2) * 50
            return 1315 + i * 50;
        })
        .attr("y", (d, i) => {
            if (i == 2) return height - padding.bottom - 304 + 37 + 30 - ca
            return height - padding.bottom - 304 + 7 + 30 - ca
        })
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return d
        })

    g.append("circle")
        .attr("cx", 1310)
        .attr("cy", height - padding.bottom - 304 + 78 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[0])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1360)
        .attr("cy", height - padding.bottom - 304 + 78 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[1])
        .attr("fill-opacity", 0.2)

    g.append("text")
        .attr("x", padding.left + 9 * rectStep - 50)
        .attr("y", height - padding.bottom - 304 + 67 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return t_pic[3]
        })

    g.selectAll("#aa")
        .attr("id", "aa")
        .data(a_t)
        .enter()
        .append("text")
        .attr("x", (d, i) => {
            return 1315 + i * 50;
        })
        .attr("y", height - padding.bottom - 304 + 67 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return d
        })

    g.append("circle")
        .attr("cx", 1310)
        .attr("cy", height - padding.bottom - 304 + 108 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[0])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1360)
        .attr("cy", height - padding.bottom - 304 + 108 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[1])
        .attr("fill-opacity", 0.2)

    g.append("text")
        .attr("x", padding.left + 9 * rectStep - 50)
        .attr("y", height - padding.bottom - 304 + 97 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return t_pic[4]
        })

    g.selectAll("#aa")
        .attr("id", "aa")
        .data(a_t)
        .enter()
        .append("text")
        .attr("x", (d, i) => {
            return 1315 + i * 50;
        })
        .attr("y", height - padding.bottom - 304 + 97 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return d
        })

    g.append("circle")
        .attr("cx", 1310)
        .attr("cy", height - padding.bottom - 304 + 137 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[0])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1360)
        .attr("cy", height - padding.bottom - 304 + 137 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[1])
        .attr("fill-opacity", 0.2)

    g.append("text")
        .attr("x", padding.left + 9 * rectStep - 50)
        .attr("y", height - padding.bottom - 304 + 127 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return t_pic[5]
        })

    g.selectAll("#aa")
        .attr("id", "aa")
        .data(a_t)
        .enter()
        .append("text")
        .attr("x", (d, i) => {
            return 1315 + i * 50;
        })
        .attr("y", height - padding.bottom - 304 + 127 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return d
        })

    g.append("circle")
        .attr("cx", 1310)
        .attr("cy", height - padding.bottom - 304 + 167 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[0])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1360)
        .attr("cy", height - padding.bottom - 304 + 167 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[1])
        .attr("fill-opacity", 0.2)

    g.append("text")
        .attr("x", padding.left + 9 * rectStep - 50)
        .attr("y", height - padding.bottom - 304 + 157 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return t_pic[6]
        })

    g.selectAll("#aa")
        .attr("id", "aa")
        .data(a_t)
        .enter()
        .append("text")
        .attr("x", (d, i) => {
            return 1315 + i * 50;
        })
        .attr("y", height - padding.bottom - 304 + 157 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return d
        })


    g.append("circle")
        .attr("cx", 1310)
        .attr("cy", height - padding.bottom - 304 + 197 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[0])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1360)
        .attr("cy", height - padding.bottom - 304 + 197 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[1])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1310)
        .attr("cy", height - padding.bottom - 304 + 227 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[2])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1360)
        .attr("cy", height - padding.bottom - 304 + 227 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[3])
        .attr("fill-opacity", 0.2)

    g.append("text")
        .attr("x", padding.left + 9 * rectStep - 50)
        .attr("y", height - padding.bottom - 304 + 187 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return t_pic[7]
        })



    g.selectAll("#aa")
        .attr("id", "aa")
        .data(c_t)
        .enter()
        .append("text")
        .attr("x", (d, i) => {
            if (i >= 2) return 1315 + (i - 2) * 50
            return 1315 + i * 50;
        })
        .attr("y", (d, i) => {
            // console.log(i)
            if (i >= 2) return height - padding.bottom - 304 + 217 + 30 - ca
            return height - padding.bottom - 304 + 187 + 30 - ca
        })
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return d
        })


    g.append("circle")
        .attr("cx", 1310)
        .attr("cy", height - padding.bottom - 304 + 257 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[0])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1360)
        .attr("cy", height - padding.bottom - 304 + 257 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[1])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1310)
        .attr("cy", height - padding.bottom - 304 + 287 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[2])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1360)
        .attr("cy", height - padding.bottom - 304 + 287 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[3])
        .attr("fill-opacity", 0.2)

    g.append("text")
        .attr("x", padding.left + 9 * rectStep - 50)
        .attr("y", height - padding.bottom - 304 + 247 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return t_pic[8]
        })
    a_t_1 = []
    g.selectAll("#aa")
        .attr("id", "aa")
        .data(a_t_1)
        .enter()
        .append("text")
        .attr("x", (d, i) => {
            if (i >= 2) return 1315 + (i - 2) * 50
            return 1315 + i * 50;
        })
        .attr("y", (d, i) => {
            if (i >= 2) return height - padding.bottom - 304 + 277 + 30 - ca
            return height - padding.bottom - 304 + 247 + 30 - ca
        })
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return d
        })

    g.append("circle")
        .attr("cx", 1310)
        .attr("cy", height - padding.bottom - 304 + 317 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[0])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1360)
        .attr("cy", height - padding.bottom - 304 + 317 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[1])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1310)
        .attr("cy", height - padding.bottom - 304 + 347 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[2])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1360)
        .attr("cy", height - padding.bottom - 304 + 347 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[3])
        .attr("fill-opacity", 0.2)

    g.append("text")
        .attr("x", padding.left + 9 * rectStep - 50)
        .attr("y", height - padding.bottom - 304 + 307 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return t_pic[9]
        })

    g.selectAll("#aa")
        .attr("id", "aa")
        .data(d_t)
        .enter()
        .append("text")
        .attr("x", (d, i) => {
            if (i >= 2) return 1315 + (i - 2) * 50
            return 1315 + i * 50;
        })
        .attr("y", (d, i) => {
            if (i >= 2) return height - padding.bottom - 304 + 337 + 30 - ca
            return height - padding.bottom - 304 + 307 + 30 - ca
        })
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return d
        })

    g.append("circle")
        .attr("cx", 1310)
        .attr("cy", height - padding.bottom - 304 + 377 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[0])
        .attr("fill-opacity", 0.2)
    g.append("circle")
        .attr("cx", 1360)
        .attr("cy", height - padding.bottom - 304 + 377 + 30 - ca)
        .attr("r", 10)
        .attr("fill", color[1])
        .attr("fill-opacity", 0.2)

    g.append("text")
        .attr("x", padding.left + 9 * rectStep - 50)
        .attr("y", height - padding.bottom - 304 + 367 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return t_pic[10]
        })

    g.selectAll("#aa")
        .attr("id", "aa")
        .data(a_t)
        .enter()
        .append("text")
        .attr("x", (d, i) => {
            return 1315 + i * 50;
        })
        .attr("y", height - padding.bottom - 304 + 367 + 30 - ca)
        .attr("dx", 15)
        .attr("dy", "1em")
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .text(d => {
            return d
        })

    g.append("line")
        .attr("x1", 1232)
        .attr("y1", height - padding.bottom - 304 + 340 + 50)
        .attr("x2", 1400)
        .attr("y2", height - padding.bottom - 304 + 340 + 50)
        .attr("stroke", "black")
        .attr("stroke-width", "1px");

    g.append("line")
        .attr("x1", 1232)
        .attr("y1", height - padding.bottom - 304 - 48)
        .attr("x2", 1400)
        .attr("y2", height - padding.bottom - 304 - 48)
        .attr("stroke", "black")
        .attr("stroke-width", "1px");

    g.append("line")
        .attr("x1", 1232)
        .attr("y1", height - padding.bottom - 304 - 48)
        .attr("x2", 1232)
        .attr("y2", height - padding.bottom - 304 + 50 + 340)
        .attr("stroke", "black")
        .attr("stroke-width", "1px");

    g.append("line")
        .attr("x1", 1400)
        .attr("y1", height - padding.bottom - 304 - 48)
        .attr("x2", 1400)
        .attr("y2", height - padding.bottom - 304 + 50 + 340)
        .attr("stroke", "black")
    //#endregion
}

function Lun(num) {
    number = num;
    var scale = d3.scale.linear()
        .domain([0, 21])
        .range([50, 1500])

    var k = []
    for (var i = 1; i <= 20; ++i) k.push(i);

    Rect_data = -1;

    svg.selectAll('#SanS')
        .attr('id', 'SanS')
        .append('g')
        .data(k)
        .enter()
        .append('circle')
        .attr('cx', (d, i) => {
            return scale(d)
        })
        .attr('cy', 25)
        .attr('r', 30)
        .attr('fill', 'black')
        .attr('fill-opacity', 0)
        .on('click', (d, i) => {
            number = i + 1;
            PaintRect(i + 1)
            RedLun(i + 1)
            // Peo_gain_loss(number)
            DrawIceRectNum(i + 1);
        })
}

function RedLun(num) {
    if (cirg != 0) cirg.remove();
    cirg = svg.append("g")
    // console.log(num)
    var scale = d3.scale.linear()
        .domain([0, 21])
        .range([50, 1500])
    var red_ = cirg.append('g')
        .append('circle')
        .attr('cx', scale(num))
        .attr('cy', 25)
        .attr('r', 3)
        .attr('fill', 'blue')
    //Connect(num)
}

// 背景衬托
function Connect(num) {
    if (con_g != 0) con_g.remove()
    con_g = svg.append('g')
    var diagonal = d3.svg.diagonal();
    var scale = d3.scale.linear()
        .domain([0, 21])
        .range([50, 1500])


    var trian = [
        [10, 65],
        [scale(num) - 6, 40],
        [scale(num), 25],
        [scale(num) + 6, 40],
        [1524, 65],
    ]

    con_g.append('g')
        .append('line')
        .attr('x1', scale(num) - 6)
        .attr('y1', 40)
        .attr('x2', 10)
        .attr('y2', 65)
        .attr('stroke', 'orange')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 1)

    con_g.append('g')
        .append('line')
        .attr('x1', scale(num) + 6)
        .attr('y1', 40)
        .attr('x2', 1524)
        .attr('y2', 65)
        .attr('stroke', 'orange')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 1)

    con_g.append('g')
        .append('line')
        .attr('x1', scale(num) - 6)
        .attr('y1', 40)
        .attr('x2', scale(num))
        .attr('y2', 25)
        .attr('stroke', 'orange')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 1)

    con_g.append('g')
        .append('line')
        .attr('x1', scale(num) + 6)
        .attr('y1', 40)
        .attr('x2', scale(num))
        .attr('y2', 25)
        .attr('stroke', 'orange')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 1)

    con_g.append('g')
        .append('line')
        .attr('x1', 10)
        .attr('y1', 65)
        .attr('x2', 10)
        .attr('y2', 477)
        .attr('stroke', 'orange')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 1)

    con_g.append('g')
        .append('line')
        .attr('x1', 1524)
        .attr('y1', 65)
        .attr('x2', 1524)
        .attr('y2', 477)
        .attr('stroke', 'orange')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 1)


    con_g.append('g')
        .append('line')
        .attr('x1', 10)
        .attr('y1', 477)
        .attr('x2', 1524)
        .attr('y2', 477)
        .attr('stroke', 'orange')
        .attr('stroke-width', 1)
        .attr('stroke-opacity', 1)


    var area_ = d3.svg.area()
        // d表示传进来的数据 i表示数据的下标
        .x(function (d, i) {
            return d[0];
        })
        .y0(477)
        .y1(function (d) {
            return d[1];
        })

    con_g
        .append("path")
        // d 是 path data的缩写 将data数据传人
        .attr("d", area_(trian)) // d = "M1,0L20,40L40,50L100,100L0,200"
        // 填充颜色
        .style("fill", "tomato")
        .attr('fill-opacity', 0.1)

    // con_g.append('g')
    //     .append('line')
    //     .attr('x1', scale(num) - 6)
    //     .attr('y1', 60)
    //     .attr('x2', 20)
    //     .attr('y2', 90)
    //     .attr('stroke', 'black')
    //     .attr('stroke-width', 1)
    //     .attr('stroke-opacity', 0.7)

    // con_g.append('g')
    //     .append('line')
    //     .attr('x1', scale(num) + 6)
    //     .attr('y1', 60)
    //     .attr('x2', 1330)
    //     .attr('y2', 90)
    //     .attr('stroke', 'black')
    //     .attr('stroke-width', 1)
    //     .attr('stroke-opacity', 0.7)
}