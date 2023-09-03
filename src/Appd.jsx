import React, { useRef, useEffect, useState } from "react";
import { select, hierarchy, tree, linkHorizontal, zoom, drag } from "d3";

const App = () => {
    const svgRef = useRef();
    let dimensions = {
        width: window.screen.width,
        height: 800,
        margin: 50
    };
    const [root, setRoot] = useState();
    const duration = 350;
    let i = 0;


    const sampleData = {
        name: "Root",
        children: [
            { name: "Child 1" },
            { name: "Child 2" },
            {
                name: "Child 3", children: [
                    { name: "Grandchild 1" }, { name: "Grandchild 2", children: [{ name: "Great Grandchild" }] }
                ]
            },
            { name: "Child 4" }
        ],
    };

    useEffect(() => {
        fetch('/data.json')
            .then((res) => res.json())
            .then((data) => {
                setRoot(hierarchy(data, (d) => d.children));
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);


    const updateTree = (source) => {
        const svg = select(svgRef.current)
            .attr("viewBox", `-150 -300 ${dimensions.width} ${dimensions.height}`);
        const g = svg
            .attr("width", dimensions.width - 50)
            .attr("height", dimensions.height)
            .append("g")
            .attr("transform", `translate(100, 50)`);

        const treeLayout = tree().size([dimensions.height, dimensions.width])
            .nodeSize([40, 120]);

        const zoomBehavior = zoom().on("zoom", (event) => {
            g.attr("transform", event.transform);
        });
        svg.call(zoomBehavior);

        const updatedRoot = treeLayout(source);
        const links = updatedRoot.links();
        let nodes = updatedRoot.descendants();
        nodes.forEach(d => d.y = d.depth * 180)

        let node = svg.selectAll("g.node")
            .data(nodes, d => d.id || (d.id = ++i));
        let nodeEnter = node.enter().append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${source.y0},${source.x0})`)
            .on("click", handleClick)



        nodeEnter.append("circle")
            .attr("r", 0)
            .attr("class", "node")
            .style("fill", d => d?._children ? "#a987eb" : "#3bebeb")
            .attr("dragging", true)
            .on("drag", (event, d) => circle.raise().attr("cx", d.x = event.x).attr("cy", d.y = event.y)).on("end", () => circle.classed("dragging", false))

        nodeEnter.append("text")
            .attr("dy", ".35em")
            .attr("x", d => d?.children || d?._children ? -13 : 13)
            .attr("text-anchor", d => d?.children || d?._children ? "end" : "start")
            .text(d => d.data.name)


        let link = svg.selectAll("path.link")
            .data(links, d => d.target.id)

        let linkEnter = link.enter().insert("path", "g")
            .attr("class", "link")
            .attr("stroke", "#3bebeb")
            .attr("fill", "none")
            .attr("d", d => linkHorizontal().x(d => d.y).y(d => d.x));

        let linkUpdate = linkEnter.merge(link);

        linkUpdate.transition().duration(duration)
            .attr("d", diagonal);

        link.exit().transition().duration(duration)
            .attr("d", d => {
                console.log(d.target);
                let o = { x: d.target.x, y: d.target.y }
                return diagonal({ source: o, target: o })
            })
            .remove();

        node.exit().transition().duration(duration)
            .attr("transform", d => `translate(${d.y},${d.x})`)
            .remove();

        nodeEnter.select("text")
            .style("fill-opacity", 1)
            .attr("text-anchor", d => d?.children || d?._children ? "end" : "start")
            .attr("x", d => d?.children || d?._children ? -13 : 13)
            .text(d => d.data.name)

        let nodeUpdate = nodeEnter.merge(node);
        nodeUpdate.transition().duration(duration)
            .attr("transform", d => `translate(${d.y},${d.x})`)

        nodeUpdate.select("circle.node")
            .attr("r", 10)
            .style("fill", d => d?._children ? "#a987eb" : "#3bebeb")
            .attr("cursor", "pointer")



        let nodeExit = node.exit().transition().duration(duration)
            .attr("transform", d => `translate(${source.y},${source.x})`)
            .remove();

        nodeExit.select("circle")
            .attr("r", 0);

        nodeExit.select("text")
            .style("fill-opacity", 0);
    };
    const handleClick = (event, d) => {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        updateTree(root);
    }

    useEffect(() => {
        if (root) {
            updateTree(root);
        }
    }, [root]);

    const diagonal = (d) => {
        return `M ${d?.source?.y} ${d?.source?.x}
        C ${(d?.source?.y + d?.target?.y) / 2} ${d?.source?.x},
            ${(d?.source?.y + d?.target?.y) / 2} ${d?.target?.x},
            ${d?.target?.y} ${d?.target?.x}`
    }



    return (
        <div className="w-[100vw] min-h-screen grid place-content-center">
            {root ? <svg ref={svgRef}
            ></svg> : null}
        </div>
    );
};

export default App;
