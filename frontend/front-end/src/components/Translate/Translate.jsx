import { useEffect, useState } from "react"
import './Translate.css'

export default function Translate(){
    const [lang, setlang] = useState("Japanese");

    const langList = ["Spanish", "German", "French", "Japanese", "Chinese", "Russian", "Korean", "Portugese"];

    const overlay = {
        position: "absolute",
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
        width: "100vw",
        height: "100vh",
        zIndex: "10",
        display: "none"
    };
    const translateForm = {
        position: "absolute",
        left: "50%",
        top: "50%",
        transform: "translate(-50%, -50%)",
        height: "80vh",
        width: "auto",
        backgroundColor: "white",
        filter: "drop-shadow(5px 15px 15px rgba(20,20,20,0.7))",
        padding: "20px"
    };
    const scrollBox = {
        display:"flex", 
        flexDirection: "column", 
        justifyContent: "space-evenly", 
        alignItems: "center", 
        overflowY: "auto",
        height: "80%"
    }
    const closePanel = () => {
        document.getElementById("translatePanel").style.display = "none";
    }

    useEffect(() => {
        let formData = new FormData();
        fetch('/api/upload', {
            method: 'POST',
            body: formData,
        }). then (closePanel)
    },[lang])
    
    return(
        <div style={overlay} id="translatePanel">
            <div style={translateForm}>
                <h1 id="x" style={{fontFamily:"'Gruppo', cursive", cursor: "pointer", width: "1ch", padding: "0", margin: "0"}}
                    onClick={closePanel}>X</h1>
                <h1 style={{fontFamily:"'Gruppo', cursive"}}>Select Translation Language</h1>
                <div style={scrollBox}>
                    {
                        langList.map((e) => 
                        <div key={e} className="lang-selection" onClick={() => {setlang(e)}}>{e}</div>)
                    }
                </div>
            </div>
        </div>
    );
}