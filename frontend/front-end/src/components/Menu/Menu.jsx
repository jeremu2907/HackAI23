import {useState } from 'react';
import './Menu.css'

export default function Menu(){
    const [menuCollapse, setmenuCollapse] = useState(false);
    const btn = {
        height: "50px",
        border: "0",
        margin: "0px",
        // top: "0",
        backgroundColor: "var(--accent)",
        color: "white",
        transition: "margin-bottom 0.5s, color 0.5s",
        fontWeight: "bold",
        fontSize: "15px",
        fontFamily: "'Gruppo', cursive",
        width: "100px"
    }

    const menuClick = () => {
        let i = 0;
        if(!menuCollapse){
            document.getElementById("menubtn").innerText="Menu";
            for(; i<4; i++){
                document.getElementsByClassName("menuBtn")[i].style.width= "0px";
                document.getElementsByClassName("menuBtn")[i].style.fontSize= "0px";
            }
        } else {
            setTimeout(() => {
                document.getElementById("menubtn").innerText="Close Menu";
            }, 100);
            for(; i<4; i++){
                document.getElementsByClassName("menuBtn")[i].style.width= "100%";
                document.getElementsByClassName("menuBtn")[i].style.fontSize= "15px";
            }
        }
        setmenuCollapse(!menuCollapse);
    }

    // const login = () => {
    //     console.log("hi")
    // }

    return(
        <div style={{position: "relative",textAlign: "start", display: "flex", flexDirection: "row", height: "50px"}}>
            <button id="menubtn" style={btn} onClick={menuClick}>Close Menu</button>
            <Item text="Transcript" />
            <Item text="Summary" />
            <Item text="Translate to Another Language"/>
            <Item text="Download" />
            {/* <Item id="buttonDiv" text="Connect to YouTube"/> */}
            <div id="buttonDiv" style={{alignSelf: "flex-end", justifySelf: "end", marginLeft: "auto"}}></div>
        </div>
    )
}

function Item (props) {
    return(
        <button className="menuBtn" onClick={props.callBack}>
            {props.text}
        </button>
    )
}