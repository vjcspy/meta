import type { OnModuleInit } from '@nestjs/common';
import { Module } from '@nestjs/common';
import { format } from '@web/base';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  onModuleInit(): any {
    console.log(format.important('Hello'));
  }
}
