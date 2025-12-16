"use client"
import React, { useEffect, useState } from "react";
import { XCircle } from "lucide-react";
import api from "../../lib/api"; 
import { motion, AnimatePresence } from "framer-motion";

export default function AdminProductTable() {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    skuNumber: "",
    price: "",
    coins: "",
    volume: "",
    description: "",
    keyBenefits: [""],
    howToUse: [""],
    ingredients: [""],
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const { data } = await api.get("/products/admin/all");
    setProducts(data);
  };

  const handleEdit = (product) => {
    setSelected(product);
    setFormData({
      name: product.name || "",
      skuNumber: product.skuNumber || "",
      price: product.price || "",
      coins: product.coins || "",
      volume: product.volume?.join(", ") || "",
      description: product.description || "",
      keyBenefits: product.details?.[0]?.keyBenefits || [""],
      howToUse: product.details?.[0]?.howToUse || [""],
      ingredients: product.details?.[0]?.ingredients || [""],
    });
    setShowModal(true);
  };

  const handleDelete = (product) => {
    setSelected(product);
    setConfirmDelete(true);
  };

  const confirmDeleteProduct = async () => {
    try {
      await api.delete(`/products/${selected._id}`);
      setProducts(products.filter((p) => p._id !== selected._id));
      setConfirmDelete(false);
      setMessage("✅ Product deleted successfully");
    } catch (error) {
      setMessage("❌ Failed to delete product");
    }
  };

  const handleChange = (e) => {
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleArrayChange = (e, key, index) => {
    const arr = [...formData[key]];
    arr[index] = e.target.value;
    setFormData({ ...formData, [key]: arr });
  };

  const addField = (key) => {
    setFormData({ ...formData, [key]: [...formData[key], ""] });
  };

  const removeField = (key, index) => {
    const arr = [...formData[key]];
    arr.splice(index, 1);
    setFormData({ ...formData, [key]: arr });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const mapped = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages(mapped);
  };

  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const form = new FormData();
      Object.keys(formData).forEach((key) => form.append(key, formData[key]));
      images.forEach((img) => form.append("images", img.file));

      await api.put(`/products/${selected._id}`, form);
      setShowModal(false);
      fetchProducts();
      setMessage("✅ Product updated successfully!");
    } catch (err) {
      setMessage("❌ Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-4">
      <h1 className="text-2xl font-semibold mb-6 text-center">Manage Products</h1>

      {message && (
        <div
          className={`p-3 mb-4 rounded-md text-center font-medium ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded-2xl shadow">
        <table className="min-w-full text-sm text-gray-700">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">Image</th>
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">SKU</th>
              <th className="py-3 px-4 text-left font-semibold">Price</th>
              <th className="py-3 px-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => (
              <tr key={p._id} className="hover:bg-gray-50 transition">
                <td className="py-3 px-4">
                  {p.images?.[0]?.url ? (
                    <img
                      src={p.images[0].url}
                      alt={p.name}
                      className="h-12 w-12 rounded-lg object-cover"
                    />
                  ) : (
                    "-"
                  )}
                </td>
                <td className="py-3 px-4">{p.name}</td>
                <td className="py-3 px-4">{p.skuNumber}</td>
                <td className="py-3 px-4">{p.price}</td>
                <td className="py-3 px-4 flex space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-3 py-1 rounded-lg text-white text-sm"
                    style={{ background: "var(--theme-color)" }}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p)}
                    className="px-3 py-1 rounded-lg bg-red-500 text-white text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 max-w-4xl w-full overflow-y-auto max-h-[90vh]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-xl font-semibold mb-4 text-center">
                Edit Product
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Product Name"
                    className="border rounded-lg p-2"
                  />
                  <input
                    name="skuNumber"
                    value={formData.skuNumber}
                    onChange={handleChange}
                    placeholder="SKU Number"
                    className="border rounded-lg p-2"
                  />
                  <input
                    name="price"
                    type="number"
                    value={formData.price}
                    onChange={handleChange}
                    placeholder="Price"
                    className="border rounded-lg p-2"
                  />
                </div>

                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows="3"
                  placeholder="Description"
                  className="border rounded-lg p-2 w-full"
                />

                {/* Key Benefits */}
                <div>
                  <h3 className="font-semibold mb-1">Key Benefits</h3>
                  {formData.keyBenefits.map((b, i) => (
                    <div key={i} className="flex items-center mb-1">
                      <input
                        value={b}
                        onChange={(e) => handleArrayChange(e, "keyBenefits", i)}
                        className="border rounded-lg p-2 flex-1"
                        placeholder="Benefit"
                      />
                      {i > 0 && (
                        <button
                          type="button"
                          onClick={() => removeField("keyBenefits", i)}
                          className="ml-2 text-red-500"
                        >
                          ✕
                        </button>
                      )}
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addField("keyBenefits")}
                    className="text-sm text-pink-600"
                  >
                    + Add Benefit
                  </button>
                </div>

                {/* Image Upload */}
                <div>
                  <label className="font-semibold mb-2 block">
                    Upload Images
                  </label>
                  <input
                    type="file"
                    multiple
                    onChange={handleImageChange}
                    className="border rounded-lg p-2 w-full"
                  />
                  <div className="flex flex-wrap gap-3 mt-3">
                    {images.map((img, i) => (
                      <div key={i} className="relative">
                        <img
                          src={img.preview}
                          alt="preview"
                          className="h-20 w-20 rounded-lg object-cover shadow"
                        />
                        <button
                          type="button"
                          onClick={() => removeImage(i)}
                          className="absolute -top-2 -right-2 bg-white rounded-full text-red-600"
                        >
                          <XCircle size={18} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-lg bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className="px-4 py-2 rounded-lg text-white"
                    style={{ background: "var(--theme-color)" }}
                  >
                    {loading ? "Updating..." : "Update"}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {confirmDelete && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-2xl p-6 w-full max-w-sm text-center"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h2 className="text-lg font-semibold mb-4">
                Are you sure you want to delete this product?
              </h2>
              <div className="flex justify-center gap-3">
                <button
                  onClick={() => setConfirmDelete(false)}
                  className="px-4 py-2 bg-gray-200 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDeleteProduct}
                  className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                  OK
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
