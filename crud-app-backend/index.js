const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Database

const database = require("./config/database");
database();



//Route
const studentRoute = require("./routes/studentRoute");
app.use("/mahasiswa", studentRoute);


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Aplikasi berjalan di http://localhost:${PORT}`);
});
