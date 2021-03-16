            var g = svg.append("g")


            var t_pic = ['图例', '工作', '健康投资', '财产保险', '借贷机会', '投资', '风险投资', '负面冲击', '买彩票', '生病', '失业']

            var text_pic = g.selectAll('#text_pic')
                .attr("id", "text_pic")
                .data(t_pic)
                .enter()
                .append('text')
                .attr('fill', 'black')
                .attr('font-size', (d, i) => {
                    if (i == 0) return "20px";
                    else return "15px";
                })
                .attr('text-anchor', 'middle')
                .attr("font-family", "courier")
                .attr('x', function (d, i) {
                    if (i == 0)
                        return padding.left + 9 * rectStep + 140
                    return padding.left + 9 * rectStep + 52;
                })
                .attr('y', function (d, i) {
                    return height - padding.bottom - 304 - 23 + i * 30;
                })
                .attr('dx', rectWidth / 2) //dx是相对于x平移的大小
                .attr('dy', '1em') //dy是相对于y平移的大小
                .text(function (d) {
                    return d;
                })
            g.append("circle")
                .attr("cx", 1310)
                .attr("cy", height - padding.bottom - 304 + 18)
                .attr("r", 10)
                .attr("fill", color[0])
                .attr("fill-opacity", 0.2)
            g.append("text")
                .attr("x", 1320)
                .attr("y", height - padding.bottom - 304 - 23 + 30)
                .attr("dx", 15)
                .attr("dy", "1em")
                .attr('fill', 'black')
                .attr('font-size', '15px')
                .attr('text-anchor', 'middle')
                .attr("font-family", "courier")
                .text(d => {
                    return "工作"
                })

            var a_t = ['否', '是']
            var b_t = ['0', '3', '5']
            var c_t = ['小', '中', '大', '无']
            var d_t = ['无', '小', '中', '大']

            g.append("circle")
                .attr("cx", 1310)
                .attr("cy", height - padding.bottom - 304 + 18 + 30)
                .attr("r", 10)
                .attr("fill", color[0])
                .attr("fill-opacity", 0.2)
            g.append("circle")
                .attr("cx", 1360)
                .attr("cy", height - padding.bottom - 304 + 18 + 30)
                .attr("r", 10)
                .attr("fill", color[1])
                .attr("fill-opacity", 0.2)
            g.append("circle")
                .attr("cx", 1410)
                .attr("cy", height - padding.bottom - 304 + 18 + 30)
                .attr("r", 10)
                .attr("fill", color[2])
                .attr("fill-opacity", 0.2)

            var t_h = g.selectAll("#aa")
                .attr("id", "aa")
                .data(b_t)
                .enter()
                .append("text")
                .attr("x", (d, i) => {
                    return 1315 + i * 50;
                })
                .attr("y", height - padding.bottom - 304 + 7 + 30)
                .attr("dx", 15)
                .attr("dy", "1em")
                .attr('fill', 'black')
                .attr('font-size', '15px')
                .attr('text-anchor', 'middle')
                .attr("font-family", "courier")
                .text(d => {
                    return d
                })

            g.append("circle")
                .attr("cx", 1310)
                .attr("cy", height - padding.bottom - 304 + 48 + 30)
                .attr("r", 10)
                .attr("fill", color[0])
                .attr("fill-opacity", 0.2)
            g.append("circle")
                .attr("cx", 1360)
                .attr("cy", height - padding.bottom - 304 + 48 + 30)
                .attr("r", 10)
                .attr("fill", color[1])
                .attr("fill-opacity", 0.2)

            g.selectAll("#aa")
                .attr("id", "aa")
                .data(a_t)
                .enter()
                .append("text")
                .attr("x", (d, i) => {
                    return 1315 + i * 50;
                })
                .attr("y", height - padding.bottom - 304 + 37 + 30)
                .attr("dx", 15)
                .attr("dy", "1em")
                .attr('fill', 'black')
                .attr('font-size', '15px')
                .attr('text-anchor', 'middle')
                .attr("font-family", "courier")
                .text(d => {
                    return d
                })

            g.append("circle")
                .attr("cx", 1310)
                .attr("cy", height - padding.bottom - 304 + 78 + 30)
                .attr("r", 10)
                .attr("fill", color[0])
                .attr("fill-opacity", 0.2)
            g.append("circle")
                .attr("cx", 1360)
                .attr("cy", height - padding.bottom - 304 + 78 + 30)
                .attr("r", 10)
                .attr("fill", color[1])
                .attr("fill-opacity", 0.2)

            g.selectAll("#aa")
                .attr("id", "aa")
                .data(a_t)
                .enter()
                .append("text")
                .attr("x", (d, i) => {
                    return 1315 + i * 50;
                })
                .attr("y", height - padding.bottom - 304 + 67 + 30)
                .attr("dx", 15)
                .attr("dy", "1em")
                .attr('fill', 'black')
                .attr('font-size', '15px')
                .attr('text-anchor', 'middle')
                .attr("font-family", "courier")
                .text(d => {
                    return d
                })

            g.append("circle")
                .attr("cx", 1310)
                .attr("cy", height - padding.bottom - 304 + 107 + 30)
                .attr("r", 10)
                .attr("fill", color[0])
                .attr("fill-opacity", 0.2)
            g.append("circle")
                .attr("cx", 1360)
                .attr("cy", height - padding.bottom - 304 + 107 + 30)
                .attr("r", 10)
                .attr("fill", color[1])
                .attr("fill-opacity", 0.2)

            g.selectAll("#aa")
                .attr("id", "aa")
                .data(a_t)
                .enter()
                .append("text")
                .attr("x", (d, i) => {
                    return 1315 + i * 50;
                })
                .attr("y", height - padding.bottom - 304 + 97 + 30)
                .attr("dx", 15)
                .attr("dy", "1em")
                .attr('fill', 'black')
                .attr('font-size', '15px')
                .attr('text-anchor', 'middle')
                .attr("font-family", "courier")
                .text(d => {
                    return d
                })

            g.append("circle")
                .attr("cx", 1310)
                .attr("cy", height - padding.bottom - 304 + 137 + 30)
                .attr("r", 10)
                .attr("fill", color[0])
                .attr("fill-opacity", 0.2)
            g.append("circle")
                .attr("cx", 1360)
                .attr("cy", height - padding.bottom - 304 + 137 + 30)
                .attr("r", 10)
                .attr("fill", color[1])
                .attr("fill-opacity", 0.2)

            g.selectAll("#aa")
                .attr("id", "aa")
                .data(a_t)
                .enter()
                .append("text")
                .attr("x", (d, i) => {
                    return 1315 + i * 50;
                })
                .attr("y", height - padding.bottom - 304 + 127 + 30)
                .attr("dx", 15)
                .attr("dy", "1em")
                .attr('fill', 'black')
                .attr('font-size', '15px')
                .attr('text-anchor', 'middle')
                .attr("font-family", "courier")
                .text(d => {
                    return d
                })


            g.append("circle")
                .attr("cx", 1310)
                .attr("cy", height - padding.bottom - 304 + 167 + 30)
                .attr("r", 10)
                .attr("fill", color[0])
                .attr("fill-opacity", 0.2)
            g.append("circle")
                .attr("cx", 1360)
                .attr("cy", height - padding.bottom - 304 + 167 + 30)
                .attr("r", 10)
                .attr("fill", color[1])
                .attr("fill-opacity", 0.2)
            g.append("circle")
                .attr("cx", 1410)
                .attr("cy", height - padding.bottom - 304 + 167 + 30)
                .attr("r", 10)
                .attr("fill", color[2])
                .attr("fill-opacity", 0.2)
            g.append("circle")
                .attr("cx", 1460)
                .attr("cy", height - padding.bottom - 304 + 167 + 30)
                .attr("r", 10)
                .attr("fill", color[3])
                .attr("fill-opacity", 0.2)

            g.selectAll("#aa")
                .attr("id", "aa")
                .data(c_t)
                .enter()
                .append("text")
                .attr("x", (d, i) => {
                    return 1315 + i * 50;
                })
                .attr("y", height - padding.bottom - 304 + 157 + 30)
                .attr("dx", 15)
                .attr("dy", "1em")
                .attr('fill', 'black')
                .attr('font-size', '15px')
                .attr('text-anchor', 'middle')
                .attr("font-family", "courier")
                .text(d => {
                    return d
                })


            g.append("circle")
                .attr("cx", 1310)
                .attr("cy", height - padding.bottom - 304 + 197 + 30)
                .attr("r", 10)
                .attr("fill", color[0])
                .attr("fill-opacity", 0.2)
            g.append("circle")
                .attr("cx", 1360)
                .attr("cy", height - padding.bottom - 304 + 197 + 30)
                .attr("r", 10)
                .attr("fill", color[1])
                .attr("fill-opacity", 0.2)

            g.selectAll("#aa")
                .attr("id", "aa")
                .data(a_t)
                .enter()
                .append("text")
                .attr("x", (d, i) => {
                    return 1315 + i * 50;
                })
                .attr("y", height - padding.bottom - 304 + 187 + 30)
                .attr("dx", 15)
                .attr("dy", "1em")
                .attr('fill', 'black')
                .attr('font-size', '15px')
                .attr('text-anchor', 'middle')
                .attr("font-family", "courier")
                .text(d => {
                    return d
                })

            g.append("circle")
                .attr("cx", 1310)
                .attr("cy", height - padding.bottom - 304 + 227 + 30)
                .attr("r", 10)
                .attr("fill", color[0])
                .attr("fill-opacity", 0.2)
            g.append("circle")
                .attr("cx", 1360)
                .attr("cy", height - padding.bottom - 304 + 227 + 30)
                .attr("r", 10)
                .attr("fill", color[1])
                .attr("fill-opacity", 0.2)
            g.append("circle")
                .attr("cx", 1410)
                .attr("cy", height - padding.bottom - 304 + 227 + 30)
                .attr("r", 10)
                .attr("fill", color[2])
                .attr("fill-opacity", 0.2)
            g.append("circle")
                .attr("cx", 1460)
                .attr("cy", height - padding.bottom - 304 + 227 + 30)
                .attr("r", 10)
                .attr("fill", color[3])
                .attr("fill-opacity", 0.2)

            g.selectAll("#aa")
                .attr("id", "aa")
                .data(d_t)
                .enter()
                .append("text")
                .attr("x", (d, i) => {
                    return 1315 + i * 50;
                })
                .attr("y", height - padding.bottom - 304 + 217 + 30)
                .attr("dx", 15)
                .attr("dy", "1em")
                .attr('fill', 'black')
                .attr('font-size', '15px')
                .attr('text-anchor', 'middle')
                .attr("font-family", "courier")
                .text(d => {
                    return d
                })

            g.append("circle")
                .attr("cx", 1310)
                .attr("cy", height - padding.bottom - 304 + 257 + 30)
                .attr("r", 10)
                .attr("fill", color[0])
                .attr("fill-opacity", 0.2)
            g.append("circle")
                .attr("cx", 1360)
                .attr("cy", height - padding.bottom - 304 + 257 + 30)
                .attr("r", 10)
                .attr("fill", color[1])
                .attr("fill-opacity", 0.2)

            g.selectAll("#aa")
                .attr("id", "aa")
                .data(a_t)
                .enter()
                .append("text")
                .attr("x", (d, i) => {
                    return 1315 + i * 50;
                })
                .attr("y", height - padding.bottom - 304 + 247 + 30)
                .attr("dx", 15)
                .attr("dy", "1em")
                .attr('fill', 'black')
                .attr('font-size', '15px')
                .attr('text-anchor', 'middle')
                .attr("font-family", "courier")
                .text(d => {
                    return d
                })

            g.append("line")
                .attr("x1", 1232)
                .attr("y1", height - padding.bottom - 304 + 247 + 50)
                .attr("x2", 1500)
                .attr("y2", height - padding.bottom - 304 + 247 + 50)
                .attr("stroke", "black")
                .attr("stroke-width", "1px");

            g.append("line")
                .attr("x1", 1232)
                .attr("y1", height - padding.bottom - 304 - 20)
                .attr("x2", 1500)
                .attr("y2", height - padding.bottom - 304 - 20)
                .attr("stroke", "black")
                .attr("stroke-width", "1px");



            g.append("line")
                .attr("x1", 1232)
                .attr("y1", height - padding.bottom - 304 - 20)
                .attr("x2", 1232)
                .attr("y2", height - padding.bottom - 304 + 50 + 247)
                .attr("stroke", "black")
                .attr("stroke-width", "1px");

            g.append("line")
                .attr("x1", 1500)
                .attr("y1", height - padding.bottom - 304 - 20)
                .attr("x2", 1500)
                .attr("y2", height - padding.bottom - 304 + 50 + 247)
                .attr("stroke", "black")
                .attr("stroke-width", "1px");