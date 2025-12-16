"use client";
import React, { useState, useEffect } from "react";
import {
  Package,
  IndianRupee,
  Truck,
  XCircle,
  CheckCircle2,
  Clock,
  Box,
  Home,
  ChevronRight,
} from "lucide-react";
import api from "../lib/api";
import toast from "react-hot-toast";

// ✅ TRACK ORDER COMPONENT
const TrackOrderTimeline = ({ status, productName }) => {
  const steps = [
    { key: "PLACED", label: "Order Placed", icon: CheckCircle2, desc: "We have received your order" },
    { key: "DISPATCHED", label: "Dispatched", icon: Box, desc: "Your order has been dispatched" },
    { key: "OUT_FOR_DELIVERY", label: "Out for Delivery", icon: Truck, desc: "Your order is on the way" },
    { key: "DELIVERED", label: "Delivered", icon: Home, desc: "Order has been delivered" },
  ];

  if (status === "CANCELLED") {
    return (
      <div className="p-4 bg-white rounded-2xl border border-red-200 text-center">
        <XCircle className="w-10 h-10 text-red-600 mx-auto mb-2" />
        <h3 className="text-lg font-bold text-red-700 mb-1">Order Cancelled</h3>
        <p className="text-red-600 text-xs">This order has been cancelled and refund will be processed.</p>
      </div>
    );
  }

  const activeIndex = steps.findIndex(step => step.key === status);

  return (
    <div className="mt-4 bg-white rounded-xl p-3 overflow-x-auto  ">
      <div className="flex items-start gap-0 min-w-max mt-2">
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          const isActive = index <= activeIndex;
          const isCurrent = index === activeIndex;

          return (
            <div key={step.key} className="flex items-start" style={{ minWidth: "180px" }}>
              <div className="flex flex-col items-center flex-1">
                {/* Icon */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 ${
                    isActive ? "bg-green-500 scale-110" : "bg-gray-300"
                  }`}
                >
                  <StepIcon className="w-6 h-6 text-white" />
                </div>

                {/* Label and Description */}
                <div className="mt-2 text-center">
                  <div
                    className={`font-semibold transition-all duration-300 ${
                      isActive ? "text-green-700 text-sm" : "text-gray-400 text-xs"
                    }`}
                  >
                    {step.label}
                  </div>
                  <p className={`text-xs mt-1 max-w-[160px] ${isActive ? "text-gray-600" : "text-gray-400"}`}>
                    {step.desc}
                  </p>
                  {isCurrent && (
                    <div className="mt-2 px-2 py-0.5 bg-green-600 text-white text-[10px] font-semibold rounded-full inline-flex items-center gap-1">
                      <Clock className="w-3 h-3 animate-pulse" />
                      Current
                    </div>
                  )}
                  {isActive && !isCurrent && (
                    <div className="mt-1 flex items-center justify-center gap-1 text-[11px] text-green-600 font-semibold">
                      <CheckCircle2 className="w-3 h-3" />
                      Done
                    </div>
                  )}
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex items-center" style={{ width: "60px", marginTop: "24px" }}>
                  <div
                    className={`h-1 w-full transition-all duration-500 ${
                      isActive ? "bg-green-500" : "bg-gray-300"
                    }`}
                  ></div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Scroll Hint for Mobile */}
      <div className="md:hidden text-center mt-1 text-[11px] text-gray-500 flex items-center justify-center gap-1">
        <ChevronRight className="w-3 h-3" />
        Scroll to see more
      </div>

      {/* Estimated Delivery */}
      {activeIndex < steps.length - 1 && activeIndex >= 0 && (
        <div className="mt-3 p-3 bg-white rounded-xl  ">
          <div className="flex items-start gap-2">
            <Clock className="w-4 h-4 text-green-600 mt-0.5" />
            <div>
              <p className="font-semibold text-gray-900 text-sm mb-0.5">Estimated Delivery</p>
              <p className="text-xs text-gray-600">
                {new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toLocaleDateString("en-IN", {
                  weekday: "long",
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// ✅ MAIN PAGE COMPONENT
export default function OrderDetailsPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTrack, setActiveTrack] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/auth/profile");
      setOrders(res?.data?.orders || []);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeColor = (status) => {
    const colors = {
      PLACED: "bg-blue-100 text-blue-700 border-blue-300",
      DISPATCHED: "bg-yellow-100 text-yellow-700 border-yellow-300",
      OUT_FOR_DELIVERY: "bg-purple-100 text-purple-700 border-purple-300",
      DELIVERED: "bg-green-100 text-green-700 border-green-300",
      CANCELLED: "bg-red-100 text-red-700 border-red-300",
    };
    return colors[status] || "bg-gray-100 text-gray-700 border-gray-300";
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-300 border-t-indigo-600 mx-auto mb-3"></div>
          <p className="text-gray-700 font-medium text-base">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-white">
        <div className="bg-white rounded-2xl p-8 max-w-md w-full text-center      ">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
            style={{ backgroundColor: "var(--theme-color)" }}
          >
            <Package className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">No Orders Yet</h2>
          <p className="text-gray-600 mb-4 text-sm">Start shopping to see your orders here</p>
          <button
            className="px-6 py-2 text-white text-sm font-semibold rounded-full hover:opacity-90 transition"
            style={{ backgroundColor: "var(--theme-color)" }}
          >
            Start Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <style jsx>{`
        /* Custom Scrollbar Styles */
        .overflow-x-auto::-webkit-scrollbar {
          height: 6px;
        }
        .overflow-x-auto::-webkit-scrollbar-track {
          background: #f9fafb;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
        .overflow-x-auto::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }
      `}</style>

      <div className="min-h-screen bg-white py-4 px-[1px]">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 px-2">
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Package className="w-8 h-8" style={{ color: "var(--theme-color)" }} />
              My Orders
            </h1>
            <p className="text-gray-600 text-sm">Track and manage all your orders in one place</p>
          </div>

          {/* Orders List */}
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl   overflow-hidden shadow-sm">
                <div className="p-4">
                  <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Box className="w-4 h-4" style={{ color: "var(--theme-color)" }} />
                    Products ({order.products.length})
                  </h3>

                  <div className="space-y-3">
                    {order.products.map((product, index) => (
                      <div
                        key={index}
                        className="p-3  rounded-xl hover:border-indigo-200 transition-all"
                      >
                        <div className="flex gap-3">
                          <div className="relative">
                            <img
                              src={product.images[0] || "/placeholder.jpg"}
                              alt={product.name}
                              className="w-20 h-20 object-cover rounded-lg"
                            />
                            <div className="absolute -top-2 -right-2 w-6 h-6 bg-indigo-600 text-white rounded-full flex items-center justify-center text-[10px] font-bold shadow">
                              {product.quantity}
                            </div>
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 text-base mb-0.5 truncate">{product.name}</h4>
                            <p className="text-xs text-gray-600 line-clamp-2 mb-2">{product.description}</p>

                            <div className="flex items-center gap-2 mb-2">
                              <span
                                className={`px-2 py-1 rounded-full text-[11px] font-bold border ${getStatusBadgeColor(
                                  product.deliveryStatus
                                )}`}
                              >
                                {product.deliveryStatus.replace(/_/g, " ")}
                              </span>
                              <span className="text-xs text-gray-500 font-medium">Qty: {product.quantity}</span>
                            </div>

                            <div className="flex items-center justify-between flex-wrap gap-2">
                              <div className="flex items-center gap-1 font-bold text-lg text-gray-900">
                                <IndianRupee className="w-4 h-4" />
                                {product.price.toLocaleString("en-IN")}
                              </div>

                              <button
                                onClick={() =>
                                  setActiveTrack(activeTrack === product._id ? null : product._id)
                                }
                                className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 transition-all flex items-center gap-1"
                              >
                                <Truck className="w-3.5 h-3.5" />
                                Track
                              </button>
                            </div>
                          </div>
                        </div>

                        {/* ✅ Tracking Section */}
                        {activeTrack === product._id && (
                          <div className="mt-3">
                            <TrackOrderTimeline
                              status={product.deliveryStatus}
                              productName={product.name}
                            />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                 
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
