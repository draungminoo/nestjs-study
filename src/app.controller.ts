import { Controller, Get, Param, Res } from '@nestjs/common';
import { Response } from 'express';
import { join } from 'path';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('app')
  redirectToIndexFile(@Res() res: Response) {
    res.redirect('app/index.html');
  }

  @Get('app/*')
  getApp(@Param('0') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '../public/app', filename);
    res.sendFile(filePath);
  }
}

// app/index.html ===> OK
// app/styles/style.css ===> Error (Not found)
