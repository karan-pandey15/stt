// pages/admin/orders.jsx
"use client"
import { useEffect, useState } from 'react';
import api from '../../lib/api';
import Link from 'next/link';

const ORDER_STATUSES = ['PENDING','CONFIRMED','SHIPPED','DISPATCHED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED'];
const PRODUCT_STATUSES = ['PLACED','DISPATCHED','OUT_FOR_DELIVERY','DELIVERED','CANCELLED'];

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(null); // orderId being saved
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/orders/admin/all-orders');
      setOrders(data.orders || []);
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to fetch orders');
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      setSaving(orderId);
      await api.put(`/orders/${orderId}/status`, { orderStatus: status });
      await fetchOrders();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to update order');
    } finally {
      setSaving(null);
    }
  };

  const updateProductStatus = async (orderId, productId, payload) => {
    try {
      setSaving(orderId);
      await api.put(`/orders/${orderId}/status`, { productId, ...payload });
      await fetchOrders();
    } catch (err) {
      console.error(err);
      setError(err?.response?.data?.message || 'Failed to update product');
    } finally {
      setSaving(null);
    }
  };

  return (
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-semibold mb-4">Admin — All Orders</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {loading ? (
          <div>Loading...</div>
        ) : (
          orders.map(order => (
            <div key={order._id} className="border rounded-lg p-4 mb-4 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <div className="text-sm text-gray-600">Order ID: <span className="font-mono">{order._id}</span></div>
                  <div className="font-medium">{order.user?.name || 'Unknown User'} • {order.user?.email}</div>
                  <div className="text-sm">Placed: {new Date(order.createdAt).toLocaleString()}</div>
                </div>

                <div className="flex gap-2 items-center">
                  <div className="text-sm">Total: ₹{order.totalAmount}</div>
                  <div className="text-sm">Payment: {order.paymentMethod} / {order.paymentStatus}</div>
                  <select
                    value={order.orderStatus}
                    onChange={e => updateOrderStatus(order._id, e.target.value)}
                    disabled={saving === order._id}
                    className="border px-2 py-1 rounded"
                  >
                    {ORDER_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="mt-4 space-y-3">
                {order.products.map(p => (
                  <div key={p.id + '_' + p.name} className="border rounded p-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div className="flex items-center gap-3">
                      <img src={p.images?.[0] || '/placeholder.png'} alt={p.name} className="w-16 h-16 object-cover rounded" />
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-sm text-gray-600">Qty: {p.quantity} • ₹{p.price}</div>
                        <div className="text-xs text-gray-500">SKU: {p.skuNumber}</div>
                      </div>
                    </div>

                    <div className="flex flex-col md:items-end gap-2 min-w-[220px]">
                      <div className="flex items-center gap-2">
                        <select
                          value={p.deliveryStatus}
                          onChange={e => updateProductStatus(order._id, p.id, { deliveryStatus: e.target.value })}
                          disabled={saving === order._id}
                          className="border px-2 py-1 rounded"
                        >
                          {PRODUCT_STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                        <button
                          onClick={() => updateProductStatus(order._id, p.id, { deliveryStatus: 'CANCELLED' })}
                          className="text-sm px-2 py-1 border rounded bg-red-50"
                          disabled={saving === order._id}
                        >
                          Cancel Item
                        </button>
                      </div>

                      <div className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Tracking #"
                          defaultValue={p.trackingNumber || ''}
                          onBlur={e => updateProductStatus(order._id, p.id, { trackingNumber: e.target.value })}
                          className="border px-2 py-1 rounded text-sm"
                        />
                        <input
                          type="date"
                          defaultValue={p.estimatedDelivery ? new Date(p.estimatedDelivery).toISOString().slice(0,10) : ''}
                          onChange={e => updateProductStatus(order._id, p.id, { estimatedDelivery: e.target.value })}
                          className="border px-2 py-1 rounded text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}
