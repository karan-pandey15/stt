"use client";

import { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavourite } from "../redux/favouriteSlice";
import { showToast } from "@/components/ToastProvider";
import api from "../lib/api";

export default function CategoryProductsPageWrapper() {
  // ✅ Wrap the inner page in Suspense
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg">Loading category...</p>
        </div>
      }
    >
      <CategoryProductsPage />
    </Suspense>
  );
}

function CategoryProductsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const categoryName = searchParams.get("categoryName") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const favourites = useSelector((state) => state.favourite.items);

  useEffect(() => {
    if (!categoryName) {
      setProducts([]);
      setError("");
      setLoading(false);
      return;
    }

    const fetchProducts = async () => {
      setLoading(true);
      setError("");
      try {
        const { data } = await api.get("/products/categoryapi", {
          params: { categoryname: categoryName },
        });
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        setError("Failed to load products. Please try again.");
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [categoryName]);

  const handleNavigate = (productId) => {
    router.push(`/products/${productId}`);
  };

  const pageTitle = useMemo(() => {
    if (!categoryName) return "Browse by Category";
    return `${categoryName}`;
  }, [categoryName]);

  const renderContent = () => {
    if (!categoryName) {
      return (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg">
            Select a category to view products.
          </p>
        </div>
      );
    }

    if (loading) {
      return (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg">Loading products...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex justify-center items-center py-20">
          <p className="text-red-500 text-lg">{error}</p>
        </div>
      );
    }

    if (!products.length) {
      return (
        <div className="flex justify-center items-center py-20">
          <p className="text-gray-500 text-lg">
            No products found for this category.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 md:gap-7">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            onNavigate={handleNavigate}
            favourites={favourites}
            dispatch={dispatch}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Marcellus&family=Work+Sans:wght@300;400;500;600;700&display=swap");
        * {
          font-family: "Work Sans", "Marcellus", serif;
        }
        h1,
        h2,
        h3,
        h4,
        h5,
        h6 {
          font-family: "Marcellus", "Work Sans", serif;
        }
      `}</style>

      <main className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8 py-6 sm:py-10">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
            {pageTitle}
          </h1>
        </div>
        {renderContent()}
      </main>
    </div>
  );
}

const ProductCard = ({ product, onNavigate, favourites, dispatch }) => {
  const isFavorite = favourites.some((item) => item._id === product._id);
  const rating = product.averageRating || 0;
  const priceValue = Number(product.price) || 0;

  const toggleFavorite = (e) => {
    e.stopPropagation();
    dispatch(toggleFavourite(product));
    showToast(
      `${product.name} ${isFavorite ? "removed from" : "added to"} favourites!`,
      isFavorite ? "error" : "success"
    );
  };

  return (
    <div
      onClick={() => onNavigate(product._id)}
      className="bg-white rounded-xl transition-all duration-300 cursor-pointer relative overflow-hidden group"
    >
      <button
        onClick={toggleFavorite}
        className="absolute top-3 right-3 z-10 bg-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
      >
        <Heart
          size={18}
          className={`${
            isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
          } transition-colors duration-300`}
        />
      </button>

      <div className="relative h-48 sm:h-64 rounded-t-xl overflow-hidden">
        <img
          src={product.images?.[0]?.url}
          alt={product.name}
          className="w-full h-full object-contain p-4 sm:p-6 group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-3 sm:p-5">
        <h3 className="text-sm sm:text-base font-medium text-gray-800 mb-2 sm:mb-3 h-10 sm:h-12 line-clamp-2 leading-5 sm:leading-6">
          {product.name}
        </h3>

        <div className="flex items-center gap-1 mb-2 sm:mb-3">
          <div className="flex items-center gap-0.5 sm:gap-1">
            {[...Array(5)].map((_, index) => (
              <svg
                key={index}
                style={{
                  color:
                    index < Math.round(rating) ? "var(--theme-color)" : "#d1d5db",
                }}
                className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
          </div>
          <span
            style={{ color: "var(--theme-color)" }}
            className="text-xs sm:text-sm ml-1 font-medium"
          >
            {rating > 0 ? `${rating.toFixed(1)} ★` : "No rating"}
          </span>
        </div>

        <p
          style={{ color: "var(--theme-color)" }}
          className="text-lg sm:text-xl font-semibold"
        >
          Rs. {priceValue.toFixed(2)}
        </p>
      </div>
    </div>
  );
};
