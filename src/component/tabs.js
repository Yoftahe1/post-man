import React, { useContext, useState } from "react";
import CodeMirror from "@uiw/react-codemirror";
import { json } from "@codemirror/lang-json";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "bootstrap/dist/css/bootstrap.min.css";
import Request from "./request";
import "./tabs.css";
import storeContext from "../store/store";
function TabsContainer() {
  const storeCtx = useContext(storeContext);
  const [key, setKey] = useState("home");
  function addHandler() {
    let size = Object.keys(storeCtx.requests[storeCtx.selectedRequest].param).length;
    if (size !== 0) {
      const keys = Object.keys(storeCtx.requests[storeCtx.selectedRequest].param);
      const lastKey = keys[keys.length - 1];
      size = lastKey + 1;
    }
    Object.assign(storeCtx.requests[storeCtx.selectedRequest].param, {
      [size]: { key: "", value: "" },
    });
    storeCtx.setRequestsHandler({ ...storeCtx.requests });
  }
  function changeKey(e, key) {
    storeCtx.requests[storeCtx.selectedRequest].param[key].key = e.target.value;
    storeCtx.setRequestsHandler({ ...storeCtx.requests });
  }
  function changeValue(e, key) {
    storeCtx.requests[storeCtx.selectedRequest].param[key].value = e.target.value;
    storeCtx.setRequestsHandler({ ...storeCtx.requests });
  }
  function removeHandler(key) {
    delete storeCtx.requests[storeCtx.selectedRequest].param[key];
    storeCtx.setRequestsHandler({ ...storeCtx.requests });
  }
  function addHeaderHandler() {
    let size = Object.keys(storeCtx.requests[storeCtx.selectedRequest].header).length;
    if (size !== 0) {
      const keys = Object.keys(storeCtx.requests[storeCtx.selectedRequest].header);
      const lastKey = keys[keys.length - 1];
      size = lastKey + 1;
    }
    Object.assign(storeCtx.requests[storeCtx.selectedRequest].header, {
      [size]: { key: "", value: "" },
    });
    storeCtx.setRequestsHandler({ ...storeCtx.requests });
  }
  function changeHeaderKey(e, key) {
    storeCtx.requests[storeCtx.selectedRequest].header[key].key = e.target.value;
    storeCtx.setRequestsHandler({ ...storeCtx.requests });
  }
  function changeHeaderValue(e, key) {
    storeCtx.requests[storeCtx.selectedRequest].header[key].value = e.target.value;
    storeCtx.setRequestsHandler({ ...storeCtx.requests });
  }
  function removeHeaderHandler(key) {
    delete storeCtx.requests[storeCtx.selectedRequest].header[key];
    storeCtx.setRequestsHandler({ ...storeCtx.requests });
  }
  const jsonHandler = React.useCallback(
    (value, viewUpdate) => {
      storeCtx.requests[storeCtx.selectedRequest].json = value;
      storeCtx.setRequestsHandler({ ...storeCtx.requests });
    },
    [storeCtx]
  );
  return (
    <div className="tab-container">
      <Request
        params={storeCtx.requests[storeCtx.selectedRequest].param}
        header={storeCtx.requests[storeCtx.selectedRequest].header}
        Json={storeCtx.requests[storeCtx.selectedRequest].json}
      />
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className="mb-3"
      >
        <Tab eventKey="home" title="Params">
          <div className="form-container">
            {Object.keys(storeCtx.requests[storeCtx.selectedRequest].param).map((key, idx) => {
              return (
                <div className="key-values" key={idx}>
                  <Form.Control
                    onChange={(e) => changeKey(e, key)}
                    value={storeCtx.requests[storeCtx.selectedRequest].param[key].key}
                    type="text"
                    placeholder="Key"
                  />
                  <Form.Control
                    type="text"
                    placeholder="Value"
                    onChange={(e) => changeValue(e, key)}
                    value={storeCtx.requests[storeCtx.selectedRequest].param[key].value}
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
          <Button variant="outline-success" onClick={addHandler} >
             Add  
          </Button>
        </Tab>
        <Tab eventKey="profile" title="Header">
          <div className="form-container">
            {Object.keys(storeCtx.requests[storeCtx.selectedRequest].header).map((key, idx) => {
              return (
                <div className="key-values" key={idx}>
                  <Form.Control
                    onChange={(e) => changeHeaderKey(e, key)}
                    value={storeCtx.requests[storeCtx.selectedRequest].header[key].key}
                    type="text"
                    placeholder="Key"
                  />
                  <Form.Control
                    type="text"
                    placeholder="Value"
                    onChange={(e) => changeHeaderValue(e, key)}
                    value={storeCtx.requests[storeCtx.selectedRequest].header[key].value}
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
              value={storeCtx.requests[storeCtx.selectedRequest].json}
              height="300px"
              option={{ readOnly: true }}
              extensions={[json()]}
              onChange={jsonHandler}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}

export default TabsContainer;
