import React, { useContext, useState } from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import storeContext from '../store/store';
import './output.css'
const Output = () => {
    const storeCtx=useContext(storeContext)
    const [key, setKey] = useState('home');
  return (
    <div className='output'>
    <h3>Response</h3>
    <div className='output-Status'>
        <div>Status: <span>{storeCtx.response!==null&&storeCtx.response.status}</span></div>
        <div>Time: <span>2</span>ms</div>
        <div>Size: <span>200</span></div>
    </div>
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="home" title="Body">
        
      </Tab>
      <Tab eventKey="profile" title="Header">
        {storeCtx.response!==null&&Object.entries(storeCtx.response.headers).map((element)=><div><span>{element[0]}</span><span>{element[1]}</span></div>)}
        
      </Tab>
      
    </Tabs>
    </div>
  )
}

export default Output