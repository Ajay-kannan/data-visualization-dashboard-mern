const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv").config();
const Report = require("./model/model");

const uri =
  "mongodb+srv://ajay:chatapppassword@chat-app.osqbmur.mongodb.net/dashboard?retryWrites=true&w=majority";
mongoose
  .connect(uri)
  .then(() => {
    console.log("connect to the db");
  })
  .catch((e) => {
    console.log("error : ", e);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/getintensity", async (req, res) => {
  const allData = await Report.distinct("intensity");
  let result = [];
  for (let index = 0; index < allData.length; index++) {
    const element = allData[index];
    let val = await Report.countDocuments({ intensity: element });
    result.push({ intensity: element, count: val });
  }
  return res.status(200).json({
    success: true,
    data: result,
  });
});

app.get("/getlikelihood", async (req, res) => {
  const allData = await Report.distinct("likelihood");
  let result = [];
  for (let index = 0; index < allData.length; index++) {
    const element = allData[index];
    let val = await Report.countDocuments({ likelihood: element });
    result.push({ likelihood: element, count: val });
  }
  return res.status(200).json({
    success: true,
    data: result,
  });
});

app.get("/getrelevance", async (req, res) => {
  const allData = await Report.distinct("relevance");
  let result = [];
  for (let index = 0; index < allData.length; index++) {
    const element = allData[index];
    let val = await Report.countDocuments({ relevance: element });
    result.push({ relevance: element, count: val });
  }
  return res.status(200).json({
    success: true,
    data: result,
  });
});

app.get("/getcountrydata", async (req, res) => {
  const allData = await Report.distinct("country");
  let result = [];
  for (let index = 0; index < allData.length; index++) {
    const element = allData[index];
    let val = await Report.countDocuments({ country: element });
    result.push({ country: element, count: val });
  }
  return res.status(200).json({
    success: true,
    data: result,
  });
});

app.get("/gettopicsdata", async (req, res) => {
  const allData = await Report.distinct("topic");
  let result = [];
  for (let index = 0; index < allData.length; index++) {
    const element = allData[index];
    let val = await Report.countDocuments({ topic: element });
    result.push({ topic: element, count: val });
  }
  return res.status(200).json({
    success: true,
    data: result,
  });
});

app.get("/getcitydata", async (req, res) => {
  const allData = await Report.distinct("sector");
  let result = [];
  for (let index = 0; index < allData.length; index++) {
    const element = allData[index];
    let val = await Report.countDocuments({ sector: element });
    result.push({ name: element, count: val });
  }
  return res.status(200).json({
    success: true,
    data: result,
  });
});

app.get("/getregiondata", async (req, res) => {
  const allData = await Report.distinct("region");
  let result = [];
  for (let index = 0; index < allData.length; index++) {
    const element = allData[index];
    let val = await Report.countDocuments({ region: element });
    result.push({ region: element, count: val });
  }
  return res.status(200).json({
    success: true,
    data: result,
  });
});

app.get("/getData/:year", async (req, res) => {
  try {
    let year = req.params.year;
    const allData = await Report.find({
      $or: [
        { start_year: year },
        { end_year: year },
        { published: { $regex: year, $options: "i" } },
        { added: { $regex: year, $options: "i" } },
      ],
    });
    if (!allData || allData.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No Data Found",
      });
    }
    return res.status(200).json({
      success: true,
      message: `Filtered by year ${year}`,
      data: allData,
    });
  } catch (e) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));
