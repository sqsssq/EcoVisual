var widthGroup = document.getElementById("groupView").offsetWidth,
    heightGroup = document.getElementById("groupView").offsetHeight;

var svgGroup;

svgGroup = d3.select("#groupView").append("svg")
    .attr("width", widthGroup)
    .attr("height", heightGroup);

var Group_g = 0

function DrawPie() {
    d3.csv("data/box_calc_rank.csv").then((data) => {
        d3.csv("data/fpmtype4.csv").then((data2) => {
            d3.csv("data/fpm02.csv").then((data3) => {
                if (Group_g != 0) {
                    Group_g.remove();
                    Group_g = 0;
                }
                Group_g = svgGroup.append("g");
                for (let i = 0; i < data.length; ++i) {
                    data[i]['type'] = new Array();
                    // if (parseInt(data2[i]['0']) != 7)
                    //     data[i]['typeA'] = '*';
                    // else 
                    //     data[i]['typeA'] = '+';
                    for (let j = 1; j < 5; ++j) {
                        if (isNaN(parseInt(data2[i][j]))) break;
                        // typeCount[parseInt(data2[i][j])]++;
                        // typeMax = Math.max()
                        data[i]['type'].push(parseInt(data2[i][j]));
                    }
                }
            })
        })
    })
}