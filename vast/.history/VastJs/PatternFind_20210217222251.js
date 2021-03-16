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
        .range([step + step / 6, 0 + step / 6]);

    let yScale2 = d3.scaleLinear()
        .domain([0, 304])
        .range([2 * step + 2 * step / 6, 1 * step + 2 * step / 6]);

    let yScale3 = d3.scaleLinear()
        .domain([0, 304])
        .range([3 * step + 3 * step / 6, 2 * step + 3 * step / 6]);

    let yScale4 = d3.scaleLinear()
        .domain([0, 304])
        .range([4 * step + 4 * step / 6, 3 * step + 4 * step / 6]);

    let yScale5 = d3.scaleLinear()
        .domain([0, 304])
        .range([5 * step + 5 * step / 6, 4 * step + 5 * step / 6]);
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


    pattern_g.append("g")
        .attr("transform", "translate(" + 0 + "," + (0 + yScale(0)) + ")")
        .call(d3.axisBottom(xScale).ticks(20))
        .append("text")
        .attr("font-family", "Georgia")
        .attr('font-size', 15)
        .attr("dx", widthGantt - 30)
        .attr('dy', '0.5em')
        .attr('fill', 'currentColor')
        .text("round");
    pattern_g.append("g")
        .attr("transform", "translate(" + xScale(1) + "," + (0) + ")")
        .call(d3.axisLeft(yScale).ticks(2))
        .append("text")
        .attr("font-family", "Georgia")
        .attr('font-size', 15)
        .attr("dx", "7em")
        .attr('dy', 12)
        .attr('fill', 'currentColor')
        .text("number of people");

    pattern_g.append("g")
        .attr("transform", "translate(" + 0 + "," + (0 + yScale2(0)) + ")")
        .call(d3.axisBottom(xScale).ticks(20))
        .append("text")
        .attr("font-family", "Georgia")
        .attr('font-size', 15)
        .attr("dx", widthGantt - 30)
        .attr('dy', '0.5em')
        .attr('fill', 'currentColor')
        .text("round");
    pattern_g.append("g")
        .attr("transform", "translate(" + xScale(1) + "," + (0) + ")")
        .call(d3.axisLeft(yScale2).ticks(2))
        .append("text")
        .attr("font-family", "Georgia")
        .attr('font-size', 15)
        .attr("dx", "1em")
        .attr('dy', '14em')
        .attr('fill', 'currentColor')
        .text("sum");

    pattern_g.append("g")
        .attr("transform", "translate(" + 0 + "," + (0 + yScale3(0)) + ")")
        .call(d3.axisBottom(xScale).ticks(20))
        .append("text")
        .attr("font-family", "Georgia")
        .attr('font-size', 15)
        .attr("dx", widthGantt - 30)
        .attr('dy', '0.5em')
        .attr('fill', 'currentColor')
        .text("round");
    pattern_g.append("g")
        .attr("transform", "translate(" + xScale(1) + "," + (0) + ")")
        .call(d3.axisLeft(yScale3).ticks(2))
        .append("text")
        .attr("font-family", "Georgia")
        .attr('font-size', 15)
        .attr("dx", "7em")
        .attr('dy', 12)
        .attr('fill', 'currentColor')
        .text("number of people");

    pattern_g.append("g")
        .attr("transform", "translate(" + 0 + "," + (0 + yScale4(0)) + ")")
        .call(d3.axisBottom(xScale).ticks(20))
        .append("text")
        .attr("font-family", "Georgia")
        .attr('font-size', 15)
        .attr("dx", widthGantt - 30)
        .attr('dy', '0.5em')
        .attr('fill', 'currentColor')
        .text("round");
    pattern_g.append("g")
        .attr("transform", "translate(" + xScale(1) + "," + (0) + ")")
        .call(d3.axisLeft(yScale4).ticks(2))
        .append("text")
        .attr("font-family", "Georgia")
        .attr('font-size', 15)
        .attr("dx", "7em")
        .attr('dy', 12)
        .attr('fill', 'currentColor')
        .text("number of people");

    pattern_g.append("g")
        .attr("transform", "translate(" + 0 + "," + (0 + yScale5(0)) + ")")
        .call(d3.axisBottom(xScale).ticks(20))
        .append("text")
        .attr("font-family", "Georgia")
        .attr('font-size', 15)
        .attr("dx", widthGantt - 30)
        .attr('dy', '0.5em')
        .attr('fill', 'currentColor')
        .text("round");
    pattern_g.append("g")
        .attr("transform", "translate(" + xScale(1) + "," + (0) + ")")
        .call(d3.axisLeft(yScale5).ticks(2))
        .append("text")
        .attr("font-family", "Georgia")
        .attr('font-size', 15)
        .attr("dx", "7em")
        .attr('dy', 12)
        .attr('fill', 'currentColor')
        .text("number of people");

    var line_generator = d3.line()
        .x(function (d) {
            return xScale(d.x);
        })
        // .y0(YScale(parseInt(i) + 1) + yScale(0))
        .y(function (d) {
            return (d.y);
        })

    for (let i in pattern_select) {
        // console.log(yScale(0));
        let line_data = new Array();
        for (let j in pattern_select[i].scale) {
            line_data.push({
                x: j,
                y: yScale(pattern_select[i].scale[j])
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

        // .curve(d3.curveMonotoneX)
        pattern_g.append("path")
            .attr("d", line_generator(line_data)) //d="M1,0L20,40.....  d-path data
            .attr("fill", "none")
            .attr("stroke", typeColor[parseInt(i)]);
        // .attr('fill-opacity', 0.3);
    }
}
DrawPattern([]);