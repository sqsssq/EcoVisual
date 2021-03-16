const controlSvg = d3.select('#control')
.append('svg')
.attr("width", document.getElementById('control').offsetWidth)
.attr('height', (document.getElementById('control').offsetHeight - 30))
.attr('transform', `translate(0, ${(document.getElementById('control').offsetHeight - 50) * 0.2 + 50})`)

for (let i = 0; i < lineLegend.length - 1; ++i) {
    console.log(lineLegend[i]);
    controlSvg.append('text')
    .attr('x', 0)
    .attr('y', 0)
    .text(lineLegend[i]);
}