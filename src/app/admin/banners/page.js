'use client';

import api from '@/app/lib/api';
import { useState, useEffect } from 'react'; 
import { Toaster, toast } from 'react-hot-toast';

const CATEGORY_OPTIONS = [
  'Skin',
  'Glow',
  'Hair',
  'Gifts',
  'Best Seller',
  'Razors',
  'Fragrances',
  'Shave',
  'Trimmers',
  'Some Men',
];

export default function BannerPage() {
  const [formData, setFormData] = useState({ category: '' });
  const [image, setImage] = useState(null);
  const [banners, setBanners] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch banners
  const fetchBanners = async () => {
    try {
      const { data } = await api.get('/banners');
      setBanners(data);
    } catch (err) {
      console.error(err);
      toast.error('Failed to fetch banners');
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit create/update banner
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.category) return toast.error('Please select a category');
    if (!image && !editingId) return toast.error('Image is required for a new banner');

    const data = new FormData();
    data.append('category', formData.category);
    if (image) data.append('image', image);

    try {
      setLoading(true);
      if (editingId) {
        await api.put(`/banners/${editingId}`, data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Banner updated successfully');
      } else {
        await api.post('/banners', data, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
        toast.success('Banner created successfully');
      }

      // Reset form
      setFormData({ category: '' });
      setImage(null);
      setEditingId(null);
      fetchBanners();
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Edit
  const handleEdit = (banner) => {
    setEditingId(banner._id);
    setFormData({ category: banner.category });
    setImage(null);
    toast('Editing mode enabled', { icon: '✏️' });
  };

  // Delete
  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this banner?')) return;
    try {
      await api.delete(`/banners/${id}`);
      toast.success('Banner deleted');
      fetchBanners();
    } catch (err) {
      console.error(err);
      toast.error('Failed to delete banner');
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-2xl font-bold mb-6 text-center">
        {editingId ? 'Update Banner' : 'Upload New Banner'}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col md:flex-row gap-4 items-center justify-between mb-10"
      >
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="border rounded-lg p-2 focus:ring focus:ring-pink-300 outline-none w-full md:w-1/3"
          required
        >
          <option value="">Select Category</option>
          {CATEGORY_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border rounded-lg p-2 w-full md:w-1/3"
        />

        <button
          type="submit"
          disabled={loading}
          className="bg-pink-600 text-white px-6 py-2 rounded-lg hover:bg-pink-700 transition w-full md:w-auto"
        >
          {loading ? 'Saving...' : editingId ? 'Update Banner' : 'Upload Banner'}
        </button>
      </form>

      {/* Table view */}
      <table className="w-full text-left">
        <thead>
          <tr className="text-gray-700 border-b border-gray-300">
            <th className="py-2">Image</th>
            <th className="py-2">Category</th>
            <th className="py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {banners.length === 0 ? (
            <tr>
              <td colSpan="3" className="text-center text-gray-500 py-4">
                No banners found.
              </td>
            </tr>
          ) : (
            banners.map((banner) => (
              <tr key={banner._id} className="border-b border-gray-100 hover:bg-gray-50">
                <td className="py-3">
                  <img
                    src={banner.image.url}
                    alt={banner.category}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                </td>
                <td className="py-3">{banner.category}</td>
                <td className="py-3 text-center">
                  <button
                    onClick={() => handleEdit(banner)}
                    className="text-yellow-500 hover:text-yellow-600 font-medium mr-3"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(banner._id)}
                    className="text-red-500 hover:text-red-600 font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
