var widthScatter = document.getElementById("patternScatter").offsetWidth,
    heightScatter = document.getElementById("patternScatter").offsetHeight;
// console.log(heightScatter);
var widthS = document.getElementById("wealthSpace").offsetWidth,
    heightS = document.getElementById("wealthSpace").offsetHeight;

var widthL = document.getElementById("wealthLegend").offsetWidth,
    heightL = document.getElementById("wealthLegend").offsetHeight;
var svgScatter;

let scale_num = 1;

var pattern_select_data;

svgScatter = d3.select("#patternScatter").append("svg")
    .attr('class', 'svgBorder')
    .attr("width", widthScatter)
    .attr("height", heightScatter)
// .attr('transform', 'translate(0, 35)');

let svgAxis = d3.select("#wealthSpace").append("svg")
    // .attr('class', 'svgBorder')
    .attr("width", widthS)
    .attr("height", heightS)

let svgLegend = d3.select("#wealthLegend").append("svg")
    // .attr('class', 'svgBorder')
    .attr("width", widthL)
    .attr("height", heightL)
// .attr('transform', 'translate(0, 60)');;

// svgScatter.append('rect')
// .attr('x', 3)
// .attr('y', 36)
// .attr('width', widthScatter - 6)
// .attr('height', heightScatter / 2 - 40)
// .attr('fill', 'none')
// .attr('stroke', 'black')


// svgScatter.append('rect')
// .attr('x', 3)
// .attr('y', 36 + heightScatter / 2)
// .attr('width', widthScatter - 6)
// .attr('height', heightScatter / 2 - 40)
// .attr('fill', 'none')
// .attr('stroke', 'black')

let scatter_g = 0;
let selectPatternData = new Array();
let brush_g = 0;
let axis_g = 0;
let axisCircle = 0;
let stg = 0;
let zoom_g = svgScatter.append('g');

let selectPatternR = new Array();

let selectPeople = new Object();
let countType = 1;
var typeColor = ["rgb(205, 105, 6)", "rgb(0, 255, 255)", "rgb(155, 107, 156)", "orange"];
var wealthTypeColor = ['rgb(226, 102, 98)', 'rgb(224, 112, 110)']

// svgScatter.append('line')
//     .attr('x1', 10)
//     .attr('x2', widthScatter - 10)
//     .attr('y1', heightScatter / 2)
//     .attr('y2', heightScatter / 2)
//     .attr('fill', 'none')
//     .attr('stroke', 'gray')

const zoom = d3.zoom()
    .scaleExtent([1, 40])
    .on("zoom", zoomed);


function zoomed() {
    zoom_g.attr("transform", d3.event.transform);
}
// stg = scatter_g.append('g');

svgScatter.call(zoom);

function drawWealthLegend(cnt) {
    svgLegend.append('rect')
        .attr('x', 100 * cnt)
        .attr('y', heightL / 6)
        .attr('height', heightL * 2 / 3)
        .attr('width', 40)
        .attr('fill', typeColor[cnt]);
    svgLegend.append('text')
        .attr('x', 100 * cnt + 45)
        .attr('y', heightL / 2)
        .attr('font-family', 'Georgia')
        .attr('dy', '0.5em')
        .attr('font-size', 20)
        .text('P' + (cnt + 1));
}


