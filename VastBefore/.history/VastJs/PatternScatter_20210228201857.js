var widthScatter = document.getElementById("patternScatter").offsetWidth,
    heightScatter = document.getElementById("patternScatter").offsetHeight;
// console.log(heightScatter);

var svgScatter;

let scale_num = 1;

var pattern_select_data;

svgScatter = d3.select("#patternScatter").append("svg")
    .attr("width", widthScatter)
    .attr("height", heightScatter);

let scatter_g = 0;
let selectPatternData = new Array();
let brush_g = 0;
let axis_g = 0;
let axisCircle = 0;
let stg = 0;

svgScatter.append('line')
    .attr('x1', 10)
    .attr('x2', widthScatter - 10)
    .attr('y1', heightScatter / 2)
    .attr('y2', heightScatter / 2)
    .attr('fill', 'none')
    .attr('stroke', 'gray')

function DrawScatter() {
    d3.json('data/20210226.json').then((scatter_data) => {
        d3.csv('data/jingshouyi.csv').then((rect_data) => {
            // d3.csv('data/20210202.csv').then((pattern_data) => {
            // console.log(scatter_data);
            if (scatter_g != 0) {
                scatter_g.remove();
                scatter_g = 0;
            }
            // console.log(pattern_data);

            const zoom = d3.zoom()
                .scaleExtent([1, 40])
                .on("zoom", zoomed);


            function zoomed() {
                stg.attr("transform", d3.event.transform);
            }

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
            stg = scatter_g.append('g');
            
            svgScatter.call(zoom);

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
            // console.log(xScale.domain());
            var yScale = d3.scaleLinear()
                .domain([min_y, max_y])
                .range([10, yAxisWidth / 2 - 10]);

            let patternScatter = scatter_g.selectAll("#scatterPattern")
                .attr("id", "scatterPattern")
                .data(scatter_data)
                .enter()
                .append("circle")
                .attr('cx', d => xScale(parseFloat(d.x)))
                .attr('cy', d => yScale(parseFloat(d.y)))
                .attr('r', 1)
                .attr('fill', (d, i) => {
                    return 'gray';
                })
                .attr('fill-opacity', 0.5)
                .attr('stroke', 'gray');
            // })
        })
    })
}

