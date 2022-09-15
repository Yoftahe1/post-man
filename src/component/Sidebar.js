import React, { useState, useRef } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./sidebar.css"
const Sidebar = () => {
  const [requests, setRequests] = useState(["hi"]);
  const [placeholder, setPlaceholder] = useState('Enter Name');
  const nameRef = useRef(null);
  function addHandler(event) {
    event.preventDefault();
    if (nameRef.current.value.trim().length > 0){
      setRequests([...requests, nameRef.current.value]);
      setPlaceholder('Enter Name')
    }
    else setPlaceholder('Must Have A Name')
  }
  function removeHandler(index) {
    setRequests(
      requests.filter((element, idx) => {
        return idx !== index;
      })
    );
  }
  return (
    <div className="sidebar">
      <h4>YOUR REQUESTS</h4>
      {requests.map((element, index) => {
        return (
          <div key={index} className='sidebar-req'>
            <div>{element}</div>
            <Button
              variant="outline-danger"
              onClick={() => removeHandler(index)}
            >
              Remove
            </Button>
          </div>
        );
      })}
      <form onSubmit={addHandler} className='sidebar-form'>
        <Form.Control type="text" placeholder={placeholder} ref={nameRef} className={placeholder==="Must Have A Name"?'sidebar-input validation':'sidebar-input'}/>
        <Button variant="outline-success" onClick={addHandler}>
          Add
        </Button>
      </form>
    </div>
  );
};

export default Sidebar;
