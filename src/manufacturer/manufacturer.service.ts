import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Manufacturer } from './manufacturer.schema';

@Injectable()
export class ManufacturerService {
  constructor(
    @InjectModel('Manufacturer') private readonly manufacturerModel: Model<Manufacturer>,
    
  ) {}

  async createOrUpdateManufacturer(manufacturerId: string, name: string): Promise<Manufacturer> {
    const result = await this.manufacturerModel.findOneAndUpdate(
      { manufacturerId }, 
      { name }, 
      { 
        upsert: true, 
        new: true, 
      }
    ).exec();

    if (!result) {
      throw new NotFoundException(`Manufacturer with ID ${manufacturerId} not found`);
    }

    return result;
  }

  async findById(id: string): Promise<Manufacturer | null> {
    return this.manufacturerModel.findById(id).exec();
  }

  async findByManufacturerId(manufacturerId: string): Promise<Manufacturer | null> {
    return this.manufacturerModel.findOne({ manufacturerId }).exec();
  }
}
