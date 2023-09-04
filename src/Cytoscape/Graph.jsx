import React, { useEffect, useRef, useState } from 'react';
import cytoscape from 'cytoscape';

const optionImages = {
    'A': '/vite.svg',
    'B': '/react.svg',
    'T': '/react.svg',
    'C': '/vite.svg',
    'F': '/vite.svg',
    'D': '/react.svg',
};

const Graph = () => {
    const ref = useRef(null);
    const cy = useRef(null);
    const [selectedNodeLabel, setSelectedNodeLabel] = useState('');
    const [secondSelect, setSecondSelect] = useState('');
    const [currentParentNode, setCurrentParentNode] = useState('Internet');
    const [parentNodeForB, setParentNodeForB] = useState('Internet'); // Maintain parent node for "B"

    useEffect(() => {
        // Initialize Cytoscape
        cy.current = cytoscape({
            container: ref.current,
            elements: {
                nodes: [
                    { data: { id: 'Internet', label: 'Internet' } }
                ],
                edges: [],
            },
            style: [
                {
                    selector: 'node',
                    style: {
                        width: 15,
                        height: 15,
                        label: 'data(label)',
                        'background-opacity': 0,
                        'font-size': '10px',
                        'background-image': node => node.data('background-image') || "url('https://js.cytoscape.org/img/cytoscape-logo.png')",
                        'background-size': 'contain',
                        'background-fit': 'cover',
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
            maxZoom: 3,
            wheelSensitivity: 0.2,
        });

        cy.current.on('click', 'node', (event) => {
            const node = event.target;
            node.addClass('faded');
            console.log(node.roots([currentParentNode]));
        });

        cy.current.layout({ name: 'cose' });

    }, []);

    const handleAddNode = (value) => {
        value === "B" && setSelectedNodeLabel(value);
        if (!cy.current) return;

        // Check if a node label is valid and already selected
        const isValidLabel = value && optionImages[value];

        if (isValidLabel) {
            const newNodeId = `n${cy.current.nodes().length}`;
            const selectedOptionImageUrl = optionImages[value];
            const newNode = {
                data: {
                    id: newNodeId,
                    label: value,
                    backgroundColor: 'transparent',
                    'background-image': selectedOptionImageUrl,
                    'background-fit': 'cover',
                },
            };

            if (value === 'B') {
                cy.current.add(newNode);
                cy.current.add({ data: { source: 'Internet', target: newNodeId } });
                setParentNodeForB(newNodeId);
            } else if (parentNodeForB === 'Internet') {
                cy.current.add(newNode);
                cy.current.add({ data: { source: 'Internet', target: newNodeId } });
            } else {
                cy.current.add(newNode);
                cy.current.add({ data: { source: parentNodeForB, target: newNodeId } });
            }

            cy.current.layout({
                name: 'cose',
                spacingFactor: 0.2,
                nodeSpacing: 10,
            }).run();
        }
    };

    return (
        <div>
            <div className='px-2 pb-2'>
                <select
                    className='px-2 py-1 border border-gray-300 rounded-md'
                    value={selectedNodeLabel}
                    onChange={(e) => handleAddNode(e.target.value)}
                >
                    <option value=''>Select a node label</option>
                    <option value='A'>A</option>
                    <option value='B'>B</option>
                    <option value='C'>C</option>
                </select>
                {selectedNodeLabel === "B" && (
                    <select
                        className='px-2 py-1 border border-gray-300 rounded-md'
                        value={secondSelect}
                        onChange={(e) => {
                            setSecondSelect(e.target.value);
                            handleAddNode(e.target.value);
                        }}
                    >
                        <option value=''>{secondSelect || "B Node"}</option>
                        <option value='F'>F</option>
                        <option value='T'>T</option>
                    </select>
                )}
            </div>
            <div className='mx-2 h-[80vh]' ref={ref}></div>
        </div>
    );
};

export default Graph;
