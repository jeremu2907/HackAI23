import '../App.css'
import TextArea from '../components/TextArea/TextArea'
import Menu from '../components/Menu/Menu'
import Viewer from '../components/Viewer/Viewer'
import Translate from '../components/Translate/Translate'

export default function PostProcess (props) {
    const containerStyle = {
        position: "relative", 
        width: "100%", 
        height: "calc(100%)", 
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        transition: "height 0.5s"
    }
    const flexCommonStyle = {
        position: "relative",
        height: "100%",
        alignContent: "center",
        justifyContent: "center",
        transition: "width 0.5s",
        width: "45%",
    }

    return(
        <div style={{display: "flex", flexDirection:"column", height: "100vh"}}>
            <Translate/>
            <Menu/>
            <div className='PostApp' id="editor-pane" style={containerStyle}>
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