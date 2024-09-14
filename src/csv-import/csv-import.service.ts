import { Injectable } from '@nestjs/common';
import { VendorService } from '../vendor/vendor.service';

@Injectable()
export class CsvImportService {
  constructor(
    private readonly vendorService: VendorService,
  ) { }

  async initializeVendor(vendorId: string) {

    let vendorName = 'AIM';
    await this.vendorService.createVendor(vendorId, vendorName);
  }
}
