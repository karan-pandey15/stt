'use client';
import { useEffect, useState } from 'react';
import { User, Mail, Phone, MapPin, Calendar, Coins, Edit2, Trash2, Save, X, Shield } from 'lucide-react';
import api from '../lib/api';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  // ✅ Fetch Profile
  const fetchProfile = async () => {
    try {
      const res = await api.get('/auth/profile');
      setProfile(res.data);
      setFormData({
        name: res.data.user.name || '',
        email: res.data.user.email || '',
        phone: res.data.user.phone || '',
        address: res.data.user.address || '',
      });
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      window.location.href = '/login';
      return;
    }
    fetchProfile();
  }, []);

  // ✅ Update Profile
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await api.put('/auth/profile', formData);
      toast.success(res.data.message);
      setProfile((prev) => ({ ...prev, user: res.data.user }));
      setEditing(false);
      localStorage.setItem('user', JSON.stringify(res.data.user));
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update profile');
    }
  };

  // ✅ Delete Profile
  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete your profile? This action cannot be undone.')) return;
    try {
      const res = await api.delete('/auth/profile');
      toast.success(res.data.message);
      localStorage.clear();
      window.location.href = '/register';
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to delete profile');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gray-300 border-t-gray-800 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-200 text-center">
          <User className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No profile found. Please log in again.</p>
        </div>
      </div>
    );
  }

  const { user, orders } = profile;

  return (
    <div className="min-h-screen  py-8 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header Card */}
        <div className="bg-white rounded-lg shadow-sm   p-8 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center    ">
                <User className="w-10 h-10 text-gray-600" />
              </div>
              <div>
                <h1 className="text-3xl font-semibold text-gray-900 mb-2">{user.name}</h1>
                <div className="flex items-center space-x-3">
                  <span className="bg-gray-100 px-3 py-1 rounded-md text-sm font-medium text-gray-700 flex items-center      ">
                    <Shield className="w-4 h-4 mr-1.5" />
                    {user.role}
                  </span>
                  <span className="bg-gray-900 text-white px-3 py-1 rounded-md text-sm font-medium flex items-center">
                    <Coins className="w-4 h-4 mr-1.5" />
                    {user.coins} Coins
                  </span>
                </div>
              </div>
            </div>

            
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-lg ray-2">
          {!editing ? (
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                Profile Information
              </h2>

              <div className="grid md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
                    <User className="w-4 h-4 mr-2" />
                    Full Name
                  </div>
                  <div className=" rounded-lg px-4 py-3">
                    <p className="text-gray-900 font-medium">{user.name}</p>
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </div>
                  <div className=" rounded-lg px-4 py-3">
                    <p className="text-gray-900 font-medium break-all">{user.email}</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number
                  </div>
                  <div className="  rounded-lg px-4 py-3">
                    <p className="text-gray-900 font-medium">{user.phone || 'Not provided'}</p>
                  </div>
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    Address
                  </div>
                  <div className=" rounded-lg px-4 py-3">
                    <p className="text-gray-900 font-medium">{user.address || 'Not provided'}</p>
                  </div>
                </div>

                {/* Join Date */}
                <div className="space-y-2 md:col-span-2">
                  <div className="flex items-center text-sm font-medium text-gray-500 mb-2">
                    <Calendar className="w-4 h-4 mr-2" />
                    Member Since
                  </div>
                  <div className=" rounded-lg px-4 py-3">
                    <p className="text-gray-900 font-medium">
                      {new Date(user.createdAt).toLocaleDateString('en-US', { 
                        weekday: 'long', 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </p>
                  </div>
                </div>

                      {!editing && (
              <div className="flex space-x-2">
                <button
                  onClick={() => setEditing(true)}
                  className="flex items-center space-x-2 bg-gray-900 text-white px-5 py-2.5 rounded-lg hover:bg-gray-800 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span className="font-medium">Edit</span>
                </button>
                {/* <button
                  onClick={handleDelete}
                  className="flex items-center space-x-2 bg-white text-red-600 border border-red-200 px-5 py-2.5 rounded-lg hover:bg-red-50 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="font-medium">Delete</span>
                </button> */}
              </div>
            )}
              </div>
            </div>
          ) : (
            <div className="p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 pb-3 border-b border-gray-200">
                Edit Profile
              </h2>

              <div className="space-y-5">
                {/* Name Input */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <User className="w-4 h-4 mr-2" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
                    placeholder="Enter your full name"
                  />
                </div>

                {/* Email Input */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Mail className="w-4 h-4 mr-2" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
                    placeholder="Enter your email"
                  />
                </div>

                {/* Phone Input */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <Phone className="w-4 h-4 mr-2" />
                    Phone Number
                  </label>
                  <input
                    type="text"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Address Input */}
                <div>
                  <label className="flex items-center text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="w-4 h-4 mr-2" />
                    Address
                  </label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all text-gray-900"
                    placeholder="Enter your address"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex space-x-3 mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleUpdate}
                  className="flex-1 flex items-center justify-center space-x-2 bg-gray-900 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  onClick={() => setEditing(false)}
                  className="flex-1 flex items-center justify-center space-x-2 bg-white text-gray-700 border border-gray-300 px-6 py-3 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                >
                  <X className="w-4 h-4" />
                  <span>Cancel</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}