import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vendor } from './vendor.schema';

@Injectable()
export class VendorService {
  constructor(
    @InjectModel('Vendor') private readonly vendorModel: Model<Vendor>,
  ) { }

  async createVendor(vendorId: string, name: string): Promise<Vendor> {

    const result = await this.vendorModel.findOneAndUpdate(
      { _id: vendorId },
      { name },
      {
        upsert: true,
        new: true,
      }
    ).exec();

    if (!result) {
      throw new NotFoundException(`Vendor with ID ${vendorId} not found`);
    }

    return result;
  }

  async findById(id: string): Promise<Vendor | null> {
    return this.vendorModel.findById(id).exec();
  }

}
