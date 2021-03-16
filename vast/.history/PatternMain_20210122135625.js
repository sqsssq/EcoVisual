$(document).ready(function () {
    $("button").click(function () {
        let r1 = $("#range1").val();
        let r2 = $("#range2").val();
        $.post("http://127.0.0.1:5000/", {
            length: r1,
            frequency: r2
        }, function (data, status) {
            // alert("数据：" + data + "\n状态：" + status);
            console.log(data);
        });
    });
});