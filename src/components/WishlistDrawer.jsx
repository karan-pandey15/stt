"use client";
import { removeFavourite } from "@/app/redux/favouriteSlice";
import { X } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";


export default function WishlistDrawer({ isOpen, onClose }) {
    const favourites = useSelector((state) => state.favourite.items);
    const dispatch = useDispatch();

    return (
        <>
            {/* Backdrop */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[150]"
                    onClick={onClose}
                />
            )}

            {/* Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-sm sm:max-w-md bg-white shadow-2xl z-[200] transform transition-transform duration-300  pt-[110px] md:pt-[65px]  pointer-events-auto ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-200">
                    <h2 className="text-lg font-semibold text-gray-800">My Wishlist</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Wishlist Items */}
                <div className="overflow-y-auto h-[calc(100%-64px)] p-4 space-y-4">
                    {favourites.length === 0 ? (
                        <p className="text-gray-500 text-center mt-10">
                            Your wishlist is empty 💔
                        </p>
                    ) : (
                        favourites.map((item) => (
                            <div
                                key={item.id}
                                className="flex items-center gap-4 border border-gray-100 rounded-lg p-3 hover:shadow-md transition"
                            >
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-contain rounded"
                                />
                                <div className="flex-1">
                                    <h3 className="text-sm font-medium text-gray-800 line-clamp-2">
                                        {item.name}
                                    </h3>
                                    <p style={{color: "var(--theme-color)"}} className="text-sm font-semibold">
                                        Rs. {item.price.toFixed(2)}
                                    </p>
                                </div>
                                <button
                                    onClick={() => dispatch(removeFavourite(item))}
                                    className="text-red-500 hover:text-red-600 transition-colors"
                                >
                                    <X size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
