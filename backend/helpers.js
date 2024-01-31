/* eslint-disable no-param-reassign */
function convertDbTimetoDateObj(databaseTime) {
  databaseTime[10] = 'T';
  databaseTime = `${databaseTime.substring(0, 23)}Z`;
  return new Date(databaseTime);
}

class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); // Add a "message" property
    this.code = errorCode; // Adds a "code" property
  }
}

module.exports = {
  convertDbTimetoDateObj,
  HttpError,
};
