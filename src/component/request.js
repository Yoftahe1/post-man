import React,{useContext, useRef} from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import './request.css'
import storeContext from '../store/store';
const Request = (props) => {
  const storeCtx=useContext(storeContext)
  const inputRef=useRef('')
  const methodRef=useRef('')
  function submitHandler(){
    let params=(Object.values(props.params).map((element)=>element)).reduce((acc, cur) => ({ ...acc, [cur.key]: cur.value }), {})
    let header=(Object.values(props.header).map((element)=>element)).reduce((acc, cur) => ({ ...acc, [cur.key]: cur.value }), {})
    axios({
      url:inputRef.current.value,
      method:methodRef.current.value,
      params:params,
      header:header,
    }).catch(e=>e).then(response=>storeCtx.setResponseHandler(response))
  }
  return (
    <div className='request-container'>
    <Form.Select ref={methodRef} size="lg">
        <option className='option'>GET</option>
        <option className='option'>POST</option>
        <option className='option'>PUT</option>
        <option className='option'>PATCH</option>
        <option className='option'>DELETE</option>
      </Form.Select>
      <Form.Control ref={inputRef} type='url' placeholder='https://example.com' size="lg"/>
      <Button variant="primary" onClick={submitHandler} >Send</Button>
    </div>
  )
}

export default Request