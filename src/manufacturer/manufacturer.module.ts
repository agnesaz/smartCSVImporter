import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ManufacturerSchema } from './manufacturer.schema';
import { ManufacturerService } from './manufacturer.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Manufacturer', schema: ManufacturerSchema }]),
  ],
  providers: [ManufacturerService],
  exports: [ManufacturerService], 
})
export class ManufacturerModule {}
