const controlSvg = d3.select('#control')
    .append('svg')
    .attr("width", document.getElementById('control').offsetWidth)
    .attr('height', (document.getElementById('control').offsetHeight - 30))
    .attr('transform', `translate(0, ${(document.getElementById('control').offsetHeight - 50) * 0.2 + 70})`)

for (let i = 0; i < lineLegend.length - 1; ++i) {
    console.log(lineLegend[i]);
    controlSvg
        // .append('g')
        .append('text')
        .attr('x', i * 45 + 10)
        .attr('y', 10)
        .text(lineLegend[i])
        .attr('font-size', 15)
        .attr('font-weight', 'bold')
        .attr('font-family', 'Georgia')
        .attr('transform', `rotate(40, ${i * 45 + 20}, ${10})`);
}

function start() {
    drawWealthLine();
    DrawScatter(0);
    DrawAxis();
}