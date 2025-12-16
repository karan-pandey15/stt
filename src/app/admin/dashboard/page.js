// "use client"
// import React, { useState } from 'react';
// import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import { Users, Package, ShoppingCart, Clock, XCircle, TrendingUp, TrendingDown } from 'lucide-react';

// // Sample data
// const dashboardData = {
//   totalUsers: 10,
//   totalProducts: 50,
//   totalOrders: 4,
//   pendingOrders: 1,
//   cancelledOrders: 1,
//   userGrowth: 12.5,
//   orderGrowth: 8.3
// };

// const monthlyOrders = [
//   { month: 'Jan', orders: 650, revenue: 45000 },
//   { month: 'Feb', orders: 720, revenue: 52000 },
//   { month: 'Mar', orders: 890, revenue: 61000 },
//   { month: 'Apr', orders: 780, revenue: 54000 },
//   { month: 'May', orders: 920, revenue: 68000 },
//   { month: 'Jun', orders: 1100, revenue: 78000 },
//   { month: 'Jul', orders: 1050, revenue: 72000 },
//   { month: 'Aug', orders: 1200, revenue: 85000 },
//   { month: 'Sep', orders: 1150, revenue: 80000 },
//   { month: 'Oct', orders: 1300, revenue: 92000 }
// ];

// const orderStatusData = [
//   { name: 'Completed', value: 1, color: '#10b981' },
//   { name: 'Pending', value: 2, color: '#f59e0b' },
//   { name: 'Cancelled', value: 1, color: '#ef4444' }
// ];

 

// const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }) => (
//   <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100 hover:shadow-md transition-shadow">
//     <div className="flex items-start justify-between">
//       <div className="flex-1">
//         <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
//         <h3 className="text-3xl font-bold text-gray-900 mb-2">{value.toLocaleString()}</h3>
//         {trend && (
//           <div className="flex items-center gap-1">
//             {trend === 'up' ? (
//               <TrendingUp className="w-4 h-4 text-green-500" />
//             ) : (
//               <TrendingDown className="w-4 h-4 text-red-500" />
//             )}
//             <span className={`text-sm font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
//               {trendValue}%
//             </span>
//             <span className="text-xs text-gray-500 ml-1">vs last month</span>
//           </div>
//         )}
//       </div>
//       <div className={`p-3 rounded-lg ${color}`}>
//         <Icon className="w-6 h-6 text-white" />
//       </div>
//     </div>
//   </div>
// );

// export default function Dashboard() {
//   const [timeRange, setTimeRange] = useState('month');

//   return (
//     <div className="min-h-screen  bg-white">
//       {/* Header */}
//       <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
//           <div className="flex items-center justify-between">
//             <div>
//               <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
//               <p className="text-sm text-gray-500 mt-1">Welcome back! Here's what's happening today.</p>
//             </div>
//             <div className="flex gap-2">
//               <select 
//                 value={timeRange}
//                 onChange={(e) => setTimeRange(e.target.value)}
//                 className="px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
//               >
//                 <option value="week">Last Week</option>
//                 <option value="month">Last Month</option>
//                 <option value="year">Last Year</option>
//               </select>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
//           <StatCard
//             title="Total Users"
//             value={dashboardData.totalUsers}
//             icon={Users}
//             trend="up"
//             trendValue={dashboardData.userGrowth}
//             color="bg-gradient-to-br from-blue-500 to-blue-600"
//           />
//           <StatCard
//             title="Total Products"
//             value={dashboardData.totalProducts}
//             icon={Package}
//             color="bg-gradient-to-br from-purple-500 to-purple-600"
//           />
//           <StatCard
//             title="Total Orders"
//             value={dashboardData.totalOrders}
//             icon={ShoppingCart}
//             trend="up"
//             trendValue={dashboardData.orderGrowth}
//             color="bg-gradient-to-br from-green-500 to-green-600"
//           />
//           <StatCard
//             title="Pending Orders"
//             value={dashboardData.pendingOrders}
//             icon={Clock}
//             color="bg-gradient-to-br from-amber-500 to-amber-600"
//           />
//           <StatCard
//             title="Cancelled Orders"
//             value={dashboardData.cancelledOrders}
//             icon={XCircle}
//             color="bg-gradient-to-br from-red-500 to-red-600"
//           />
//         </div>

//         {/* Charts Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
//           {/* Orders Over Time */}
//           <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Orders Overview</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <LineChart data={monthlyOrders}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
//                 <YAxis stroke="#6b7280" fontSize={12} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: '#fff', 
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '8px',
//                     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//                   }}
//                 />
//                 <Legend />
//                 <Line 
//                   type="monotone" 
//                   dataKey="orders" 
//                   stroke="#3b82f6" 
//                   strokeWidth={3}
//                   dot={{ fill: '#3b82f6', r: 4 }}
//                   activeDot={{ r: 6 }}
//                   name="Orders"
//                 />
//               </LineChart>
//             </ResponsiveContainer>
//           </div>

//           {/* Order Status Pie Chart */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Status</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <PieChart>
//                 <Pie
//                   data={orderStatusData}
//                   cx="50%"
//                   cy="50%"
//                   innerRadius={60}
//                   outerRadius={90}
//                   paddingAngle={5}
//                   dataKey="value"
//                 >
//                   {orderStatusData.map((entry, index) => (
//                     <Cell key={`cell-${index}`} fill={entry.color} />
//                   ))}
//                 </Pie>
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: '#fff', 
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '8px'
//                   }}
//                 />
//               </PieChart>
//             </ResponsiveContainer>
//             <div className="mt-4 space-y-2">
//               {orderStatusData.map((item, idx) => (
//                 <div key={idx} className="flex items-center justify-between text-sm">
//                   <div className="flex items-center gap-2">
//                     <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
//                     <span className="text-gray-600">{item.name}</span>
//                   </div>
//                   <span className="font-semibold text-gray-900">{item.value}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Bottom Row */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//           {/* Revenue Chart */}
//           <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
//             <h2 className="text-lg font-semibold text-gray-900 mb-4">Revenue Trends</h2>
//             <ResponsiveContainer width="100%" height={300}>
//               <BarChart data={monthlyOrders}>
//                 <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
//                 <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
//                 <YAxis stroke="#6b7280" fontSize={12} />
//                 <Tooltip 
//                   contentStyle={{ 
//                     backgroundColor: '#fff', 
//                     border: '1px solid #e5e7eb',
//                     borderRadius: '8px',
//                     boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
//                   }}
//                   formatter={(value) => `$${value.toLocaleString()}`}
//                 />
//                 <Legend />
//                 <Bar 
//                   dataKey="revenue" 
//                   fill="#10b981" 
//                   radius={[8, 8, 0, 0]}
//                   name="Revenue ($)"
//                 />
//               </BarChart>
//             </ResponsiveContainer>
//           </div>

         
//         </div>
//       </div>
//     </div>
//   );
// }


import react from 'react';
export default function Dashboard() {
  return (
    <div>Dashboard</div>
  );
}