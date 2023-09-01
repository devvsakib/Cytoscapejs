// src/Graph.js
import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';

const optionImages = {
    'A': '/vite.svg',
    'B': '/react.svg',
    'C': '/vite.svg',
    'D': '/react.svg',
};

const Graph = () => {
    const ref = useRef(null);
    const cy = useRef(null);
    const [selectedNodeLabel, setSelectedNodeLabel] = useState('');
    const selectedOptionImageUrl = optionImages[selectedNodeLabel];

    useEffect(() => {
        // Initialize Cytoscape
        cy.current = cytoscape({
            container: ref.current,
            elements: {
                nodes: [
                    { data: { id: 'Internet', label: 'Internet' } }, // Root node
                ],
                edges: [],
            },
            style: [
                // Styling for nodes and edges (you can customize this)
                {
                    selector: 'node',
                    style: {
                        width: 15,
                        height: 15,
                        label: 'data(label)',
                        backgroundColor: 'transparent',
                        "font-size": "10px",
                        'background-image': node => node.data('background-image') || "url('/vite.svg')",
                        'background-fit': 'cover',
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
            motionBlur: false,
            minZoom: 0.2,
            zoom: .4,
            maxZoom: 5,
        });

        cy.current.on('tap', 'node', (e) => {
            const node = e.target;
            console.log('Node tapped: ' + node.id());
        });
        cy.current.layout({
            name: 'grid',
            spacingFactor: 0.2,
            nodeSpacing: 20,
        }).run();
    }, []);

    const handleAddNode = () => {
        if (!cy.current) return;
        // Check if a node label is valid and already selected
        const isValidLabel = selectedNodeLabel && optionImages[selectedNodeLabel];

        if (isValidLabel) {
            const newNodeId = `n${cy.current.nodes().length}`;
            const selectedOptionImageUrl = optionImages[selectedNodeLabel]; // Calculate the image URL here
            const newNode = {
                data: {
                    id: newNodeId,
                    label: selectedNodeLabel,
                    backgroundColor: 'transparent',
                    'background-image': selectedOptionImageUrl,
                    'background-fit': 'cover',
                },
            };
            cy.current.add(newNode);
            cy.current.add({ data: { source: 'Internet', target: newNodeId } });
            cy.current.layout({
                name: 'cose',
                spacingFactor: 0.2,
                nodeSpacing: 10,
            }).run();

            setSelectedNodeLabel('');
        }
    };
    return (
        <div>
            <div>
                <select
                    value={selectedNodeLabel}
                    onChange={(e) => setSelectedNodeLabel(e.target.value)}
                >
                    <option value=''>Select a node label</option>
                    <option value='A'>Vite</option>
                    <option value='B'>React</option>
                    <option value='C'>Node C</option>
                    <option value='D'>Node D</option>
                </select>
                <button onClick={handleAddNode} className=''>Add Node</button>
            </div>
            <div className='w-[95vw] h-[100vh] mx-auto' ref={ref}></div>
        </div>
    );
};

export default Graph;
