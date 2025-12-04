module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    plan_type: {
      type: DataTypes.ENUM('free', 'growth', 'pro', 'checkout_starter', 'checkout_pro', 'checkout_enterprise'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('active', 'inactive', 'cancelled', 'trial'),
      defaultValue: 'trial'
    },
    current_period_start: {
      type: DataTypes.DATE,
      allowNull: false
    },
    current_period_end: {
      type: DataTypes.DATE,
      allowNull: false
    },
    trial_end: {
      type: DataTypes.DATE
    },
    cancel_at_period_end: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    external_subscription_id: {
      type: DataTypes.STRING // ID no gateway de pagamento
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: {}
    }
  }, {
    tableName: 'subscriptions',
    timestamps: true,
    underscored: true
  });

  Subscription.associate = function(models) {
    Subscription.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Subscription;
};