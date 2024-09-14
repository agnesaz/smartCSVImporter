import { Module } from '@nestjs/common';
import { CsvImportModule } from './csv-import/csv-import.module';
import { ProductModule } from './product/product.module';
import { VendorModule } from './vendor/vendor.module';
// import { GptModule } from './gpt/gpt.module';
import { SchedulerModule } from './scheduler/scheduler.module';
import { DatabaseModule } from './database/database.module';
import { CsvImportService } from 'csv-import/csv-import.service';
import { CsvParserService } from 'csv-import/csv-parser.service';
import { ManufacturerModule } from 'manufacturer/manufacturer.module';

@Module({
  imports: [
    DatabaseModule,
    CsvImportModule,
    ProductModule,
    VendorModule,
    SchedulerModule,
    ManufacturerModule,
  ],
  controllers: [],
  providers: [CsvImportService, CsvParserService],
})
export class AppModule {}
