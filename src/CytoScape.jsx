import React from 'react'
import Graph from './Cytoscape/Graph'
import TreeView from './Cytoscape/TreeView'

const App = () => {
  return (
    <div>
        <h1 className='py-2 text-center'>Cytoscape</h1>
        <Graph />
        <TreeView />
    </div>
  )
}

export default App