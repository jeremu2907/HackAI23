import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from '../service/app.service';
@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('tts')
    async getTTS(@Query('text') text: string, @Res() res: Response) {
        res.set('Content-Type', 'audio/mpeg');
        res.send(await this.appService.getTTS(text));
    }
}
