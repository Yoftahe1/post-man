//import { useContext } from "react";
import Header from "./component/header"
import Tabs from "./component/tabs"
import Output from "./component/Output";
import './App.css';

//import storeContext from "./store/store";
function App() {
  //const storeCtx=useContext(storeContext)
  return (
    <div className="App">
      <Header/>
      <Tabs/>
      <Output/>
    </div>
  );
}

export default App;

// ```
// format output
// dont send if url is ""
// json validation
// ```