var width_ice = 609,
    height_ice = 306

var ice_svg = d3.select('#Sun').append('svg')
    .attr('width', width_ice)
    .attr('height', height_ice)

var ice_rect = ice_svg.append('g')

ice_rect.append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', width_ice)
    .attr('height', height_ice)
    .attr('fill-opacity', 0)


// var ice_color = ["#00aeff", "#f76f8e", "#484d6d", "#DC143C", "#00FF00"]
// var ice_color = ['#F28C8C', '#F2D1B3', '#2D5F73', "#DC143C", "#00FF00"]
var ice_color = ['#59e6f8', '#59f8c9', '#9ff859', "#DC143C", "#00FF00"]
// var p_num_1 = [["志愿者",300,ice_color[0]]]
// var p_num_2 = [["收入(True)", 31, ice_color[1], 0], ["收入(False)", 269, ice_color[1], 31]]
// var p_num_3 = [["收入(High)", 20, ice_color[1], 0], ["拖延症(Low)", 11, ice_color[2], 20], ["拖延症(High)", 59, ice_color[2], 31], ["拖延症(Low)", 210, ice_color[2], 90]]
// var p_num_4 = [['收益(High)', 6, ice_color[3], 0], ['亏损(Low)', 14, ice_color[4], 6], ['收益(High)', 4, ice_color[3], 20], ['亏损(Low)', 7, ice_color[4], 24], ['亏损(High)', 48, ice_color[4], 31], ['亏损(Low)', 11, ice_color[4], 79], ['亏损(High)', 157, ice_color[4], 90], ['收益(Low)', 53, ice_color[3], 247]]


console.log(100)

var p_num_1 = [
    ["志愿者", 300, ice_color[0]]
]
var p_num_2 = [
    ["是", 31, ice_color[1], 0],
    ["否", 269, ice_color[1], 31]
]
var p_num_3 = [
    ["高", 20, ice_color[1], 0],
    ["低", 11, ice_color[2], 20],
    ["高", 59, ice_color[2], 31],
    ["低", 210, ice_color[2], 90]
]
var p_num_4 = [
    ['高', 6, ice_color[3], 0],
    ['低', 14, ice_color[4], 6],
    ['高', 4, ice_color[3], 20],
    ['低', 7, ice_color[4], 24],
    ['高', 48, ice_color[4], 31],
    ['低', 11, ice_color[4], 79],
    ['高', 157, ice_color[4], 90],
    ['低', 53, ice_color[3], 247]
]


var p_1_g = ice_rect.append('g')

p_1_g.selectAll('#r_1')
    .attr('id', 'r_1')
    .data(p_num_1)
    .enter()
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', d => {
        // console.log(d)
        return width_ice * (d[1] / 300);
    })
    .attr('height', height_ice / 4 * 0.95)
    .attr('fill', d => {
        return d[2];
    })
    .attr('fill-opacity', '0.5')
    .attr('stroke', 'black')
    .attr('stroke-opacity', 0.4)
    .on('click', d => {
        R_click(1, d[2])
    })
// .append('g')

p_1_g.selectAll('#r_1')
    .attr('id', 'r_1')
    .data(p_num_1)
    .enter()
    .append('text')
    .attr('x', d => {
        return width_ice * (d[1] / 300) / 2;
    })
    .attr('y', 25)
    .attr('dy', '1em')
    .attr("font-size", "10px")
    .attr('text-anchor', 'middle')
    .text(d => {
        return d[0]
    })

var x_w = 0;

p_1_g.selectAll('#r_1')
    .attr('id', 'r_1')
    .data(p_num_2)
    .enter()
    .append('rect')
    .attr('x', d => {
        return (d[3] / 300) * width_ice
    })
    .attr('y', height_ice / 4 * 0.95)
    .attr('width', d => {
        // console.log(d)
        // x_w += width_ice * (d[1] / 300)
        return width_ice * (d[1] / 300);
    })
    .attr('height', height_ice / 4 * 0.95)
    .attr('fill', d => {
        return d[2];
    })
    .attr('fill-opacity', '0.5')
    .attr('stroke', 'black')
    .attr('stroke-opacity', 0.4)
    .on('click', (d, i) => {
        // console.log(i)
        R_click(i + 2, d[2])
    })

