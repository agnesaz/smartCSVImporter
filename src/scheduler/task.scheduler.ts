import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ProductService } from 'product/product.service';
import { GptEnhancerService } from 'gpt/gpt-enhancer.service';


@Injectable()
export class TaskScheduler {
  constructor(
    private readonly productService: ProductService,
    private readonly gptService: GptEnhancerService
  ) { }

  @Cron('0 0 * * *')
  async importAndEnhanceProducts() {
    try {
      const products = await this.productService.getProductsToEnhance(10);

      for (const product of products) {
        const newDescription = await this.gptService.enhanceDescription({
          name: product.name,
          description: product.description,
          category: product.categoryName,
        });

        if (newDescription) {
          await this.productService.updateProductDescription(product._id, newDescription);
        }
      }
    } catch (error) {
      //todo:
      //add logger module
    }
  }
}
