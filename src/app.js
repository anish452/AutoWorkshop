const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const env = require('./config/env');
const logger = require('./config/logger');
const errorHandler = require('./presentation/middlewares/errorHandler');

const authRoutes = require('./presentation/routes/authRoutes');
const userRoutes = require('./presentation/routes/userRoutes');
const customerRoutes = require('./presentation/routes/customerRoutes');
const vehicleRoutes = require('./presentation/routes/vehicleRoutes');
const jobRoutes = require('./presentation/routes/jobRoutes');
const dashboardRoutes = require('./presentation/routes/dashboardRoutes');

const app = express();

app.use(helmet());
app.use(cors({ origin: env.CORS_ORIGIN === '*' ? true : env.CORS_ORIGIN }));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  message: { success: false, message: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

app.get('/health', (req, res) => {
  res.json({
    success: true,
    message: 'AutoRepairAgent API is running',
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  });
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', userRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

app.use(errorHandler);

module.exports = app;
