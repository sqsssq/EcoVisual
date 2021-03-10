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
    d3.json(fileURL).then(gdata => {
        d3.csv('data/box_calc.csv').then((rectdata) => {
            var glyph_data = new Array();
            for (let i in gdata) {
                if (gdata[i].label == label)
                    glyph_data.push(gdata[i]);
            }
            // console.log(glyph_data);
            
        })
    })
}

// RaderGlyph(1)