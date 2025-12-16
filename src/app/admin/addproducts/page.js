"use client";
import React, { useState } from "react";
import axios from "axios";
import { XCircle } from "lucide-react";

const CATEGORY_OPTIONS = [
  "Skin",
  "Glow",
  "Hair",
  "Gifts",
  "Best Seller",
  "Razors",
  "Fragrances",
  "Shave",
  "Trimmers",
  "Some Men",
];

export default function AddProductPage() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    skuNumber: "",
    coins: "",
    price: "",
    volume: "",
    initialRating: "",
    category: "",
    keyBenefits: [""],
    howToUse: [""],
    ingredients: [""],
  });

  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (e, field, index) => {
    const updated = [...formData[field]];
    updated[index] = e.target.value;
    setFormData({ ...formData, [field]: updated });
  };

  const addField = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ""] });
  };

  const removeField = (field, index) => {
    const updated = [...formData[field]];
    updated.splice(index, 1);
    setFormData({ ...formData, [field]: updated });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const previews = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages((prev) => [...prev, ...previews]);
  };

  const removeImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    const data = new FormData();
    data.append("name", formData.name);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("skuNumber", formData.skuNumber);
    data.append("coins", formData.coins);
    data.append("price", formData.price);
    data.append("volume", formData.volume);
    data.append("initialRating", formData.initialRating);

    const details = [
      {
        keyBenefits: formData.keyBenefits.filter((b) => b),
        howToUse: formData.howToUse.filter((h) => h),
        ingredients: formData.ingredients.filter((i) => i),
      },
    ];
    data.append("details", JSON.stringify(details));

    images.forEach((img) => {
      data.append("images", img.file);
    });

    try {
      const token = localStorage.getItem("token"); // replace as needed
      const res = await axios.post("https://api.stylishhim.com/api/products", data, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("✅ Product created successfully!");
      setFormData({
        name: "",
        description: "",
        skuNumber: "",
        coins: "",
        price: "",
        volume: "",
        initialRating: "",
        category: "",
        keyBenefits: [""],
        howToUse: [""],
        ingredients: [""],
      });
      setImages([]);
    } catch (err) {
      setMessage("❌ Error: " + err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto bg-white shadow-lg rounded-2xl p-8 mt-10 border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Add New Product
      </h2>

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

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            name="name"
            placeholder="Product Name"
            value={formData.name}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring focus:ring-pink-300 outline-none"
            required
          />
          <input
            name="skuNumber"
            placeholder="SKU Number"
            value={formData.skuNumber}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring focus:ring-pink-300 outline-none"
            required
          />
          <input
            name="price"
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring focus:ring-pink-300 outline-none"
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="coins"
            type="number"
            placeholder="Coins"
            value={formData.coins}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring focus:ring-pink-300 outline-none"
          />
          <input
            name="volume"
            placeholder="Volume (comma separated)"
            value={formData.volume}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring focus:ring-pink-300 outline-none"
          />
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="w-full border rounded-lg p-2 focus:ring focus:ring-pink-300 outline-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            name="initialRating"
            type="number"
            placeholder="Initial Rating (1–5)"
            value={formData.initialRating}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring focus:ring-pink-300 outline-none"
          />
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border rounded-lg p-2 focus:ring focus:ring-pink-300 outline-none"
            required
          >
            <option value="">Select Category</option>
            {CATEGORY_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Fields */}
        <div className="grid md:grid-cols-3 gap-4">
          {/* Key Benefits */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">Key Benefits</h3>
            {formData.keyBenefits.map((b, i) => (
              <div key={i} className="flex items-center mb-2">
                <input
                  value={b}
                  onChange={(e) => handleArrayChange(e, "keyBenefits", i)}
                  placeholder="Benefit"
                  className="border rounded-lg p-2 flex-1"
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
              className="text-sm text-black-600 hover:underline"
            >
              + Add Benefit
            </button>
          </div>

          {/* How To Use */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">How To Use</h3>
            {formData.howToUse.map((h, i) => (
              <div key={i} className="flex items-center mb-2">
                <input
                  value={h}
                  onChange={(e) => handleArrayChange(e, "howToUse", i)}
                  placeholder="How to use"
                  className="border rounded-lg p-2 flex-1"
                />
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => removeField("howToUse", i)}
                    className="ml-2 text-red-500"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("howToUse")}
              className="text-sm text-black-600 hover:underline"
            >
              + Add Step
            </button>
          </div>

          {/* Ingredients */}
          <div>
            <h3 className="font-semibold mb-2 text-gray-700">Ingredients</h3>
            {formData.ingredients.map((ing, i) => (
              <div key={i} className="flex items-center mb-2">
                <input
                  value={ing}
                  onChange={(e) => handleArrayChange(e, "ingredients", i)}
                  placeholder="Ingredient"
                  className="border rounded-lg p-2 flex-1"
                />
                {i > 0 && (
                  <button
                    type="button"
                    onClick={() => removeField("ingredients", i)}
                    className="ml-2 text-red-500"
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={() => addField("ingredients")}
              className="text-sm text-black-600 hover:underline"
            >
              + Add Ingredient
            </button>
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Upload Images
          </label>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageChange}
            className="border p-2 rounded-lg w-full"
          />

          {/* Preview */}
          {images.length > 0 && (
            <div className="flex flex-wrap gap-4 mt-4">
              {images.map((img, i) => (
                <div key={i} className="relative">
                  <img
                    src={img.preview}
                    alt="preview"
                    className="h-24 w-24 object-cover rounded-lg shadow"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(i)}
                    className="absolute -top-2 -right-2 bg-white rounded-full text-red-600"
                  >
                    <XCircle size={20} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full   text-white py-3 rounded-lg  transition font-semibold"
          style={{background:"var(--theme-color)"}}
        >
          {loading ? "Uploading..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}
