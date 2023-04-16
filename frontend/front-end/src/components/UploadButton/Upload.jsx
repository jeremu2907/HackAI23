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
        const formData = new FormData();
        formData.append('inputFile', selectedFile);
        fetch('/api/upload', {
            method: 'POST',
            body: formData,
        })
        .then((response) => {
            if(clicked)
                navigate('/PostProcess')
        })
    }, [selectedFile])

    return(
        <div id="upload-wrapper">
            <label htmlFor="upload-button">
                Upload file
                <input type="file" id="upload-button" onClick={() => {setclicked(true)}}/>
            </label>
        </div>
    )
}