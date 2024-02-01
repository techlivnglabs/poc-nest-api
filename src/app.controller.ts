import {
  BadRequestException,
  Controller,
  Get,
  Res,
  UseInterceptors,
} from '@nestjs/common';
import { AppService } from './app.service';

import { TransformInterceptor } from './utils/interceptors/response.interceptors';
import { Public } from './auth/decorators';

@Public()
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @UseInterceptors(TransformInterceptor)
  async getHello() {
    return 'hello';
  }
}
