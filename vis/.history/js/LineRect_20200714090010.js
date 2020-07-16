var heightLine = 80;
var widthLine = 1250;

var linesvg =
    // d3.select('#LineSvg')
    svg.append('g')
    .append('svg')
    .attr('width', widthLine + 100)
    .attr('height', heightLine)
// .attr("transform", "translate(" + 50 + "," + 0 + ")");

var rg_line = 0;
var rect_line = 0;
var rect_circle = 0;

var select_name = new Array();

function FinaceRect(num) {
    if (rg_line != 0)
        rg_line.remove();
    rg_line = linesvg.append('g')
        .attr("transform", "translate(" + 30 + "," + 40 + ")");
    d3.csv("data/box_calc.csv", function (data) {
        var lineData = new Array();
        let maxxa = -999999;
        let minxa = 999999;
        let name_en = new Object();
        for (var i in data) {
            if (parseInt(data[i].biao) == num) {
                if (parseFloat(data[i]['129']) > 600) data[i]['129'] = 600;
                if (parseFloat(data[i]['129']) < -600) data[i]['129'] = -600;
                lineData.push(data[i]);
                maxxa = Math.max(maxxa, parseFloat(data[i]['129']));
                minxa = Math.min(minxa, parseFloat(data[i]['129']));
                if (num == 1)
                    name_en[data[i]['code']] = {
                        label: 0,
                        val: 0
                    };
            }
            if (num > 1) {
                if (parseInt(data[i].biao) == num - 1) {
                    if (parseFloat(data[i]['129']) > 600) data[i]['129'] = 600;
                    if (parseFloat(data[i]['129']) < -600) data[i]['129'] = -600;
                    // lineData.push(data[i]);
                    maxxa = Math.max(maxxa, parseFloat(data[i]['129']));
                    minxa = Math.min(minxa, parseFloat(data[i]['129']));
                    name_en[data[i]['code']] = {
                        label: data[i]['label'],
                        val: data[i]['129']
                    };
                }
            }
        }
        // console.log((name_en))
        lineData.sort(function (a, b) {
            return -parseFloat(b['129']) + parseFloat(a['129']);
        })
        // console.log(lineData)
        let lmaxa = Math.max(Math.abs(parseFloat(maxxa)), Math.abs(parseFloat(minxa)));
        var l_rect_scale = d3.scale.linear()
            .domain([0, lmaxa])
            .range([0, 35]);
        var lllll = d3.scale.linear()
            .domain([lmaxa, -lmaxa])
            .range([-35, 35]);
        var l_x_scale = d3.scale.linear()
            .domain([-0.5, 304])
            .range([3, widthLine - 5])

        var xAxis = d3.svg.axis().scale(l_x_scale).ticks(0).tickFormat(d3.format("d")).orient("bottom");
        var yAxis = d3.svg.axis().scale(lllll).ticks(5).tickFormat(d3.format("d")).orient("left"); //添加一个g用于放x轴
        rg_line.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + 0 + "," + lllll(0) + ")")
            .attr("stroke-width", 0.1)
            .call(xAxis)
        // .append('text')
        // .text('轮数')
        // // .attr("transform", "rotate(-90)") //text旋转-90°
        // .attr("text-anchor", "end") //字体尾部对齐
        // .attr("dx", "121em")
        // .attr("dy", "0.5em") //沿y轴平移一个字体的大小
        rg_line.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + 3 + "," + 0 + ")")
            .call(yAxis)
            .append('text')
            // .attr("transform", "rotate(-90)") //text旋转-90°
            .attr("text-anchor", "end") //字体尾部对齐
            .attr('font-size', 1)
            .attr("dx", "4.5em")
            .attr("dy", "-4em") //沿y轴平移一个字体的大小;
            .text('收益值')


        rect_line = rg_line.selectAll('#rlll')
            .attr('id', 'rlll')
            .data(lineData)
            .enter()
            .append('rect')
            .attr('x', (d, i) => {
                return l_x_scale(i);
            })
            .attr('y', (d, i) => {
                // console.log(i);
                // return 157 - l_rect_scale(Math.abs(parseFloat(d['129'])));
                if (parseFloat(d['129']) > 0)
                    return 0 - l_rect_scale(Math.abs(parseFloat(d['129'])));
                else return 0
            })
            .attr('height', d => {
                return l_rect_scale(Math.abs(parseFloat(d['129'])));
            })
            .attr('width', (d, i) => {
                return 4;
            })
            .attr('fill', (d, i) => {
                if (parseInt(d['label']) == 0)
                    return '#00FF00';
                else if (parseInt(d['label']) == 1) {
                    return 'yellow';
                } else
                    return 'red';
            })
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('stroke-opacity', 0.1)
            .on('mouseover', (d, i) => {
                // console.log(d);
                // d3.select(this)
                //     .attr('fill', d => {
                //         return 'black';
                //     })
                //     .attr('fill-opacity', 1)
                // rect_line.attr('opacity', (x, y) => {
                //     if (x.code != d.code) {
                //         for (k in select_name) {
                //             if (select_name[k] == x.code)
                //                 return 1;
                //         }
                //         return 0.1;
                //     } else {
                //         return 1;
                //     }
                // })
                LineName.attr('stroke-opacity', (x) => {
                    for (let r in select_name) {
                        if (x.code == select_name[r])
                            return 1;
                    }
                    if (x.code == d.code)
                        return 1;
                    else
                        return 0
                })
                for (k in Line_Name) {
                    Line_Name[k].attr('stroke-opacity', (x) => {
                        for (let r in select_name) {
                            if (x.code == select_name[r])
                                return 1;
                        }
                        if (x.code == d.code)
                            return 1;
                        else
                            return 0
                    })
                }
                rect_line.attr('opacity', (x, y) => {
                    if (x.code != d.code) {
                        for (k in select_name) {
                            if (select_name[k] == x.code)
                                return 1;
                        }
                        return 0.1;
                    } else {
                        return 1;
                    }
                })
                // rect_circle.attr('opacity', (x, y) => {
                //     if (x.code != d.code) {
                //         for (k in select_name) {
                //             if (select_name[k] == x.code)
                //                 return 1;
                //         }
                //         return 0.1;
                //     } else {
                //         return 1;
                //     }
                // })
            })
            .on('mouseout', (d, i) => {
                // if (select_name.length == 0)
                //     rect_line.attr('opacity', 1);
                // else {
                //     rect_line.attr('opacity', (x, y) => {
                //         for (k in select_name) {
                //             if (select_name[k] == x.code)
                //                 return 1;
                //         }
                //         return 0.1;
                //     })
                // }
                LineName.attr('stroke-opacity', (x) => {
                    if (select_name.length == 0)
                        return 0.1;
                    for (let k in select_name) {
                        if (select_name[k] == x.code) {
                            return 1;
                        }
                    }
                    return 0;
                })
                for (k in Line_Name) {
                    Line_Name[k].attr('stroke-opacity', (x) => {
                        if (select_name.length == 0)
                            return 0.1;
                        for (let r in select_name) {
                            if (select_name[r] == x.code) {
                                return 1;
                            }
                        }
                        return 0;
                    })
                }
                if (select_name.length == 0)
                    rect_line.attr('opacity', 1);
                else {
                    rect_line.attr('opacity', (x, y) => {
                        for (k in select_name) {
                            if (select_name[k] == x.code)
                                return 1;
                        }
                        return 0.1;
                    })
                }
                // if (select_name.length == 0)
                //     rect_circle.attr('opacity', 1);
                // else {
                //     rect_circle.attr('opacity', (x, y) => {
                //         for (k in select_name) {
                //             if (select_name[k] == x.code)
                //                 return 1;
                //         }
                //         return 0.1;
                //     })
                // }
            })
            .on('click', (d, i) => {
                console.log(d);
                if (select_name.length == 0)
                    select_name.push(d.code);
                else {
                    if (d_num == 1) {
                        select_name.push(d.code);
                    } else {
                        select_name[0] = d.code;
                    }
                }
                Paintjudge_2(select_name);
            })

        var linePath = d3.svg.line()
            .x(function (d, i) {
                return l_x_scale(d[0]);
            })
            .y(function (d, i) {
                return lllll(d[1]);
            });

        let zdata = new Array();
        for (let i in lineData) {
            zdata.push([parseInt(i), parseFloat(name_en[lineData[i].code].val)]);
        }

        console.log(zdata)

        rect_z = rg_line.select('#zp')
            .attr('id', 'zp')
            // .data(zdata)
            // .enter()
            .append('path')
            .attr('d', linePath(zdata))
            .attr('fill', 'none')
            .attr('stroke-width', 3)
            .attr('stroke', 'black')


        // rect_circle = rg_line.selectAll('#rccc')
        //     .attr('id', 'rccc')
        //     .data(lineData)
        //     .enter()
        //     .append('circle')
        //     .attr('cx', (d, i) => {
        //         return l_x_scale(i) + 2;
        //     })
        //     .attr('cy', (d, i) => {
        //         // if (parseFloat(name_en[d.code].val) > 0)
        //         //     return 0 - l_rect_scale(Math.abs(parseFloat(name_en[d.code].val)));
        //         // else
        //         return lllll((parseFloat(name_en[d.code].val)))
        //     })
        //     .attr('r', 1.5)
        //     .attr('fill', (d, i) => {
        //         if (parseInt(name_en[d.code].label) == 0) {
        //             return '#00FF00';
        //         } else if (parseInt(name_en[d.code].label) == 1) {
        //             return 'yellow';
        //         } else {
        //             return 'red';
        //         }
        //     })
        //     .attr('stroke', 'black')
        //     .attr('stroke-width', 0.5)


        // rect_line.attr('opacity', 0.1)

        // var rect_text = rg_line.selectAll('#rrect')
        // .attr('id', 'rrect')
        // .data(lineData)
        // .enter()
        // .append('text')
        // .attr('x', 5)
        // .attr('y', (d, i) => {
        //     return (i + 1) * 20;
        // })
        // .attr('dy', -5)
        // .attr('font-size', 15)
        // .text((d, i) => {
        //     return 'ID-' + (i + 1);
        // })

    })
}

FinaceRect(1);