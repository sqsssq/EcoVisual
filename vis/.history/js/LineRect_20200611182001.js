var heightLine = 1520;
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
        lineData.sort(function (a, b) {
            return parseFloat(b['129']) - parseFloat(a['129']);
        })
        console.log(lineData)
    })
}

FinaceRect(1);