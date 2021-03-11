var p_width = 1290;
var p_height = 306

var judge_cir_line = 0

var d_num = 0;

var peo_svg = d3.select("#Tree").append('svg')
    .attr('width', p_width)
    .attr('height', p_height)

var lc_p_g = 0;

lc_p_g = peo_svg.append('g')

var peo_g = 0;
var background_g = 0;

var nam = 0;
// var color = ['#00a676', '#f9c80e', '#3abeff', '#df19c1', '#ff206e', '#f08700', '#0091c9', '#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD']
var color_kgggg = ['#434348', '#90ed7d', '#f7a35c', '#8085e9',
    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
]

var BoxIn = new Object();

function OrRect(data, color) {
    d3.csv('data/back.csv', d => {
        // console.log(data)


        var nameList = {}

        for (var i in d) {
            nameList[d[i].code] = i
        }


        // if (orret_g != 0) {
        //     orret_g.remove()
        // }

        // console.log(nameList)

        // orret_g = Codesvg.append('g')

        // orret_g.selectAll('#org_r')
        //     .attr('id', 'org_r')
        //     .data(data)
        //     .enter()
        //     .append('rect')
        //     .attr("x", paddingx.left)
        //     .attr("y", d => {
        //         return (parseInt(nameList[d]) + 1) * 20
        //     })
        //     .attr("width", 923)
        //     .attr("height", 20)
        //     .attr("fill", color)
        //     .attr('fill-opacity', 0.3)
        //     .on('click', d => {
        //         if (d_num == 0) {
        //             if (judge_cir_line == 0)
        //                 Paintjudge(d);
        //             else
        //                 PaintCir(d);
        //         } else {
        //             if (cnt_num < 1) {
        //                 cnt_num++;
        //                 name_in.push(d)
        //                 if (judge_cir_line == 1)
        //                     PaintCir(d)
        //                 else
        //                     Paintjudge(d)
        //             } else {
        //                 cnt_num++;
        //                 name_in.push(d)
        //                 if (judge_cir_line == 1) {
        //                     PaintCir_2(name_in)
        //                 } else {
        //                     Paintjudge_2(name_in)
        //                 }
        //             }
        //         }
        //     })
    })
}
var tooltipx = d3.select("body")
    .append("div")
    .attr("class", "tooltipx")
    .style("opacity", 0.0)

