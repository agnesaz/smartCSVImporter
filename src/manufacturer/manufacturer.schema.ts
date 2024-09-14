import { Schema, Document } from 'mongoose';

export const ManufacturerSchema = new Schema({
  manufacturerId: { type: String, unique: true, required: true },
  name: { type: String, required: true },
});

export interface Manufacturer extends Document {
  manufacturerId: string;
  name: string;
}
