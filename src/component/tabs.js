import React, { useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Request from './request'
import "./tabs.css";
function TabsContainer() {
  const [key, setKey] = useState("home");
  const [params, setParams] = useState({0:{key:'',value:''}});
  const [header, setHeader] = useState({0:{key:'',value:''}});
  const [Json, setJson] =useState('{\n\t\n}')
  function addHandler() {
    let size = Object.keys(params).length;
    if (size !== 0) {
      const keys = Object.keys(params);
      const lastKey = keys[keys.length - 1];
      size = lastKey + 1;
    }
    setParams({
      ...params,
      [size]: { key: "", value: "" },
    });
  }

  function changeKey(e, key) {
    params[key].key = e.target.value;
    setParams({ ...params });
  }

  function changeValue(e, key) {
    params[key].value = e.target.value;
    setParams({ ...params });
  }

  function removeHandler(key) {
    delete params[key];
    setParams({ ...params });
  }
  function addHeaderHandler() {
    let size = Object.keys(header).length;
    if (size !== 0) {
      const keys = Object.keys(header);
      const lastKey = keys[keys.length - 1];
      size = lastKey + 1;
    }
    setHeader({
      ...header,
      [size]: { key: "", value: "" },
    });
  }

  function changeHeaderKey(e, key) {
    header[key].key = e.target.value;
    setHeader({ ...header });
  }

  function changeHeaderValue(e, key) {
    header[key].value = e.target.value;
    setHeader({ ...header });
  }

  function removeHeaderHandler(key) {
    delete header[key];
    setHeader({ ...header });
  }
  const onChange = React.useCallback((value, viewUpdate) => {
    setJson(value);
  }, []);
  return (
    <div className="tab-container">
    <Request params={params} header={header} Json={Json}/> 
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="home" title="Params">
        <div className="form-container">
          {Object.keys(params).map((key, idx) => {
            return (
              <div className="key-values" key={idx}>
                <Form.Control
                
                  onChange={(e) => changeKey(e, key)}
                  value={params[key].key}
                  type="text"
                  placeholder="Key"
                />
                <Form.Control
                  type="text"
                  placeholder="Value"
                  onChange={(e) => changeValue(e, key)}
                  value={params[key].value}
                />
                <Button
                  variant="outline-danger"
                  onClick={() => removeHandler(key)}
                >
                  Remove
                </Button>
                <br />
              </div>
            );
          })}
        </div>
        <Button variant="outline-success" onClick={addHandler}>
          Add
        </Button>
      </Tab>
      <Tab eventKey="profile" title="Header">
      <div className="form-container">
          {Object.keys(header).map((key, idx) => {
            return (
              <div className="key-values" key={idx}>
                <Form.Control
                
                  onChange={(e) => changeHeaderKey(e, key)}
                  value={header[key].key}
                  type="text"
                  placeholder="Key"
                />
                <Form.Control
                  type="text"
                  placeholder="Value"
                  onChange={(e) => changeHeaderValue(e, key)}
                  value={header[key].value}
                />
                <Button
                  variant="outline-danger"
                  onClick={() => removeHeaderHandler(key)}
                >
                  Remove
                </Button>
                <br />
              </div>
            );
          })}
        </div>
        <Button variant="outline-success" onClick={addHeaderHandler}>
          Add
        </Button>
      </Tab>
      <Tab eventKey="JSON" title="JSON">
      <div className="code-mirror">
        <CodeMirror
            value={Json}
            height="400px"
            extensions={[json({ jsx: true })]}
            onChange={onChange}
          />
      </div>
      
      </Tab>
    </Tabs></div>
    
  );
}

export default TabsContainer;
