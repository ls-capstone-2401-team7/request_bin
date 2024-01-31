const express = require('express');

const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const postgres = require('../db/postgres_utils');
const mongoDb = require('../db/mongo_utils');
const { HttpError } = require('../helpers');

// GET the a home page - maybe make list previously created bins (optional - do later if time)
// router.get('/', (req, res) => {
//   //button to create bin
// });

// GET all requests for bin
router.get('/:bin_path/requests', async (req, res, next) => {
  // let frontend handle when bin_path/uuid does not exist (rn, does not make the distincti)
  const binPath = req.params.bin_path;
  try {
    const result = await postgres.getAllRequestsInBin(binPath);
    res.json(result);
  } catch (error) {
    next(error);
  }
});

// CREATE a new bin
router.post('/', async (req, res, next) => {
  const binPath = uuidv4();
  try {
    const result = await postgres.createBin(binPath);
    res.json(result);
  } catch (e) {
    const error = new HttpError(`Something went wrong ${e}`, 500);
    next(error);
  }
});

// DELETE a bin
router.delete('/:bin_path', async (req, res, next) => {
  // delete a bin.
  // so must delete all the requests associated with the bin
  const binPath = req.params.bin_path;
  let allRequests;
  try {
    allRequests = await postgres.getAllRequestsInBin(binPath);
  } catch (error) {
    return next(error);
  }

  const promises = [];

  for (let i = 0; i < allRequests.length; i += 1) {
    const mongoId = allRequests[i].mongo_id;
    promises.push(mongoDb.deleteRequest(mongoId));
  }

  promises.push(postgres.deleteBin(binPath));
  await Promise.all(promises);
  res.json({ success: 'ok' });
});

// DELETE a single request
router.delete('/:bin_id/requests/:request_id', async (req, res) => {
  const requestId = req.params.request_id;
  const request = await postgres.getRequest(requestId);
  await postgres.deleteRequest(requestId);
  await mongoDb.deleteRequest(request.mongo_id);
  res.json({ success: 'ok' });
});

// DELETE all requests in bin
router.delete('/:bin_id/requests', async (req, res) => {
  const binId = req.params.bin_id;
  const allRequests = await postgres.getAllRequestsInBin(binId);
  const promises = [];

  for (let i = 0; i < allRequests.length; i += 1) {
    const mongoId = allRequests[i].mongo_id;
    promises.push(mongoDb.deleteRequest(mongoId));
  }

  promises.push(postgres.deleteAllRequestsInBin(binId));
  await Promise.all(promises);
  res.json({ success: 'ok' });
});

module.exports = router;
