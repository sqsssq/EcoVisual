var widthGantt = document.getElementById("ganttView").offsetWidth,
    heightGantt = document.getElementById("ganttView").offsetHeight;

var svgGantt;

svgGantt = d3.select("#ganttView").append("svg")
    .attr("width", widthGantt)
    .attr("height", heightGantt);

var Gantt_g = 0;

function DrawGantt() {
    d3.csv("data/box_calc_rank.csv").then((data) => {
        d3.csv("data/fpmtype4.csv").then((data2) => {
            d3.csv("data/fpm02.csv").then((data3) => {
                if (Gantt_g != 0) {
                    Gantt_g.remove();
                    Gantt_g = 0;
                }
                Gantt_g = svgGantt.append("g");
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
                let stepL = widthGantt * 0.9 / data3.length;
                for (let k = 0; k < data3.length; ++k) {
                    let linear = d3.scaleLinear().domain([0, 100]).range([0, 0.8]);
                    let compute = d3.interpolate(typeColor[k], 'white');
                    Gantt_g.selectAll('#rectL').attr('id', 'rectL')
                        .data(d3.range(100))
                        .enter()
                        .append('rect')
                        .attr('x', (d, i) => {
                            return i * stepL * 0.6 / 100 + 0.05 * widthGantt + stepL * k;
                        })
                        .attr('y', 10)
                        .attr('width', stepL * 0.8 / 100)
                        .attr('height', 12)
                        .attr("stroke",  (d, i) => compute(linear(d)))
                        .style('fill', (d, i) => compute(linear(d)))
                    Gantt_g.append('text')
                    .attr('x', 0.05 * widthGantt + stepL * (k) + stepL * 0.6)
                    .attr('y', 20)
                    .attr('dx', 5)
                    .attr('font-size', 10)
                    .text("Pattern" + k)
                    .attr('font-family', 'Georgia')
                }
            })
        })
    })
}

DrawGantt()