// var lc_se = pro_svg.append('g')


// lc_p_g.append('rect')
//     .attr('x', 0)
//     .attr('y', 0)
//     .attr('height', 25)
//     .attr('width', 911)
//     .attr('fill', 'black')
//     .attr('fill-opacity', 0.2)

var ing = 0;

function RRR() {
    // if (r_s_g != 0) {
    //     r_s_g.remove()
    //     r_s_g = 0
    // }

    ing = lc_p_g.append('g')
    ing.append('rect')
        .attr('x', 15)
        .attr('y', 2)
        .attr('height', 20)
        .attr('width', 40)
        .attr('fill', 'black')
        .attr('fill-opacity', 0.2)
        .attr('rx', 10)
        .on('click', d => {
            k.remove()
            d_num = 0;

            name_in = []
            cnt_num = 0

            if (judge_cir_line == 1) {
                PaintCir(nam)
            } else {
                Paintjudge(nam)
            }
        })
}

// lc_p_g.append('text')
//     .attr('x', 100)
//     .attr('y', 23)
//     .attr('fill', 'black')
//     .attr('font-size', '15px')
//     .attr('text-anchor', 'middle')
//     .attr("font-family", "courier")
//     // .attr('dx', '')
//     .attr('dy', '-0.4em')
//     .text("circle")
//     .on('click', d => {
//         judge_cir_line = 1;
//         if (d_num == 0)
//         PaintCir(nam)
//         else 
//         PaintCir_2(name_in)
//         PaintLine(1)
//     })

// lc_p_g.append('text')
//     .attr('x', 40)
//     .attr('y', 23)
//     .attr('fill', 'black')
//     .attr('font-size', '15px')
//     .attr('text-anchor', 'middle')
//     .attr("font-family", "courier")
//     // .attr('dx', '')
//     .attr('dy', '-0.4em')
//     .text("line")
//     .on('click', d => {
//         judge_cir_line = 0;
//         if (d_num == 0)
//         Paintjudge(nam)
//         else
//         Paintjudge_2(name_in)
//         PaintLine(0)
//     })

// lc_p_g.append('text')
//     .attr('x', 35)
//     .attr('y', 23)
//     .attr('fill', 'black')
//     .attr('font-size', '15px')
//     .attr('text-anchor', 'middle')
//     .attr("font-family", "courier")
//     // .attr('dx', '')
//     .attr('dy', '-0.4em')
//     .text("多人")
//     .on('click', d => {
//         RRR()
//         d_num = 1;
//     })

lc_p_g.append('line')
    .attr('x1', 0)
    .attr('y1', 25)
    .attr('x2', 1290)
    .attr('y2', 25)
    .attr('fill', 'none')
    .attr('stroke', '#0a3c75')
    .attr('stroke-width', 1)


$(function () {
    d3.json(fileURL).then((type_data) => {
        // console.log(type_data)
        var peopleTreat = new Object();

        var lsx = new Object();
        var lsxNum = 0;
        for (var i in type_data) {
            if (typeof (lsx[type_data[i].label]) == "undefined") {
                lsx[type_data[i].label] = 1;
                lsxNum++;
            }
        }

        // console.log(lsxNum);

        var minY = 999,
            maxY = -999;
        for (var i in type_data) {
            maxY = Math.max(maxY, type_data[i].label);
            minY = Math.min(minY, type_data[i].label);
        }


        axis_g = peo_svg.append('g')
            .attr('height', p_height - 50)
            .attr("transform", "translate(" + 0 + "," + 40 + ")")

        var p_xscale = d3.scaleLinear()
            .domain([0, 20.5])
            .range([0, p_width - 20])

        var p_yscale = d3.scaleLinear()
            .domain([maxY, minY])
            // .domain([-50, 150])
            .range([p_height - 50, 0])

        let edges = new Array();
        let ed = new Object();
        for (let i = 0; i <= lsxNum; ++i) {
            for (let j = 0; j <= lsxNum; ++j) {
                if (j >= i) {
                    ed[i * 100 + j] = {
                        source: i,
                        target: j,
                        relation: "",
                        value: 0
                    }
                    ed[j * 100 + i] = ed[i * 100 + j];
                }
            }
        }
        // console.log(ed)

        let nameData = new Object();
        for (let i in type_data) {
            if (typeof (nameData[type_data[i].id]) == 'undefined') {
                nameData[type_data[i].id] = new Array();
            }
            nameData[type_data[i].id].push(type_data[i]);
        }
        // console.log(nameData);

        for (let i in nameData) {
            for (let j = 0; j < 19; ++j) {
                // console.log(nameData[i][j].label * 100 + nameData[i][j + 1].label)
                ed[parseInt(nameData[i][j].label) * 100 + parseInt(nameData[i][j + 1].label)].value++;
            }
        }

        let valuemaxz = -1;
        let valueminz = 9000;

        for (let i = 0; i <= lsxNum; ++i) {
            for (let j = 0; j <= lsxNum; ++j) {
                if (j >= i && ed[i * 100 + j].value != 0) {
                    if (valuemaxz < ed[i * 100 + j].value) {
                        valuemaxz = ed[i * 100 + j].value;
                    }
                    if (valueminz > ed[i * 100 + j].value) {
                        valueminz = ed[i * 100 + j].value;
                    }
                    // console.log(ed[i * 100 + j]);
                    edges.push(ed[i * 100 + j])
                }
            }
        }
        // console.log(edges);
        console.log(valuemaxz)
        $("#slider-range").slider({
            range: true,
            min: valueminz,
            max: valuemaxz,
            values: [0, valuemaxz],
            slide: function (event, ui) {
                // $("#time").val(ui.values[0] + ":00" + " - " + ui.values[1] + ":00");
                // console.log(ui)

                connectRad.attr('opacity', d => {
                    console.log(d.value)
                    if (d.value >= ui.values[0] && d.value <= ui.values[1])
                        return 0.2;
                    else
                        return 0;
                })
            }
        });
    })
    $("#time").val($("#slider-range").slider("values", 0) + ":00" +
        " - " + $("#slider-range").slider("values", 1) + ":00");
});