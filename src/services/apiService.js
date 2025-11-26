// src/services/apiService.js

import axios from "axios";
import { API_BASE_URL } from "../config/apiConfig";

// Axios instance create karo
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  
});

// 🔹 Request Interceptor — har request me token add karega
api.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("adminsession"); // <-- sessionStorage se le rahe hain
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 🔹 Response Interceptor — error handle karne ke liye
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// 🔹 Reusable API Functions

export const getData = async (url, params = {}) => {
  const response = await api.get(API_BASE_URL+url, { params });
  return response.data;
};

export const postData = async (url, data = {}) => {
  const response = await api.post(API_BASE_URL+url, data);
  return response.data;
};

export const postDatawithFile = async (url, data) => {
  const response = await api.post(API_BASE_URL+url, data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const putData = async (url, data = {}) => {
  const response = await api.put(API_BASE_URL+url, data);
  return response.data;
};

export const deleteData = async (url) => {
  const response = await api.delete(API_BASE_URL+url);
  return response.data;
};

export default api;
