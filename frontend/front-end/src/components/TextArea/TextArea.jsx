export default function TextArea(props){
    const outputMenu = {
        position: "relative",
        display: "flex",
        flexDirection: "row",
        height: "40px",
        width: "80%",
        fontFamily: "'Gruppo', cursive",
        color: "white"
    }
    const textAreaStyle = {
        position: "relative",
        backgroundColor: "rgba(256,256,256, 0.3)",
        height: "calc(95vh - 44px)",
        width: "80%",
        border: "0",
        left: "0"
    }
    return(
        <div style={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center"}}>
            <div style={outputMenu}>
                <Selection name="Dialogue" />
                <Selection name="Something" />
                <Selection name="Another thing" />
                <Selection name="Huh TF?" />
            </div>
            <textarea style={textAreaStyle}/>
        </div>
    )
}

function Selection(props){
    const styles = {
        position: "relative",
        width: "100%",
        height: "100%",
        textAlign: "center"
    }
    return(
        <div style={styles}>
            {props.name}
        </div>
    )
}