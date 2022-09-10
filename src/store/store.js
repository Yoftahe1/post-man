import { useState, createContext } from "react";

const storeContext = createContext({
  response: null,
  setResponseHandler: (response) => {},
});

export function StoreContextProvider(props) {
  const [response, setResponse] = useState(null);
  function setResponseHandler(response) {
    setResponse(response);
  }
  const contextValues = {
    response: response,
    setResponseHandler: setResponseHandler,
  };

  return (
    <storeContext.Provider value={contextValues}>
      {props.children}
    </storeContext.Provider>
  );
}

export default storeContext;
