const Sequelize = require('sequelize');
const sequelize = require('../config/db');

const User = require('./user')(sequelize, Sequelize.DataTypes);
const Transaction = require('./transaction')(sequelize, Sequelize.DataTypes);

// Relasi
User.hasMany(Transaction, { foreignKey: 'user_id' });
Transaction.belongsTo(User, { foreignKey: 'user_id' });

module.exports = {
  sequelize,
  User,
  Transaction,
};
