var p_width = document.getElementById("AnaLineView").clientWidth;
var p_height = document.getElementById("AnaLineView").clientHeight;

var judge_cir_line = 0

var d_num = 0;

var peo_svg = d3.select("#AnaLineView").append('svg')
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

function PaintBackground(opac, px, pn) {
    nam = name;
    d3.csv('data/box_calcr.csv').then((data) => {
        if (opac == 1) {
            if (peo_g != 0) peo_g.remove();
        }
        if (background_g != 0) background_g.remove();

        background_g = peo_svg.append('g')
            .attr("transform", "translate(" + 0 + "," + 45 + ")")

        console.log(data)
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

        var p_xscale = d3.scaleLinear()
            .domain([0.5, 20.5])
            .range([40, p_width - 20])

        // var p_yscale = d3.scaleLinear()
        //     .domain([parseInt(p_min), parseInt(p_max)])
        //     // .domain([-50, 150])
        //     .range([255, 0])

        // if (parseInt(p_min) > 0) p_min = 0
        // if (parseInt(p_max) < 0) p_max = 0

        var p_yscale = d3.scaleLinear()
            .domain([pn, px])
            // .domain([-50, 150])
            .range([p_height - 50, 0])
        // console.log(line_data)

        // console.log(dif_min)
        // console.log(dif_max)

        var xAxis = d3.axisBottom().scale(p_xscale).ticks(0);
        var yAxis = d3.axisLeft().scale(p_yscale).ticks(10); //添加一个g用于放x轴

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

var line_un = lc_p_g.append('g');
var lxcir = lc_p_g.append('g');

function CirLun(knum) {
    if (lxcir != 0) lxcir.remove();
    lxcir = lc_p_g.append('g');

    var p_xscale = d3.scaleLinear()
        .domain([0.5, 20.5])
        .range([40, p_width - 20])

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

    var p_xscale = d3.scaleLinear()
        .domain([0.5, 20.5])
        .range([40, p_width - 20])

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
            PaintRect(i + 1)
            // // Peo_gain_loss(number)
            // DrawIceRectNum(i + 1);
            // FinaceRect(i + 1);
            // SunCir(i + 1, 1 + i);
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
PaintLine(1)

CirLun(1);

Paintjudge_sum()

function Paintjudge_sum() {
    // nam = name;
    d3.csv('data/box_calc.csv').then((data) => {
        console.log(data)
        if (peo_g != 0) peo_g.remove();

        peo_g = peo_svg.append('g')
            .attr("transform", "translate(" + 0 + "," + 45 + ")")
        p_data = []
        var p1_data = []
        var pie_data = []
        var name = new Array();
        for (let i = 0; i < 304; ++i)
            name.push(data[i].code);

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

        // var p_xscale = d3.scaleLinear()
        //     .domain([1, 20])
        //     .range([40, p_width + 80])

        // // var p_yscale = d3.scaleLinear()
        // //     .domain([parseInt(p_min), parseInt(p_max)])
        // //     // .domain([-50, 150])
        // //     .range([255, 0])

        // if (parseInt(p_min) > 0) p_min = 0
        // if (parseInt(p_max) < 0) p_max = 0

        // var p_yscale = d3.scaleLinear()
        //     .domain([parseInt(p_min), parseInt(p_max)])
        //     // .domain([-50, 150])
        //     .range([245, 0])

        var p_xscale = d3.scaleLinear()
            .domain([0.5, 20.5])
            .range([40, p_width + 80])

        // var p_yscale = d3.scaleLinear()
        //     .domain([parseInt(p_min), parseInt(p_max)])
        //     // .domain([-50, 150])
        //     .range([255, 0])

        if (parseInt(p_min) > 0) p_min = 0
        if (parseInt(p_max) < 0) p_max = 0
        if (p_min >= -600) p_min = -600;
        if (p_max <= 600) p_max = 600;

        PaintBackground(0.1, 600, -600);

        var p_yscale = d3.scaleLinear()
            .domain([-600, 600])
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
        var p_scale = d3.scaleLinear()
            .domain([0, pie_scale])
            .range([4.5, 20])

        var l_scale = d3.scaleLinear()
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
                    if (d.y1 > 600)
                    d.y1 = 600;
                    if (d.y1 < -600)
                    d.y1 = -600;
                    return p_yscale(d.y1)
                })
                .attr('x2', d => {
                    return p_xscale(d.x2)
                })
                .attr('y2', d => {
                    if (d.y2 > 600)
                    d.y2 = 600;
                    if (d.y2 < -600)
                    d.y2 = -600;
                    return p_yscale(d.y2)
                })
                .attr('fill', 'none')
                .attr('stroke-width', d => {
                    return 1;
                })
                // .attr('stroke', '#0a3c75')
                .attr('stroke', (d, i) => {
                    return 'black';
                })
                .attr('stroke-opacity', 0.5)

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

            
        }


    })
}