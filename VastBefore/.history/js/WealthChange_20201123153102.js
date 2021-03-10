var p_width = document.getElementById("AnaLineView").clientWidth;
var p_height = document.getElementById("AnaLineView").clientHeight;

var judge_cir_line = 0

var decisionNumber = 11;

// var fileURL = 'data/ts/11111111112db.json';
// var fileURL = 'data/ts/11111111113db.json';
var fileURL = 'data/ts/20200831db.json'

var d_num = 0;

var peo_svg = d3.select("#AnaLineView").append('svg')
    .attr('width', p_width)
    .attr('height', p_height)

var lc_p_g = 0;

lc_p_g = peo_svg.append('g')

var peo_g = 0;
var background_g = 0;
var typeCircle;
var typeLine;
var typePie = new Array();
var axis_g = 0;
var axisSelectG = 0;

var nam = 0;
// var color = ['#00a676', '#f9c80e', '#3abeff', '#df19c1', '#ff206e', '#f08700', '#0091c9', '#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD']
var color_kgggg = ['#434348', '#90ed7d', '#f7a35c', '#8085e9',
    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
]

var BoxIn = new Object();
var PeoLine = new Object();
var PeoCir = new Object();

function PaintBackground(opac, px, pn) {
    nam = name;
    d3.csv('data/box_calcr.csv').then((data) => {
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

        var p_xscale = d3.scaleLinear()
            .domain([0, 20.5])
            .range([0, p_width - 20])

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

// PaintBackground(1, 600, -600);

var line_un = lc_p_g.append('g');
var lxcir = lc_p_g.append('g');


function axisSelect(dataAddress, label) {
    d3.json(dataAddress).then((type_data) => {
        if (axisSelectG != 0) {
            axisSelectG.remove();
        }
        axisSelectG = peo_svg.append("g")
            .attr("transform", "translate(" + 0 + "," + 40 + ")");
        var minY = 999,
            maxY = -999;
        for (var i in type_data) {
            maxY = Math.max(maxY, type_data[i].label);
            minY = Math.min(minY, type_data[i].label);
        }
        var p_yscale = d3.scaleLinear()
            .domain([maxY, minY])
            // .domain([-50, 150])
            .range([p_height - 50, 0])
        axisSelectG.append('circle')
            .attr('cx', 15)
            .attr('cy', p_yscale(label))
            .attr('r', 8)
            .attr('fill', 'none')
            .attr('stroke', 'blue')
    })
}

function CirLun(knum) {
    if (lxcir != 0) lxcir.remove();
    lxcir = lc_p_g.append('g');

    var p_xscale = d3.scaleLinear()
        .domain([0, 20.5])
        .range([0 + 30, p_width - 20 + 30])

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
        .domain([0, 20.5])
        .range([0 + 30, p_width - 20 + 30])

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

// Paintjudge_sum()

function Paintjudge_sum() {
    // nam = name;
    d3.csv('data/box_calc.csv').then((data) => {
        d3.csv('data/treatment.csv').then(treatData => {
            // console.log(data)
            if (peo_g != 0) peo_g.remove();

            var peopleTreat = new Object();

            for (let i in treatData) {
                peopleTreat[treatData[i].code] = treatData[i].treat;
            }
            console.log(peopleTreat);

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
                        p_['name'] = name[select_name];
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
                .domain([0, 20.5])
                .range([0, p_width - 20])

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
                .range([p_height - 50, 0])


            line_data = []
            circle_data = []
            line1_data = []
            var dif_max = -100000
            var dif_min = 100000

            for (var p_data_num in p_data) {
                // console.log(p_data)
                line_data.push([]);
                circle_data.push([]);
                line_data[p_data_num].push({
                    x1: 0,
                    y1: 0,
                    x2: parseInt(p_data[p_data_num][0]['lun']),
                    y2: p_data[p_data_num][0]['price'],
                    id: p_data[p_data_num][0]['name']
                });
                circle_data[p_data_num].push({
                    x: parseInt(p_data[p_data_num][0]['lun']),
                    y: p_data[p_data_num][0]['price'],
                    l: 0,
                    id: p_data[p_data_num][0]['name']
                });
                for (var i = 1; i < 20; ++i) {
                    circle_data[p_data_num].push({
                        x: parseInt(p_data[p_data_num][i]['lun']),
                        y: p_data[p_data_num][i]['price'],
                        l: i,
                        id: p_data[p_data_num][i]['name']
                    });
                    l = {}
                    l['x1'] = parseInt(p_data[p_data_num][i - 1]['lun'])
                    l['y1'] = p_data[p_data_num][i - 1]['price']
                    l['x2'] = parseInt(p_data[p_data_num][i]['lun'])
                    l['y2'] = p_data[p_data_num][i]['price']
                    l['id'] = p_data[p_data_num][i]['name'];
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

            // console.log(circle_data);

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
            // console.log(line_data)


            for (var peo_num in line_data) {
                PeoLine[line_data[peo_num][0].id] = peo_g.selectAll('#peo_l')
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
                        // console.log(d);
                        // return 'black';
                        return color_kgggg[peopleTreat[d.id]];
                    })
                    .attr('stroke-opacity', 1)
                PeoCir[line_data[peo_num][0].id] = peo_g.selectAll("#peo_c")
                    .attr("id", 'peo_c')
                    .data(circle_data[peo_num])
                    .enter()
                    .append('g')
                    .append('circle')
                    .attr('cx', d => {
                        return p_xscale(d.x);
                    })
                    .attr('cy', d => {
                        if (d.y > 600)
                            d.y = 600;
                        if (d.y < -600)
                            d.y = -600;
                        return p_yscale(d.y);
                    })
                    .attr('r', 2)
                    .attr('fill', 'red')
                    .attr('fill-opacity', 0);

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

            // for (var peo_num in line_data) {
            //     PeoLine[line_data[peo_num][0].id].on('mouseover', (d, i) => {
            //             // console.log(d);
            //             LineName.attr('stroke-opacity', (x) => {
            //                 // for (let r in SelectName) {
            //                 //     if (x.code == select_name[r])
            //                 //     return 1;
            //                 // }
            //                 if (x.code == line_data[peo_num][0].id)
            //                     return 1;
            //                 else
            //                     return 0
            //             })
            //             for (k in Line_Name) {
            //                 Line_Name[k].attr('stroke-opacity', (x) => {
            //                     // for (let r in select_name) {
            //                     //     if (x.code == select_name[r])
            //                     //     return 1;
            //                     // }
            //                     if (x.code == line_data[peo_num][0].id)
            //                         return 1;
            //                     else
            //                         return 0
            //                 })
            //             }

            //             scatterline(d.code);

            //             for (let kname in PeoLine) {
            //                 if (kname != line_data[peo_num][0].id) {
            //                     PeoLine[kname].attr("stroke-opacity", 0);
            //                 } else {
            //                     PeoLine[kname].attr("stroke-opacity", 1);
            //                 }
            //             }
            //             // rect_line.attr('opacity', (x, y) => {
            //             //     if (x.code != d.code) {
            //             //         for (k in select_name) {
            //             //             if (select_name[k] == x.code)
            //             //                 return 1;
            //             //         }
            //             //         return 0.1;
            //             //     } else {
            //             //         return 1;
            //             //     }
            //         })
            //         //     // rect_circle.attr('opacity', (x, y) => {
            //         //     //     if (x.code != d.code) {
            //         //     //         for (k in select_name) {
            //         //     //             if (select_name[k] == x.code)
            //         //     //                 return 1;
            //         //     //         }
            //         //     //         return 0.1;
            //         //     //     } else {
            //         //     //         return 1;
            //         //     //     }
            //         //     // })
            //         // })
            //         .on('mouseout', (d, i) => {
            //             LineName.attr('stroke-opacity', (x) => {
            //                 // if (select_name.length == 0)
            //                 //     return 0.1;
            //                 // for (let k in select_name) {
            //                 //     if (select_name[k] == x.code) {
            //                 //         return 1;
            //                 //     }
            //                 // }
            //                 // return 0;
            //                 return 0.1;
            //             })
            //             for (k in Line_Name) {
            //                 Line_Name[k].attr('stroke-opacity', (x) => {
            //                     return 0.1;
            //                 })
            //             }
            //             for (let kname in PeoLine) {
            //                 // if (kname != d.code) {
            //                 //     PeoLine[kname].attr("stroke-opacity", 0);
            //                 // } else {
            //                 PeoLine[kname].attr("stroke-opacity", 0.1);
            //                 // }
            //             }
            //             if (scatterlinein != 0) {
            //                 scatterlinein.remove();
            //                 scatterlinein = 0;
            //             }
            //             // if (select_name.length == 0)
            //             //     rect_line.attr('opacity', 1);
            //             // else {
            //             //     rect_line.attr('opacity', (x, y) => {
            //             //         for (k in select_name) {
            //             //             if (select_name[k] == x.code)
            //             //                 return 1;
            //             //         }
            //             //         return 0.1;
            //             //     })
            //             // }
            //             //     // if (select_name.length == 0)
            //             //     //     rect_circle.attr('opacity', 1);
            //             //     // else {
            //             //     //     rect_circle.attr('opacity', (x, y) => {
            //             //     //         for (k in select_name) {
            //             //     //             if (select_name[k] == x.code)
            //             //     //                 return 1;
            //             //     //         }
            //             //     //         return 0.1;
            //             //     //     })
            //             //     // }
            //         })

            // }
            // console.log(PeoLine)

        })
    })
}

// TypeChangeSankeyView('data/ts/20200831db.json');

function TypeChangeSankeyView(data_address) {
    // nam = name;
    d3.json(data_address).then((type_data) => {
        // console.log(type_data)
        if (axis_g != 0) axis_g.remove();

        var peopleTreat = new Object();

        var lsx = new Object();
        var lsxNum = 0;
        for (var i in type_data) {
            if (typeof (lsx[type_data[i].label]) == "undefined") {
                lsx[type_data[i].label] = 1;
                lsxNum++;
            }
        }

        // console.log(peopleTreat);

        var minY = 999,
            maxY = -999;
        for (var i in type_data) {
            maxY = Math.max(maxY, type_data[i].label);
            minY = Math.min(minY, type_data[i].label);
        }


        axis_g = peo_svg.append('g')
            .attr("transform", "translate(" + 0 + "," + 40 + ")")

        var p_xscale = d3.scaleLinear()
            .domain([0, 20.5])
            .range([0, p_width - 20])

        var p_yscale = d3.scaleLinear()
            .domain([maxY, minY])
            // .domain([-50, 150])
            .range([p_height - 50, 0])

        var xAxis = d3.axisBottom().scale(p_xscale).ticks(0);
        var yAxis = d3.axisLeft().scale(p_yscale).ticks(lsxNum); //添加一个g用于放x轴

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
        //     .attr("dx", "160em")
        //     .attr("dy", "0.5em") //沿y轴平移一个字体的大小
        axis_g.append("g")
            .attr("class", "axisX")
            .attr("transform", "translate(" + 30 + "," + 0 + ")")
            .call(yAxis)
        // .append('text')
        // .text('总收益')
        // .attr("transform", "rotate(-90)") //text旋转-90°
        // .attr("text-anchor", "end") //字体尾部对齐
        // .attr("dx", "1em")
        // .attr("dy", "-1em") //沿y轴平移一个字体的大小;

        // console.log(type_data)

        var nums = new Array();
        for (let i = 0; i < lsxNum; ++i) {
            nums.push(i);
        }
        axis_g.selectAll('#lunX')
            .attr('id', 'lunX')
            .data(nums)
            .enter()
            .append('text')
            .attr('x', (d, i) => {
                return 15;
            })
            .attr('y', (d, i) => {
                return p_yscale(i) + 3;
            })
            .attr('font-size', '9px')
            .attr('text-anchor', 'middle')
            // .attr("font-family", "courier")
            .text((d, i) => {
                return d;
            })
            .on('mouseover', d => {
                tcircle.attr('fill-opacity', x => {
                    if (x.label != d)
                        return 0.00;
                })
            })
            .on('mouseout', d => {
                tcircle.attr('fill-opacity', 0.6);
            })
            .on('click', d => {
                axisSelect(fileURL, d);
                RadarGlyph(d, decisionNumber);
            })



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

        let valuemax = -1;
        let valuemin = 9000;

        for (let i = 0; i <= lsxNum; ++i) {
            for (let j = 0; j <= lsxNum; ++j) {
                if (j >= i && ed[i * 100 + j].value != 0 && ed[i * 100 + j].value > 10) {
                    if (valuemax < ed[i * 100 + j].value) {
                        valuemax = ed[i * 100 + j].value;
                    }
                    if (valuemin > ed[i * 100 + j].value) {
                        valuemin = ed[i * 100 + j].value;
                    }
                    // console.log(ed[i * 100 + j]);
                    edges.push(ed[i * 100 + j])
                }
            }
        }
        console.log(edges);

        var valueScale = d3.scaleLinear()
            .domain([valuemin, valuemax])
            .range([5, 1]);

        var widScale = d3.scaleLinear()
            .domain([valuemin, valuemax])
            .range([1, 5]);

        let rx = 5;
        for (let i in edges) {
            if (i != 28) continue
            if (edges[i].source == edges[i].target) continue;
            let x = p_yscale(edges[i].source);
            let y = p_yscale(edges[i].target);
            let l = (y - x) / 2;
            let w = widScale(edges[i].value);
            console.log(edges[i].source, edges[i].target)
            let r = ((l * l + rx * rx) / (2 * rx));
            console.log(r)
            axis_g.append('circle')
                .attr('cx', -r + rx + 30)
                .attr('cy', (y + x) / 2)
                .attr('r', r)
                .attr('fill', 'none')
                .attr('stroke-width', w)
                .attr('stroke', 'black');
            // break;
        }

    })
}

typeDraw(fileURL, 1);
// typeDraw('data/ts/20200831db.json', 1);


// axisSelect(fileURL, 1);

function typeConnect(data_address) {
    d3.json(data_address).then((coor) => {
        d3.csv('data/box_calc.csv').then((rectdata) => {

            var lsx = new Object();
            var lsxNum = 0;
            for (var i in coor) {
                if (typeof (lsx[coor[i].label]) == "undefined") {
                    lsx[coor[i].label] = 1;
                    lsxNum++;
                }
            }

            let nodes = new Array();
            for (let i = 0; i <= lsxNum; ++i) {
                nodes.push({
                    name: i
                });
            }

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

            let nameData = new Object();
            for (let i in coor) {
                if (typeof (nameData[coor[i].id]) == 'undefined') {
                    nameData[coor[i].id] = new Array();
                }
                nameData[coor[i].id].push(coor[i]);
            }
            // console.log(nameData);

            for (let i in nameData) {
                for (let j = 0; j < 19; ++j) {
                    // console.log(nameData[i][j].label * 100 + nameData[i][j + 1].label)
                    ed[parseInt(nameData[i][j].label) * 100 + parseInt(nameData[i][j + 1].label)].value++;
                }
            }

            let valuemax = -1;
            let valuemin = 9000;

            for (let i = 0; i <= lsxNum; ++i) {
                for (let j = 0; j <= lsxNum; ++j) {
                    if (j >= i && ed[i * 100 + j].value != 0 && ed[i * 100 + j].value > 10) {
                        if (valuemax < ed[i * 100 + j].value) {
                            valuemax = ed[i * 100 + j].value;
                        }
                        if (valuemin > ed[i * 100 + j].value) {
                            valuemin = ed[i * 100 + j].value;
                        }
                        // console.log(ed[i * 100 + j]);
                        edges.push(ed[i * 100 + j])
                    }
                }
            }
            // console.log(edges);

            var valueScale = d3.scaleLinear()
                .domain([valuemin, valuemax])
                .range([5, 1]);

            var widScale = d3.scaleLinear()
                .domain([valuemin, valuemax])
                .range([1, 10]);


        })
    })
}

function typeDraw(data_address, name) {
    d3.json(data_address).then((type_data) => {
        d3.csv('data/box_calc.csv').then((data) => {
            //     d3.csv('data/treatment.csv').then(treatData => {
            // console.log(data)
            if (peo_g != 0) peo_g.remove();

            var peopleTreat = new Object();

            // for (let i in treatData) {
            //     peopleTreat[treatData[i].code] = treatData[i].treat;
            // }
            // console.log(peopleTreat);

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
            // console.log(lunGetMoney)
            peo_g = peo_svg.append('g')
                .attr("transform", "translate(" + 30 + "," + 40 + ")");

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

            var xAxis = d3.axisBottom().scale(p_xscale).ticks(0);
            var yAxis = d3.axisLeft().scale(p_yscale).ticks(25); //添加一个g用于放x轴

            var nameLineDatax = new Object();
            // for (let i in type_data) {
            //     if (typeof (nameLineDatax[type_data[i].id]) == 'undefined') {
            //         // console.log(type_data[i].l)
            //         nameLineDatax[type_data[i].id] = new Object();
            //     }

            //     nameLineDatax[type_data[i].id][type_data[i].l] = type_data[i].label;
            // }
            // console.log(nameLineData);
            // var diagonalDatax = new Object();
            // var maxDia = 0;
            // for (let i in nameLineDatax) {
            //     for (let j = 1; j < 20; ++j) {
            //         // console.log(j * 1000000 + nameLineData[j] * 10000 + (j + 1) * 100 + nameLineData[j + 1])
            //         if (typeof (diagonalDatax[j * 1000000 + nameLineDatax[i][j] * 10000 + (j + 1) * 100 + nameLineDatax[i][j + 1]]) == 'undefined')
            //             diagonalDatax[j * 1000000 + nameLineDatax[i][j] * 10000 + (j + 1) * 100 + nameLineDatax[i][j + 1]] = 0;
            //         diagonalDatax[j * 1000000 + nameLineDatax[i][j] * 10000 + (j + 1) * 100 + nameLineDatax[i][j + 1]]++;
            //         maxDia = Math.max(maxDia, diagonalDatax[j * 1000000 + nameLineDatax[i][j] * 10000 + (j + 1) * 100 + nameLineDatax[i][j + 1]]);
            //     }
            // }
            // console.log(diagonalDrawData)
            // var typeLineDatax = new Object();
            // for (let i = 1; i <= 20; ++i) {
            //     typeLineDatax[i] = new Object;
            //     for (let j = 0; j <= 24; ++j) {
            //         typeLineDatax[i][j] = 0;
            //     }
            // }
            // var maxCir = 0;
            // for (let i in nameLineDatax) {
            //     for (let j in nameLineDatax[i]) {
            //         // console.log(j);
            //         typeLineDatax[j][nameLineDatax[i][j]]++;
            //         maxCir = Math.max(maxCir, typeLineDatax[j][nameLineDatax[i][j]]);
            //     }
            // }
            // console.log(maxCir)


            // console.log(type_data)
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
            // console.log(typeCircleData)

            // console.log(typeCircleData)

            var circleScale = d3.scaleLinear()
                .domain([0, maxCir])
                .range([2, name == 1 ? 9 : 5]);
            var diagonalScale = d3.scaleLinear()
                .domain([0, maxCir])
                .range([0.3, name == 1 ? 8 : 3]);
            // console.log(typeCircleData)

            var diagonal = d3.linkHorizontal()
                .x(function (d) {
                    return d.y;
                })
                .y(function (d) {
                    return d.x;
                });
            // console.log(diagonalDrawData)
            typeLine = peo_g.selectAll('#typeLine')
                .attr('id', 'typeLine')
                .data(typeDiagonalData)
                .enter()
                .append('g')
                .append('path')
                .attr('d', d => {
                    // console.log(d)
                    return diagonal(d);
                })
                .attr('stroke', 'gray')
                .attr('stroke-width', d => {
                    return diagonalScale(d.typeNum);
                })
                .attr('fill', 'none')
                .attr('stroke-opacity', 0.5);
            // typeCircle = peo_g.selectAll('#typeCircle')
            //     .attr('id', 'typeCircle')
            //     .data(typeCircleData)
            //     .enter()
            //     .append('circle')
            //     .attr('cx', d => {
            //         return p_xscale(d.lun);
            //     })
            //     .attr('cy', d => {
            //         return p_yscale(d.type);
            //     })
            //     .attr('r', d => {
            //         // if (isNaN(d.typeNum))
            //         // console.log(circleScale(d.typeNum))
            //         return circleScale(d.typeNum);
            //     })
            //     .attr('fill', 'white')
            //     .attr('stroke', 'red')
            //     .attr('stroke-width', 0.5);

            //新建一个饼状图
            var pie = d3.pie();
            //新建一个弧形生成器
            var innerRadius = 0; //内半径
            var outerRadius = 100; //外半径
            typePie = new Array();
            // console.log(typeCircleData)
            for (var i in typeCircleData) {
                var arc_generator = d3.arc()
                    .innerRadius(0)
                    .outerRadius(circleScale(typeCircleData[i].typeNum));
                typePie.push(peo_g.selectAll('#typePie')
                    .attr('id', 'typePie')
                    .data(pie(typeCircleData[i].pieNum))
                    .enter()
                    .append('g')
                    .attr("transform", "translate(" + p_xscale(typeCircleData[i].lun) + "," + p_yscale(typeCircleData[i].type) + ")")
                    .append('path')
                    .attr("d", function (d) {
                        // console.log(d); 
                        return arc_generator(d); //往弧形生成器中出入数据
                    })
                    .attr("fill", function (d, i) {
                        // if (i == 0)
                        //     return '#41CA77'
                        // else
                        //     return '#D8483E';
                        if (i == 0)
                            return 'red';
                        // return '#00ff00';
                        else
                            return '#00ff00';
                        // return 'red';
                    }));
            }
            var tcirclet = peo_g.selectAll("#tcirt")
                .attr('id', 'tcirt')
                .data(typeCircleData)
                .enter()
                .append('circle')
                .attr('cx', d => {
                    // console.log(d)
                    return p_xscale(d.lun);
                })
                .attr('cy', d => {
                    return p_yscale(d.type);
                })
                .attr('r', d => {
                    return circleScale(d.typeNum);
                })
                .attr('fill', 'black')
                .attr('stroke', 'none')
                .attr('fill-opacity', 0)
            // .on('mouseover', d => {
            //     console.log(d)
            // });
            //     })
            if (name != 1) {
                tcirclet.on('click', d => {
                    RadarGlyphPeo(name, decisionNumber, d.lun);
                })
            }
        })
    })
}