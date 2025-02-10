import React, { useState, useEffect } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import axios from '@/config/axios';

export const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [newUser, setNewUser] = useState({ name: '', email: '', income: '',age:"",password:"" });

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('/users/');
      console.log(data)
      setUsers(data);
      setError(null);
    } catch {
      setError('Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    try {
      await axios.post('/users/register', newUser);
      setShowAddDialog(false);
      fetchUsers();
      setNewUser({ username: '', email: '', role: 'user', income: '' });
    } catch {
      setError('Failed to create user');
    }
  };

  const deleteUser = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`/admin/users/${userId}`);
        fetchUsers();
      } catch {
        setError('Failed to delete user');
      }
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <Card className="m-4">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>User Management</CardTitle>
        <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
          <DialogTrigger asChild>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
              <Plus size={20} /> Add User
            </button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New User</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <input type="text" placeholder="Username" className="w-full p-2 border rounded" value={newUser.username} onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} />
              <input type="email" placeholder="Email" className="w-full p-2 border rounded" value={newUser.email} onChange={(e) => setNewUser({ ...newUser, email: e.target.value })} />
              <select className="w-full p-2 border rounded" value={newUser.role} onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="manager">Manager</option>
              </select>
              <input type="text" placeholder="Department" className="w-full p-2 border rounded" value={newUser.department} onChange={(e) => setNewUser({ ...newUser, department: e.target.value })} />
              <button onClick={createUser} className="w-full px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">Create User</button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        {error && <Alert variant="destructive" className="mb-4"><AlertDescription>{error}</AlertDescription></Alert>}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr>
                <th className="p-4 text-left">Username</th>
                <th className="p-4 text-left">Email</th>
                <th className="p-4 text-left">Role</th>
                <th className="p-4 text-left">Income</th>
                <th className="p-4 text-left">Age</th>

                <th className="p-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="p-4">{user.Name}</td>
                  <td className="p-4">{user.Email}</td>
                  <td className="p-4">{user.Role}</td>
                  <td className="p-4">{user.Income}</td>
                  <td className="p-4">{user.Age}</td>

                  <td className="p-4">
                    <button onClick={() => deleteUser(user.id)} className="text-red-500 hover:text-red-700">
                      <Trash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};
