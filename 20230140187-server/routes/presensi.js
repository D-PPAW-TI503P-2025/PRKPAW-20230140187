const express = require('express');
const router = express.Router();

let presensiData = []; // Data presensi disimpan sementara di memori

// ✅ Endpoint Check-in
router.post('/check-in', (req, res) => {
    const { userId } = req.body;
    const today = new Date().toISOString().split('T')[0];

    // Cek apakah user sudah check-in hari ini
    const existing = presensiData.find(
        (p) => p.userId === userId && p.date === today
    );

    if (existing && existing.checkIn) {
        return res.status(400).json({
            message: 'Anda sudah melakukan check-in hari ini',
        });
    }

    const newRecord = {
        userId,
        date: today,
        checkIn: new Date().toLocaleTimeString(),
        checkOut: null,
    };

    presensiData.push(newRecord);

    res.status(201).json({
        message: 'Check-in berhasil',
        data: newRecord,
    });
});

// ✅ Endpoint Check-out
router.post('/check-out', (req, res) => {
    const { userId } = req.body;
    const today = new Date().toISOString().split('T')[0];

    const record = presensiData.find(
        (p) => p.userId === userId && p.date === today
    );

    if (!record || !record.checkIn) {
        return res.status(400).json({
            message: 'Anda belum melakukan check-in hari ini',
        });
    }

    if (record.checkOut) {
        return res.status(400).json({
            message: 'Anda sudah melakukan check-out hari ini',
        });
    }

    record.checkOut = new Date().toLocaleTimeString();

    res.status(200).json({
        message: 'Check-out berhasil',
        data: record,
    });
});

module.exports = router;
