import { Request, Response, NextFunction } from "express";
import Stock from "../models/stock.model";
import createError from "http-errors";
import { StockApiService } from "../services/stockApi.service";

// Add a new stock
export const addStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, ticker, quantity, buyPrice } = req.body;
    
    if (!name || !ticker || !quantity || !buyPrice) {
      throw createError(400, "Missing required fields");
    }

    const stock = await Stock.create({ name, ticker, quantity, buyPrice });
    res.status(201).json(stock);
  } catch (error) {
    next(error); // Pass error to global error handler
  }
};

// Get all stocks with real-time prices
export const getAllStocks = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const stocks = await Stock.findAll();
    
    // Fetch real-time prices for all stocks
    const stocksWithPrices = await Promise.all(
      stocks.map(async (stock) => {
        const currentPrice = await StockApiService.getCurrentPrice(stock.ticker);
        const profit = (currentPrice - stock.buyPrice) * stock.quantity;
        
        return {
          ...stock.toJSON(),
          currentPrice,
          profit: Number(profit.toFixed(2))
        };
      })
    );
    
    // Calculate total portfolio value using current prices
    const portfolioValue = stocksWithPrices.reduce((total, stock) => {
      return total + (stock.quantity * stock.currentPrice);
    }, 0);

    res.status(200).json({
      stocks: stocksWithPrices,
      portfolioValue: Number(portfolioValue.toFixed(2))
    });
  } catch (error) {
    next(error);
  }
};

// Update a stock
export const updateStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const { name, ticker, quantity, buyPrice } = req.body;

    const stock = await Stock.findByPk(id);
    if (!stock) {
      throw createError(404, "Stock not found");
    }

    await stock.update({ name, ticker, quantity, buyPrice });
    res.status(200).json(stock);
  } catch (error) {
    next(error);
  }
};

// Delete a stock
export const deleteStock = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    const stock = await Stock.findByPk(id);
    if (!stock) {
      throw createError(404, "Stock not found");
    }

    await stock.destroy();
    res.status(200).json({ message: "Stock deleted successfully" });
  } catch (error) {
    next(error);
  }
};

// Generate random portfolio for user
export const generateRandomPortfolio = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Select 5 random stocks
    const availableStocks = [...StockApiService.AVAILABLE_STOCKS];
    const selectedStocks = [];
    
    for (let i = 0; i < 5; i++) {
      const randomIndex = Math.floor(Math.random() * availableStocks.length);
      selectedStocks.push(availableStocks.splice(randomIndex, 1)[0]);
    }

    // Create stock entries with real-time prices
    const createdStocks = await Promise.all(
      selectedStocks.map(async (stock) => {
        const currentPrice = await StockApiService.getCurrentPrice(stock.ticker);
        return Stock.create({
          name: stock.name,
          ticker: stock.ticker,
          quantity: 1,
          buyPrice: currentPrice
        });
      })
    );

    res.status(201).json(createdStocks);
  } catch (error) {
    next(error);
  }
};
