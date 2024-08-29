const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/user");

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

const corsOptions = {
  origin: "http://localhost:5173", // URL của frontend http://127.0.0.1:5173
  //origin: "http://127.0.0.1:5173", // URL của frontend
  credentials: true, // Để cho phép gửi và nhận cookies
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
// ROUTES
app.use("/v2/auth", authRoute);

// USER ROUTES
app.use("/v2/user", userRoute);

app.listen(8000, function () {
  console.log("Server is Running...");
});

//AUTHENTICATION
// 1. LOGIN
// 2. SIGNUP

//AUTHORIZATION
