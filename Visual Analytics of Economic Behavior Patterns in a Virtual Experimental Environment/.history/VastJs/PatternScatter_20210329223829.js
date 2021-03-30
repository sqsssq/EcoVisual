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
let type_of_axis = 1;
// var typeColor = ["rgb(205, 105, 6)", "rgb(0, 255, 255)", "rgb(155, 107, 156)", "orange", "#f7f83b"];
var typeColor = ["rgb(179, 195, 228)", "rgb(221, 194, 236)", "rgb(211, 165, 153)", "rgb(236, 125, 49)", "#f7f83b"]
var wealthTypeColor = ['rgb(226, 102, 98)', 'rgb(224, 112, 110)'];
let rectSelect = 0;
let clusterSelect = 0;
let DBSCAN_color = new Array();

// 可以自动生成颜色
var color_for_DBScan = ["#ff9cff", "#7b3e5f", "#7036bf", "#0095b9", "#00e4b0", "#166149", "#c4a5e8", "#795a0d", "#c93b3d", "#f7dab9", "#df2307", "#899d7a", "#c0d47d", "#c2fbfb", "#ad1ad3", "#776062", "#1d8eef", "#941188", "#ca0099", "#50bc9d", "#3e7f41", "#bb6c72", "#b29764", "#35ab11", "#a11e0d", "#a84000", "#ff6faf", "#505442", "#ff274a", "#478a89", "#ff7885", "#49545e", "#1c5f14", "#8aba02", "#8e3439", "#ffbcdb", "#ca81ff", "#52dce3", "#ff6650", "#b6ffaf", "#fcf38f", "#bfacae", "#71930e", "#42c5ff", "#ed2a85", "#ffc600", "#789aff", "#aaeb38", "#ffce81", "#858c86", "#d3c300", "#515bd0", "#e6a3a9", "#78538d", "#52f05a", "#a0b2a7", "#f55cdf", "#767d52", "#c35eac", "#e29374", "#7c4e43", "#f8f900", "#a2c69b", "#93ffe6", "#ec7e12", "#734920"];
// var color_for_DBScan = ["#f7f83b", "#11e6a9", "#d1002c", "#674573", "#a6629e", "#d87bd9", "#e2c2fe", "#f18f6e", "#6ec17f", "#7f8bff", "#8aaa1b", "#035b66", "#e028e1", "#e5873b", "#b6b9b0", "#76470b", "#2672ba", "#4ed701", "#febfc7", "#388330", "#d3c985", "#a68145", "#b7adb7", "#b80950", "#33d7ef", "#fb2107", "#92377e", "#08b59f", "#fee2f7", "#21f776", "#8131b7", "#345673", "#c1ff95", "#483eba", "#bdfe0e", "#00adeb", "#a0a77d", "#9e58cc", "#bb6300", "#916163", "#a893b4", "#fe4275", "#589eff", "#fedca5", "#fe70b2", "#fea5ea"];
// for (i = 0; i < 80; i++) {
//     var letters = '0123456789ABCDEF'.split('');
//     var rand_color = '#';
//     for (var j = 0; j < 6; j++) {
//         rand_color += letters[Math.round(Math.random() * 15)];
//     }
//     color_for_DBScan[i] = rand_color;
// }

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

function drawWealthLegend(cnt, flag) {
    let pattern_legend = svgLegend.append("g")
        .attr("id", "PatternLegend" + (cnt + 1).toString());
    pattern_legend.append('circle')
        .attr('cx', 100 * cnt + 20)
        .attr('cy', heightL / 6 + heightL * 2 / 6)
    .attr("r", heightL * 2 / 6)
        // .attr('x', 100 * cnt)
        // .attr('y', heightL / 6)
        // .attr('height', heightL * 2 / 3)
        // .attr('width', 40)
        .attr('fill', flag == 1 ? DBSCAN_color[clusterSelect - 1] : typeColor[rectSelect - 1]);
    pattern_legend.append('text')
        .attr('x', 100 * cnt + 20 + heightL * 2 / 6 + 10)
        .attr('y', heightL / 2 + heightL * 2 / 6)
        .attr('font-family', 'STHeiti')
        .attr('dy', '-0.2em')
        .attr('font-size', 20)
        .text('P' + (cnt + 1));
}
// let fileURL = 'data/20210320_1.json';
// let fileURL = 'data/3--20/1-10all.json';
let fileURL = 'data/3--20/1-20all.json';



function DrawScatterLine(code) {
    d3.json(fileURL).then((scatter_data) => {
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
                // console.log(d);
                return scatterLine(d)
            })
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')

    })
}


