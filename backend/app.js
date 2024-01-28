const path = require('path');
require('dotenv').config({
  override: true,
  path: path.join(__dirname, '../.env'),
});

const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Test route to remove
app.get('/', (req, res) => {
  res.send('Test Route to remove');
});

module.exports = app;
