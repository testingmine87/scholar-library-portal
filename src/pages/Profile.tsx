
import { useQuery } from "@tanstack/react-query";
import MainLayout from "@/components/MainLayout";
import ProfileForm from "@/components/ProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { borrowedBooks } from "@/lib/data";
import { formatDate } from "@/lib/dateUtils";
import { fetchBorrowedBooks } from "@/lib/api";
import { useAuth } from "@/lib/AuthContext";
import { Skeleton } from "@/components/ui/skeleton";

const Profile = () => {
  const { user } = useAuth();
  
  const { data: apiBooks, isLoading } = useQuery({
    queryKey: ['borrowedBooks'],
    queryFn: fetchBorrowedBooks,
    // Use local data as fallback if API call fails
    meta: {
      onError: (err: Error) => {
        console.error('Error fetching borrowed books:', err);
      }
    }
  });
  
  // Use API data if available, otherwise fall back to local data
  const books = apiBooks || borrowedBooks;
  
  // Some statistics for the profile page
  const booksBorrowed = books.length;
  const booksOverdue = books.filter(book => new Date(book.returnDate) < new Date()).length;
  const totalFines = books.reduce((sum, book) => sum + book.fine, 0);

  if (!user) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold mb-6">Profile</h1>
          <Card>
            <CardContent className="p-8 text-center">
              <p>Please log in to view your profile.</p>
            </CardContent>
          </Card>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold mb-6">Profile</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProfileForm />
          </div>
          
          <div className="space-y-6">
            {/* Library Card */}
            <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white dark:from-blue-700 dark:to-blue-900">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Library Card</CardTitle>
              </CardHeader>
              <CardContent>
                <h2 className="text-xl font-bold mb-1">{user.name}</h2>
                <p className="text-sm text-blue-100">{user.department}</p>
                <div className="mt-6 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-blue-200">Member Since</p>
                    <p className="text-sm">{user.memberSince}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-200">Role</p>
                    <p className="text-sm capitalize">{user.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Statistics */}
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Library Usage</CardTitle>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Books Borrowed</span>
                      <span className="font-semibold">{booksBorrowed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Books Overdue</span>
                      <span className="font-semibold text-red-600 dark:text-red-400">{booksOverdue}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">Current Fines</span>
                      <span className="font-semibold">₹{totalFines.toFixed(2)}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
