var width = 500,
    height = 500;

var svg;

// function Paint() {
svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height)
// .attr("transform", "translate(" + -5 + "," + -35 + ")")

console.log(1);
// }

// Paint();
var type = [2, 3, 3, 2, 2, 2, 2, 4, 2, 4, 2, 3, 7]
function paint() {
    d3.csv("data/box_calc_rank.cav").then((data) => {
        console.log(data);
    })
}