var width_ice = 609,
    height_ice = 306


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
        member: mk,
        type: '',
        num: 0
    })
    //#endregion

    var ice_max = -999999

    for (var i in r[16].member) {
        ice_max = Math.max(ice_max, Math.abs(parseFloat(r[16].member[i][129])))
    }
    var p_g = ice_rect.append('g')

    var line_scale = d3.scale.linear()
        .domain([0, ice_max])
        .range([0, height_ice - 30 / 5])

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
            if (d.n == 5) cnt += r[6].member.length
            return cnt * width_ice / 6080;
            // return 100
        })
        .attr('height', height_ice / 5)
        .attr('width', d => {
            return d.member.length * width_ice / 6080;
            // return 100
        })
        .attr('fill', 'gray')
        .attr('opacity', 0.4)
        .attr('stroke', 'white')
        // .attr('stroke-width', 3)
        .on('click', d => {
            console.log(d)
            var name_sum = []
            var name_set = {}
            for (var i in d.member) {
                // console.log(d[i])
                if (name_set[d.member[i].code] != 1) {
                    name_sum.push(d.member[i].code)
                    name_set[d.member[i].code] = 1;
                }
            }
            console.log(name_sum)
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
            if (d.n == 5) cnt += r[6].member.length
            return cnt * width_ice / 6080;
            // return 100
        })
        .attr('dy', '1em')
        .text(d => {
            return d.type
        })
    for (var k = 0; k < 17; ++k) {
        // var kcnt = 0;
        // for (var i in r) {
        //     if (r[i].n == r[k].n && r[i].num < r[k].num) kcnt += r[i].member.length;
        // }
        // if (r[k].n == 5) kcnt += r[6].member.length
        // console.log(kcnt)
        // p_g.selectAll('#recttext')
        //     .attr('id', 'recttext')
        //     .data(r)
        //     .enter()
        //     .append('text')
        //     .attr('x', kcnt * width_ice / 6080)
        //     .attr('y', (r[k].n - 1) * height_ice / 5)
        //     .attr("font-size", "10px")
        //     .attr('text-anchor', 'middle')
        //     .text(r[k].type)

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
                if (r[k].n == 5) cnt += r[6].member.length
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
                if (r[k].n == 5) cnt += r[6].member.length
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




    console.log(r)
})