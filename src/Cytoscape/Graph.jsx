import React, { useEffect, useRef } from 'react';
import cytoscape from 'cytoscape';
import cola from 'cytoscape-cola';
cytoscape.use(cola);
import { dummyData } from './DummyData';



const Graph = () => {
    const ref = useRef(null);
    const baseUrl = "http://localhost:5173/"
    useEffect(() => {
        const cy = cytoscape({
            container: ref.current,
            elements: dummyData,
            style: [
                {
                    selector: 'node',
                    style: {
                        width: 15,
                        height: 15,
                        label: 'data(label)',
                        'font-size': '10px',
                        'background-fit': 'cover',
                        backgroundColor: 'transparent !important',
                        'background-image': node => `${baseUrl}${node.data('icon')}`,
                        'background-color': '#fff',
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
            name: 'cola', avoidOverlap: true,
            nodeSpacing: 30,
            rankSpacing: 6,
            edgeLengthVal: 45,
            animate: false,

        }).run();
    }, []);

    return (
        <div>
            <div className='mx-2 h-[80vh]' ref={ref}></div>
        </div>
    );
};

export default Graph;
