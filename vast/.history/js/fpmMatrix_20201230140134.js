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
                let typeSimilar = new Array();
                let typeTransfer = new Object();
                let typeCount = new Object();
                let typeMax = 0;
                let typeMin = 100000;
                let cntMax = 0;

                for (let i = 0; i < data3.length - 1; ++i) {
                    for (let j = i + 1; j < data3.length; ++j) {
                        let cnt = 0;
                        for (let k = 1; k < 14; ++k) {
                            if (data3[i][k] == data3[j][k] && data3[i][k] != "-1") {
                                cnt++;
                            }
                        }
                        typeSimilar.push({
                            startAngle:Math.Pi / 2,
                            endAngle: Math.PI,
                            source: i,
                            target: j,
                            cnt: cnt
                        })
                        cntMax = Math.max(cntMax, cnt);
                    }
                }
                // console.log(typeSimilar);

                for (let i = 0; i < 6; ++i) {
                    typeTransfer[i] = new Object;
                    typeCount[i] = 0;
                    for (let j = 0; j < 6; ++j) {
                        typeTransfer[i][j] = 0;
                    }
                }
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
                // console.log(typeCount);
                let name = new Object();
                let transMax = 0;
                let transMin = 100000;
                for (let i = 0; i < data.length; ++i) {
                    if (typeof (name[data[i]['code']]) == 'undefined') {
                        name[data[i]['code']] = data[i];
                        // console.log(data[i]['code']);
                    } else {
                        for (let j in name[data[i]['code']].type) {
                            for (let k in data[i].type) {
                                typeTransfer[name[data[i]['code']].type[j]][data[i].type[k]]++;
                                transMax = Math.max(typeTransfer[name[data[i]['code']].type[j]][data[i].type[k]], transMax);
                                transMin = Math.min(typeTransfer[name[data[i]['code']].type[j]][data[i].type[k]], transMin);
                            }
                        }
                        name[data[i].code] = data[i];
                    }
                }
                // console.log(transMax);
                let rc = new Array();
                for (let i = 0; i < 36; ++i) {
                    rc.push(i);
                }
                let sw = 50;
                svg.selectAll("#rc")
                    .attr('id', 'rc')
                    .data(rc)
                    .enter().append("rect")
                    .attr('x', d => {
                        return parseInt(d / 6) * sw + 150;
                    })
                    .attr('y', d => {
                        return (d % 6) * sw + 150;
                    })
                    .attr('width', sw)
                    .attr('height', sw)
                    .attr('fill', 'none')
                    .attr('stroke', 'black')
                let rScale = d3.scaleLinear()
                    .domain([transMin, transMax])
                    .range([1, 24]);

                let typeC = new Array();
                for (let i = 0; i < 6; ++i) {
                    typeC.push(typeCount[i]);
                }
                let typeScale = d3.scaleLinear()
                    .domain([0, d3.max(typeC)])
                    .range([0, 50])

                let arcScale = d3.scaleLinear()
                    .domain([0, cntMax])
                    .range([0, 20]);

                let cd = new Array();
                for (let i = 0; i < 6; ++i) {
                    for (let j = 0; j < 6; ++j) {
                        cd.push(typeTransfer[i][j]);
                    }
                }
                svg.selectAll("#cc")
                    .attr('id', 'cc')
                    .data(cd)
                    .enter().append("circle")
                    .attr('cx', (d, i) => {
                        return parseInt(i / 6) * sw + sw / 2 + 150;
                    })
                    .attr('cy', (d, i) => {

                        return (i % 6) * sw + sw / 2 + 150;
                    })
                    .attr('r', d => rScale(d))
                    .attr('fill', 'gray')
                    .attr('fill-opacity', 0.5);
                // console.log(typeCount)
                svg.selectAll("#rl")
                    .attr("id", 'rl')
                    .data(typeC)
                    .enter().append('rect')
                    .attr('y', (d, i) => {
                        // console.log(d)
                        return 150 - typeScale(d) - 0.5;
                    })
                    .attr('x', (d, i) => {
                        return parseInt(i) * sw + sw / 2 - 10 + 150;
                    })
                    .attr('width', 20)
                    .attr('height', d => typeScale(d))
                    .attr('fill', 'gray')
                    .attr('fill-opacity', 0.5)

                svg.selectAll("#rl")
                    .attr("id", 'rl')
                    .data(typeC)
                    .enter().append('rect')
                    .attr('x', (d, i) => {
                        // console.log(d)
                        return 150 - typeScale(d) - 0.5;
                    })
                    .attr('y', (d, i) => {
                        return parseInt(i) * sw + sw / 2 - 10 + 150;
                    })
                    .attr('height', 20)
                    .attr('width', d => typeScale(d))
                    .attr('fill', 'gray')
                    .attr('fill-opacity', 0.5)

                for (let i in typeSimilar) {
                    let r = sw * (typeSimilar[i].target - typeSimilar[i].source) / 2;
                    let d = arcScale(typeSimilar[i].cnt);
                    let arc = d3.arc()
                    .innerRadius(r - d / 2)
                    .outerRadius(r + d / 2);
                    svg.append('g')
                    .attr('transform', 'translate(' + 50 + ',' + (150 - 50)  + ')')
                    .append('path')
                    .attr('d', arc(typeSimilar[i]))
                    .attr('fill', 'gray');
                    break;
                }
            })
        })
    })
}
DrawMatrix();