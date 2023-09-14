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
            quality: "default",
            // Use random node positions at beginning of layout
            // if this is set to false, then quality option must be "proof"
            randomize: true,
            fit: true,
            // Padding around layout
            padding: 30,
            // Whether to include labels in node dimensions. Valid in "proof" quality
            nodeDimensionsIncludeLabels: false,
            // Whether or not simple nodes (non-compound nodes) are of uniform dimensions
            uniformNodeDimensions: true,
            // Whether to pack disconnected components - cytoscape-layout-utilities extension should be registered and initialized
            packComponents: false,
            step: "all",
            // Separation amount between nodes
            nodeSeparation: 1,
            // Node repulsion (non overlapping) multiplier
            nodeRepulsion: node => 100000,
            // Ideal edge (non nested) length
            idealEdgeLength: edge => 50,
            // Divisor to compute edge forces
            edgeElasticity:1,
            numIter: 2500,
            nestingFactor: .1,
            // For enabling tiling
            tile: true,
            // Represents the amount of the vertical space to put between the zero degree members during the tiling operation(can also be a function)
            tilingPaddingVertical: 10,
            // Represents the amount of the horizontal space to put between the zero degree members during the tiling operation(can also be a function)
            tilingPaddingHorizontal: 10,
            // Gravity force (constant)
            gravity: 0.50,
            // Gravity range (constant) for compounds
            gravityRangeCompound: 1.5,
            // Gravity force (constant) for compounds
            gravityCompound: 1.0,
            // Gravity range (constant)
            gravityRange: 10,
            // Initial cooling factor for incremental layout  
            initialEnergyOnIncremental: 0.3,
            fixedNodeConstraint: undefined,
            alignmentConstraint: undefined,
            relativePlacementConstraint: undefined,
            ready: () => { }, // on layoutready
            stop: () => { } // on layoutstop
        }
    };
    const cytoStyles = [
        {
            selector: 'edge',
            style: {
                width: 1,
                lineColor: '#9b6b8b',
                'overlay-opacity': 0,
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
        if (clickedNode.isParent()) {
            const immediateChildren = clickedNode.children();
            if (immediateChildren.length) {
                const childVisible = immediateChildren.style("display") === "element";
                immediateChildren.visible(!childVisible);
                const childEdges = immediateChildren.connectedEdges();
                childEdges.visible(!childVisible);

                if (childVisible) {
                    immediateChildren.style("display", "none");
                } else {
                    immediateChildren.style("display", "element");
                }
            } else {
                const nestedParents = clickedNode.descendants(":parent");
                const nestedParentVisible = nestedParents.style("display") === "element";
                nestedParents.visible(!nestedParentVisible);
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
            const layoutProperties = {
                nodeRepulsion: node => 100000,
                idealEdgeLength: edge => 100,

            };
        
            // Apply the modified layout properties and run the layout
            e.cy.layout({ ...layouts["fcose"], ...layoutProperties }).run();
        }
    };

    const determineBackgroundImage = node => {
        const label = node.data("label");
        if (label === "ec2 instance" && !node.descendants(":visible").nonempty()) {
            return "/aws_ec2_instance.svg";
        }
        if (label === "ec2 target group" && !node.descendants(":visible").nonempty()) {
            return "/aws_ec2_target_group.svg";
        }
        if (label === "ec2 application load balancer" && !node.descendants(":visible").nonempty()) {
            return "/aws_ec2_application_load_balancer.svg";
        }
        return "/" + node.data("icon");
    };

    return (
        <div className='w-full'>
            {
                data &&
                <CytoscapeComponent
                    cy={(cy) => {
                        cy.on("dblclick", handleClicked);
                        cy.nodes().forEach((node) => {
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
                    zoomingEnabled={true}
                    userZoomingEnabled={true}
                    minZoom={.5}
                    layout={layouts["fcose"]}
                    className='mx-2 h-[80vh]'
                    stylesheet={cytoStyles}
                />
            }
        </div>
    );
};

export default Graph;
