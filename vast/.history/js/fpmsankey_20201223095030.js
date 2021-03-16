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
var type = [0, 2, 3, 3, 2, 2, 2, 2, 4, 2, 4, 2, 3, 7]
var select = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];
function paint() {
    d3.csv("data/box_calc_rank.csv").then((data) => {
        // console.log(data);
        let connectData = new Object();
        let pointData = new Object();
        // preprocess
        for (let i = 1; i < 14; ++i) {
            pointData[i] = new Object();
            for (let j = 0; j < type[i]; ++j) {
                pointData[i][j] = 0;
            }
        }
        for (let i = 2; i < 14; ++i) {
            connectData[i - 1] = new Object();
            for (let j = 0; j < type[i - 1]; ++j) {
                connectData[i - 1][j] = new Object();
                connectData[i - 1][j][i] = new Object();
                for (let k = 0; k < type[i]; ++k) {
                    connectData[i - 1][j][i][k] = 0;
                }
            }
        }
        console.log(connectData);
        for (let i in data) {
            // console.log(data[i]);
        }
    })
}
paint();