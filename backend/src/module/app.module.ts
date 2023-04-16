import { Module } from '@nestjs/common';
import { AppController } from '../controller/app.controller';
import { UploadController } from '../controller/upload.controller';
import { AppService } from '../service/app.service';
import { LoggerModule } from 'nestjs-pino';

@Module({
    imports: [LoggerModule.forRoot()],
    controllers: [AppController, UploadController],
    providers: [AppService],
})
export class AppModule {}
