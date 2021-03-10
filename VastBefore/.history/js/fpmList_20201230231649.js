var width = 3500,
    height = 15000;

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
                let arc = d3.arc()
                    .innerRadius(5)
                    .outerRadius(7);
                let pie = d3.pie();

                var color = ['#2fe9b3', '#2f8fe9', '#c32fe9', '#e92f9c', '#2E8B57', '#e4e92f', '#FFFACD'];

                for (let i = 0; i < data.length; ++i) {
                    data[i]['type'] = new Array();
                    data[i]['pie'] = new Array();
                    data[i]['typeA'] = parseInt(data2[i][0]);
                    // if (parseInt(data2[i]['0']) != 7)
                    //     data[i]['typeA'] = '*';
                    // else 
                    //     data[i]['typeA'] = '+';
                    for (let j = 1; j < 5; ++j) {
                        if (isNaN(parseInt(data2[i][j]))) break;
                        // typeCount[parseInt(data2[i][j])]++;
                        // typeMax = Math.max()
                        data[i]['type'].push(parseInt(data2[i][j]));
                        data[i]['pie'].push(1);
                    }
                }
                // console.log(data);
                let name = new Object();
                for (let i = 0; i < data.length; ++i) {
                    if (i == 304) break;
                    name[data[i].code] = i;
                    svg.append('text')
                        .attr('x', 20)
                        .attr('y', (i + 1) * 20)
                        .attr('font-size', 10)
                        .text(data[i].code);
                }

                for (let i = 0; i < data.length; ++i) {
                    let pie_data = pie(data[i].pie);
                    // console.log(name[data[i].code])
                    svg
                        .selectAll('#pieT')
                        .attr('id', 'pieT')
                        .data(pie_data)
                        .enter()
                        .append('g')
                        .attr('transform', 'translate(' + (parseInt(data[i].biao) * 20) + ',' + (20 * (name[data[i].code] + 1)) +')')
                        .append('path')
                        .attr('d', d => {
                            // console.log(d);
                            return arc(d);
                        })
                        .attr('fill', (d, x) => color[data[i].type[x]]);
                }
            })
        })
    })
}
DrawMatrix();