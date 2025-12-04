module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    currency: {
      type: DataTypes.STRING(3),
      defaultValue: 'BRL'
    },
    type: {
      type: DataTypes.ENUM('physical', 'digital', 'service', 'subscription'),
      defaultValue: 'digital'
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    stock_quantity: {
      type: DataTypes.INTEGER,
      defaultValue: null // null = ilimitado
    },
    digital_file_url: {
      type: DataTypes.STRING // Para produtos digitais
    },
    metadata: {
      type: DataTypes.JSON,
      defaultValue: {}
    },
    checkout_settings: {
      type: DataTypes.JSON,
      defaultValue: {
        allow_installments: true,
        max_installments: 12,
        allow_pix: true,
        allow_card: true
      }
    }
  }, {
    tableName: 'products',
    timestamps: true,
    underscored: true
  });

  Product.associate = function(models) {
    Product.belongsTo(models.User, { foreignKey: 'user_id', as: 'merchant' });
    Product.hasMany(models.Payment, { foreignKey: 'product_id', as: 'payments' });
  };

  return Product;
};