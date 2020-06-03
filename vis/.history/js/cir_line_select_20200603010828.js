// var lc_se = pro_svg.append('g')


// lc_p_g.append('rect')
//     .attr('x', 0)
//     .attr('y', 0)
//     .attr('height', 25)
//     .attr('width', 911)
//     .attr('fill', 'black')
//     .attr('fill-opacity', 0.2)

var k = 0;

function RRR() {
    // if (r_s_g != 0) {
    //     r_s_g.remove()
    //     r_s_g = 0
    // }

    k = lc_p_g.append('g')
    k.append('rect')
    .attr('x', 20)
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

lc_p_g.append('text')
    .attr('x', 40)
    .attr('y', 23)
    .attr('fill', 'black')
    .attr('font-size', '15px')
    .attr('text-anchor', 'middle')
    .attr("font-family", "courier")
    // .attr('dx', '')
    .attr('dy', '-0.4em')
    .text("多人")
    .on('click', d => {
        RRR()
        d_num = 1;
    })

lc_p_g.append('line')
    .attr('x1', 0)
    .attr('y1', 25)
    .attr('x2', 911)
    .attr('y2', 25)
    .attr('fill', 'none')
    .attr('stroke', '#0a3c75')
    .attr('stroke-width', 1)