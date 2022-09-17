import React, { useState, useContext, useRef, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./request.css";
import storeContext from "../store/store";
const Request = (props) => {
  const [isEmpty, setIsEmpty] = useState(false);
  const storeCtx = useContext(storeContext);
  const [input, setInput] = useState("");
  const methodRef = useRef("");
  useEffect(() => {
    setInput(storeCtx.requests[storeCtx.selectedRequest].url);
  }, [storeCtx.selectedRequest, storeCtx.requests]);
  const handleChange = (event) => {
    storeCtx.requests[storeCtx.selectedRequest].url = event.target.value;
    setInput(event.target.value);
    storeCtx.setRequestsHandler({ ...storeCtx.requests });
  };
  function submitHandler(event) {
    event.preventDefault();
    if (input.trim().length === 0) setIsEmpty(true);
    else {
      try {
        setIsEmpty(false);
        let data;
        if(methodRef.current.value!=='DELETE'||methodRef.current.value!=='GET'){data = JSON.parse(props.Json);}
        
        storeCtx.isLoadingHandler(true);
        const startTime = new Date().getTime();
        let params = Object.values(props.params)
          .map((element) => element)
          .reduce((acc, cur) => ({ ...acc, [cur.key]: cur.value }), {});
        let header = Object.values(props.header)
          .map((element) => element)
          .reduce((acc, cur) => ({ ...acc, [cur.key]: cur.value }), {});
        axios({
          url: input,
          method: methodRef.current.value,
          params: params,
          header: header,
          data: data,
        })
          .then((response) => {
            storeCtx.requests[storeCtx.selectedRequest].output = response;
            storeCtx.requests[storeCtx.selectedRequest].time =
              new Date().getTime() - startTime;
            storeCtx.setRequestsHandler({ ...storeCtx.requests });
            storeCtx.isLoadingHandler(false);
          })
          .catch((e) => {
            storeCtx.requests[storeCtx.selectedRequest].output = e.response;
            storeCtx.requests[storeCtx.selectedRequest].time =
              new Date().getTime() - startTime;
            storeCtx.setRequestsHandler({ ...storeCtx.requests });
            storeCtx.isLoadingHandler(false);
          });
      } catch (err) {
        alert("input is not JSON format");
        console.log(err);
      }
    }
  }
  return (
    <div className="request-container">
      <Form.Select ref={methodRef} size="lg">
        <option className="option">GET</option>
        <option className="option">POST</option>
        <option className="option">PUT</option>
        <option className="option">PATCH</option>
        <option className="option">DELETE</option>
      </Form.Select>
      <form onSubmit={submitHandler} className="form">
        <Form.Control
          onChange={handleChange}
          value={input}
          type="url"
          placeholder={!isEmpty ? "https://example.com" : "URL is required"}
          className={isEmpty && "validation"}
          size="lg"
          required="required"
        />
        <Button variant="primary" onClick={submitHandler} >
          Send
        </Button>
      </form>

      <br />
    </div>
  );
};

export default Request;
