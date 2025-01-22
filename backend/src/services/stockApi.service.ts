import axios from "axios";
import createError from "http-errors";
import { config } from "../config/config";

const ALPHA_VANTAGE_API_KEY = config.ALPHA_VANTAGE_API_KEY;
const BASE_URL = "https://www.alphavantage.co/query";

export interface StockPrice {
  symbol: string;
  price: number;
}

interface AlphaVantageResponse {
  "Global Quote": {
    "05. price": string;
  };
}

export class StockApiService {
  static async getCurrentPrice(symbol: string): Promise<number> {
    try {
      const response = await axios.get<AlphaVantageResponse>(BASE_URL, {
        params: {
          function: "GLOBAL_QUOTE",
          symbol,
          interval: "5min",
          apikey: ALPHA_VANTAGE_API_KEY,
        },
      });
      const price = response.data["Global Quote"]?.["05. price"];
      if (!price) {
        throw createError(404, `Price not found for ${symbol}`);
      }

      return parseFloat(price);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw createError(500, `Failed to fetch price for ${symbol}`);
    }
  }

  // Predefined list of popular stocks
  static readonly AVAILABLE_STOCKS = [
    { ticker: "AAPL", name: "Apple Inc." },
    { ticker: "MSFT", name: "Microsoft Corporation" },
    { ticker: "GOOGL", name: "Alphabet Inc." },
    { ticker: "AMZN", name: "Amazon.com Inc." },
    { ticker: "META", name: "Meta Platforms Inc." },
    { ticker: "TSLA", name: "Tesla Inc." },
    { ticker: "NVDA", name: "NVIDIA Corporation" },
    { ticker: "JPM", name: "JPMorgan Chase & Co." },
    { ticker: "DIS", name: "The Walt Disney Company" },
    { ticker: "NFLX", name: "Netflix Inc." },
  ];
}
