const path = require('path')

require('dotenv').config({
  override: true,
  path: path.join(__dirname, '../.env')
});

// necessary to disable automatic date parsing by node-postgres - see https://60devs.com/working-with-postgresql-timestamp-without-timezone-in-node.html
var pg = require('pg');
var types = pg.types;
types.setTypeParser(1114, function(stringValue) {
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
  const text = 'INSERT INTO bins (bin_path) VALUES ($1)';
  const value = [binPath]
  try {
    await pool.query(text, value);
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function getBinId(binPath) {
  const text = 'SELECT id FROM bins WHERE bin_path = $1';
  const value = [binPath]
  try {
    const response = await pool.query(text, value);
    binId = response['rows'][0].id; // response['rows'] returns an array of objects
    return binId
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function createRequest(binId, mongoId, receivedAt, httpMethod, httpPath) {
  const text = 'INSERT INTO requests (bin_id, mongo_id, received_at, http_method, http_path) VALUES ($1, $2, $3, $4, $5)';
  const value = [binId, mongoId, receivedAt, httpMethod, httpPath]
  try {
    await pool.query(text, value);
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function getAllRequestsInBin(binId) {
  const text = 'SELECT * FROM requests WHERE bin_id = $1';
  const value = [binId]
  try {
    const response = await pool.query(text, value);
    requests = response['rows']; // response['rows'] returns an array of objects
    return requests
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function deleteAllRequests() { // just a helper for our own internal testing use
  const text = 'DELETE FROM requests';
  try {
    await pool.query(text);
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function deleteAllRequestsInBin(binId) {
  const text = 'DELETE FROM requests WHERE bin_id = $1';
  const value = [binId]
  try {
    // implement deleting reqeusts in mongoDb! must delete in mongoDb before deleting in postgres!
    await pool.query(text, value);
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function deleteRequest(id) {
  const text = 'DELETE FROM requests WHERE id = $1';
  const value = [id]
  try {
    // implement deleting request in mongoDb! must delete in mongoDb before deleting in postgres!
    await pool.query(text, value);
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function deleteBin(binId) { 
  const text = 'DELETE FROM bins WHERE id = $1';
  const value = [binId]
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
}