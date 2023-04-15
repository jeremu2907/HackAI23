import '../App.css'
import TextArea from '../components/TextArea/TextArea'
export default function PostProcess (props) {
    const containerStyle = {
        position: "absolute", 
        width: "100%", 
        height: "100%", 
        display: "flex",
        flexDirection: "row"
    }
    const flexCommonStyle = {
        position: "relative",
        height: "100%",
        alignContent: "center",
        justifyContent: "center"
        // backgroundColor: "red"
    }
    const left = {
        width: "70%",
        // backgroundColor: "black",
    }
    const right = {
        width: "30%",
        // backgroundColor: "gray",
    }

    return(
        <div className='App' style={containerStyle}>
            <div className="left" style={{...flexCommonStyle, ...left}}>
                <TextArea />
            </div>
            <div className="right" style={{...flexCommonStyle, ...right}}>
            </div>
        </div>
    )
}