module.exports = (sequelize, DataTypes) => {
  const WebhookLog = sequelize.define('WebhookLog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    event_type: {
      type: DataTypes.STRING,
      allowNull: false
    },
    payload: {
      type: DataTypes.JSON,
      allowNull: false
    },
    source: {
      type: DataTypes.ENUM('asaas', 'stripe', 'mercadopago', 'internal'),
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('pending', 'processed', 'failed'),
      defaultValue: 'pending'
    },
    response_status: {
      type: DataTypes.INTEGER
    },
    response_body: {
      type: DataTypes.TEXT
    },
    attempts: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    last_attempt_at: {
      type: DataTypes.DATE
    },
    processed_at: {
      type: DataTypes.DATE
    }
  }, {
    tableName: 'webhook_logs',
    timestamps: true,
    underscored: true
  });

  WebhookLog.associate = function(models) {
    WebhookLog.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return WebhookLog;
};