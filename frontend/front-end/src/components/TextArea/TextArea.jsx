export default function TextArea(props){
    const textAreaStyle = {
        position: "relative",
        backgroundColor: "rgba(256,256,256, 0.8)",
        height: "calc(90%)",
        width: "calc(100%)",
        border: "0",
        left: "0",
        fontSize: "20px",
        padding: "20px",
    }
    return(
        <div style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center"}}>
            <textarea style={textAreaStyle}/>
        </div>
    )
}