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
                        if (data3[i][j] != "-1") {
                            similar[i]++;
                        }
                    }
                }
                // console.log(similar);
                d3.arc()
                    .innerRadius(10)
                    .outerRadius(12);

                var color = ['#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD'];

                for (let i = 0; i < data.length; ++i) {
                    data[i]['type'] = new Array();
                    // if (parseInt(data2[i]['0']) != 7)
                    //     data[i]['typeA'] = '*';
                    // else 
                    //     data[i]['typeA'] = '+';
                    for (let j = 1; j < 5; ++j) {
                        if (isNaN(parseInt(data2[i][j]))) break;
                        typeCount[parseInt(data2[i][j])]++;
                        // typeMax = Math.max()
                        data[i]['type'].push(parseInt(data2[i][j]));
                    }
                }
                
            })
        })
    })
}
DrawMatrix();