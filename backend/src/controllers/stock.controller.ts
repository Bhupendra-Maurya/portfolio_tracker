import { Request, Response } from "express";
import Stock from "../models/stock.model";

// Add a new stock
export const addStock = async (req: Request, res: Response) => {
  try {
    const { name, ticker, quantity, buyPrice } = req.body;
    const stock = await Stock.create({ name, ticker, quantity, buyPrice });
    res.status(201).json(stock);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: "Failed to add stock" });
  }
};

// Get all stocks
export const getAllStocks = async (_req: Request, res: Response) => {
  try {
    const stocks = await Stock.findAll();
    res.status(200).json(stocks);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stocks" });
  }
};

// Update a stock
export const updateStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, ticker, quantity, buyPrice } = req.body;

    const stock = await Stock.findByPk(id);
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    await stock.update({ name, ticker, quantity, buyPrice });
    res.status(200).json(stock);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: "Failed to update stock" });
  }
};

// Delete a stock
export const deleteStock = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const stock = await Stock.findByPk(id);
    if (!stock) {
      return res.status(404).json({ error: "Stock not found" });
    }

    await stock.destroy();
    res.status(200).json({ message: "Stock deleted successfully" });
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (error) {
    res.status(500).json({ error: "Failed to delete stock" });
  }
};
