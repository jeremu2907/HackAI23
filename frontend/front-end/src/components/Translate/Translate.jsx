import { useEffect, useState } from "react"
import './Translate.css'

const langDict = {
    "English":"en","Arabic":"ar","Chinese":"zh","French":"fr","German":"de","Hindi":"hi","Indonesian":"id","Irish":"ga","Italian":"it","Japanese":"ja","Korean":"ko","Polish":"pl","Portuguese":"pt","Russian":"ru","Spanish":"es","Turkish":"tr","Vietnamese":"vi"
}

export default function Translate(){
    const [lang, setlang] = useState();
    const [send, setsend] = useState(false);
    const langList = Object.keys(langDict);

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
        padding: "20px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly"
    };
    const scrollBox = {
        position: "relative",
        display:"flex", 
        flexDirection: "column", 
        justifyContent: "flex-begin", 
        alignItems: "center", 
        marginBottom: "auto",
        overflowY: "auto",
        height: "70%"
    }
    const closePanel = () => {
        document.getElementById("translatePanel").style.display = "none";
    }

    const translateReq = (e) => {
        closePanel();
        /* global LATEST_TRANSLATED_LANG */
        setlang(langDict[e]);
        LATEST_TRANSLATED_LANG = langDict[e];
        console.log(lang)
        setsend(true);
    }

    useEffect(() => {
        console.log(lang)
        if(send && lang && lang !== 'en'){
            console.log('sending requests');
            document.getElementById("loading").style.visibility = "visible";
            fetch(`${process.env.BACKEND_API}/api/translate?summary=${window.localStorage.getItem('Summary')}&transcript=${encodeURI(window.localStorage.getItem('Transcript'))}&tolang=${lang}`, {
                method: 'GET',
            })
            .then((res) => {
                document.getElementById("loading").style.visibility = "hidden";
                return res.json()
            })
            .then(response => {
                console.log(response)
                document.getElementById("loading").style.visibility = "hidden";
                window.localStorage.setItem(`Transcript_${lang}`,response.transcript);
                window.localStorage.setItem(`Summary_${lang}`, response.summary);
                setsend(false);
            })
        }
    },[send,lang])
    
    return(
        <div style={overlay} id="translatePanel">
            <div style={translateForm}>
                <h4 id="x" style={{fontFamily:"'Gruppo', cursive", cursor: "pointer", width: "1ch", padding: "0", margin: "0", position: "relative"}}
                    onClick={closePanel}>X</h4>
                <h1 style={{position: "relative",fontFamily:"'Gruppo', cursive", marginBottom: "auto"}}>Select Translation Language</h1>
                <div style={scrollBox}>
                    {
                        langList.map((e) => 
                        <div key={e} className="lang-selection" onClick={() => {translateReq(e)}}>{e}</div>)
                    }
                </div>
            </div>
        </div>
    );
}