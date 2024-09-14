import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';
import { generateDocId } from 'common/utils';

@Injectable()
export class ProductService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) { }

  async upsertProduct(productData: any) {
    try {
      const existingProduct = await this.productModel.findOne({ productID: productData.productId }).exec();

      if (existingProduct) {
        const result = await this.productModel.updateOne({ productID: productData.productID }, productData);
      } else {
        // Insert new product
        const newProduct = new this.productModel({
          ...productData,
          docId: generateDocId(),
        });
        const savedProduct = await newProduct.save();
        console.log('Inserted new product:', savedProduct);
      }
    } catch (error) {
      console.error('Error in upsertProduct:', error);
    }
  }

  async findByProductId(productId: string): Promise<Product | null> {
    return this.productModel.findOne({ productId }).exec();
  }
  async createOrUpdateProduct(productId: any, vendorId: any, manufactureId: any, name: any, description: any, categoryName: any, variants: any): Promise<Product> {
    const product = await this.productModel.findOneAndUpdate(
      { productId }, 
      {
        vendorId,
        manufactureId,
        description: description,
        name: name,
        categoryName: categoryName,
        variants,
      }, 
      {
        upsert: true, 
        new: true, 
      },
    ).exec();

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return product;
  }

  async getProductsToEnhance(limit: number): Promise<Product[]> {
    return this.productModel
      .find({ enhanced: { $ne: true } }) 
      .limit(limit)                     
      .exec();                          
  }

  async updateProductDescription(productId: any, newDescription: string): Promise<void> {
    await this.productModel.updateOne(
      { _id: productId },                    
      { description: newDescription, enhanced: true },  
    ).exec();
  }

  async updateProductStatus(productId: string, update: any): Promise<Product> {
    try {
      const updatedProduct = await this.productModel.findByIdAndUpdate(
        productId,
        update,
        { new: true, runValidators: true }
      );
      if (!updatedProduct) {
        throw new Error(`Product with ID ${productId} not found`);
      }
      return updatedProduct;
    } catch (error) {
      console.error(`Error updating product status: ${error}`);
      throw error;
    }
  }
}
