
import MainLayout from "@/components/MainLayout";
import ProfileForm from "@/components/ProfileForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { userData } from "@/lib/data";
import { formatDate } from "@/lib/dateUtils";
import { borrowedBooks } from "@/lib/data";

const Profile = () => {
  // Some statistics for the profile page
  const booksBorrowed = borrowedBooks.length;
  const booksOverdue = borrowedBooks.filter(book => new Date(book.returnDate) < new Date()).length;
  const totalFines = borrowedBooks.reduce((sum, book) => sum + book.fine, 0);

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
            <Card className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Library Card</CardTitle>
              </CardHeader>
              <CardContent>
                <h2 className="text-xl font-bold mb-1">{userData.name}</h2>
                <p className="text-sm text-blue-100">{userData.department}</p>
                <div className="mt-6 flex justify-between items-end">
                  <div>
                    <p className="text-xs text-blue-200">Member Since</p>
                    <p className="text-sm">{userData.memberSince}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-blue-200">ID</p>
                    <p className="text-sm">#{userData.id.padStart(6, '0')}</p>
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
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Books Borrowed</span>
                    <span className="font-semibold">{booksBorrowed}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Books Overdue</span>
                    <span className="font-semibold text-red-600">{booksOverdue}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Current Fines</span>
                    <span className="font-semibold">${totalFines.toFixed(2)}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
