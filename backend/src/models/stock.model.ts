import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

interface StockAttributes {
  id?: number;
  name: string;
  ticker: string;
  quantity: number;
  buyPrice: number;
}

class Stock extends Model<StockAttributes> implements StockAttributes {
  public id!: number;
  public name!: string;
  public ticker!: string;
  public quantity!: number;
  public buyPrice!: number;
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
      type: DataTypes.STRING(10),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    buyPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: "Stock",
    tableName: "stocks",
    timestamps: true,
  }
);

export default Stock;
