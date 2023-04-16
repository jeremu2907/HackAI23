import '../App.css'
import TextArea from '../components/TextArea/TextArea'
import Menu from '../components/Menu/Menu'
import Viewer from '../components/Viewer/Viewer'

export default function PostProcess (props) {
    const containerStyle = {
        position: "relative", 
        width: "100%", 
        height: "calc(100%)", 
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly"
    }
    const flexCommonStyle = {
        position: "relative",
        height: "100%",
        alignContent: "center",
        justifyContent: "center",
        transition: "width 0.5s",
        width: "40%",
    }

    return(
        <div style={{display: "flex", flexDirection:"column", height: "100vh"}}>
            <Menu/>
            <div className='PostApp' style={containerStyle}>
                <div className="mid" id="editor" style={flexCommonStyle}>
                    <TextArea />
                </div>
                <div className="leftRight" id="viewer" style={flexCommonStyle}>
                    <Viewer />
                </div>
            </div>
        </div>
    )
}