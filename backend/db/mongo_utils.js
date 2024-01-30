/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const { Schema } = mongoose;

const requestSchema = new Schema({
  payload: { type: Object },
});

requestSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Request = mongoose.model('Request', requestSchema);

async function deleteRequest(mongoId) {
  await Request.findByIdAndDelete(mongoId);
}

async function createRequest(payload) {
  const newRequest = new Request({
    payload,
  });

  const result = await newRequest.save();
  return result.toJSON();
}

async function getRequest(id) {
  const result = await Request.findById(id);
  if (result != null) {
    return result.toJSON();
  }
  return result;
}

module.exports = {
  Request,
  deleteRequest,
  createRequest,
  getRequest,
};
