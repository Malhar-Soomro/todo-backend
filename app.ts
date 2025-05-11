import express from "express";
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRoute = require("./routes/auth");
const todoRoute = require("./routes/todo");
const cors = require("cors");

const PORT = process.env.PORT || 5000;

dotenv.config();

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => console.log("db connection successful"))
    .catch((err:unknown) => console.log(err));


app.use(cors());
app.use(express.json());

//routes 
app.use("/api/auth", authRoute);
app.use("/api/todo", todoRoute);

app.get("/", (req, res) => {
    res.status(200).json("api is working");
});

app.listen(PORT, () => {
  console.log("Server is running");
});

