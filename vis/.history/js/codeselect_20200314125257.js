$(document).ready(function () {
    $("#JqScroll").scroll(function () {
        //   $("span").text(x+=1);
    });
});

var paddingx = {
    bottom: 5,
    top: 5,
    left: 5,
    right: 5
}

var cnt_num = 0;

var name_in = []

var codeColor = ['#8dc236', '#d20080', '#1b998b', '#f1c710', '#4591dc']

// var CodeTsvg = d3.select("#JqTitle").append("svg")
//     .attr("width", 374)
//     .attr("height", 24)

var r_s_g = 0;

var T = ['编号', '性别', '党员', '生活', '惯用手', '拖延症', '党员', '父亲学历', '母亲学历', '兼职', '收入', '志愿者', '消费']

var line_g = 0;

// CodeTsvg.selectAll('#at')
//     .attr("id", "at")
//     .data(T)
//     .enter()
//     .append("text")
//     .attr('fill', 'black')
//     .attr('font-size', (d, i) => {
//         // if (i == 0) return "20px";
//         return "15px";
//     })
//     .attr('text-anchor', 'middle')
//     .attr("font-family", "courier")
//     .attr('x', function (d, i) {
//         return paddingx.left + 40 + i * 70;
//     })
//     .attr('y', function (d, i) {
//         return 20;
//     })
//     // .attr('dx', rectWidth / 2) //dx是相对于x平移的大小
//     // .attr('dy', '1em') //dy是相对于y平移的大小
//     .text(function (d) {
//         return d;
//     })

// CodeTsvg.selectAll('#lc')
//     .attr('id', 'lc')
//     .append('g')
//     .append('line')
//     .attr('x1', 15)
//     .attr('y1', 15)
//     .attr('x2', 300)
//     .attr('y2', 15)
//     .attr('stroke', 'blue')
//     .attr('stroke-width', '1px')

var Codesvg = d3.select("#JqScroll").append("svg")
    .attr("width", 930)
    .attr("height", 6080)
// .attr('transform', 'translate(' + 0 + ',' + -5+')')

// var r_s_g = 0

var gl_g = 0;

function Peo_gain_loss(num) {
    d3.csv('data/box.csv', function (dx) {
        // console.log(dx)
        dx_data = []
        if (gl_g != 0) {
            gl_g.remove()
            gl_g = 0
        }
        var gmax = -1000000
        var lmin = 9999
        for (var i in dx) {
            if (dx[i].biao == num) {
                dx_data.push(dx[i])
                if (parseFloat(dx[i][91]) > gmax) gmax = parseFloat(dx[i][91])
                if (parseFloat(dx[i][91]) < lmin) lmin = parseFloat(dx[i][91])
            }
        }
        var gain_scale = d3.scale.linear()
            .domain([0, gmax])
            .range([0, 400])
        var loss_scale = d3.scale.linear()
            .domain([0, lmin])
            .range([0, 400])
        // console.log(dx_data)
        gl_g = Codesvg.selectAll('#glr')
            .attr('id', 'glr')
            .data(dx_data)
            .enter()
            .append("g")
            .append("rect")
            .attr("x", paddingx.left)
            .attr("y", (d, i) => {
                return (i + 1) * 20
            })
            .attr("width", (d, i) => {
                // console.log(d)
                if (parseFloat(d[91]) < 0)
                    return loss_scale(parseFloat(d[91]))
                else {
                    return gain_scale(parseFloat(d[91]))
                }
            })
            .attr("height", 20)
            .attr("fill", d => {
                if (parseFloat(d[91]) >= 0)
                    return '#00FF00'
                else
                    return 'red'
            })
            .attr('fill-opacity', 0.4)
            // .attr("stroke-width", 0.5)
            // .attr("stroke", "black")
            // .attr('stroke-opacity', 0.8)
            .on('click', (d, i) => {
                // console.log(d)
                d = d.code
                if (d_num == 0) {
                    if (judge_cir_line == 0)
                        Paintjudge(d);
                    else
                        PaintCir(d);
                    PaintSha(number, d, i);
                    IceLine(d, num)
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
                    name_in.push(d)
                    if (judge_cir_line == 1) {
                        PaintCir_2(name_in)
                    } else {
                        Paintjudge_2(name_in)
                    }
                    // name_in = []
                    // cnt_num = 0
                    // }
                    IceLine_2(name_in, num)
                    PaintSha_2(number, name_in, i);
                }
            })
    })
}

var ct = 0;

