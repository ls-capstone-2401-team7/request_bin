function convertDbTimetoDateObj(databaseTime) {
  databaseTime[10] = 'T';
  databaseTime = `${databaseTime.substring(0, 23)}Z`;
  return new Date(databaseTime);
}

module.exports = {
  convertDbTimetoDateObj,
};
