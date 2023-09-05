import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
import fcose from 'cytoscape-fcose'; // Import the fcose layout
cytoscape.use(fcose);
import { dummyData } from './DummyData';

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


    // const cytoscapeData = ;
    // console.log(cytoscapeData);

    useEffect(() => {
        const cy = cytoscape({
            container: ref.current,
            elements: jsonData,
            style: [
                {
                    selector: 'node',
                    style: {
                        width: 15,
                        height: 15,
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
                    },
                },
            ],
            zoom: 0.2,
            minZoom: 1,
            maxZoom: 2,
            wheelSensitivity: 0.2,
        });

        cy.layout({
            name: 'fcose',
            gravityRange: 3.8,
            nodeRepulsion: 5500,
            idealEdgeLength: 100,
            edgeElasticity: 0.45,
            nestingFactor: 0.1,
            gravityCompound: 1.0,
            gravityRangeCompound: 1.5,
            initialEnergyOnIncremental: 0.3,
            coolingFactor: 0.3,
            tile: true,
            tilingPaddingVertical: 10,
            tilingPaddingHorizontal: 10,
            tilingPaddingRatio: 0.02,


        }).run();
    }, [jsonData]);

    return (
        <div>
            <div className='mx-2 h-[80vh]' ref={ref}></div>
        </div>
    );
};

export default Graph;
