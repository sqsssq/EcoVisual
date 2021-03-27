const controlSvg = d3.select('#control')
    .append('svg')
    .attr("width", document.getElementById('control').offsetWidth)
    .attr('height', (document.getElementById('control').offsetHeight - 150))
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
document.getElementById("switch").disabled = true;
$("#switch").css("opacity", 0.3);
var bts = $("#ex2").slider({})
// $("#ex12c").slider({ id: "slider12c", min: 0, max: 10, range: true, value: [3, 7] });
let s_data;
$(document).ready(function () {
    $("#dbscan").click(function () {
        // if (initial == 0) {
        //     initial = 1;
        // } else {
        //     clearAll();
        // }
        clearAll();
        document.getElementById("btnStart").disabled = true;
        document.getElementById("btnProfit").disabled = true;
        document.getElementById("btn3").disabled = true;
        document.getElementById("btn4").disabled = true;
        document.getElementById("switch").disabled = false;
        $("#btnStart").css("opacity", 0.3);
        $("#btnProfit").css("opacity", 0.3);
        $("#btn3").css("opacity", 0.3);
        $("#btn4").css("opacity", 0.3);
        $("#switch").css("opacity", 1);
        const eps = $("#epsValue").val();
        const r = $("#rValue").val();
        $.post("http://127.0.0.1:5000/dbscan", {
            eps: eps,
            r: r
        }, function (data, status) {
            run_data = data['data'];
            s_data = run_data;
            DrawScatter(0, run_data);
            DrawAxisPattern(run_data);
            // console.log(run_data);
        })
    })
})

let initial = 0;

$(document).ready(function () {
    $("#btnRun").click(function () {
        const eps = $("#epsValue").val();
        const r = $("#rValue").val();
        $.post("http://127.0.0.1:5000/dbscan", {
            eps: r,
            r: eps
        }, function (data, status) {
            run_data = data['data'];
            s_data = run_data;
            DrawScatter(3, run_data);
            DrawAxis(run_data, 1);

            drawWealthLine();
            // console.log(run_data);
        })
    })
})

$(document).ready(function () {
    $("#customize").click(function () {
        clearAll();
        document.getElementById("btnStart").disabled = false;
        document.getElementById("btnProfit").disabled = false;
        document.getElementById("btn3").disabled = false;
        document.getElementById("btn4").disabled = false;
        document.getElementById("switch").disabled = true;
        $("#btnStart").css("opacity", 1);
        $("#btnProfit").css("opacity", 1);
        $("#btn3").css("opacity", 1);
        $("#btn4").css("opacity", 1);
        $("#switch").css("opacity", 0.3);
        const eps = $("#epsValue").val();
        const r = $("#rValue").val();
        $.post("http://127.0.0.1:5000/dbscan", {
            eps: r,
            r: eps
        }, function (data, status) {
            run_data = data['data'];
            s_data = run_data;
            DrawScatter(1, run_data);
            DrawAxis(run_data, 1);

            drawWealthLine();
            // console.log(run_data);
        })
    })
})

function selectAllProcess() {
    // console.log($("#allS").attr("checked") == 'checked');
    if ($("#allS").attr("checked") == 'checked')
        $(".checkbox_class").removeAttr("checked");
    else
        $(".checkbox_class").attr("checked", "checked");
}

function clearAll() {
    for (let i = 1; i < countType; ++i) {
        d3.select("#PatternSvg" + i.toString()).remove();
        d3.select("#zoom_type" + i.toString()).remove();
        d3.select("#PatternLegend" + i.toString()).remove();
    }
    for (let i = 1; i <= select_people_num; ++i) {
        d3.select("#horizonSvg" + i.toString()).remove();
        d3.select("#pie_g" + i.toString()).remove();
        d3.select("#weal" + i.toString()).remove();
        d3.select("#sel" + i.toString()).remove();
    }
    selectPeople = new Object();
    countType = 1;
    max_wealth_max = 0;
    max_wealth_array = new Array();
    max_receive = -9999;
    min_receive = 9999;
    rectSelect = 0;
    clusterSelect = 0;
    DBSCAN_color = new Array();
    max_people_array = new Array();
    max_profit_array = new Array();
    min_profit_array = new Array();
    max_profit_sum = -99999;
    min_profit_sum = 99999;
    select_people_num = 0;
    d3.select("#wealth_box_g").attr("opacity", 1);
    RemoveBrush();
}
let type_of_outcome = 1;

function switchBtn() {
    if (type_of_outcome) {
        DrawAxis(s_data, 0);
    } else {
        DrawAxisPattern(s_data);
    }
    type_of_outcome = !type_of_outcome;
}