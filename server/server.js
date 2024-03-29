const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");

const DEFAULT_PORT = 3001;

const UPDATE_JSON_FILE = path.join(__dirname, "data/data.json");
const UPDATE_JSON_ENDPOINT = "/api/update_json";
const READ_JSON_FILE = path.join(__dirname, "data/data.json");
const READ_JSON_ENDPOINT = "/api/read_json";

const server = express();

server.use(cors());

const rawParser = bodyParser.raw({ type: "*/*" });
server.post(UPDATE_JSON_ENDPOINT, rawParser, (req, res) => {
  const data = req.body instanceof Buffer ? req.body : Buffer.alloc(0);
  fs.writeFile(UPDATE_JSON_FILE, data, (err) => {
    if (!err) {
      console.log(`Wrote ${Buffer.byteLength(data)} bytes`);
      res.status(200).send("Success!");
    } else {
      console.log(err.toString());
      res.status(500).send(err.toString());
    }
  });
});

server.get(READ_JSON_ENDPOINT, (req, res) => {
  fs.readFile(READ_JSON_FILE, (err, data) => {
    if (!err) {
      const jsonData = JSON.parse(data.toString());
      res.status(200).send(jsonData);
    } else {
      console.log(err.toString());
      res.status(500).send(err.toString());
    }
  });
});

server.get(UPDATE_JSON_ENDPOINT, (req, res) => {
  res.status(400).send("POST requests only!");
});

const port = process.env.PORT || DEFAULT_PORT;

console.log(`Listening on port ${port}`);
server.listen(port);
