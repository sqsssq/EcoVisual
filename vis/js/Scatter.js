var widtha = 374;
var heighta = 307;
// var padding = { top: 10, bottom: 10, left: 10, right: 10 }
var K = 0;
var r = 0

var ssvg = 0;

var orret_g = 0

function PP() {
    ssvg = d3.select("#Tsne").append("svg")
        .attr("width", widtha)
        .attr("height", heighta)
    // .append("g")
    // // .attr("transform", "translate(0,100)")
    // .attr("transform", "translate(0, 0)");
}

var pr = [];

var coor = [];

var tcircle = 0;
var flag = -1;



PP()

function ScatterPaint(coor, p, num) {
    // PP()

    // console.log(num)

    if (tcircle != 0) tcircle.remove()
    if (r != 0) r.remove()
    var padding = {
        top: 5,
        right: 10,
        bottom: 5,
        left: 10
    };

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


    // var color = ['#00a676', '#f9c80e', '#3abeff', '#df19c1', '#ff206e', '#f08700', '#0091c9', '#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD']
    // var color = ['#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD']
    // 可以自动生成颜色
    var color = [];
    for (i = 0; i < 80; i++) {
        var letters = '0123456789ABCDEF'.split('');
        var rand_color = '#';
        for (var j = 0; j < 6; j++) {
            rand_color += letters[Math.round(Math.random() * 15)];
        }
        color[i] = rand_color;
    }

    tcircle = ssvg.selectAll("circle")
        .data(coor)
        .enter()
        .append("circle")
        .attr("fill", d => {
            return color[d.label]
        })
        .attr("fill-opacity", "1")
        .attr("id", "circleid")
        .attr("cx", function (d) {
            //console.log(d);
            // if (d.l == num)
            return padding.left + xScale(d.x);
        })
        .attr("cy", function (d) {
            // if (d.l == num)
            return yScale(d.y);
        })
        .attr("r", 2)
        // .attr('stroke', d => {
        //     return color[d.label]
        // })
        // .attr('stroke-width', 0.8)
        .attr('fill-opacity', 0.3)
        .on("mouseover", function (d, i) {
            // console.log(d)
            d3.select(this)
                .attr("fill", "yellow");
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("fill", d => {
                    return color[d.label]
                });
        });

    // console.log(tcircle)

    // coor.length = 0;

    var brush = d3.svg.brush()
        .x(xScale)
        .y(yScale)
        .extent([
            [0, 0],
            [0, 0]
        ])
        .on("brush", brushed)

    function brushed() {
        var extent = brush.extent();
        var xmin = extent[0][0];
        var xmax = extent[1][0];
        var ymin = extent[0][1];
        var ymax = extent[1][1];

        for (var i in coor) {
            // console.log(i)
            if (coor[i].x >= xmin && coor[i].x <= xmax && coor[i].y >= ymin && coor[i].y <= ymax) {
                // console.log(coor[i])
                if (flag == -1)
                    flag = coor[i].label;
                // return "red";
            }
        }

        // console.log(flag)

        if (K == 0 && flag != -1) {

            console.log(flag)
            var coor_p = {}

            for (var i in p) {
                // console.log(p[i][0])
                if (p[i][0].label == flag) {
                    coor_p[i] = p[i];
                }
            }

            // console.log(coor_p)

            var coor_path = PathCalc(coor_p, -1, -1);

            // console.log(coor_path[1])

            var n__ = []
            for (var i in coor_path[1]) {
                n__.push(i)
            }

            OrRect(n__, color[flag])

            if (LineName != 0) LineName.remove();

            LinePaint_2(coor_path[0], coor_path[2], color[flag])

            K = 1;
        }
    }

    // console.log(flag)
    r = ssvg.append("g")
        .call(brush)
        .selectAll("rect")
        .style("fill-opacity", 0.3)
}


