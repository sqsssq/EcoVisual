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
            console.log(d)
            d = d.code
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
            if (i > 0 && i < 5)
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
            return '🚹';
            else
            return '🚺'
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
        .attr('x', paddingx.left + 390)
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

    Click_cir(num, value)
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
    tcircle.style("fill-opacity", d => {
            // console.log(d.id)
            // Fiflag = 1;
            if (d.id != value.toString()) {
                return 0;
            } else {
                return 0.5;
            }
        })
        .style('stroke-opacity', d => {
            if (d.id != value.toString()) {
                return 0;
            } else {
                return 0.5
            }
        })
        .style("r", 10)

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
        d3.json(coorp, function (coor) {
            // console.log(coor)
            var d = [];
            for (var i in d1) {
                if (parseInt(d1[i].biao) == num)
                    d.push(d1[i])
            }

            work = []
            final = []

            // 格内数据
            var ext = []
            ext.push([0, 0])

            for (var i = 1; i <= 9; ++i) {
                var t = []
                for (var k = 0; k < 4; ++k) {
                    t[k] = 0
                }
                for (var k = 0; k < 304; ++k) {
                    t[parseInt(d[k][i])]++;
                }
                ext.push(t)
            }

            var type = []

            for (var i = 1; i <= 9; ++i) {
                var n = 0;
                for (j in ext[i]) {
                    a = {}
                    a["x"] = i;
                    a["n"] = n;
                    n++;
                    // if (t[i][j] == 0) continue;
                    if (j == 0) {
                        a["start"] = 0;
                        a["end"] = ext[i][0];
                    } else {
                        a["start"] = ext[i][j - 1];
                        ext[i][j] = ext[i][j - 1] + ext[i][j];
                        a["end"] = ext[i][j];
                    }
                    type.push(a);
                }
            }

            // ------------------------------------------------

            var p = {}


            for (var i in d) {
                p[d[i].code] = {};
            }

            for (var k = 1; k <= 9; ++k) {
                var cnt = 0;
                for (var i in d) {
                    a = {}
                    if (d[i][k] == 0) {
                        a["x"] = k;
                        a["y"] = cnt++;
                        a["v"] = parseFloat(d[i][k * 10 + 1]);
                        a["n"] = parseInt(d[i][k]);
                        a["id"] = d[i].code;
                        a["label"] = coor[i].label;
                        p[d[i].code][k] = a;
                    } else {
                        a["x"] = k;
                        ext[k][d[i][k] - 1]++;
                        // console.log(ext[k][d[i][k] - 1])
                        a["y"] = ext[k][d[i][k] - 1];
                        a["v"] = parseFloat(d[i][k * 10 + 1]);
                        a["n"] = parseInt(d[i][k]);
                        a["id"] = d[i].code;
                        a["label"] = coor[i].label;
                        p[d[i].code][k] = a;
                    }
                    // work.push(a);
                }
            }

            for (var i in d) {
                a = {}
                a["x"] = 0;
                a["y"] = parseInt(p[d[i].code][1].y);
                a["v"] = parseFloat(d[i].work);
                a["n"] = 0;
                a["id"] = d[i].code;
                a["label"] = coor[i].label;
                // p[d[i].code] = {};
                p[d[i].code][0] = a;
                // work.push(a);
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


}