d3.csv("data/back.csv", function (d) {
    // console.log(d)

    Peo_gain_loss(number)
    var cn = []
    var cage = [],
        cgen = [],
        clife = [],
        chand = [],
        ctuo = [],
        cdang = [],
        cfa = [],
        cmo = [],
        cjinazhi = [],
        cshou = [],
        cxiao = [],
        cxian = [],
        czhi = []
    for (var i in d) {
        cn.push(d[i].code)
        cage.push(d[i].age)
        cgen.push(d[i].gender)
        clife.push(d[i].life)
        chand.push(d[i].hand)

        ctuo.push(d[i].tuo)
        cdang.push(d[i].dangyuan)
        cfa.push(d[i].fa)
        cmo.push(d[i].mo)

        cjinazhi.push(d[i].jianzhi)
        cshou.push(d[i].shouru)
        cxiao.push(d[i].xiaofei)
        cxian.push(d[i].xianxue)
        czhi.push(d[i].zhiyuanzhe)
    }

    Codesvg.selectAll('#topt')
        // .attr('id', 'topt')
        .data(T)
        .enter()
        // .append('g')
        .append('text')
        .attr('fill', 'black')
        .attr('font-size', (d, i) => {
            // if (i == 0) return "20px";
            return "15px";
        })
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .attr('x', function (d, i) {
            if (i > 0 && i < 6)
                return paddingx.left + 45 + i * 55;
            else
                return paddingx.left + 40 + i * 70;

        })
        .attr('y', function (d, i) {
            return 15;
        })
        .text(function (d) {
            return d;
        })


    // var codeCir = Codesvg.selectAll("#codeCir")
    //     .attr("id", "codeCir")
    //     .data(cn)
    //     .enter()
    //     .append('g')
    //     .append('circle')
    //     .attr('cx', 25)
    //     .attr('cy', (d, i) => {
    //         // console.log(i)
    //         return i * 20 + 10;
    //     })
    //     .attr('r', 5)
    //     .attr('stroke', (d, i) => {
    //         return codeColor[i % 5]
    //     })
    //     .attr('fill', 'white')
    //     .on('click', (d, i) => {
    //         Click_cir(i, d)
    //     })

    // // console.log(cn)

    var codeText = Codesvg.selectAll("#CodeT")
        .attr("id", "CodeT")
        .append("g")
        .data(cn)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("font-size", 14)
        .attr("text-anchor", "middle")
        .attr('x', paddingx.left + 40)
        .attr('y', (d, i) => {
            return (i + 1) * 20
        })
        .attr('dy', '1em')
        .text(d => {
            return d;
        })
        .on('click', (d, i) => {
            console.log(d)
            if (d_num == 0) {
                if (judge_cir_line == 0)
                    Paintjudge(d);
                else
                    PaintCir(d);

                PaintSha(number, d, i);
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
                    // name_in = []
                    // cnt_num = 0

                }
                PaintSha_2(number, d, i);
            }


        })

    Codesvg.selectAll("#CodeT")
        .attr("id", "CodeT")
        .append("g")
        .data(cgen)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("font-size", 14)
        .attr("text-anchor", "middle")
        .attr('x', paddingx.left + 100)
        .attr('y', (d, i) => {
            return (i + 1) * 20
        })
        .attr('dy', '1em')
        .text(d => {
            if (d == '男')
                return '♂';
            else
                return '♀'
        })

    // Codesvg.selectAll("#CodeT")
    //     .attr("id", "CodeT")
    //     .append("g")
    //     .data(cage)
    //     .enter()
    //     .append("text")
    //     .attr("fill", "black")
    //     .attr("font-size", 14)
    //     .attr("text-anchor", "middle")
    //     .attr('x', paddingx.left + 165)
    //     .attr('y', (d, i) => {
    //         return (i + 1) * 20
    //     })
    //     .attr('dy', '1em')
    //     .text(d => {
    //         return d;
    //     })

    Codesvg.selectAll("#CodeT")
        .attr("id", "CodeT")
        .append("g")
        .data(cdang)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("font-size", 14)
        .attr("text-anchor", "middle")
        .attr('x', paddingx.left + 155)
        .attr('y', (d, i) => {
            return (i + 1) * 20
        })
        .attr('dy', '1em')
        .text(d => {
            if (d == '是')
                return '✅';
            else
                return '❎'
        })

    Codesvg.selectAll("#CodeT")
        .attr("id", "CodeT")
        .append("g")
        .data(clife)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("font-size", 14)
        .attr("text-anchor", "middle")
        .attr('x', paddingx.left + 210)
        .attr('y', (d, i) => {
            return (i + 1) * 20
        })
        .attr('dy', '1em')
        .text(d => {
            if (d == '农村')
                return '🌄';
            else
                return '🏢'
        })

    Codesvg.selectAll("#CodeT")
        .attr("id", "CodeT")
        .append("g")
        .data(chand)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("font-size", 14)
        .attr("text-anchor", "middle")
        .attr('x', paddingx.left + 265)
        .attr('y', (d, i) => {
            return (i + 1) * 20
        })
        .attr('dy', '1em')
        .text(d => {
            if (d == '左手')
                return '👈';
            else
                return '👉';
        })

    Codesvg.selectAll("#CodeT")
        .attr("id", "CodeT")
        .append("g")
        .data(ctuo)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("font-size", 14)
        .attr("text-anchor", "middle")
        .attr('x', paddingx.left + 320)
        .attr('y', (d, i) => {
            return (i + 1) * 20
        })
        .attr('dy', '1em')
        .text(d => {
            return d;
        })

    Codesvg.selectAll("#CodeT")
        .attr("id", "CodeT")
        .append("g")
        .data(cdang)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("font-size", 14)
        .attr("text-anchor", "middle")
        .attr('x', paddingx.left + 460)
        .attr('y', (d, i) => {
            return (i + 1) * 20
        })
        .attr('dy', '1em')
        .text(d => {
            return d;
        })

    Codesvg.selectAll("#CodeT")
        .attr("id", "CodeT")
        .append("g")
        .data(cfa)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("font-size", 14)
        .attr("text-anchor", "middle")
        .attr('x', paddingx.left + 530)
        .attr('y', (d, i) => {
            return (i + 1) * 20
        })
        .attr('dy', '1em')
        .text(d => {
            return d;
        })

    Codesvg.selectAll("#CodeT")
        .attr("id", "CodeT")
        .append("g")
        .data(cmo)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("font-size", 14)
        .attr("text-anchor", "middle")
        .attr('x', paddingx.left + 600)
        .attr('y', (d, i) => {
            return (i + 1) * 20
        })
        .attr('dy', '1em')
        .text(d => {
            return d;
        })

    Codesvg.selectAll("#CodeT")
        .attr("id", "CodeT")
        .append("g")
        .data(cjinazhi)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("font-size", 14)
        .attr("text-anchor", "middle")
        .attr('x', paddingx.left + 670)
        .attr('y', (d, i) => {
            return (i + 1) * 20
        })
        .attr('dy', '1em')
        .text(d => {
            return d;
        })

    Codesvg.selectAll("#CodeT")
        .attr("id", "CodeT")
        .append("g")
        .data(cshou)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("font-size", 14)
        .attr("text-anchor", "middle")
        .attr('x', paddingx.left + 740)
        .attr('y', (d, i) => {
            return (i + 1) * 20
        })
        .attr('dy', '1em')
        .text(d => {
            return d;
        })

    Codesvg.selectAll("#CodeT")
        .attr("id", "CodeT")
        .append("g")
        .data(czhi)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("font-size", 14)
        .attr("text-anchor", "middle")
        .attr('x', paddingx.left + 810)
        .attr('y', (d, i) => {
            return (i + 1) * 20
        })
        .attr('dy', '1em')
        .text(d => {
            return d;
        })

    Codesvg.selectAll("#CodeT")
        .attr("id", "CodeT")
        .append("g")
        .data(cxiao)
        .enter()
        .append("text")
        .attr("fill", "black")
        .attr("font-size", 14)
        .attr("text-anchor", "middle")
        .attr('x', paddingx.left + 880)
        .attr('y', (d, i) => {
            return (i + 1) * 20
        })
        .attr('dy', '1em')
        .text(d => {
            return d;
        })

    var codeRect = Codesvg.selectAll("#CodeRect")
        .attr("id", "CodeRect")
        .data(d)
        .enter()
        .append("g")
        .append("rect")
        .attr("x", paddingx.left)
        .attr("y", (d, i) => {
            return i * 20
        })
        .attr("width", 922)
        .attr("height", 20)
        .attr("fill", "none")
        .attr('fill-opacity', 0)
        .attr("stroke-width", 0.5)
        .attr("stroke", "black")
        .attr('stroke-opacity', 0.8)
        .on('click', (d, i) => {
            console.log(d)
            if (judge_cir_line == 0)
                Paintjudge(d);
            else
                PaintCir(d)
            PaintSha(number, d, i);
        })
})