function DrawScatter(flag, scatter_data) {
    // d3.json(fileURL).then((scatter_data) => {
    d3.csv('data/newdata_for_line.csv').then((rect_data) => {
        type_of_axis = flag;
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
        this.start_max_Scale = d3.scaleLinear()
            .domain([0, 400])
            .range([1, 10]);
        this.start_min_Scale = d3.scaleLinear()
            .domain([0, min_start])
            .range([1, 10]);
        this.profit_max_Scale = d3.scaleLinear()
            .domain([0, 100])
            .range([1, 10]);
        this.profit_min_Scale = d3.scaleLinear()
            .domain([0, -100])
            .range([1, 10]);
        this.computeMax = d3.interpolate('#98FB98', 'green');
        this.computeMin = d3.interpolate('#FFC0CB', 'red');

        // const colorScale = d3.scaleLog()
        // .domain([0, 0 - min_start, max_start - min_start])
        // .range(['green', 'grey', 'red']);


        let patternScatter = scatter_g.selectAll("#scatterPattern")
            .attr("id", "scatterPattern")
            .data(scatter_data)
            .enter()
            .append("circle")
            .attr('id', d => 'people_cir_' + d.id + d.l)
            .attr('class', 'people_circle')
            .attr('cx', d => xScale(parseFloat(d.x)))
            .attr('cy', d => yScale(parseFloat(d.y)))
            .attr('r', 3)
            .attr('fill', (d, i) => {
                if (flag == 0)
                    return color_for_DBScan[d.label];
                if (flag == 1) {
                    if (d.start > 0)
                        return this.computeMax(Math.log10(this.start_max_Scale(d.start > 400 ? 400 : d.start)));
                    if (d.start <= 0)
                        return this.computeMin(Math.log10(this.start_min_Scale(d.start)))
                    // console.log()
                    // if (d.start > 0)
                    // console.log(Math.log10(start_max_Scale(d.start)), start_max_Scale(d.start))
                    // if (d.start > 0) return 'green';
                    // else return 'red';
                }
                if (flag == 2) {
                    if (d.profit > 0) {
                        return this.computeMax(Math.log10(this.profit_max_Scale(d.profit > 200 ? 200 : d.profit)));

                    } else {
                        return this.computeMin(Math.log10(this.profit_min_Scale(d.profit < -100 ? -100 : d.profit)))

                    }
                    // if (d.profit > 0) return 'green';
                    // else return 'red';
                }
                if (flag == 3) {
                    return 'gray';
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
        // })
    })
}

function PatternBrush(scatter_data) {
    // d3.json(fileURL).then((scatter_data) => {
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
        let selectPeople_tmp = new Object();
        for (let i = 0; i < scatter_data.length; ++i) {
            let x = xScale(parseFloat(scatter_data[i].x));
            let y = yScale(parseFloat(scatter_data[i].y));
            if (x >= x0 && x <= x1 && y >= y0 && y <= y1) {
                // selectPattern.push(pattern_data[i]);
                // let arr = (pattern_data[i]['a'].substring(1, pattern_data[0]['a'].length - 1)).split(', ');
                // let s = new Set();
                // arr.forEach(x => s.add(parseInt(x)));
                // selectPatternList.push(s);
                selectPeople_tmp[scatter_data[i].id + scatter_data[i].l] = {
                    color: typeColor[rectSelect],
                    cnt: countType
                };
            }
        }
        // console.log(selectPeople);
        axisCircle.attr('fill-opacity', d => {
                if (selectPeople[d.code + d.lun]) {
                    // console.log(d.code + d.lun);
                    return 1;
                } else if (selectPeople_tmp[d.code + d.lun]) {
                    // console.log(d.code + d.lun);
                    return 1;
                } else return 0.2;
            })
            .attr('fill', d => {
                if (selectPeople[d.code + d.lun]) {
                    // console.log(d.code + d.lun);
                    return selectPeople[d.code + d.lun].color;
                } else if (selectPeople_tmp[d.code + d.lun]) {
                    // console.log(d.code + d.lun);
                    return selectPeople_tmp[d.code + d.lun].color;
                } else return 'gray';
            })
            .attr('r', d => {
                if (selectPeople[d.code + d.lun]) {
                    // console.log(d.code + d.lun);
                    return 3;
                } else if (selectPeople_tmp[d.code + d.lun]) {
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
        let type_g_k = zoom_g.append("g")
            .attr("id", "zoom_type" + (countType - 1).toString());
        type_g_k.append('rect')
            .attr('x', x0)
            .attr('y', y0)
            .attr('width', x1 - x0)
            .attr('height', y1 - y0)
            .attr('fill', typeColor[rectSelect])
            .attr('fill-opacity', 0.2);
        type_g_k.append('text')
            .attr('x', (x0))
            .attr('y', (y0))
            .attr('dx', 0)
            .attr('dy', 0)
            .attr('font-size', 18)
            .attr('font-family', 'STHeiti')
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
                });
                selectPeople[scatter_data[i].id + scatter_data[i].l] = {
                    color: typeColor[rectSelect],
                    cnt: countType
                };
            }
        }
        // console.log(countType - 2)
        // console.log((c_width + 10))
        drawPattern((countType - 2), 10, selectPattern, 0);
        // drawWealthCircle(selectPattern, (countType - 2));

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

    // })
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

function DrawAxis(scatter_data, flag) {
    d3.csv('data/newdata_for_line.csv').then((box_data) => {
        // d3.json(fileURL).then((scatter_data) => {
        // console.log(scatter_data);
        let label_id_round = new Object();
        scatter_data.forEach(item => {
            // console.log(item);
            label_id_round[item.id + item.l] = item.label;
        })
        // console.log(label_id_round);
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
            // console.log(label_id_round[box_data[i]['code'] + box_data[i]['biao']]);
            let temp = {
                y: cy,
                x: cx,
                // y: parseFloat(box_data[i]['39']) - parseFloat(box_data[i]['29']),
                code: box_data[i]['code'],
                lun: box_data[i]['biao'],
                label: label_id_round[box_data[i]['code'] + box_data[i]['biao']]
            };
            scatter_array.push(temp);
            x_max = Math.max(x_max, temp.x);
            x_min = Math.min(x_min, temp.x);
            y_max = Math.max(y_max, temp.y);
            y_min = Math.min(y_min, temp.y);
        }
        if (x_max <= 0) x_max = 0.1 * (-x_min);
        if (x_min >= 0) x_min = -0.1 * (x_max);
        if (y_max <= 0) y_max = 0.1 * (-y_min);
        if (y_min >= 0) y_min = -0.1 * (y_max);
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
        // // .attr("font-family", "STHeiti")
        // // .attr('font-size', 15)
        // // .attr("dx", widthGantt - 30)
        // // .attr('dy', '0.5em')
        // // .attr('fill', 'currentColor')
        // // .text("round");
        // axis_g.append("g")
        //     .attr("transform", "translate(" + xScale(0) + "," + (0) + ")")
        //     .call(d3.axisLeft(yScale).ticks(10))
        // // .append("text")
        // // .attr("font-family", "STHeiti")
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
            .attr("class", 'axis_circle')
            .attr('id', d => 'axis_cir_' + d.code + (d.lun).toString())
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
                // console.log(d);
                if (flag == 0) {
                    return color_for_DBScan[d.label];
                }
                if (selectPeople[d.code + d.lun]) {
                    // console.log(d.code + d.lun);
                    // return typeColor[selectPeople[d.code + d.lun] - 1];
                    return selectPeople[d.code + d.lun].color;
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
                // drawFlowerMove(d.code, d.lun);
                if (selectPeople[d.code + d.lun]) {
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
                    if (selectPeople[d.code + d.lun]) {
                        // console.log(selectPeople[d.code + d.lun].cnt)
                        d3.selectAll('#curve' + (selectPeople[d.code + d.lun].cnt).toString())
                            .attr('stroke-opacity', x => {
                                // console.log()
                                if (x[0].id == d.code && parseInt(x[0].round) == parseInt(d.lun)) return 1;
                                else return 0.1;
                            })
                            .attr('stroke', x => {
                                // console.log()
                                if (x[0].id == d.code && parseInt(x[0].round) == parseInt(d.lun)) return 'steelblue';
                                else return 'gray';
                            })
                    }
                }

                // console.log(d3.select("#people_cir_" + d.code + d.lun)._groups[0][0]);
                // console.log(d3.select("#people_cir_" + d.code + d.lun).attr("fill"));

                // DrawScatterLine(d.code);
            })
            .on('mouseout', d => {
                // d3.select('#lineWWW').remove();
                // d3.selectAll("#pie_gMove").remove();
                axisCircle.attr('r', x => {
                    if (selectPeople[x.code + x.lun]) {
                        // console.log(d.code + d.lun);
                        return 3;
                    } else return 1.5;
                }).attr('fill-opacity', x => {
                    if (Object.keys(selectPeople).length == 0) return 1;

                    if (selectPeople[x.code + x.lun]) {
                        // console.log(d.code + d.lun);
                        return 1;
                    } else return 0.1;
                });

                d3.select("#people_cir_" + d.code + d.lun).attr('r', 1)
                    .attr('stroke', 'none');
                if (selectPeople[d.code + d.lun]) {
                    d3.selectAll('#curve' + selectPeople[d.code + d.lun].cnt.toString())
                        .attr('stroke-opacity', x => {
                            return 0.3;
                        })
                        .attr("stroke", x => {
                            return 'steelblue';
                        })
                }
            })
            .on('click', d => {
                drawFlower(d.code, d.lun);
                drawPersonalHorizon(d.code, select_people_num, d.lun);
                let fill;
                if (selectPeople[d.code + d.lun]) {
                    // console.log(d.code + d.lun);
                    fill = selectPeople[d.code + d.lun].color;
                } else fill = 'gray';
                let peo_cir = d3.select('#people_cir_' + d.code + d.lun);

                selectPeopleCircle(d.nx, d.ny, fill, peo_cir.attr('cx'), peo_cir.attr('cy'), peo_cir.attr('fill'));
            });


        // for (let i in x_scale_array) {
        //     // console.log(x_scale_array[i].domain())
        //     axis_g.append('line')
        //         .attr('x1', x_scale_array[i].range()[0])
        //         .attr('x2', x_scale_array[i].range()[0])
        //         .attr('y1', 25)
        //         .attr('y2', yAxisWidth - 10)
        //         .attr('fill', 'none')
        //         .attr('stroke', 'gray').attr('stroke-opacity', 1);;
        //     axis_g.append('line')
        //         .attr('x1', x_scale_array[i].range()[1])
        //         .attr('x2', x_scale_array[i].range()[1])
        //         .attr('y1', 25)
        //         .attr('y2', yAxisWidth - 10)
        //         .attr('fill', 'none')
        //         .attr('stroke', 'gray').attr('stroke-opacity', 1);;
        //     axis_g.append('line')
        //         .attr('y1', y_scale_array[i].range()[0])
        //         .attr('y2', y_scale_array[i].range()[0])
        //         .attr('x1', 20)
        //         .attr('x2', xAxisWidth - 30)
        //         .attr('fill', 'none')
        //         .attr('stroke', 'gray').attr('stroke-opacity', 1);;
        //     axis_g.append('line')
        //         .attr('y1', y_scale_array[i].range()[1])
        //         .attr('y2', y_scale_array[i].range()[1])
        //         .attr('x1', 20)
        //         .attr('x2', xAxisWidth - 30)
        //         .attr('fill', 'none')
        //         .attr('stroke', 'gray').attr('stroke-opacity', 1);;
        // }



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
                    // .attr('font-family', 'STHeiti')
                    .attr('font-size', '12px')
                    .attr('text-anchor', 'end');
                axis_g.append('text')
                    .text(numY2)
                    .attr('x', x_scale_array[x_axis_type](0))
                    .attr('y', y_scale_array[i].range()[1])
                    .attr('dx', '-0.8em')
                    .attr('dy', '0.5em')
                    // .attr('font-family', 'STHeiti')
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
                // .attr('font-family', 'STHeiti')
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
            .text('y:' + nameList[ty - 1])
            .attr('x', x_scale_array[x_axis_type](0))
            .attr('y', 15)
            .attr('font-family', 'STHeiti')
            .attr('text-anchor', 'middle');
        axis_g.append('text')
            .text('x:' + nameList[tx - 1])
            .attr('x', xAxisWidth - 15)
            .attr('y', y_scale_array[y_axis_type](0))
            .attr('transform', `rotate(90, ${xAxisWidth - 15}, ${y_scale_array[y_axis_type](0)})`)
            .attr('font-family', 'STHeiti')
            .attr('text-anchor', 'middle');
        // })
    })
}

// function DrawAxis(scatter_data, flag) {
//     d3.csv('data/newdata_for_line.csv').then((box_data) => {
//         // d3.json(fileURL).then((scatter_data) => {
//         // console.log(scatter_data);
//         let label_id_round = new Object();
//         scatter_data.forEach(item => {
//             // console.log(item);
//             label_id_round[item.id + item.l] = item.label;
//         })
//         console.log(label_id_round);
//         let tx = document.getElementById('se1').value;
//         let ty = document.getElementById('se2').value;
//         let tk = document.getElementById('se3').value;
//         // let nameList = ['Initial', 'Work', 'Health', 'Insurance', 'Loan', 'Investment', 'Risk', 'Disaster', 'Lottery', 'Ill', 'Unemployed', 'Net yield', 'Total'];
//         // console.log(document.getElementById('se1').name)
//         let nameList = ['Initial', 'Work', 'Health Investment', 'Repayment', 'Loan', 'Investment', 'Venture', 'Insurance', 'Lottery', 'Disaster', 'Illness', 'Risk Preference', 'Patience', 'Net Yield', 'Total'];
//         // console.log(tx, ty);
//         if (axis_g != 0) {
//             axis_g.remove();
//             axis_g = 0;
//         }
//         axis_g = svgAxis.append('g')
//         // .attr('transform', "translate(" + 0 + "," + (heightScatter / 2 + 5) + ")");
//         // axis_g.append('rect')
//         //     .attr('x', 0)
//         //     .attr('y', 0)
//         //     .attr('width', widthScatter)
//         //     .attr('height', heightScatter / 2)
//         //     .attr('fill', 'white');
//         let x_max = -10000;
//         let x_min = 10000;
//         let y_min = 10000;
//         let y_max = -10000;
//         let scatter_array = new Array();
//         for (let i = 0; i < box_data.length; ++i) {
//             let cx;
//             if (parseInt(tx) == 14) {
//                 cx = parseFloat(box_data[i]['profit']);
//             } else if (parseInt(tx) > 1 && parseInt(tx) <= 13) {
//                 cx = parseFloat(box_data[i][lineLegend[parseInt(tx) - 2] + '_profit']);
//             } else if (parseInt(tx) == 1) {
//                 cx = parseFloat(box_data[i]['start']);
//             } else if (parseInt(tx) == 15) {
//                 cx = parseFloat(box_data[i]['end']);
//             }

//             let cy;
//             if (parseInt(ty) == 14) {
//                 cy = parseFloat(box_data[i]['profit']);
//             } else if (parseInt(ty) > 1 && parseInt(ty) <= 13) {
//                 cy = parseFloat(box_data[i][lineLegend[parseInt(ty) - 2] + '_profit']);
//             } else if (parseInt(ty) == 1) {
//                 cy = parseFloat(box_data[i]['start']);
//             } else if (parseInt(ty) == 15) {
//                 cy = parseFloat(box_data[i]['end']);
//             }

//             // let cy;
//             // if (parseInt(ty) == 12) {
//             //     cy = parseFloat(box_data[i]['129']) - parseFloat(box_data[i]['19']);
//             // } else if (parseInt(ty) > 1 && parseInt(ty) <= 11) {
//             //     cy = parseFloat(box_data[i][9 + 10 * (parseInt(ty) + 1)]) - parseFloat(box_data[i][9 + 10 * (parseInt(ty))]);
//             // } else if (parseInt(ty) == 1) {
//             //     cy = parseFloat(box_data[i]['19']);
//             // } else if (parseInt(ty) == 13) {
//             //     cy = parseFloat(box_data[i]['139']);
//             // }
//             // console.log(label_id_round[box_data[i]['code'] + box_data[i]['biao']]);
//             let temp = {
//                 y: cy,
//                 x: cx,
//                 // y: parseFloat(box_data[i]['39']) - parseFloat(box_data[i]['29']),
//                 code: box_data[i]['code'],
//                 lun: box_data[i]['biao'],
//                 label: label_id_round[box_data[i]['code'] + box_data[i]['biao']]
//             };
//             scatter_array.push(temp);
//             x_max = Math.max(x_max, temp.x);
//             x_min = Math.min(x_min, temp.x);
//             y_max = Math.max(y_max, temp.y);
//             y_min = Math.min(y_min, temp.y);
//         }
//         if (x_max <= 0) x_max = 0.1 * (-x_min);
//         if (x_min >= 0) x_min = -(0.1 * x_max);
//         if (y_max <= 0) y_max = 0.1 * (-y_min);
//         if (y_min >= 0) y_min = -(0.1 * y_max);
//         var xAxisWidth = widthS;
//         var yAxisWidth = heightS;
//         // console.log(x_max, x_min, y_max, y_min);


//         //#region
//         let stepNum = tk;
//         // let x_sum = Math.abs(x_min) + Math.abs(x_max);
//         let x_sum = x_max - x_min;
//         let x_step = x_sum / stepNum;
//         // console.log(x_step)
//         let x_array = new Array();
//         for (let i = 0; i < stepNum; ++i) {
//             x_array.push(0);
//         }
//         for (let i in scatter_array) {
//             let x_type = parseInt((scatter_array[i].x - x_min) / x_step);
//             if (x_type == stepNum) x_type--;
//             // console.log(x_type);
//             scatter_array[i].x_type = x_type;
//             x_array[x_type]++;
//         }
//         // console.log(x_array);
//         let x_width = xAxisWidth - 10 - 40;
//         let x_start = 20;
//         let x_scale_array = new Array();
//         for (let i = 0; i < stepNum; ++i) {
//             let tmp_width = x_width * x_array[i] / 6080;
//             let tmp_scale = d3.scaleLinear()
//                 .domain([x_min + i * x_step, x_min + (i + 1) * x_step])
//                 .range([x_start, x_start + tmp_width]);
//             x_start += tmp_width;
//             x_scale_array.push(tmp_scale);
//         }
//         let y_sum = y_max - y_min;
//         let y_step = y_sum / stepNum;
//         let y_array = new Array();
//         for (let i = 0; i < stepNum; ++i) {
//             y_array.push(0);
//         }
//         for (let i in scatter_array) {
//             let y_type = parseInt((scatter_array[i].y - y_min) / y_step);
//             if (y_type == stepNum) y_type--;
//             // console.log(y_type);
//             scatter_array[i].y_type = y_type;
//             y_array[y_type]++;
//         }
//         // console.log(y_array);
//         let y_width = yAxisWidth - 35;
//         let y_start = yAxisWidth - 10;
//         let y_scale_array = new Array();
//         for (let i = 0; i < stepNum; ++i) {
//             let tmp_width = y_width * y_array[i] / 6080;
//             // console.log(tmp_width);
//             let tmp_scale = d3.scaleLinear()
//                 .domain([y_min + i * y_step, y_min + (i + 1) * y_step])
//                 .range([y_start, y_start - tmp_width]);
//             y_start -= tmp_width;
//             y_scale_array.push(tmp_scale);
//         }
//         for (let i in scatter_array) {
//             scatter_array[i].nx = x_scale_array[scatter_array[i].x_type](scatter_array[i].x);
//             scatter_array[i].ny = y_scale_array[scatter_array[i].y_type](scatter_array[i].y);
//         }
//         let x_axis_type = (0 - x_min) > 0 ? ((0 - x_min) / x_step == 8 ? 7 : parseInt((0 - x_min) / x_step)) : -1;
//         let y_axis_type = (0 - y_min) > 0 ? ((0 - y_min) / y_step == 8 ? 7 : parseInt((0 - y_min) / y_step)) : -1;
//         // console.log(x_min, y_min);
//         // console.log(x_axis_type, y_axis_type);
//         if (x_max == 0) x_axis_type--;
//         if (y_max == 0) y_axis_type--;
//         // console.log(x_scale_array);
//         // console.log(scatter_array);
//         // // console.log(x_axis_type)
//         // for (let i in x_scale_array) {

//         //     axis_g.append("g")
//         //         .attr("transform", "translate(" + 0 + "," + (0 + y_scale_array[y_axis_type](0)) + ")")
//         //         .call(d3.axisBottom(x_scale_array[i]).ticks(2))
//         //     axis_g.append("g")
//         //         .attr("transform", "translate(" + x_scale_array[x_axis_type](0) + "," + (0) + ")")
//         //         .call(d3.axisLeft(y_scale_array[i]).ticks(10))
//         // }
//         //#endregion

//         var xScale = d3.scaleLinear()
//             .domain([x_min, x_max])
//             .range([1, 100])
//         var x_log_scale = d3.scaleLinear()
//             .domain([0, 2])
//             .range([10, xAxisWidth - 10]);
//         // console.log(xScale.domain());
//         var yScale = d3.scaleLinear()
//             .domain([y_min, y_max])
//             .range([1, 100]);
//         var y_log_scale = d3.scaleLinear()
//             .domain([2, 0])
//             .range([10, yAxisWidth - 40]);
//         console.log(Math.log10(1));

//         axis_g.append("g")
//             .attr("transform", "translate(" + 0 + "," + (y_log_scale(Math.log10(0 + yScale(0)))) + ")")
//             .call(d3.axisBottom(x_log_scale).ticks(10))
//         // // .append("text")
//         // // .attr("font-family", "STHeiti")
//         // // .attr('font-size', 15)
//         // // .attr("dx", widthGantt - 30)
//         // // .attr('dy', '0.5em')
//         // // .attr('fill', 'currentColor')
//         // // .text("round");
//         axis_g.append("g")
//             .attr("transform", "translate(" + (x_log_scale(Math.log10((xScale(0))))) + "," + (0) + ")")
//             .call(d3.axisLeft(y_log_scale).ticks(10))
//         // // .append("text")
//         // // .attr("font-family", "STHeiti")
//         // // .attr('font-size', 15)
//         // // .attr("dx", "7em")
//         // // .attr('dy', 12)
//         // // .attr('fill', 'currentColor')
//         // // .text("number of people");

//         axisCircle = axis_g.selectAll('#axisCircle')
//             .attr('id', 'axisCircle')
//             .data(scatter_array)
//             .enter()
//             .append('circle')
//             // .attr('cx', d => xScale(d.x))
//             .attr('id', d => 'axis_cir_' + d.code)
//             .attr('cx', d => {
//                 d.nx = x_log_scale(Math.log10(xScale(d.x)));
//                 // console.log(d.nx);
//                 return d.nx;
//             })
//             // .attr('cy', d => yScale(d.y))
//             .attr('cy', d => {
//                 d.ny = y_log_scale(Math.log10(yScale(d.y)))
//                 return d.ny;
//             })
//             // .attr('r', 2)
//             .attr('r', d => {
//                 if (selectPeople[d.code + d.lun]) {
//                     // console.log(d.code + d.lun);
//                     return 3;
//                 } else return 1;
//             })
//             // .attr('fill', 'gray')
//             .attr('fill', d => {
//                 // console.log(d);
//                 if (flag == 0) {
//                     return color_for_DBScan[d.label];
//                 }
//                 if (selectPeople[d.code + d.lun]) {
//                     // console.log(d.code + d.lun);
//                     // return typeColor[selectPeople[d.code + d.lun] - 1];
//                     return selectPeople[d.code + d.lun].color;
//                 } else return 'gray';
//             })
//             .attr('stroke', 'none')
//             // .attr('fill-opacity', 1)
//             .attr('fill-opacity', d => {
//                 if (Object.keys(selectPeople).length == 0) return 1;

//                 if (selectPeople[d.code + d.lun]) {
//                     // console.log(d.code + d.lun);
//                     return 1;
//                 } else return 0.1;
//             })
//             .on('mouseover', d => {
//                 axisCircle.attr('r', x => {
//                     if (x == d) return 10;
//                     else {

//                         if (selectPeople[x.code + x.lun]) {
//                             // console.log(d.code + d.lun);
//                             return 3;
//                         } else return 1;
//                     };
//                 })
//                 d3.select("#people_cir_" + d.code + d.lun).attr('r', 10)
//                     .attr('stroke', 'blue');
//                 if (selectPeople[d.code + d.lun]) {
//                     // console.log(selectPeople[d.code + d.lun].cnt)
//                     d3.selectAll('#curve' + (selectPeople[d.code + d.lun].cnt).toString())
//                         .attr('stroke-opacity', x => {
//                             // console.log()
//                             if (x[0].id == d.code && parseInt(x[0].round) == parseInt(d.lun)) return 1;
//                             else return 0;
//                         })
//                         .attr('stroke-width', x => {
//                             // console.log()
//                             if (x[0].id == d.code && parseInt(x[0].round) == parseInt(d.lun)) return 3;
//                             else return 0;
//                         })
//                 }

//                 // console.log(d3.select("#people_cir_" + d.code + d.lun)._groups[0][0]);
//                 // console.log(d3.select("#people_cir_" + d.code + d.lun).attr("fill"));

//                 // DrawScatterLine(d.code);
//             })
//             .on('mouseout', d => {
//                 // d3.select('#lineWWW').remove();
//                 axisCircle.attr('r', x => {
//                     if (selectPeople[x.code + x.lun]) {
//                         // console.log(d.code + d.lun);
//                         return 3;
//                     } else return 1;
//                 }).attr('fill-opacity', x => {
//                     if (Object.keys(selectPeople).length == 0) return 1;

//                     if (selectPeople[x.code + x.lun]) {
//                         // console.log(d.code + d.lun);
//                         return 1;
//                     } else return 0.1;
//                 });

//                 d3.select("#people_cir_" + d.code + d.lun).attr('r', 1)
//                     .attr('stroke', 'none');
//                 if (selectPeople[d.code + d.lun]) {
//                     d3.selectAll('#curve' + selectPeople[d.code + d.lun].cnt.toString())
//                         .attr('stroke-opacity', x => {
//                             return 0.3;
//                         })
//                         .attr("stroke-width", x => {
//                             return 1;
//                         })
//                 }
//             })
//             .on('click', d => {
//                 drawFlower(d.code, d.lun);
//                 drawPersonalHorizon(d.code, select_people_num);
//                 let fill;
//                 if (selectPeople[d.code + d.lun]) {
//                     // console.log(d.code + d.lun);
//                     fill = selectPeople[d.code + d.lun].color;
//                 } else fill = 'gray';
//                 let peo_cir = d3.select('#people_cir_' + d.code + d.lun);

//                 selectPeopleCircle(d.nx, d.ny, fill, peo_cir.attr('cx'), peo_cir.attr('cy'), peo_cir.attr('fill'));
//             });

//         // for (let i in x_scale_array) {
//         //     const flagX = Math.abs((x_scale_array[i].range()[1]) - (x_scale_array[i].range()[0])) / x_width > 0.1 ? 1 : 0;
//         //     const flagY = Math.abs((y_scale_array[i].range()[1]) - (y_scale_array[i].range()[0])) / y_width > 0.1 ? 1 : 0;
//         //     // console.log(flagX, flagY);
//         //     if (flagX == 1 && tk != 1) {
//         //         let numX1 = (parseInt(parseInt(x_scale_array[i].domain()[0]) / 1000) > 1 ? parseInt(parseInt(x_scale_array[i].domain()[0]) / 1000).toString() + ',' : '') + parseInt(parseInt(x_scale_array[i].domain()[0]) % 1000).toString();
//         //         let numX2 = (parseInt(parseInt(x_scale_array[i].domain()[1]) / 1000) > 1 ? parseInt(parseInt(x_scale_array[i].domain()[1]) / 1000).toString() + ',' : '') + parseInt(parseInt(x_scale_array[i].domain()[1]) % 1000).toString();

//         //         axis_g.append('text')
//         //             .text(numX1)
//         //             .attr('x', x_scale_array[i].range()[0])
//         //             .attr('y', y_scale_array[y_axis_type](0))
//         //             .attr('dy', '1.47em')
//         //             // .attr('dx', '-1em')
//         //             .attr('font-size', '12px')
//         //             .attr('font-family', 'sans-serif')
//         //             .attr('text-anchor', 'middle');
//         //         axis_g.append('text')
//         //             .text(numX2)
//         //             .attr('x', x_scale_array[i].range()[1])
//         //             .attr('y', y_scale_array[y_axis_type](0))
//         //             .attr('dy', '1.47em')
//         //             .attr('font-size', '12px')
//         //             .attr('font-family', 'sans-serif')
//         //             .attr('text-anchor', 'middle');

//         //     }
//         //     if (flagY == 1 && tk != 1) {
//         //         // console.log(parseInt(y_scale_array[i].domain()[1]))
//         //         // console.log(parseInt(parseInt(y_scale_array[i].domain()[0]) / 1000));
//         //         let numY1 = (parseInt(parseInt(y_scale_array[i].domain()[0]) / 1000) > 1 ? parseInt(parseInt(y_scale_array[i].domain()[0]) / 1000).toString() + ',' : '') + parseInt(parseInt(y_scale_array[i].domain()[0]) % 1000).toString();
//         //         let numY2 = (parseInt(parseInt(y_scale_array[i].domain()[1]) / 1000) > 1 ? parseInt(parseInt(y_scale_array[i].domain()[1]) / 1000).toString() + ',' : '') + parseInt(parseInt(y_scale_array[i].domain()[1]) % 1000).toString();
//         //         // console.log(numY1, numY2);
//         //         axis_g.append('text')
//         //             .text(numY1)
//         //             .attr('x', x_scale_array[x_axis_type](0))
//         //             .attr('y', y_scale_array[i].range()[0])
//         //             .attr('dx', '-0.8em')
//         //             .attr('dy', '0.5em')
//         //             // .attr('font-family', 'STHeiti')
//         //             .attr('font-size', '12px')
//         //             .attr('text-anchor', 'end');
//         //         axis_g.append('text')
//         //             .text(numY2)
//         //             .attr('x', x_scale_array[x_axis_type](0))
//         //             .attr('y', y_scale_array[i].range()[1])
//         //             .attr('dx', '-0.8em')
//         //             .attr('dy', '0.5em')
//         //             // .attr('font-family', 'STHeiti')
//         //             .attr('font-size', '12px')
//         //             .attr('font-family', 'sans-serif')
//         //             .attr('text-anchor', 'end');

//         //     }
//         //     if (tk != 1)
//         //         axis_g.append('text')
//         //         .text(0)
//         //         .attr('x', x_scale_array[x_axis_type](0))
//         //         .attr('y', y_scale_array[y_axis_type](0))
//         //         .attr('dx', '1em')
//         //         .attr('dy', '1em')
//         //         // .attr('font-family', 'STHeiti')
//         //         .attr('font-family', 'sans-serif')
//         //         .attr('font-size', '12px')
//         //         .attr('text-anchor', 'end');
//         //     axis_g.append("g")
//         //         .attr("transform", "translate(" + 0 + "," + (0 + y_scale_array[y_axis_type](0)) + ")")
//         //         .attr('class', 'axis')
//         //         .call(d3.axisBottom(x_scale_array[i]).ticks(tk == 1 ? 7 : 0))
//         //     axis_g.append("g")
//         //         .attr("transform", "translate(" + x_scale_array[x_axis_type](0) + "," + (0) + ")")
//         //         .attr('class', 'axis')
//         //         .call(d3.axisLeft(y_scale_array[i]).ticks(tk == 1 ? 7 : 0))
//         // }
//         // // console.log((nameList[se1]))
//         // axis_g.append('text')
//         //     .text('y:' + nameList[ty - 1])
//         //     .attr('x', x_scale_array[x_axis_type](0))
//         //     .attr('y', 15)
//         //     .attr('font-family', 'STHeiti')
//         //     .attr('text-anchor', 'middle');
//         // axis_g.append('text')
//         //     .text('x:' + nameList[tx - 1])
//         //     .attr('x', xAxisWidth - 15)
//         //     .attr('y', y_scale_array[y_axis_type](0))
//         //     .attr('transform', `rotate(90, ${xAxisWidth - 15}, ${y_scale_array[y_axis_type](0)})`)
//         //     .attr('font-family', 'STHeiti')
//         //     .attr('text-anchor', 'middle');
//         // })
//     })
// }

function selectPeopleCircle(x, y, fill, dx, dy, fill_d) {
    select_people_num++;
    let cnt = select_people_num;
    zoom_g.append('circle')
        .attr('id', 'weal' + cnt)
        .attr('fill', fill_d)
        .attr('r', 10)
        .attr('stroke', 'blue')
        .attr('cx', dx)
        .attr('cy', dy)

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
            d3.select('#weal' + cnt).remove();
        })
}

