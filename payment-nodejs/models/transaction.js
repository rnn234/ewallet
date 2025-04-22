module.exports = (sequelize, DataTypes) => {
    const Transaction = sequelize.define('Transaction', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      user_id: DataTypes.INTEGER,
      type: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      status: {
        type: DataTypes.STRING,
        defaultValue: 'pending'
      },
      midtrans_order_id: DataTypes.STRING
    }, {
      tableName: 'transactions',
      createdAt: 'created_at',   // Mapping kolom
      updatedAt: 'updated_at',
    });
  
    return Transaction;
  };
  