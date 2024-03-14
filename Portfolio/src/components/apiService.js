import axios from 'axios';

// Base URL for the Django API
const BASE_URL = process.env.REACT_APP_DJANGO_API_URL;

axios.interceptors.request.use(config => {
  if (['post', 'put', 'delete'].includes(config.method)) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
  }
  return config;
}, error => Promise.reject(error));

const fetchData = async (endpoint = '') => {
  try {
    const url = `${BASE_URL}${endpoint}`;
    const response = await axios.get(url);
    console.log(`Fetched data from ${url}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error fetching data from ${endpoint ? endpoint : 'base URL'}:`, error);
    throw error;
  }
};

const postData = async (endpoint, data) => {
  try {
    console.log('Posting data:', data);
    const response = await axios.post(`${BASE_URL}${endpoint}/`, data);
    console.log('Post Response:', response);
    return response;
  } catch (error) {
    console.error(`Error posting data to ${endpoint}:`, error);
    throw error;
  }
};

const updateData = async (endpoint, id, data) => {
  try {
    const response = await axios.put(`${BASE_URL}${endpoint}/${id}/`, data);
    return response;
  } catch (error) {
    console.error(`Error updating data at ${endpoint}:`, error);
    throw error;
  }
};

const deleteData = async (endpoint, id) => {
  try {
    await axios.delete(`${BASE_URL}${endpoint}/${id}/`);
  } catch (error) {
    console.error(`Error deleting data from ${endpoint}:`, error);
    throw error;
  }
};

const fetchOptions = async (endpoint) => {
  try {
    const response = await axios.options(`${BASE_URL}${endpoint}`);
    console.log(response.data.actions.POST);
    return response.data.actions.POST;
  } catch (error) {
    console.error(`Error fetching options for ${endpoint}:`, error);
    throw error;
  }
};



export { fetchData, postData, updateData, deleteData, fetchOptions};