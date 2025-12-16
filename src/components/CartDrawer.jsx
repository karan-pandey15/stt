"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { X, Trash2 } from "lucide-react";
import { addToCart, removeFromCart } from "@/app/redux/cartSlice";


export default function CartDrawer({ isOpen, onClose }) {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const router = useRouter();

    const total = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
    );

    return (
        <>
            {/* Background Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[150]"
                    onClick={onClose}
                />
            )}

            {/* Slide-in Drawer */}
            <div
                className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-xl z-[200] transform transition-transform duration-500  pt-[110px] md:pt-[65px] ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-lg font-semibold text-gray-800">
                        Cart <span className="text-sm text-gray-500">({cartItems.length})</span>
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
                        <X className="w-5 h-5 text-gray-700" />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="p-4 space-y-4 overflow-y-auto max-h-[70vh]">
                    {cartItems.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty.</p>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex items-start justify-between gap-3">
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className="w-16 h-16 object-contain rounded-md bg-gray-50"
                                />
                                <div className="flex-1">
                                    <p className="font-medium text-gray-800">{item.name}</p>
                                    <p className="text-gray-600 text-sm">Rs. {item.price.toFixed(2)}</p>

                                    {/* Quantity Controls */}
                                    <div className="flex items-center border border-gray-300 rounded-md mt-2 w-fit">
                                        <button
                                            onClick={() => {
                                                if (item.quantity > 1) {
                                                    dispatch(addToCart({ ...item, quantity: -1 }));
                                                } else {
                                                    dispatch(removeFromCart(item.id));
                                                }
                                            }}
                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                        >
                                            −
                                        </button>

                                        <span className="px-4 py-1 font-semibold text-gray-800">
                                            {item.quantity}
                                        </span>
                                        <button
                                            onClick={() => dispatch(addToCart({ ...item, quantity: 1 }))}
                                            className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                        >
                                            +
                                        </button>
                                    </div>
                                </div>
                                <button
                                    onClick={() => dispatch(removeFromCart(item.id))}
                                    className="text-gray-500 hover:text-red-500"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer */}
                {cartItems.length > 0 && (
                    <div className="border-t p-4 space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Estimated total</span>
                            <span className="font-semibold text-gray-800">
                                Rs. {total.toFixed(2)}
                            </span>
                        </div>
                        <p className="text-xs text-gray-500">
                            Taxes and <span style={{color: "var(--theme-color)"}}>shipping</span> calculated at checkout.
                        </p>
                        <button 
                            style={{backgroundColor: "var(--theme-color)"}}
                            className="w-full text-white font-semibold py-3 rounded-md transition-colors hover:opacity-90"
                            onClick={() => {
                                onClose();
                                router.push("/checkout");
                            }}
                        >
                            Proceed to Checkout
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
