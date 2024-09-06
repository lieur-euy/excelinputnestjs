import { Controller,   Post,
  UploadedFile,
  UseInterceptors, } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as XLSX from 'xlsx';


@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('xlsx')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    // Convert buffer to a workbook
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });

    // Get the first sheet from the workbook
    const worksheet = workbook.Sheets[workbook.SheetNames[0]];

    // Convert worksheet to JSON
    const jsonData = XLSX.utils.sheet_to_json(worksheet);

    return {
      message: 'File uploaded and parsed successfully',
      data: jsonData,
    };
}
}