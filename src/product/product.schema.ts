import { Schema, Document } from 'mongoose';

const VariantAttributesSchema = new Schema({
  packaging: { type: String, required: true },
  description: { type: String, required: false }
});

const VariantSchema = new Schema({
  id: { type: String, required: true },
  itemId: { type: String, required: false },
  attributes: { type: VariantAttributesSchema, required: true },
  cost: { type: Number, required: true },
  currency: { type: String, required: true, default: 'USD' },
  depth: { type: Number, required: false },
  description: { type: String, required: false },
  dimensionUom: { type: String, required: false },
  height: { type: Number, required: false },
  width: { type: Number, required: false },
  manufacturerItemCode: { type: String, required: false },
  manufacturerItemId: { type: String, required: false },
  packaging: { type: String, required: false },
  price: { type: String, required: false },
  sku: { type: String, required: true },
  active: { type: Boolean, default: false },
  itemCode: { type: String, required: false },
  quantityOnHand: { type: String, required: false },
});

export const ProductSchema = new Schema({
  productId: { type: String, unique: true },
  name: { type: String },
  vendorId: { type: String },
  manufactureId: { type: String },
  description: { type: String },
  categoryName: { type: String },
  variants: [VariantSchema],
  isDeleted: { type: Boolean, default: false },
});

export interface Product extends Document {
  productId: string;
  name: string;
  vendorId: string;
  manufactureId: string;
  description: string;
  categoryName: string;
  variants: Array<{
    id?: string;
    itemId?: string;
    attributes?: {
      packaging?: string;
      description?: string;
    };
    cost?: number;
    currency?: string;
    depth?: number;
    description?: string;
    dimensionUom?: string;
    height?: number;
    width?: number;
    manufacturerItemCode?: string;
    manufacturerItemId?: string;
    packaging?: string;
    price?: string;
    sku?: string;
    active?: boolean;
    isDeleted?: boolean;
    itemCode?: string;
    quantityOnHand?: string;
  }>;
  isDeleted: boolean;
}
