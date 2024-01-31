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

/**
 * make result array
 * get all requests for given bin id
 * for each request, find its request in mongodb,
 * create empty object, populate with sql request data and payload
 * push it to the array
 * return the final array as response
 */

// GET get all requests for bin
router.get('/:bin_id/requests', async (req, res, next) => {
  const binId = req.params.bin_id;
  try {
    const result = await postgres.getAllRequestsInBin(binId);
    return res.json(result);
  } catch (e) {
    const error = new HttpError(`Something went wrong ${e}`, 500);
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
router.delete('/:bin_id', async (req, res) => {
  // delete a bin.
  // so must delete all the requests associated with the bin
  const binId = req.params.bin_id;
  const allRequests = await postgres.getAllRequestsInBin(binId);
  const promises = [];
  // mongoDb.deleteRequest(mongoId)

  for (let i = 0; i < allRequests.length; i += 1) {
    const mongoId = allRequests[i].mongo_id;
    promises.push(mongoDb.deleteRequest(mongoId));
  }
  await Promise.all(promises);
  await postgres.deleteBin(binId);

  res.json({ success: 'ok' });
});

// DELETE a single request
router.delete('/:bin_id/request/:request_id', (req, res) => {});
// DELETE all requests in bin
router.delete('/:bin_id/requests', (req, res) => {});

module.exports = router;
