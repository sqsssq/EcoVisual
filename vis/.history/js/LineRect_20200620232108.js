var heightLine = 177;
var widthLine = 3040;

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
        for (var i in data) {
            if (parseInt(data[i].biao) == num) {
                lineData.push(data[i]);
            }
        }
        // lineData.sort(function (a, b) {
        //     return parseFloat(b['129']) - parseFloat(a['129']);
        // })
        // console.log(lineData)
        let lmaxa = Math.max(Math.abs(parseFloat(lineData[0]['129'])), Math.abs(parseFloat(lineData[303]['129'])));
        var l_rect_scale = d3.scale.linear()
            .domain([0, lmaxa])
            .range([0, heightLine]);

        var rect_line = rg_line.selectAll('#rlll')
            .attr('id', 'rlll')
            .data(lineData)
            .enter()
            .append('rect')
            .attr('x', (d, i) => {

            })
            .attr('y', (d, i) => {
                // console.log(i);
                return 137;
            })
            .attr('height', 20)
            .attr('width', (d, i) => {
                return 10;
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