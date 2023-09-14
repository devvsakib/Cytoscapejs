import React, { useEffect, useRef, useState } from 'react';
import CytoscapeComponent from "react-cytoscapejs";
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import cola from 'cytoscape-cola';
import fcose from 'cytoscape-fcose';
cytoscape.use(fcose);
cytoscape.use(dagre);
cytoscape.use(cola);
// import { dummyData } from './ld';
// import { dummyData } from './DummyData';
import { dummyData } from './large-data-set';

const Graph = () => {
    const [cyto, setCyto] = useState(undefined);
    const [data, setData] = useState(null)
    function jsontocystocape(jsonData) {
        const nodes = jsonData.nodes.map(node => {
            const nodeData = { id: node._id, label: node.label };
            for (const key in node) {
                if (key !== '_id' && key !== 'label') {
                    nodeData[key] = node[key];
                }
            }
            return { data: nodeData };
        });
        const edges = jsonData.edges.map(edge => {
            const edgeData = { source: edge.source, target: edge.target };

            return { data: edgeData };
        });
        // add parent node, this dta has 4 parent node with parentId property
        const parentNodes = jsonData.nodes.filter(node => node.parentId);
        parentNodes.forEach(node => {
            const parentNode = {
                data: {
                    id: node._id,
                    label: node.label,
                    parentId: node.parentId
                }
            };
            nodes.push(parentNode);
        });
        // add parent edge

        setData([...nodes, ...edges, ...parentNodes])
    }
    useEffect(() => {
        jsontocystocape(dummyData);
    }, []);

    const layouts = {
        breadthfirst: {
            name: "breadthfirst"
        },
        cose: {
            name: "cose",
            animate: false
        },
        cola: {
            name: "cola",
            maxSimulationTime: 500,
            edgeLength: 70
        },
        dagre: {
            name: "dagre",
            avoidOverlap: true,
        },
        fcose: {
            name: "fcose",
            animate: false,
            nodeDimensionsIncludeLabels: true,
            edgeElasticity: 0.3,
            wheelSensitivity: .1,
        }
    };
    const cytoStyles = [
        {
            selector: 'edge',
            style: {
                width: 1,
                // lineColor: '#3beb2b',
                targetArrowShape: 'triangle',
                curveStyle: 'bezier',
                'overlay-opacity': 0,
                "target-arrow-shape": "triangle",
                "curve-style": "unbundled-bezier"
            },
        },
        {
            selector: 'node:selected',
            style: {
                'background-color': '#F08080',
                'border-color': 'red'
            }
        },
        {
            selector: 'edge:selected',
            style: {
                'line-color': '#F08080'
            }
        },
        {
            selector: "node",
            style: {
                label: "data(label)",
                'border-radius': '0',
                'overlay-opacity': 0
            }
        },
        {
            selector: ":parent",
            style: {
                "background-opacity": 0.2,
                "background-color": "green"
            }
        }
    ]
    const handleClicked = e => {
        const clickedNode = e.target;
        console.log(clickedNode.id());

        if (clickedNode.isParent()) {
            // Check if there are any immediate child nodes
            const immediateChildren = clickedNode.children();

            if (immediateChildren.length > 0) {
                // Toggle visibility of immediate children
                const childVisible = immediateChildren.style("display") === "element";
                immediateChildren.visible(!childVisible);

                // Toggle visibility of edges connected to immediate children
                const childEdges = immediateChildren.connectedEdges();
                childEdges.visible(!childVisible);

                if (childVisible) {
                    immediateChildren.style("display", "none");
                } else {
                    immediateChildren.style("display", "element");
                }
            } else {
                // No immediate children, expand nested parents if any
                const nestedParents = clickedNode.descendants(":parent");
                const nestedParentVisible = nestedParents.style("display") === "element";
                nestedParents.visible(!nestedParentVisible);

                // Toggle visibility of edges connected to nested parents
                const nestedParentEdges = nestedParents.connectedEdges();
                nestedParentEdges.visible(!nestedParentVisible);

                if (nestedParentVisible) {
                    nestedParents.style("display", "none");
                } else {
                    nestedParents.style("display", "element");
                }
            }
            const backgroundImage = determineBackgroundImage(clickedNode);
            clickedNode.style("background-image", backgroundImage);
        }
    };


    const determineBackgroundImage = node => {
        if (node.data("label") === "ec2 instance" && !node.descendants(":visible").nonempty()) {
            return "/aws_ec2_instance.svg";
        }
        if (node.data("label") === "ec2 target group" && !node.descendants(":visible").nonempty()) {
            return "/aws_ec2_target_group.svg";
        }
        if (node.data("label") === "ec2 application load balancer" && !node.descendants(":visible").nonempty()) {
            return "/aws_ec2_application_load_balancer.svg";
        }
        return "/" + node.data("icon");
    };
    return (
        <div>
            {
                data &&
                <CytoscapeComponent
                    cy={(cy) => {
                        cy.on("click", e => e.target.id);
                        cy.on("dblclick", handleClicked);
                        cy.nodes().forEach((node) => {
                            const hasChild = node.connectedEdges().length > 4;
                            const size = Math.random() * (hasChild ? 10 : 20) + 30;
                            node.style({
                                width: 30,
                                height: 30,
                                "background-image": node => {
                                    if (node.data("label") == "ec2 target group") {
                                        return "/aws_ec2_target_group.svg"
                                    }
                                    if (node.data("label") == "ec2 application load balancer") {
                                        return "/aws_ec2_application_load_balancer.svg"
                                    }
                                    if (node.data("label") == "ec2 instance") {
                                        return "/aws_ec2_instance.svg"
                                    }
                                    return "/" + node.data("icon")
                                },
                                "background-fit": "cover",
                                shape: "square",
                                "background-size": "contain",
                                "background-opacity": 0,

                            });
                        });
                        cy.nodes(':child').style('display', 'none');
                    }}
                    panningEnabled={true}
                    wheelSensitivity={0.2}
                    elements={data}
                    maxZoom={1.5}
                    minZoom={0.1}
                    layout={layouts["fcose"]}
                    className='mx-2 h-[80vh]'
                    stylesheet={cytoStyles}
                />
            }
            {/* <div className='mx-2 h-[80vh]' ref={ref}></div> */}
        </div>
    );
};

export default Graph;
