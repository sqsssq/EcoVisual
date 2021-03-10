var p_width = 911;
var p_height = 306

function PaintCir_2(name) {
    // nam = name
    d3.json("data/fcir.json", function (d1) {

        if (peo_g != 0) peo_g.remove();

        peo_g = peo_svg.append('g')
            .attr("transform", "translate(" + 0 + "," + 60 + ")")
        var d = []
        for (var d_name in name) {
            d.push(d1[name[d_name]])
        }

        var lmax = -10000000
        var lmin = 100000000
        var pmax = -10000000
        var pmin = 100000000

        for (var d_num in d)
            for (var i in d[d_num]) {
                if (lmax < parseFloat(d[d_num][i].j)) lmax = parseFloat(d[d_num][i].j)
                if (lmin > parseFloat(d[d_num][i].j)) lmin = parseFloat(d[d_num][i].j)
                if (pmax < parseFloat(d[d_num][i].p)) pmax = parseFloat(d[d_num][i].p)
                if (pmin > parseFloat(d[d_num][i].p)) pmin = parseFloat(d[d_num][i].p)
            }

        // if (lmin > 0) lmin = 0
        // if (lmax < 0) lmax = 0
        if (pmin > 0) pmin = 0
        if (pmax < 0) pmax = 0

        var p_xscale = d3.scale.linear()
            .domain([1, 20])
            .range([30, 880])

        var p_yscale = d3.scale.linear()
            .domain([lmin, lmax])
            .range([220, 10])

        var p_pscale = d3.scale.linear()
            .domain([pmin, pmax])
            .range([5, 20])

        var xAxis = d3.svg.axis().scale(p_xscale).ticks(20).tickFormat(d3.format("d")).orient("bottom");
        var yAxis = d3.svg.axis().scale(p_yscale).ticks(0).tickFormat(d3.format("d")).orient("left"); //添加一个g用于放x轴


        // peo_g.append('circle')
        // .attr('cx', 30)
        // .attr('cy', 50)
        // .attr('r', 100)
        // .attr("fill", 'black')

        console.log(d)

        var d_data = []

        var d1_data = []

        for (var d_num in d) {
            d_data.push([])
            for (var i in d[d_num]) {
                l = [parseFloat(d[d_num][i].j), parseFloat(d[d_num][i].p)]
                d_data[d_num].push(l)
            }
        }

        // for (var i in d) {
        //     // l = []
        //     l = [parseFloat(d[i].j), parseFloat(d[i].p)]
        //     d_data.push(l)
        // }

        // for (var i in d_1) {
        //     l = [parseFloat(d_1[i].j), parseFloat(d_1[i].p)]
        //     d1_data.push(l)
        // }

        var LinePath = d3.svg.line()
            .x((d, i) => {
                return p_xscale(i + 1)
            })
            .y(d => {
                return p_yscale(d[0])
            })
        // .interpolate("cardinal") //插值模式

        console.log(d_data)

        for (var i in d_data) {
            peo_g
                .append('path')
                .attr('d', LinePath(d_data[i]))
                .attr('stroke', 'black')
                .attr('fill', 'black')
                .attr('fill-opacity', 0)
                .attr('stroke-width', 1)
                .attr('stroke-opacity', 0.5)

            peo_g.selectAll('#cir__')
                .attr('id', 'cir__')
                .data(d_data[i])
                .enter()
                .append('g')
                .append('circle')
                .attr('cx', (d, i) => {
                    return p_xscale(i + 1)
                })
                .attr('cy', d => {
                    console.log(d)
                    return p_yscale(d[0])
                })
                .attr('r', d => {
                    return p_pscale(d[1])
                })
                .attr('fill', d => {
                    if (d[1] < 0) {
                        return "#41CA77"
                    } else {
                        return "#D8483E"
                    }
                })
                .attr('fill-opacity', 0.5)

            peo_g.selectAll('#cir___')
                .attr('id', 'cir___')
                .data(d_data[i])
                .enter()
                .append('g')
                .append('circle')
                .attr('cx', (d, i) => {
                    return p_xscale(i + 1)
                })
                .attr('cy', d => {
                    console.log(d)
                    return p_yscale(d[0])
                })
                .attr('r', d => {
                    return p_pscale(0) - 1
                })
                .attr('fill', 'none')
                .attr('stroke', 'black')
                .attr('stroke-width', 1)
                .attr('stroke-dasharray', 5.5)
        }


        peo_g.append("g")
            .attr("class", "axis")
            // .attr("transform", "translate(" + 0 + "," + 255 + ")")
            .attr("transform", "translate(" + 0 + "," + p_yscale(lmin) + ")")
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
            .text('决策差异')
            .attr("transform", "rotate(-90)") //text旋转-90°
            .attr("text-anchor", "end") //字体尾部对齐
            .attr("dx", "-2em")
            .attr("dy", "-1em") //沿y轴平移一个字体的大小;


        peo_g.append('text')
            .attr('x', 800)
            .attr('y', -37)
            .attr('fill', 'black')
            .attr('font-size', '15px')
            .attr('text-anchor', 'middle')
            .attr("font-family", "courier")
            // .attr('dx', '')
            .attr('dy', '-0.4em')
            .text("People: " + name)
            .on('click', d => {
                judge_cir_line = 1;
                PaintCir(name)
                PaintLine(0)
            })

        // peo_g.append('circle')
        // .attr('cx', 800)
        // .attr('cy', -40)
        // .attr('r', 10)
        // .attr('stroke-dasharray', 3)
        // .attr('fill', 'none')
        // .attr('stroke', 'black')
        // .attr('stroke-width', 1)

        peo_g.append('circle')
            .attr('cx', 300)
            .attr('cy', -47)
            .attr('r', 10)
            .attr('stroke-dasharray', 3)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)


        peo_g.append('text')
            .attr('x', 340)
            .attr('y', -35)
            .attr('fill', 'black')
            .attr('font-size', '15px')
            .attr('text-anchor', 'middle')
            .attr("font-family", "courier")
            // .attr('dx', '')
            .attr('dy', '-0.4em')
            .text("--零收益")

    })
}

