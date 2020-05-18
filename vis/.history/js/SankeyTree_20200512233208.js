var widtha = 384;
var heighta = 307;
// var padding = { top: 10, bottom: 10, left: 10, right: 10 }
var K = 0;
var r = 0

var ssvg = 0;

var orret_g = 0

var ScattermyChart;

var name_x = [];

var k_in_num = 0

function PP() {
    ssvg = d3.select("#Tsne").append("svg")
        .attr('id', 'SView')
        .attr("width", widtha)
        .attr("height", heighta)
}

var pr = [];

var coort = [];

var tcircle = 0;
var flag = -1;
var heatmapInstance = 0;

PP()

let RectLine = ssvg.append('g')
.append('rect')
.attr('x', 0)
.attr('y', 0)
.attr('width', 370)
.attr('height', 30)
.attr('fill', 'blue')

