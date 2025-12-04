exports.validatePayment = (req, res, next) => {
  const { amount, payment_method } = req.body;
  if (amount === undefined || isNaN(Number(amount))) return res.status(400).json({ error: 'Amount inválido' });
  if (!payment_method) return res.status(400).json({ error: 'payment_method obrigatório' });
  next();
};

exports.validateProduct = (req, res, next) => {
  const { name, price } = req.body;
  if (!name || typeof name !== 'string' || name.trim().length === 0) return res.status(400).json({ error: 'name obrigatório' });
  if (price === undefined || isNaN(Number(price))) return res.status(400).json({ error: 'price inválido' });
  next();
};

exports.validateAffiliate = (req, res, next) => {
  const { name, email } = req.body;
  if (!name || typeof name !== 'string' || name.trim().length === 0) return res.status(400).json({ error: 'name obrigatório' });
  if (!email || typeof email !== 'string' || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return res.status(400).json({ error: 'email inválido' });
  next();
};
