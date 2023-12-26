const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// MongoURI
const MongoURI =
  "mongodb+srv://rizkamimron:tuwH5oYxcRhzBwWu@cluster0.zspe8pv.mongodb.net/?retryWrites=true&w=majority";
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect(MongoURI);

//Barang Model
const Petugas = require("./models/petugas");

// Handle MongoDB connection events
const db = mongoose.connection;
db.on("error", (error) => console.error("MongoDB connection error:", error));
db.once("open", () => console.log("Connected to MongoDB"));

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    // Ambil data dari database (misalnya, semua data dari model Barang)
    const dataPetugas = await Petugas.find();

    // Kirim data ke tampilan EJS
    res.render("dashboard", { dataPetugas });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving data from the database");
  }
});

router.get("/", (req, res) => {
  res.render("dashboard");
});

//CRUD OPERATION
router.post("/addpetugas", async (req, res) => {
  try {
    const { nama, ttl, jabatan, alamat, lokasi } = req.body;
    const newPetugas = new Petugas({ nama, jabatan, alamat, lokasi });
    await newPetugas.save();
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

router.get("/hapus-petugas", async (req, res) => {
  try {
    const petugasId = req.query.petugasId;

    const result = await Petugas.findByIdAndDelete(petugasId);
    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.redirect("/");
  }
});

router.post("/update-petugas/:id", async (req, res) => {
  try {
    const { nama, jabatan, alamat, lokasi } = req.body;
    const petugasId = req.params.id; // Use req.params.id to get the ID from the URL

    const updatePetugas = await Petugas.findByIdAndUpdate(
      petugasId,
      { nama, jabatan, alamat, lokasi },
      { new: true }
    );

    res.redirect("/");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating data in the database");
  }
});

app.use("/", router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
