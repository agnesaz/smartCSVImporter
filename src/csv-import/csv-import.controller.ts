import { Controller, Post, UploadedFile, UseInterceptors, BadRequestException, InternalServerErrorException, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CsvImportService } from './csv-import.service';
import { CsvParserService } from './csv-parser.service';

@Controller('csv-import')
export class CsvImportController {
  constructor(
    private readonly csvImportService: CsvImportService,
    private readonly csvParserService: CsvParserService) { }

  @Post('upload/:vendorId')
  @UseInterceptors(FileInterceptor('file'))
  async uploadCsv(
    @UploadedFile() file: Express.Multer.File,
    @Param('vendorId') vendorId: string
  ): Promise<string> {
    if (!file) {
      throw new BadRequestException('File is required');
    }

    if (!vendorId) {
      throw new BadRequestException('Vendor ID is missing from URL parameters');
    }

    try {
      await this.csvImportService.initializeVendor(vendorId);

      await this.csvParserService.processCSV(file.buffer, vendorId);

      return 'CSV file processed successfully';
    } catch (error) {
      throw new InternalServerErrorException('Error processing CSV file');
    }
  }
}
