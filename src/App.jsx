import React, { useRef, useEffect, useState } from "react";
import { select, hierarchy, tree, linkHorizontal, zoom } from "d3";

const App = () => {
    const svgRef = useRef();
    let dimensions = {
        width: window.screen.width,
        height: 600,
        margin: 50
    };
    const [root, setRoot] = useState();
    const duration = 750;
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
        setRoot(hierarchy(sampleData, (d) => d.children));
    }, []);
    const toggleChildren = (node) => {
        if (node.children) {
            node._children = node.children;
            node.children = null;
        } else {
            node.children = node._children;
            node._children = null;
        }
    };

    const updateTree = () => {
        const svg = select(svgRef.current);
        const g = svg
            .attr("width", dimensions.width)
            .attr("height", dimensions.height)
            .append("g")
            .attr("transform", `translate(${dimensions.width / 3}, ${dimensions.height / 2})`);

        const zoomBehavior = zoom().on("zoom", (event) => {
            g.attr("transform", event.transform);
        });

        svg.call(zoomBehavior);

        const treeLayout = tree().size([dimensions.height - 50, dimensions.width - 160])
            .nodeSize([20, 120]);
        const updatedRoot = treeLayout(root);

        const links = updatedRoot.links();
        const linkGenerator = linkHorizontal().x(d => d.y).y(d => d.x);
        g.selectAll(".link")
            .data(links)
            .enter()
            .append("path")
            .attr("d", linkGenerator)
            .attr("class", "link")
            .attr("fill", "none")
            .attr("stroke", "#3bebeb");
        const treeElements = g.selectAll(".node")
            .data(updatedRoot.descendants(), d => d.data.name);


        const nodes = g.selectAll(".node")
            .data(updatedRoot.descendants())
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.y},${d.x})`)
            .on("click", (event, d) => {
                toggleChildren(d);
                updateTree();
            });

        nodes.append("circle")
            .attr("r", 7)
            .attr("fill", "#a987eb");

        nodes.append("text")
            .attr("font-size", 12)
            .attr("font-family", "sans-serif")
            .attr("dy", 4)
            .attr("x", 12)
            .text(d => d.data.name);

        const link = svg.selectAll("path.link").data(links, function (d) {
            return d.id;
        });
        var linkEnter = link
            .enter()
            .insert("path", "g")
            .attr("class", "link")
            .attr("d", function (d) {
                var o = { x: root.x0, y: root.y };
                return diagonal(o, o);
            })
        let linkUpdate = linkEnter.merge(link);
        linkUpdate
            .transition()
            .duration(500)
            .attr("d", function (d) {
                return diagonal(d, d.parent);
            });
    };

    useEffect(() => {
        if (root) {
            updateTree();
        }
    }, [root]);
    const diagonal = d => {
        console.log(d);
        return `M ${d?.source?.y} ${d?.source?.x}
        C ${(d?.source?.y + d?.target?.y) / 2} ${d?.source?.x},
            ${(d?.source?.y + d?.target?.y) / 2} ${d?.target?.x},
            ${d?.target?.y} ${d?.target?.x}`
    }



    return (
        <div className="w-[100vw] min-h-screen grid place-content-center">
            {root ? <svg ref={svgRef}></svg> : null}
        </div>
    );
};

export default App;
