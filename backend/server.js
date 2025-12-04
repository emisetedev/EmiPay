const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan('combined'));

// Importar e usar rotas (router index)
const apiRoutes = require('./routes');
app.use('/api', apiRoutes);

// Rota padrão
app.get('/', (req, res) => {
  res.json({
    message: '🚀 EmiPay API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      payments: '/api/payments',
      affiliates: '/api/affiliates',
      admin: '/api/admin'
    }
  });
});

// Inicializar DB Sequelize e iniciar servidor após sync
const db = require('./models');

async function startServer(port, retries = 3) {
  try {
    const server = app.listen(port, () => {
      console.log(`✅ EmiPay API running on port ${port}`);
      console.log(`📚 Documentation: http://localhost:${port}`);
    });

    server.on('error', (err) => {
      if (err && err.code === 'EADDRINUSE') {
        console.error(`Port ${port} is already in use.`);
        if (retries > 0) {
          const nextPort = Number(port) + 1;
          console.log(`Trying port ${nextPort} (retries left: ${retries - 1})...`);
          setTimeout(() => startServer(nextPort, retries - 1), 500);
        } else {
          console.error('No available ports found after retries. Exiting.');
          process.exit(1);
        }
      } else {
        console.error('Server error:', err);
        process.exit(1);
      }
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

async function start() {
  try {
    await db.sequelize.sync();
    console.log('Sequelize sync complete');

    const PORT = process.env.PORT || 3000;
    await startServer(PORT, 5);
  } catch (err) {
    console.error('Unable to start server, DB sync failed:', err);
    process.exit(1);
  }
}

start();