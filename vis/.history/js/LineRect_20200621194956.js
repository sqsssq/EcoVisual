var heightLine = 177;
var widthLine = 385;

var linesvg = d3.select('#LineSvg')
    .append('svg')
    .attr('width', widthLine)
    .attr('height', heightLine);

var rg_line = 0;

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
        // lineData.sort(function (a, b) {
        //     return parseFloat(b['129']) - parseFloat(a['129']);
        // })
        // console.log(lineData)
        let lmaxa = Math.max(Math.abs(parseFloat(maxxa)), Math.abs(parseFloat(minxa)));
        var l_rect_scale = d3.scale.linear()
            .domain([0, lmaxa])
            .range([0, 230]);
        var l_x_scale = d3.scale.linear()
            .domain([0, 303])
            .range([0, widthLine - 5])
        var xAxis = d3.svg.axis().scale(l_x_scale).ticks(20).tickFormat(d3.format("d")).orient("bottom");
        var yAxis = d3.svg.axis().scale(l_rect_scale).ticks(2).tickFormat(d3.format("d")).orient("left"); //添加一个g用于放x轴
        rg_line.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(" + 0 + "," + 170 + ")")
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
            .attr("transform", "translate(" + 50 + "," + 0 + ")")
            .call(yAxis)
            .append('text')
            .text('总收益')
            // .attr("transform", "rotate(-90)") //text旋转-90°
            .attr("text-anchor", "end") //字体尾部对齐
            .attr("dx", "0em")
            .attr("dy", "2em") //沿y轴平移一个字体的大小;
        var rect_line = rg_line.selectAll('#rlll')
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
                return 170 - l_rect_scale(Math.abs(parseFloat(d['129'])));
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