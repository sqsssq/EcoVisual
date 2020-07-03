var myselect = document.getElementById("Lun_select");

var Lun_index = -1;

if (Lun_index == -1) {
    PaintIn(1)
    RedLun(1)
}

function get() {
    Lun_index = myselect.selectedIndex;
    console.log(Lun_index)

    var Lun_val = myselect.options[Lun_index].value;

    // alert(Lun_val)
    number = Lun_val
    // PaintIn(Lun_val)
    RedLun(number);
    PaintRect(number)
    // ScatterPaint()
}

function clear_pic(num) {
    if (r != 0) {
        K = 0;
        flag = -1;
        r.remove();
        r = 0;
    }

    // if (ct != 0) {
    //     ct.remove();
    //     ct = 0;
    // }

    if (ice_line_g != 0) {
        ice_line_g.remove();
        ice_line_g = 0;
    }

    k_in_num = 0;
    name_x = []

    Rect_data = -1;
    Paintjudge_2(['11qpbunz', 'v5p7lv20', '7rmwik5s', 'wak4ycex']);

    RectOut(num);
    FinaceRect(num);

    // d3.selectAll('#krect').remove();
    for (var i in cir___) {
        cir___[i].remove();
    }
    cir___ = new Array();
    DecisionList = new Array();
    name_in = new Array();
    // PaintDecisionLine(-1, -1);
    // PaintDecisionRect(-1, -1);

    DecisionListScatter = new Array();
    for (let i in cirdist) {
        // if (cirdist[i] != 0)
        cirdist[i][1].remove();
        // cirdist[i] = 0
    }

    DrawIceRect();
}

svg_main = d3.select("#mainA").append("svg")
    .attr("width", 1518)
    .attr("height", 30)
// .attr("transform", "translate(" + -5 + "," + 0 + ")")

svg_main.append("text")
    .attr('x', 0)
    .attr('y', 0)
    .text('情境模拟与真实努力任务实验')
    .attr('dy', '1em')
    .attr('dx', '0.5em')
    .attr('font-weight', 500)
    .attr('fill', 'white')

// svg_main.append('circle')
//     .attr('cx', 260)
//     .attr('cy', 12)
//     .attr('r', 7)
//     .attr('fill', 'red')
//     .on('click', d => {
//         clear_pic(number);
//     })

svg_main.append('text')
    .attr('x', 1460)
    .attr('y', 18)
    // .attr('r', 7)
    // .attr('fill', 'red')
    .text('🔄')
    .on('click', d => {
        clear_pic(number);
    })


var tooltipcir = d3.select("body")
    .append("div")
    .attr("class", "tooltipcir")
    .style("opacity", 0.0)
    .attr('x', 0)

var svg_main2 = d3.select("#mainB").append("svg")
    .attr("width", 383)
    .attr("height", 30)
// .attr("transform", "translate(" + -5 + "," + 0 + ")")

svg_main2.append("text")
    .attr('x', 0)
    .attr('y', 0)
    .text('决策投影')
    .attr('dy', '1em')
    .attr('dx', '0.5em')
    .attr('font-weight', 500)
    .attr('fill', 'white')

// svg_main.append('circle')
//     .attr('cx', 260)
//     .attr('cy', 12)
//     .attr('r', 7)
//     .attr('fill', 'red')
//     .on('click', d => {
//         clear_pic(number);
//     })

svg_main2.append('text')
    .attr('x', 330)
    .attr('y', 18)
    // .attr('r', 7)
    // .attr('fill', 'red')
    .text('▶️')
    .on('click', d => {
        PaintRect(num)
    })


var DecisionListScatter = [];
var circir = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
var ksdf = kssvg.append('g')
ksdf.selectAll('#cirselect')
    .attr("id", 'cirselect')
    .data(circir)
    .enter()
    .append('circle')
    .attr('cx', d => {
        return d * 35;
    })
    .attr('cy', d => {
        return 15;
    })
    .attr('r', 6)
    .attr('fill', 'white')
    .attr('stroke', 'blue')
    .on("mouseover", d => {
        tooltipcir.html(title[d - 1])
            .style("left", (d3.event.pageX - 40) + "px")
            .style("top", (d3.event.pageY - 30) + "px")
            .style("opacity", 1.0)
    })
    .on("mousemove", d => {
        tooltipcir.style("left", (d3.event.pageX - 40) + "px")
            .style("top", (d3.event.pageY - 30) + "px")
    })
    .on("mouseout", d => {
        tooltipcir.style("opacity", 0.0)
    })
    .on('click', d => {
        circlick(d);
    })

var cirdist = []

function circlick(dnum) {
    DecisionListScatter.push(dnum);
    cirdist.push([dnum, ksdf.append('circle')
        .attr('cx', dnum * 35)
        .attr('cy', 15)
        .attr('r', 6)
        .attr('fill', 'blue')
        // .attr('stroke')
        .on("mouseover", d => {
            tooltipcir.html(title[dnum - 1])
                .style("left", (d3.event.pageX - 40) + "px")
                .style("top", (d3.event.pageY - 30) + "px")
                .style("opacity", 1.0)
        })
        .on("mousemove", d => {
            tooltipcir.style("left", (d3.event.pageX - 40) + "px")
                .style("top", (d3.event.pageY - 30) + "px")
        })
        .on("mouseout", d => {
            tooltipcir.style("opacity", 0.0)
        })
        // .on('click', d => {
        //     // cirdist[dnum].remove()
        //     // var De = DecisionListScatter;
        //     // DecisionListScatter = new Array();
        //     // for (let i in De) {
        //     //     if (De[i] == dnum) continue;
        //     //     DecisionListScatter.push(De[i]);
        //     // }
        //     // DecisionListScatter.sort();
        //     console.log(d);
        // })
    ]);
    DecisionListScatter.sort();
    // console.log(DecisionListScatter);
}

// function circirclick(dnum) {

// }