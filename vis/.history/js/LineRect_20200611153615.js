var heightLine = 208;
var widthLine = 154;

var linesvg = d3.select('#LineSvg')
.append('svg')
    .attr('width', widthLine)
    .attr('height', heightLine);

function FinaceRect(num) {

    d3.csv("data/box_calc.csv", function (data) {
        var lineData = new Array();
        for (var i in data) {
            if (parseInt(data[i].biao) == num) {
                lineData.push(data[i]);
            }
        }
    })
}