function DrawScatterLine(code) {
    d3.json('data/20210318_1.json').then((scatter_data) => {
        // console.log(1);
        // console.log(pattern_data);
        // const people_wealth = new Object();
        // for (let i in rect_data) {
        //     if (typeof (people_wealth[rect_data[i].code + rect_data[i].biao]) == 'undefined') {
        //         people_wealth[rect_data[i].code + rect_data[i].biao] = new Object();
        //     }

        //     people_wealth[rect_data[i].code + rect_data[i].biao] = {
        //         start: parseFloat(rect_data[i]['start']),
        //         profit: parseFloat(rect_data[i]['profit'])
        //     };
        // }
        // console.log(people_wealth);
        let scatterLine_data = new Array();
        for (let i in scatter_data) {
            // scatter_data[i]['profit'] = people_wealth[scatter_data[i].id + scatter_data[i].l].profit;
            // scatter_data[i]['start'] = people_wealth[scatter_data[i].id + scatter_data[i].l].start;
            if (scatter_data[i].id == code) {
                scatterLine_data.push(scatter_data[i]);
            }
        }


        //多少时间内完成缩放
        // svgScatter.transition().duration(1000).call(
        //     // zoom.transform,
        //     // // d3.zoomIdentity.translate(100, 100)
        //     // d3.zoomIdentity.scaleTo(10)
        //     zoom.scaleTo, 2
        // );


        // svgScatter.append('clipPath')
        // .attr('id', 'h1')
        // .append('rect')
        // .attr('width', c_width)
        // .attr('height', 30);
        // for (let i = 0; i < rect_data.length; ++i) {
        //     let s = new Set();
        //     for (let j = 1; j < 12; ++j) {
        //         s.add(parseInt(rect_data[i][j]));
        //     }
        //     rect_data[i]['pattern'] = s;
        // }
        // console.log(rect_data);

        // scatter_g = zoom_g.append('g').attr('width', widthScatter).attr('height', heightScatter);

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
            .range([10, yAxisWidth - 10]);
        let scatterLine = d3.line()
            .x((d, i) => xScale(d.x))
            .y((d, i) => yScale(d.y))
            .curve(d3.curveMonotoneX);


        zoom_g.selectAll('#wgf')
            .attr("id", 'wgf')
            .data([scatterLine_data])
            .enter()
            .append('path')
            .attr('id', 'lineWWW')
            .attr('d', d => {
                console.log(d);
                return scatterLine(d)
            })
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')

    })
}


