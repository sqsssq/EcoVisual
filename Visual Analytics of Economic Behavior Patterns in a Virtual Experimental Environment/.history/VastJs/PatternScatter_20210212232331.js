var widthScatter = document.getElementById("patternScatter").offsetWidth,
    heightScatter = document.getElementById("patternScatter").offsetHeight - 30;
console.log(heightScatter);

var svgScatter;

let scale_num = 1;


svgScatter = d3.select("#patternScatter").append("svg")
    .attr("width", widthScatter)
    .attr("height", heightScatter);

let scatter_g = 0;
let selectPatternData = new Array();
let brush_g = 0;

function DrawScatter() {
    d3.csv('data/s6.csv').then((scatter_data) => {
        d3.csv('data/jingshouyi.csv').then((rect_data) => {
            d3.csv('data/20210202.csv').then((pattern_data) => {
                if (scatter_g != 0) {
                    scatter_g.remove();
                    scatter_g = 0;
                }
                // console.log(pattern_data);

                const zoom = d3.zoom()
                    .scaleExtent([1, 40])
                    .on("zoom", zoomed);


                function zoomed() {
                    scatter_g.attr("transform", d3.event.transform);
                }
                svgScatter.call(zoom);

                //多少时间内完成缩放
                // svgScatter.transition().duration(1000).call(
                //     // zoom.transform,
                //     // // d3.zoomIdentity.translate(100, 100)
                //     // d3.zoomIdentity.scaleTo(10)
                //     zoom.scaleTo, 2
                // );

                for (let i = 0; i < rect_data.length; ++i) {
                    let s = new Set();
                    for (let j = 1; j < 12; ++j) {
                        s.add(parseInt(rect_data[i][j]));
                    }
                    rect_data[i]['pattern'] = s;
                }
                // console.log(rect_data);

                scatter_g = svgScatter.append('g');

                let max_x = -999999,
                    min_x = 99999,
                    max_y = -99999,
                    min_y = 999999
                for (var i = 0; i < scatter_data.length; ++i) {
                    max_x = Math.max(max_x, parseFloat(scatter_data[i].x))
                    max_y = Math.max(max_y, parseFloat(scatter_data[i].y))
                    min_x = Math.min(min_x, parseFloat(scatter_data[i].x))
                    min_y = Math.min(min_y, parseFloat(scatter_data[i].y))
                }

                var xAxisWidth = widthScatter;
                var yAxisWidth = heightScatter;
                var xScale = d3.scaleLinear()
                    .domain([min_x, max_x])
                    .range([10, xAxisWidth - 10]);
                var yScale = d3.scaleLinear()
                    .domain([min_y, max_y])
                    .range([10, yAxisWidth - 10]);

                let patternScatter = scatter_g.selectAll("#scatterPattern")
                    .attr("id", "scatterPattern")
                    .data(scatter_data)
                    .enter()
                    .append("circle")
                    .attr('cx', d => xScale(parseFloat(d.x)))
                    .attr('cy', d => yScale(parseFloat(d.y)))
                    .attr('r', 1)
                    .attr('fill', (d, i) => {
                        if (parseFloat(pattern_data[i].perfit) > 0) {
                            // console.log(1);
                            return 'green';
                        } else
                            return 'red';
                    })
                    .attr('fill-opacity', 0.5);
                // const brush = d3.brush()
                //     .extent([
                //         [5, 5],
                //         [xAxisWidth - 5, yAxisWidth - 5]
                //     ])
                //     .on('end', brushed);
                // let brush_g = scatter_g.append('g')
                //     .call(brush)
                // // console.log((pattern_data[0]['a'].substring(1, pattern_data[0]['a'].length - 1)).split(', '));



                // function brushed() {
                //     const selection = d3.event.selection;
                //     const [
                //         [x0, y0],
                //         [x1, y1]
                //     ] = selection;
                //     // console.log([x0, x1])
                //     if (x0 > x1) {
                //         var tmp = x1;
                //         x1 = x0;
                //         x0 = tmp;
                //     }
                //     if (y0 > y1) {
                //         var tmp = y1;
                //         y1 = y0;
                //         y0 = tmp;
                //     }
                //     scatter_g.append('rect')
                //         .attr('x', x0)
                //         .attr('y', y0)
                //         .attr('width', x1 - x0)
                //         .attr('height', y1 - y0)
                //         .attr('fill', 'gray')
                //         .attr('fill-opacity', 0.2);
                //     if (x0 > x1) {
                //         var temp = x0;
                //         x0 = x1;
                //         x1 = temp;
                //     }
                //     if (y0 > y1) {
                //         var temp = y0;
                //         y0 = y1;
                //         y1 = temp;
                //     }
                //     let selectPattern = new Array();
                //     let selectPatternList = new Array();
                //     for (let i = 0; i < scatter_data.length; ++i) {
                //         let x = xScale(parseFloat(scatter_data[i].x));
                //         let y = yScale(parseFloat(scatter_data[i].y));
                //         if (x >= x0 && x <= x1 && y >= y0 && y <= y1) {
                //             selectPattern.push(pattern_data[i]);
                //             let arr = (pattern_data[i]['a'].substring(1, pattern_data[0]['a'].length - 1)).split(', ');
                //             let s = new Set();
                //             arr.forEach(x => s.add(parseInt(x)));
                //             selectPatternList.push(s);
                //         }
                //     }
                //     let selectPeopleList = new Array();
                //     let scaleData = new Object();
                //     for (let i = 1; i <= 20; ++i) {
                //         scaleData[i] = 0;
                //     }

                //     for (let i = 0; i < rect_data.length; ++i) {
                //         let f = 0;
                //         let a = rect_data[i]['pattern'];
                //         for (let j in selectPatternList) {
                //             let b = [...selectPatternList[j]];
                //             for (let k in b) {
                //                 if (!a.has(b[k])) {
                //                     f = 1;
                //                     break;
                //                 }
                //             }
                //             if (!f) {
                //                 selectPeopleList.push(rect_data[i]);
                //                 scaleData[parseInt(rect_data[i]['biao'])]++;
                //                 break;
                //             }
                //         }
                //     }
                //     selectPatternData.push({
                //         pattern: selectPatternList,
                //         people: selectPeopleList,
                //         scale: scaleData
                //     });
                //     // console.log(selectPatternData);
                //     DrawPattern(selectPatternData);
                // }
            })
        })
    })
}

