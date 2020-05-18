var p_width = 911;
var p_height = 306

var judge_cir_line = 0

var d_num = 0

var peo_svg = d3.select("#Tree").append('svg')
    .attr('width', p_width)
    .attr('height', p_height)

var lc_p_g = 0;

lc_p_g = peo_svg.append('g')

var peo_g = 0;

var nam = 0;
// var color = ['#00a676', '#f9c80e', '#3abeff', '#df19c1', '#ff206e', '#f08700', '#0091c9', '#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD']
var color_k = ['#434348', '#90ed7d', '#f7a35c', '#8085e9',
    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
]
var tooltipx = d3.select("body")
    .append("div")
    .attr("class", "tooltipx")
    .style("opacity", 0.0)

function Paintjudge(name) {
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
                p_data.push(p_)
            }
            // console.log(data[d])
        }

        var p_xscale = d3.scale.linear()
            .domain([1, 20])
            .range([30, 880])

        // var p_yscale = d3.scale.linear()
        //     .domain([parseInt(p_min), parseInt(p_max)])
        //     // .domain([-50, 150])
        //     .range([255, 0])

        if (parseInt(p_min) > 0) p_min = 0
        if (parseInt(p_max) < 0) p_max = 0

        var p_yscale = d3.scale.linear()
            .domain([parseInt(p_min), parseInt(p_max)])
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
        peo_g.selectAll('#x_line')
            .attr('id', 'x_line')
            .data(h_line)
            .enter()
            .append('g')
            .append('line')
            .attr('x1', d => {
                return d[0]
            })
            .attr('y1', (d, i) => {
                return p_yscale(parseFloat(p_min + i * cur))
            })
            .attr('x2', d => {
                return d[1]
            })
            .attr('y2', (d, i) => {
                // console.log(d)
                return p_yscale(parseFloat(p_min + i * cur))
            })
            .attr('fill', 'none')
            .attr('stroke', '#0a3c75')
            .attr('stroke-width', 0.1)
            .attr('stroke-opacity', 0.4)
            .attr('stroke-dasharray', 5.5)

        peo_g.selectAll('#x_line')
            .attr('id', 'x_line')
            .data(p_data)
            .enter()
            .append('g')
            .append('line')
            .attr('x1', d => {
                if (d.lun != 1)
                    return p_xscale(d.lun)
            })
            .attr('y1', d => {
                if (d.lun != 1)
                    // return p_yscale(d.price)
                    return p_yscale(parseInt(p_min))
            })
            .attr('x2', d => {
                if (d.lun != 1)
                    return p_xscale(d.lun)
            })
            .attr('y2', d => {
                if (d.lun != 1)
                    // return 260;
                    // return p_yscale(0)
                    return p_yscale(parseInt(p_max))
            })
            .attr('fill', 'none')
            .attr('stroke', '#0a3c75')
            .attr('stroke-width', 0.1)
            .attr('stroke-opacity', 0.4)
            .attr('stroke-dasharray', 5.5)


        var xAxis = d3.svg.axis().scale(p_xscale).ticks(20).tickFormat(d3.format("d")).orient("bottom");
        var yAxis = d3.svg.axis().scale(p_yscale).ticks(10).tickFormat(d3.format()).orient("left"); //添加一个g用于放x轴

        peo_g.append("g")
            .attr("class", "axis")
            // .attr("transform", "translate(" + 0 + "," + 255 + ")")
            .attr("transform", "translate(" + 0 + "," + p_yscale(0) + ")")
            .attr("stroke-width", 0.1)
            .call(xAxis)
            .append('text')
            .text('轮数')
            // .attr("transform", "rotate(-90)") //text旋转-90°
            .attr("text-anchor", "end") //字体尾部对齐
            .attr("dx", "82.5em")
            .attr("dy", "0.5em") //沿y轴平移一个字体的大小
        peo_g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + 30 + "," + 0 + ")")
            .call(yAxis)
            .append('text')
            .text('总收益')
            .attr("transform", "rotate(-90)") //text旋转-90°
            .attr("text-anchor", "end") //字体尾部对齐
            .attr("dx", "-2em")
            .attr("dy", "1em") //沿y轴平移一个字体的大小;

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
            .attr('stroke', 'red')
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
            .attr('x', 800)
            .attr('y', -22)
            .attr('fill', 'black')
            .attr('font-size', '15px')
            .attr('text-anchor', 'middle')
            .attr("font-family", "courier")
            // .attr('dx', '')
            .attr('dy', '-0.4em')
            .text("参与者: " + '1')
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
                            return 'red'
                        else
                            return '#00FF00'
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
    d3.csv('data/box.csv', function (data) {
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
                    p_['judge'] = [parseInt(data[d]['1']), parseInt(data[d]['2']), parseInt(data[d]['3']), parseInt(data[d]['4']), parseInt(data[d]['5']), parseInt(data[d]['6']), parseInt(data[d]['7']), parseInt(data[d]['8']), parseInt(data[d][9]), parseInt(data[d]['risk'])]
                    p_['price'] = parseFloat(data[d]['91'])
                    if (p_max < parseFloat(data[d]['91'])) p_max = parseFloat(data[d]['91'])
                    if (p_min > parseFloat(data[d]['91'])) p_min = parseFloat(data[d]['91'])
                    p_['lun'] = data[d]['biao']
                    p_['sum'] = data[d]
                    p_data[select_name].push(p_)
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

        var p_xscale = d3.scale.linear()
            .domain([1, 20])
            .range([30, 880])

        // var p_yscale = d3.scale.linear()
        //     .domain([parseInt(p_min), parseInt(p_max)])
        //     // .domain([-50, 150])
        //     .range([255, 0])

        if (parseInt(p_min) > 0) p_min = 0
        if (parseInt(p_max) < 0) p_max = 0

        var p_yscale = d3.scale.linear()
            .domain([parseInt(p_min), parseInt(p_max)])
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
                for (var i = 1; i <= 9; ++i) {
                    if (i == 1) {
                        if (pie_max < parseFloat(pie_data[j][k][11]) - parseFloat(pie_data[j][k].work))
                            pie_max = parseFloat(pie_data[j][k][11]) - parseFloat(pie_data[j][k].work)
                        if (pie_min > parseFloat(pie_data[j][k][11]) - parseFloat(pie_data[j][k].work))
                            pie_min = parseFloat(pie_data[j][k][11]) - parseFloat(pie_data[j][k].work)
                    } else {
                        if (pie_max < parseFloat(pie_data[j][k][i * 10 + 1]) - parseFloat(pie_data[j][k][(i - 1) * 10 + 1]))
                            pie_max = parseFloat(pie_data[j][k][i * 10 + 1]) - parseFloat(pie_data[j][k][(i - 1) * 10 + 1])
                        if (pie_min > parseFloat(pie_data[j][k][i * 10 + 1]) - parseFloat(pie_data[j][k][(i - 1) * 10 + 1]))
                            pie_min = parseFloat(pie_data[j][k][i * 10 + 1]) - parseFloat(pie_data[j][k][(i - 1) * 10 + 1])
                    }
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
        peo_g.selectAll('#x_line')
            .attr('id', 'x_line')
            .data(h_line)
            .enter()
            .append('g')
            .append('line')
            .attr('x1', d => {
                return d[0]
            })
            .attr('y1', (d, i) => {
                return p_yscale(parseFloat(p_min + i * cur))
            })
            .attr('x2', d => {
                return d[1]
            })
            .attr('y2', (d, i) => {
                // console.log(d)
                return p_yscale(parseFloat(p_min + i * cur))
            })
            .attr('fill', 'none')
            .attr('stroke', '#0a3c75')
            .attr('stroke-width', 0.1)
            .attr('stroke-opacity', 0.4)
            .attr('stroke-dasharray', 5.5)

        peo_g.selectAll('#x_line')
            .attr('id', 'x_line')
            .data(p_data[0])
            .enter()
            .append('g')
            .append('line')
            .attr('x1', d => {
                if (d.lun != 1)
                    return p_xscale(d.lun)
            })
            .attr('y1', d => {
                if (d.xlun != 1)
                    // return p_yscale(d.price)
                    return p_yscale(parseInt(p_min))
            })
            .attr('x2', d => {
                if (d.lun != 1)
                    return p_xscale(d.lun)
            })
            .attr('y2', d => {
                if (d.lun != 1)
                    // return 260;
                    // return p_yscale(0)
                    return p_yscale(parseInt(p_max))
            })
            .attr('fill', 'none')
            .attr('stroke', '#0a3c75')
            .attr('stroke-width', 0.1)
            .attr('stroke-opacity', 0.4)
            .attr('stroke-dasharray', 5.5)
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
                    return color_k[peo_num % color.length]
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
                .attr('stroke', 'red')
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

            for (var k in pie_data[peo_num]) {
                pie_d = []
                // var pie_min = 9999,
                //     pie_max = -9999
                for (var i = 1; i <= 9; ++i) {
                    if (i == 1) {
                        pie_d.push(parseFloat(pie_data[peo_num][k][11]) - parseFloat(pie_data[peo_num][k].work))
                    } else {
                        pie_d.push(parseFloat(pie_data[peo_num][k][i * 10 + 1]) - parseFloat(pie_data[peo_num][k][(i - 1) * 10 + 1]))
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
                        .attr('transform', 'translate(' + p_xscale(parseInt(k) + 1) + ',' + p_yscale(p_data[peo_num][k].price) + ')')
                        // .attr('stroke', 'black')
                        // .attr('stroke-width', '3px')
                        .attr('fill', (d) => {
                            if (pie_d[i] < 0)
                                return 'red'
                            else
                                return '#00FF00'
                        })
                        .attr('stroke', 'black')
                        .attr('stroke-width', 0.5)
                    // break
                }
            }

        }


        var xAxis = d3.svg.axis().scale(p_xscale).ticks(20).tickFormat(d3.format("d")).orient("bottom");
        var yAxis = d3.svg.axis().scale(p_yscale).ticks(5).tickFormat(d3.format("d")).orient("left"); //添加一个g用于放x轴

        peo_g.append("g")
            .attr("class", "axis")
            // .attr("transform", "translate(" + 0 + "," + 255 + ")")
            .attr("transform", "translate(" + 0 + "," + p_yscale(0) + ")")
            .attr("stroke-width", 0.1)
            .call(xAxis)
            .append('text')
            .text('轮数')
            // .attr("transform", "rotate(-90)") //text旋转-90°
            .attr("text-anchor", "end") //字体尾部对齐
            .attr("dx", "82.5em")
            .attr("dy", "0.5em") //沿y轴平移一个字体的大小
        peo_g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + 30 + "," + 0 + ")")
            .call(yAxis)
            .append('text')
            .text('总收益')
            .attr("transform", "rotate(-90)") //text旋转-90°
            .attr("text-anchor", "end") //字体尾部对齐
            .attr("dx", "-2em")
            .attr("dy", "1em") //沿y轴平移一个字体的大小;




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
            .attr('stroke', 'red')
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
        peo_g.append('text')
            .attr('x',665)
            .attr('y', -22)
            .attr('fill', 'black')
            .attr('font-size', '15px')
            .attr('text-anchor', 'middle')
            .attr("font-family", "courier")
            // .attr('dx', '')
            .attr('dy', '-0.4em')
            .text("参与者: ")
            // .on('click', d => {
            //     judge_cir_line = 1;
            //     PaintCir(name)
            //     PaintLine(0)
            // })
        for (var i in name) {
            peo_g.append('text')
                .attr('x', 710 + i * 40)
                .attr('y', -22)
                .attr('fill', 'black')
                .attr('font-size', '15px')
                .attr('text-anchor', 'middle')
                .attr("font-family", "courier")
                .attr('fill', color_k[i % color_k.length])
                // .attr('dx', '')
                .attr('dy', '-0.4em')
                .text("ID-" + i)
                .on('click', d => {
                    judge_cir_line = 1;
                    PaintCir(name)
                    PaintLine(0)
                })
            if (i != name.length - 1)
                peo_g.append('text')
                .attr('x', 710 + i * 20)
                .attr('y', -22)
                .attr('fill', 'black')
                .attr('font-size', '15px')
                .attr('text-anchor', 'middle')
                .attr("font-family", "courier")
                // .attr('dx', '')
                .attr('dy', '-0.4em')
                .text(", ")
                .on('click', d => {
                    judge_cir_line = 1;
                    PaintCir(name)
                    PaintLine(0)
                })
        }
    })
}

var line_un = 0;

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

    line_un.append('rect')
        .attr('x', rr)
        .attr('y', 2)
        .attr('height', 20)
        .attr('width', ll)
        .attr('fill', 'black')
        .attr('fill-opacity', 0.2)
        .attr('rx', 10)
}

if (peo_g == 0 && judge_cir_line == 0 && d_num == 0) {
    Paintjudge_2(['11qpbunz', 'v5p7lv20', '7rmwik5s', 'wak4ycex']);
    // PaintLine(0)
}