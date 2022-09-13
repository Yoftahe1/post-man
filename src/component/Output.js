import React, { useContext, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import storeContext from "../store/store";
import "./output.css";
const Output = () => {
  const storeCtx = useContext(storeContext);
  const [key, setKey] = useState("home");
  
  return (
    storeCtx.isLoading?<h3>loading...</h3>:storeCtx.response===null?<div><img src={require('../img/send.jpg')} alt="send" className="send"/></div>:<div className="output">
      <h3>Response</h3>
      <div className="output-Status">
        <div>
          Status:{" "}
          <span className={storeCtx.response.status>=400?"error":"success"}>{storeCtx.response !== null && storeCtx.response.status}</span>
        </div>
        <div style={{marginLeft:"10px"}}>
          Time: <span>{storeCtx.time}</span>ms
        </div>
      </div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="home" title="Body">
        <div style={{border: "1px solid rgb(189, 186, 186)"}}>
          <CodeMirror
            value={JSON.stringify(storeCtx.response.data)}
            height="300px"
            extensions={[json()]}
          />
        </div>
          
        </Tab>
        <Tab eventKey="profile" title="Header">
          {/* {storeCtx.response !== null && */}{
            Object.entries(storeCtx.response.headers).map((element,index) => (
              <div className="output-tab" key={index}>
                <div className="output-header-key">{element[0]}</div>
                <div className="output-header-value">{element[1]}</div>
              </div>
            ))}
        </Tab>
      </Tabs>
    </div>
  );
};

export default Output;
