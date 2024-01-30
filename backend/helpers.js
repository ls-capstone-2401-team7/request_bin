/* eslint-disable no-param-reassign */
const { v4: uuidv4 } = require('uuid');
const psqlDb = require('./db/postgres_utils');

async function isValidUuid(inputUuid) {
  const result = await psqlDb.getBinId(inputUuid);
  return !result;
}

async function generateUuid() { // check & confirm works later
  let newUuid = uuidv4();

  while (true) {
    let valid = await isValidUuid(newUuid);
    if (valid) { 
      break;
    }
    newUuid = uuidv4();
  }

  return newUuid;
}

function convertDbTimetoDateObj(databaseTime) {
  databaseTime[10] = 'T';
  databaseTime = `${databaseTime.substring(0, 23)}Z`;
  return new Date(databaseTime);
}

module.exports = {
  convertDbTimetoDateObj,
  generateUuid,
};

(async function () {
  console.log(await generateUuid());
})();