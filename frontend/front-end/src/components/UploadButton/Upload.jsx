import react, {useState, useEffect} from 'react'
import axios from 'axios';
import './Upload.css'

var test = `{
    "outputs": {
      "video_text_output": "Example text",
      "gpt_4_output": "1
00:00:00,000 --> 00:00:04,000
  So, we'll be meeting in
  the court in 30 minutes.
  2
  00:00:04,001 --> 00:00:06,000
  And don't forget to form
  a group beforehand!
  
  3
  00:00:06,001 --> 00:00:08,000
  That's all! What is it?
  
  4
  00:00:08,001 --> 00:00:10,000
  W-Well... The group...
  
  5
  00:00:10,001 --> 00:00:12,000
  What about it? W-Well...
  
  6
  00:00:12,001 --> 00:00:14,000
  Well... Megumi, if there's
  no one to form a group,
  
  7
  00:00:14,001 --> 00:00:16,000
  how about I do it?
  Sure. Oh, boy.
  
  8
  00:00:16,001 --> 00:00:18,000
  Yunyun, this time...
  
  9
  00:00:18,001 --> 00:00:20,000
  Hey, Yunyun, wanna join us?
  
  10
  00:00:20,001 --> 00:00:22,000
  You're always so out of it.
  
  11
  00:00:22,001 --> 00:00:24,000
  I'll join you. A-Are you sure?
  
  12
  00:00:24,001 --> 00:00:26,000
  Of course. We're classmates.
  
  13
  00:00:26,001 --> 00:00:28,000
  We're like friends, right?
  
  14
  00:00:28,001 --> 00:00:30,000
  F-Friends... Let's go, then.
  
  15
  00:00:30,001 --> 00:00:32,000
  Okay! The End The End The End
  
  16
  00:00:32,001 --> 00:00:34,000
  So this is... Netrale.
  
  17
  00:00:34,001 --> 00:00:36,000
  It's not Netrale!",
      "summary_output": "In this script, a group of classmates are preparing to meet at the court in 30 minutes. They are reminded to form a group beforehand. Megumi offers to form a group with Yunyun, who is often out of it. Yunyun agrees, and they acknowledge their friendship as classmates. They then head to their destination together."
    }
  }`

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
        }).then(response => {
            let r = JSON.parse(test);
            console.log(r)
        })
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