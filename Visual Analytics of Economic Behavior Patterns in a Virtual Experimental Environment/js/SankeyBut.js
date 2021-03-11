// var width = 1516
// var height = 30
var cir = 0;
var cir_text = 0;
var cir_num = 1;
var red_cir = 0;
var red_cir_text = 0;
var num = 1;

var lun = []

// for (var i = 1; i <= 20; ++i) lun.push(i);

// function SelectLun() {
//     cir = svgA.selectAll("#ci")
//         .attr("id", "ci")
//         .data(lun)
//         .enter()
//         .append("circle")
//         .attr("cx", (d, i) => {
//             // console.log(d)
//             return 160 + 10 + i * (1200 - 170) / 19;
//         })
//         .attr("cy", 15)
//         .attr("r", 9)
//         .attr("fill", "white")
//         // .attr("fill-opacity", 0)
//         .attr("stroke", "red")
//         .attr("stroke-width", 1)
//         .on("click", d => {
//             red_cir.remove();
//             red_cir_text.remove();
//             svg.remove();
//             // ssvg.remove();
//             // PP()
//             if (r != 0) r.remove(), r = 0, K = 0;
//             num = d;
//             tcircle.remove();
//             console.log(d)
//             Red_Butten(d);
//             // cir.remove();
//             // cir_text.remove();
//             cir = 0;
//             L = 0;
//         })
//     cir_text = svgA.selectAll("#te")
//         .attr("id", "te")
//         .data(lun)
//         .enter()
//         .append("text")
//         .attr("fill", "red")
//         .attr("font-size", 14)
//         .attr("x", (d, i) => {
//             // return 800 + 10 + i * 30;
//             return 160 + 10 + i * (1200 - 170) / 19;
//         })
//         .attr("y", 15)
//         .attr("text-anchor", "middle")
//         .attr("dy", 5)
//         .text(d => {
//             return d;
//         })
//         .on("click", d => {
//             red_cir.remove();
//             red_cir_text.remove();
//             svg.remove();
//             // ssvg.remove();
//             if (r != 0) r.remove(), r = 0, K = 0;
//             tcircle.remove();
//             console.log(d)
//             num = d
//             Red_Butten(d);
//             // cir.remove();
//             // cir_text.remove();
//             cir = 0;
//             L = 0;
//         })

// }


var svgA = d3.select("#SankeyViewB").append("svg")
    .attr("width", 1516)
    .attr("height", 30)

svgA.append("circle")
    .attr("cx", 1470)
    .attr("cy", 15)
    .attr("r", 10)
    .attr("fill", "#00FF00")
    .on("click", d => {
        RectOut(num)
        if (r != 0) {
            r.remove();
            r = 0;
            flag = -1;
            K = 0;
        }
        // if (Fiflag != 0) {
        tcircle.style("fill-opacity", 1.0).style("r", 2)
        Fiflag = 0;
        // }
    })

// svgA.append("circle")
//     .attr("cx", 1440)
//     .attr("cy", 15)
//     .attr("r", 10)
//     .attr("fill", "yellow")
//     .on("click", d => {
//         console.log(myChart)
//         // var op = {};
//         // myChart.setOption(op);
//     })

// function Red_Butten(num) {
//     red_cir = svgA.append("circle")
//         .attr("cx", 160 + 10 + (num - 1) * (1200 - 170) / 19)
//         .attr("cy", 15)
//         .attr("r", 10)
//         .attr("fill", "red")
//         // .on("click", d => {
//         //     if (cir == 0) {
//         //         SelectLun();
//         //     } else {
//         //         cir.remove();
//         //         cir_text.remove();
//         //         cir = 0;
//         //     }
//         // })

//     red_cir_text = svgA.append("text")
//         .attr("fill", "white")
//         .attr("font-size", 14)
//         .attr("text-anchor", "middle")
//         .attr("x", 160 + 10 + (num - 1) * (1200 - 170) / 19)
//         .attr("y", 15)
//         .attr("dy", 5)
//         .text(d => {
//             return num;
//         })
//         // .on("click", d => {
//         //     if (cir == 0) {
//         //         SelectLun();
//         //     } else {
//         //         cir.remove();
//         //         cir_text.remove();
//         //         cir = 0;
//         //     }
//         // })
//     console.log(num);
//     PaintIn(num)
// }

// SelectLun()

// Red_Butten(num);

var t = ['SankeyView']

svgA.selectAll("#t")
    .attr("id", "t")
    .data(t)
    .enter()
    .append("text")
    .attr("fill", "whitesmoke")
    .attr("font-size", 20)
    .attr("x", 20)
    .attr("y", 22)
    .text(d => {
        return d;
    })