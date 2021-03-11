var widthGantt = document.getElementById("ganttView").offsetWidth,
    heightGantt = document.getElementById("ganttView").offsetHeight;

var svgGantt;

svgGantt = d3.select("#ganttView").append("svg")
    .attr("width", widthGantt)
    .attr("height", heightGantt);

let pattern_g = 0;

function DrawPattern(pattern_select) {
    console.log(pattern_select);
    if (pattern_g != 0) {
        pattern_g.remove();
        pattern_g = 0;
    }
    pattern_g = svgGantt.append('g');
    // let step = heightGantt / (pattern_select.length + 1);
    let step = heightGantt / 6;
    let yScale = d3.scaleLinear()
        .domain([0, 304])
        .range([step * 8 / 20, -step * 8 / 20]);
    let xScale = d3.scaleLinear()
        .domain([1, 20])
        .range([30, widthGantt - 60]);
    let YScale = d3.scaleLinear()
        .domain([0, pattern_select.length + 1])
        .range([0, heightGantt]);
    let people_max = 0,
        people_min = 9999;
    for (let i in pattern_select) {
        people_max = Math.max(people_max, pattern_select[i].people.length);
        people_min = Math.min(people_min, pattern_select[i].people.length);
    }
    let rScale = d3.scaleLinear()
        .domain([people_min, people_max])
        .range([(people_min == people_max ? 30 : 10), 30]);


    pattern_g.append("g")
        .attr("transform", "translate(" + 0 + "," + (300 + yScale(0)) + ")")
        .call(d3.axisBottom(xScale).ticks(20))
        .append("text")
        .attr("font-family", "Georgia")
        .attr('font-size', 15)
        .attr("dx", widthGantt - 30)
        .attr('dy', '0.5em')
        .attr('fill', 'currentColor')
        .text("round");
    pattern_g.append("g")
        .call(d3.axisLeft(yScale).ticks(2))
        .attr("transform", "translate(" + xScale(1) + "," + (300) + ")")
        .append("text")
        .attr("font-family", "Georgia")
        .attr('font-size', 15)
        .attr("dx", "-0.5em")
        .attr('dy', -step - 10)
        .attr('fill', 'currentColor')
        .text("number of people");

    for (let i in pattern_select) {
        // console.log(yScale(0));
        let line_data = new Array();
        for (let j in pattern_select[i].scale) {
            line_data.push({
                x: j,
                y: pattern_select[i].scale[j]
            });
        }
        // pattern_g.append('circle')
        //     .attr('cx', 40)
        //     .attr('cy', YScale(parseInt(i) + 1))
        //     .attr('r', rScale(pattern_select[i].people.length))
        //     .attr('fill', 'gray');
        // pattern_g.append('text')
        //     .attr('x', 40)
        //     .attr('y', YScale(parseInt(i) + 1))
        //     .attr('dy', 5)
        //     .attr('fill', 'white')
        //     .attr('text-anchor', 'middle')
        //     .text(parseInt(i) + 1);

        var area_generator = d3.line()
            .x(function (d) {
                return xScale(d.x);
            })
            // .y0(YScale(parseInt(i) + 1) + yScale(0))
            .y(function (d) {
                return yScale(d.y) + YScale(parseInt(i) + 1);
            })
        // .curve(d3.curveMonotoneX)
        pattern_g.append("path")
            .attr("d", area_generator(line_data)) //d="M1,0L20,40.....  d-path data
            .attr("fill", "none")
            .attr("stroke", 'black')
        // .attr('fill-opacity', 0.3);
    }
}