import React,{useState,useContext, useRef} from 'react'
import axios from 'axios'
import Form from 'react-bootstrap/Form';
import Button from "react-bootstrap/Button";
import './request.css'
import storeContext from '../store/store';
const Request = (props) => {
  const [isEmpty,setIsEmpty]=useState(false)
  const storeCtx=useContext(storeContext)
  const inputRef=useRef('')
  const methodRef=useRef('')
  function submitHandler(){
    if(inputRef.current.value.trim().length===0)setIsEmpty(true)
    else{
    setIsEmpty(false)
    storeCtx.isLoadingHandler(true)
    const startTime=new Date().getTime()
    let params=(Object.values(props.params).map((element)=>element)).reduce((acc, cur) => ({ ...acc, [cur.key]: cur.value }), {})
    let header=(Object.values(props.header).map((element)=>element)).reduce((acc, cur) => ({ ...acc, [cur.key]: cur.value }), {})
    let data=props.Json
    console.log({
      url:inputRef.current.value,
      method:methodRef.current.value,
      params:params,
      header:header,
      data:data,
    })
    axios({
      url:inputRef.current.value,
      method:methodRef.current.value,
      params:params,
      header:header,
      data:data,
    }).then(response=>{console.log(response);storeCtx.setResponseHandler(response);storeCtx.isLoadingHandler(false);storeCtx.timeHandler(new Date().getTime()-startTime)})
      .catch(e=>{storeCtx.isLoadingHandler(false);storeCtx.timeHandler(new Date().getTime()-startTime);storeCtx.setResponseHandler(e.response)})
  }
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
      <Form.Control ref={inputRef} type='url' placeholder={!isEmpty?'https://example.com':'URL is required'}className={isEmpty&&"validation"} size="lg" required="required"/>
      
      <Button variant="primary" onClick={submitHandler} >Send</Button>
      <br/>
      
    </div>

 
  )
}

export default Request