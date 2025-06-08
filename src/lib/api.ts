
import axios from 'axios';

// Create axios instance with base URL for our dummy API
export const api = axios.create({
  baseURL: 'http://localhost:5000',
});

// TODO: Uncomment when backend is ready
// Auth endpoints
/*
export const login = async (email: string, password: string, role: string) => {
  try {
    const response = await api.post('/auth/login', { email, password, role });
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
*/

// Dummy data for development
const dummyUserProfile = {
  id: "1",
  name: "Alex Johnson",
  email: "alex.johnson@university.edu",
  role: "student",
  department: "Computer Science",
  memberSince: "September 2023"
};

const dummyBorrowedBooks = [
  {
    id: "1",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    issueDate: "2024-04-15",
    returnDate: "2024-05-15",
    fine: 0,
    coverImage: "/placeholder.svg"
  },
  {
    id: "2",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    issueDate: "2024-04-02",
    returnDate: "2024-05-02",
    fine: 2.50,
    coverImage: "/placeholder.svg"
  }
];

const dummyNotifications = [
  {
    id: "1",
    type: "due_date",
    title: "Book due soon",
    message: "\"The Design of Everyday Things\" is due in 3 days.",
    date: "2024-04-29",
    read: false
  }
];

// API endpoints with dummy data
export const fetchUserProfile = async () => {
  try {
    // TODO: Uncomment when backend is ready
    /*
    const response = await api.get('/user/profile');
    return response.data;
    */
    
    // Return dummy data for now
    return dummyUserProfile;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const fetchBorrowedBooks = async () => {
  try {
    // TODO: Uncomment when backend is ready
    /*
    const response = await api.get('/user/borrowed-books');
    return response.data;
    */
    
    // Return dummy data for now
    return dummyBorrowedBooks;
  } catch (error) {
    console.error('Error fetching borrowed books:', error);
    throw error;
  }
};

export const fetchNotifications = async () => {
  try {
    // TODO: Uncomment when backend is ready
    /*
    const response = await api.get('/user/notifications');
    return response.data;
    */
    
    // Return dummy data for now
    return dummyNotifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    throw error;
  }
};

export const payFine = async (amount: number) => {
  try {
    // TODO: Uncomment when backend is ready
    /*
    const response = await api.post('/payment/create-order', { amount });
    return response.data;
    */
    
    // Return dummy success response for now
    return { success: true, orderId: 'dummy_order_123' };
  } catch (error) {
    console.error('Error creating payment order:', error);
    throw error;
  }
};
