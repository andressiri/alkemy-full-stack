import axios from 'axios';

const API_URL = '/api/v1/user/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);

  return response.data.userData;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data.userData) {

  };

  return {userData: response.data.userData, remember: userData.remember};
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('remember');
  localStorage.removeItem('records');
}

// Send verification code
const sendCode = async (email, token) => {
  let response;
  if (token) {
    response = await axios.post(
      API_URL + 'verification',
      {},
      {headers: {'Authorization': `Bearer ${token}`}}
    );
  } else {
    response = await axios.post(API_URL + 'forgot-password', {email});
  };

  return response.data.message;
};

// Check verification code
const checkCode = async (code) => {
  const response = await axios.put(API_URL + `verification/${code}`);

  return response.data;
};

// Change Password
const changePassword = async (password, temporaryToken) => {

  const response = await axios.put(
    API_URL + 'password',
    {password},
    {headers: {'Authorization': `Bearer ${temporaryToken}`}}
  );

  return response.data.message;
};

// Change Name
const changeName = async (name, token) => {
  const response = await axios.put(
    API_URL + `name/${name}`,
    {},
    {headers: {'Authorization': `Bearer ${token}`}}
  );

  return response.data.message;
};

// Delete account
const deleteAccount = async (password, temporaryToken, user) => {
  const response = await axios.delete(
    API_URL + `delete/${temporaryToken}`,
    {
      data: {password},
      headers: {'Authorization': `Bearer ${user.token}`}
    }
  );

  return response.data;
};

 const authService = {
  register,
  login,
  logout,
  sendCode,
  checkCode,
  changePassword,
  changeName,
  deleteAccount
 };

 export default authService;