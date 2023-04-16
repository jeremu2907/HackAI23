const fs = require('fs');
// JavaScript function to add two numbers
const translateAndDownload = async (SRT_input, languageOption) => {

    var instructions = `You are an AI bot given a user's request, changes the contents of the SRT file to match the user's needs. When making edits to the file, the format needs to be correct. Only return the modified format of the file. The current script that you will need to edit is the following: ` + SRT_input;

    var usr_message = 'Translate into ' + languageOption;

    let response = await fetch('https://api.respell.ai/v1/run', {
  method: 'POST',
  headers: {
    // This is your API key
    authorization: 'Bearer 46b8673b-1f48-4765-9be0-8d653d87be1c',
    accept: 'application/json',
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    spellId: 'OvY9iy-EKvD-SpxUEA47S',
    // This field can be omitted to run the latest published version
    spellVersionId: 'hcgef7igUlhNCpxhcbYI6',
    // Fill in dynamic values for each of your 2 input blocks
    inputs: {
      text_input_3: instructions,
      text_input: usr_message,
    },
  }),
});

    console.log("Hello World");
    const plaimText = await response.text();
    const jsonResponse = JSON.parse(plaimText).outputs.srt_output
    console.log(jsonResponse);
    var str_filename = languageOption + '.srt'

    fs.writeFileSync(str_filename, jsonResponse)
};

/* console.log(translateAndDownload(`    1
00:00:01,000 --> 00:00:04,000
So, we'll be meeting in the
court in 30 minutes.

2
00:00:04,500 --> 00:00:07,000
And don't forget to form
a group beforehand!

3
00:00:07,500 --> 00:00:09,000
That's all! What is it?

4
00:00:09,500 --> 00:00:11,000
W-Well... The group...

5
00:00:11,500 --> 00:00:13,000
What about it? W-Well...

6
00:00:13,500 --> 00:00:15,500
Well... Megumi, if there's
no one to form a group,

7
00:00:16,000 --> 00:00:18,000
how about I do it? Sure.

8
00:00:18,500 --> 00:00:20,000
Oh, boy. Yunyun, this time...`, "Spanish")) */