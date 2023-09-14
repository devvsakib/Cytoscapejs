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
    const ref = useRef(null);
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
                "background-image": node => {
                    if (node.data("label") == "ec2 target group" && !node.isParent()) {
                        return "/aws_ec2_target_group.svg"
                    }
                    if (node.data("label") == "ec2 application load balancer") {
                        return "/aws_ec2_application_load_balancer.svg"
                    }
                    if (node.data("label") == "ec2 instance") {
                        if (node.every(child => child.style('display') === 'none')) {
                            return "/aws_ec2_application_load_balancer.svg"
                        }
                        return "/aws_ec2_instance.svg"
                    }
                    return "/" + node.data("icon")
                },
                "background-fit": "cover",
                shape: "square",
                "background-size": "contain",
                "background-opacity": 0,
                'overlay-opacity': 0
            }
        },
        {
            selector: ":parent",
            style: {
                "background-opacity": 0.2,
                "background-color": "green"
            }
        },
        {
            selector: ".children-hidden",
            style: {
                "background-opacity": 0
            }
        }
    ]
    useEffect(() => {
        const cy = cytoscape({
            container: ref.current,
            elements: data,
            style: cytoStyles,
            minZoom: 0.1,
            maxZoom: 1.5,
            panningEnabled: true,
            wheelSensitivity: 0.2,
        });
        cy.on("dblclick", e => handleClicked(e, cy));
        cy.layout({
            name: 'fcose',
            animate: false,
            nodeDimensionsIncludeLabels: true,
        }).run();
    }, [data])

    const handleClicked = (e, cy) => {
        const clickedNode = e.target;
        if (clickedNode.isParent() && clickedNode.descendants().length > 0) {
            const childNodes = clickedNode.descendants();
            const childVisible = childNodes.style("display") === "element";
            childNodes.visible(!childVisible);
            const childEdges = childNodes.connectedEdges();
            childEdges.visible(!childVisible);
            if (childVisible) {
                childNodes.style("display", "none");
                clickedNode.removeClass("children-hidden");
            } else {
                childNodes.style("display", "element");
                clickedNode.addClass("children-hidden");
            }
        }
    };

    return (
        <div><div className='mx-2 h-[80vh]' ref={ref}></div></div>
    );
};

export default Graph;
