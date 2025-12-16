"use client";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { createOrder, clearOrderState } from "../redux/orderSlice";
import { clearCart } from "../redux/cartSlice";
import api from "../lib/api";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { loading, error } = useSelector((state) => state.order);
  
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    zip: "",
    phone: "",
  });
  
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [coinsApplied, setCoinsApplied] = useState(0);
  const [userCoins, setUserCoins] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    
    if (token && user) {
      try {
        const userData = JSON.parse(user);
        setForm({
          name: userData.name || "",
          email: userData.email || "",
          address: userData.address || "",
          city: userData.city || "",
          zip: userData.zip || "",
          phone: userData.phone || "",
        });
        setIsLoggedIn(true);
        setUserCoins(userData.coins || 0);
      } catch (err) {
        console.error("Error parsing user data");
      }
    }
  }, []);

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const freeDeliveryThreshold = 999;
  const shippingCost = total >= freeDeliveryThreshold ? 0 : 50;
  const amountNeeded = freeDeliveryThreshold - total;
  const progressPercentage = Math.min((total / freeDeliveryThreshold) * 100, 100);
  const discount = coinsApplied * 100;
  const finalTotal = total + shippingCost - discount;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleApplyCoins = () => {
    if (coinsApplied > userCoins) {
      toast.error(`You only have ${userCoins} coins available`);
      return;
    }
    toast.success(`Applied ${coinsApplied} coins!`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cartItems.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    if (!form.name || !form.email || !form.address || !form.phone) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const token = localStorage.getItem("token");
      
      if (!token && paymentMethod === "RAZORPAY") {
        toast.error("Please login to use Razorpay payment");
        setIsSubmitting(false);
        return;
      }

      const tax = Math.round(total * 0.18 * 100) / 100;
      
      const orderData = {
        products: cartItems.map(item => ({
          id: item.id,
          name: item.name,
          description: item.description || "",
          skuNumber: item.skuNumber || `SKU-${item.id}`,
          coins: item.coins || 0,
          price: item.price,
          volume: item.volume || "Standard",
          quantity: item.quantity,
          images: item.image ? [item.image] : item.images || [],
        })),
        paymentMethod,
        shippingAddress: `${form.address}, ${form.city}, ${form.zip}`,
        phone: form.phone,
        coinsApplied,
        discount: coinsApplied * 100,
        tax,
        shippingCost,
        subtotal: total,
        totalAmount: finalTotal,
      };

      const response = await api.post("/orders/create", orderData);

      if (paymentMethod === "COD") {
        toast.success("Order placed successfully!");
        dispatch(clearCart());
        dispatch(clearOrderState());
        
        setTimeout(() => {
          router.push(`/`);
        }, 1500);
      } else if (paymentMethod === "RAZORPAY") {
        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
          amount: Math.round(finalTotal * 100),
          currency: "INR",
          name: "StylishHim",
          description: "Order Payment",
          order_id: response.data.razorpayOrderId,
          handler: async (paymentResponse) => {
            try {
              const verifyData = {
                razorpayOrderId: response.data.razorpayOrderId,
                razorpayPaymentId: paymentResponse.razorpay_payment_id,
                razorpaySignature: paymentResponse.razorpay_signature,
                orderId: response.data.orderId,
              };

              await api.post("/orders/verify-payment", verifyData);
              toast.success("Payment verified! Order placed successfully!");
              dispatch(clearCart());
              dispatch(clearOrderState());
              
              setTimeout(() => {
                router.push(`/`);
              }, 1500);
            } catch (err) {
              toast.error("Payment verification failed");
            }
          },
          prefill: {
            name: form.name,
            email: form.email,
            contact: form.phone,
          },
          theme: {
            color: "var(--theme-color)",
          },
        };

        const script = document.createElement("script");
        script.src = "https://checkout.razorpay.com/v1/checkout.js";
        script.async = true;
        script.onload = () => {
          const rzp = new window.Razorpay(options);
          rzp.open();
        };
        document.body.appendChild(script);
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message || "Failed to create order";
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-10 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Cart is Empty</h1>
          <p className="text-gray-600 mb-6">Add some products before checking out</p>
          <button
            onClick={() => router.push("/")}
            style={{background: "var(--theme-color)"}}
            className="text-white px-8 py-3 rounded-lg font-semibold"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 py-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Shipping Details */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
          <h1 className="text-2xl font-semibold mb-2 text-gray-800">Checkout</h1>
          {isLoggedIn && <p className="text-sm text-green-600 mb-4">✓ Logged in - Details auto-filled</p>}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={{outlineColor: "var(--theme-color)", outlineWidth: '2px'}}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={form.email}
                  onChange={handleChange}
                  required
                  style={{outlineColor: "var(--theme-color)", outlineWidth: '2px'}}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">Street Address *</label>
              <input
                type="text"
                name="address"
                placeholder="Street Address"
                value={form.address}
                onChange={handleChange}
                required
                style={{outlineColor: "var(--theme-color)", outlineWidth: '2px'}}
                className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:border-transparent outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">City *</label>
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={form.city}
                  onChange={handleChange}
                  required
                  style={{outlineColor: "var(--theme-color)", outlineWidth: '2px'}}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">ZIP Code *</label>
                <input
                  type="text"
                  name="zip"
                  placeholder="ZIP Code"
                  value={form.zip}
                  onChange={handleChange}
                  required
                  style={{outlineColor: "var(--theme-color)", outlineWidth: '2px'}}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:border-transparent outline-none transition-all"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-1">Phone Number *</label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  style={{outlineColor: "var(--theme-color)", outlineWidth: '2px'}}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:border-transparent outline-none transition-all"
                />
              </div>
            </div>

            {/* Payment Method */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gradient-to-r from-gray-50 to-blue-50 mt-6">
              <h2 className="font-medium mb-3 text-gray-800">Payment Method</h2>
              <div className="space-y-2">
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={paymentMethod === "COD"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                  />
                  <span className="ml-3 text-gray-700">Cash on Delivery (COD)</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="RAZORPAY"
                    checked={paymentMethod === "RAZORPAY"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-4 h-4"
                    disabled={!isLoggedIn}
                  />
                  <span className={`ml-3 ${!isLoggedIn ? 'text-gray-400' : 'text-gray-700'}`}>
                    Razorpay {!isLoggedIn && "(Login required)"}
                  </span>
                </label>
              </div>
            </div>

            {/* Coins Section */}
            {isLoggedIn && userCoins > 0 && (
              <div className="border border-yellow-200 rounded-lg p-4 bg-yellow-50">
                <h3 className="font-medium text-gray-800 mb-2">Apply Coins</h3>
                <p className="text-sm text-gray-600 mb-3">You have {userCoins} coins available (₹1 = 100 coins)</p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    min="0"
                    max={userCoins}
                    value={coinsApplied}
                    onChange={(e) => setCoinsApplied(Math.min(Math.max(0, parseInt(e.target.value) || 0), userCoins))}
                    placeholder="Enter coins to apply"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:border-transparent outline-none"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoins}
                    style={{background: "var(--theme-color)"}}
                    className="text-white px-4 py-2 rounded-lg font-semibold"
                  >
                    Apply
                  </button>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting || loading}
              style={{background: "var(--theme-color)"}}
              className="w-full text-white py-3 rounded-lg font-semibold mt-6 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting || loading ? "Processing..." : "Place Order"}
            </button>
          </form>
        </div>

        {/* Right: Order Summary */}
        <div className="bg-white rounded-2xl shadow-lg p-6 h-fit">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">Order Summary</h2>

          <div className="space-y-3 border-b border-gray-200 pb-4">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">
                    {item.quantity} × ₹{item.price.toFixed(2)}
                  </p>
                </div>
                <span className="font-semibold text-gray-700">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          {/* Totals */}
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span className={shippingCost === 0 ? "text-green-600 font-semibold line-through" : ""}>
                ₹{shippingCost === 0 ? "50.00" : shippingCost.toFixed(2)}
              </span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-sm text-green-600">
                <span>Coins Discount</span>
                <span>-₹{discount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-base font-semibold mt-2 pt-2 border-t border-gray-200">
              <span>Total Amount</span>
              <span style={{color: "var(--theme-color)"}}>₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>

          {/* Free Delivery Indicator */}
          {total < freeDeliveryThreshold && total > 0 && (
            <div style={{borderColor: "var(--theme-color)"}} className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-opacity-30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Add ₹{amountNeeded.toFixed(2)} more for FREE delivery!
                </span>
                <span style={{color: "var(--theme-color)"}} className="text-xs font-semibold">
                  {progressPercentage.toFixed(0)}%
                </span>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
                <div
                  className="h-2.5 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progressPercentage}%`, backgroundColor: "var(--theme-color)" }}
                ></div>
              </div>
              
              <p className="text-xs text-gray-600 mt-2 text-center">
                🚚 Free delivery on orders above ₹999
              </p>
            </div>
          )}

          {/* Free Delivery Achieved */}
          {total >= freeDeliveryThreshold && (
            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border-2 border-green-400 animate-pulse">
              <div className="flex items-center justify-center space-x-2">
                <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-green-700 font-semibold">
                  🎉 You&apos;ve unlocked FREE Delivery!
                </span>
              </div>
              <p className="text-xs text-green-600 mt-2 text-center">
                Your shipping cost has been waived
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}