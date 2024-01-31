const express = require('express');

const router = express.Router();

const psqlDb = require('../db/postgres_utils');

const mongoDb = require('../db/mongo_utils');
const { HttpError } = require('../helpers');

// need to align together on mongoDB request format!
function convertRequestToJSON(request) {
  const obj = {
    headers: request.headers,
    body: request.body,
    method: request.method,
    path: request.path,
    query: request.query,
  };

  return JSON.stringify(obj);
}

// log a received request

router.all('/:bin_path/*', async (req, res) => {
  // check if bin exists and if it doesn't exist return error
  const uuid = req.params.bin_path;
  const binId = await psqlDb.getBinId(uuid);

  if (binId === undefined) {
    res.json({ error: 'That bin does not exist' }).status(400); // change object or status later
    return;
  }

  // if bin does exist create request in bin
  const requestJSON = convertRequestToJSON(req);

  // add request to MongoDB
  const mongoRequest = await mongoDb.createRequest(requestJSON);
  // add request to Postgres
  const mongoId = mongoRequest.id;
  psqlDb.createRequest(binId, mongoId, req.method, req.path);
  // respond with success
  res.json({ success: true }).status(200);
});

router.all('/:bin_path', async (req, res) => {
  // check if bin exists and if it doesn't exist return error
  const uuid = req.params.bin_path;
  const binId = await psqlDb.getBinId(uuid);

  if (binId === undefined) {
    res.json({ error: 'That bin does not exist' }).status(400); // change object or status later
    return;
  }
  // if bin does exist create request in bin
  const requestJSON = convertRequestToJSON(req);

  // add request to MongoDB
  const mongoRequest = await mongoDb.createRequest(requestJSON);
  // add request to Postgres
  const mongoId = mongoRequest.id;
  psqlDb.createRequest(binId, mongoId, req.method, req.path);
  // respond with success
  res.json({ success: true }).status(200);
});

module.exports = router;
