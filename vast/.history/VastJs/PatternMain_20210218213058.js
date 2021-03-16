$(document).ready(function () {
    $("#confirm").click(function () {
        console.log(1);
        let r3 = $("#range3").val();
        let r4 = $("#range4").val();
        let r5 = $("#range5").val();
        $.post("http://127.0.0.1:5000/x", {
            a: r3,
            b: r4,
            c: r5
        }, function (data, status) {
            // alert("数据：" + data + "\n状态：" + status);
            console.log(data);

            // DrawMatrix(data['fpmType'], data['fpm']);
            // DrawRadar(data['fpmType'], data['fpm']);
            // DrawGantt(data['fpmType'], data['fpm']);
            // DrawPie(data['fpmType'], data['fpm']);
            // DrawSankey(data['fpmType'], data['fpm']);
        });
    });
});


d3.csv("data/fpmtype4.csv").then((data2) => {
    d3.csv("data/fpm02.csv").then((data3) => {
        // DrawGantt(data2, data3);
        // DrawPie(data2, data3);
        // DrawSankey(data2, data3);
    })
})