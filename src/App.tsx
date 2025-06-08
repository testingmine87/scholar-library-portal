
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/lib/AuthContext";
import { ThemeProvider } from "@/lib/ThemeContext";
import Index from "./pages/Index";
import SearchBooks from "./pages/SearchBooks";
import BorrowedBooks from "./pages/BorrowedBooks";
import DueDates from "./pages/DueDates";
import Profile from "./pages/Profile";
import Notifications from "./pages/Notifications";
import BookManagement from "./pages/BookManagement";
import BorrowRequests from "./pages/BorrowRequests";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";

const queryClient = new QueryClient();

// Protected route component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }
  
  // If no user is logged in, redirect to login page
  if (!user) {
    return <Navigate to="/login" />;
  }
  
  return <>{children}</>;
};

// Role-based route protection
const RoleProtectedRoute = ({ 
  children, 
  allowedRoles 
}: { 
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const { user } = useAuth();
  
  if (!user || !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }
  
  return <>{children}</>;
};

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Index />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/search" 
        element={
          <ProtectedRoute>
            <SearchBooks />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/borrowed" 
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={['student', 'faculty']}>
              <BorrowedBooks />
            </RoleProtectedRoute>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/due-dates" 
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={['student', 'faculty']}>
              <DueDates />
            </RoleProtectedRoute>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/profile" 
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/notifications" 
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={['student', 'faculty', 'librarian', 'admin']}>
              <Notifications />
            </RoleProtectedRoute>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/book-management" 
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={['librarian', 'admin']}>
              <BookManagement />
            </RoleProtectedRoute>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/borrow-requests" 
        element={
          <ProtectedRoute>
            <RoleProtectedRoute allowedRoles={['librarian', 'admin']}>
              <BorrowRequests />
            </RoleProtectedRoute>
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
