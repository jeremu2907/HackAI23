import {useState, useEffect} from 'react'
import {useNavigate} from 'react-router-dom'
import './Upload.css'

var test = {
    "summary": "In the script, the characters are discussing forming a group for an upcoming meeting in the court. Megumi is initially hesitant and struggles to find a group, but Yunyun offers to join her. Megumi is surprised but appreciative of the offer, and they both agree to go together as classmates and friends.",
    "transcript": "1\n00:00:00,000 --> 00:00:02,500\nMegumi: I don't know who\nto form a group with.\n\n2\n00:00:02,600 --> 00:00:04,800\nYunyun: Hey Megumi,\nI'll join you!\n\n3\n00:00:05,000 --> 00:00:07,500\nMegumi: Really, Yunyun?\nThat would be great!\n\n4\n00:00:07,600 --> 00:00:10,000\nYunyun: Yeah, let's go\nto the court together.\n\n5\n00:00:10,100 --> 00:00:12,500\nMegumi: Thank you so much!\nWe'll be classmates\n\n6\n00:00:12,600 --> 00:00:14,000\nand friends in this."
}

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
        document.getElementById("loading").style.display = "block";

        fetch('https://d1b0-47-186-243-93.ngrok-free.app/api/upload', {
            method: 'POST',
            body: formData,
        })
        .then((res) => {
            return res.json()
        })
        .then(response => {
            window.localStorage.clear();
            window.localStorage.setItem("Transcript",response.transcript);
            window.localStorage.setItem("Summary", response.summary);
            document.getElementById("loading").style.display = "none";
            if(clicked){
                navigate('/PostProcess')
                setclicked(!clicked)
            }
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