import { useState, createContext } from "react";

const storeContext = createContext({
  response: null,
  time:null,
  setResponseHandler: (response) => {},
  timeHandler: (response) => {},
});

export function StoreContextProvider(props) {
  const [response, setResponse] = useState(null);
  const [time, setTime] = useState(null);
  function setResponseHandler(response) {
    setResponse(response);
  }
  function timeHandler(time) {
    setTime(time);
  }
  const contextValues = {
    response: response,
    time:time,
    setResponseHandler: setResponseHandler,
    timeHandler:timeHandler,
  };

  return (
    <storeContext.Provider value={contextValues}>
      {props.children}
    </storeContext.Provider>
  );
}

export default storeContext;
