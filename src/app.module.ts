import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ReadService } from './read/read.service';
import { CommunicateGateway } from './communicate/communicate.gateway';
import { AppService } from './app.service';
import { ReadController } from './read/read.controller';

@Module({
  imports: [],
  controllers: [AppController, ReadController],
  providers: [AppService, ReadService, CommunicateGateway],
})
export class AppModule {}
