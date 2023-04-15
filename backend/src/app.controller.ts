import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }

    @Get('tts')
    async getTTS(@Query('text') text: string): Promise<Buffer> {
        return await this.appService.getTTS(text);
    }
}
