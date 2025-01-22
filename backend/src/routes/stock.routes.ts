import { Router } from "express";
import {
  getAllStocks,
  updateStock,
  deleteStock,
  generateRandomPortfolio,
  addStock
} from "../controllers/stock.controller";

const stockRouter = Router();

stockRouter.post("/", addStock);
stockRouter.get("/", getAllStocks);
stockRouter.put("/:id", updateStock);
stockRouter.delete("/:id", deleteStock);
stockRouter.post("/generate-portfolio", generateRandomPortfolio);

export default stockRouter;
