import app from "./app";
import { config } from "./config/config";
import sequelize from "./config/db";

const PORT = config.SERVER_PORT;

async function startServer() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Database connected successfully");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
    process.exit(1);
  }
}

startServer(); 