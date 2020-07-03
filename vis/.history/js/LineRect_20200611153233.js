var heightLine = 154;
var widthLine = 208;

var line

function FinaceRect(num) {

    d3.csv("data/box_calc.csv", function (data) {
        var lineData = new Array();
        for (var i in data) {
            if (parseInt(data[i].biao) == num) {
                lineData.push(data[i]);
            }
        }
    })
}