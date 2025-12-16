"use client"

import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";
import { products } from "../../productdisplay/page";
import { useDispatch } from "react-redux";
import { addToCart } from "@/app/redux/cartSlice";
import toast from "react-hot-toast";
import { useRouter } from 'next/navigation';
import { useCartDrawer } from "@/app/context/CartContext";
import { showToast } from "@/components/ToastProvider";


export default function ProductDetailPage() {
  const params = useParams();
  const idParam = Array.isArray(params?.id) ? params.id[0] : params?.id;
  const product = products.find((item) => String(item.id) === String(idParam));
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();
  const { setIsCartOpen } = useCartDrawer();
  // const prevImage = () => {
  //     setActiveImageIndex((prev) =>
  //         prev === 0 ? product.images.length - 1 : prev - 1
  //     );
  // };

  // const nextImage = () => {
  //     setActiveImageIndex((prev) =>
  //         prev === product.images.length - 1 ? 0 : prev + 1
  //     );
  // };
  const dispatch = useDispatch();

  const reviewSummary = {}


  const primaryImage = product.image;

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
   showToast(`${product.name} has been added to your cart!`, "success");
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    router.push('/checkout');
  };
  const reviewsData = [
    {
      id: 1,
      name: 'Harj Jayesh',
      date: '06/09/2023',
      rating: 5,
      text: `I’ve been using this anti-dandruff shampoo for a few weeks now, and I’m really happy with the results. It noticeably reduced flakiness after just a few washes and left my scalp feeling clean and refreshed. The scent is mild and pleasant, and it doesn’t dry out my hair like some other anti-dandruff shampoos I’ve tried. Overall, it works well and does exactly what it promises. I would definitely recommend it to anyone dealing with dandruff!`,
      image: 'https://judgeme.imgix.net/seon-skin/1750420871__img_0348__original.jpeg?auto=format&w=160',
    },
    {
      id: 2,
      name: 'Tanaya Mathur',
      date: '06/09/2023',
      rating: 5,
      text: `This product has great cleansing properties without being harsh on the scalp. Perfect for sensitive skin and works like a charm on the 1st wash itself. 100% recommend!`,

    },
    // extra dummy reviews to demonstrate pagination
    {
      id: 3,
      name: 'Amit Singh',
      date: '07/09/2023',
      rating: 4,
      text: 'Good product, mild scent, gentle on scalp.',
      image: 'https://judgeme.imgix.net/seon-skin/1750424752__b20cfc53-7074-4c02-b2c4-5d5a4dc7e26e__original.jpeg?auto=format&w=160',
    },
    {
      id: 4,
      name: 'Priya Sharma',
      date: '08/09/2023',
      rating: 5,
      text: 'Works well for my sensitive scalp.',
      image: 'https://judgeme.imgix.net/seon-skin/1753352424__image__original.jpg?auto=format&w=160',
    },
    {
      id: 5,
      name: 'Rohit Verma',
      date: '09/09/2023',
      rating: 3,
      text: 'Average. Helped a bit with flakes.',
      image: 'https://judgeme.imgix.net/seon-skin/1750767376__1000089997__original.jpg?auto=format&w=160',
    },
  ];

  const REVIEWS_PER_PAGE = 4;
  const ACCENT = "var(--theme-color)";
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(reviewsData.length / REVIEWS_PER_PAGE);

  const paginated = reviewsData.slice(
    (page - 1) * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE
  );
  function Star({ filled, size = 16 }) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 20 20"
        fill={filled ? 'currentColor' : 'none'}
        stroke={filled ? "var(--theme-color)" : "var(--theme-color)"}
        className={filled ? '' : 'text-white'}
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.539-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.075 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
      </svg>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Product not found.</p>
          <Link href="/productpage" style={{color: "var(--theme-color)"}} className="font-medium mt-4 inline-block">
            Back to products
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-white">
      

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Marcellus&family=Work+Sans:wght@300;400;500;600;700&display=swap');

        * {
          font-family: 'Work Sans', 'Marcellus', serif;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: 'Marcellus', 'Work Sans', serif;
        }
      `}</style>
      <main className="max-w-6xl mx-auto px-4 py-10">
        <Link href="/productpage" style={{color: "var(--theme-color)"}} className="font-medium mb-6 inline-block">
          &larr; Back to products
        </Link>
        <div className="grid md:grid-cols-2 gap-10">
          <div>
            <div className="relative w-full h-96 rounded-2xl flex items-center justify-center overflow-hidden">
              <img src={primaryImage} alt={product.name} className="max-h-full object-contain p-4" />
            </div>
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              {product?.details?.map((d, i) => (
                <details
                  key={i}
                  className="group py-3 transition-all duration-200 hover:bg-gray-50 open:bg-gray-50"
                >
                  <summary className="flex justify-between items-center cursor-pointer text-sm font-medium text-gray-700">
                    {d.title}
                    <span className="text-gray-400 text-lg group-open:rotate-45 transform transition-transform duration-300">
                      +
                    </span>
                  </summary>
                  <p className="mt-2 text-gray-500 text-sm leading-relaxed pl-1 md:pl-2">
                    {d.content}
                  </p>
                </details>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-4xl font-semibold text-gray-900 mb-4">{product.name}</h1>
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    style={{color: index < product.rating ? "var(--theme-color)" : '#d1d5db'}}
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-gray-600 text-lg">({product.reviews} reviews)</span>
            </div>
            <p style={{color: "var(--theme-color)"}} className="text-3xl font-bold mb-6">Rs. {product.price.toFixed(2)}</p>
            <p className="text-gray-700 text-base leading-relaxed mb-8">{product.description}</p>

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
              <button style={{backgroundColor: "var(--theme-color)"}} className="flex-1 hover:bg-[#9a7f6d] text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            <button
              style={{backgroundColor: "var(--theme-color)"}}
              className="w-full hover:bg-[#9a7f6d] text-white font-semibold py-3 rounded-lg transition-colors duration-200 mb-6"
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
      <div className="bg-white p-6 max-w-6xl mx-auto">
        <h2 className="text-xl font-medium text-gray-800 mb-4">Customer Reviews</h2>

        {/* Summary */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex flex-col items-center md:items-start">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star key={i} filled />
              ))}
            </div>
            <p className="text-lg font-medium text-gray-800 mt-1">
              {reviewSummary?.average} out of 5
            </p>
            <p className="text-sm text-gray-500">Based on {reviewSummary?.total} reviews</p>
          </div>

          {/* Breakdown */}
          <div className="w-full max-w-md">
            {[5, 4, 3, 2, 1].map((star) => {
              const count = reviewSummary?.distribution?.[star] ?? 0;
              const widthPct = Math.round((count / Math.max(reviewSummary?.total, 1)) * 100);
              return (
                <div
                  key={star}
                  className="flex items-center justify-between py-1 text-sm text-gray-700"
                >
                  <div className="flex items-center space-x-1 w-28">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} filled={i < star} size={14} />
                    ))}
                  </div>

                  <div className="flex-1 mx-3 bg-gray-200 rounded-full h-2">
                    <div
                      className="h-2 rounded-full"
                      style={{
                        width: `${widthPct}%`,
                        backgroundColor: count > 0 ? ACCENT : 'transparent',
                      }}
                    />
                  </div>

                  <div className="w-6 text-right text-sm text-gray-700">{count}</div>
                </div>
              );
            })}
          </div>

          {/* Write review */}
          <div className="self-start md:self-center">
            <button
              type="button"
              style={{backgroundColor: "var(--theme-color)"}}
              className="text-white px-4 py-2 rounded transition hover:bg-opacity-90"
            >
              Write a review
            </button>
          </div>
        </div>

        <hr style={{borderColor: "var(--theme-color)"}} className="my-6 h-[1px]" />

        {/* Reviews List */}
        <div>
          <h3 className="text-lg font-500 text-gray-800 mb-4">Customer Testimonials</h3>

          <div className="space-y-4">
            {paginated?.map((r) => (
              <div
                key={r.id}
                style={{borderColor: "var(--theme-color)"}}
                className="bg-white p-4 border-b-[1px] flex flex-col md:flex-row gap-4"
              >
                {r.image && <img
                  src={r.image}
                  alt="product"
                  className="w-16 h-16 object-cover rounded flex-shrink-0"
                />}

                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="flex items-center space-x-3">
                        <h4 className="font-medium text-gray-800">{r.name}</h4>
                        <span className="text-sm text-gray-500">{r.date}</span>
                      </div>
                      <div className="flex mt-2 space-x-1" aria-hidden>
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} filled={i < r.rating} size={14} />
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
          <div className="flex items-center justify-center space-x-2 mt-6">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`px-3 py-1 rounded border text-sm ${page === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              &lt;
            </button>

            {[...Array(totalPages)].map((_, idx) => {
              const num = idx + 1;
              return (
                <button
                  key={num}
                  onClick={() => setPage(num)}
                  style={page === num ? {backgroundColor: "var(--theme-color)"} : {}}
                  className={`px-3 py-1 rounded border text-sm ${page === num ? 'text-white' : 'text-gray-700'}`}
                >
                  {num}
                </button>
              );
            })}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`px-3 py-1 rounded border text-sm ${page === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>

    </div>
  );
}
