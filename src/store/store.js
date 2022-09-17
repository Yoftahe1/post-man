import { useState, createContext } from "react";
const storeContext = createContext({
  isLoading: false,
  requests: {
    name: {
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
  },
  selectedRequest: "name",

  isLoadingHandler: (isLoading) => {},
  setRequestsHandler: (requests) => {},
  setSelectedRequestHandler: (selectedRequest) => {},

});

export function StoreContextProvider(props) {
  const [isLoading, setIsLoading] = useState(false);

  const [requests, setRequests] = useState({
    name: {
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

  const [selectedRequest, setSelectedRequest] = useState("name");

  function isLoadingHandler(isLoading) {
    setIsLoading(isLoading);
  }

  function setRequestsHandler(requests) {
    setRequests(requests);
  }

  function setSelectedRequestHandler(selectedRequest) {
    setSelectedRequest(selectedRequest);
  }


  const contextValues = {
    isLoading: isLoading,
    requests: requests,
    selectedRequest: selectedRequest,

    isLoadingHandler: isLoadingHandler,
    setRequestsHandler: setRequestsHandler,
    setSelectedRequestHandler: setSelectedRequestHandler,

  };
  return (
    <storeContext.Provider value={contextValues}>
      {props.children}
    </storeContext.Provider>
  );
}

export default storeContext;
