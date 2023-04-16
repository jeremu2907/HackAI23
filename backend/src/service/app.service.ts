import { Injectable } from '@nestjs/common';
import { getAllAudioUrls } from '../utils/textToSpeech';

@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    async getTTS(text: string): Promise<Buffer> {
        const buf = await getAllAudioUrls(text);
        return buf;
    }

    async uploadFile(file: Express.Multer.File): Promise<any> {
        console.log(file);
    }
}
