import './App.css';
import React, { useState, useEffect } from 'react';
import GenericForm from './components/GenericForm';

function App() {
  const [flows, setFlows] = useState([
    {
      name: 'Flow 1',
      config: 'workflow_first.json'
    },
    {
      name: 'Flow 2',
      config: 'workflow_second.json'
    },
    {
      name: 'Flow 3',
      config: 'workflow_3_config.json'
    },
    {
      name: 'Flow 4',
      config: 'workflow_4_config.json'
    },
    {
      name: 'Flow 5',
      config: 'workflow_5_config.json'
    }
  ])

  const [selectedFlow, setSelectedFlow] = useState({});

  return (
    <div className="App">
      <div className='container'>
        {!Object.keys(selectedFlow).length ?
          <>
            <div className='heading'>Workflow Demo App</div>
            <div className='subtitle'>Please select one of the flows</div>
            <div className='btnContainer'>
              {flows?.map(el => <div className='workflowBtns' onClick={() => setSelectedFlow(el)}>{el.name}</div>)}
            </div>
          </>
          : <GenericForm {...{ selectedFlow, setSelectedFlow}} />
        }

      </div>
    </div>
  );
}

export default App;
