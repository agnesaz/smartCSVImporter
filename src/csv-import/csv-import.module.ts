import { Module } from '@nestjs/common';
import { CsvImportService } from './csv-import.service';
import { CsvParserService } from './csv-parser.service';
import { ProductModule } from '../product/product.module';
import { VendorModule } from '../vendor/vendor.module';
import { CsvImportController } from './csv-import.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { ManufacturerService } from 'manufacturer/manufacturer.service';
import { ManufacturerSchema } from 'manufacturer/manufacturer.schema';

@Module({
  imports: [ProductModule, VendorModule,
    MongooseModule.forFeature([{ name: 'Manufacturer', schema: ManufacturerSchema }]),
  ],
  providers: [CsvImportService, CsvParserService, ManufacturerService],
  controllers: [CsvImportController]
})
export class CsvImportModule {}
