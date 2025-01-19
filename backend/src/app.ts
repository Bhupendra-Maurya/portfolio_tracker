import express from "express";
import stockRouter from "./routes/stock.routes";

const app = express();
app.use(express.json());

// Middleware
app.use(express.json());

// Routes
app.get("/api/stocks", (req, res) => {
  res.send("Hello World");
}); 

app.use("/api/stocks", stockRouter);

// Error Handling Middleware
// app.use(globalErrorHandler);

export default app;
