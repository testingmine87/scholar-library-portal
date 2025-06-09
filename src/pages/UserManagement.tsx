
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import MainLayout from "@/components/MainLayout";
import { fetchUsers, updateUserProfile } from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { Edit, User } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useAuth } from "@/lib/AuthContext";

type User = {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'faculty' | 'librarian' | 'admin' | 'guest';
  department: string;
  memberSince: string;
  studentId?: string;
};

const UserManagement = () => {
  const { user: currentUser } = useAuth();
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);

  const queryClient = useQueryClient();

  const { data: users = [], isLoading } = useQuery({
    queryKey: ['users', currentUser?.role],
    queryFn: () => fetchUsers(currentUser?.role),
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ userId, userData }: { userId: string; userData: Partial<User> }) =>
      updateUserProfile(userId, userData),
    onSuccess: () => {
      toast.success("User profile updated successfully!");
      queryClient.invalidateQueries({ queryKey: ['users'] });
      setEditingUser(null);
      setIsEditDialogOpen(false);
    },
    onError: () => {
      toast.error("Failed to update user profile. Please try again.");
    }
  });

  const handleUpdateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;
    
    updateUserMutation.mutate({
      userId: editingUser.id,
      userData: editingUser
    });
  };

  const openEditDialog = (user: User) => {
    setEditingUser({ ...user });
    setIsEditDialogOpen(true);
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case 'admin': return 'bg-red-50 text-red-700 border-red-100';
      case 'librarian': return 'bg-blue-50 text-blue-700 border-blue-100';
      case 'faculty': return 'bg-green-50 text-green-700 border-green-100';
      case 'student': return 'bg-yellow-50 text-yellow-700 border-yellow-100';
      case 'guest': return 'bg-gray-50 text-gray-700 border-gray-100';
      default: return '';
    }
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center h-64">
            <p>Loading users...</p>
          </div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">User Management</h1>
          <div className="flex items-center gap-2">
            <User className="h-5 w-5" />
            <span className="text-sm text-gray-600">
              {currentUser?.role === 'admin' ? 'All Users' : 'Students & Guests'}
            </span>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Users List</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Student ID</TableHead>
                  <TableHead>Member Since</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user: User) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium">{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>{user.department}</TableCell>
                    <TableCell>{user.studentId || 'N/A'}</TableCell>
                    <TableCell>{user.memberSince}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(user)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Edit User Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Edit User Profile</DialogTitle>
            </DialogHeader>
            {editingUser && (
              <form onSubmit={handleUpdateUser} className="space-y-4">
                <div>
                  <Label htmlFor="editName">Name</Label>
                  <Input
                    id="editName"
                    value={editingUser.name}
                    onChange={(e) => setEditingUser(prev => 
                      prev ? { ...prev, name: e.target.value } : null
                    )}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editEmail">Email</Label>
                  <Input
                    id="editEmail"
                    type="email"
                    value={editingUser.email}
                    onChange={(e) => setEditingUser(prev => 
                      prev ? { ...prev, email: e.target.value } : null
                    )}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="editDepartment">Department</Label>
                  <Input
                    id="editDepartment"
                    value={editingUser.department}
                    onChange={(e) => setEditingUser(prev => 
                      prev ? { ...prev, department: e.target.value } : null
                    )}
                    required
                  />
                </div>
                {editingUser.role === 'student' && (
                  <div>
                    <Label htmlFor="editStudentId">Student ID</Label>
                    <Input
                      id="editStudentId"
                      value={editingUser.studentId || ''}
                      onChange={(e) => setEditingUser(prev => 
                        prev ? { ...prev, studentId: e.target.value } : null
                      )}
                      placeholder="Enter student ID"
                    />
                  </div>
                )}
                {currentUser?.role === 'admin' && (
                  <div>
                    <Label htmlFor="editRole">Role</Label>
                    <Select 
                      value={editingUser.role} 
                      onValueChange={(value) => setEditingUser(prev => 
                        prev ? { ...prev, role: value as User['role'] } : null
                      )}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="student">Student</SelectItem>
                        <SelectItem value="faculty">Faculty</SelectItem>
                        <SelectItem value="librarian">Librarian</SelectItem>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="guest">Guest</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <Button type="submit" className="w-full" disabled={updateUserMutation.isPending}>
                  {updateUserMutation.isPending ? "Updating..." : "Update User"}
                </Button>
              </form>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default UserManagement;
