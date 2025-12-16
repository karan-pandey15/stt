 
"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/cartSlice";
import { useCartDrawer } from "@/app/context/CartContext";
import { showToast } from "@/components/ToastProvider";

export default function ProductDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { setIsCartOpen } = useCartDrawer();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  // ✅ Fetch product data
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`https://api.stylishhim.com/api/products`);
        const data = await res.json();

        const found = data.find((item) => String(item._id) === String(id));
        setProduct(found || null);
      } catch (error) {
        console.error("Error fetching product:", error);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, [id]);

  // ✅ Fallback static reviews
  const staticReviews = [
    {
      id: 1,
      name: "Harj Jayesh",
      date: "06/09/2023",
      rating: 5,
      text: "I’ve been using this anti-dandruff shampoo for a few weeks now, and I’m really happy with the results.",
      image:
        "https://judgeme.imgix.net/seon-skin/1750420871__img_0348__original.jpeg?auto=format&w=160",
    },
    {
      id: 2,
      name: "Tanaya Mathur",
      date: "06/09/2023",
      rating: 5,
      text: "This product has great cleansing properties without being harsh on the scalp.",
    },
  ];

  const REVIEWS_PER_PAGE = 4;
  const ACCENT = "var(--theme-color)";
  const [page, setPage] = useState(1);

  const reviews = product?.reviews?.length ? product.reviews : staticReviews;
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const paginated = reviews.slice(
    (page - 1) * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE
  );

  // ✅ Star Component
  function Star({ filled, size = 16 }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? ACCENT : ACCENT}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
      </svg>
    );
  }

  // ✅ Add to Cart - only send required filtered data
  const handleAddToCart = () => {
    if (!product) return;

    const payload = {
      id: product._id,
      name: product.name,
      price: product.price,
      image:
        product?.images?.[0]?.url ||
        product?.image ||
        "/images/placeholder.png",
      quantity,
    };

    dispatch(addToCart(payload));
    showToast(`${product.name} has been added to your cart!`, "success");
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    if (!product) return;
    handleAddToCart();
    router.push("/checkout");
  };

  // ✅ Loading UI
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-700">
        Loading...
      </div>
    );
  }

  // ✅ Not Found UI
  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Product not found.</p>
          <Link
            href="/productpage"
            style={{ color: ACCENT }}
            className="font-medium mt-4 inline-block"
          >
            Back to products
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Main UI
  return (
    <div className="min-h-screen bg-white">
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

      <main className="max-w-6xl mx-auto px-4 py-10">
        <Link
          href="/productpage"
          style={{ color: ACCENT }}
          className="font-medium mb-6 inline-block"
        >
          &larr; Back to products
        </Link>

        <div className="grid md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div>
            <div className="relative w-full h-96 rounded-2xl flex items-center justify-center overflow-hidden">
              <img
                src={
                  product?.images?.[0]?.url ||
                  product?.image ||
                  "/images/placeholder.png"
                }
                alt={product.name}
                className="max-h-full object-contain p-4"
              />
            </div>

            {/* Product Details Accordion */}
            <div className="divide-y divide-gray-200 border-y border-gray-200 mt-6">
              {product?.details?.[0] &&
                Object.entries(product.details[0]).map(([key, value]) => {
                  if (["_id", "createdAt", "updatedAt"].includes(key))
                    return null;
                  return (
                    <details
                      key={key}
                      className="group py-3 transition-all duration-200 hover:bg-gray-50 open:bg-gray-50"
                    >
                      <summary className="flex justify-between items-center cursor-pointer text-sm font-medium text-gray-700 capitalize">
                        {key.replace(/([A-Z])/g, " $1")}
                        <span className="text-gray-400 text-lg group-open:rotate-45 transform transition-transform duration-300">
                          +
                        </span>
                      </summary>
                      <p className="mt-2 text-gray-500 text-sm leading-relaxed pl-1 md:pl-2">
                        {Array.isArray(value)
                          ? value.join(", ")
                          : String(value)}
                      </p>
                    </details>
                  );
                })}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    style={{
                      color:
                        index <
                        Math.round(
                          product.ratingsSum
                            ? product.ratingsSum / product.ratingsCount || 0
                            : product.averageRating || 0
                        )
                          ? ACCENT
                          : "#d1d5db",
                    }}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-lg">
                ({product.ratingsCount || 0} reviews)
              </span>
            </div>

            <p style={{ color: ACCENT }} className="text-3xl font-bold mb-6">
              Rs. {product.price.toFixed(2)}
            </p>

            <p className="text-gray-700 text-base leading-relaxed mb-8">
              {product.description}
            </p>

            {/* Quantity and Add to Cart */}
            <div className="flex items-center gap-4 mb-8">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 text-lg text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="px-6 py-2 text-lg font-semibold text-gray-800 border-x border-gray-300">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 text-lg text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <button
                style={{ backgroundColor: ACCENT }}
                className="flex-1 hover:opacity-90 text-white font-semibold py-3 px-6 rounded-lg"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            <button
              style={{ backgroundColor: ACCENT }}
              className="w-full hover:opacity-90 text-white font-semibold py-3 rounded-lg mb-6"
              onClick={handleBuyNow}
            >
              Buy Now
            </button>

            <div className="border-t border-gray-200 pt-6 text-sm text-gray-600 space-y-2">
              <p>✓ Authentic Product</p>
              <p>✓ Free Shipping on Orders Above Rs. 500</p>
              <p>✓ 7 Days Easy Return Policy</p>
              <p>✓ 100% Money Back Guarantee</p>
            </div>
          </div>
        </div>
      </main>

      {/* Customer Reviews */}
      <div className="bg-white p-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-medium text-gray-800 mb-4">
          Customer Reviews
        </h2>

        <div className="space-y-4">
          {paginated.map((r) => (
            <div
              key={r.id || r._id}
              style={{ borderColor: ACCENT }}
              className="bg-white p-4 border-b-[1px] flex flex-col md:flex-row gap-4"
            >
              {r.image && (
                <img
                  src={r.image}
                  alt="review"
                  className="w-16 h-16 object-cover rounded flex-shrink-0"
                />
              )}
              <div className="flex-1">
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-3">
                      <h4 className="font-medium text-gray-800">{r.name}</h4>
                      <span className="text-sm text-gray-500">{r.date}</span>
                    </div>
                    <div className="flex mt-2 space-x-1" aria-hidden>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} filled={i < (r.rating || 4)} size={14} />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 mt-3 text-sm">{r.text}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center space-x-2 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded border text-sm ${
                page === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              &lt;
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const num = idx + 1;
              return (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  style={page === num ? { backgroundColor: ACCENT } : {}}
                  className={`px-3 py-1 rounded border text-sm ${
                    page === num ? "text-white" : "text-gray-700"
                  }`}
                >
                  {num}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded border text-sm ${
                page === totalPages ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              &gt;
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
