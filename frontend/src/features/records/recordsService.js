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

// Update records
const updateRecord = async (recordData, token) => {
  const response = await axios.put(
    API_URL + `${recordData.record_uuid}`,
    recordData,
    {headers: {'Authorization': `Bearer ${token}`}}
  );

  return response.data;
};

// Update records
const deleteRecord = async (record_uuid, token) => {
  const response = await axios.delete(
    API_URL + `${record_uuid}`,
    {headers: {'Authorization': `Bearer ${token}`}}
  );

  return response.data;
};

const authService = {
  saveRecord,
  getRecords,
  updateRecord,
  deleteRecord
 };

 export default authService;