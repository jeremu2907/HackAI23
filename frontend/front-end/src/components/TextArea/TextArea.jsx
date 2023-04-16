import { useEffect } from "react"

export default function TextArea(){
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
        padding: "2px"
    }

    return(
        <div style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-evenly", alignItems: "center"}}>
            <h1 style={headingStyle} id="subject">Transcript</h1>
            <textarea id="textArea" style={textAreaStyle}/>
        </div>
    )
}