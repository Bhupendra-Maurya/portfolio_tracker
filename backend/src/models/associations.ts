import User from './user.model';
import Stock from './stock.model';

// Define associations
User.hasMany(Stock, {
  foreignKey: 'userId',
  as: 'stocks'
});

Stock.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

export { User, Stock }; 