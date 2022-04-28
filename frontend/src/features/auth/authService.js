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

  if (response.data.userData && userData.remember) {
    localStorage.setItem('user', JSON.stringify(response.data.userData));
    localStorage.setItem('remember', JSON.stringify(userData.remember));
  };

  return {userData: response.data.userData, remember: userData.remember};
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('remember');
}

// Send verification code
const sendCode = async (email, user) => {
  let response;
  if (user) {
    response = await axios.post(
      API_URL + 'verification',
      {},
      {headers: {'Authorization': `Bearer ${user.token}`}}
    );
  } else {
    response = await axios.post(API_URL + 'forgot-password', {email});
  };

  return response.data.message;
};

// Check verification code
const checkCode = async (code, user) => {
  const response = await axios.put(API_URL + `verification/${code}`);

  return user 
    ? {message: response.data.message}
    : {message: response.data.message, token: response.data.token};
};

 const authService = {
  register,
  login,
  logout,
  sendCode,
  checkCode
 };

 export default authService;