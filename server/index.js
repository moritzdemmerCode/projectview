const express = require("express");
const cors = require("cors");
const mongodb = require("./mongodb.js");
const projectRoutes = require("./routes/projects");
const authRoutes = require("./routes/auth");
const app = express();

require("dotenv").config();
mongodb.connectDB();
app.use(cors());
app.use(express.json());


app.use("/api/projects", projectRoutes);
app.use("/api/auth", authRoutes)

const server = app.listen(process.env.REACT_APP_PORT,process.env.REACT_APP_HOST, () =>
  console.log(`Server started on ${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}`)
);


