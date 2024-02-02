const express = require('express');

const router = express.Router();

const psqlDb = require('../db/postgres_utils');

const mongoDb = require('../db/mongo_utils');

// need to align together on mongoDB request format!
function convertRequestToJSON(request) {
  const obj = {
    headers: request.headers,
    body: request.body,
    method: request.method,
    path: request.path,
    query: request.query,
  };

  return obj;
}

// log a received request

// route below is structured to work with both /:bin_path and /:bin_path/:however_many_optional_paths - see https://stackoverflow.com/questions/10020099/express-js-routing-optional-splat-param
router.all('/:bin_path/:remaining_path*?', async (req, res, next) => {
  // check if bin exists and if it doesn't exist return error
  const uuid = req.params.bin_path;
  let binId;

  try {
    binId = await psqlDb.getBinId(uuid);
  } catch (error) {
    return next(error);
  }

  // if bin does exist create request in bin
  const requestJSON = convertRequestToJSON(req);

  // add request to MongoDB
  const mongoRequest = await mongoDb.createRequest(requestJSON);
  // add request to Postgres
  const mongoId = mongoRequest.id;
  const newRequest = await psqlDb.createRequest(binId, mongoId, req.method, req.path);
  // respond with success
  const appSocket = req.app.get('socketio');
  appSocket.to(uuid).emit('newRequest', newRequest);
  return res.json({ success: true }).status(200);
});

module.exports = router;