function PatternBrush() {
    d3.csv('data/s6.csv').then((scatter_data) => {
        d3.csv('data/jingshouyi.csv').then((rect_data) => {
            d3.csv('data/20210202.csv').then((pattern_data) => {
                for (let i = 0; i < rect_data.length; ++i) {
                    let s = new Set();
                    for (let j = 1; j < 12; ++j) {
                        s.add(parseInt(rect_data[i][j]));
                    }
                    rect_data[i]['pattern'] = s;
                }
                let max_x = -999999,
                    min_x = 99999,
                    max_y = -99999,
                    min_y = 999999
                for (var i = 0; i < scatter_data.length; ++i) {
                    max_x = Math.max(max_x, parseFloat(scatter_data[i].x))
                    max_y = Math.max(max_y, parseFloat(scatter_data[i].y))
                    min_x = Math.min(min_x, parseFloat(scatter_data[i].x))
                    min_y = Math.min(min_y, parseFloat(scatter_data[i].y))
                }

                var xAxisWidth = widthScatter;
                var yAxisWidth = heightScatter;
                var xScale = d3.scaleLinear()
                    .domain([min_x, max_x])
                    .range([10, xAxisWidth - 10]);
                var yScale = d3.scaleLinear()
                    .domain([min_y, max_y])
                    .range([10, yAxisWidth - 10]);
                const brush = d3.brush()
                    .extent([
                        [5, 5],
                        [xAxisWidth - 5, yAxisWidth - 5]
                    ])
                    .on('end', brushed);
                brush_g = scatter_g.append('g')
                    .call(brush)
                // console.log((pattern_data[0]['a'].substring(1, pattern_data[0]['a'].length - 1)).split(', '));



                function brushed() {
                    const selection = d3.event.selection;
                    const [
                        [x0, y0],
                        [x1, y1]
                    ] = selection;
                    // console.log([x0, x1])
                    if (x0 > x1) {
                        var tmp = x1;
                        x1 = x0;
                        x0 = tmp;
                    }
                    if (y0 > y1) {
                        var tmp = y1;
                        y1 = y0;
                        y0 = tmp;
                    }
                    scatter_g.append('rect')
                        .attr('x', x0)
                        .attr('y', y0)
                        .attr('width', x1 - x0)
                        .attr('height', y1 - y0)
                        .attr('fill', 'gray')
                        .attr('fill-opacity', 0.2);
                    scatter_g.append('text')
                        .attr('x', (x0))
                        .attr('y', (y0))
                        .attr('dx', 0)
                        .attr('dy', 0)
                        .attr('font-size', 10)
                        .attr('font-family', 'Georgia')
                        .text(selectPatternData.length + 1);
                    if (x0 > x1) {
                        var temp = x0;
                        x0 = x1;
                        x1 = temp;
                    }
                    if (y0 > y1) {
                        var temp = y0;
                        y0 = y1;
                        y1 = temp;
                    }
                    let selectPattern = new Array();
                    let selectPatternList = new Array();
                    for (let i = 0; i < scatter_data.length; ++i) {
                        let x = xScale(parseFloat(scatter_data[i].x));
                        let y = yScale(parseFloat(scatter_data[i].y));
                        if (x >= x0 && x <= x1 && y >= y0 && y <= y1) {
                            selectPattern.push(pattern_data[i]);
                            let arr = (pattern_data[i]['a'].substring(1, pattern_data[0]['a'].length - 1)).split(', ');
                            let s = new Set();
                            arr.forEach(x => s.add(parseInt(x)));
                            selectPatternList.push(s);
                        }
                    }
                    let selectPeopleList = new Array();
                    let scaleData = new Object();
                    for (let i = 1; i <= 20; ++i) {
                        scaleData[i] = 0;
                    }

                    for (let i = 0; i < rect_data.length; ++i) {
                        let f = 0;
                        let a = rect_data[i]['pattern'];
                        for (let j in selectPatternList) {
                            let b = [...selectPatternList[j]];
                            for (let k in b) {
                                if (!a.has(b[k])) {
                                    f = 1;
                                    break;
                                }
                            }
                            if (!f) {
                                selectPeopleList.push(rect_data[i]);
                                scaleData[parseInt(rect_data[i]['biao'])]++;
                                break;
                            }
                        }
                    }
                    selectPatternData.push({
                        pattern: selectPatternList,
                        people: selectPeopleList,
                        scale: scaleData
                    });
                    // console.log(selectPatternData);
                    DrawPattern(selectPatternData);
                }
            })
        })
    })
}