function PaintBackground(opac, px, pn) {
    nam = name;
    d3.csv('data/box_calcr.csv', function (data) {
        if (opac == 1) {
            if (peo_g != 0) peo_g.remove();
        }
        if (background_g != 0) background_g.remove();

        background_g = peo_svg.append('g')
            .attr("transform", "translate(" + 0 + "," + 45 + ")")

        // console.log(data)
        p_data = []
        pie_data = []

        var p_max = -100000
        var p_min = 100000

        // for (var d in data) {
        //     if (data[d].code == name) {
        //         pie_data.push(data[d])
        //         p_ = {}
        //         p_['name'] = name
        //         p_['judge'] = [parseInt(data[d]['1']), parseInt(data[d]['2']), parseInt(data[d]['3']), parseInt(data[d]['4']), parseInt(data[d]['5']), parseInt(data[d]['6']), parseInt(data[d]['7']), parseInt(data[d]['8']), parseInt(data[d][9]), parseInt(data[d]['risk'])]
        //         p_['price'] = parseFloat(data[d]['91'])
        //         if (p_max < parseFloat(data[d]['91'])) p_max = parseFloat(data[d]['91'])
        //         if (p_min > parseFloat(data[d]['91'])) p_min = parseFloat(data[d]['91'])
        //         p_['lun'] = data[d]['biao']
        //         p_['sum'] = data[d]
        //         p_data.push(p_)
        //     }
        //     // console.log(data[d])
        // }

        var p_xscale = d3.scale.linear()
            .domain([0.5, 20.5])
            .range([40, 1260])

        // var p_yscale = d3.scale.linear()
        //     .domain([parseInt(p_min), parseInt(p_max)])
        //     // .domain([-50, 150])
        //     .range([255, 0])

        // if (parseInt(p_min) > 0) p_min = 0
        // if (parseInt(p_max) < 0) p_max = 0

        var p_yscale = d3.scale.linear()
            .domain([pn, px])
            // .domain([-50, 150])
            .range([245, 0])
        // console.log(line_data)

        // console.log(dif_min)
        // console.log(dif_max)

        var xAxis = d3.svg.axis().scale(p_xscale).ticks(0).tickFormat(d3.format("d")).orient("bottom");
        var yAxis = d3.svg.axis().scale(p_yscale).ticks(10).tickFormat(d3.format()).orient("left"); //添加一个g用于放x轴

        background_g.append("g")
            .attr("class", "axis")
            // .attr("transform", "translate(" + 0 + "," + 255 + ")")
            .attr("transform", "translate(" + 0 + "," + p_yscale(0) + ")")
            .attr("stroke-width", 0.1)
            .call(xAxis)
            .append('text')
            .text('轮数')
            // .attr("transform", "rotate(-90)") //text旋转-90°
            .attr("text-anchor", "end") //字体尾部对齐
            .attr("dx", "160em")
            .attr("dy", "0.5em") //沿y轴平移一个字体的大小
        background_g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + 40 + "," + 0 + ")")
            .call(yAxis)
            .append('text')
            .text('总收益')
            // .attr("transform", "rotate(-90)") //text旋转-90°
            .attr("text-anchor", "end") //字体尾部对齐
            .attr("dx", "3em")
            .attr("dy", "0.5em") //沿y轴平移一个字体的大小;

        let Box_Plot_data = new Object();

        for (let i = 1; i <= 20; ++i) {
            Box_Plot_data[i] = new Array();
        }

        for (let i in data) {
            if (Math.abs(parseFloat(data[i]['129'])) <= 600)
                Box_Plot_data[parseInt(data[i]['biao'])].push(parseFloat(data[i]['129']));
        }

        let Box_Plot = new Object();
        for (let i = 1; i <= 20; ++i) {
            Box_Plot[i] = new Object();
            Box_Plot_data[i].sort(function (a, b) {
                return a - b
            })
            Box_Plot[i]['high'] = Box_Plot_data[i][Box_Plot_data[i].length - 1];
            Box_Plot[i]['midH'] = Box_Plot_data[i][parseInt(Box_Plot_data[i].length * 3 / 4)];
            Box_Plot[i]['mid'] = Box_Plot_data[i][parseInt(Box_Plot_data[i].length / 2)];
            Box_Plot[i]['midL'] = Box_Plot_data[i][parseInt(Box_Plot_data[i].length * 1 / 4)];
            Box_Plot[i]['low'] = Box_Plot_data[i][0];
        }

        // console.log(Box_Plot_data)
        // console.log(Box_Plot)
        let linw = 18

        for (let i = 1; i <= 20; ++i) {
            var ldata = new Array();
            for (let j in Box_Plot[i]) {
                if (j == 'high' || j == 'low')
                    ldata.push({
                        x1: p_xscale(i) - linw / 2,
                        x2: p_xscale(i) + linw / 2,
                        y1: p_yscale(Box_Plot[i][j]),
                        y2: p_yscale(Box_Plot[i][j]),
                    })
                else
                    ldata.push({
                        x1: p_xscale(i) - linw,
                        x2: p_xscale(i) + linw,
                        y1: p_yscale(Box_Plot[i][j]),
                        y2: p_yscale(Box_Plot[i][j]),
                    })
            }
            ldata.push({
                x1: p_xscale(i),
                x2: p_xscale(i),
                y1: p_yscale(Box_Plot[i]['high']),
                y2: p_yscale(Box_Plot[i]['midH'])
            })
            ldata.push({
                x1: p_xscale(i),
                x2: p_xscale(i),
                y1: p_yscale(Box_Plot[i]['midL']),
                y2: p_yscale(Box_Plot[i]['low'])
            })
            ldata.push({
                x1: p_xscale(i) + linw,
                x2: p_xscale(i) + linw,
                y1: p_yscale(Box_Plot[i]['midH']),
                y2: p_yscale(Box_Plot[i]['midL'])
            })
            ldata.push({
                x1: p_xscale(i) - linw,
                x2: p_xscale(i) - linw,
                y1: p_yscale(Box_Plot[i]['midH']),
                y2: p_yscale(Box_Plot[i]['midL'])
            })
            // console.log(ldata)
            BoxIn[i] = background_g.selectAll('#box' + i.toString())
                .attr('id', '#box' + i.toString())
                .data(ldata)
                .enter()
                .append('line')
                .attr('x1', d => {
                    return d.x1;
                })
                .attr('y1', d => {
                    // console.log(d)
                    return Math.round(d.y1, 2);
                })
                .attr('x2', d => {
                    return d.x2;
                })
                .attr('y2', d => {
                    return Math.round(d.y2, 2);
                })
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .attr('stroke-opacity', 1 * opac)
                .attr('stroke-width', 1)
            // console.log
            background_g
                // .select('#box' + i.toString())
                .append('rect')
                .attr('x', p_xscale(i) - linw)
                .attr('y', p_yscale(Box_Plot[i]['midH']))
                .attr('width', 2 * linw)
                .attr('height', -p_yscale(Box_Plot[i]['midH']) + p_yscale(Box_Plot[i]['midL']))
                .attr('fill', 'black')
                .attr('fill-opacity', 0.3 * opac);
        }

        // console.log(data);
    })
}

PaintBackground(1, 600, -600);

