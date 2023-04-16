import { Controller, Post, UseInterceptors, Res, UploadedFile } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from '../service/app.service';
import axios from 'axios';
import 'dotenv/config';
import * as formData from 'form-data';

@Controller('api')
export class UploadController {
    constructor(private readonly appService: AppService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('inputFile'))
    async uploadFile(@UploadedFile() file: Express.Multer.File, @Res() res: Response) {
        const form: any = new formData();
        form.append('file', Buffer.from(file.buffer), 'utf-8');
        const resp = await axios.post('https://upload.agentbot.xyz/api/upload', form, {
            headers: {
                'Content-Type': 'multipart/form-data',
                authorization: process.env.ZIPLINE || '',
                'X-Zipline-Filename': file.filename,
                'no-json': true,
            },
        });

        const videoURL = await resp.data;


        console.log('Requesting to Respell API...');
        console.time('respell');
        const response = await axios.post(
            'https://api.respell.ai/v1/run',
            {
                spellId: 'xiN73Cfto3lDXG2sF5hi9',
                // This field can be omitted to run the latest published version
                spellVersionId: 'IyxsJ-4Ulj-Dit0_eEax4',
                // Fill in dynamic values for each of your 3 input blocks
                inputs: {
                    text_input: 'Make a summary from the script',
                    audio_input: videoURL,
                    timestamp_instructions:
                        'Your job is to give timestamp estimates for the following script input taken from a video and convert the script into an SRT file. To format a textual script into a SRT file, you need to follow these steps:\n- Divide the script into segments that correspond to the video scenes. Each segment should have a maximum of two lines of text and should not exceed 32 characters per line.\n- Assign a sequential number to each segment, starting from 1. Write the number on a separate line before the segment text.\n- Specify the start and end time of each segment in hours:minutes:seconds,milliseconds format. Write the time code on a separate line after the segment number and before the segment text. Use a comma to separate the hours, minutes, seconds and milliseconds. Use an arrow (-->), with spaces before and after it, to separate the start and end time of each segment.\n- Leave a blank line after each segment to separate it from the next one.',
                },
            },
            {
                headers: {
                    // This is your API key
                    authorization: `Bearer ${process.env.RESPELL_API_KEY}`,
                    accept: 'application/json',
                    'content-type': 'application/json',
                },
                timeout: 1000 * 60 * 5,
            },
        );
        console.log(response.data);
        console.timeEnd('respell');
        return res.send('test');
    }
}
