
import axios from 'axios';

// Create axios instance with base URL for our dummy API
export const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// API endpoints
export const fetchUserProfile = async () => {
  try {
    const response = await api.get('/user/profile');
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const fetchBorrowedBooks = async () => {
  try {
    const response = await api.get('/user/borrowed-books');
    return response.data;
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    throw error;
  }
};

export const fetchNotifications = async () => {
  try {
    const response = await api.get('/user/notifications');
    return response.data;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const payFine = async (amount: number) => {
  try {
    const response = await api.post('/payment/create-order', { amount });
    return response.data;
  } catch (error) {
    console.error('Error creating payment order:', error);
    throw error;
  }
};