function PaintSha(num, value, k) {
    if (r_s_g != 0) {
        r_s_g.remove()
        r_s_g = 0;
    }

    r_s_g = Codesvg.append('g')

    ct = r_s_g
        // .selectAll("#Ct")
        // .attr("id", "Ct")
        // .append("g")
        .append("rect")
        .attr("x", paddingx.left)
        .attr("y", (k + 1) * 20)
        .attr("width", 923)
        .attr("height", 20)
        .attr("fill", "blue")
        .attr('fill-opacity', 0.3)
    // .attr("stroke-width", 0.5)
    // .attr("stroke", "blue")

    Click_cir(num, value)
}

function PaintSha_2(num, value, k) {
    // if (ct != 0) {
    //     ct.remove()
    //     ct = 0;
    // }
    if (r_s_g == 0)
        r_s_g = Codesvg.append('g')

    ct = r_s_g
        // .selectAll("#Ct")
        // .attr("id", "Ct")
        // .append("g")
        .append("rect")
        .attr("x", paddingx.left)
        .attr("y", (k + 1) * 20)
        .attr("width", 923)
        .attr("height", 20)
        .attr("fill", "blue")
        .attr('fill-opacity', 0.3)
    // .attr("stroke-width", 0.5)
    // .attr("stroke", "blue")

    Click_cir_2(num, value)
}

