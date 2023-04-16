import ReactPlayer from 'react-player'
import './Viewer.css'
import { useEffect } from 'react';

export default function Viewer () {
    const Vid = "videos/vid1.mp4";
    const container = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100%",
        width: "100%"
    }

    const saveChanges = () => {
        let textAreaContent = document.getElementById("textArea").value;
        let key = document.getElementById("subject").innerText;
        console.log(key)
        window.localStorage.setItem(key, textAreaContent);
    }

    const discardChanges = () => {
        let key = document.getElementById("subject").innerText;
        document.getElementById("textArea").value = window.localStorage.getItem(key);
    }

    function handleCallbackResponse(response){
        console.log("JWD Token" + response.credential)
        
    }

    useEffect(() => {
        /* global google */
        google.accounts.id.initialize({
            client_id: "767441415793-sq762l7n92ea8sq6bempmnvn6q6ebij6.apps.googleusercontent.com",
            callback: handleCallbackResponse
        })
  
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            {theme: "outline", size: "large"}
        );
    }, [])

    return(
        <div style={container}>
            <ReactPlayer 
            width='100%'
            url={Vid} 
            playing={true}
            controls={true}
            loop={true}
            playsinline={true} 
            />
            <div style={{display: "flex", alignItems: "center", justifyContent: "space-around", width: "100%"}}>
                <h2 id="yt-label">Upload cc to YouTube</h2>
                <div id="buttonDiv"></div>
            </div>
            <button id="save" onClick={saveChanges}>Save Recent Changes</button>
            <button id="revert" onClick={discardChanges}>Discard Recent Changes</button>
        </div>
    )
}