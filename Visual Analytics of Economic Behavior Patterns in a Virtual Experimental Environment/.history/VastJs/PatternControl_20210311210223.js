const controlSvg = d3.select('#control')
    .append('svg')
    .attr("width", document.getElementById('control').offsetWidth)
    .attr('height', (document.getElementById('control').offsetHeight - 30))
    .attr('transform', `translate(0, ${(document.getElementById('control').offsetHeight - 50) * 0.2 + 55})`)

for (let i = 0; i < lineLegend.length - 1; ++i) {
    console.log(lineLegend[i]);
    controlSvg
        // .append('g')
        .append('text')
        .attr('x', i * 40 + 20)
        .attr('y', 5)
        .text(lineLegend[i])
        .attr('font-size', 12)
        .attr('font-weight', 'bold')
        .attr('transform', `rotate(50, ${i * 40 + 20}, ${5})`);
}