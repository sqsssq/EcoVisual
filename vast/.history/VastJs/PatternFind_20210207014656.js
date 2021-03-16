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
    let step = heightGantt / (pattern_select + 1);
    let yScale = d3.scaleLinear()
        .domain([0, 304])
        .range([step * 9 / 20, -step * 9 / 20]);
    let xScale = d3.scaleLinear()
        .domain([1, 20])
        .range([100, widthGantt - 30]);
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
    for (let i in pattern_select) {
        console.log(i);
        pattern_g.append('circle')
        .attr('cx', 40)
        .attr('cy', YScale(i + 1))
        .attr('r', rScale(pattern_select[i].people.length))
        .attr('fill', 'gray');
    }
}