module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      balance: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    }, {
      tableName: 'users',  
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    
    });
  
    return User;
  };
  