function Click_cir(num, value) {
    console.log(num)

    // Codesvg.append('g')
    //     .append('circle')
    //     .attr('cx', 25)
    //     .attr('cy', num * 20 + 10)
    //     .attr('r', 5)
    //     .attr('fill', codeColor[num % 5])

    if (LineName != 0) LineName.remove()
    if (line_g != 0) {
        line_g.remove()
    }

    var judge_line = [],
        j_line = []
    tcircle.style("fill-opacity", d => {
            // console.log(d.id)
            // Fiflag = 1;
            if (d.id != value.toString()) {
                return 1;
            } else {
                return 1;
            }
        })
        .style('stroke-opacity', d => {
            if (d.id != value.toString()) {
                return 0.3;
            } else {
                judge_line.push(d)
                return 0.3
            }
        })
        .attr('fill', 'blue')
    // .style("r", 1)
    // console.log(judge_line)
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
        d3.json('data/Scatter/tsne_ability_36_x.json', function (coor) {
            d3.csv("data/box_calc.csv", function (RectInData) {
                // console.log(coor)
                var d = [];
                for (var i in d1) {
                    if (parseInt(d1[i].biao) == num)
                        d.push(d1[i])
                }
                var padding = {
                    top: 5,
                    right: 10,
                    bottom: 5,
                    left: 10
                };

                // 计算散点连接线
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

                var LinePath = d3.svg.line()
                    .x(d => {
                        // console.log(d)
                        return padding.left + xScale(d.x);
                    })
                    .y(d => {
                        return yScale(d.y);
                    })
                    .interpolate("cardinal") //插值模式

                line_g = ssvg.append("path")
                    .attr("d", LinePath(judge_line))
                    .style('fill', 'none')
                    .attr('stroke', 'tomato')
                    .attr('stroke-width', 1)



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

                // var type = []

                // for (var i = 1; i <= 9; ++i) {
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

                // // ------------------------------------------------

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
                //         // work.push(a);
                //     }
                // }

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
                //     // work.push(a);
                // }

                var code_Label = {} // 记录当前散点图中对应id的label
                for (var i in coor) {
                    if (parseInt(coor[i].l) == num) {
                        code_Label[coor[i].id] = coor[i].label
                    }
                }
                // 减少杂化
                let RectInnerData = []
                for (var i in RectInData) {
                    if (parseInt(RectInData[i].biao) == num) {
                        RectInnerData.push(RectInData[i])
                    }
                }
                var sort_ten = [] // 第十列排序
                var sort_ten_inner = {}
                var code_Num = {} // 记录编号排布
                for (var i in RectInnerData) {
                    sort_ten.push(parseFloat(RectInnerData[i][119]))
                    code_Num[RectInnerData[i].code] = i
                }
                sort_ten.sort(function (a, b) {
                    return a - b;
                })
                for (var i in sort_ten) {
                    sort_ten_inner[sort_ten[i]] = i;
                }
                for (var i in RectInnerData) {
                    if (parseInt(sort_ten_inner[RectInnerData[i][119]]) <= 100)
                        RectInnerData[i][11] = 0;
                    else if (parseInt(sort_ten_inner[RectInnerData[i][119]]) <= 200)
                        RectInnerData[i][11] = 1;
                    else
                        RectInnerData[i][11] = 2
                }
                let RectOuterData = []
                RectOuterData[1] = []
                RectOuterData[1][0] = {
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
                for (var t = 1; t <= 20; ++t) {
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
                }
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
                                "label": code_Label[RectOuterData[i][j]["member"][k].code]
                            }
                            p[a.id][i - 1] = a;
                        }
                        s_num += RectOuterData[i][j].member.length
                    }
                }


                // console.log(p)

                var ans = {}

                ans[value.toString()] = p[value.toString()]

                // console.log(p[value.toString()])
                // console.log(ans)

                var path = PathCalc(ans, -1, -1);

                LinePaint_2(path[0], path[2], "black")
            })
        })
    })
}

