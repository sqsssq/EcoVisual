const controlSvg = d3.select('#control')
.append('svg')
.attr("width", document.getElementById('control').offsetWidth)
.attr('height', (document.getElementById('control').offsetHeight - 30))
.attr('transform', `translate(0, ${(document.getElementById('control').offsetHeight - 50) * 0.2 + 50})`)

for (let i = 0; i < lineLegend.length - 1; ++i) {
    console.log(lineLegend[i]);
    controlSvg
    // .append('g')
    .append('text')
    .attr('x', i * 40)
    .attr('y', 5)
    .text(lineLegend[i])
    .attr('transform', `rotate(60, ${i * 40}, ${5})`);
}