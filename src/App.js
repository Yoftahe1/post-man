import { useContext } from "react";
import Tabs from "./component/tabs"
import Output from "./component/Output";
import './App.css';

import storeContext from "./store/store";
function App() {
  const storeCtx=useContext(storeContext)
  return (
    <div className="App">
      <Tabs/>
      {storeCtx.response!==null&&<Output/>}
    </div>
  );
}

export default App;
