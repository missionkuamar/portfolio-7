// components/UserManagement.jsx
import React, { useContext } from 'react';
import { ThemeContext } from './ThemeContext';

const users = [
  { id: 1, name: 'Alice Cooper', email: 'alice@example.com', role: 'admin', shop: 'Fashion Hub', status: 'active' },
  { id: 2, name: 'Bob Martin', email: 'bob@example.com', role: 'user', shop: 'Tech Store', status: 'active' },
  { id: 3, name: 'Carol Davis', email: 'carol@example.com', role: 'admin', shop: 'Home Decor', status: 'inactive' },
  { id: 4, name: 'David Lee', email: 'david@example.com', role: 'user', shop: 'Gadget World', status: 'active' }
];

export default function UserManagement() {
  const { theme } = useContext(ThemeContext);
  
  return (
    <div className="mb-12">
      <h2 className={`text-2xl font-bold mb-6 ${theme.text}`}>
        <i className="fas fa-users-cog mr-2"></i>
        User Management (Super Admin)
      </h2>
      <div className={`${theme.card} rounded-xl shadow-md overflow-hidden border ${theme.border}`}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className={`${theme.border} border-b`}>
              <tr className={`text-left ${theme.textSecondary}`}>
                <th className="p-4">User</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Shop</th>
                <th className="p-4">Status</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id} className={`border-b ${theme.border}`}>
                  <td className={`p-4 font-medium ${theme.text}`}>{user.name}</td>
                  <td className={`p-4 ${theme.textSecondary}`}>{user.email}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role}
                    </span>
                  </td>
                  <td className={`p-4 ${theme.text}`}>{user.shop}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {user.status}
                    </span>
                  </td>
                  <td className="p-4">
                    <button className="text-blue-600 mr-3"><i className="fas fa-edit"></i></button>
                    <button className="text-red-600"><i className="fas fa-trash"></i></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}