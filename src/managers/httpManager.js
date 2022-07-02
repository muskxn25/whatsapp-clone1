import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/v1";

const createUser = async (userData) => {
  return await axios.post(`${API_BASE_URL}/users/login`, userData);
};

const searchUser = async (email) => {
  return await axios.get(`${API_BASE_URL}/search-user?email=${email}`);
};

const createChannel = async (requestData) => {
  return await axios.post(`${API_BASE_URL}/channel`, requestData);
};

const getChannelList = async ({ sender_id, receiver_id }) => {
  return await axios.post(`${API_BASE_URL}/chats/`, { sender_id, receiver_id });
};

const sendMessage = async (requestData) => {
  return await axios.post(`${API_BASE_URL}/chats/`, requestData);
};

export const httpManager = {
  createUser,
  searchUser,
  createChannel,
  getChannelList,
  sendMessage,
};
export default httpManager;
