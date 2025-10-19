const express = require('express');
const cors = require('cors');
const presensiRoutes = require('./routes/presensi');
const reportRoutes = require('./routes/reports');
const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/api/presensi', presensiRoutes);
app.use('/api/reports', reportRoutes);

// Logging middleware
app.use((req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

// Routes
const bookRoutes = require('./routes/books');
app.use('/api/books', bookRoutes);

// 404 Middleware
app.use((req, res, next) => {
    res.status(404).json({ message: 'Route not found' });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
