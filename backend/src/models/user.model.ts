import { Model, DataTypes } from "sequelize";
import sequelize from "../config/db";

export interface UserAttributes {
  userId?: number;
  username: string;
  password: string;
}

export class User extends Model<UserAttributes> implements UserAttributes {
  public userId!: number;
  public username!: string;
  public password!: string;
}

User.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

// Add association
// User.hasMany(Stock, {
//   foreignKey: 'useruserId',
//   as: 'stocks'
// });

export default User;