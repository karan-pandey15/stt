"use client";
import React, { useState, useEffect } from "react";
import { Edit2, Trash2, X } from "lucide-react";
import api from "../../lib/api";  
import toast, { Toaster } from "react-hot-toast";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [deleteModal, setDeleteModal] = useState({
    show: false,
    userId: null,
    userName: "",
  });
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    coins: 0,
    role: "user",
  });

  // ✅ Fetch Users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch (error) {
      toast.error("Failed to fetch users");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit Handlers
  const handleEdit = (user) => {
    setEditingUser(user._id);
    setEditForm({
      name: user.name || "",
      email: user.email || "",
      phone: user.phone || "",
      address: user.address || "",
      coins: user.coins || 0,
      role: user.role || "user",
    });
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
    setEditForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      coins: 0,
      role: "user",
    });
  };

  // ✅ Update User
  const handleUpdate = async (userId) => {
    try {
      await api.put(`/users/${userId}`, editForm);
      toast.success("User updated successfully");
      await fetchUsers();
      handleCancelEdit();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update user");
    }
  };

  // ✅ Delete Modal
  const openDeleteModal = (userId, userName) => {
    setDeleteModal({ show: true, userId, userName });
  };

  const closeDeleteModal = () => {
    setDeleteModal({ show: false, userId: null, userName: "" });
  };

  // ✅ Delete User
  const handleDelete = async () => {
    try {
      await api.delete(`/users/${deleteModal.userId}`);
      toast.success("User deleted successfully");
      await fetchUsers();
      closeDeleteModal();
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to delete user");
    }
  };

  // ✅ Loading State
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600 text-lg">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-8 px-4">
      <Toaster position="top-right" reverseOrder={false} />

      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          User Management
        </h1>

        <div className="bg-white rounded-lg   overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-white border-b">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Name
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Email
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Phone
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Address
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Coins
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Role
                  </th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {users.map((user, index) => (
                  <tr
                    key={user._id}
                    className={
                      index % 2 === 0
                        ? "bg-white  "
                        : "bg-white-50   "
                    }
                  >
                    {editingUser === user._id ? (
                      <>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editForm.name}
                            onChange={(e) =>
                              setEditForm({ ...editForm, name: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300 outline-none text-sm"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="email"
                            value={editForm.email}
                            onChange={(e) =>
                              setEditForm({ ...editForm, email: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300 outline-none text-sm"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editForm.phone}
                            onChange={(e) =>
                              setEditForm({ ...editForm, phone: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300 outline-none text-sm"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="text"
                            value={editForm.address}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                address: e.target.value,
                              })
                            }
                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300 outline-none text-sm"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <input
                            type="number"
                            value={editForm.coins}
                            onChange={(e) =>
                              setEditForm({
                                ...editForm,
                                coins: parseInt(e.target.value) || 0,
                              })
                            }
                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300 outline-none text-sm"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={editForm.role}
                            onChange={(e) =>
                              setEditForm({ ...editForm, role: e.target.value })
                            }
                            className="w-full px-3 py-2 border rounded focus:ring focus:ring-blue-300 outline-none text-sm"
                          >
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 flex gap-2">
                          <button
                            onClick={() => handleUpdate(user._id)}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                          >
                            Save
                          </button>
                          <button
                            onClick={handleCancelEdit}
                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 text-sm"
                          >
                            Cancel
                          </button>
                        </td>
                      </>
                    ) : (
                      <>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {user.name || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {user.email}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {user.phone || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {user.address || "N/A"}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">
                          {user.coins}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.role === "admin"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-blue-100 text-blue-800"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex gap-3">
                            <button
                              onClick={() => handleEdit(user)}
                              className="text-blue-600 hover:text-blue-800 transition"
                              title="Edit"
                            >
                              <Edit2 size={18} />
                            </button>
                            <button
                              onClick={() =>
                                openDeleteModal(user._id, user.name || user.email)
                              }
                              className="text-red-600 hover:text-red-800 transition"
                              title="Delete"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ✅ Delete Confirmation Modal */}
      {deleteModal.show && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-xl font-semibold text-gray-900">
                Confirm Delete
              </h3>
              <button
                onClick={closeDeleteModal}
                className="text-gray-400 hover:text-gray-600"
              >
                <X size={24} />
              </button>
            </div>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete{" "}
              <strong>{deleteModal.userName}</strong>? This action cannot be
              undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={closeDeleteModal}
                className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
