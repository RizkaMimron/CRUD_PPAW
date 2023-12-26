const mongoose = require("mongoose");

const petugasSchema = new mongoose.Schema({
  nama: {
    type: String,
    required: true,
  },
  jabatan: {
    type: String,
    required: true,
  },
  alamat: {
    type: String,
    required: true,
  },
  lokasi: {
    type: String,
    required: true,
  },
});

const Petugas = mongoose.model("Petugas", petugasSchema);

module.exports = Petugas;
