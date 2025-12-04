function notFound(req, res, next) {
  res.status(404).json({
    error: 'Endpoint not found',
    path: req.originalUrl,
    method: req.method
  });
}

module.exports = notFound;