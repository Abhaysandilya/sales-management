import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Fetch sales data with search, filters, sorting, and pagination
 */
export async function fetchSalesData(params = {}) {
  try {
    const response = await api.get('/sales', { params });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch sales data');
  }
}

/**
 * Fetch available filter options
 */
export async function fetchFilterOptions() {
  try {
    const response = await api.get('/sales/filter-options');
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch filter options');
  }
}

