// import { Model, DataTypes } from "sequelize";
// import sequelize from "../config/db";

// interface StockAttributes {
//   id?: number;
//   name: string;
//   ticker: string;
//   quantity: number;
//   buyPrice: number;
// }

// class Stock extends Model<StockAttributes> implements StockAttributes {
//   public id!: number;
//   public name!: string;
//   public ticker!: string;
//   public quantity!: number;
//   public buyPrice!: number;
// }

// Stock.init(
//   {
//     id: {
//       type: DataTypes.INTEGER,
//       autoIncrement: true,
//       primaryKey: true,
//     },
//     name: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     ticker: {
//       type: DataTypes.STRING,
//       allowNull: false,
//     },
//     quantity: {
//       type: DataTypes.INTEGER,
//       allowNull: false,
//     },
//     buyPrice: {
//       type: DataTypes.DECIMAL(10, 2),
//       allowNull: false,
//     },
//   },
//   {
//     sequelize,
//     modelName: "Stock",
//     timestamps: true,
//   }
// );

// export default Stock;

import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

interface StockAttributes {
  id?: number;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
  userId?: number; // Optional to align with database schema
}

class Stock extends Model<StockAttributes> implements StockAttributes {
  public id!: number;
  public name!: string;
  public ticker!: string;
  public quantity!: number;
  public buyPrice!: number;
  public userId!: number; // Foreign key
}

Stock.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ticker: {
      type: DataTypes.STRING(10), // Match schema definition (VARCHAR(10))
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buyPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: true, // Match schema (nullable foreign key)
      references: {
        model: "users", // Refers to 'users' table
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // On user deletion, set stock's userId to NULL
    },
  },
  {
    sequelize,
    modelName: "Stock",
    tableName: "stocks", // Explicit table name
    timestamps: true, // Use Sequelize's `createdAt` and `updatedAt`
  }
);

export default Stock;