function ScatterPaint_gain_loss(coor, p, num_coor) {
    // PP()

    if (tcircle != 0) tcircle.remove()
    if (r != 0) r.remove()

    console.log(num_coor)
    var padding = {
        top: 5,
        right: 10,
        bottom: 5,
        left: 10
    };

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


    // var color = ['#00a676', '#f9c80e', '#3abeff', '#df19c1', '#ff206e', '#f08700', '#0091c9']
    var color = ['#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD']
    tcircle = ssvg.selectAll("circle")
        .data(coor)
        .enter()
        .append("circle")
        .attr("fill", (d, i) => {
            if (num_coor[i][91] <= 0)
                return '#00FF00'
            else
                return 'red'
        })
        .attr("fill-opacity", "1")
        .attr("id", "circleid")
        .attr("cx", function (d) {
            //console.log(d);
            return padding.left + xScale(d.x);
        })
        .attr("cy", function (d) {
            return yScale(d.y);
        })
        .attr("r", 2)
        .attr('stroke', (d, i) => {
            if (num_coor[i][91] <= 0)
                return '#00FF00'
            else
                return 'red'
        })
        .attr('stroke-width', 0.8)
        .attr('fill-opacity', 1)
        .on("mouseover", function (d, i) {
            // console.log(d)
            d3.select(this)
                .attr("fill", "yellow");
        })
        .on("mouseout", function (d, i) {
            d3.select(this)
                .attr("fill", d => {
                    return color[d.label]
                });
        });

    // console.log(tcircle)

    // coor.length = 0;

    var brush = d3.svg.brush()
        .x(xScale)
        .y(yScale)
        .extent([
            [0, 0],
            [0, 0]
        ])
        .on("brush", brushed)

    function brushed() {
        var extent = brush.extent();
        var xmin = extent[0][0];
        var xmax = extent[1][0];
        var ymin = extent[0][1];
        var ymax = extent[1][1];

        for (var i in coor) {
            // console.log(i)
            if (coor[i].x >= xmin && coor[i].x <= xmax && coor[i].y >= ymin && coor[i].y <= ymax) {
                // console.log(coor[i])
                if (flag == -1)
                    flag = coor[i].label;
                // return "red";
            }
        }

        // console.log(flag)

        if (K == 0 && flag != -1) {

            // console.log(flag)
            var coor_p = {}

            for (var i in p) {
                // console.log(p[i][0])
                if (p[i][0].label == flag) {
                    coor_p[i] = p[i];
                }
            }

            // console.log(coor_p)

            var coor_path = PathCalc(coor_p, -1, -1);

            // console.log(coor_path[1])

            var n__ = []
            for (var i in coor_path[1]) {
                n__.push(i)
            }

            OrRect(n__, color[flag])

            if (LineName != 0) LineName.remove();

            LinePaint_2(coor_path[0], coor_path[2], color[flag])

            K = 1;
        }
    }

    // console.log(flag)
    r = ssvg.append("g")
        .call(brush)
        .selectAll("rect")
        .style("fill-opacity", 0.3)
}

function OrRect(data, color) {
    d3.csv('data/back.csv', d => {
        // console.log(data)


        var nameList = {}

        for (var i in d) {
            nameList[d[i].code] = i
        }


        if (orret_g != 0) {
            orret_g.remove()
        }

        // console.log(nameList)

        orret_g = Codesvg.append('g')

        orret_g.selectAll('#org_r')
            .attr('id', 'org_r')
            .data(data)
            .enter()
            .append('rect')
            .attr("x", paddingx.left)
            .attr("y", d => {
                return (parseInt(nameList[d]) + 1) * 20
            })
            .attr("width", 923)
            .attr("height", 20)
            .attr("fill", color)
            .attr('fill-opacity', 0.3)
            .on('click', d => {
                if (d_num == 0) {
                    if (judge_cir_line == 0)
                        Paintjudge(d);
                    else
                        PaintCir(d);
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
                    }
                }
            })
    })
}