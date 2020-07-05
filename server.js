const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const data = require("./api/data/Data.route");
const mongoURI = require("./config/keys").mongoURI;

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

mongoose
  .connect(mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("Connected to the DB");
  })
  .catch(err => console.log("Error Occured while connecting to DB", err));

app.use("/api/data", data);

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});