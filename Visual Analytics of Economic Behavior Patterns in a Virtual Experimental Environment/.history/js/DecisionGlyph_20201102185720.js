var glyph_width = document.getElementById("DecisionGlyph").clientWidth;
var glyph_height = document.getElementById("DecisionGlyph").clientHeight;

var glyph_svg = d3.select("#DecisionGlyph").append("svg")
    .attr('id', 'GView')
    .attr("width", glyph_width)
    .attr("height", glyph_height)
// .append('g')
// .call(zoom)
// .append('g')
// .attr('class', 'zoomg')
// .append("g")
// // .attr("transform", "translate(0,100)")
// .attr("transform", "translate(-10, 10)");

var glyph_g = 0;

function RaderGlyph(label, decisionNum) {
    d3.json(fileURL).then(gdata => {
        d3.csv('data/box_calc.csv').then((rectdata) => {
            var glyph_data = new Array();
            for (let i in gdata) {
                if (gdata[i].label == label)
                    glyph_data.push(gdata[i]);
            }
            // console.log(glyph_data);
            if (glyph_g != 0) {
                glyph_g.remove();
                glyph_g = 0;
            }
            glyph_g = glyph_svg.append('g')
                .classed('main', true)
                .attr('transform', "translate(" + (glyph_width / 2) + ',' + (glyph_height / 2) + ')');
            glyph_g.append('circle')
                .attr('cx', 0)
                .attr('cy', 0)
                .attr('r', 50)
                .attr('fill', 'red')
        })
    })
}

RaderGlyph(1, 11);