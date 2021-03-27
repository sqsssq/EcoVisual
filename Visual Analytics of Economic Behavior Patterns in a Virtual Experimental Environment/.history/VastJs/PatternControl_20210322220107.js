const controlSvg = d3.select('#control')
    .append('svg')
    .attr("width", document.getElementById('control').offsetWidth)
    .attr('height', (document.getElementById('control').offsetHeight - 80))
    .attr('transform', `translate(0, ${(document.getElementById('control').offsetHeight - 50) * 0.2 + 55})`)

for (let i = 0; i < lineLegendType_2.length; ++i) {
    // console.log(lineLegend[i]);
    controlSvg
        // .append('g')
        .append('text')
        .attr('x', i * 48 + 10)
        .attr('y', 9)
        .text(lineLegendType_2[i])
        .attr('font-size', 15)
        .attr('font-weight', 'bold')
        .attr('font-family', 'Georgia')
        .attr('transform', `rotate(30, ${i * 48 + 10}, ${10})`);
}
let i = lineLegend.length;

controlSvg
    // .append('g')
    .append('text')
    .attr('x', i * 48 + 10)
    .attr('y', 10)
    .text('All')
    .attr('font-size', 15)
    .attr('font-weight', 'bold')
    .attr('font-family', 'Georgia')
    .attr('transform', `rotate(25, ${i * 48 + 10}, ${10})`);

// function start() {
// drawWealthLine();
// DrawScatter(1);
// DrawAxisPattern();
// }
// drawWealthCircle([{
//     id: 'pva278uh',
//     lun: 12
// }], 1)
var bts = $("#ex2").slider({})
// $("#ex12c").slider({ id: "slider12c", min: 0, max: 10, range: true, value: [3, 7] });
let s_data;
$(document).ready(function()
{
    $("#dbscan").click(function()
    {
        const eps = $("#epsValue").val();
        const r = $("#rValue").val();
        $.post("http://127.0.0.1:5000/dbscan", {
            eps: eps,
            r: r
        }, function (data, status)
        {
            run_data = data['data'];
            s_data = run_data;
            DrawScatter(0, run_data);
            DrawAxisPattern(run_data);
            // console.log(run_data);
        })
    })
})