p_1_g.selectAll('#r_1')
    .attr('id', 'r_1')
    .data(p_num_2)
    .enter()
    .append('text')
    .attr('x', d => {
        return width_ice * (d[1] / 300) / 2 + (d[3] / 300) * width_ice;
    })
    .attr('y', 25 + height_ice / 4 * 0.95)
    .attr('dy', '1em')
    .attr("font-size", "10px")
    .attr('text-anchor', 'middle')
    .text(d => {
        return d[0]
    })


p_1_g.selectAll('#r_1')
    .attr('id', 'r_1')
    .data(p_num_3)
    .enter()
    .append('rect')
    .attr('x', d => {
        return (d[3] / 300) * width_ice
    })
    .attr('y', height_ice * 2 / 4 * 0.95)
    .attr('width', d => {
        // console.log(d)
        // x_w += width_ice * (d[1] / 300)
        return width_ice * (d[1] / 300);
    })
    .attr('height', height_ice / 4 * 0.95)
    .attr('fill', d => {
        return d[2];
    })
    .attr('fill-opacity', '0.5')
    .attr('stroke', 'black')
    .attr('stroke-opacity', 0.4)
    .on('click', (d, i) => {
        // console.log(i)
        R_click(i + 4, d[2])
    })

p_1_g.selectAll('#r_1')
    .attr('id', 'r_1')
    .data(p_num_3)
    .enter()
    .append('text')
    .attr('x', d => {
        return width_ice * (d[1] / 300) / 2 + (d[3] / 300) * width_ice;
    })
    .attr('y', 25 + height_ice * 2 / 4 * 0.95)
    .attr('dy', '1em')
    .attr("font-size", "10px")
    .attr('text-anchor', 'middle')
    .text(d => {
        return d[0]
    })

p_1_g.selectAll('#r_1')
    .attr('id', 'r_1')
    .data(p_num_4)
    .enter()
    .append('rect')
    .attr('x', d => {
        return (d[3] / 300) * width_ice
    })
    .attr('y', height_ice * 3 / 4 * 0.95)
    .attr('width', d => {
        // console.log(d)
        // x_w += width_ice * (d[1] / 300)
        return width_ice * (d[1] / 300);
    })
    .attr('height', height_ice / 4 * 0.95)
    .attr('fill', d => {
        return d[2];
    })
    .attr('fill-opacity', '0.5')
    .attr('stroke', 'black')
    .attr('stroke-opacity', 0.4)
    .on('click', (d, i) => {
        // console.log(i)
        R_click(i + 8, d[2])
    })

p_1_g.selectAll('#r_1')
    .attr('id', 'r_1')
    .data(p_num_4)
    .enter()
    .append('text')
    .attr('x', d => {
        return width_ice * (d[1] / 300) / 2 + (d[3] / 300) * width_ice;
    })
    .attr('y', 25 + height_ice * 3 / 4 * 0.95)
    .attr('dy', '1em')
    .attr("font-size", "10px")
    .attr('text-anchor', 'middle')
    .text(d => {
        return d[0]
    })

var legend = ice_rect.append('g')
    .attr('transform', 'translate(' + 100 + ',' + 292 + ')')

var lin = [{
    "name": "志愿者(是、否)",
    "number": 1,
    "color": "#00aeff"
}, {
    "name": "收入(高、低)",
    "number": 2,
    "color": "#f76f8e"
}, {
    "name": "拖延症(高、低)",
    "number": 3,
    "color": "#484d6d",
}, {
    "name": "收益",
    "number": 4,
    "color": "#DC143C",
}, {
    "name": "亏损",
    "number": 5,
    "color": "#00FF00",
}]

