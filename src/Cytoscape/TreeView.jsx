import React, { useEffect, useRef, useState } from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import dagre from 'cytoscape-dagre'
import cytoscape from 'cytoscape';
cytoscape.use(dagre);
const data = {
    "name": "internet",
    "children": [
        {

            "children": [
                {
                    "filter_type": "region",
                    "name": "global",
                    "collapsed": "true",
                    "children": [
                        {
                            "children": [
                                {
                                    "name": "gcp_logging_bucket",
                                    "collapsed": "true",
                                    "filter_type": "resource_type",
                                    "id": "232a5477d77c40099767ab9a14c2758a"
                                },
                                {
                                    "name": "gcp_compute_network",
                                    "collapsed": "true",
                                    "filter_type": "resource_type",
                                    "id": "1b78c3c444a74fd587acd288a0d75617"
                                },
                                {
                                    "name": "gcp_compute_project_metadata",
                                    "collapsed": "true",
                                    "filter_type": "resource_type",
                                    "id": "7211ed48bfd240fdb475b2d9d26628ac"
                                },
                                {
                                    "name": "gcp_compute_image",
                                    "collapsed": "true",
                                    "filter_type": "resource_type",
                                    "id": "4b38dbc39e0f420dbb2a0dcaf843c761"
                                }
                            ],
                            "filter_type": "integration_id",
                            "name": "bamboo-weft-375813",
                            "collapsed": "true",
                            "id": "f2389beb283f406387275ef8aea83b09"
                        }
                    ],
                    "id": "761db3ae00a64cd89da978a5ff1a6596"
                }
            ],
            "filter_type": "integration_type",
            "name": "gcp",
            "collapsed": "true",
            "id": "739c6187c8014cbfb8f4b14e37f6dac9"
        },
        {

            "children": [
                {
                    "filter_type": "region",
                    "name": "global",
                    "collapsed": "true",
                    "children": [
                        {
                            "children": [
                                {
                                    "name": "gcp_logging_bucket",
                                    "collapsed": "true",
                                    "filter_type": "resource_type",
                                    "id": "232a5477d77c40099767ab9a14c2758a"
                                },
                                {
                                    "name": "gcp_compute_network",
                                    "collapsed": "true",
                                    "filter_type": "resource_type",
                                    "id": "1b78c3c444a74fd587acd288a0d75617"
                                },
                                {
                                    "name": "gcp_compute_project_metadata",
                                    "collapsed": "true",
                                    "filter_type": "resource_type",
                                    "id": "7211ed48bfd240fdb475b2d9d26628ac"
                                },
                                {
                                    "name": "gcp_compute_image",
                                    "collapsed": "true",
                                    "filter_type": "resource_type",
                                    "id": "4b38dbc39e0f420dbb2a0dcaf843c761"
                                }
                            ],
                            "filter_type": "integration_id",
                            "name": "bamboo-weft-375813",
                            "collapsed": "true",
                            "id": "f2389beb283f406387275ef8aea83b09"
                        }
                    ],
                    "id": "761db3ae00a64cd89da978a5ff1a6596"
                }
            ],
            "filter_type": "integration_type",
            "name": "gcp",
            "collapsed": "true",
            "id": "739c6187c8014cbfb8f4b14e37f6dac9"
        }
    ],
    "height": 0,
    "depth": 0,
    "parent": null
}
const TreeView = () => {
    const [elements, setElements] = useState([]);
    const cyRef = useRef(null);

    const layout = {
        name: 'dagre',
        fit: true,
        nodeDimensionsIncludeLabels: true,
        rankDir: 'LR',
        ranker: 'longest-path',
        // spacingFactor: 1.25,
        nodeSep: 10,
        rankSep: 10,
        // padding: 10,
        animate: true,
        animationDuration: 500,
        animationEasing: 'ease-in-out',
    };

    const convertDataToElements = (data) => {
        const elements = [];

        const getNodeCount = (children) => {
            let count = 0;
            children.forEach((child) => {
                count++;
                if (child.children) {
                    count += getNodeCount(child.children);
                }
            });
            return count;
        };

        const addNodesAndEdges = (parent, children, centerX, centerY) => {
            const nodeCount = getNodeCount(children);
            let angle = 0;

            children.forEach((child) => {
                const nodeId = child.id || `node-${Math.random()}`; // You can use a unique identifier here
                const edgeId = `edge-${parent}-${nodeId}`;

                // Calculate the position of the child node in a circle
                const radius = 150; // Adjust this value for the radius of the circle
                const nodeX = centerX + radius * Math.cos((2 * Math.PI * angle) / nodeCount);
                const nodeY = centerY + radius * Math.sin((2 * Math.PI * angle) / nodeCount);

                // Add node
                const nodeData = {
                    id: nodeId,
                    label: child.name,
                    position: { x: nodeX, y: nodeY },
                };

                elements.push({
                    data: nodeData,
                });

                // Add edge
                elements.push({
                    data: { id: edgeId, source: parent, target: nodeId },
                });

                angle += (2 * Math.PI) / nodeCount;

                // Recursively add child nodes and edges
                if (child.children) {
                    addNodesAndEdges(nodeId, child.children, nodeX, nodeY);
                }
            });
        };

        elements.push({
            data: { id: 'root', label: data.name },
        });

        // Set the root node at the center
        const centerX = 0;
        const centerY = 0;

        // Add edges and nodes recursively
        addNodesAndEdges('root', data.children, centerX, centerY);

        return elements;
    };
    const handleNodeClick = (event) => {
        const node = event.target;
        const cy = cyRef.current; // Access the cy instance from the ref

        if (cy && node.children()) { // Ensure cy is not null
            node.children().toggleClass('hidden'); // Toggle a class to hide/show children
            cy.layout(layout).run(); // Re-run the layout
        }
    };
    const styles = [
        {
            selector: 'node',
            style: {
                width: 10,
                height: 10,
                label: 'data(label)',
                backgroundColor: '#3bb3e2',
                "font-size": "10px",
                "text-halign": "center",
                "text-wrap": "wrap",
            }
        },
        {
            selector: 'edge',
            style: {
                width: 1,
                lineColor: '#3bebeb',

            }
        }
    ]

    useEffect(() => {
        const cyElements = convertDataToElements(data);
        setElements(cyElements);
    }, []);

    return (
        <div style={{ height: '600px' }}>
            {
                elements.length > 0 && <CytoscapeComponent
                    stylesheet={styles}
                    styleEnabled={true}
                    elements={elements} style={{ width: '100%', height: '100%' }} layout={layout}
                    cy={(cy) => {
                        cy.on('click', 'node', handleNodeClick);
                        cyRef.current = cy;
                    }}
                />
            }
        </div>
    );
};

export default TreeView;
