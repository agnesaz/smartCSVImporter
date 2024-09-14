// import { Module } from '@nestjs/common';
// import { ScheduleModule } from '@nestjs/schedule';  // Import ScheduleModule
// import { CsvImportService } from '../csv-import/csv-import.service';  // Import your service that uses scheduling

// @Module({
//   imports: [
//     ScheduleModule.forRoot(),  // Initialize the schedule module
//   ],
//   providers: [CsvImportService],  // Register services that use scheduling
//   exports: [CsvImportService],  // Export services if needed in other modules
// })
// export class SchedulerModule {}


import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { CsvImportModule } from '../csv-import/csv-import.module';
import { TaskScheduler } from './task.scheduler';
import { CsvImportService } from 'csv-import/csv-import.service';
import { ProductService } from 'product/product.service';
import { VendorService } from 'vendor/vendor.service';
import { CsvParserService } from 'csv-import/csv-parser.service';
import { VendorModule } from 'vendor/vendor.module';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { VendorSchema } from 'vendor/vendor.schema';
import { ProductSchema } from 'product/product.schema';
import { ManufacturerSchema } from 'manufacturer/manufacturer.schema';
import { ManufacturerService } from 'manufacturer/manufacturer.service';
import { GptEnhancerService } from 'gpt/gpt-enhancer.service';

@Module({
  imports: [ScheduleModule.forRoot(), CsvImportModule, VendorModule,
    MongooseModule.forFeature([{ name: 'Vendor', schema: VendorSchema }]), 
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]), 
    MongooseModule.forFeature([{ name: 'Manufacturer', schema: ManufacturerSchema }]), 

  ],
  providers: [TaskScheduler, CsvImportService, ProductService, VendorService, CsvParserService, ManufacturerService,GptEnhancerService],
})
export class SchedulerModule {}
