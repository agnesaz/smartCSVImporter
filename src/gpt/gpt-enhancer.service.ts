import { Injectable } from '@nestjs/common';
import { OpenAI } from 'openai';

@Injectable()
export class GptEnhancerService {
  openai: OpenAI;

  constructor() {
    this.openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  async enhanceDescription(product: { name: string; description: string; category: string }) {
    const prompt = `
    You are an expert in medical sales. Your specialty is medical consumables used by hospitals on a daily basis. Your task is to enhance the description of a product based on the information provided.

    Product name: ${product.name}
    Product description: ${product.description}
    Category: ${product.category}


    New Description:
    `;

    const response = await this.callGPT(prompt);
    if (response.choices && response.choices.length > 0) {
      return response.choices[0].message.content;
    } else {
      throw new Error('Invalid response from GPT-4 API');
    }
  }

  private async callGPT(prompt: string) {
    try {
      const response = await this.openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: 'system', content: "You are a system." },
          { role: 'user', content: prompt }
        ],
      });

      return response;
    } catch (error) {
      console.error('Error calling GPT-4 API:', error);
      throw error;
    }
  }
}
