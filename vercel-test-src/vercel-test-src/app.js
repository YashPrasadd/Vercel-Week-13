const express = require("express");
const mongoose = require("mongoose");

const database = require("./config/database");
mongoose.connect(database.url);

const Employee = require("./models/employee");

const app = express();
const port = process.env.PORT || 8000;

app.get("/", async (_req, res) => {
  try {
    console.log('fetching employees');
    const employees = await Employee.find();
    return res.json(employees);
  } catch (reason) {
    console.error('there was an error', reason);
    return res.status(500).json(reason);
  }
});

app.listen(port, () => console.log(`Server ready on port ${port}. ${database.url}`));

module.exports = app;
