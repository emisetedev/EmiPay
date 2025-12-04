module.exports = (sequelize, DataTypes) => {
  const Affiliate = sequelize.define('Affiliate', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    affiliate_code: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true
      }
    },
    commission_rate: {
      type: DataTypes.DECIMAL(5, 2), // Percentual de comissão
      defaultValue: 10.00
    },
    total_earned: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    pending_balance: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    custom_domain: {
      type: DataTypes.STRING
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: {}
    },
  }, {
    tableName: 'affiliates',
    timestamps: true,
    underscored: true
  });

  Affiliate.associate = function(models) {
    Affiliate.belongsTo(models.User, { foreignKey: 'user_id', as: 'merchant' });
    Affiliate.hasMany(models.Payment, { foreignKey: 'affiliate_id', as: 'referrals' });
  };

  return Affiliate;
};