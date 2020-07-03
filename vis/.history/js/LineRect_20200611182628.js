var heightLine = 1520;
var widthLine = 154;

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
        lineData.sort(function (a, b) {
            return parseFloat(b['129']) - parseFloat(a['129']);
        })
        // console.log(lineData)
        let lmaxa = Math.max(Math.abs(parseFloat(lineData[0]['129'])), Math.abs(parseFloat(lineData[303]['129'])));
        var l_rect_scale = d3.scale.linear()
            .domain([0, lmaxa])
            .range([0, 154]);

        
    })
}

FinaceRect(1);