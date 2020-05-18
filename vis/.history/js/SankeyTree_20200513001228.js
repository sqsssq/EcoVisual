var widtha = 384;
var heighta = 307;
// var padding = { top: 10, bottom: 10, left: 10, right: 10 }
var K = 0;
var r = 0

var ssvg = 0;

var orret_g = 0

var ScattermyChart;

var name_x = [];

var k_in_num = 0

function PP() {
    ssvg = d3.select("#Tsne").append("svg")
        .attr('id', 'SView')
        .attr("width", widtha)
        .attr("height", heighta)
}

var pr = [];

var coort = [];

var tcircle = 0;
var flag = -1;
var heatmapInstance = 0;

PP()

let RectLine = ssvg.append('g')
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', 380)
    .attr('height', 70)
    .attr('fill', 'none');

function PaintUnderRect() {
    d3.csv("data/box_calc.csv", function (RectInData) {
        console.log(RectInData);
        let RectInnerData = []
        for (var i in RectInData) {
            // if (parseInt(RectInData[i].biao) == num) {
            RectInnerData.push(RectInData[i])
            // }
        }
        var sort_ten = [] // 第十列排序
        var sort_one = []
        var sort_ten_inner = {}
        var sort_one_inner = {}
        var code_Num = {} // 记录编号排布
        // console.log(RectInnerData)
        for (var i in RectInnerData) {
            // sort_ten.push(parseFloat(RectInnerData[i][119]))
            sort_one.push(parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19]))
            // code_Num[RectInnerData[i].code] = i
        }
        // sort_ten.sort(function (a, b) {
        //     return a - b;
        // })
        sort_one.sort(function (a, b) {
            return a - b;
        })
        for (var i in sort_ten) {
            sort_ten_inner[sort_ten[i]] = i;
            sort_one_inner[sort_one[i]] = i;
        }
        for (var i in RectInnerData) {
            // if (parseInt(sort_ten_inner[RectInnerData[i][119]]) <= 100)
            //     RectInnerData[i][11] = 0;
            // else if (parseInt(sort_ten_inner[RectInnerData[i][119]]) <= 200)
            //     RectInnerData[i][11] = 1;
            // else
            //     RectInnerData[i][11] = 2

            if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 / 3)
                RectInnerData[i][1] = 0;
            else if (parseInt(sort_one_inner[parseFloat(RectInnerData[i][29]) - parseFloat(RectInnerData[i][19])]) <= 6080 * 2 / 3)
                RectInnerData[i][1] = 1;
            else
                RectInnerData[i][1] = 2;
        }
    })
}

PaintUnderRect();