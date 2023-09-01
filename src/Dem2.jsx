import React, { useRef, useEffect, useState } from "react";
import { select, hierarchy, tree, linkHorizontal, zoom } from "d3";
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
const D3Tree = () => {
    const svgRef = useRef();
    const dimensions = { width: 1300, height: 600 };
    const jwt = "eyJraWQiOiJuaFU2eWlkdGpleSthUjd3SURWRXcyeDNrclNibTYxUEV3K1RrZ056UkNZPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiI5ZmYxNmM2Yi1lMDBiLTRiMmItODQ4My1hN2QxYmFkNGYxMmQiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLmFwLXNvdXRoLTEuYW1hem9uYXdzLmNvbVwvYXAtc291dGgtMV90SFRSTlpjZ3YiLCJwaG9uZV9udW1iZXJfdmVyaWZpZWQiOmZhbHNlLCJjb2duaXRvOnVzZXJuYW1lIjoiYW1pdEBzaHVueWVrYS5jb20iLCJhdWQiOiI3bmJmZG9vbTFzcnJkbW1ybnU0ZTdobnI3aiIsImV2ZW50X2lkIjoiZmI1NGEwNTQtZWQwNy00OTk5LTljZDYtYTQ0YjgwZWE3OGU5IiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2OTE3Mjg3MjMsIm5hbWUiOiJBbWl0IENob3RhbGl5YSIsInBob25lX251bWJlciI6Iis5MTgwODgyNjMwMTAiLCJleHAiOjE2OTM0NzgwNjksImlhdCI6MTY5MzQ3NDQ2OSwiZW1haWwiOiJhbWl0QHNodW55ZWthLmNvbSJ9.OgUa7Lf2TluFO9UGkPcljN3la-ynlVsACZbiYRmSuBpWvth1iLScDZIX1M6m1o78OHmkEMCZU1AQV_ASgajZvpMGkNULxsJQfUOrPBuhRg0qlP56iXjyaQagUscL6WBB7clRjU1tiFkf6E51ULer5aVL4SB-t7s6IrT2bTaqshUlkMiKdL7CRkK1mSQJY0sOv2D2hjK4LPH2R1FHRAL0j2lbArk0Hekv_8oM-vYsJoxNdcghTzCTlpT09AbC-N041xtIGrmBokJMZTGb_hVTqzJ_Q612ypoS0ZraNc33d8YI0TjUkbxcTboLpyPJRP3l6X6z0VYZdml_tGk_v43p_A"
    const [data, setData] = useState([]);
    const [root, setRoot] = useState(hierarchy(data, function (d) {
        return d.children;
    }));
    // inventories/hierarchy
    // useEffect(() => {
    //     fetch('https://api-test.autobot.live/inventories/hierarchy', {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //             Authorization: `Bearer ${jwt}`,
    //         }
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             console.log(data);
    //             setData(data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // }, []);
    useEffect(() => {
        fetch('/data.json')
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setData(data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);
    useEffect(() => {
        if (root) {
            const svg = select(svgRef.current);
            const g = svg
                .attr("width", dimensions.width)
                .attr("height", dimensions.height)
                .append("g")
                .attr("transform", `translate(50, 50)`);

            const zoomBehavior = zoom().on("zoom", (event) => {
                g.attr("transform", event.transform);
            });

            svg.call(zoomBehavior);

            const treeLayout = tree().size([dimensions.height - 50, dimensions.width - 160])
                .nodeSize([20, 120]);
            const updatedRoot = treeLayout(root);
            setRoot(updatedRoot);

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

            const nodes = g.selectAll(".node")
                .data(updatedRoot.descendants())
                .enter()
                .append("g")
                .attr("class", "node")
                .attr("transform", d => `translate(${d.y},${d.x})`)
                .on("click", click);

            nodes.append("circle")
                .attr("r", 7)
                .attr("fill", d => d._children ? "#3bebeb" : "#fff")
                .attr("stroke-width", 10)
                .attr("stroke", d => d.children ? "#3bebeb" : "#fff");

            nodes.append("svg:image")
                .attr("xlink:href", d => d.data.icon.img)
                .attr("x", -8)
                .attr("y", -8)
                .attr("width", 16)
                .attr("height", 16)
                .attr("class", "node");

            nodes.append("text")
                .attr("font-size", 12)
                .attr("font-family", "sans-serif")
                .attr("text-anchor", d => d.data.children || d.data.children ? "middle" : "start")
                .attr("x", d => d.data.children || d.data.children ? 0 : 12)
                .attr("y", d => d.data.children || d.data.children ? -10 : 6)
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
        }
    }, [root, dimensions]);
    function click(event, d) {
        if (d.children) {
            d._children = d.children;
            d.children = null;
        } else {
            d.children = d._children;
            d._children = null;
        }
        setRoot(d);
    }
    function diagonal(s, d) {
        let path = `M ${s?.y} ${s?.x}
          C ${(s?.y + d?.y) / 2} ${s?.x}
            ${(s?.y + d?.y) / 2} ${d?.x}
            ${d?.y} ${d?.x}`;
        return path;
    }


    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    );
};

export default D3Tree;
