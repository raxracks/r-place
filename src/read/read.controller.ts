import { Controller, Get, Query } from '@nestjs/common';
import { ReadService } from './read.service';

@Controller('read')
export class ReadController {
  constructor(private readonly readService: ReadService) {}

  @Get('board')
  getBoard() {
    return this.readService.getBoard();
  }

  @Get('user')
  getUser(@Query() query) {
    return this.readService.getUser(query.x, query.y);
  }
}
