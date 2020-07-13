var heightLine = 118;
var widthLine = 612;

var linesvg = d3.select('#LineSvg')
    .append('svg')
    .attr('width', widthLine)
    .attr('height', heightLine);

var rg_line = 0;
var rect_line = 0;

var select_name = new Array();

function FinaceRect(num) {
    if (rg_line != 0)
        rg_line.remove();
    rg_line = linesvg.append('g');
    d3.csv("data/box_calc.csv", function (data) {
        var lineData = new Array();
        let maxxa = -999999;
        let minxa = 999999;
        for (var i in data) {
            if (parseInt(data[i].biao) == num) {
                lineData.push(data[i]);
                if (parseFloat(data[i]['129']) > 550) data[i]['129'] = 550;
                if (parseFloat(data[i]['129']) < -550) data[i]['129'] = -550;
                maxxa = Math.max(maxxa, parseFloat(data[i]['129']));
                minxa = Math.min(minxa, parseFloat(data[i]['129']));
            }
        }
        lineData.sort(function (a, b) {
            return parseFloat(b['129']) - parseFloat(a['129']);
        })
        // console.log(lineData)
        let lmaxa = Math.max(Math.abs(parseFloat(maxxa)), Math.abs(parseFloat(minxa)));
        var l_rect_scale = d3.scale.linear()
            .domain([0, lmaxa])
            .range([0, 100]);
        var lllll = d3.scale.linear()
            .domain([lmaxa, 0])
            .range([0, 100]);
        var l_x_scale = d3.scale.linear()
            .domain([-1, 304])
            .range([5, widthLine - 5])

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
                return 163 - l_rect_scale(Math.abs(parseFloat(d['129'])));
            })
            .attr('height', d => {
                return l_rect_scale(Math.abs(parseFloat(d['129'])));
            })
            .attr('width', (d, i) => {
                return 1.24;
            })
            .attr('fill', (d, i) => {
                if (parseFloat(d['129']) < 0)
                    return '#00FF00';
                else
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
        var xAxis = d3.svg.axis().scale(l_x_scale).ticks(20).tickFormat(d3.format("d")).orient("bottom");
        var yAxis = d3.svg.axis().scale(lllll).ticks(5).tickFormat(d3.format("d")).orient("right"); //添加一个g用于放x轴
        rg_line.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + 0 + "," + 100 + ")")
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
            .attr("transform", "translate(" + 5 + "," + 3 + ")")
            .call(yAxis)
            .append('text')
            // .attr("transform", "rotate(-90)") //text旋转-90°
            .attr("text-anchor", "end") //字体尾部对齐
            .attr('font-size', 1)
            .attr("dx", "5.1em")
            .attr("dy", "1em") //沿y轴平移一个字体的大小;
            .text('收益绝对值')
    })
}

FinaceRect(1);