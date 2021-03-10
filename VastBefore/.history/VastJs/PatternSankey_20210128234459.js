
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

var bei = 1
var steplen = 3

var number = 1;

var rectWidth = 40;
var rectStep = (width - 13 * rectWidth) / 8.2;
var LineName = 0;
var Line_Name = 0;
var L = 0;
var K = 0;
var orange_rect = 0;
var firstjudge = -1;

var title = ['wealth', 'work', 'health', 'insurance', 'loan', 'investment', 'risk', 'disaster', 'lottery', 'ill', 'unemploy', 'rank', 'preference']

var title_tip_symbol = [
    ['poor', 'rich'],
    ['low', 'mid', 'high'],
    ['0', '5', '10'],
    ['No', 'Yes'],
    ['No', 'Yes'],
    ['No', 'Yes'],
    ['No', 'Yes'],
    ['No', 'low', 'mid', 'high'],
    ['No', 'Yes'],
    ['No', 'low', 'mid', 'high'],
    ['No', 'Yes'],
    ['low', 'mid', 'high'],
    ['0', '1', '2', '3', '4', '5', '6']
]

function PaintRect(pattern_data) {
            d3.csv("data/box_calc_rank.csv").then((RectInDataR) => {
                    RectInData = pattern_data;
                    if (Rect_g != 0) Rect_g.remove()
                    if (text_g != 0) text_g.remove()

                    Rect_g = svg.append('g').attr("transform", "translate(" + 0 + "," + 5 + ")")

                    text_g = svg.append('g')
                        .attr("transform", "translate(" + 0 + "," + -5 + ")");


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
                            return height - padding.bottom - 28;
                        })
                        .attr('dx', rectWidth / 2) //dx是相对于x平移的大小
                        .attr('dy', '-1em') //dy是相对于y平移的大小
                        .text(function (d) {
                            // console.log(d.length);
                            return d;
                        })

                    var rectk = text_g.selectAll('#rectk')
                        .attr('id', 'rectk')
                        .data(title)
                        .enter()
                        .append('rect')
                        .attr('x', (d, i) => {
                            return padding.left + i * rectStep + rectWidth / 2 - (d.length * 10) / 2;
                        })
                        .attr('y', d => {
                            return height - padding.bottom - 28 - 25;
                        })
                        .attr('width', d => {
                            return d.length * 10;
                        })
                        .attr('height', d => {
                            return 10;
                        })
                        .attr('fill', (d, i) => {
                            if (i <= 6) return 'blue';
                            else return 'none';
                        })
                        .attr('fill-opacity', 0.3)

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
                    var linearF = d3.scaleLinear()
                        .domain([0, minx])
                        .range([0, 39])

                    var linearZ = d3.scaleLinear()
                        .domain([0, maxx])
                        .range([0, 39])

                    var lne_line = Math.max(Math.abs(maxx), Math.abs(minx));
                    if (lne_line > 550) lne_line = 550;

                    var line_linear = d3.scaleLinear()
                        .domain([0, lne_line])
                        .range([0, 70])

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
                        sort_ten.push(parseFloat(RectInnerData[i][129]))
                        sort_one.push(parseFloat(RectInnerData[i][39]) - parseFloat(RectInnerData[i][29]))
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
                        if (parseInt(sort_ten_inner[RectInnerData[i][129]]) <= 100)
                            RectInnerData[i][12] = 0;
                        else if (parseInt(sort_ten_inner[RectInnerData[i][129]]) <= 200)
                            RectInnerData[i][12] = 1;
                        else
                            RectInnerData[i][12] = 2

                        if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][39]) - parseFloat(RectInnerData[i][29])]) <= 100)
                            RectInnerData[i][2] = 0;
                        else if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][39]) - parseFloat(RectInnerData[i][29])]) <= 200)
                            RectInnerData[i][2] = 1;
                        else
                            RectInnerData[i][2] = 2;

                    }

                    // for (let i in RectInnerData) {
                    //     if (RectInnerData[i][19] <= 0) {
                    //         RectInnerData[i][0] = 0;
                    //     } else {
                    //         RectInnerData[i][0] = 1;
                    //     }
                    // }
                    // console.log(RectInnerData[0][1])

                    for (var i in RectInnerData) {
                        for (var j = 1; j <= 13; ++j) {
                            RectInnerData[i][j * 10 + 7] = title_tip_symbol[parseInt(j - 1)][parseInt(RectInnerData[i][j])]
                            RectInnerData[i][j * 10 + 8] = title_tip[parseInt(j - 1)][parseInt(RectInnerData[i][j])]
                        }
                    }
                    // console.log(RectInnerData)
                    let RectOuterData = []
                    RectOuterData[1] = []
                    if (num == 1)
                        RectOuterData[1][0] = {
                            'val': 0,
                            'member': []
                        }
                    else {
                        RectOuterData[1][0] = {
                            'val': 0,
                            'member': []
                        }
                        RectOuterData[1][1] = {
                            'val': 0,
                            'member': []
                        }
                    }

                    // RectOuterData[1][2] = {
                    //     'val': 0,
                    //     'member': []
                    // }
                    for (var i in RectInnerData) {
                        RectOuterData[1][RectInnerData[i][1]]['member'].push(RectInnerData[i])
                        RectOuterData[1][RectInnerData[i][1]].val += parseInt(code_Num[RectInnerData[i].code])
                    }
                    for (var i in RectOuterData[1]) {
                        RectOuterData[1][i].val /= RectOuterData[1][i]["member"].length
                    }
                    // for (var t = 1; t <= 20; ++t) {
                    for (var k = 2; k <= 13; ++k) {
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
                    for (var k = 12; k >= 1; --k) {
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
                    // for (var k = 2; k <= 12; ++k) {
                    //     // console.log(k)
                    //     if (typeof (RectOuterData[k]) == "undefined")
                    //         RectOuterData[k] = []
                    //     for (var i in RectOuterData[k - 1]) {
                    //         for (var j in RectOuterData[k - 1][i]["member"]) {
                    //             RectOuterData[k][RectOuterData[k - 1][i]["member"][j][k]] = {
                    //                 "val": 0,
                    //                 "member": []
                    //             }
                    //         }
                    //     }
                    //     for (var i in RectOuterData[k - 1]) {
                    //         for (var j in RectOuterData[k - 1][i]["member"]) {
                    //             // RectOuterData[k - 1][i]["member"][j][k] 对应的分类
                    //             RectOuterData[k][RectOuterData[k - 1][i]["member"][j][k]].val += parseInt(code_Num[RectOuterData[k - 1][i]["member"][j]["code"]])
                    //             RectOuterData[k][RectOuterData[k - 1][i]["member"][j][k]].member.push(RectOuterData[k - 1][i]["member"][j])
                    //         }
                    //     }
                    //     for (var i in RectOuterData[k]) {
                    //         RectOuterData[k][i].val /= RectOuterData[k][i]["member"].length
                    //     }
                    //     RectOuterData[k].sort(function (a, b) {
                    //         return a.val - b.val;
                    //     })
                    //     for (var i in RectOuterData[k]) {
                    //         for (var j in RectOuterData[k][i]["member"]) {
                    //             if (i == 0)
                    //                 code_Num[RectOuterData[k][i]["member"][j].code] = parseInt(j)
                    //             else
                    //                 code_Num[RectOuterData[k][i]["member"][j].code] = parseInt(j) + RectOuterData[k][i]["member"].length
                    //         }
                    //     }
                    //     // console.log(code_Num)
                    // }
                    // console.log(RectOuterData)
                    var Sankey_Rect = []
                    for (var i in RectOuterData) {
                        var s_num = 0;
                        for (var j in RectOuterData[i]) {
                            // console.log( RectOuterData[i][j].member[0])
                            // if (typeof(RectOuterData[i][j].member[0][i * 10 + 8]) == 'undefined') {
                            // console.log(RectOuterData[i][j].member[0]);
                            // }
                            a = {}
                            a["x"] = i - 1
                            a["n"] = j
                            a["start"] = s_num
                            a['rectcnt'] = RectOuterData[i].length
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

                    var Font_scale = d3.scaleLinear()
                        .domain([1, 3])
                        .range([15, 20])

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
                            // if (d.x == 9 && (num == 1 || num == 10)) {
                            if (d.rectcnt == 1) {
                                return height - padding.top - 375 + d.start * bei + 3 * steplen - 10;
                            }
                            // if (d.x == 0 || d.x == 1 || d.x == 10) {
                            if (d.rectcnt == 3) {
                                tt = 3 * steplen;
                                // } else if (d.x == 6 || d.x == 8) {
                            } else if (d.rectcnt == 4) {
                                tt = 2 * steplen;
                                // } else if (d.x != 11) {
                            } else if (d.rectcnt == 2) {
                                tt = 6 * steplen;
                            } else {
                                tt = steplen;
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
                            if (d.rectcnt == 1) {
                                return height - padding.top - 375 + d.start * bei + 3 * steplen - 10 + (d.end - d.start) * bei;
                            }
                            // if (d.x == 0 || d.x == 1 || d.x == 10) {
                            if (d.rectcnt == 3) {
                                tt = 3 * steplen;
                                // } else if (d.x == 6 || d.x == 8) {
                            } else if (d.rectcnt == 4) {
                                tt = 2 * steplen;
                                // } else if (d.x != 11) {
                            } else if (d.rectcnt == 2) {
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
                            // var color_scale = d3.scaleLinear()
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
                        .attr('text-anchor', 'head')
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
                            if (d.rectcnt == 1) {

                                return height - padding.top - 375 + d.start * bei + 3 * steplen;
                            }
                            // if (d.x == 0 || d.x == 1 || d.x == 10) {
                            if (d.rectcnt == 3) {
                                tt = 3 * steplen;
                                // } else if (d.x == 6 || d.x == 8) {
                            } else if (d.rectcnt == 4) {
                                tt = 2 * steplen;
                                // } else if (d.x != 11) {
                            } else if (d.rectcnt == 2) {
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
                    // console.log(RectOuterData);
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
                                    "Llabel": parseInt(RectOuterData[i][j]["member"][k]['12']),
                                    "treat": parseInt(RectOuterData[i][j]["member"][k].treat),
                                    'num': num,
                                    'rectcnt': RectOuterData[i].length
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


                    // 格内画线     
                    Rect_g.selectAll(".line")
                        .attr("class", "line")
                        .data(Rect_Line_Data)
                        .enter()
                        .append("line")
                        .attr("x1", (d, i) => {
                            var lenr = 0;
                            if (d.v > 550) d.v = 550;
                            if (d.v < -550) d.v = -550;
                            if (d.v < 0) lenr = -1
                            return padding.left + d.x * rectStep + 0.5 + rectWidth / 2 + lenr;
                        })
                        .attr("y1", (d, i) => {
                            // console.log(d)
                            var tt = steplen;
                            // if (d.x == 0) tt = 3 * steplen / 2;
                            // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
                            if (d.rectcnt == 1) {
                                return d.y * bei + height - padding.top - 375 + 3 * steplen - 10;
                            }
                            // if (d.x == 0 || d.x == 1 || d.x == 10) {
                            if (d.rectcnt == 3) {
                                tt = 3 * steplen;
                                // } else if (d.x == 6 || d.x == 8) {
                            } else if (d.rectcnt == 4) {
                                tt = 2 * steplen;
                                // } else if (d.x != 11) {
                            } else if (d.rectcnt == 2) {
                                tt = 6 * steplen;
                            }
                            return d.y * bei + height - padding.top - 375 + d.n * tt - 10;
                        })
                        .attr("x2", (d, i) => {
                            var len;
                            var lenr = 0;
                            if (d.v > 550) d.v = 550;
                            if (d.v < -550) d.v = -550;
                            if (d.v < 0) lenr = -1
                            len = line_linear(Math.abs(d.v)) / 2
                            if (d.v < 0)
                                len = -len;
                            // if (d.v >= 0)
                            // len = linearZ(d.v);
                            // else if (d.v <= 0)
                            // len = linearF(d.v);
                            return padding.left + d.x * rectStep + len + 0.5 + rectWidth / 2 + lenr;
                        })
                        .attr("y2", (d, i) => {

                            var tt = steplen;
                            // if (d.x == 0) tt = 3 * steplen / 2;
                            // if (d.x == 2 || d.x == 3 || d.x == 4 || d.x == 5 || d.x == 9) tt = steplen
                            if (d.rectcnt == 1) {
                                return d.y * bei + height - padding.top - 375 + 3 * steplen - 10;
                            }
                            // if (d.x == 0 || d.x == 1 || d.x == 10) {
                            if (d.rectcnt == 3) {
                                tt = 3 * steplen;
                                // } else if (d.x == 6 || d.x == 8) {
                            } else if (d.rectcnt == 4) {
                                tt = 2 * steplen;
                                // } else if (d.x != 11) {
                            } else if (d.rectcnt == 2) {
                                tt = 6 * steplen;
                            }
                            return d.y * bei + height - padding.top - 375 + d.n * tt - 10;
                        })
                        .attr("stroke", d => {
                            if (d.Llabel == 2)
                                // return "#D8483E";
                                return "#41CA77";
                            else if (d.Llabel == 1) {
                                return "#F3AC2A";
                            } else
                                // return "#41CA77";
                                return "#D8483E";
                        })
                        .attr("stroke-width", 1);


                    var path = PathCalc(p, -1, -1, num);

                    LinePaint(path[0], path[2], "black")
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
                            if (d.rectcnt == 1) {
                                return height - padding.top - 375 + d.start * bei + 3 * steplen - 10;
                            }
                            // if (d.x == 0 || d.x == 1 || d.x == 10) {
                            if (d.rectcnt == 3) {
                                tt = 3 * steplen;
                                // } else if (d.x == 6 || d.x == 8) {
                            } else if (d.rectcnt == 4) {
                                tt = 2 * steplen;
                                // } else if (d.x != 11) {
                            } else if (d.rectcnt == 2) {
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
                        .attr("stroke-width", 0)
                        .attr('stroke-opacity', 0.5)
                        .attr("fill", d => {
                            // if (d.x != 11)
                            // return color[d.n];
                            // console.log(d.n)
                            // var colora = "#FFFFFF"
                            // var colorb = "blue"

                            // let colorx = d3.interpolate(colora, colorb);
                            // var color_scale = d3.scaleLinear()
                            //     .domain([-2, 8])
                            //     .range([0, 1])
                            // if (d.x != 11)
                            //     return colorx(color_scale(parseInt(d.weight * 2)))
                            // return colorx(color_scale(parseInt(d.weight)))
                            return "black";
                        })
                        .attr("fill-opacity", d => {
                            // if (d.x != 11)
                            //     return 1
                            // else
                            //     return 1
                            return 0;
                        })
                        .on("click", d => {
                            if (Rect_data == -1) {
                                Rect_data = p;
                            }
                            RectMove(Rect_data, d, num)
                        })
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

                    // PaintTypeZ(d)

                    // // return p;
                    // ScatterPaint(coor, p, num)
                    // ScatterPaint_gain_loss(alldata, firstjudge, num, p, RectInnerData);
                    // firstjudge = 1;
                })
}
