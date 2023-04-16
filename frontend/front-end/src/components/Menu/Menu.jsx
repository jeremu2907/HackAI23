import {useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './Menu.css'

export default function Menu(){
    const [menuCollapse, setmenuCollapse] = useState(false);
    const navigate = useNavigate()

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
            document.getElementById("menubtn").style.zIndex="10000";
            setTimeout(() => {
                document.getElementById("editor-pane").style.position="absolute"
            },500)
            for(; i<5; i++){
                document.getElementsByClassName("menuBtn")[i].style.width= "0px";
                document.getElementsByClassName("menuBtn")[i].style.fontSize= "0px";
            }
        } else {
            document.getElementById("editor-pane").style.position="relative"
            setTimeout(() => {
                document.getElementById("menubtn").innerText="Close Menu";
            }, 100);
            for(; i<5; i++){
                document.getElementsByClassName("menuBtn")[i].style.width= "100%";
                document.getElementsByClassName("menuBtn")[i].style.fontSize= "15px";
            }
        }
        setmenuCollapse(!menuCollapse);
    }

    const handleClick = e => {
        console.log(e)
        document.getElementById("subject").innerText = e;

        //Saving and loading from localstorage
        document.getElementById("textArea").value = window.localStorage.getItem(e);
    }

    const translate = () => {
        console.log('HSUID')
        document.getElementById("translatePanel").style.display = "block";
    }

    const mainScreen = () => {
        navigate("/")
    }

    const download = () => {
        // let blobTranscript = new Blob([window.localStorage.getItem("Transcript")],{ type: "text/html" });
        // let blobSummary = new Blob([window.localStorage.getItem("Summary")],{ type: "text/html" });

        for(var key in localStorage){
            let ext = key.includes("Summary")? "txt" : "srt"

            const url = window.URL.createObjectURL(
                new Blob([window.localStorage.getItem(key)],{ type: "text/html" })
            );

            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
                'download',
                `${key}.${ext}`,
            );

            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        }
    }

    useEffect(() => {
        document.getElementById("textArea").value = window.localStorage.getItem("Transcript");
    },[]);

    return(
        <div style={{position: "relative",textAlign: "start", display: "flex", flexDirection: "row", height: "50px"}}>
            <button id="menubtn" style={btn} onClick={menuClick}>Close Menu</button>
            <Item text="Translate Again" callBack={mainScreen}/>
            <Item text="Transcript" callBack={()=>handleClick("Transcript")}/>
            <Item text="Summary" callBack={()=>{handleClick("Summary")}}/>
            <Item text="Translate to Another Language" callBack={translate}/>
            <Item text="Download" callBack={download}/>
            {/* <Item id="buttonDiv" text="Connect to YouTube"/> */}
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