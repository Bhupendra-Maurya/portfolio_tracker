import express from "express";
import cors from "cors";
import { globalErrorHandler } from "./middleware/error.middleware";
import stockRouter from "./routes/stock.routes";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRouter);
app.use("/api/stocks", stockRouter);

// Error handling
app.use(globalErrorHandler);

export default app;
