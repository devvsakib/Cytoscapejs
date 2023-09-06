import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import dagre from 'cytoscape-dagre';
import cola from 'cytoscape-cola';
import fcose from 'cytoscape-fcose'; // Import the fcose layout
cytoscape.use(fcose);
cytoscape.use(dagre);
cytoscape.use(cola);
// import { dummyData } from './DummyData';

const Graph = () => {
    const ref = useRef(null);
    // const iconBaseUrl = "http://localhost:5173/"

    const [jsonData, setJsonData] = useState(null)
    useEffect(() => {
        fetch('/large-data-set.json')
            .then(res => res.json())
            .then(data => {
                jsontocystocape(data)
            })
    }, [])

    function jsontocystocape(jsonData) {
        const nodes = jsonData.nodes.map(node => {
            const nodeData = { id: node._id, label: node.label, group: "nodes" };
            for (const key in node) {
                if (key !== '_id' && key !== 'label') {
                    nodeData[key] = node[key];
                }
            }
            return { data: nodeData };
        });

        const edges = jsonData.edges.map(edge => {
            const edgeData = { source: edge.source, target: edge.target, group: "edges" };
            return { data: edgeData };
        });

        setJsonData([...nodes, ...edges])

    }

    useEffect(() => {
        const cy = cytoscape({
            container: ref.current,
            elements: jsonData,
            style: [
                {
                    selector: 'node',
                    style: {
                        width: Math.random() * 120 + 30,
                        height: Math.random() * 120 + 30,
                        label: 'data(label)',
                        'font-size': '10px',
                        'background-fit': 'contain',
                        'background-image': node => `/${node.data('icon')}`,
                        // backgroundColor: '#fff',
                        'border-radius': '0',
                        'overlay-opacity': 0,
                    },
                },
                {
                    selector: 'edge',
                    style: {
                        width: 1,
                        lineColor: '#3bebeb',
                        targetArrowColor: '#3bebeb',
                        targetArrowShape: 'triangle',
                        curveStyle: 'bezier',
                        'overlay-opacity': 0,
                    },
                },
            ],
            zoom: 0.2,
            minZoom: 1,
            maxZoom: 2,
            wheelSensitivity: 0.2,
        });
        cy.nodes().forEach(node => {
            const hasChild = node.connectedEdges().length > 4;
            const size = Math.random() * (hasChild ? 20 : 1) + 30;
            node.style({
                width: size,
                height: size,
                backgroundColor: hasChild ? "orange" : "green",
            });
        });
        cy.on('click', 'node', function (evt) {
            console.log('node clicked', evt.target.id());
        });

        cy.layout({
            name: 'fcose',
            // nodeDimensionsIncludeLabels: true,
            nodeRepulsion: 20000,
        }).run();
    }, [jsonData]);

    return (
        <div>
            <div className='mx-2 h-[80vh]' ref={ref}></div>
        </div>
    );
};

export default Graph;