function Paintjudge(name) {
    PaintBackground(0.1);
    nam = name;
    d3.csv('data/box.csv', function (data) {
        if (peo_g != 0) peo_g.remove();

        peo_g = peo_svg.append('g')
            .attr("transform", "translate(" + 0 + "," + 45 + ")")

        // console.log(data)
        p_data = []
        pie_data = []

        var p_max = -100000
        var p_min = 100000

        for (var d in data) {
            if (data[d].code == name) {
                pie_data.push(data[d])
                p_ = {}
                p_['name'] = name
                p_['judge'] = [parseInt(data[d]['1']), parseInt(data[d]['2']), parseInt(data[d]['3']), parseInt(data[d]['4']), parseInt(data[d]['5']), parseInt(data[d]['6']), parseInt(data[d]['7']), parseInt(data[d]['8']), parseInt(data[d][9]), parseInt(data[d]['risk'])]
                p_['price'] = parseFloat(data[d]['91'])
                if (p_max < parseFloat(data[d]['91'])) p_max = parseFloat(data[d]['91'])
                if (p_min > parseFloat(data[d]['91'])) p_min = parseFloat(data[d]['91'])
                p_['lun'] = data[d]['biao']
                p_['sum'] = data[d]
                console.log(data[d]);
                p_data.push(p_)
            }
            // console.log(data[d])
        }

        // var p_xscale = d3.scale.linear()
        //     .domain([1, 20])
        //     .range([40, 1260])

        // // var p_yscale = d3.scale.linear()
        // //     .domain([parseInt(p_min), parseInt(p_max)])
        // //     // .domain([-50, 150])
        // //     .range([255, 0])

        // if (parseInt(p_min) > 0) p_min = 0
        // if (parseInt(p_max) < 0) p_max = 0

        // var p_yscale = d3.scale.linear()
        //     .domain([parseInt(p_min), parseInt(p_max)])
        //     // .domain([-50, 150])
        //     .range([245, 0])

        var p_xscale = d3.scale.linear()
            .domain([0.5, 20.5])
            .range([40, 1260])

        // var p_yscale = d3.scale.linear()
        //     .domain([parseInt(p_min), parseInt(p_max)])
        //     // .domain([-50, 150])
        //     .range([255, 0])

        // if (parseInt(p_min) > 0) p_min = 0
        // if (parseInt(p_max) < 0) p_max = 0

        var p_yscale = d3.scale.linear()
            .domain([-600, 600])
            // .domain([-50, 150])
            .range([245, 0])


        line_data = []
        var dif_max = -100000
        var dif_min = 100000

        for (var i = 1; i < 20; ++i) {
            // console.log(p_data[i])
            l = {}
            l['x1'] = parseInt(p_data[i - 1]['lun'])
            l['y1'] = p_data[i - 1]['price']
            l['x2'] = parseInt(p_data[i]['lun'])
            l['y2'] = p_data[i]['price']
            var dif = 0;
            for (var j = 0; j <= 9; ++j) {
                dif += (p_data[i]['judge'][j] - p_data[i - 1]['judge'][j]) * (p_data[i]['judge'][j] - p_data[i - 1]['judge'][j]);
                if (dif_max < dif) dif_max = dif
                if (dif_min > dif) dif_min = dif
            }
            l['w'] = (dif);
            line_data.push(l)
        }
        // console.log(line_data)

        // console.log(dif_min)
        // console.log(dif_max)

        var l_scale = d3.scale.linear()
            .domain([parseFloat(dif_min), parseFloat(dif_max)])
            .range([1, 6])

        peo_g.selectAll('#peo_l')
            .attr('id', 'peo_l')
            .data(line_data)
            .enter()
            .append('g')
            .append('line')
            .attr('x1', d => {
                return p_xscale(d.x1);
            })
            .attr('y1', d => {
                return p_yscale(d.y1)
            })
            .attr('x2', d => {
                return p_xscale(d.x2)
            })
            .attr('y2', d => {
                return p_yscale(d.y2)
            })
            .attr('fill', 'none')
            .attr('stroke-width', d => {
                return l_scale(d.w)
            })
            .attr('stroke', '#0a3c75')

        var cur = (p_max - p_min) / 5

        var h_line = []
        for (var i = 0; i <= 5; ++i) {
            h_line.push([parseFloat(p_xscale(1)), parseFloat(p_xscale(20))])
        }
        // peo_g.selectAll('#x_line')
        //     .attr('id', 'x_line')
        //     .data(h_line)
        //     .enter()
        //     .append('g')
        //     .append('line')
        //     .attr('x1', d => {
        //         return d[0]
        //     })
        //     .attr('y1', (d, i) => {
        //         return p_yscale(parseFloat(p_min + i * cur))
        //     })
        //     .attr('x2', d => {
        //         return d[1]
        //     })
        //     .attr('y2', (d, i) => {
        //         // console.log(d)
        //         return p_yscale(parseFloat(p_min + i * cur))
        //     })
        //     .attr('fill', 'none')
        //     .attr('stroke', '#0a3c75')
        //     .attr('stroke-width', 0.1)
        //     .attr('stroke-opacity', 0.3)
        //     .attr('stroke-dasharray', 5.5)

        // peo_g.selectAll('#x_line')
        //     .attr('id', 'x_line')
        //     .data(p_data)
        //     .enter()
        //     .append('g')
        //     .append('line')
        //     .attr('x1', d => {
        //         if (d.lun != 1)
        //             return p_xscale(d.lun)
        //     })
        //     .attr('y1', d => {
        //         if (d.lun != 1)
        //             // return p_yscale(d.price)
        //             return p_yscale(parseInt(p_min))
        //     })
        //     .attr('x2', d => {
        //         if (d.lun != 1)
        //             return p_xscale(d.lun)
        //     })
        //     .attr('y2', d => {
        //         if (d.lun != 1)
        //             // return 260;
        //             // return p_yscale(0)
        //             return p_yscale(parseInt(p_max))
        //     })
        //     .attr('fill', 'none')
        //     .attr('stroke', '#0a3c75')
        //     .attr('stroke-width', 0.1)
        //     .attr('stroke-opacity', 0.3)
        //     .attr('stroke-dasharray', 5.5)


        // var xAxis = d3.svg.axis().scale(p_xscale).ticks(20).tickFormat(d3.format("d")).orient("bottom");
        // var yAxis = d3.svg.axis().scale(p_yscale).ticks(10).tickFormat(d3.format()).orient("left"); //添加一个g用于放x轴

        // peo_g.append("g")
        //     .attr("class", "axis")
        //     // .attr("transform", "translate(" + 0 + "," + 255 + ")")
        //     .attr("transform", "translate(" + 0 + "," + p_yscale(0) + ")")
        //     .attr("stroke-width", 0.1)
        //     .call(xAxis)
        //     .append('text')
        //     .text('轮数')
        //     // .attr("transform", "rotate(-90)") //text旋转-90°
        //     .attr("text-anchor", "end") //字体尾部对齐
        //     .attr("dx", "82.5em")
        //     .attr("dy", "0.5em") //沿y轴平移一个字体的大小
        // peo_g.append("g")
        //     .attr("class", "axis")
        //     .attr("transform", "translate(" + 30 + "," + 0 + ")")
        //     .call(yAxis)
        //     .append('text')
        //     .text('总收益')
        //     .attr("transform", "rotate(-90)") //text旋转-90°
        //     .attr("text-anchor", "end") //字体尾部对齐
        //     .attr("dx", "-2em")
        //     .attr("dy", "1em") //沿y轴平移一个字体的大小;

        peo_g.selectAll('#peo_cir')
            .attr('id', 'peo_cir')
            .data(p_data)
            .enter()
            .append('g')
            .append('circle')
            .attr('cx', d => {
                return p_xscale(d.lun)
            })
            .attr('cy', d => {
                return p_yscale(d.price)
            })
            .attr('r', 4.5)
            .attr('fill', d => {
                return "white";
            })
            .attr('stroke', '#D8483E')
            .attr('stroke-width', 1)
            .on("mouseover", (d, i) => {
                // console.log(d.sum.work)
                var x_d = []
                for (var i = 1; i <= 9; ++i) {
                    if (i == 1) {
                        x_d.push(Math.round(parseFloat(d.sum[11]) - parseFloat(d.sum.work)))
                        // if (pie_max < parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work))
                        //     pie_max = parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work)
                        // if (pie_min > parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work))
                        //     pie_min = parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work)
                    } else {
                        // console.log(parseFloat(pie_data[k][i * 10 + 1]));
                        x_d.push(Math.round(parseFloat(d.sum[i * 10 + 1]) - parseFloat(d.sum[(i - 1) * 10 + 1]), 2))
                        // if (pie_max < parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1]))
                        //     pie_max = parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1])
                        // if (pie_min > parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1]))
                        //     pie_min = parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1])
                    }
                }
                tooltipx.html("第" + (i + 1) + '轮' + "</br>" + "工作：" + (x_d[0] + 30) + "</br>" + "损耗：-30" + "</br>" + title[1] + ": " + x_d[1] + "</br>" + title[2] + ": " + x_d[2] + "</br>" + title[3] + ": " + x_d[3] +
                        "</br>" + title[4] + ": " + x_d[4] + "</br>" + title[5] + ": " + x_d[5] + "</br>" + title[6] + ": " + x_d[6] + "</br>" + title[7] + ": " + x_d[7] + "</br>" + title[8] + ": " + x_d[8] + "</br>")
                    .style("left", (d3.event.pageX - 15) + "px")
                    .style("top", (d3.event.pageY + 20) + "px")
                    .style("opacity", 1.0)
            })
            .on("mousemove", d => {
                tooltipx.style("left", (d3.event.pageX - 50) + "px")
                    .style("top", (d3.event.pageY - 220) + "px")
            })
            .on("mouseout", d => {
                tooltipx.style("opacity", 0.0)
            })

        // var peo_t = peo_g.selectAll('#p_text')
        //     .attr('id', 'p_text')
        //     .data(p_data)
        //     .enter()
        //     .append('g')
        //     .append('text')
        //     .attr('x', d => {
        //         return p_xscale(d.lun)
        //     })
        //     .attr('y', d => {
        //         return p_yscale(d.price)
        //     })

        // .attr('fill', 'black')
        // .attr('font-size', '12px')
        // .attr('text-anchor', 'middle')
        // .attr("font-family", "courier")
        // // .attr('dx', '')
        // .attr('dy', '-0.4em')
        // .text(d => {
        //     return parseInt(d.price)
        // })
        peo_g.append('text')
            .attr('x', 1500)
            .attr('y', -22)
            .attr('fill', 'black')
            .attr('font-size', '15px')
            .attr('text-anchor', 'middle')
            .attr("font-family", "courier")
            // .attr('dx', '')
            .attr('dy', '-0.4em')
            .text("参与者: " + 'ID-1')
        // .on('click', d => {
        //     judge_cir_line = 1;
        //     PaintCir(name)
        //     PaintLine(0)
        // })

        // draw pie
        var pie_min = 9999,
            pie_max = -9999
        for (var k in pie_data)
            for (var i = 1; i <= 9; ++i) {
                if (i == 1) {
                    if (pie_max < parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work))
                        pie_max = parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work)
                    if (pie_min > parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work))
                        pie_min = parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work)
                } else {
                    if (pie_max < parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1]))
                        pie_max = parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1])
                    if (pie_min > parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1]))
                        pie_min = parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1])
                }
            }
        var pie_scale;
        if (Math.abs(pie_min) > Math.abs(pie_max))
            pie_scale = Math.abs(pie_min)
        else
            pie_scale = Math.abs(pie_max)
        var p_scale = d3.scale.linear()
            .domain([0, pie_scale])
            .range([4.5, 20])


        for (var k in pie_data) {
            pie_d = []
            // var pie_min = 9999,
            //     pie_max = -9999
            for (var i = 1; i <= 9; ++i) {
                if (i == 1) {
                    pie_d.push(parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work))
                    // if (pie_max < parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work))
                    //     pie_max = parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work)
                    // if (pie_min > parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work))
                    //     pie_min = parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work)
                } else {
                    // console.log(parseFloat(pie_data[k][i * 10 + 1]));
                    pie_d.push(parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1]))
                    // if (pie_max < parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1]))
                    //     pie_max = parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1])
                    // if (pie_min > parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1]))
                    //     pie_min = parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1])
                }
            }

            for (var i = 0; i < 9; ++i) {
                var pie_f
                pie_f = p_scale(Math.abs(pie_d[i]))
                // if (pie_d[i] <= 0)
                //     pie_f = fu_scale(pie_d[i])
                // else
                //     pie_f = zheng_scale(pie_d[i])

                var arc = d3.svg.arc()
                    .innerRadius(4.5)
                    .outerRadius(pie_f)

                var arc_data = {
                    startAngle: Math.PI * (i) * 2 / 9,
                    endAngle: Math.PI * (i + 1) * 2 / 9
                }
                // console.log(k)
                var kkk = 200
                peo_g.append('g')
                    .append('path')
                    .attr('d', arc(arc_data))
                    .attr('transform', 'translate(' + p_xscale(parseInt(k) + 1) + ',' + p_yscale(p_data[k].price) + ')')
                    // .attr('stroke', 'black')
                    // .attr('stroke-width', '3px')
                    .attr('fill', (d) => {
                        if (pie_d[i] < 0)
                            return '#41CA77'
                        else
                            return '#D8483E'
                    })
                    .attr('stroke', 'black')
                    .attr('stroke-width', 0.5)
                // break
            }
            // console.log(pie_d);
            // break
        }
    })
}

