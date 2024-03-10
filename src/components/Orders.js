// components/Orders.js
import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialOrders } from '../utils/sampleData';

function Orders() {
  const [orders, setOrders] = useLocalStorage('orders', initialOrders);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [newStatus, setNewStatus] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const viewOrderDetails = (orderId) => {
    const order = orders.find((order) => order.id === orderId);
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const updateOrderStatus = (orderId) => {
    const updatedOrders = orders.map((order) =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    setNewStatus('');
  };

  const deleteOrder = (orderId) => {
    const updatedOrders = orders.filter((order) => order.id !== orderId);
    setOrders(updatedOrders);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Orders Management</h2>

      <ul className="divide-y divide-gray-200">
        {orders.map((order) => (
          <li key={order.id} className="py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">Order ID: {order.id}</p>
                <p className="text-sm">Customer: {order.customerName}</p>
                <p className="text-sm">Date: {order.orderDate} - Status: {order.status}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  className="px-3 py-1 bg-blue-500 text-white rounded"
                  onClick={() => viewOrderDetails(order.id)}
                >
                  View Details
                </button>
                <select
                  className="p-2 border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                  onChange={(e) => setNewStatus(e.target.value)}
                  value={newStatus}
                >
                  <option value="" disabled>Select Status</option>
                  <option value="Processing">Processing</option>
                  {order.status !== 'Shipped' && <option value="Shipped">Mark as Shipped</option>}
                  <option value="Cancelled">Cancelled</option>
                  {/* Add more status options as needed */}
                </select>
                <button
                  className="px-3 py-1 bg-green-500 text-white rounded"
                  onClick={() => updateOrderStatus(order.id)}
                  disabled={!newStatus}
                >
                  Update Status
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded"
                  onClick={() => deleteOrder(order.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>

      {/* Order Details Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="absolute inset-0 bg-gray-800 opacity-50"></div>
          <div className="relative bg-white p-4 rounded-md">
            <div className="flex justify-end">
              <button
                className="p-2 text-gray-500 hover:text-gray-700"
                onClick={() => setIsModalOpen(false)}
              >
                Close
              </button>
            </div>
            {selectedOrder && (
              <div className='text-black'>
                <h3 className="text-lg font-semibold mb-2">Order Details</h3>
                <p>Order ID: {selectedOrder.id}</p>
                <p>Customer: {selectedOrder.customerName}</p>
                <p>Order Date: {selectedOrder.orderDate}</p>
                <p>Status: {selectedOrder.status}</p>
                {/* Add more details as needed */}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
