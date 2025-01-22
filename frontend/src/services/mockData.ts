import { Stock } from '../types/stock';

export const mockStocks: Stock[] = [
  {
    id: 1,
    name: "Apple Inc.",
    ticker: "AAPL",
    quantity: 10,
    buyPrice: 150.50,
    currentPrice: 175.25,
    profit: 247.50  // (175.25 - 150.50) * 10
  },
  {
    id: 2,
    name: "Microsoft Corporation",
    ticker: "MSFT",
    quantity: 5,
    buyPrice: 280.00,
    currentPrice: 310.75,
    profit: 153.75  // (310.75 - 280.00) * 5
  },
  {
    id: 3,
    name: "Tesla Inc.",
    ticker: "TSLA",
    quantity: 3,
    buyPrice: 200.00,
    currentPrice: 180.50,
    profit: -58.50  // (180.50 - 200.00) * 3
  }
];

export const mockApiCalls = {
  fetchStocks: async () => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return { stocks: mockStocks };
  },

  addStock: async (stock: Partial<Stock>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      id: Math.floor(Math.random() * 1000),
      name: stock.name || '',
      ticker: stock.ticker || '',
      quantity: stock.quantity || 0,
      buyPrice: stock.buyPrice || 0,
      currentPrice: stock.buyPrice || 0,
      profit: 0
    } as Stock;
  },

  updateStock: async (id: number, stock: Partial<Stock>) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
      ...stock,
      id,
      currentPrice: stock.buyPrice || 0,
      profit: 0
    } as Stock;
  },

  deleteStock: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { message: "Stock deleted successfully" };
  }
}; 