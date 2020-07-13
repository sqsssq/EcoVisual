// console.log(2222)

var width_R = 611;
var height_R = 298

var R_svg = d3.select('#Sun').append('svg')
    .attr('width', width_R)
    .attr('height', height_R)

function PaintRactIn() {
    // console.log(222)
    d3.json('data/DT/sum.json', function (sdata) {
        console.log(sdata)
    })
}

PaintRactIn();