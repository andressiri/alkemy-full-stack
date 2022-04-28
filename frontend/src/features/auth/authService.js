import axios from 'axios';

const API_URL = '/api/v1/user/';

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  };

  return response.data
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
    localStorage.setItem('remember', JSON.stringify(userData.remember))
  };

  return {userData: response.data, remember: userData.remember}
};

// Logout user
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('remember');
}

 const authService = {
  register,
  login,
  logout
 };

 export default authService;