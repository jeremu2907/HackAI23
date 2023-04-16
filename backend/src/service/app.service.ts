import { Injectable } from '@nestjs/common';
@Injectable()
export class AppService {
    getHello(): string {
        return 'Hello World!';
    }

    async uploadFile(file: Express.Multer.File): Promise<any> {
        console.log(file);
    }
}
