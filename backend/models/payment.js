module.exports = (sequelize, DataTypes) => {
	const Payment = sequelize.define('Payment', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			primaryKey: true
		},
		external_id: {
			type: DataTypes.STRING
		},
		amount: {
			type: DataTypes.DECIMAL(10,2),
			allowNull: false
		},
		net_amount: {
			type: DataTypes.DECIMAL(10,2)
		},
		fee_amount: {
			type: DataTypes.DECIMAL(10,2)
		},
		payment_method: {
			type: DataTypes.STRING
		},
		checkout_type: {
			type: DataTypes.STRING
		},
		checkout_link: {
			type: DataTypes.STRING
		},
		pix_code: {
			type: DataTypes.TEXT
		},
		pix_qr_code: {
			type: DataTypes.TEXT
		},
		status: {
			type: DataTypes.STRING,
			defaultValue: 'pending'
		},
		description: {
			type: DataTypes.TEXT
		},
		metadata: {
			type: DataTypes.JSON,
			defaultValue: {}
		},
		expires_at: {
			type: DataTypes.DATE
		},
		paid_at: {
			type: DataTypes.DATE
		}
	}, {
		tableName: 'payments',
		timestamps: true,
		underscored: true
	});

	Payment.associate = function(models) {
		Payment.belongsTo(models.User, { foreignKey: 'user_id', as: 'user' });
		Payment.hasMany(models.Transaction, { foreignKey: 'payment_id', as: 'transactions' });
	};

	return Payment;
};