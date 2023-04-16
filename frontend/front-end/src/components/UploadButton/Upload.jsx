import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './Upload.css'

export default function Upload() {
    const [selectedFile, setSelectedFile] = useState(undefined);
    const [clicked, setclicked] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const image_input = document.querySelector("#upload-button");
        image_input.addEventListener("change", function(event) {
            setSelectedFile(event.target.files[0]);
        });
    })

    useEffect(() => {
        console.log(selectedFile);
        if (!selectedFile) return;
        const formData = new FormData();
        formData.append('inputFile', selectedFile);
        document.getElementById("loading").style.visibility = "visible";

        fetch('https://d1b0-47-186-243-93.ngrok-free.app/api/upload', {
            method: 'POST',
            body: formData,
        })
        .then((res) => {
            document.getElementById("loading").style.visibility = "hidden";
            return res.json()
        })
        .then(response => {
            window.localStorage.clear();
            window.localStorage.setItem("Transcript",response.transcript);
            window.localStorage.setItem("Summary", response.summary);
            document.getElementById("loading").style.visibility = "hidden";
            if(clicked){
                navigate('/PostProcess')
                setclicked(!clicked)
            }
        })

    }, [selectedFile, clicked, navigate])

    return(
        <div id="upload-wrapper">
            <label htmlFor="upload-button">
                Upload file
                <input type="file" id="upload-button" onClick={() => {setclicked(true)}}/>
            </label>
        </div>
    )
}