function RemoveBrush() {
    if (brush_g != 0) {
        brush_g.remove();
        brush_g = 0;
    }
}

function BeLarge() {
    scale_num++;
    const zoom = d3.zoom()
        .scaleExtent([1, 40])
        .on("zoom", zoomed);


    function zoomed() {
        scatter_g.attr("transform", d3.event.transform);
    }
    // 多少时间内完成缩放
    svgScatter.transition().duration(500).call(
        // zoom.transform,
        // // d3.zoomIdentity.translate(100, 100)
        // d3.zoomIdentity.scaleTo(10)
        zoom.scaleTo, scale_num
    );
}

function BeLow() {
    if (scale_num > 1)
    scale_num--;
    const zoom = d3.zoom()
        .scaleExtent([1, 40])
        .on("zoom", zoomed);


    function zoomed() {
        scatter_g.attr("transform", d3.event.transform);
    }
    // 多少时间内完成缩放
    if (scale_num > 1)
    svgScatter.transition().duration(500).call(
        // zoom.transform,
        // // d3.zoomIdentity.translate(100, 100)
        // d3.zoomIdentity.scaleTo(10)
        zoom.scaleTo, scale_num
    );
    else
    
    svgScatter.transition().duration(500).call(
        zoom.transform,
        // // d3.zoomIdentity.translate(100, 100)
        d3.zoomIdentity.translate(0, 0).scale(scale_num)
    );
}

DrawScatter();