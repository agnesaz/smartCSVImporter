
import { Injectable } from '@nestjs/common';
import csvParser from 'csv-parser';
import { ProductService } from '../product/product.service';
import { VendorService } from '../vendor/vendor.service';
import { Readable } from 'stream';
import { ManufacturerService } from 'manufacturer/manufacturer.service';

@Injectable()
export class CsvParserService {
  constructor(
    private readonly productService: ProductService,
    private readonly vendorService: VendorService,
    private readonly manufacturerService: ManufacturerService

  ) { }

  async processCSV(file: Buffer, vendorId: string): Promise<void> {
    // Find the vendor by its ID
    const vendor = await this.vendorService.findById(vendorId);
    if (!vendor) {
      throw new Error(`Vendor with ID ${vendorId} not found`);
    }

    const vendorName = vendor.name;

    // Convert the file buffer to a readable stream
    const readableStream = Readable.from(file);

    readableStream
      .pipe(csvParser())
      .on('data', async (row) => {
        // Extract relevant fields from the row
        const sourceName = row['SiteSource'];
        const manufacturerId = row['ManufacturerID'];
        const manufacturerName = row['ManufacturerName'];
        const productId = row['ProductID'];
        const productDescription = row['ProductDescription'];
        const packaging = row['PKG'];
        const unitPrice = row['UnitPrice'];
        const quantityOnHand = row['QuantityOnHand'];
        const itemDescription = row['ItemDescription'];
        const itemId = row['ItemID'];
        const productName = row['ProductName'];
        const sku = itemId + productId + packaging;
        const categoryName = row['CategoryName']

        // Check if the SiteSource matches the vendor's name
        if (sourceName === vendorName) {

          // Skip if ManufacturerID or ManufacturerName is missing
          if (!manufacturerId || !manufacturerName) {
            console.log(`Skipping row due to missing ManufacturerID or ManufacturerName.`);
            return;
          }

          // Find or create the manufacturer
          let manufacturer = await this.manufacturerService.findByManufacturerId(manufacturerId);
          if (!manufacturer) {
            manufacturer = await this.manufacturerService.createOrUpdateManufacturer(manufacturerId, manufacturerName);
          }

          // Handle product creation or update
          if (productId) {
            let product = await this.productService.findByProductId(productId);

            const newVariant = {
              itemId: itemId,
              attributes: {
                packaging: packaging,
                description: itemDescription,
              },
              price: unitPrice,
              quantityOnHand: quantityOnHand,
              sku: sku,
              active: quantityOnHand > 0
            };

            if (product) {
              // Check if the variant already exists based on `packaging` and `description`
              const variantExists = product.variants.some(
                (variant) =>
                  variant?.attributes?.packaging === packaging &&
                  variant?.attributes?.description === itemDescription
              );

              if (!variantExists) {
                // Add the new variant if it doesn't exist
                product.variants.push(newVariant);
                product = await this.productService.createOrUpdateProduct(
                  productId, vendorId, manufacturer._id, productName, productDescription, categoryName, product.variants
                );
                console.log(`Updated product ${productId} with new variant.`);
              }
            } else {
              // If the product doesn't exist, create it with the first variant
              product = await this.productService.createOrUpdateProduct(
                productId, vendorId, manufacturer._id, productName, productDescription, categoryName, [newVariant]
              );
              console.log(`Created new product ${productId}.`);
            }
          }
        }
      })
      .on('end', () => {
        //todo
        //change status of product if all of its variants are unactive
        console.log('CSV file processing completed');
      })
      .on('error', (error) => {
        console.error('Error processing CSV file:', error);
      });
  }

}