function DrawScatter(flag) {
    d3.json('data/20210320_1.json').then((scatter_data) => {
        d3.csv('data/newdata_for_line.csv').then((rect_data) => {
            // d3.csv('data/20210202.csv').then((pattern_data) => {
            // console.log(scatter_data);
            // console.log(rect_data);
            if (scatter_g != 0) {
                scatter_g.remove();
                scatter_g = 0;
            }
            // console.log(pattern_data);
            const people_wealth = new Object();
            for (let i in rect_data) {
                if (typeof (people_wealth[rect_data[i].code + rect_data[i].biao]) == 'undefined') {
                    people_wealth[rect_data[i].code + rect_data[i].biao] = new Object();
                }

                people_wealth[rect_data[i].code + rect_data[i].biao] = {
                    start: parseFloat(rect_data[i]['start']),
                    profit: parseFloat(rect_data[i]['profit'])
                };
            }
            // console.log(people_wealth);
            for (let i in scatter_data) {
                scatter_data[i]['profit'] = people_wealth[scatter_data[i].id + scatter_data[i].l].profit;
                scatter_data[i]['start'] = people_wealth[scatter_data[i].id + scatter_data[i].l].start;
            }

            //多少时间内完成缩放
            // svgScatter.transition().duration(1000).call(
            //     // zoom.transform,
            //     // // d3.zoomIdentity.translate(100, 100)
            //     // d3.zoomIdentity.scaleTo(10)
            //     zoom.scaleTo, 2
            // );


            // svgScatter.append('clipPath')
            // .attr('id', 'h1')
            // .append('rect')
            // .attr('width', c_width)
            // .attr('height', 30);
            for (let i = 0; i < rect_data.length; ++i) {
                let s = new Set();
                for (let j = 1; j < 12; ++j) {
                    s.add(parseInt(rect_data[i][j]));
                }
                rect_data[i]['pattern'] = s;
            }
            // console.log(rect_data);

            scatter_g = zoom_g.append('g').attr('width', widthScatter).attr('height', heightScatter);
            // stg = scatter_g.append('g');

            svgScatter.call(zoom);

            let max_x = -999999,
                min_x = 99999,
                max_y = -99999,
                min_y = 999999,
                min_start = 99999,
                max_start = -99999,
                min_profit = 99999,
                max_profit = -99999;
            for (var i = 0; i < scatter_data.length; ++i) {
                max_x = Math.max(max_x, parseFloat(scatter_data[i].x))
                max_y = Math.max(max_y, parseFloat(scatter_data[i].y))
                max_start = Math.max(max_start, parseFloat(scatter_data[i].start))
                max_profit = Math.max(max_profit, parseFloat(scatter_data[i].profit))
                min_x = Math.min(min_x, parseFloat(scatter_data[i].x))
                min_y = Math.min(min_y, parseFloat(scatter_data[i].y))
                min_start = Math.min(min_start, parseFloat(scatter_data[i].start))
                min_profit = Math.min(min_profit, parseFloat(scatter_data[i].profit))
            }

            var xAxisWidth = widthScatter;
            var yAxisWidth = heightScatter;
            var xScale = d3.scaleLinear()
                .domain([min_x, max_x])
                .range([10, xAxisWidth - 10]);
            // console.log(xScale.domain());
            var yScale = d3.scaleLinear()
                .domain([min_y, max_y])
                .range([10, yAxisWidth - 10]);
            var start_max_Scale = d3.scaleLinear()
                .domain([0, 400])
                .range([1, 10]);
            var start_min_Scale = d3.scaleLinear()
                .domain([0, min_start])
                .range([1, 10]);
                var profit_max_Scale = d3.scaleLinear()
                    .domain([0, 100])
                    .range([1, 10]);
                var profit_min_Scale = d3.scaleLinear()
                    .domain([0, -100])
                    .range([1, 10]);
            var computeMax = d3.interpolate('#98FB98', 'green');
            var computeMin = d3.interpolate('#FFC0CB', 'red');

            // const colorScale = d3.scaleLog()
            // .domain([0, 0 - min_start, max_start - min_start])
            // .range(['green', 'grey', 'red']);


            let patternScatter = scatter_g.selectAll("#scatterPattern")
                .attr("id", "scatterPattern")
                .data(scatter_data)
                .enter()
                .append("circle")
                .attr('id', d => 'people_cir_' + d.id + d.l)
                .attr('cx', d => xScale(parseFloat(d.x)))
                .attr('cy', d => yScale(parseFloat(d.y)))
                .attr('r', 1)
                .attr('fill', (d, i) => {
                    if (flag == 0)
                        return 'gray';
                    if (flag == 1) {
                        if (d.start > 0)
                            return computeMax(Math.log10(start_max_Scale(d.start > 400 ? 400 : d.start)));
                        if (d.start <= 0)
                            return computeMin(Math.log10(start_min_Scale(d.start)))
                        // console.log()
                        // if (d.start > 0)
                        // console.log(Math.log10(start_max_Scale(d.start)), start_max_Scale(d.start))
                        // if (d.start > 0) return 'green';
                        // else return 'red';
                    }
                    if (flag == 2) {
                        if (d.profit > 0)
                        {
                            return computeMax(Math.log10(profit_max_Scale(d.profit > 200 ? 200 : d.profit)));

                        }
                        else
                        {
                            return computeMin(Math.log10(profit_min_Scale(d.profit < -100 ? -100 : d.profit)))

                        }
                        // if (d.profit > 0) return 'green';
                        // else return 'red';
                    }
                })
            // .attr('fill-opacity', 0.5)

            // .attr('stroke', 'gray');
            // })

            // svgScatter.append('rect')
            // .attr('x', 0)
            // .attr('y', heightScatter / 2)
            // .attr('width', widthScatter)
            // .attr('height', heightScatter / 2)
            // .attr('fill', 'white');
        })
    })
}

