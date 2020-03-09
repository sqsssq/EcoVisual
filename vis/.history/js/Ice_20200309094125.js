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
    r[0].type = '工作能力弱', r[1].type = '健康', r[2].type = '疾病', r[3].type = '不借贷', r[4].type = '借贷', r[5].type = '工作能力强';

    rk = []
    var rk_num = 0,
        high = [],
        low = [],
        mid = []
    for (var i in r[rk_num].member) {
        if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
        if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
        if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
    }
    rk.push({
        n: 4,
        kn: 0,
        member: high,
        high: high,
        mid: mid,
        low: low,
        type: '负',
        num: 0,
        knum: 0,
        color: '#00FF00'
    })
    
    rk.push({
        n: 4,
        kn: 0,
        member: mid,
        high: high,
        mid: mid,
        low: low,
        type: '负',
        num: 0,
        knum: 1,
        color: 'yellow'
    })
    
    rk.push({
        n: 4,
        kn: 0,
        member: low,
        high: high,
        mid: mid,
        low: low,
        type: '负',
        num: 0,
        knum: 2,
        color: 'red'
    })
    high = [], low = [], mid = []
    for (var i in r[1].member) {
        if (parseInt(r[1].member[i][11]) == 0) low.push(r[1].member[i])
        if (parseInt(r[1].member[i][11]) == 1) mid.push(r[1].member[i])
        if (parseInt(r[1].member[i][11]) == 2) high.push(r[1].member[i])
    }
    rk.push({
        n: 5,
        kn: 1,
        member: high,
        high: high,
        mid: mid,
        low: low,
        type: '中等',
        num: 1,
        knum: 0,
        color: '#00FF00'
    })
    
    rk.push({
        n: 5,
        kn: 1,
        member: mid,
        high: high,
        mid: mid,
        low: low,
        type: '中等',
        num: 1,
        knum: 1,
        color: 'yellow'
    })
    
    rk.push({
        n: 5,
        kn: 1,
        member: low,
        high: high,
        mid: mid,
        low: low,
        type: '中等',
        num: 1,
        knum: 2,
        color: 'red'
    })
    rk_num = 2, high = [], low = [], mid = []
    for (var i in r[rk_num].member) {
        if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
        if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
        if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
    }
    // rk.push({
    //     n: 5,
    //     kn: 1,
    //     member: high,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 2,
    //     knum: 3,
    //     color: '#00FF00'
    // })
    // rk.push({
    //     n: 5,
    //     kn: 1,
    //     member: mid,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 2,
    //     knum: 4,
    //     color: 'yellow'
    // })
    // rk.push({
    //     n: 5,
    //     kn: 2,
    //     member: low,
    //     high: high,
    //     mid: mid,
    //     low: low,
    //     type: '负',
    //     num: 2,
    //     knum: 5,
    //     color: 'red'
    // })
    rk_num = 3, high = [], low = [], mid = []
    for (var i in r[rk_num].member) {
        if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
        if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
        if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
    }
    rk.push({
        n: 5,
        kn: 1,
        member: high,
        high: high,
        mid: mid,
        low: low,
        type: '负',
        num: 3,
        knum: 6,
        color: '#00FF00'
    })
    rk.push({
        n: 5,
        kn: 1,
        member: mid,
        high: high,
        mid: mid,
        low: low,
        type: '负',
        num: 3,
        knum: 7,
        color: 'yellow'
    })
    rk.push({
        n: 5,
        kn: 1,
        member: low,
        high: high,
        mid: mid,
        low: low,
        type: '负',
        num: 3,
        knum: 8,
        color: 'red'
    })
    rk_num = 4, high = [], low = [], mid = []
    for (var i in r[rk_num].member) {
        if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
        if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
        if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
    }
    rk.push({
        n: 5,
        kn: 1,
        member: high,
        high: high,
        mid: mid,
        low: low,
        type: '负',
        num: 4,
        knum: 9,
        color: '#00FF00'
    })
    rk.push({
        n: 5,
        kn: 1,
        member: mid,
        high: high,
        mid: mid,
        low: low,
        type: '负',
        num: 4,
        knum: 10,
        color: 'yellow'
    })
    rk.push({
        n: 5,
        kn: 1,
        member: low,
        high: high,
        mid: mid,
        low: low,
        type: '负',
        num: 4,
        knum: 11,
        color: 'red'
    })
    rk_num = 5, high = [], low = [], mid = []
    for (var i in r[rk_num].member) {
        if (parseInt(r[rk_num].member[i][11]) == 0) low.push(r[rk_num].member[i])
        if (parseInt(r[rk_num].member[i][11]) == 1) mid.push(r[rk_num].member[i])
        if (parseInt(r[rk_num].member[i][11]) == 2) high.push(r[rk_num].member[i])
    }
    rk.push({
        n: 4,
        kn: 5,
        member: high,
        high: high,
        mid: mid,
        low: low,
        type: '负',
        num: 5,
        knum: 0,
        color: '#00FF00'
    })
    rk.push({
        n: 4,
        kn: 5,
        member: mid,
        high: high,
        mid: mid,
        low: low,
        type: '负',
        num: 5,
        knum: 1,
        color: 'yellow'
    })
    rk.push({
        n: 4,
        kn: 5,
        member: low,
        high: high,
        mid: mid,
        low: low,
        type: '负',
        num: 5,
        knum: 2,
        color: 'red'
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
        type: '工作能力较强',
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
        type: '工作能力较弱',
        num: 2
    })
    mk = []
    for (var i in Ice_d) {
        if (parseFloat(Ice_d[i]['kaishi']) <= 0.5)
            mk.push(Ice_d[i])
    }
    r.push({
        n: 2,
        member: mk,
        type: '起始贫穷',
        num: 0
    })
    mk = []
    for (var i in Ice_d) {
        if (parseFloat(Ice_d[i]['kaishi']) > 0.5)
            mk.push(Ice_d[i])
    }
    r.push({
        n: 2,
        member: mk,
        type: '起始富裕',
        num: 1
    })
    r.push({
        n: 1,
        member: Ice_d,
        type: '',
        num: 0
    })
    //#endregion

    console.log(rk)



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
        .range([0, height_ice - 30 / 4])
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
            if (d.n == 1) return (d.n - 1) * height_ice / 4
            return (d.n - 2) * height_ice / 4 + height_ice / 8;
            // return 100
        })
        .attr('x', d => {
            var cnt = 0;
            for (var i in r) {
                if (r[i].n == d.n && r[i].num < d.num) cnt += r[i].member.length;
            }
            if (d.n == 4) cnt += r[3].member.length
            return cnt * width_ice / 6080;
            // return 100
        })
        .attr('height', (d, i) => {
            if (i == 0)
                return height_ice / 8
            return height_ice / 4
        })
        .attr('width', d => {
            return d.member.length * width_ice / 6080;
            // return 100
        })
        .attr('fill', (d, i) => {
            // if (i != 7 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16)
            return colorx(color_scale(d.n))
            // else {
            // if (d.type == '高')
            //     return '#00FF00'
            // else if (d.type == '负')
            //     return 'red'
            // else
            //     return 'yellow'
            // }
        })
        .attr('opacity', (d, i) => {

            // if (i != 7 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16)
            return 1;
            // else
            return 0.5
        })
        .attr('stroke', (d, i) => {
            // if (i != 7 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16)
            return 'blue'
            // // else {
            //     if (d.type == '高')
            //         return '#00FF00'
            //     else if (d.type == '负')
            //         return 'red'
            //     else
            //         return 'yellow'
            // }

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
        .attr('id', 'r_1')
        .data(rk)
        .enter()
        .append('rect')
        .attr('y', d => {
            if (d.n == 1) return (d.n - 1) * height_ice / 4
            return (d.n - 2) * height_ice / 4 + height_ice / 8;
            // return 100
        })
        .attr('x', d => {
            var cnt = 0;
            for (var i in r) {
                if (r[i].n == d.n && r[i].num < d.num) cnt += r[i].member.length;
            }
            if (d.n == 5 || d.kn == 5) cnt += r[3].member.length
            for (var i in rk) {
                if (rk[i].kn == d.kn && rk[i].knum < d.knum) cnt += rk[i].member.length
            }
            // if (d.n == 5 && d.knum > 2) cnt += r[7].member.length + 100
            return cnt * width_ice / 6080;
            // return 100
        })
        .attr('height', (d, i) => {
            // if (i == 0)
            return height_ice / 8
            // return height_ice / 4
        })
        .attr('width', d => {
            return d.member.length * width_ice / 6080;
            // return 100
        })
        .attr('fill', (d, i) => {
            // if (i != 7 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16)
            return d.color
            // else {
            // if (d.type == '高')
            //     return '#00FF00'
            // else if (d.type == '负')
            //     return 'red'
            // else
            //     return 'yellow'
            // }
        })
        .attr('opacity', (d, i) => {

            // if (i != 7 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16)
            return 1;
            // else
            return 0.5
        })
        .attr('stroke', (d, i) => {
            // if (i != 7 && i != 12 && i != 13 && i != 14 && i != 15 && i != 16)
            return d.color
            // // else {
            //     if (d.type == '高')
            //         return '#00FF00'
            //     else if (d.type == '负')
            //         return 'red'
            //     else
            //         return 'yellow'
            // }

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
            if (d.n == 1) return 0;
            return (d.n - 2) * height_ice / 4 + height_ice / 8;
            // return 100
        })
        .attr('x', d => {
            var cnt = 0;
            for (var i in r) {
                if (r[i].n == d.n && r[i].num < d.num) cnt += r[i].member.length;
            }
            if (d.n == 4) cnt += r[3].member.length
            return cnt * width_ice / 6080;
            // return 100
        })
        .attr('dy', '1em')
        .text(d => {
            return d.type
        })

    for (var k = 0; k < 11; ++k) {
        if (k != 0)
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
                if (r[k].n == 4) cnt += r[3].member.length
                // console.log(i / 10 + cnt / 10 + r[k].num * 1)
                return i / 10 + cnt / 10 + r[k].num * 1;
            })
            .attr('y1', d => {
                return r[k].n * height_ice / 4 - height_ice / 8
            })
            .attr('x2', (d, i) => {
                // return i / 10;
                var cnt = 0;
                for (var j in r) {
                    if (r[j].n == r[k].n && r[j].num < r[k].num) cnt += r[j].member.length;
                }
                if (r[k].n == 4) cnt += r[3].member.length
                return i / 10 + cnt / 10 + r[k].num * 1;
            })
            .attr('y2', d => {
                return r[k].n * height_ice / 4 - height_ice / 8 - line_scale(Math.abs(parseFloat(d[129])))
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