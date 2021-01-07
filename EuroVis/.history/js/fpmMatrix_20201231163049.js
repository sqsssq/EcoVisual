var width = 3500,
    height = 1500;

var svg;

svg = d3.select("#container").append("svg")
    .attr("width", width)
    .attr("height", height);

function DrawMatrix() {
    d3.csv("data/box_calc_rank.csv").then((data) => {
        d3.csv("data/fpmtype3.csv").then((data2) => {
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
                            startAngle: -Math.PI / 2,
                            endAngle: Math.PI / 2,
                            source: i,
                            target: j,
                            cnt: cnt
                        })
                        cntMax = Math.max(cntMax, cnt);
                    }
                }

                let typeSimilar2 = new Object();
                for (let i = 0; i < 6; ++i) {
                    for (let j = 0; j < 6; ++j) {
                        typeSimilar2[(i + 1) * 10 + j + 1] = {
                            source: i,
                            target: j,
                            cnt: 0
                        };
                    }
                }
                console.log(typeSimilar2)
                for (let i = 0; i < data2.length; ++i) {
                    for (let j = 1  ; j < 6 - 1; ++j) {
                        if (isNaN(parseInt(data2[i][j]))) break;
                        for (let k = j + 1; k < 6; ++k) {
                            if (isNaN(parseInt(data2[i][k]))) break;
                            typeSimilar2[(parseInt(data2[i][j]) + 1) * 10 + parseInt(data2[i][k]) + 1].cnt++;
                        }
                    }
                }
                // console.log(typeSimilar2);

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
                        return parseInt(d / 6) * sw + 200;
                    })
                    .attr('y', d => {
                        return (d % 6) * sw + 300;
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
                    .range([0, 10]);

                console.log(cntMax)

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
                        return parseInt(i / 6) * sw + sw / 2 + 200;
                    })
                    .attr('cy', (d, i) => {

                        return (i % 6) * sw + sw / 2 + 300;
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
                        return 300 - typeScale(d) - 0.5;
                    })
                    .attr('x', (d, i) => {
                        return parseInt(i) * sw + sw / 2 - 10 + 200;
                    })
                    .attr('width', 20)
                    .attr('height', d => typeScale(d))
                    .attr('fill', 'gray')
                    .attr('fill-opacity', 0.5)

                // svg.selectAll("#rl")
                //     .attr("id", 'rl')
                //     .data(typeC)
                //     .enter().append('rect')
                //     .attr('x', (d, i) => {
                //         // console.log(d)
                //         return 200 - typeScale(d) - 0.5;
                //     })
                //     .attr('y', (d, i) => {
                //         return parseInt(i) * sw + sw / 2 - 10 + 200;
                //     })
                //     .attr('height', 20)
                //     .attr('width', d => typeScale(d))
                //     .attr('fill', 'gray')
                //     .attr('fill-opacity', 0.5); 

                let sim = new Array();
                let simMax = 0;
                let simMin = 9999;
                for (let i in typeSimilar2) {
                    if (typeSimilar2[i].cnt == 0) continue;
                    sim.push({
                        source: typeSimilar2[i].source,
                        target: typeSimilar2[i].target,
                        cnt: typeSimilar2[i].cnt,
                        startAngle: Math.PI / 2,
                        endAngle: Math.PI * 3 / 2
                    });
                    simMax = Math.max(simMax, typeSimilar2[i].cnt);
                    simMin = Math.min(simMin, typeSimilar2[i].cnt);
                }
                let simScale = d3.scaleLinear()
                .domain([simMin, simMax])
                .range([1, 10])

                for (let i in typeSimilar) {
                    // if (i != 8) continue;
                    // console.log(typeSimilar[i]);
                    // console.log(typeSimilar[i].source * sw + 200);
                    let r = sw * (typeSimilar[i].target - typeSimilar[i].source) / 2;
                    let d = arcScale(typeSimilar[i].cnt);
                    let arc = d3.arc()
                        .innerRadius(r - d / 2)
                        .outerRadius(r + d / 2);
                    let kg = svg.append('g')
                    kg.append('g').append('path')
                        .attr('d', arc(typeSimilar[i]))
                        .attr('fill', 'gray')
                        .attr('fill-opacity', 0.5)
                        .attr('transform', 'translate(' + (r + typeSimilar[i].source * sw + sw / 2  + 200) + ',' + (200 - 55) + ')')
                    // break;
                }

                for (let i in sim) {
                    // if (i != 8) continue;
                    // console.log(typeSimilar[i]);
                    // console.log(typeSimilar[i].source * sw + 200);
                    let r = sw * (sim[i].target - sim[i].source) / 2;
                    let d = simScale(sim[i].cnt);
                    let arc = d3.arc()
                        .innerRadius(r - d / 2)
                        .outerRadius(r + d / 2);
                    let kg = svg.append('g')
                    kg.append('g').append('path')
                        .attr('d', arc(sim[i]))
                        .attr('fill', 'gray')
                        .attr('fill-opacity', 0.5)
                        .attr('transform', 'translate(' + (r + sim[i].source * sw + sw / 2  + 200) + ',' + (200 - 55) + ')')
                    // break;
                }
            })
        })
    })
}
DrawMatrix();