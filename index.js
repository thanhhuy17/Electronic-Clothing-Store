const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");

dotenv.config();
const app = express();

// Cách chạy MongoDB mới
async function connectToMongoDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected To Mongoose DB!");
  } catch (err) {
    console.error("Error Connecting To MongoDB", err);
  }
}

connectToMongoDB();
// mongoose.connect(process.env.MONGODB_URL, () => {
//   console.log("Connected To Mongoose DB!");
// });

app.use(cors());
app.use(cookieParser());
app.use(express.json());
// ROUTES
app.use("/v2/auth", authRoute);

app.listen(8000, function () {
  console.log("Server is Running...");
});

//AUTHENTICATION
// 1. LOGIN
// 2. SIGNUP

//AUTHORIZATION
