import { useState, createContext } from "react";

const storeContext = createContext({
  response: null,
  time:null,
  isLoading:false,
  setResponseHandler: (response) => {},
  timeHandler: (response) => {},
  isLoadingHandler:(isLoading)=>{},
});

export function StoreContextProvider(props) {
  const [response, setResponse] = useState(null);
  const [time, setTime] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  function setResponseHandler(response) {
    setResponse(response);
  }
  function timeHandler(time) {
    setTime(time);
  }
  function isLoadingHandler(isLoading){
    setIsLoading(isLoading)
  }
  const contextValues = {
    response: response,
    time:time,
    isLoading:isLoading,
    setResponseHandler: setResponseHandler,
    timeHandler:timeHandler,
    isLoadingHandler:isLoadingHandler,
  };

  return (
    <storeContext.Provider value={contextValues}>
      {props.children}
    </storeContext.Provider>
  );
}

export default storeContext;
