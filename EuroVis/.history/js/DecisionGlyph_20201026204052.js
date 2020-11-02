var glyph_widtha = document.getElementById("DecisionGlyph").clientWidth;
var glyph_heighta = document.getElementById("DecisionGlyph").clientHeight;

var glyph_svg = d3.select("#DecisionGlyph").append("svg")
        .attr('id', 'GView')
        .attr("width", glyph_widtha)
        .attr("height", glyph_heighta)
        // .append('g')
        // .call(zoom)
        // .append('g')
        // .attr('class', 'zoomg')
        // .append("g")
        // // .attr("transform", "translate(0,100)")
        // .attr("transform", "translate(-10, 10)");

function RaderGlyph(label) {
    d3.json('data/ts/20200831db.json').then(gdata => {
        console.log(gdata);
    })
}