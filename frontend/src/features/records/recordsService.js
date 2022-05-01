import axios from 'axios';

const API_URL = '/api/v1/records/';

// Register user
const saveRecord = async (recordData, token) => {
  const response = await axios.post(
    API_URL,
    recordData,
    {headers: {'Authorization': `Bearer ${token}`}}
  );

  return response.data;
};

const authService = {
  saveRecord
 };

 export default authService;