function Paintjudge_2(name) {
    // nam = name;
    d3.csv('data/box_calc.csv', function (data) {
        if (peo_g != 0) peo_g.remove();

        peo_g = peo_svg.append('g')
            .attr("transform", "translate(" + 0 + "," + 45 + ")")

        // console.log(data)
        p_data = []
        var p1_data = []
        var pie_data = []

        var p_max = -100000
        var p_min = 100000

        for (var select_name in name) {
            p_data.push([])
            pie_data.push([])
            for (var d in data) {
                if (data[d].code == name[select_name]) {
                    pie_data[select_name].push(data[d])
                    p_ = {}
                    p_['name'] = name
                    p_['judge'] = [parseInt(data[d]['ability']), parseInt(data[d]['3']), parseInt(data[d]['4']), parseInt(data[d]['5']), parseInt(data[d]['6']), parseInt(data[d]['7']), parseInt(data[d]['8']), parseInt(data[d]['9']), parseInt(data[d]['10']), parseInt(data[d]['11'])]
                    p_['price'] = parseFloat(data[d]['129'])
                    if (p_max < parseFloat(data[d]['129'])) p_max = parseFloat(data[d]['129'])
                    if (p_min > parseFloat(data[d]['129'])) p_min = parseFloat(data[d]['129'])
                    p_['lun'] = data[d]['biao']
                    p_['sum'] = data[d]
                    p_data[select_name].push(p_)
                    // console.log(data[d])
                }
            }
            // console.log(data[d])
            // if (data[d].code == name[1]) {
            //     p_ = {}
            //     p_['name'] = name
            //     p_['judge'] = [parseInt(data[d]['1']), parseInt(data[d]['2']), parseInt(data[d]['3']), parseInt(data[d]['4']), parseInt(data[d]['5'])]
            //     p_['price'] = parseFloat(data[d]['91'])
            //     if (p_max < parseFloat(data[d]['91'])) p_max = parseFloat(data[d]['91'])
            //     if (p_min > parseFloat(data[d]['91'])) p_min = parseFloat(data[d]['91'])
            //     p_['lun'] = data[d]['biao']
            //     p1_data.push(p_)
            // }
        }
        // console.log(p_data)

        // var p_xscale = d3.scale.linear()
        //     .domain([1, 20])
        //     .range([40, 1260])

        // // var p_yscale = d3.scale.linear()
        // //     .domain([parseInt(p_min), parseInt(p_max)])
        // //     // .domain([-50, 150])
        // //     .range([255, 0])

        // if (parseInt(p_min) > 0) p_min = 0
        // if (parseInt(p_max) < 0) p_max = 0

        // var p_yscale = d3.scale.linear()
        //     .domain([parseInt(p_min), parseInt(p_max)])
        //     // .domain([-50, 150])
        //     .range([245, 0])

        var p_xscale = d3.scale.linear()
            .domain([0.5, 20.5])
            .range([40, 1260])

        // var p_yscale = d3.scale.linear()
        //     .domain([parseInt(p_min), parseInt(p_max)])
        //     // .domain([-50, 150])
        //     .range([255, 0])

        if (parseInt(p_min) > 0) p_min = 0
        if (parseInt(p_max) < 0) p_max = 0
        if (p_min >= -600) p_min = -600;
        if (p_max <= 600) p_max = 600;

        PaintBackground(0.1, p_max, p_min);

        var p_yscale = d3.scale.linear()
            .domain([p_min, p_max])
            // .domain([-50, 150])
            .range([245, 0])


        line_data = []
        line1_data = []
        var dif_max = -100000
        var dif_min = 100000

        for (var p_data_num in p_data) {
            // console.log(p_data)
            line_data.push([])
            for (var i = 1; i < 20; ++i) {
                l = {}
                l['x1'] = parseInt(p_data[p_data_num][i - 1]['lun'])
                l['y1'] = p_data[p_data_num][i - 1]['price']
                l['x2'] = parseInt(p_data[p_data_num][i]['lun'])
                l['y2'] = p_data[p_data_num][i]['price']
                var dif = 0;
                for (var j = 0; j <= 9; ++j) {
                    dif += (p_data[p_data_num][i]['judge'][j] - p_data[p_data_num][i - 1]['judge'][j]) * (p_data[p_data_num][i]['judge'][j] - p_data[p_data_num][i - 1]['judge'][j]);
                    if (dif_max < Math.sqrt(dif)) dif_max = Math.sqrt(dif)
                    if (dif_min > Math.sqrt(dif)) dif_min = Math.sqrt(dif)
                }
                l['w'] = Math.sqrt(dif);
                line_data[p_data_num].push(l)
            }
        }

        var pie_min = 9999,
            pie_max = -9999
        for (var j in pie_data) {
            for (var k in pie_data[j])
                for (var i = 3; i <= 12; ++i) {
                    // if (i == 3) {
                    //     if (pie_max < parseFloat(pie_data[j][k][39]) - parseFloat(pie_data[j][k][29]))
                    //         pie_max = parseFloat(pie_data[j][k][39]) - parseFloat(pie_data[j][k][29])
                    //     if (pie_min > parseFloat(pie_data[j][k][39]) - parseFloat(pie_data[j][k].work))
                    //         pie_min = parseFloat(pie_data[j][k][39]) - parseFloat(pie_data[j][k].work)
                    // } else {
                    if (pie_max < parseFloat(pie_data[j][k][i * 10 + 9]) - parseFloat(pie_data[j][k][(i - 1) * 10 + 9]))
                        pie_max = parseFloat(pie_data[j][k][i * 10 + 9]) - parseFloat(pie_data[j][k][(i - 1) * 10 + 9])
                    if (pie_min > parseFloat(pie_data[j][k][i * 10 + 9]) - parseFloat(pie_data[j][k][(i - 1) * 10 + 9]))
                        pie_min = parseFloat(pie_data[j][k][i * 10 + 9]) - parseFloat(pie_data[j][k][(i - 1) * 10 + 9])
                    // }
                }
        }

        var pie_scale;
        if (Math.abs(pie_min) > Math.abs(pie_max))
            pie_scale = Math.abs(pie_min)
        else
            pie_scale = Math.abs(pie_max)
        var p_scale = d3.scale.linear()
            .domain([0, pie_scale])
            .range([4.5, 20])

        var l_scale = d3.scale.linear()
            .domain([parseFloat(dif_min), parseFloat(dif_max)])
            .range([1, 10])

        var cur = (p_max - p_min) / 5
        var h_line = []
        for (var i = 0; i <= 5; ++i) {
            h_line.push([parseFloat(p_xscale(1)), parseFloat(p_xscale(20))])
        }
        // peo_g.selectAll('#x_line')
        //     .attr('id', 'x_line')
        //     .data(h_line)
        //     .enter()
        //     .append('g')
        //     .append('line')
        //     .attr('x1', d => {
        //         return d[0]
        //     })
        //     .attr('y1', (d, i) => {
        //         return p_yscale(parseFloat(p_min + i * cur))
        //     })
        //     .attr('x2', d => {
        //         return d[1]
        //     })
        //     .attr('y2', (d, i) => {
        //         // console.log(d)
        //         return p_yscale(parseFloat(p_min + i * cur))
        //     })
        //     .attr('fill', 'none')
        //     .attr('stroke', '#0a3c75')
        //     .attr('stroke-width', 0.1)
        //     .attr('stroke-opacity', 0.3)
        //     .attr('stroke-dasharray', 5.5)

        // peo_g.selectAll('#x_line')
        //     .attr('id', 'x_line')
        //     .data(p_data[0])
        //     .enter()
        //     .append('g')
        //     .append('line')
        //     .attr('x1', d => {
        //         if (d.lun != 1)
        //             return p_xscale(d.lun)
        //     })
        //     .attr('y1', d => {
        //         if (d.xlun != 1)
        //             // return p_yscale(d.price)
        //             return p_yscale(parseInt(p_min))
        //     })
        //     .attr('x2', d => {
        //         if (d.lun != 1)
        //             return p_xscale(d.lun)
        //     })
        //     .attr('y2', d => {
        //         if (d.lun != 1)
        //             // return 260;
        //             // return p_yscale(0)
        //             return p_yscale(parseInt(p_max))
        //     })
        //     .attr('fill', 'none')
        //     .attr('stroke', '#0a3c75')
        //     .attr('stroke-width', 0.1)
        //     .attr('stroke-opacity', 0.3)
        //     .attr('stroke-dasharray', 5.5)
        // peo_g.selectAll('#x_line')
        //     .attr('id', 'x_line')
        //     // .data(line_data[0])
        //     // .enter()
        //     // .append('g')
        //     .append('line')
        //     .attr('x1', d => {
        //             return p_xscale(1)
        //     })
        //     .attr('y1', d => {
        //         // if (d.x1 != 1)
        //             // return p_yscale(d.price)
        //             return p_yscale(parseInt(p_min))
        //     })
        //     .attr('x2', d => {
        //         // if (d.x1 != 1)
        //             return p_xscale(1)
        //     })
        //     .attr('y2', d => {
        //         // if (d.x1 != 1)
        //             // return 260;
        //             // return p_yscale(0)
        //             return p_yscale(parseInt(p_max))
        //     })
        //     .attr('fill', 'none')
        //     .attr('stroke', '#0a3c75')
        //     .attr('stroke-width', 0.1)
        //     .attr('stroke-opacity', 0.4)
        //     .attr('stroke-dasharray', 5.5)

        for (var peo_num in line_data) {
            peo_g.selectAll('#peo_l')
                .attr('id', 'peo_l')
                .data(line_data[peo_num])
                .enter()
                .append('g')
                .append('line')
                .attr('x1', d => {
                    return p_xscale(d.x1);
                })
                .attr('y1', d => {
                    return p_yscale(d.y1)
                })
                .attr('x2', d => {
                    return p_xscale(d.x2)
                })
                .attr('y2', d => {
                    return p_yscale(d.y2)
                })
                .attr('fill', 'none')
                .attr('stroke-width', d => {
                    return l_scale(d.w)
                })
                // .attr('stroke', '#0a3c75')
                .attr('stroke', (d, i) => {
                    return color_kgggg[peo_num]
                })

            // peo_g.selectAll('#x_line')
            //     .attr('id', 'x_line')
            //     .data(p_data[peo_num])
            //     .enter()
            //     .append('g')
            //     .append('line')
            //     .attr('x1', d => {
            //         return p_xscale(d.lun)
            //     })
            //     .attr('y1', d => {
            //         return p_yscale(d.price)
            //     })
            //     .attr('x2', d => {
            //         return p_xscale(d.lun)
            //     })
            //     .attr('y2', d => {
            //         // return 260;
            //         return p_yscale(0)
            //     })
            //     .attr('fill', 'none')
            //     .attr('stroke', '#0a3c75')
            //     .attr('stroke-width', 0.1)
            //     .attr('stroke-opacity', 0.4)
            //     .attr('stroke-dasharray', 5.5)

            peo_g.selectAll('#peo_cir')
                .attr('id', 'peo_cir')
                .data(p_data[peo_num])
                .enter()
                .append('g')
                .append('circle')
                .attr('cx', d => {
                    return p_xscale(d.lun)
                })
                .attr('cy', d => {
                    return p_yscale(d.price)
                })
                .attr('r', 4.5)
                .attr('fill', d => {
                    return "white";
                })
                .attr('stroke', '#D8483E')
                .attr('stroke-width', 1)
                .on("mouseover", (d, i) => {
                    // console.log(d.sum)
                    var x_d = []
                    for (var k = 3; k <= 12; ++k) {
                        // console.log(parseFloat(d.sum[i * 10 + 9]) - parseFloat(d.sum[(i - 1) * 10 + 9]));
                        // if (i == 1) {
                        //     x_d.push(Math.round(parseFloat(d.sum[11]) - parseFloat(d.sum.work)))
                        //     // if (pie_max < parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work))
                        //     //     pie_max = parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work)
                        //     // if (pie_min > parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work))
                        //     //     pie_min = parseFloat(pie_data[k][11]) - parseFloat(pie_data[k].work)
                        // } else {
                        // console.log(parseFloat(pie_data[k][i * 10 + 1]));
                        x_d.push(Math.round(parseFloat(d.sum[k * 10 + 9]) - parseFloat(d.sum[(k - 1) * 10 + 9]), 2))
                        // if (pie_max < parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1]))
                        //     pie_max = parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1])
                        // if (pie_min > parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1]))
                        //     pie_min = parseFloat(pie_data[k][i * 10 + 1]) - parseFloat(pie_data[k][(i - 1) * 10 + 1])
                        // }
                    
                    }
                    // console.log(x_d)
                    tooltipx.html("第" + (i + 1) + '轮' + "</br>" + "工作：" + (x_d[0] + 30) + "</br>" + "损耗：-30" + "</br>" + title[1] + ": " + x_d[1] + "</br>" + title[2] + ": " + x_d[2] + "</br>" + title[3] + ": " + x_d[3] +
                            "</br>" + title[4] + ": " + x_d[4] + "</br>" + title[5] + ": " + x_d[5] + "</br>" + title[6] + ": " + x_d[6] + "</br>" + title[7] + ": " + x_d[7] + "</br>" + title[8] + ": " + x_d[8] + "</br>")
                        .style("left", (d3.event.pageX - 15) + "px")
                        .style("top", (d3.event.pageY + 20) + "px")
                        .style("opacity", 1.0)
                })
                .on("mousemove", d => {
                    tooltipx.style("left", (d3.event.pageX - 50) + "px")
                        .style("top", (d3.event.pageY - 220) + "px")
                })
                .on("mouseout", d => {
                    tooltipx.style("opacity", 0.0)
                })

            for (var k in pie_data[peo_num]) {
                pie_d = []
                // var pie_min = 9999,
                //     pie_max = -9999
                // console.log(peo_num);
                for (var i = 3; i <= 12; ++i) {
                    // if (i == 1) {
                    //     pie_d.push(parseFloat(pie_data[peo_num][k][11]) - parseFloat(pie_data[peo_num][k].work))
                    // } else {
                    pie_d.push(parseFloat(pie_data[peo_num][k][i * 10 + 9]) - parseFloat(pie_data[peo_num][k][(i - 1) * 10 + 9]))
                    // }
                }

                for (var i = 0; i <= 9; ++i) {
                    var pie_f
                    pie_f = p_scale(Math.abs(pie_d[i]))
                    // if (pie_d[i] <= 0)
                    //     pie_f = fu_scale(pie_d[i])
                    // else
                    //     pie_f = zheng_scale(pie_d[i])

                    var arc = d3.svg.arc()
                        .innerRadius(4.5)
                        .outerRadius(pie_f)

                    var arc_data = {
                        startAngle: Math.PI * (i) * 2 / 9,
                        endAngle: Math.PI * (i + 1) * 2 / 9
                    }
                    // console.log(k)
                    var kkk = 200
                    peo_g.append('g')
                        .append('path')
                        .attr('d', arc(arc_data))
                        .attr('transform', 'translate(' + p_xscale(parseInt(k) + 1) + ',' + p_yscale(p_data[peo_num][k].price) + ')')
                        // .attr('stroke', 'black')
                        // .attr('stroke-width', '3px')
                        .attr('fill', (d) => {
                            if (pie_d[i] < 0)
                                return '#41CA77'
                            else
                                return '#D8483E'
                        })
                        .attr('stroke', 'black')
                        .attr('stroke-width', 0.5)
                    // break
                }
            }

        }


        // var xAxis = d3.svg.axis().scale(p_xscale).ticks(20).tickFormat(d3.format("d")).orient("bottom");
        // var yAxis = d3.svg.axis().scale(p_yscale).ticks(5).tickFormat(d3.format("d")).orient("left"); //添加一个g用于放x轴

        // peo_g.append("g")
        //     .attr("class", "axis")
        //     // .attr("transform", "translate(" + 0 + "," + 255 + ")")
        //     .attr("transform", "translate(" + 0 + "," + p_yscale(0) + ")")
        //     .attr("stroke-width", 0.1)
        //     .call(xAxis)
        //     .append('text')
        //     .text('轮数')
        //     // .attr("transform", "rotate(-90)") //text旋转-90°
        //     .attr("text-anchor", "end") //字体尾部对齐
        //     .attr("dx", "82.5em")
        //     .attr("dy", "0.5em") //沿y轴平移一个字体的大小
        // peo_g.append("g")
        //     .attr("class", "axis")
        //     .attr("transform", "translate(" + 40 + "," + 0 + ")")
        //     .call(yAxis)
        //     .append('text')
        //     .text('总收益')
        //     .attr("transform", "rotate(-90)") //text旋转-90°
        //     .attr("text-anchor", "end") //字体尾部对齐
        //     .attr("dx", "-2em")
        //     .attr("dy", "1em") //沿y轴平移一个字体的大小;




        peo_g.selectAll('#peo_cir')
            .attr('id', 'peo_cir')
            .data(p1_data)
            .enter()
            .append('g')
            .append('circle')
            .attr('cx', d => {
                return p_xscale(d.lun)
            })
            .attr('cy', d => {
                return p_yscale(d.price)
            })
            .attr('r', 4.5)
            .attr('fill', d => {
                return "white";
            })
            .attr('stroke', '#D8483E')
            .attr('stroke-width', 1)
        // .on('click', d => {
        //     peo_t.style('opacity', 0)
        // })
        // .on('dblclick', d => {
        //     peo_t.style('opacity', 1)
        // })

        // var peo_t = peo_g.selectAll('#p_text')
        //     .attr('id', 'p_text')
        //     .data(p1_data)
        //     .enter()
        //     .append('g')
        //     .append('text')
        //     .attr('x', d => {
        //         return p_xscale(d.lun)
        //     })
        //     .attr('y', d => {
        //         return p_yscale(d.price)
        //     })

        //     .attr('fill', 'black')
        //     .attr('font-size', '12px')
        //     .attr('text-anchor', 'middle')
        //     .attr("font-family", "courier")
        //     // .attr('dx', '')
        //     .attr('dy', '-0.4em')
        //     .text(d => {
        //         return parseInt(d.price)
        //     })
        // peo_g.append('text')
        //     .attr('x', 900)
        //     .attr('y', -22)
        //     .attr('fill', 'black')
        //     .attr('font-size', '15px')
        //     .attr('text-anchor', 'middle')
        //     .attr("font-family", "courier")
        //     // .attr('dx', '')
        //     .attr('dy', '-0.4em')
        //     .text("参与者: ")
        // // .on('click', d => {
        // //     judge_cir_line = 1;
        // //     PaintCir(name)
        // //     PaintLine(0)
        // // })
        // for (var i in name) {
        //     peo_g.append('text')
        //         .attr('x', 950 + i * 46)
        //         .attr('y', -23)
        //         .attr('fill', 'black')
        //         .attr('font-size', '15px')
        //         .attr('text-anchor', 'middle')
        //         .attr("font-family", "courier")
        //         .attr('fill', color_kgggg[i % color_kgggg.length])
        //         // .attr('dx', '')
        //         .attr('dy', '-0.4em')
        //         .text("ID-" + i)
        //         .on('click', d => {
        //             judge_cir_line = 1;
        //             PaintCir(name)
        //             PaintLine(0)
        //         })
        //     if (i != name.length - 1)
        //         peo_g.append('text')
        //         .attr('x', 975 + i * 44)
        //         .attr('y', -22)
        //         .attr('fill', 'black')
        //         .attr('font-size', '15px')
        //         .attr('text-anchor', 'middle')
        //         .attr("font-family", "courier")
        //         // .attr('dx', '')
        //         .attr('dy', '-0.4em')
        //         .text(", ")
        //         .on('click', d => {
        //             judge_cir_line = 1;
        //             PaintCir(name)
        //             PaintLine(0)
        //         })
        // }
    })
}

