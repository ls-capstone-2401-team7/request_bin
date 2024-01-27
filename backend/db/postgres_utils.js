const path = require('path')
require('dotenv').config({
  override: true,
  path: path.join(__dirname, '../.env')
});
const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.USER,
  password: process.env.PASSWORD,
  host: process.env.HOST,
  port: process.env.PORT,
  database: process.env.DATABASE,
});

async function createBin(bin_path) {
  const text = 'INSERT INTO bins (bin_path) VALUES ($1)';
  const value = [bin_path]
  try {
    await pool.query(text, value);
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function getBinId(bin_path) {
  const text = 'SELECT id FROM bins WHERE bin_path = $1';
  const value = [bin_path]
  try {
    const response = await pool.query(text, value);
    bin_id = response['rows'];
    return bin_id // returning an array of objects
  } catch (err) {
    console.error(err); // do better error handling
  }
}

async function createRequest(bin_id, mongo_id, received_at, http_method, http_path) {

}