# Smart CSV Importer

## Description

The **Smart CSV Importer** is a NestJS-based application that imports a large CSV file, converts the data into JSON format, and saves it to a MongoDB database. Also generates project description based on product name, description and category using OpenAI.


## Endpoints
### 1. Import CSV
POST->  /api/v1/csv-import/upload/:vendorId -> the endpoint that uploads a CSV file and processes it for a specified vendor. It first checks and saves the vendor in db with given json data, then parses and processes the CSV file associated with that vendor.
 Vendor data saved in db (example):
        {
        "_id": "vendor123",
        "name": "Acme Medical Supplies",
        "createdAt": "2024-09-15T10:00:00.000Z",
        "updatedAt": "2024-09-15T10:00:00.000Z"
        }

 Manufacturer data saved in db (example):
        {   
        "_id": "manufacturer123",
        "manufacturerId": "191",
        "name": "Acme Medical Supplies",
        }

 Product data saved in db (example): (from 100k+ rows to 13k products saved in db)
        {
        "_id": "product123",
        "productId": "productId",
        "productName": "Acme Medical Supplies", 
        "description": "This is a medical supply product",
        "categoryName": "Medical Supplies",
        "vendorId": "vendor123",
        "manufacturerId": "manufacturer123",
        "variants":[{variants}],
        "isDeleted": false
        }

### 2.  Cron job that runs daily at midnight.
    At task schleduler file there is a cron job that will be called daily at midnight.
    It fetches 10 products
    Creating a model of gpt to improve generating description.
    Updates products with new descriptions, if any.


## Features

- **CSV Parsing**: Efficiently handles large CSV files with 100k+ rows.
- **Product Management**: Imports, updates, and deletes products with variants.
- **Memory Efficient**: Uses streaming and chunking techniques to manage memory usage.
- **Description Enhancement**: Runs product description enhancements via AI (GPT-4).
- **Vendor and Manufacturer Management**: Associates products with correct vendor and manufacturer IDs.
- **Daily Scheduling**: Automatically imports products from the CSV file daily.

## Technologies Used

- **NestJS**: A framework for building efficient, scalable Node.js applications.
- **TypeScript**: For static type checking and cleaner code.
- **MongoDB**: A NoSQL database for storing products and their variants.
- **Mongoose**: For interacting with MongoDB.
- **csv-parser**: A CSV parsing library for handling large files.
- **nanoid/uuid**: For generating unique document IDs.
- **Node.js**: For executing JavaScript server-side.
- **OpenAI (optional)**: For enhancing product descriptions using GPT-4.

## Prerequisites

Make sure you have the following installed:
- Node.js (version >= 14.x)
- MongoDB (running locally or remotely)
- A CSV file with product data
- (Optional) GPT-4 API key for product description enhancement

## Getting Started

### 1. Clone the Repository

git clone https://github.com/agnesaz/smartCSVImporter
cd smart-csv-importer


### 2. Install Dependencies

npm install

### 3. Environment Variables
Create a .env file in the root directory with the following configuration:

 OPEN_API_KEY=your-openai-api-key 

### 5. Run the Project
To run the project, use the following command:
npm run start

### Project Structure
-   src/ - Source code for the application.
-   src/app.module.ts - Main application module.
-   src/csv-import - Handles CSV parsing and product importing.
-   src/scheduler - Contains the scheduled task logic for daily imports.
-   src/product - Module for product containing service, controller and model for managing products in MongoDB.
-   src/vendor - Module for vendor containing service, controller and model for managing vendors in MongoDB..
-   src/manufacturer - Module for manufacturer containing service, controller and model for managing manufacturers in MongoDB..
