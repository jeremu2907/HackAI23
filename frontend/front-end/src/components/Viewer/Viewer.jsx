import ReactPlayer from 'react-player'
import './Viewer.css'

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
            <div id="buttonDiv"></div>
            <button id="save" onClick={saveChanges}>Save Recent Changes</button>
            <button id="revert" onClick={discardChanges}>Discard Recent Changes</button>
        </div>
    )
}