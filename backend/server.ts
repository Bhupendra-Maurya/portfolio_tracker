import dotenv from "dotenv";
dotenv.config();

import app from "./src/app";
import sequelize from "./src/config/db";
import { config } from "./src/config/config";

const PORT = config.SERVER_PORT || 8000;

(async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync(); // Sync database
    console.log("Database connected!");

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();
