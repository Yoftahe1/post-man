import React, { useContext, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import storeContext from "../store/store";
import "./output.css"; 
const Output = () => {
  const storeCtx = useContext(storeContext);
  const [key, setKey] = useState("home");

  return storeCtx.isLoading ? (
    <div className="loading">
      <h3>Response</h3>
      <div className="output-Status">
        <div>
          Status: <span><Skeleton width={30} /></span>
        </div>
        <div style={{ marginLeft: "10px" }}>
          Time: <span><Skeleton width={30} /></span>
        </div>
      </div>
      <Skeleton height={40}/>
      <Skeleton height={300} />
    </div>
  ) : storeCtx.requests[storeCtx.selectedRequest].output === null ? (
    <div>
      <img src={require("../img/send.jpg")} alt="send" className="send" />
    </div>
  ) : (
    <div className="output">
      <h3>Response</h3>
      <div className="output-Status">
        <div>
          Status: <span className={storeCtx.requests[storeCtx.selectedRequest].output.status >= 400 ? "error" : "success"}>
            {storeCtx.requests[storeCtx.selectedRequest].output.status}
          </span>
        </div>
        <div style={{ marginLeft: "10px" }}>
          Time: <span>{storeCtx.requests[storeCtx.selectedRequest].time}</span>ms
        </div>
      </div>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="home" title="Body">
          <div className="mirror" >
            <CodeMirror
              value={
                storeCtx.requests[storeCtx.selectedRequest].output.status <= 400
                  ? JSON.stringify(storeCtx.requests[storeCtx.selectedRequest].output.data, null, 2)
                  : "URL not found"
              }
              //height="300px"
              extensions={[json()]}
              readOnly={true}
              
            />
          </div>
        </Tab>
        <Tab eventKey="profile" title="Header">
        <div className="output-header-container">
          {Object.entries(storeCtx.requests[storeCtx.selectedRequest].output.headers).map((element, index) => (
            <div className="output-tab" key={index}>
              <div className="output-header-key">{element[0]}</div>
              <div className="output-header-value">{element[1]}</div>
            </div>
          ))}
        </div>
          
        </Tab>
      </Tabs>
    </div>
  );
};

export default Output;
