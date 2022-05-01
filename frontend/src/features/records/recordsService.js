import axios from 'axios';

const API_URL = '/api/v1/records/';

// Save record
const saveRecord = async (recordData, token) => {
  const response = await axios.post(
    API_URL,
    recordData,
    {headers: {'Authorization': `Bearer ${token}`}}
  );

  return response.data;
};

// Get records
const getRecords = async (token) => {
  const response = await axios.get(
    API_URL,
    {headers: {'Authorization': `Bearer ${token}`}}
  );

  return response.data;
};

const authService = {
  saveRecord,
  getRecords
 };

 export default authService;