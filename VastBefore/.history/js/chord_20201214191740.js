function chart(matrix_data) {
    const svg = d3.select('#chord').append('svg')
        // .attr("viewBox", [-width / 2, -height / 2, width, height]);
        .attr('width', 100)
        .attr('height', 100)

    const chords = chord(matrix_data);

    const group = svg.append("g")
    .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')')
        .attr("font-size", 5)
        .attr("font-family", "sans-serif")
        .selectAll("g")
        .data(chords.groups)
        .join("g");

    group.append("path")
        .attr("fill", d => color(names[d.index]))
        .attr("d", arc);

    group.append("text")
        .each(d => (d.angle = (d.startAngle + d.endAngle) / 2))
        .attr("dy", "0.35em")
        .attr("transform", d => `
          rotate(${(d.angle * 180 / Math.PI - 90)})
            translate(${outerRadius + 5})
            ${d.angle > Math.PI ? "rotate(180)" : ""}
        `)
        .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
        .text(d => names[d.index]);

    group.append("title")
        .text(d => `${names[d.index]}
  ${d3.sum(chords, c => (c.source.index === d.index) * c.source.value)} outgoing →
  ${d3.sum(chords, c => (c.target.index === d.index) * c.source.value)} incoming ←`);

    svg.append("g")
        .attr("fill-opacity", 0.75)
        .selectAll("path")
        .data(chords)
        .join("path")
        .style("mix-blend-mode", "multiply")
        .attr("fill", d => color(names[d.target.index]))
        .attr("d", ribbon)
        .append("title")
        .text(d => `${names[d.source.index]} → ${names[d.target.index]} ${d.source.value}`);

    return svg.node();
}


var fileURL = 'data/ts/20200831db.json'

// data = Array.from(d3.rollup((await FileAttachment("flare.json").json())
//         .flatMap(({
//             name: source,
//             imports
//         }) => imports.map(target => [rename(source), rename(target)])),
//         ({
//             0: [source, target],
//             length: value
//         }) => ({
//             source,
//             target,
//             value
//         }), link => link.join())
//     .values())

// data = [{
//         source: "analytics.cluster",
//         target: "animate",
//         value: 2
//     },
//     {
//         source: "analytics.cluster",
//         target: "vis.data",
//         value: 8
//     }
// ]

function matrixA(data) {
    const index = new Map(names.map((name, i) => [name, i]));
    const matrix = Array.from(index, () => new Array(names.length).fill(0));
    for (const {
            source,
            target,
            value
        } of data) matrix[index.get(source)][index.get(target)] += value;
    return matrix;
}






width = 100

height = width

// d3 = require("d3@6")
function chord() {
    d3.json(fileURL).then((coor) => {
        d3.csv('data/box_calc.csv').then((rectdata) => {

            let nodes = new Array();
            for (let i = 0; i <= 24; ++i) {
                nodes.push({
                    name: i
                });
            }

            let edges = new Array();
            let ed = new Object();
            for (let i = 0; i <= 24; ++i) {
                for (let j = 0; j <= 24; ++j) {
                    if (j >= i) {
                        ed[i * 100 + j] = {
                            source: i,
                            target: j,
                            relation: "",
                            value: 0
                        }
                        ed[j * 100 + i] = {
                            source: j,
                            target: i,
                            relation: "",
                            value: 0
                        }
                    }
                }
            }

            let nameData = new Object();
            for (let i in coor) {
                if (typeof (nameData[coor[i].id]) == 'undefined') {
                    nameData[coor[i].id] = new Array();
                }
                nameData[coor[i].id].push(coor[i]);
            }

            for (let i in nameData) {
                for (let j = 0; j < 19; ++j) {
                    ed[nameData[i][j].label * 100 + nameData[i][j + 1].label].value++;
                }
            }

            let valuemax = -1;
            let valuemin = 9000;

            for (let i = 0; i <= 24; ++i) {
                for (let j = 0; j <= 24; ++j) {
                    if (ed[i * 100 + j].value != 0) {
                        if (valuemax < ed[i * 100 + j].value) {
                            valuemax = ed[i * 100 + j].value;
                        }
                        if (valuemin > ed[i * 100 + j].value) {
                            valuemin = ed[i * 100 + j].value;
                        }
                        // console.log(ed[i * 100 + j]);
                        edges.push(ed[i * 100 + j])
                    }
                }
            }

            console.log(edges);
            data = edges;
            

            innerRadius = Math.min(width, height) * 0.5 - 20
            outerRadius = innerRadius + 3
            rename = name => name.substring(name.indexOf(".") + 1, name.lastIndexOf("."))

            names = Array.from(new Set(data.flatMap(d => [d.source, d.target]))).sort(d3.ascending)

            color = d3.scaleOrdinal(names, d3.quantize(d3.interpolateRainbow, names.length))
            ribbon = d3.ribbonArrow()
                .radius(innerRadius - 1)
                .padAngle(0.1 / innerRadius)

            arc = d3.arc()
                .innerRadius(innerRadius)
                .outerRadius(outerRadius)

            chord = d3.chordDirected()
                .padAngle(1 / innerRadius)
                .sortSubgroups(d3.descending)
                .sortChords(d3.descending)

            var matrix = matrixA(data)
            chart(matrix)
        })
    })
}

chord();