import { Controller, Post, UseInterceptors, Res, UploadedFile, Query, Get } from '@nestjs/common';
import { Response } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from '../service/app.service';
import axios from 'axios';
import 'dotenv/config';
import * as formData from 'form-data';
import srtParser2 from 'srt-parser-2';
const srtParser = new srtParser2();

const instance = axios.create({
    baseURL: 'https://api.respell.ai/v1/run',
    timeout: 1000 * 60 * 5,
    headers: {
        authorization: `Bearer ${process.env.RESPELL_API_KEY}`,
        accept: 'application/json',
        'content-type': 'application/json',
    },
});

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

        console.log(`Video URL: ${videoURL}`);
        console.log('Requesting to Respell API...');
        console.time('audio-to-english');
        const response1 = await instance.post('/', {
            spellId: '0Y49H3JDA4Q7V9m81nzp5',
            // Fill in a dynamic value for your input block
            spellVersionId: 'ppBd3EHq-oxz_prB8FXY0',
            inputs: {
                audio_input: videoURL,
            },
        });
        console.log(response1.data);
        console.timeEnd('audio-to-english');

        console.log('Requesting to Respell API...(step 2)');
        console.time('english-to-summary');
        const response2 = await instance.post('/', {
            spellId: 'OvY9iy-EKvD-SpxUEA47S',
            spellVersionId: 'hcgef7igUlhNCpxhcbYI6',
            // Fill in dynamic values for each of your 2 input blocks
            inputs: {
                text_input_3: 'Make a summary from the script',
                text_input: response1.data.outputs.text_output,
            },
        });
        console.log(response2.data);
        console.timeEnd('english-to-summary');

        console.log('Requesting to Respell API...(step 3)');
        console.time('summary-to-srt');
        const response3 = await instance.post('/', {
            spellId: 'OvY9iy-EKvD-SpxUEA47S',
            // This field can be omitted to run the latest published version
            spellVersionId: 'hcgef7igUlhNCpxhcbYI6',
            // Fill in dynamic values for each of your 2 input blocks
            inputs: {
                text_input_3: `Your job is to give timestamp estimates for the following script input taken from a video and convert the script into an SRT file. To format a textual script into a SRT file, you need to follow these steps:

- Divide the script into segments that correspond to the video scenes. Each segment should have a maximum of two lines of text and should not exceed 32 characters per line.
- Assign a sequential number to each segment, starting from 1. Write the number on a separate line before the segment text.
- Specify the start and end time of each segment in hours:minutes:seconds,milliseconds format. Write the time code on a separate line after the segment number and before the segment text. Use a comma to separate the hours, minutes, seconds and milliseconds. Use an arrow (-->), with spaces before and after it, to separate the start and end time of each segment.
- Leave a blank line after each segment to separate it from the next one.`,
                text_input: response2.data.outputs.srt_output,
            },
        });
        console.log(response3.data);
        console.timeEnd('summary-to-srt');
        return res.json({
            summary: response2.data.outputs.srt_output,
            transcript: response3.data.outputs.srt_output,
        });
    }

    @Get('translate')
    async getTranslate(@Query('summary') summary: string, @Query('transcript') transcript: string, @Query('tolang') tolang: string, @Res() res: Response) {
        const summaryTranslate = await translate(summary, { to: tolang });
        const srtArray = srtParser.fromSrt(transcript);
        for (let i = 0; i < srtArray.length; i++) {
            const element = srtArray[i];
            element.text = await translate(element.text, { to: tolang });
        }
        const srtTranslate = srtParser.toSrt(srtArray);
        return res.json({
            summary: summaryTranslate,
            transcript: srtTranslate,
        });
    }
}

async function translate(text: string, options: { to: string }): Promise<string> {
    const body = {
        q: text,
        source: 'en',
        target: options.to,
        format: 'text',
    };

    console.log(body);
    // https://translate.terraprint.co/translate
    const result = await axios.post('https://b44c-20-125-96-44.ngrok-free.app/translate', body, {
        headers: { 'content-type': 'application/x-www-form-urlencoded', accept: 'application/json' },
    });
    return result.data.translatedText;
}
