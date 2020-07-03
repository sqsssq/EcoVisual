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


var DecisionListScatter = [];
var circir = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
kssvg.append('g')
    .selectAll('#cirselect')
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
    .attr('stroke', 'red')
    .on("mouseover", d => {
        tooltipcir.html(title[d - 1])
            .style("left", (d3.event.pageX - 15) + "px")
            .style("top", (d3.event.pageY + 20) + "px")
            .style("opacity", 1.0)
    })
    .on("mousemove", d => {
        tooltipcir.style("left", (d3.event.pageX - 15) + "px")
            .style("top", (d3.event.pageY + 20) + "px")
    })
    .on("mouseout", d => {
        tooltipcir.style("opacity", 0.0)
    })