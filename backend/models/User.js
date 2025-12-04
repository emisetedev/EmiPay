module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    company_name: {
      type: DataTypes.STRING
    },
    document: {
      type: DataTypes.STRING
    },
    phone: {
      type: DataTypes.STRING
    },
    plan_type: {
      type: DataTypes.ENUM('free', 'growth', 'pro'),
      defaultValue: 'free'
    },
    balance: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0.00
    },
    available_balance: {
      type: DataTypes.DECIMAL(10,2),
      defaultValue: 0.00
    },
    affiliate_code: {
      type: DataTypes.STRING,
      unique: true
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    tableName: 'users',
    timestamps: true,
    underscored: true
  });

  User.associate = function(models) {
    User.hasMany(models.Product, { foreignKey: 'user_id', as: 'products' });
    User.hasMany(models.Payment, { foreignKey: 'user_id', as: 'payments' });
    User.hasMany(models.Transaction, { foreignKey: 'user_id', as: 'transactions' });
  };

  return User;
};