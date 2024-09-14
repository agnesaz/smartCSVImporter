import { Controller, Post, Delete, Param, Body } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async upsertProduct(@Body() productData: any) {
    await this.productService.upsertProduct(productData);
  }
}
