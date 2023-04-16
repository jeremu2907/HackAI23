import React from 'react'
import './Loading.css'

export default function Loading() {
  return (
    <div id="loading" style={{position: "fixed", left: "0px", visibility: "hidden",blackgroundColor: "rgba(0,0,0,0.5"}}>
        <img className="loading" src={require("./iconLogin.png")} alt="loading"></img>
    </div>
  );
}