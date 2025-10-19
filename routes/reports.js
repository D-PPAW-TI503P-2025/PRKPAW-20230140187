const express = require('express');
const router = express.Router();

const presensiData = [
    { userId: 1, date: '2025-10-19', checkIn: '08:00:00', checkOut: '16:00:00' },
    { userId: 2, date: '2025-10-19', checkIn: '08:30:00', checkOut: '15:45:00' },
];

// ✅ Endpoint Laporan Harian
router.get('/daily', (req, res) => {
    res.status(200).json({
        message: 'Laporan presensi harian',
        total: presensiData.length,
        data: presensiData,
    });
});

module.exports = router;
