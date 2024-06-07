const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
const port = 8050;

// Use middleware
app.use(bodyParser.json());
app.use(cors());

// @GET /api/at
// Read the contents of AustriaData.json
app.get("/api/at", (req, res) => {
  const filePath = path.join(__dirname, "data", "AustriaData.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading Austria data:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    // Send file contents in response
    res.json(JSON.parse(data));
  });
});

// @GET /api/world
// Read the contents of CountryData.json
app.get("/api/world", (req, res) => {
  const filePath = path.join(__dirname, "data", "CountryData.json");
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading World data:", err);
      res.status(500).json({ error: "Internal Server Error" });
      return;
    }
    res.json(JSON.parse(data));
  });
});

// start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