var circle = legend.selectAll("#cir")
    .attr("id", "cir")
    .data(lin)
    .enter();

circle.append("circle")
    .attr("cx", (d, i) => {
        // console.log(d)
        if (d.number == 5) return (d.number - 2) * 120 + 80;
        return (d.number - 1) * 120 + 30;
    })
    .attr("cy", 6)
    .attr("r", 5)
    .attr("fill", (d, i) => {
        return ice_color[i];
    })
    .attr("opacity", 0.8)

legend.selectAll("#w")
    .attr("id", "w")
    .data(lin).enter()
    .append("text")
    .attr("x", (d, i) => {
        // console.log(d)
        if (d.number == 5) return (d.number - 2) * 120 + 80;
        return (d.number - 1) * 120 + 30;
    })
    .attr("y", 5)
    .attr("dx", 10)
    .attr("dy", 7)
    .attr("font-size", "15px")
    .attr("font-family", "STHeiti")
    .text(d => {
        return d.name;
    })


function R_click(n, color) {
    d3.csv('data/tree.csv', d => {
        // console.log(d)
        nam_d = []
        if (n == 1) {
            for (var i in d) {
                nam_d.push(d[i].code)
            }
        }
        if (n == 2) {
            for (var i in d) {
                if (d[i].z == 1) {
                    nam_d.push(d[i].code)
                }
            }
        }
        if (n == 3) {
            for (var i in d) {
                if (d[i].z == 0) {
                    nam_d.push(d[i].code)
                }
            }
        }
        if (n == 4) {
            for (var i in d) {
                if (d[i].z == 1 && d[i].s == 1) {
                    nam_d.push(d[i].code)
                }
            }
        }
        if (n == 5) {
            for (var i in d) {
                if (d[i].z == 1 && d[i].s == 0) {
                    nam_d.push(d[i].code)
                }
            }
        }
        if (n == 6) {
            for (var i in d) {
                if (d[i].z == 0 && d[i].s == 1) {
                    nam_d.push(d[i].code)
                }
            }
        }
        if (n == 7) {
            for (var i in d) {
                if (d[i].z == 0 && d[i].s == 0) {
                    nam_d.push(d[i].code)
                }
            }
        }
        if (n == 8) {
            for (var i in d) {
                if (d[i].z == 1 && d[i].s == 1 && d[i].s == 1) {
                    nam_d.push(d[i].code)
                }
            }
        }
        if (n == 9) {
            for (var i in d) {
                if (d[i].z == 1 && d[i].s == 1 && d[i].s == 0) {
                    nam_d.push(d[i].code)
                }
            }
        }
        if (n == 10) {
            for (var i in d) {
                if (d[i].z == 1 && d[i].s == 1 && d[i].t == 0) {
                    nam_d.push(d[i].code)
                }
            }
        }
        if (n == 11) {
            for (var i in d) {
                if (d[i].z == 1 && d[i].s == 1 && d[i].t == 1) {
                    nam_d.push(d[i].code)
                }
            }
        }
        if (n == 12) {
            for (var i in d) {
                if (d[i].z == 0 && d[i].s == 1 && d[i].t == 0) {
                    nam_d.push(d[i].code)
                }
            }
        }
        if (n == 13) {

            for (var i in d) {
                if (d[i].z == 0 && d[i].s == 1 && d[i].t == 1) {
                    nam_d.push(d[i].code)
                }
            }
        }
        if (n == 14) {

            for (var i in d) {
                if (d[i].z == 0 && d[i].s == 0 && d[i].t == 0) {
                    nam_d.push(d[i].code)
                }
            }
        }
        if (n == 15) {

            for (var i in d) {
                if (d[i].z == 0 && d[i].s == 0 && d[i].t == 1) {
                    nam_d.push(d[i].code)
                }
            }
        }
        OrRect(nam_d, color)
    })
}