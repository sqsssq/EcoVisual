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
                        .attr("stroke", (d, i) => compute(linear(d)))
                        .style('fill', (d, i) => compute(linear(d)))
                    Gantt_g.append('text')
                        .attr('x', 0.05 * widthGantt + stepL * (k) + stepL * 0.6)
                        .attr('y', 20)
                        .attr('dx', 5)
                        .attr('font-size', 10)
                        .text("Pattern" + k)
                        .attr('font-family', 'Georgia')
                }
                Gantt_g.append('text')
                    .text('Poverty alleviation policy')
                    .attr('text-anchor', 'middle')
                    .attr('x', widthGantt / 2)
                    .attr('y', 40)
                    .attr('font-family', 'Georgia')
                    .attr('font-size', 12);

                Gantt_g.append("line")
                    .attr("x1", widthGantt / 2 + 0.5)
                    .attr('x2', widthGantt / 2 + 0.5)
                    .attr('y1', 50)
                    .attr('y2', 0.9 * heightGantt)
                    .attr('fill', 'none')
                    .attr('stroke', 'gray')
                    .attr('stroke-dasharray', 5);
                let xScale = d3.scaleLinear()
                    .domain([1, 21])
                    .range([0.02 * widthGantt, widthGantt * 0.98]);
                let yScale = d3.scaleLinear()
                    .domain([0, data3.length - 1])
                    .range([80, heightGantt * 0.8]);
                let lenScale = d3.scaleLinear()
                    .domain([0, 304])
                    .range([0, xScale(1) - xScale(0)]);

                var xAxis = d3.axisTop().scale(xScale).ticks(21).tickFormat(d3.format("d"));
                Gantt_g.append("g")
                    .attr("class", "axis")
                    .attr("transform", "translate(" + 0 + "," + (60) + ")")
                    .attr("stroke-width", 0.1)
                    .call(xAxis)

                for (let i = 1; i <= 20; ++i) {
                    Gantt_g.append('text')
                        .attr('x', xScale(i) + (xScale(1) - xScale(0)) / 2)
                        .attr('y', 55)
                        .attr('font-family', 'Georgia')
                        .attr('font-size', 10)
                        .text(i)
                        .attr('text-anchor', 'middle');

                }
                // console.log(data)
                let typeLun = new Object();
                for (let i = 1; i <= 20; ++i) {
                    typeLun[i] = new Object();
                    for (let j = 0; j < data3.length; ++j) {
                        typeLun[i][j] = 0;
                    }
                }
                for (let i = 0; i < data.length; ++i) {
                    for (let j in data[i].type) {
                        typeLun[parseInt(data[i].biao)][parseInt(data[i].type[j])]++;
                    }
                }
                // console.log(typeLun);
                let gData = new Array();
                for (let i in typeLun) {
                    for (let j in typeLun[i]) {
                        gData.push({
                            lun: parseInt(i),
                            type: parseInt(j),
                            value: typeLun[i][j]
                        });
                    }
                }
                Gantt_g.selectAll('#circleRect')
                .attr('id', 'circleRect')
                .data(gData)
                .enter()
                .append('rect')
                .attr('x', d => {
                    return xScale(d.lun);
                })
                .attr('y', d => {
                    return yScale(d.type);
                })
                .attr('height', 15)
                .attr('width', d => {
                    return lenScale(d.value);
                })
                .attr('fill', d => {
                    return typeColor[d.type];
                })
                .attr('stroke', 'none')
                .attr('rx', 5);
            })
        })
    })
}

DrawGantt()