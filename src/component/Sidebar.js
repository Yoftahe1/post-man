import React, { useState, useRef, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import storeContext from "../store/store";
import "./sidebar.css";
const Sidebar = () => {
  const storeCtx = useContext(storeContext);
  const [placeholder, setPlaceholder] = useState("Enter Name");
  const nameRef = useRef(null);
  function addHandler(event) {
    event.preventDefault();
    if (
      nameRef.current.value.trim().length > 0 &&
      !Object.keys(storeCtx.requests).includes(nameRef.current.value)
    ) {
      if(storeCtx.selectedRequest===undefined){
        storeCtx.setSelectedRequestHandler(nameRef.current.value)
      }
      storeCtx.setRequestsHandler({
        ...storeCtx.requests,
        [nameRef.current.value]: {
          param: {
            0: { key: "", value: "" },
            1: { key: "", value: "" },
            2: { key: "", value: "" },
            3: { key: "", value: "" },
            4: { key: "", value: "" },
            5: { key: "", value: "" },
          },
          header: {
            0: { key: "", value: "" },
            1: { key: "", value: "" },
            2: { key: "", value: "" },
            3: { key: "", value: "" },
            4: { key: "", value: "" },
            5: { key: "", value: "" },
          },
          json: "{\n\t\n}",
          output: null,
          time: null,
          url: "",
        },
      });

      setPlaceholder("Enter Name");
    } else if (nameRef.current.value.trim().length === 0)
      setPlaceholder("Must Have A Name");
    else setPlaceholder("Name Already Exist");
    nameRef.current.value = "";
  }

  function removeHandler(element) {
    if(storeCtx.selectedRequest===element&&storeCtx.selectedRequest===Object.keys(storeCtx.requests)[0]){
      storeCtx.setSelectedRequestHandler(Object.keys(storeCtx.requests)[(Object.keys(storeCtx.requests).indexOf(storeCtx.selectedRequest))+1])
    }
    else if(storeCtx.selectedRequest===element){
       storeCtx.setSelectedRequestHandler(Object.keys(storeCtx.requests)[(Object.keys(storeCtx.requests).indexOf(storeCtx.selectedRequest))-1])
    }
    
    delete storeCtx.requests[element];
    storeCtx.setRequestsHandler({ ...storeCtx.requests });
  }
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h4>YOUR REQUESTS</h4>
      </div>
      <form onSubmit={addHandler} className="sidebar-form">
        <Form.Control
          type="text"
          placeholder={placeholder}
          ref={nameRef}
          className={
            placeholder === "Enter Name"
              ? "sidebar-input "
              : "sidebar-input validation"
          }
        />
        <Button variant="outline-success" onClick={addHandler}  >
         Add
        </Button>
      </form>
      <div className="sidebar-requests" >
        {Object.keys(storeCtx.requests).map((element, index) => {
        return (
          <div
            key={index}
            className={
              storeCtx.selectedRequest === element
                ? "sidebar-req selected"
                : "sidebar-req"
            }
          >
            <div
              className="sidebar-req-name"
              onClick={() => {storeCtx.setSelectedRequestHandler(element)}}
            >
              {element.substring(0,10)}
            </div>
            <Button
              variant="outline-danger"
              onClick={() => removeHandler(element)}
            >
              Remove
            </Button>
          </div>
        );
      })}
      </div>
      
      
    </div>
  );
};
export default Sidebar;
