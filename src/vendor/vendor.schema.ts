import { Schema, Document } from 'mongoose';

export const VendorSchema = new Schema({
  _id: { type: String, required: true },
  name: { type: String, unique: true, required: true },
}, {
  timestamps: true,
});

export interface Vendor extends Document {
  _id: string; 
  name: string;
}