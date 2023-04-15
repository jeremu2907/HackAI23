import react, {useState, useEffect} from 'react'
import axios from 'axios';
import './Upload.css'
export default function Upload() {
    const [selectedFile, setSelectedFile] = useState(undefined);

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
        });
    }, [selectedFile])

    return(
        <div id="upload-wrapper">
            <label htmlFor="upload-button">
                Upload file
                <input type="file" id="upload-button"/>
            </label>
        </div>
    )
}