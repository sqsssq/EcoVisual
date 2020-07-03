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
.attr('dy', '2em')