function PatternBrush() {
    d3.json('data/20210226.json').then((scatter_data) => {
        d3.csv('data/jingshouyi.csv').then((rect_data) => {
            // d3.csv('data/20210202.csv').then((pattern_data) => {
            // d3.csv('data/box_calc_rank.csv').then((base_data) => {
            // console.log(rect_data);
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
                .range([10, yAxisWidth / 2 - 10]);
            const brush = d3.brush()
                .extent([
                    [5, 5],
                    [xAxisWidth - 5, yAxisWidth / 2 - 5]
                ])
                .on('brush', brushing)
                .on('end', brushed);
            brush_g = scatter_g.append('g')
                .call(brush)
            // console.log((pattern_data[0]['a'].substring(1, pattern_data[0]['a'].length - 1)).split(', '));
            function brushing() {
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
                let selectPeople = new Object();
                for (let i = 0; i < scatter_data.length; ++i) {
                    let x = xScale(parseFloat(scatter_data[i].x));
                    let y = yScale(parseFloat(scatter_data[i].y));
                    if (x >= x0 && x <= x1 && y >= y0 && y <= y1) {
                        // selectPattern.push(pattern_data[i]);
                        // let arr = (pattern_data[i]['a'].substring(1, pattern_data[0]['a'].length - 1)).split(', ');
                        // let s = new Set();
                        // arr.forEach(x => s.add(parseInt(x)));
                        // selectPatternList.push(s);
                        selectPeople[scatter_data[i].id + scatter_data[i].l] = 1;
                    }
                }
                console.log(selectPeople);
                axisCircle.attr('fill-opacity', d => {
                    
                    if (selectPeople[d.code + d.lun]) {
                        // console.log(d.code + d.lun);
                        return 1;
                    }
                    else return 0;
                })
            }



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
                        // selectPattern.push(pattern_data[i]);
                        // let arr = (pattern_data[i]['a'].substring(1, pattern_data[0]['a'].length - 1)).split(', ');
                        // let s = new Set();
                        // arr.forEach(x => s.add(parseInt(x)));
                        // selectPatternList.push(s);
                    }
                }
                // let selectPeopleList = new Array();
                // let scaleData = new Object();
                // let scaleSumData = new Object();
                // let scaleAvgData = new Object();
                // for (let i = 1; i <= 20; ++i) {
                //     scaleData[i] = 0;
                //     scaleSumData[i] = 0;
                //     scaleAvgData[i] = 0;
                // }

                // for (let i = 0; i < rect_data.length; ++i) {
                //     let f = 0;
                //     let a = rect_data[i]['pattern'];
                //     for (let j in selectPatternList) {
                //         let b = [...selectPatternList[j]];
                //         for (let k in b) {
                //             if (!a.has(b[k])) {
                //                 f = 1;
                //                 break;
                //             }
                //         }
                //         if (!f) {
                //             selectPeopleList.push(rect_data[i]);
                //             scaleData[parseInt(rect_data[i]['biao'])]++;
                //             scaleSumData[parseInt(rect_data[i]['biao'])] += parseFloat(rect_data[i]['end']);
                //             scaleAvgData[parseInt(rect_data[i]['biao'])] += (parseFloat(rect_data[i]['end']) - parseFloat(rect_data[i]['start']));
                //             break;
                //         }
                //     }
                // }
                // for (let i = 1; i <= 20; ++i) {
                //     scaleAvgData[i] = (scaleAvgData[i] / scaleData[i]).toFixed(2);
                //     scaleSumData[i] = (scaleSumData[i] / scaleData[i]).toFixed(2);
                // }
                // selectPatternData.push({
                //     pattern: selectPatternList,
                //     people: selectPeopleList,
                //     scale: scaleData,
                //     sum: scaleSumData,
                //     avg: scaleAvgData,
                //     isTrue: true
                // });
                // console.log(patternSelect);
                // pattern_select_data = selectPatternData;
                // DrawPattern(selectPatternData);
                // DrawLegend(selectPatternData);
                // DrawLine(selectPatternData, patternSelect);
                // DrawSankey(selectPatternData);
            }
            // })
            // })
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

function DrawAxis() {
    d3.json('data/20210226.json').then((scatter_data) => {
        d3.csv('data/jingshouyi.csv').then((rect_data) => {
            d3.csv('data/box_calc_rank.csv').then((box_data) => {
                if (axis_g != 0)
                {
                    axis_g.remove();
                    axis_g = 0;
                }
                axis_g = svgScatter.append('g').attr('transform', "translate(" + 0 + "," + (heightScatter / 2) + ")");
                let x_max = -10000;
                let x_min = 10000;
                let y_min = 10000;
                let y_max = -10000;
                let scatter_array = new Array();
                for (let i = 0; i < box_data.length; ++i) {
                    let temp = {
                        x: parseFloat(box_data[i]['79']) - parseFloat(box_data[i]['69']),
                        y: parseFloat(box_data[i]['39']) - parseFloat(box_data[i]['29']),
                        code: box_data[i]['code'],
                        lun: box_data[i]['biao']
                    };
                    scatter_array.push(temp);
                    x_max = Math.max(x_max, temp.x);
                    x_min = Math.min(x_min, temp.x);
                    y_max = Math.max(y_max, temp.y);
                    y_min = Math.min(y_min, temp.y);
                }
                var xAxisWidth = widthScatter;
                var yAxisWidth = heightScatter;
                var xScale = d3.scaleLinear()
                    .domain([x_min, x_max])
                    .range([10, xAxisWidth - 10]);
                // console.log(xScale.domain());
                var yScale = d3.scaleLinear()
                    .domain([y_max, y_min])
                    .range([30, yAxisWidth / 2 - 10]);

                axis_g.append("g")
                    .attr("transform", "translate(" + 0 + "," + (0 + yScale(0)) + ")")
                    .call(d3.axisBottom(xScale).ticks(10))
                    // .append("text")
                    // .attr("font-family", "Georgia")
                    // .attr('font-size', 15)
                    // .attr("dx", widthGantt - 30)
                    // .attr('dy', '0.5em')
                    // .attr('fill', 'currentColor')
                    // .text("round");
                axis_g.append("g")
                    .attr("transform", "translate(" + xScale(0) + "," + (0) + ")")
                    .call(d3.axisLeft(yScale).ticks(10))
                    // .append("text")
                    // .attr("font-family", "Georgia")
                    // .attr('font-size', 15)
                    // .attr("dx", "7em")
                    // .attr('dy', 12)
                    // .attr('fill', 'currentColor')
                    // .text("number of people");
                
                axisCircle = axis_g.selectAll('#axisCircle')
                .attr('id', 'axisCircle')
                .data(scatter_array)
                .enter()
                .append('circle')
                .attr('cx', d => xScale(d.x))
                .attr('cy', d => yScale(d.y))
                .attr('r', 2)
                .attr('fill', 'gray')
                .attr('stroke', 'none')
                .attr('fill-opacity', 1);
            })
        })
    })
}

DrawScatter();
DrawAxis();