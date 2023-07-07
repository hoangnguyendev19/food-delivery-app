import axios from 'axios';

axios.defaults.withCredentials = true;

const getUserProfile = async (axiosInstance) => {
  const { data } = await axiosInstance.get('/api/v1/users/profile');

  return data.data;
};

const updateUserProfile = async (axiosInstance, user) => {
  const { data } = await axiosInstance.put('/api/v1/users/profile', user);
  if (data.data) {
    localStorage.setItem('user', JSON.stringify(data.data));
  }
  return data.data;
};

const updatePassword = async (axiosInstance, passwordObj) => {
  await axiosInstance.put('/api/v1/users/updatePassword', passwordObj);
};

const userAPI = {
  getUserProfile,
  updateUserProfile,
  updatePassword,
};

export default userAPI;
