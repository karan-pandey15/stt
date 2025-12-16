"use client";
import { useState } from "react";
import { Minus, Plus, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";

import ProductListingPage from "../../productdisplay/page";
export default function ProductDetailPage({ params }) {
    const productId = 2;
    const product = {
        id: productId,
        title: "Scalp Purify Anti-Dandruff Shampoo",
        price: 349,
        rating: 5.0,
        reviews: 10,
        images: [
            "https://seonskin.in/cdn/shop/files/3d_product_mockup_and_render_2.png?v=1750847007&width=1800",
            
            "https://seonskin.in/cdn/shop/files/WhatsApp_Image_2025-07-05_at_19.41.02_1.jpg?v=1751888972&width=1800",
            "https://seonskin.in/cdn/shop/files/WhatsApp_Image_2025-07-05_at_19.41.02.jpg?v=1751888972&width=1800",
            "https://seonskin.in/cdn/shop/files/WhatsApp_Image_2025-07-05_at_19.41.01_1.jpg?v=1751888971&width=1800",
        ],
        details: [
            {
                title: "PRODUCT DETAILS",
                content: "Fresh, flake-free & healthy scalp shampoo. Helps to control dandruff and nourishes the hair roots.",
            },
            {
                title: "MATERIALS + CARE",
                content: "Made with natural extracts and safe for all hair types.",
            },
            {
                title: "SHIPPING + RETURNS",
                content: "Shipping calculated at checkout. Easy 7-day returns.",
            },
        ],
    };

    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);

    const prevImage = () => {
        setActiveImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const nextImage = () => {
        setActiveImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };
   
    const reviewSummary = {
        average: 5.0,
        total: 10,
        distribution: { 5: 10, 4: 0, 3: 0, 2: 0, 1: 0 },
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
    return (
        <>
            {/* MAIN PRODUCT CONTAINER */}
            <div className="flex flex-col md:flex-row gap-10 px-4 md:px-12 py-10 text-[#2b2b2b] pt-[110px] md:pt-[65px]">
                {/* LEFT SECTION — Image Slider */}
                <div className="flex flex-col md:flex-row items-center gap-6 md:w-1/2">
                    {/* Main Image Slider */}
                    <div className="relative w-full h-[300px] md:h-[550px] flex justify-center items-center order-1 md:order-1">
                        <img
                            src={product.images[activeImageIndex]}
                            alt="Product"
                            className="object-contain w-full h-full transition-all duration-300"
                        />

                        {/* Prev Button */}
                        <button
                            onClick={prevImage}
                            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full shadow-md"
                        >
                            <ChevronLeft className="w-6 h-6 text-gray-700" />
                        </button>

                        {/* Next Button */}
                        <button
                            onClick={nextImage}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-70 hover:bg-opacity-90 p-2 rounded-full shadow-md"
                        >
                            <ChevronRight className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>

                    {/* Thumbnail Column */}
                    <div className="flex md:flex-col gap-3 order-2 md:order-2 mt-4 md:mt-0">
                        {product.images.map((img, i) => (
                            <div
                                key={i}
                                onClick={() => setActiveImageIndex(i)}
                                className={`border rounded-md overflow-hidden cursor-pointer ${activeImageIndex === i ? "border-[#c87b65]" : "border-gray-200"
                                    }`}
                            >
                                <img
                                    src={img}
                                    alt="thumb"
                                    width={70}
                                    height={70}
                                    className="object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* RIGHT SECTION — Product Info */}
                <div className="flex flex-col md:w-1/2">
                    <h1 className="text-3xl md:text-4xl font-serif mb-3">{product.title}</h1>
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-[#c87b65] text-lg">★★★★★</span>
                        <span className="text-sm text-gray-600">{product.reviews} reviews</span>
                    </div>

                    <p className="text-xl font-medium mb-2">Rs. {product.price}.00</p>
                    <p className="text-sm text-gray-500 mb-6">
                        SHIPPING CALCULATED AT CHECKOUT.
                    </p>

                    {/* QUANTITY + ADD TO CART ROW */}
                    <div className="flex items-center gap-4 mb-6">
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                            <button
                                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                className="px-3 py-2 hover:bg-gray-50"
                            >
                                <Minus className="w-4 h-4 text-gray-600" />
                            </button>
                            <span className="px-4 py-2 text-gray-700 font-medium border-x border-gray-200">
                                {quantity}
                            </span>
                            <button
                                onClick={() => setQuantity((q) => q + 1)}
                                className="px-3 py-2 hover:bg-gray-50"
                            >
                                <Plus className="w-4 h-4 text-gray-600" />
                            </button>
                        </div>

                        <button style={{backgroundColor: "var(--theme-color)"}} className="flex items-center gap-2 hover:bg-[#d16d4f] text-white px-6 py-3 rounded-md transition-all duration-200 shadow-sm w-auto justify-center">
                            <ShoppingCart className="w-4 h-4" />
                            <span className="text-sm font-medium">Add to cart</span>
                        </button>
                    </div>

                    <button style={{backgroundColor: "var(--theme-color)"}} className="w-[280px] hover:bg-[#d16d4f] text-white text-base font-medium py-3 rounded-md transition-all duration-200 shadow-sm mb-6">
                        Buy it now
                    </button>

                    <div className="flex flex-col gap-1 mb-8 text-sm text-gray-600">
                        <p>🚚 Reliable shipping</p>
                        <p>↩️ Flexible returns</p>
                    </div>

                    <div className="divide-y divide-gray-200 border-y border-gray-200">
                        {product.details.map((d, i) => (
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
            </div>

            {/* SEPARATE REVIEWS SECTION - BELOW PRODUCT CONTAINER */}



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
                            {reviewSummary.average} out of 5
                        </p>
                        <p className="text-sm text-gray-500">Based on {reviewSummary.total} reviews</p>
                    </div>

                    {/* Breakdown */}
                    <div className="w-full max-w-md">
                        {[5, 4, 3, 2, 1].map((star) => {
                            const count = reviewSummary.distribution[star] ?? 0;
                            const widthPct = Math.round((count / Math.max(reviewSummary.total, 1)) * 100);
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
                        {paginated.map((r) => (
                            <div
                                key={r.id}
                                style={{borderColor: "var(--theme-color)"}}
                                className="bg-white p-4 border-b-[1px] flex flex-col md:flex-row gap-4"
                            >
                                {r.image &&  <img
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

             <ProductListingPage />
        </>
    );
}