const { Presensi } = require("../models");
const { Op } = require("sequelize");

exports.getDailyReport = async (req, res) => {
    try {
        console.log("Controller: Mengambil data laporan harian dari database...");
        const { nama, tanggalMulai, tanggalSelesai } = req.query;
        let options = { where: {} };

        // filter nama (opsional)
        if (nama) {
            options.where.nama = { [Op.like]: `%${nama}%` };
        }

        // filter rentang tanggal (opsional)
        if (tanggalMulai && tanggalSelesai) {
            options.where.checkIn = {
                [Op.between]: [new Date(tanggalMulai), new Date(tanggalSelesai)],
            };
        }

        // ambil data dari tabel presensi
        const records = await Presensi.findAll(options);

        res.status(200).json({
            reportDate: new Date().toLocaleDateString(),
            total: records.length,
            data: records,
        });
    } catch (error) {
        res.status(500).json({
            message: "Gagal mengambil laporan",
            error: error.message,
        });
    }
};
