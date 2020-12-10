// var lc_se = pro_svg.append('g')


// lc_p_g.append('rect')
//     .attr('x', 0)
//     .attr('y', 0)
//     .attr('height', 25)
//     .attr('width', 911)
//     .attr('fill', 'black')
//     .attr('fill-opacity', 0.2)

var ing = 0;

function RRR() {
    // if (r_s_g != 0) {
    //     r_s_g.remove()
    //     r_s_g = 0
    // }

    ing = lc_p_g.append('g')
    ing.append('rect')
        .attr('x', 15)
        .attr('y', 2)
        .attr('height', 20)
        .attr('width', 40)
        .attr('fill', 'black')
        .attr('fill-opacity', 0.2)
        .attr('rx', 10)
        .on('click', d => {
            k.remove()
            d_num = 0;

            name_in = []
            cnt_num = 0

            if (judge_cir_line == 1) {
                PaintCir(nam)
            } else {
                Paintjudge(nam)
            }
        })
}

// lc_p_g.append('text')
//     .attr('x', 100)
//     .attr('y', 23)
//     .attr('fill', 'black')
//     .attr('font-size', '15px')
//     .attr('text-anchor', 'middle')
//     .attr("font-family", "courier")
//     // .attr('dx', '')
//     .attr('dy', '-0.4em')
//     .text("circle")
//     .on('click', d => {
//         judge_cir_line = 1;
//         if (d_num == 0)
//         PaintCir(nam)
//         else 
//         PaintCir_2(name_in)
//         PaintLine(1)
//     })

// lc_p_g.append('text')
//     .attr('x', 40)
//     .attr('y', 23)
//     .attr('fill', 'black')
//     .attr('font-size', '15px')
//     .attr('text-anchor', 'middle')
//     .attr("font-family", "courier")
//     // .attr('dx', '')
//     .attr('dy', '-0.4em')
//     .text("line")
//     .on('click', d => {
//         judge_cir_line = 0;
//         if (d_num == 0)
//         Paintjudge(nam)
//         else
//         Paintjudge_2(name_in)
//         PaintLine(0)
//     })

// lc_p_g.append('text')
//     .attr('x', 35)
//     .attr('y', 23)
//     .attr('fill', 'black')
//     .attr('font-size', '15px')
//     .attr('text-anchor', 'middle')
//     .attr("font-family", "courier")
//     // .attr('dx', '')
//     .attr('dy', '-0.4em')
//     .text("多人")
//     .on('click', d => {
//         RRR()
//         d_num = 1;
//     })

lc_p_g.append('line')
    .attr('x1', 0)
    .attr('y1', 25)
    .attr('x2', 1290)
    .attr('y2', 25)
    .attr('fill', 'none')
    .attr('stroke', '#0a3c75')
    .attr('stroke-width', 1)


