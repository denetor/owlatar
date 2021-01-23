import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OwlsModule } from './owls/owls.module';

@Module({
    imports: [OwlsModule],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
