var width_ice = 615,
    height_ice = 306

colors = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9',
    '#f15c80', '#e4d354', '#8085e8', '#8d4653', '#91e8e1'
]
d3.csv('data/box_calc.csv', function (Ice_d) {
    // console.log(Ice_d)
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
    var r = []
    for (var i = 0; i < 6; ++i) r.push({
        n: 0,
        member: [],
        type: 0,
        num: 0
    })
    //#region 

    for (var i in Ice_d) {
        // console.log(Ice_d[i])
        if (parseFloat(Ice_d[i]['kaishi']) <= 0.5 && parseFloat(Ice_d[i]['ability']) <= 0.5) r[0].member.push(Ice_d[i])
        if (parseFloat(Ice_d[i]['kaishi']) <= 0.5 && parseFloat(Ice_d[i]['ability']) > 0.5 && parseFloat(Ice_d[i][9]) <= 0.5) r[1].member.push(Ice_d[i])
        if (parseFloat(Ice_d[i]['kaishi']) <= 0.5 && parseFloat(Ice_d[i]['ability']) > 0.5 && parseFloat(Ice_d[i][9]) > 0.5) r[2].member.push(Ice_d[i])
        if (parseFloat(Ice_d[i]['kaishi']) > 0.5 && parseFloat(Ice_d[i]['ability']) <= 1.5 && parseFloat(Ice_d[i][4]) <= 0.5) r[3].member.push(Ice_d[i])
        if (parseFloat(Ice_d[i]['kaishi']) > 0.5 && parseFloat(Ice_d[i]['ability']) <= 1.5 && parseFloat(Ice_d[i][4]) > 0.5) r[4].member.push(Ice_d[i])
        if (parseFloat(Ice_d[i]['kaishi']) > 0.5 && parseFloat(Ice_d[i]['ability']) > 1.5) r[5].member.push(Ice_d[i])
    }
    r[0].n = 3, r[1].n = 4, r[2].n = 4, r[3].n = 4, r[4].n = 4, r[5].n = 3;
    r[0].num = 0, r[1].num = 1, r[2].num = 2, r[3].num = 3, r[4].num = 4, r[5].num = 3;
    r[0].type = '低收入', r[1].type = '健康', r[2].type = '疾病', r[3].type = '不借贷', r[4].type = '借贷', r[5].type = '高收入';

    r.push({
        n: 4,
        member: r[0].member,
        type: '负',
        num: 0
    })
    r.push({
        n: 5,
        member: r[1].member,
        type: '中等',
        num: 1
    })
    r.push({
        n: 5,
        member: r[2].member,
        type: '负',
        num: 2
    })
    r.push({
        n: 5,
        member: r[3].member,
        type: '高',
        num: 3
    })
    r.push({
        n: 5,
        member: r[4].member,
        type: '中等',
        num: 4
    })
    r.push({
        n: 4,
        member: r[5].member,
        type: '高',
        num: 5
    })
    var mk = []
    for (var i in r[1].member) {
        mk.push(r[1].member[i])
    }
    for (var i in r[2].member) {
        mk.push(r[2].member[i])
    }
    r.push({
        n: 3,
        member: mk,
        type: '中/高收入',
        num: 1
    })
    mk = []
    for (var i in r[3].member) {
        mk.push(r[3].member[i])
    }
    for (var i in r[4].member) {
        mk.push(r[4].member[i])
    }
    r.push({
        n: 3,
        member: mk,
        type: '中/低收入',
        num: 2
    })
    mk = []
    for (var i in r[0].member) {
        mk.push(r[0].member[i])
    }
    for (var i in r[12].member) {
        mk.push(r[12].member[i])
    }
    r.push({
        n: 2,
        member: mk,
        type: '贫穷',
        num: 0
    })
    mk = []
    for (var i in r[13].member) {
        mk.push(r[13].member[i])
    }
    for (var i in r[5].member) {
        mk.push(r[5].member[i])
    }
    r.push({
        n: 2,
        member: mk,
        type: '富裕',
        num: 1
    })
    mk = []
    for (var i in r[14].member) {
        mk.push(r[14].member[i])
    }
    for (var i in r[15].member) {
        mk.push(r[15].member[i])
    }
    r.push({
        n: 1,
        member: Ice_d,
        type: '',
        num: 0
    })
    //#endregion

    // for (var i = 0; i < 17; ++i) {
    //     r[i].member.sort(function (a, b) {
    //         return a[29] - b[29]
    //     })
    // }



    r.sort(function (a, b) {
        if (a.n != b.n) return a.n - b.n
        return a.num - b.num
    })

    var ice_max = -999999

    for (var i in r[0].member) {
        ice_max = Math.max(ice_max, Math.abs(parseFloat(r[0].member[i][129])))
    }
    var p_g = ice_rect.append('g')

    var line_scale = d3.scale.linear()
        .domain([0, ice_max])
        .range([0, height_ice - 30 / 5])
    console.log(ice_max)

    var colora = "#FFFFFF"
    var colorb = colors[0]

    let colorx = d3.interpolate(colora, colorb);
    var color_scale = d3.scale.linear()
        .domain([5, 1])
        .range([0, 1])

    let colorx2 = d3.interpolate('red', '#00FF00');
    var color_scale2 = d3.scale.linear()
        .domain([-1, 1])
        .range([0, 1])

    p_g.selectAll('#r_1')
        .attr('id', 'r_1').data(r)
        .enter()
        .append('rect')
        .attr('y', d => {
            return (d.n - 1) * height_ice / 5;
            // return 100
        })
        .attr('x', d => {
            var cnt = 0;
            for (var i in r) {
                if (r[i].n == d.n && r[i].num < d.num) cnt += r[i].member.length;
            }
            if (d.n == 5) cnt += r[7].member.length
            return cnt * width_ice / 6080;
            // return 100
        })
        .attr('height', height_ice / 5)
        .attr('width', d => {
            return d.member.length * width_ice / 6080;
            // return 100
        })
        .attr('fill', (d, i) => {
            if (i != 7 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16)
                return colorx(color_scale(d.n))
            else {
                if (d.type == '高')
                    return '#00FF00'
                else if (d.type == '负')
                    return 'red'
                else
                    return 'yellow'
            }
        })
        .attr('opacity', (d, i) => {

            if (i != 7 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16)
                return 1;
            else
                return 0.5
        })
        .attr('stroke', (d, i) => {
            if (i != 7 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16)
                return 'blue'
            else {
                if (d.type == '高')
                    return '#00FF00'
                else if (d.type == '负')
                    return 'red'
                else
                    return 'yellow'
            }

        })
        .attr('stroke-width', 1)
        .on('click', d => {
            // console.log(d)
            var name_sum = []
            var name_set = {}
            for (var i in d.member) {
                // console.log(d[i])
                if (name_set[d.member[i].code] != 1) {
                    name_sum.push(d.member[i].code)
                    name_set[d.member[i].code] = 1;
                }
            }
            // console.log(name_sum)
            OrRect(name_sum, 'blue')
        })
    p_g.selectAll('#r_1')
        .attr('id', 'r_1').data(r)
        .enter()
        .append('text')
        .attr('y', d => {
            return (d.n - 1) * height_ice / 5;
            // return 100
        })
        .attr('x', d => {
            var cnt = 0;
            for (var i in r) {
                if (r[i].n == d.n && r[i].num < d.num) cnt += r[i].member.length;
            }
            if (d.n == 5) cnt += r[7].member.length
            return cnt * width_ice / 6080;
            // return 100
        })
        .attr('dy', '1em')
        .text(d => {
            return d.type
        })

    for (var k = 0; k < 17; ++k) {
        if (k != 7 && k != 12 && k != 13 && k != 14 && k != 15 && k != 16 && k != 0)
            p_g.selectAll('#linein')
            .attr('id', 'linein')
            .data(r[k].member)
            .enter()
            .append('line')
            .attr('x1', (d, i) => {
                var cnt = 0;
                for (var j in r) {
                    if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
                }
                if (r[k].n == 5) cnt += r[7].member.length
                // console.log(i / 10 + cnt / 10 + r[k].num * 1)
                return i / 10 + cnt / 10 + r[k].num * 1;
            })
            .attr('y1', d => {
                return r[k].n * height_ice / 5 - 1
            })
            .attr('x2', (d, i) => {
                // return i / 10;
                var cnt = 0;
                for (var j in r) {
                    if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
                }
                if (r[k].n == 5) cnt += r[7].member.length
                return i / 10 + cnt / 10 + r[k].num * 1;
            })
            .attr('y2', d => {
                return r[k].n * height_ice / 5 - line_scale(Math.abs(parseFloat(d[129])))
            })
            .attr('fill', 'none')
            .attr('stroke', d => {
                if (parseFloat(d[129]) > 0)
                    return '#00FF00';
                else
                    return 'red'
            })
            .attr('stroke-width', 0.1)
    }
    // console.log(r)
})