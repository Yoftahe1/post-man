import React, { useContext } from "react";
import Tabs from "./tabs";
import Output from "./Output";
import Sidebar from "./Sidebar";
import Header from "./header";
import storeContext from "../store/store";
import "./layout.css";
const Layout = () => {
  const storeCtx = useContext(storeContext);

  function stars() {
    let count = 50;
    let scene = document.querySelector(".scene");
    let i = 0;
    while (i < count) {
      let star = document.createElement("i");
      let x = Math.floor(Math.random() * window.innerWidth);
      let duration = Math.random() * 1;
      let h = Math.random() * 100;

      star.style.left = x + "px";
      star.style.width = 1 + "px";
      star.style.height = 50 + h + "px";
      star.style.animationDuration = duration + "s";
      scene.appendChild(star);
      i++;
    }
  }
 
  return (
    <>
      <Header />
      <div className="layout">
        <Sidebar />
        {Object.keys(storeCtx.requests).length !== 0 ? (
          <div>
            <Tabs />
            <Output />
          </div>
        ) : (
          <div onLoad={stars} className='no-req'>
            <h3>Welcome To HTTP REQUEST</h3>
            <p>
              This website is design to make your API interaction easy and
              enjoyable
              <br />
              With many available features to satisfy your needs
              <br />
              Such as the ability to send many request at a time
            </p>
            <h4>Usage</h4>
            <p>
              First add request on the left side
              <br />
              choose your request type and enter your url address in the input area
              <br/>
              modify header and params and finally press send
            </p>


            <div className="container">
              <div className="scene">
                <div className="rocket">
                  <img className="img" src={require("../img/clipart2952218.png")} alt='paper jet'/>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Layout;
