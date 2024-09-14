import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VendorService } from './vendor.service';
import { VendorSchema } from './vendor.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Vendor', schema: VendorSchema }])
  ],
  providers: [VendorService],
  exports: [VendorService],
})
export class VendorModule {}
