import { Controller, Get, Query } from '@nestjs/common';
import { ReadService } from './read.service';

@Controller('read')
export class ReadController {
  constructor(private readonly readService: ReadService) {}

  @Get('board')
  getBoard() {
    return this.readService.getBoard();
  }
}