function DrawAxisPattern(scatter_data) {
    d3.csv('data/newdata_for_line.csv').then((box_data) => {
        // d3.json(fileURL).then((scatter_data) => {
        // console.log(scatter_data);
        let label_id_round = new Object();
        scatter_data.forEach(item => {
            // console.log(item);
            label_id_round[item.id + item.l] = item.label;
        })
        // console.log(label_id_round);
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
        let num_max = -10000;
        let num_min = 10000;
        let label_max = 0;
        let scatter_array_r = new Array();
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
            scatter_array_r.push(temp);
            // x_max = Math.max(x_max, temp.x);
            // x_min = Math.min(x_min, temp.x);
            // y_max = Math.max(y_max, temp.y);
            // y_min = Math.min(y_min, temp.y);
        }
        let pattern_cluster = new Object();
        for (let i in scatter_array_r) {
            let label_i = label_id_round[scatter_array_r[i].code + scatter_array_r[i].lun];
            if (typeof (pattern_cluster[label_i]) == "undefined") {
                pattern_cluster[label_i] = {
                    x: 0,
                    y: 0,
                    num: 0,
                    people_list: new Array()
                };
            }
            pattern_cluster[label_i].num++;
            pattern_cluster[label_i].x += scatter_array_r[i].x;
            pattern_cluster[label_i].y += scatter_array_r[i].y;
            pattern_cluster[label_i].people_list.push({
                id: scatter_array_r[i].code,
                lun: scatter_array_r[i].lun
            });
        }
        let scatter_array = new Array();
        for (let i in pattern_cluster) {
            let temp = {
                x: parseFloat((pattern_cluster[i].x / pattern_cluster[i].num).toFixed(2)),
                y: parseFloat((pattern_cluster[i].y / pattern_cluster[i].num).toFixed(2)),
                num: pattern_cluster[i].num,
                label: parseInt(i),
                people_list: pattern_cluster[i].people_list
            };
            label_max++;
            scatter_array.push(temp);
            x_max = Math.max(x_max, temp.x);
            y_max = Math.max(y_max, temp.y);
            x_min = Math.min(x_min, temp.x);
            y_min = Math.min(y_min, temp.y);
            num_max = Math.max(num_max, temp.num);
            num_min = Math.min(num_min, temp.num);
        }
        x_max = x_max * 1.1;
        x_min = x_min * 1.1;
        y_max = y_max * 1.1;
        y_min = y_min * 1.1;
        if (x_max <= 0) x_max = 1;
        if (x_min >= 0) x_min = -1;
        if (y_max <= 0) y_max = 1;
        if (y_min >= 0) y_min = -1;
        var xAxisWidth = widthS;
        var yAxisWidth = heightS;
        // console.log(x_max, x_min, y_max, y_min, label_max);
        let num_scale = d3.scaleLinear()
            .domain([num_min, num_max])
            .range([5, 25]);

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
            let tmp_width = x_width * x_array[i] / label_max;
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
            let tmp_width = y_width * y_array[i] / label_max;
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
        // // .attr("font-family", "STHeiti")
        // // .attr('font-size', 15)
        // // .attr("dx", widthGantt - 30)
        // // .attr('dy', '0.5em')
        // // .attr('fill', 'currentColor')
        // // .text("round");
        // axis_g.append("g")
        //     .attr("transform", "translate(" + xScale(0) + "," + (0) + ")")
        //     .call(d3.axisLeft(yScale).ticks(10))
        // // .append("text")
        // // .attr("font-family", "STHeiti")
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
                // if (selectPeople[d.code + d.lun]) {
                //     // console.log(d.code + d.lun);
                //     return 3;
                // } else return 1;
                return num_scale(d.num);
            })
            // .attr('fill', 'gray')
            .attr('fill', (d) => {
                // if (selectPeople[d.code + d.lun]) {
                //     // console.log(d.code + d.lun);
                //     return typeColor[selectPeople[d.code + d.lun] - 1];
                // } else return 'gray';
                return color_for_DBScan[d.label];
            })
            .attr('stroke', 'none')
            // .attr('fill-opacity', 1)
            .attr('fill-opacity', d => {
                // if (Object.keys(selectPeople).length == 0) return 1;

                // if (selectPeople[d.code + d.lun]) {
                //     // console.log(d.code + d.lun);
                //     return 1;
                // } else return 0.1;
                return 0.5
            })
            .on('mouseover', d => {
                axisCircle.attr('fill-opacity', x => {
                    if (x == d) return 1;
                    else {
                        return 0.2;
                    };
                })
                d3.selectAll(".people_circle")
                    .attr("fill-opacity", x => {
                        if (x.label == d.label) {
                            return 1;
                        } else {
                            return 0.01;
                        }
                    })
                // d3.select("#people_cir_" + d.code + d.lun).attr('r', 10)
                //     .attr('stroke', 'blue');
                // if (selectPeople[d.code + d.lun]) {
                //     d3.selectAll('#curve' + selectPeople[d.code + d.lun].toString())
                //         .attr('stroke-opacity', x => {
                //             // console.log()
                //             if (x[0].id == d.code && parseInt(x[0].round) == parseInt(d.lun)) return 1;
                //             else return 0;
                //         })
                //         .attr('stroke-width', x => {
                //             // console.log()
                //             if (x[0].id == d.code && parseInt(x[0].round) == parseInt(d.lun)) return 3;
                //             else return 0;
                //         })
                // }

                // // console.log(d3.select("#people_cir_" + d.code + d.lun)._groups[0][0]);
                // // console.log(d3.select("#people_cir_" + d.code + d.lun).attr("fill"));

                // // DrawScatterLine(d.code);
            })
            .on('mouseout', d => {
                // d3.select('#lineWWW').remove();
                axisCircle
                    // .attr('r', x => {
                    //     if (selectPeople[x.code + x.lun]) {
                    //         // console.log(d.code + d.lun);
                    //         return 3;
                    //     } else return 1;
                    // })
                    .attr('fill-opacity', x => {
                        // if (Object.keys(selectPeople).length == 0) return 1;

                        // if (selectPeople[x.code + x.lun]) {
                        //     // console.log(d.code + d.lun);
                        //     return 1;
                        // } else return 0.1;
                        return 0.5;
                    });
                d3.selectAll(".people_circle")
                    .attr("fill-opacity", 1);

                // d3.select("#people_cir_" + d.code + d.lun).attr('r', 1)
                //     .attr('stroke', 'none');
                // if (selectPeople[d.code + d.lun]) {
                //     d3.selectAll('#curve' + selectPeople[d.code + d.lun].toString())
                //         .attr('stroke-opacity', x => {
                //             return 0.3;
                //         })
                //         .attr("stroke-width", x => {
                //             return 1;
                //         })
                // }
            })
            .on('click', d => {
                // drawFlower(d.code, d.lun);
                // drawPersonalHorizon(d.code, select_people_num);
                // let fill;
                // if (selectPeople[d.code + d.lun]) {
                //     // console.log(d.code + d.lun);
                //     fill = typeColor[selectPeople[d.code + d.lun] - 1];
                // } else fill = 'gray';
                // let peo_cir = d3.select('#people_cir_' + d.code + d.lun);

                // selectPeopleCircle(d.nx, d.ny, fill, peo_cir.attr('cx'), peo_cir.attr('cy'), peo_cir.attr('fill'));
                DBSCAN_color.push(color_for_DBScan[d.label]);
                for (let num in d.people_list) {
                    // console.log(people);
                    let people = d.people_list[num];
                    selectPeople[people.id + people.lun] = {
                        color: DBSCAN_color[clusterSelect],
                        cnt: countType
                    };
                }
                // typeColor.unshift(color_for_DBScan[d.label]);
                drawPattern((++countType - 2), 10, d.people_list, 1);
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
                    // .attr('font-family', 'STHeiti')
                    .attr('font-size', '12px')
                    .attr('text-anchor', 'end');
                axis_g.append('text')
                    .text(numY2)
                    .attr('x', x_scale_array[x_axis_type](0))
                    .attr('y', y_scale_array[i].range()[1])
                    .attr('dx', '-0.8em')
                    .attr('dy', '0.5em')
                    // .attr('font-family', 'STHeiti')
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
                // .attr('font-family', 'STHeiti')
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
            .text("y:" + nameList[ty - 1])
            .attr('x', x_scale_array[x_axis_type](0))
            .attr('y', 15)
            .attr('font-family', 'STHeiti')
            .attr('text-anchor', 'middle');
        axis_g.append('text')
            .text("x:" + nameList[tx - 1])
            .attr('x', xAxisWidth - 15)
            .attr('y', y_scale_array[y_axis_type](0))
            .attr('transform', `rotate(90, ${xAxisWidth - 15}, ${y_scale_array[y_axis_type](0)})`)
            .attr('font-family', 'STHeiti')
            .attr('text-anchor', 'middle');
        // })
    })
}


// DrawScatter(0);
// DrawAxis();