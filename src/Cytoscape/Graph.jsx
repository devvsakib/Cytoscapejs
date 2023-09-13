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
    // const iconBaseUrl = "http://localhost:5173/"

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
        jsontocystocape(dummyData)
    }, [])

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
    const getRandomWidth = () => {
        // Generate a random width between, for example, 20 and 100
        return Math.random() * 30
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
                "background-color": "red",
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
        console.log(e.target.id());
    };
    const handleZooming = e => {
        e.preventDefault();
        if (e.originalEvent.deltaY > 0) {
            cy.zoom({
                level: cy.zoom() - 0.1,
                renderedPosition: e.renderedPosition
            });
        } else {
            cy.zoom({
                level: cy.zoom() + 0.1,
                renderedPosition: e.renderedPosition
            });
        }
    }
    return (
        <div>
            {
                data &&
                <CytoscapeComponent
                    cy={(cy) => {
                        cy.on("dblclick", handleClicked);
                        cy.on('wheel', handleZooming);
                        cy.nodes().forEach((node) => {
                            const hasChild = node.connectedEdges().length > 4;
                            const size = Math.random() * (hasChild ? 10 : 20) + 30;
                            node.style({
                                width: 30,
                                height: 30,
                                // backgroundColor: hasChild ? "orange" : "green",
                                "background-image": node => {
                                    if (node.data("label") == "ec2 target group" && !node.isParent()) {
                                        console.log(node.parent());
                                        return "/aws_ec2_target_group.svg"
                                    }
                                    if (node.data("label") == "ec2 instance" && node.connectedEdges().length < 4) {
                                        return "/aws_ec2_instance.svg"
                                    }
                                    return "/" + node.data("icon")
                                },
                                "background-fit": "cover",
                                shape: "square",
                                "background-size": "contain",
                                "background-opacity": 0,
                            });
                        })
                    }}
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
