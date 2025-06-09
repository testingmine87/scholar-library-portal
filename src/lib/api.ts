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

// Define the borrow request type with all possible statuses and optional reviewNote
type BorrowRequest = {
  id: string;
  userId: string;
  userName: string;
  bookId: string;
  bookTitle: string;
  requestDate: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedBy: string;
  reviewNote?: string;
};

// Dummy borrow requests data with proper typing
let borrowRequests: BorrowRequest[] = [
  {
    id: "1",
    userId: "1",
    userName: "Alex Johnson",
    bookId: "5",
    bookTitle: "The Great Gatsby",
    requestDate: "2024-05-01",
    status: "pending",
    requestedBy: "student@test.com"
  },
  {
    id: "2",
    userId: "4",
    userName: "Dr. Emily Davis",
    bookId: "7",
    bookTitle: "Physics for Scientists and Engineers",
    requestDate: "2024-04-30",
    status: "approved",
    requestedBy: "faculty@test.com"
  }
];

// Dummy books catalog with quantities
let booksInventory = [
  {
    id: "1",
    title: "Introduction to Algorithms",
    author: "Thomas H. Cormen",
    genre: "Computer Science",
    totalQuantity: 3,
    availableQuantity: 0,
    coverImage: "/placeholder.svg"
  },
  {
    id: "2",
    title: "The Design of Everyday Things",
    author: "Don Norman",
    genre: "Design",
    totalQuantity: 2,
    availableQuantity: 0,
    coverImage: "/placeholder.svg"
  },
  {
    id: "3",
    title: "Clean Code",
    author: "Robert C. Martin",
    genre: "Computer Science",
    totalQuantity: 4,
    availableQuantity: 1,
    coverImage: "/placeholder.svg"
  },
  {
    id: "4",
    title: "Thinking, Fast and Slow",
    author: "Daniel Kahneman",
    genre: "Psychology",
    totalQuantity: 2,
    availableQuantity: 1,
    coverImage: "/placeholder.svg"
  },
  {
    id: "5",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Fiction",
    totalQuantity: 5,
    availableQuantity: 4,
    coverImage: "/placeholder.svg"
  },
  {
    id: "6",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    totalQuantity: 3,
    availableQuantity: 3,
    coverImage: "/placeholder.svg"
  },
  {
    id: "7",
    title: "Physics for Scientists and Engineers",
    author: "Serway & Jewett",
    genre: "Physics",
    totalQuantity: 2,
    availableQuantity: 1,
    coverImage: "/placeholder.svg"
  },
  {
    id: "8",
    title: "Calculus: Early Transcendentals",
    author: "James Stewart",
    genre: "Mathematics",
    totalQuantity: 4,
    availableQuantity: 4,
    coverImage: "/placeholder.svg"
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
    
    // Return dummy success response with the expected structure for now
    return { 
      success: true, 
      id: 'dummy_order_123',
      amount: amount,
      orderId: 'dummy_order_123' 
    };
  } catch (error) {
    console.error('Error creating payment order:', error);
    throw error;
  }
};

// Books management APIs
export const fetchBooks = async () => {
  try {
    // TODO: Uncomment when backend is ready
    /*
    const response = await api.get('/books');
    return response.data;
    */
    
    return booksInventory.map(book => ({
      ...book,
      available: book.availableQuantity > 0
    }));
  } catch (error) {
    console.error('Error fetching books:', error);
    throw error;
  }
};

export const addBook = async (bookData: {
  title: string;
  author: string;
  genre: string;
  quantity: number;
}) => {
  try {
    // TODO: Uncomment when backend is ready
    /*
    const response = await api.post('/books', bookData);
    return response.data;
    */
    
    const newBook = {
      id: (booksInventory.length + 1).toString(),
      title: bookData.title,
      author: bookData.author,
      genre: bookData.genre,
      totalQuantity: bookData.quantity,
      availableQuantity: bookData.quantity,
      coverImage: "/placeholder.svg"
    };
    
    booksInventory.push(newBook);
    return newBook;
  } catch (error) {
    console.error('Error adding book:', error);
    throw error;
  }
};

export const updateBookQuantity = async (bookId: string, newQuantity: number) => {
  try {
    // TODO: Uncomment when backend is ready
    /*
    const response = await api.put(`/books/${bookId}/quantity`, { quantity: newQuantity });
    return response.data;
    */
    
    const bookIndex = booksInventory.findIndex(book => book.id === bookId);
    if (bookIndex !== -1) {
      const book = booksInventory[bookIndex];
      const borrowedCount = book.totalQuantity - book.availableQuantity;
      book.totalQuantity = newQuantity;
      book.availableQuantity = Math.max(0, newQuantity - borrowedCount);
      return book;
    }
    throw new Error('Book not found');
  } catch (error) {
    console.error('Error updating book quantity:', error);
    throw error;
  }
};

// Borrow request APIs
export const createBorrowRequest = async (bookId: string, userId: string, userName: string, bookTitle: string) => {
  try {
    // TODO: Uncomment when backend is ready
    /*
    const response = await api.post('/borrow-requests', { bookId, userId });
    return response.data;
    */
    
    const newRequest: BorrowRequest = {
      id: (borrowRequests.length + 1).toString(),
      userId,
      userName,
      bookId,
      bookTitle,
      requestDate: new Date().toISOString().split('T')[0],
      status: "pending",
      requestedBy: `${userId}@test.com`
    };
    
    borrowRequests.push(newRequest);
    return newRequest;
  } catch (error) {
    console.error('Error creating borrow request:', error);
    throw error;
  }
};

export const fetchBorrowRequests = async () => {
  try {
    // TODO: Uncomment when backend is ready
    /*
    const response = await api.get('/borrow-requests');
    return response.data;
    */
    
    return borrowRequests;
  } catch (error) {
    console.error('Error fetching borrow requests:', error);
    throw error;
  }
};

export const updateBorrowRequestStatus = async (requestId: string, status: 'approved' | 'rejected', reviewNote?: string) => {
  try {
    // TODO: Uncomment when backend is ready
    /*
    const response = await api.put(`/borrow-requests/${requestId}`, { status, reviewNote });
    return response.data;
    */
    
    const requestIndex = borrowRequests.findIndex(req => req.id === requestId);
    if (requestIndex !== -1) {
      borrowRequests[requestIndex].status = status;
      if (reviewNote) {
        borrowRequests[requestIndex].reviewNote = reviewNote;
      }
      
      // If approved, reduce available quantity
      if (status === 'approved') {
        const request = borrowRequests[requestIndex];
        const bookIndex = booksInventory.findIndex(book => book.id === request.bookId);
        if (bookIndex !== -1 && booksInventory[bookIndex].availableQuantity > 0) {
          booksInventory[bookIndex].availableQuantity--;
        }
      }
      
      return borrowRequests[requestIndex];
    }
    throw new Error('Request not found');
  } catch (error) {
    console.error('Error updating borrow request:', error);
    throw error;
  }
};