$(function () {
    d3.json(fileURL).then((type_data) => {
        d3.csv('data/box_calc.csv').then((data) => {
            // console.log(type_data)
            var peopleTreat = new Object();

            var lunGetMoney = new Object();
            for (var i in data) {
                var l = parseInt(data[i].biao);
                if (isNaN(l)) break;
                if (l < 10)
                    l = '0' + l.toString();
                else
                    l = l.toString();
                lunGetMoney[data[i].code + l] = (parseFloat(data[i]['139']) - parseFloat(data[i]['19'])).toFixed(3);
            }

            var nameLineData = new Object();
            for (let i in type_data) {
                if (name != 1 && name != type_data[i].id) continue;
                if (typeof (nameLineData[type_data[i].id]) == 'undefined') {
                    // console.log(type_data[i].l)
                    nameLineData[type_data[i].id] = new Object();
                }
                nameLineData[type_data[i].id][type_data[i].l] = type_data[i].label;
            }
            // console.log(nameLineData);
            var diagonalData = new Object();
            for (let i in nameLineData) {
                for (let j = 1; j < 20; ++j) {
                    // console.log(j * 1000000 + nameLineData[j] * 10000 + (j + 1) * 100 + nameLineData[j + 1])
                    if (typeof (diagonalData[j * 1000000 + nameLineData[i][j] * 10000 + (j + 1) * 100 + nameLineData[i][j + 1]]) == 'undefined')
                        diagonalData[j * 1000000 + nameLineData[i][j] * 10000 + (j + 1) * 100 + nameLineData[i][j + 1]] = 0;
                    diagonalData[j * 1000000 + nameLineData[i][j] * 10000 + (j + 1) * 100 + nameLineData[i][j + 1]]++;
                }
            }
            var diagonalDrawData = new Object();
            var typeDiagonalData = new Array();
            for (let i in diagonalData) {
                // console.log(diagonalData[i])
                diagonalDrawData[i] = {
                    l1: parseInt(i / 1000000),
                    l2: parseInt((i % 10000) / 100),
                    label1: parseInt((i % 1000000) / 10000),
                    label2: parseInt(i % 100),
                    typeNum: diagonalData[i],
                    source: {
                        y: p_xscale(parseInt(i / 1000000)),
                        x: p_yscale(parseInt((i % 1000000) / 10000))
                    },
                    target: {
                        y: p_xscale(parseInt((i % 10000) / 100)),
                        x: p_yscale(parseInt(i % 100))
                    }
                };
                typeDiagonalData.push(diagonalDrawData[i]);
            }
            // console.log(diagonalDrawData)
            var typeLineData = new Object();
            var typePieData = new Object();
            for (let i = 1; i <= 20; ++i) {
                typeLineData[i] = new Object();
                typePieData[i] = new Object();
                for (let j = 0; j <= maxY; ++j) {
                    typeLineData[i][j] = 0;
                    typePieData[i][j] = [0, 0];
                }
            }
            // console.log(nameLineData);
            for (let i in nameLineData) {
                for (let j in nameLineData[i]) {
                    // console.log(j);
                    typeLineData[j][nameLineData[i][j]]++;
                    var sn;
                    if (j < 10)
                        sn = '0' + j.toString();
                    else
                        sn = j.toString();
                    if (lunGetMoney[i + sn] < 0) {
                        typePieData[j][nameLineData[i][j]][0]++;
                    } else {
                        typePieData[j][nameLineData[i][j]][1]++;
                    }
                }
            }
            var maxCir = 0;
            var typeCircleData = new Array();
            for (let i = 1; i <= 20; ++i) {
                for (let j in typeLineData[i]) {
                    if (typeLineData[i][j] != 0 && !isNaN(typeLineData[i][j])) {
                        maxCir = Math.max(maxCir, typeLineData[i][j]);
                        typeCircleData.push({
                            lun: i,
                            type: j,
                            typeNum: typeLineData[i][j],
                            pieNum: typePieData[i][j]
                        });
                    }
                }
            }

            var circleScale = d3.scaleLinear()
                .domain([0, maxCir])
                .range([2, 9]);

            

            var lsx = new Object();
            var lsxNum = 0;
            for (var i in type_data) {
                if (typeof (lsx[type_data[i].label]) == "undefined") {
                    lsx[type_data[i].label] = 1;
                    lsxNum++;
                }
            }

            // console.log(lsxNum);

            var minY = 999,
                maxY = -999;
            for (var i in type_data) {
                maxY = Math.max(maxY, type_data[i].label);
                minY = Math.min(minY, type_data[i].label);
            }

            var p_xscale = d3.scaleLinear()
                .domain([0, 20.5])
                .range([0, p_width - 20])

            var p_yscale = d3.scaleLinear()
                .domain([maxY, minY])
                // .domain([-50, 150])
                .range([p_height - 50, 0])

            let edges = new Array();
            let ed = new Object();
            for (let i = 0; i <= lsxNum; ++i) {
                for (let j = 0; j <= lsxNum; ++j) {
                    if (j >= i) {
                        ed[i * 100 + j] = {
                            source: i,
                            target: j,
                            relation: "",
                            value: 0
                        }
                        ed[j * 100 + i] = ed[i * 100 + j];
                    }
                }
            }
            // console.log(ed)

            let nameData = new Object();
            for (let i in type_data) {
                if (typeof (nameData[type_data[i].id]) == 'undefined') {
                    nameData[type_data[i].id] = new Array();
                }
                nameData[type_data[i].id].push(type_data[i]);
            }
            // console.log(nameData);

            for (let i in nameData) {
                for (let j = 0; j < 19; ++j) {
                    // console.log(nameData[i][j].label * 100 + nameData[i][j + 1].label)
                    ed[parseInt(nameData[i][j].label) * 100 + parseInt(nameData[i][j + 1].label)].value++;
                }
            }

            let valuemaxz = -1;
            let valueminz = 9000;

            for (let i = 0; i <= lsxNum; ++i) {
                for (let j = 0; j <= lsxNum; ++j) {
                    if (j >= i && ed[i * 100 + j].value != 0) {
                        if (valuemaxz < ed[i * 100 + j].value) {
                            valuemaxz = ed[i * 100 + j].value;
                        }
                        if (valueminz > ed[i * 100 + j].value) {
                            valueminz = ed[i * 100 + j].value;
                        }
                        // console.log(ed[i * 100 + j]);
                        edges.push(ed[i * 100 + j])
                    }
                }
            }
            // console.log(edges);
            // console.log(valuemaxz)
            $("#slider-range").slider({
                range: true,
                min: valueminz,
                max: valuemaxz,
                values: [0, valuemaxz],
                slide: function (event, ui) {
                    $("#timex").val(ui.values[0] + " - " + ui.values[1]);
                    // console.log(ui)

                    connectRad.attr('opacity', d => {
                        // console.log(d.value)
                        if (d.value >= ui.values[0] && d.value <= ui.values[1])
                            return 0.2;
                        else
                            return 0;
                    })
                }
            });
            $("#slider-line").slider({
                range: true,
                min: 1,
                max: maxCir,
                values: [0, valuemaxz],
                slide: function (event, ui) {
                    $("#timex").val(ui.values[0] + " - " + ui.values[1]);
                    // console.log(ui)

                    connectRad.attr('opacity', d => {
                        // console.log(d.value)
                        if (d.value >= ui.values[0] && d.value <= ui.values[1])
                            return 0.2;
                        else
                            return 0;
                    })
                }
            });
            $("#slider-pie").slider({
                range: true,
                min: 1,
                max: maxCir,
                values: [0, valuemaxz],
                slide: function (event, ui) {
                    $("#timex").val(ui.values[0] + " - " + ui.values[1]);
                    // console.log(ui)

                    connectRad.attr('opacity', d => {
                        // console.log(d.value)
                        if (d.value >= ui.values[0] && d.value <= ui.values[1])
                            return 0.2;
                        else
                            return 0;
                    })
                }
            });
        })
    })
});