var line_un = lc_p_g.append('g');
var lxcir = lc_p_g.append('g');

function CirLun(knum) {
    if (lxcir != 0) lxcir.remove();
    lxcir = lc_p_g.append('g');

    var p_xscale = d3.scale.linear()
        .domain([0.5, 20.5])
        .range([40, 1260])

    // lxcir.append('circle')
    //     .attr('cx', p_xscale(knum))
    //     .attr('cy', 12)
    //     .attr('fill', 'blue')
    //     .attr('stroke', 'blue')
    //     .attr('r', 10)
    lxcir.append('rect')
        .attr('x', p_xscale(knum) - 10)
        .attr('y', 2)
        .attr('fill', 'blue')
        .attr('stroke', 'blue')
        // .attr('r', 10)
        .attr('width', 20)
        .attr('height', 20)
        .attr('rx', 5)
        .attr('ry', 5)
    lxcir.append('text')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .attr('x', p_xscale(knum))
        .attr('y', 16)
        .attr('fill', 'white')
        // .attr('dx', -3.8)
        .text(knum)
}


function PaintLine(p) {
    if (line_un != 0) line_un.remove()

    line_un = lc_p_g.append('g')

    // line_un.append('line')
    // .attr('x1', 0 + p * 80)
    // .attr('y1', 22)
    // .attr('x2', 80 + p * 80)
    // .attr('y2', 22)
    // .attr('fill', 'none')
    // .attr('stroke', '#0a3c75')
    // .attr('stroke-width', 2)

    var ll = 0,
        rr = 0
    if (p == 0) ll = 50, rr = 15
    else ll = 60, rr = 70
    let lunx = new Array();

    for (let i = 1; i <= 20; ++i) {
        lunx.push(i);
    }

    var p_xscale = d3.scale.linear()
        .domain([0.5, 20.5])
        .range([40, 1260])

    var textk = line_un.selectAll('#textk')
        .attr("id", "trextk")
        .data(lunx)
        .enter()
        .append('text')
        .attr('fill', 'black')
        .attr('font-size', '15px')
        .attr('text-anchor', 'middle')
        .attr("font-family", "courier")
        .attr('x', function (d, i) {
            return p_xscale(d);
        })
        .attr('y', function (d) {
            return 16;
        })
        // .attr('dx', rectWidth / 2) //dx是相对于x平移的大小
        // .attr('dy', '1em') //dy是相对于y平移的大小
        .text(function (d) {
            return d;
        })
        .on('click', (d, i) => {
            number = i + 1;
            CirLun(i + 1);
            // PaintRect(i + 1)
            // // Peo_gain_loss(number)
            // DrawIceRectNum(i + 1);
            // FinaceRect(i + 1);
            SunCir(i + 1, 1 + i);
            clear_pic(i + 1);
        })

    // line_un.append('rect')
    //     .attr('x', rr)
    //     .attr('y', 2)
    //     .attr('height', 20)
    //     .attr('width', ll)
    //     .attr('fill', 'black')
    //     .attr('fill-opacity', 0.2)
    //     .attr('rx', 10)
}
PaintLine()

CirLun(1);

// if (peo_g == 0 && judge_cir_line == 0 && d_num == 0) {
// Paintjudge_2(['11qpbunz', 'v5p7lv20', '7rmwik5s', 'wak4ycex']);
//     // PaintLine(0)
// }