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
            <button id="save">Save Recent Changes</button>
            <button id="revert">Discard Recent Changes</button>
        </div>
    )
}