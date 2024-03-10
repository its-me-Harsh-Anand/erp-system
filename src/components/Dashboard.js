// components/Dashboard.js
import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

function Dashboard() {
  const [products] = useLocalStorage('products', []);
  const [orders] = useLocalStorage('orders', []);

  const totalProducts = products.length;
  const totalOrders = orders.length;

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Product Metrics */}
        <div className="bg-blue-500 text-white p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Total Products</h3>
          <p className="text-3xl font-bold">{totalProducts}</p>
        </div>

        {/* Order Metrics */}
        <div className="bg-green-500 text-white p-4 rounded-md">
          <h3 className="text-lg font-semibold mb-2">Total Orders</h3>
          <p className="text-3xl font-bold">{totalOrders}</p>
        </div>
      </div>

      {/* Products List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Products</h3>
        <ul className="divide-y divide-gray-200">
          {products.slice(0, 5).map((product) => (
            <li key={product.id} className="py-2">
              <p className="text-lg font-semibold">{product.name}</p>
              <p className="text-sm text-gray-500">{product.category}</p>
              <p className="text-sm">${product.price} - In Stock: {product.stockQuantity}</p>
            </li>
          ))}
        </ul>
      </div>

      {/* Orders List */}
      <div className="mt-8">
        <h3 className="text-xl font-semibold mb-4">Recent Orders</h3>
        <ul className="divide-y divide-gray-200">
          {orders.slice(0, 5).map((order) => (
            <li key={order.id} className="py-2">
              <p className="text-lg font-semibold">Order ID: {order.id}</p>
              <p className="text-sm">Customer: {order.customerName}</p>
              <p className="text-sm">Date: {order.orderDate} - Status: {order.status}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Dashboard;