function PaintCir(name) {
    nam = name
    d3.json("data/fcir.json", function (d1) {

        if (peo_g != 0) peo_g.remove();

        peo_g = peo_svg.append('g')
            .attr("transform", "translate(" + 0 + "," + 60 + ")")
        var d = d1[name]
        // console.log(d)

        var lmax = -10000000
        var lmin = 100000000
        var pmax = -10000000
        var pmin = 100000000

        for (var i in d) {
            // console.log(d[i])
            if (lmax < parseFloat(d[i].j)) lmax = parseFloat(d[i].j)
            if (lmin > parseFloat(d[i].j)) lmin = parseFloat(d[i].j)
            if (pmax < parseFloat(d[i].p)) pmax = parseFloat(d[i].p)
            if (pmin > parseFloat(d[i].p)) pmin = parseFloat(d[i].p)
        }

        // if (lmin > 0) lmin = 0
        // if (lmax < 0) lmax = 0
        if (pmin > 0) pmin = 0
        if (pmax < 0) pmax = 0

        var p_xscale = d3.scale.linear()
            .domain([1, 20])
            .range([30, 880])

        var p_yscale = d3.scale.linear()
            .domain([lmin, lmax])
            .range([220, 10])

        var p_pscale = d3.scale.linear()
            .domain([pmin, pmax])
            .range([5, 20])

        var xAxis = d3.svg.axis().scale(p_xscale).ticks(20).tickFormat(d3.format("d")).orient("bottom");
        var yAxis = d3.svg.axis().scale(p_yscale).ticks(0).tickFormat(d3.format("d")).orient("left"); //添加一个g用于放x轴


        // peo_g.append('circle')
        // .attr('cx', 30)
        // .attr('cy', 50)
        // .attr('r', 100)
        // .attr("fill", 'black')

        // console.log(d)

        d_data = []

        for (var i in d) {
            // l = []
            l = [parseFloat(d[i].j), parseFloat(d[i].p)]
            d_data.push(l)
        }

        var LinePath = d3.svg.line()
            .x((d, i) => {
                return p_xscale(i + 1)
            })
            .y(d => {
                return p_yscale(d[0])
            })
        // .interpolate("cardinal") //插值模式


        peo_g
            .append('path')
            .attr('d', LinePath(d_data))
            .attr('stroke', 'black')
            .attr('fill', 'black')
            .attr('fill-opacity', 0)
            .attr('stroke-width', 1)
            .attr('stroke-opacity', 0.5)

        peo_g.selectAll('#cir__')
            .attr('id', 'cir__')
            .data(d_data)
            .enter()
            .append('g')
            .append('circle')
            .attr('cx', (d, i) => {
                return p_xscale(i + 1)
            })
            .attr('cy', d => {
                // console.log(d)
                return p_yscale(d[0])
            })
            .attr('r', d => {
                return p_pscale(d[1])
            })
            .attr('fill', d => {
                if (d[1] < 0) {
                    return "#41CA77"
                } else {
                    return "#D8483E"
                }
            })
            .attr('fill-opacity', 0.5)

        peo_g.selectAll('#cir___')
            .attr('id', 'cir___')
            .data(d_data)
            .enter()
            .append('g')
            .append('circle')
            .attr('cx', (d, i) => {
                return p_xscale(i + 1)
            })
            .attr('cy', d => {
                // console.log(d)
                return p_yscale(d[0])
            })
            .attr('r', d => {
                return p_pscale(0) - 1
            })
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)
            .attr('stroke-dasharray', 3)

        peo_g.append("g")
            .attr("class", "axis")
            // .attr("transform", "translate(" + 0 + "," + 255 + ")")
            .attr("transform", "translate(" + 0 + "," + p_yscale(lmin) + ")")
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
            .text('决策差异')
            .attr("transform", "rotate(-90)") //text旋转-90°
            .attr("text-anchor", "end") //字体尾部对齐
            .attr("dx", "-2em")
            .attr("dy", "-1em") //沿y轴平移一个字体的大小;


        peo_g.append('text')
            .attr('x', 800)
            .attr('y', -37)
            .attr('fill', 'black')
            .attr('font-size', '15px')
            .attr('text-anchor', 'middle')
            .attr("font-family", "courier")
            // .attr('dx', '')
            .attr('dy', '-0.4em')
            .text("People: " + name)
            .on('click', d => {
                judge_cir_line = 1;
                PaintCir(name)
                PaintLine(0)
            })

        peo_g.append('circle')
            .attr('cx', 300)
            .attr('cy', -47)
            .attr('r', 10)
            .attr('stroke-dasharray', 3)
            .attr('fill', 'none')
            .attr('stroke', 'black')
            .attr('stroke-width', 1)


        peo_g.append('text')
            .attr('x', 350)
            .attr('y', -35)
            .attr('fill', 'black')
            .attr('font-size', '15px')
            .attr('text-anchor', 'middle')
            .attr("font-family", "courier")
            // .attr('dx', '')
            .attr('dy', '-0.4em')
            .text(" --零收益")


    })
}

if (peo_g == 0 && judge_cir_line == 1) {
    PaintCir('g7uoijja')
    Paintjudge(1)
}