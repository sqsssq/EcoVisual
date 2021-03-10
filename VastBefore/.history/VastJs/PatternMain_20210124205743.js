$(document).ready(function () {
    $("button").click(function () {
        console.log(1);
        let r1 = $("#range1").val();
        let r2 = $("#range2").val();
        $.post("http://127.0.0.1:5000/", {
            length: r1,
            frequency: r2
        }, function (data, status) {
            // alert("数据：" + data + "\n状态：" + status);
            console.log(data);

            // DrawMatrix(data['fpmType'], data['fpm']);
            // DrawRadar(data['fpmType'], data['fpm']);
            DrawGantt(data['fpmType'], data['fpm']);
            DrawPie(data['fpmType'], data['fpm']);
            DrawSankey(data2, data3);
        });
    });
});


// d3.csv("data/fpmtype4.csv").then((data2) => {
//     d3.csv("data/fpm02.csv").then((data3) => {
//         DrawGantt(data2, data3);
//         DrawPie(data2, data3);
//         DrawSankey(data2, data3);
//     })
// })