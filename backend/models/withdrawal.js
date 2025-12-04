module.exports = (sequelize, DataTypes) => {
  const Withdrawal = sequelize.define('Withdrawal', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    fee: {
      type: DataTypes.DECIMAL(10, 2),
      defaultValue: 0.00
    },
    net_amount: {
      type: DataTypes.DECIMAL(10, 2)
    },
    status: {
      type: DataTypes.ENUM('pending', 'processing', 'completed', 'failed', 'cancelled'),
      defaultValue: 'pending'
    },
    withdrawal_method: {
      type: DataTypes.ENUM('pix', 'ted', 'doc'),
      allowNull: false
    },
    bank_code: {
      type: DataTypes.STRING
    },
    branch_number: {
      type: DataTypes.STRING
    },
    account_number: {
      type: DataTypes.STRING
    },
    account_type: {
      type: DataTypes.ENUM('checking', 'savings')
    },
    pix_key: {
      type: DataTypes.STRING
    },
    pix_key_type: {
      type: DataTypes.ENUM('cpf', 'cnpj', 'email', 'phone', 'random')
    },
    recipient_name: {
      type: DataTypes.STRING
    },
    recipient_document: {
      type: DataTypes.STRING
    },
    external_id: {
      type: DataTypes.STRING // ID da transferência no banco
    },
    processed_at: {
      type: DataTypes.DATE
    },
    failure_reason: {
      type: DataTypes.TEXT
    }
  }, {
    tableName: 'withdrawals',
    timestamps: true,
    underscored: true
  });

  Withdrawal.associate = function(models) {
    Withdrawal.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
  };

  return Withdrawal;
};