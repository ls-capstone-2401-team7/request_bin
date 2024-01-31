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
      return undefined;
    }
    return bin.id;
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function createRequest(binId, mongoId, httpMethod, httpPath) {
  const text = 'INSERT INTO requests (bin_id, mongo_id, http_method, http_path) VALUES ($1, $2, $3, $4)';
  const value = [binId, mongoId, httpMethod, httpPath];
  try {
    await pool.query(text, value);
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function getAllRequestsInBin(binId) {
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

async function deleteAllRequestsInBin(binId) {
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

async function deleteBin(binId) {
  const text = 'DELETE FROM bins WHERE id = $1';
  const value = [binId];
  try {
    await deleteAllRequestsInBin(binId);
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
};
