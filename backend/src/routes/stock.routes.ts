import { Router } from "express";
import {
  addStock,
  getAllStocks,

} from "../controllers/stock.controller";

const stockRouter = Router();

stockRouter.post("/", addStock);
stockRouter.get("/", getAllStocks);


export default stockRouter;
