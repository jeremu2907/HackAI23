import {useState} from 'react'
import './TextArea.css'

export default function TextArea(){
    const [translate, settranslate] = useState(true);

    const textAreaStyle = {
        position: "relative",
        backgroundColor: "rgba(256,256,256, 1)",
        height: "calc(95% - 80px)",
        width: "calc(100% - 40px)",
        border: "0",
        left: "0",
        fontSize: "20px",
        padding: "20px",
    }
    const headingStyle = {
        color: "white",
        fontFamily: "'Gruppo', cursive",
        margin: "0px",
        justifyContent: "end",
        // paddingTop: "10px"
    }
    const translatestyl = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%"
    }

    const toggleTranslate = () => {
        console.log('button pressed');
        /* global LATEST_TRANSLATED_LANG */
        if(LATEST_TRANSLATED_LANG){
            if(translate){
                console.log(translate);
                document.getElementById("textArea").value = window.localStorage.getItem(document.getElementById("subject").innerText + "_" + LATEST_TRANSLATED_LANG);
            } else {
                document.getElementById("textArea").value = window.localStorage.getItem(document.getElementById("subject").innerText);
            }
        }
        settranslate(!translate);
    }

    return(
        <div style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}}>
            <div style={translatestyl}>
                <h1 style={headingStyle} id="subject">Transcript</h1>
                <button id="showTrans" onClick={toggleTranslate}>Show Translated Text</button>
            </div>
            <textarea id="textArea" style={textAreaStyle}/>
        </div>
    )
}