function PatternBrush() {
    d3.json('data/20210320_1.json').then((scatter_data) => {
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
            .on('brush', brushing)
            .on('end', brushed);
        brush_g = zoom_g.append('g')
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
            for (let i = 0; i < scatter_data.length; ++i) {
                let x = xScale(parseFloat(scatter_data[i].x));
                let y = yScale(parseFloat(scatter_data[i].y));
                if (x >= x0 && x <= x1 && y >= y0 && y <= y1) {
                    // selectPattern.push(pattern_data[i]);
                    // let arr = (pattern_data[i]['a'].substring(1, pattern_data[0]['a'].length - 1)).split(', ');
                    // let s = new Set();
                    // arr.forEach(x => s.add(parseInt(x)));
                    // selectPatternList.push(s);
                    selectPeople[scatter_data[i].id + scatter_data[i].l] = countType;
                }
            }
            // console.log(selectPeople);
            axisCircle.attr('fill-opacity', d => {

                    if (selectPeople[d.code + d.lun]) {
                        // console.log(d.code + d.lun);
                        return 1;
                    } else return 0.2;
                })
                .attr('fill', d => {
                    if (selectPeople[d.code + d.lun]) {
                        // console.log(d.code + d.lun);
                        return typeColor[selectPeople[d.code + d.lun] - 1];
                    } else return 'gray';
                })
                .attr('r', d => {
                    if (selectPeople[d.code + d.lun]) {
                        // console.log(d.code + d.lun);
                        return 3;
                    } else return 1;
                })
        }

        function brushed() {
            const selection = d3.event.selection;
            countType++;
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
            zoom_g.append('rect')
                .attr('x', x0)
                .attr('y', y0)
                .attr('width', x1 - x0)
                .attr('height', y1 - y0)
                .attr('fill', typeColor[countType - 2])
                .attr('fill-opacity', 0.2);
            zoom_g.append('text')
                .attr('x', (x0))
                .attr('y', (y0))
                .attr('dx', 0)
                .attr('dy', 0)
                .attr('font-size', 10)
                .attr('font-family', 'Georgia')
                .text(countType - 1);
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
                    selectPattern.push({
                        id: scatter_data[i].id,
                        lun: scatter_data[i].l
                    })
                }
            }
            // console.log(countType - 2)
            // console.log((c_width + 10))
            drawPattern((countType - 2), 10, selectPattern);
            drawWealthCircle(selectPattern, (countType - 2));
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
        zoom_g.attr("transform", d3.event.transform);
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
    d3.csv('data/newdata_for_line.csv').then((box_data) => {
        // console.log(document.getElementById('se1').value)
        let tx = document.getElementById('se1').value;
        let ty = document.getElementById('se2').value;
        let tk = document.getElementById('se3').value;
        // let nameList = ['Initial', 'Work', 'Health', 'Insurance', 'Loan', 'Investment', 'Risk', 'Disaster', 'Lottery', 'Ill', 'Unemployed', 'Net yield', 'Total'];
        // console.log(document.getElementById('se1').name)
        let nameList = ['Initial', 'Work', 'Health Investment', 'Repayment', 'Loan', 'Investment', 'Venture', 'Insurance', 'Lottery', 'Disaster', 'Illness', 'Risk Preference', 'Patience', 'Net Yield', 'Total'];
        // console.log(tx, ty);
        if (axis_g != 0) {
            axis_g.remove();
            axis_g = 0;
        }
        axis_g = svgAxis.append('g')
        // .attr('transform', "translate(" + 0 + "," + (heightScatter / 2 + 5) + ")");
        // axis_g.append('rect')
        //     .attr('x', 0)
        //     .attr('y', 0)
        //     .attr('width', widthScatter)
        //     .attr('height', heightScatter / 2)
        //     .attr('fill', 'white');
        let x_max = -10000;
        let x_min = 10000;
        let y_min = 10000;
        let y_max = -10000;
        let scatter_array = new Array();
        for (let i = 0; i < box_data.length; ++i) {
            let cx;
            if (parseInt(tx) == 14) {
                cx = parseFloat(box_data[i]['profit']);
            } else if (parseInt(tx) > 1 && parseInt(tx) <= 13) {
                cx = parseFloat(box_data[i][lineLegend[parseInt(tx) - 2] + '_profit']);
            } else if (parseInt(tx) == 1) {
                cx = parseFloat(box_data[i]['start']);
            } else if (parseInt(tx) == 15) {
                cx = parseFloat(box_data[i]['end']);
            }

            let cy;
            if (parseInt(ty) == 14) {
                cy = parseFloat(box_data[i]['profit']);
            } else if (parseInt(ty) > 1 && parseInt(ty) <= 13) {
                cy = parseFloat(box_data[i][lineLegend[parseInt(ty) - 2] + '_profit']);
            } else if (parseInt(ty) == 1) {
                cy = parseFloat(box_data[i]['start']);
            } else if (parseInt(ty) == 15) {
                cy = parseFloat(box_data[i]['end']);
            }

            // let cy;
            // if (parseInt(ty) == 12) {
            //     cy = parseFloat(box_data[i]['129']) - parseFloat(box_data[i]['19']);
            // } else if (parseInt(ty) > 1 && parseInt(ty) <= 11) {
            //     cy = parseFloat(box_data[i][9 + 10 * (parseInt(ty) + 1)]) - parseFloat(box_data[i][9 + 10 * (parseInt(ty))]);
            // } else if (parseInt(ty) == 1) {
            //     cy = parseFloat(box_data[i]['19']);
            // } else if (parseInt(ty) == 13) {
            //     cy = parseFloat(box_data[i]['139']);
            // }

            let temp = {
                y: cy,
                x: cx,
                // y: parseFloat(box_data[i]['39']) - parseFloat(box_data[i]['29']),
                code: box_data[i]['code'],
                lun: box_data[i]['biao']
            };
            scatter_array.push(temp);
            x_max = Math.max(x_max, temp.x);
            x_min = Math.min(x_min, temp.x);
            y_max = Math.max(y_max, temp.y);
            y_min = Math.min(y_min, temp.y);
        }
        if (x_max <= 0) x_max = 1;
        if (x_min >= 0) x_min = -1;
        if (y_max <= 0) y_max = 1;
        if (y_min >= 0) y_min = -1;
        var xAxisWidth = widthS;
        var yAxisWidth = heightS;
        // console.log(x_max, x_min, y_max, y_min);


        //#region
        let stepNum = tk;
        // let x_sum = Math.abs(x_min) + Math.abs(x_max);
        let x_sum = x_max - x_min;
        let x_step = x_sum / stepNum;
        // console.log(x_step)
        let x_array = new Array();
        for (let i = 0; i < stepNum; ++i) {
            x_array.push(0);
        }
        for (let i in scatter_array) {
            let x_type = parseInt((scatter_array[i].x - x_min) / x_step);
            if (x_type == stepNum) x_type--;
            // console.log(x_type);
            scatter_array[i].x_type = x_type;
            x_array[x_type]++;
        }
        // console.log(x_array);
        let x_width = xAxisWidth - 10 - 40;
        let x_start = 20;
        let x_scale_array = new Array();
        for (let i = 0; i < stepNum; ++i) {
            let tmp_width = x_width * x_array[i] / 6080;
            let tmp_scale = d3.scaleLinear()
                .domain([x_min + i * x_step, x_min + (i + 1) * x_step])
                .range([x_start, x_start + tmp_width]);
            x_start += tmp_width;
            x_scale_array.push(tmp_scale);
        }
        let y_sum = y_max - y_min;
        let y_step = y_sum / stepNum;
        let y_array = new Array();
        for (let i = 0; i < stepNum; ++i) {
            y_array.push(0);
        }
        for (let i in scatter_array) {
            let y_type = parseInt((scatter_array[i].y - y_min) / y_step);
            if (y_type == stepNum) y_type--;
            // console.log(y_type);
            scatter_array[i].y_type = y_type;
            y_array[y_type]++;
        }
        // console.log(y_array);
        let y_width = yAxisWidth - 35;
        let y_start = yAxisWidth - 10;
        let y_scale_array = new Array();
        for (let i = 0; i < stepNum; ++i) {
            let tmp_width = y_width * y_array[i] / 6080;
            // console.log(tmp_width);
            let tmp_scale = d3.scaleLinear()
                .domain([y_min + i * y_step, y_min + (i + 1) * y_step])
                .range([y_start, y_start - tmp_width]);
            y_start -= tmp_width;
            y_scale_array.push(tmp_scale);
        }
        for (let i in scatter_array) {
            scatter_array[i].nx = x_scale_array[scatter_array[i].x_type](scatter_array[i].x);
            scatter_array[i].ny = y_scale_array[scatter_array[i].y_type](scatter_array[i].y);
        }
        let x_axis_type = (0 - x_min) > 0 ? ((0 - x_min) / x_step == 8 ? 7 : parseInt((0 - x_min) / x_step)) : -1;
        let y_axis_type = (0 - y_min) > 0 ? ((0 - y_min) / y_step == 8 ? 7 : parseInt((0 - y_min) / y_step)) : -1;
        // console.log(x_min, y_min);
        // console.log(x_axis_type, y_axis_type);
        if (x_max == 0) x_axis_type--;
        if (y_max == 0) y_axis_type--;
        // console.log(x_scale_array);
        // console.log(scatter_array);
        // // console.log(x_axis_type)
        // for (let i in x_scale_array) {

        //     axis_g.append("g")
        //         .attr("transform", "translate(" + 0 + "," + (0 + y_scale_array[y_axis_type](0)) + ")")
        //         .call(d3.axisBottom(x_scale_array[i]).ticks(2))
        //     axis_g.append("g")
        //         .attr("transform", "translate(" + x_scale_array[x_axis_type](0) + "," + (0) + ")")
        //         .call(d3.axisLeft(y_scale_array[i]).ticks(10))
        // }
        //#endregion

        var xScale = d3.scaleLinear()
            .domain([x_min, x_max])
            .range([10, xAxisWidth - 10]);
        // console.log(xScale.domain());
        var yScale = d3.scaleLinear()
            .domain([y_max, y_min])
            .range([10, yAxisWidth / 2 - 40]);

        // axis_g.append("g")
        //     .attr("transform", "translate(" + 0 + "," + (0 + yScale(0)) + ")")
        //     .call(d3.axisBottom(xScale).ticks(10))
        // // .append("text")
        // // .attr("font-family", "Georgia")
        // // .attr('font-size', 15)
        // // .attr("dx", widthGantt - 30)
        // // .attr('dy', '0.5em')
        // // .attr('fill', 'currentColor')
        // // .text("round");
        // axis_g.append("g")
        //     .attr("transform", "translate(" + xScale(0) + "," + (0) + ")")
        //     .call(d3.axisLeft(yScale).ticks(10))
        // // .append("text")
        // // .attr("font-family", "Georgia")
        // // .attr('font-size', 15)
        // // .attr("dx", "7em")
        // // .attr('dy', 12)
        // // .attr('fill', 'currentColor')
        // // .text("number of people");

        axisCircle = axis_g.selectAll('#axisCircle')
            .attr('id', 'axisCircle')
            .data(scatter_array)
            .enter()
            .append('circle')
            // .attr('cx', d => xScale(d.x))
            .attr('id', d => 'axis_cir_' + d.code)
            .attr('cx', d => d.nx)
            // .attr('cy', d => yScale(d.y))
            .attr('cy', d => d.ny)
            // .attr('r', 2)
            .attr('r', d => {
                if (selectPeople[d.code + d.lun]) {
                    // console.log(d.code + d.lun);
                    return 3;
                } else return 1;
            })
            // .attr('fill', 'gray')
            .attr('fill', d => {
                if (selectPeople[d.code + d.lun]) {
                    // console.log(d.code + d.lun);
                    return typeColor[selectPeople[d.code + d.lun] - 1];
                } else return 'gray';
            })
            .attr('stroke', 'none')
            // .attr('fill-opacity', 1)
            .attr('fill-opacity', d => {
                if (Object.keys(selectPeople).length == 0) return 1;

                if (selectPeople[d.code + d.lun]) {
                    // console.log(d.code + d.lun);
                    return 1;
                } else return 0.1;
            })
            .on('mouseover', d => {
                axisCircle.attr('r', x => {
                    if (x == d) return 10;
                    else {

                        if (selectPeople[x.code + x.lun]) {
                            // console.log(d.code + d.lun);
                            return 3;
                        } else return 1;
                    };
                })
                d3.select("#people_cir_" + d.code + d.lun).attr('r', 10)
                .attr('stroke', 'blue');
                console.log(d3.select("#people_cir_" + d.code + d.lun)._groups[0][0]);
                console.log(d3.select("#people_cir_" + d.code + d.lun).attr("fill"));

                // DrawScatterLine(d.code);
            })
            .on('mouseout', d => {
                // d3.select('#lineWWW').remove();
                axisCircle.attr('r', x => {
                    if (selectPeople[x.code + x.lun]) {
                        // console.log(d.code + d.lun);
                        return 3;
                    } else return 1;
                }).attr('fill-opacity', x => {
                    if (Object.keys(selectPeople).length == 0) return 1;

                    if (selectPeople[x.code + x.lun]) {
                        // console.log(d.code + d.lun);
                        return 1;
                    } else return 0.1;
                });
                
                d3.select("#people_cir_" + d.code + d.lun).attr('r', 1)
                .attr('stroke', 'none');
            })
            .on('click', d => {
                drawFlower(d.code, d.lun);
                drawPersonalHorizon(d.code);
                let fill;
                if (selectPeople[d.code + d.lun]) {
                    // console.log(d.code + d.lun);
                    fill = typeColor[selectPeople[d.code + d.lun] - 1];
                } else fill = 'gray';

                selectPeopleCircle(select_people_num + 1, d.nx, d.ny, fill);
            });

        for (let i in x_scale_array) {
            const flagX = Math.abs((x_scale_array[i].range()[1]) - (x_scale_array[i].range()[0])) / x_width > 0.1 ? 1 : 0;
            const flagY = Math.abs((y_scale_array[i].range()[1]) - (y_scale_array[i].range()[0])) / y_width > 0.1 ? 1 : 0;
            // console.log(flagX, flagY);
            if (flagX == 1 && tk != 1) {
                let numX1 = (parseInt(parseInt(x_scale_array[i].domain()[0]) / 1000) > 1 ? parseInt(parseInt(x_scale_array[i].domain()[0]) / 1000).toString() + ',' : '') + parseInt(parseInt(x_scale_array[i].domain()[0]) % 1000).toString();
                let numX2 = (parseInt(parseInt(x_scale_array[i].domain()[1]) / 1000) > 1 ? parseInt(parseInt(x_scale_array[i].domain()[1]) / 1000).toString() + ',' : '') + parseInt(parseInt(x_scale_array[i].domain()[1]) % 1000).toString();

                axis_g.append('text')
                    .text(numX1)
                    .attr('x', x_scale_array[i].range()[0])
                    .attr('y', y_scale_array[y_axis_type](0))
                    .attr('dy', '1.47em')
                    // .attr('dx', '-1em')
                    .attr('font-size', '12px')
                    .attr('font-family', 'sans-serif')
                    .attr('text-anchor', 'middle');
                axis_g.append('text')
                    .text(numX2)
                    .attr('x', x_scale_array[i].range()[1])
                    .attr('y', y_scale_array[y_axis_type](0))
                    .attr('dy', '1.47em')
                    .attr('font-size', '12px')
                    .attr('font-family', 'sans-serif')
                    .attr('text-anchor', 'middle');

            }
            if (flagY == 1 && tk != 1) {
                // console.log(parseInt(y_scale_array[i].domain()[1]))
                // console.log(parseInt(parseInt(y_scale_array[i].domain()[0]) / 1000));
                let numY1 = (parseInt(parseInt(y_scale_array[i].domain()[0]) / 1000) > 1 ? parseInt(parseInt(y_scale_array[i].domain()[0]) / 1000).toString() + ',' : '') + parseInt(parseInt(y_scale_array[i].domain()[0]) % 1000).toString();
                let numY2 = (parseInt(parseInt(y_scale_array[i].domain()[1]) / 1000) > 1 ? parseInt(parseInt(y_scale_array[i].domain()[1]) / 1000).toString() + ',' : '') + parseInt(parseInt(y_scale_array[i].domain()[1]) % 1000).toString();
                // console.log(numY1, numY2);
                axis_g.append('text')
                    .text(numY1)
                    .attr('x', x_scale_array[x_axis_type](0))
                    .attr('y', y_scale_array[i].range()[0])
                    .attr('dx', '-0.8em')
                    .attr('dy', '0.5em')
                    // .attr('font-family', 'Georgia')
                    .attr('font-size', '12px')
                    .attr('text-anchor', 'end');
                axis_g.append('text')
                    .text(numY2)
                    .attr('x', x_scale_array[x_axis_type](0))
                    .attr('y', y_scale_array[i].range()[1])
                    .attr('dx', '-0.8em')
                    .attr('dy', '0.5em')
                    // .attr('font-family', 'Georgia')
                    .attr('font-size', '12px')
                    .attr('font-family', 'sans-serif')
                    .attr('text-anchor', 'end');

            }
            if (tk != 1)
                axis_g.append('text')
                .text(0)
                .attr('x', x_scale_array[x_axis_type](0))
                .attr('y', y_scale_array[y_axis_type](0))
                .attr('dx', '1em')
                .attr('dy', '1em')
                // .attr('font-family', 'Georgia')
                .attr('font-family', 'sans-serif')
                .attr('font-size', '12px')
                .attr('text-anchor', 'end');
            axis_g.append("g")
                .attr("transform", "translate(" + 0 + "," + (0 + y_scale_array[y_axis_type](0)) + ")")
                .attr('class', 'axis')
                .call(d3.axisBottom(x_scale_array[i]).ticks(tk == 1 ? 7 : 0))
            axis_g.append("g")
                .attr("transform", "translate(" + x_scale_array[x_axis_type](0) + "," + (0) + ")")
                .attr('class', 'axis')
                .call(d3.axisLeft(y_scale_array[i]).ticks(tk == 1 ? 7 : 0))
        }
        // console.log((nameList[se1]))
        axis_g.append('text')
            .text(nameList[ty - 1])
            .attr('x', x_scale_array[x_axis_type](0))
            .attr('y', 15)
            .attr('font-family', 'Georgia')
            .attr('text-anchor', 'middle');
        axis_g.append('text')
            .text(nameList[tx - 1])
            .attr('x', xAxisWidth - 15)
            .attr('y', y_scale_array[y_axis_type](0))
            .attr('transform', `rotate(90, ${xAxisWidth - 15}, ${y_scale_array[y_axis_type](0)})`)
            .attr('font-family', 'Georgia')
            .attr('text-anchor', 'middle');

    })
}

function selectPeopleCircle(cnt, x, y, fill) {
    svgAxis.append('circle')
        .attr('id', 'sel' + cnt)
        .attr('cx', x)
        .attr('cy', y)
        .attr('r', 10)
        .attr('fill', fill)
        .attr('stroke', 'blue')
        .on('click', d => {
            d3.select('#sel' + cnt).remove();
            d3.select('#horizonSvg' + cnt).remove();
            d3.select('#pie_g' + cnt).remove();
        })
}


// DrawScatter(0);
// DrawAxis();