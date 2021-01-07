var width = 3500,
    height = 1500;

var svg;

svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height);

function DrawMatrix() {
    d3.csv("data/box_calc_rank.csv").then((data) => {
        d3.csv("data/fpmtype2.csv").then((data2) => {
            d3.csv("data/fpm01.csv").then((data3) => {
                // console.log(data3);
                let similar = new Object();
                for (let i = 0; i < data3.length; ++i) {
                    similar[i] = 0;
                    for (let j = 1; j < 14; ++j) {
                        if (data3[i][j] != "-1")
                        {
                            similar[i]++;
                        }
                    }
                }
                console.log(similar);
            })
        })
    })
}
DrawMatrix();