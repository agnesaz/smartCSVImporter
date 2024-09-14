# Smart CSV Importer

## Description

The **Smart CSV Importer** is a NestJS-based application that imports a large CSV file, converts the data into JSON format, and saves it to a MongoDB database. This project is designed to handle large datasets efficiently, ensuring proper memory management and handling product variants correctly.

It performs the following key operations:
- Imports and parses large CSV files.
- Converts CSV rows into products with variants.
- Inserts, updates, or deletes products from the MongoDB database.
- Enhances product descriptions using an external AI (e.g., GPT-4) for specific fields.
- Handles scheduled tasks for automated imports.

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