function Click_cir_2(num, value_x) {
    console.log(num)

    // Codesvg.append('g')
    //     .append('circle')
    //     .attr('cx', 25)
    //     .attr('cy', num * 20 + 10)
    //     .attr('r', 5)
    //     .attr('fill', codeColor[num % 5])

    if (LineName != 0) LineName.remove()
    if (line_g != 0) {
        line_g.remove()
    }

    var judge_line = [],
        j_line = []
    // tcircle.style("fill-opacity", d => {
    //         // console.log(d.id)
    //         // Fiflag = 1;
    //         if (d.id != value.toString()) {
    //             return 1;
    //         } else {
    //             return 1;
    //         }
    //     })
    //     .style('stroke-opacity', d => {
    //         if (d.id != value.toString()) {
    //             return 0.3;
    //         } else {
    //             judge_line.push(d)
    //             return 0.3
    //         }
    //     })
    //     .attr('fill', 'blue')
    // .style("r", 1)
    // console.log(judge_line)
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
        d3.json('data/Scatter/tsne_x.json', function (coor) {
            d3.csv("data/box_calc.csv", function (RectInData) {
                // console.log(coor)
                var d = [];
                for (var i in d1) {
                    if (parseInt(d1[i].biao) == num)
                        d.push(d1[i])
                }
                var padding = {
                    top: 5,
                    right: 10,
                    bottom: 5,
                    left: 10
                };

                // 计算散点连接线
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

                var LinePath = d3.svg.line()
                    .x(d => {
                        // console.log(d)
                        return padding.left + xScale(d.x);
                    })
                    .y(d => {
                        return yScale(d.y);
                    })
                    .interpolate("cardinal") //插值模式

                line_g = ssvg.append("path")
                    .attr("d", LinePath(judge_line))
                    .style('fill', 'none')
                    .attr('stroke', 'tomato')
                    .attr('stroke-width', 1)



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

                // var type = []

                // for (var i = 1; i <= 9; ++i) {
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

                // // ------------------------------------------------

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
                //         // work.push(a);
                //     }
                // }

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
                //     // work.push(a);
                // }

                var code_Label = {} // 记录当前散点图中对应id的label
                for (var i in coor) {
                    if (parseInt(coor[i].l) == num) {
                        code_Label[coor[i].id] = coor[i].label
                    }
                }
                // 减少杂化
                let RectInnerData = []
                for (var i in RectInData) {
                    if (parseInt(RectInData[i].biao) == num) {
                        RectInnerData.push(RectInData[i])
                    }
                }
                var sort_ten = [] // 第十列排序
                var sort_ten_inner = {}
                var code_Num = {} // 记录编号排布
                for (var i in RectInnerData) {
                    sort_ten.push(parseFloat(RectInnerData[i][119]))
                    code_Num[RectInnerData[i].code] = i
                }
                sort_ten.sort(function (a, b) {
                    return a - b;
                })
                for (var i in sort_ten) {
                    sort_ten_inner[sort_ten[i]] = i;
                }
                for (var i in RectInnerData) {
                    if (parseInt(sort_ten_inner[RectInnerData[i][119]]) <= 100)
                        RectInnerData[i][11] = 0;
                    else if (parseInt(sort_ten_inner[RectInnerData[i][119]]) <= 200)
                        RectInnerData[i][11] = 1;
                    else
                        RectInnerData[i][11] = 2
                }
                let RectOuterData = []
                RectOuterData[1] = []
                RectOuterData[1][0] = {
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
                for (var t = 1; t <= 20; ++t) {
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
                }
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
                                "label": code_Label[RectOuterData[i][j]["member"][k].code]
                            }
                            p[a.id][i - 1] = a;
                        }
                        s_num += RectOuterData[i][j].member.length
                    }
                }


                // console.log(p)
                for (var i in value_x) {
                    var value = value_x[i];
                    var ans = {}

                    ans[value.toString()] = p[value.toString()]

                    // console.log(p[value.toString()])
                    // console.log(ans)

                    var path = PathCalc(ans, -1, -1);

                    LinePaint_2(path[0], path[2], "black")
                }

            })
        })
    })
}