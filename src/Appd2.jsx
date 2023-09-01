import React, { useRef, useEffect, useState } from "react";
import { select, hierarchy, tree, linkHorizontal, zoom, drag } from "d3";

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

const App = () => {
    const svgRef = useRef();
    const dimensions = {
        width: window.screen.width,
        height: 800,
        margin: 50
    };
    const [root, setRoot] = useState(hierarchy(sampleData, (d) => d.children));
    const duration = 350;
    let i = 0;

    // useEffect(() => {
    //     fetch('/data.json')
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setRoot(hierarchy(data, (d) => d.children));
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);


    const updateTree = (source) => {
        const svg = select(svgRef.current)
            .attr("viewBox", `-150 -300 ${dimensions.width} ${dimensions.height}`);
        const g = svg
            .attr("width", dimensions.width - 50)
            .attr("height", dimensions.height)
            .append("g")
            .attr("transform", `translate(100, 50)`);

        const zoomBehavior = zoom().on("zoom", (event) => {
            g.attr("transform", event.transform);
        });
        svg.call(zoomBehavior);


        const treeLayout = tree().size([dimensions.height, dimensions.width])
            .nodeSize([40, 120]);

        const rootNode = treeLayout(root);
        const nodes = rootNode.descendants();
        const links = rootNode.links();
        const node = g.selectAll(".node")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", (d) => "node" + (d.children ? " node--internal" : " node--leaf"))
            .attr("transform", (d) => `translate(${d.y},${d.x})`)
            .on("click", handleClick);

        node.append("circle")
            .attr("r", 10)
            .attr("fill", (d) => d._children ? "#3bebeb" : "#3beb5b")


        node.append("text")
            .attr("dy", ".35em")
            .attr("x", (d) => d.children ? -13 : 13)
            .style("text-anchor", (d) => d.children ? "end" : "start")
            .text((d) => d.data.name)
            .clone(true).lower()

        const link = g.selectAll(".link")
            .data(links)
            .enter()
            .append("path")
            .attr("class", "link")
            .attr("d", linkHorizontal().x((d) => d.y).y((d) => d.x))
            .attr("fill", "none")
            .attr("stroke", "#3bebeb")

        node.append("title")
            .text((d) => d.data.name);

    }



    const handleClick = (event, d) => {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        updateTree(d);
    }

    useEffect(() => {
        updateTree();
    }, []);

    const diagonal = (d) => {
        return `M ${d?.source?.y} ${d?.source?.x}
        C ${(d?.source?.y + d?.target?.y) / 2} ${d?.source?.x},
            ${(d?.source?.y + d?.target?.y) / 2} ${d?.target?.x},
            ${d?.target?.y} ${d?.target?.x}`
    }



    return (
        <div className="w-[100vw] min-h-screen grid place-content-center">
            <svg ref={svgRef}></svg>
            {/* {root ? <svg
                className="w-[100%] h-[100%]"
                ref={svgRef}
            ></svg> : null} */}
        </div>
    );
};

export default App;
