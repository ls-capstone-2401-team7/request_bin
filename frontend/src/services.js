import axios from "axios";

// create new bin
const URL = "https://alex-bair.com/api/bins"; // make sure to update this with your domain! CANNOT USE LOCALHOST HERE!

async function createBin() {
  const result = await axios.post(URL);
  return result.data[0].bin_path; // returns just the bin path as a string
}

async function getRequestList(binPath) {
  const result = await axios.get(`${URL}/${binPath}/requests`);
  return result.data;
}

async function getRequest(requestId) {
  const result = await axios.get(`${URL}/requests/${requestId}`);
  console.log(result.data);
  return result.data;
}

function removeBinFromPath(path) {
  const relevantPathArray = path.split("/");
  const relevantPath = '/' + relevantPathArray.slice(2).join('/');
  
  return relevantPath
}

export default {
  createBin,
  getRequestList,
  getRequest,
  removeBinFromPath
};
