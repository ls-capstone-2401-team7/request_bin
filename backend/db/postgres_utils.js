// necessary to disable automatic date parsing by node-postgres - see https://60devs.com/working-with-postgresql-timestamp-without-timezone-in-node.html
const pg = require('pg');

const { types } = pg;
types.setTypeParser(1114, function (stringValue) {
  return stringValue;
});

// postgres connection configuration
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

const { HttpError } = require('../helpers');

// services to expose
async function createBin(binPath) {
  const text = 'INSERT INTO bins (bin_path) VALUES ($1) RETURNING *';
  const value = [binPath];
  try {
    const newBin = await pool.query(text, value);
    return newBin.rows;
  } catch (err) {
    throw Error(err);
  }
}

async function getBinId(binPath) {
  const text = 'SELECT id FROM bins WHERE bin_path = $1';
  const value = [binPath];
  try {
    const response = await pool.query(text, value);
    const bin = response.rows[0];
    if (bin === undefined) {
      throw Error;
    }
    return bin.id;
  } catch (err) {
    throw new HttpError('Bin does not exist', 400);
  }
}

async function createRequest(binId, mongoId, httpMethod, httpPath) {
  const text = 'INSERT INTO requests (bin_id, mongo_id, http_method, http_path) VALUES ($1, $2, $3, $4) RETURNING *';
  const value = [binId, mongoId, httpMethod, httpPath];
  try {
    return (await pool.query(text, value)).rows[0];
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function getAllRequestsInBin(binPath) {
  // get the bin id
  const binId = await getBinId(binPath);
  const text = 'SELECT * FROM requests WHERE bin_id = $1';
  const value = [binId];
  try {
    const response = await pool.query(text, value);
    const requests = response.rows; // response['rows'] returns an array of objects
    return requests;
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function deleteAllRequests() {
  // just a helper for our own internal testing use
  const text = 'DELETE FROM requests';
  try {
    await pool.query(text);
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function getRequest(requestId) {
  const text = 'SELECT * FROM requests WHERE id = $1';
  const value = [requestId];

  try {
    const response = await pool.query(text, value);
    const request = response.rows[0];
    if (request === undefined) {
      throw Error;
    }
    return request;
  } catch (err) {
    throw new HttpError('Request does not exist', 400);
  }
}

async function deleteAllRequestsInBin(binPath) {
  // get the bin id
  const binId = await getBinId(binPath);

  const text = 'DELETE FROM requests WHERE bin_id = $1';
  const value = [binId];
  try {
    // implement deleting reqeusts in mongoDb! must delete in mongoDb before deleting in postgres!
    await pool.query(text, value);
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function deleteRequest(id) {
  const text = 'DELETE FROM requests WHERE id = $1';
  const value = [id];
  try {
    // implement deleting request in mongoDb! must delete in mongoDb before deleting in postgres!
    await pool.query(text, value);
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function deleteBin(binPath) {
  // get the bin id
  const binId = await getBinId(binPath);
  const text = 'DELETE FROM bins WHERE id = $1';
  const value = [binId];
  try {
    await deleteAllRequestsInBin(binPath);
    await pool.query(text, value);
  } catch (err) {
    console.error(err); // do better error handling
  }
}

module.exports = {
  createBin,
  getBinId,
  createRequest,
  getAllRequestsInBin,
  deleteAllRequests,
  deleteAllRequestsInBin,
  deleteBin,
  deleteRequest,
  getRequest,
};
