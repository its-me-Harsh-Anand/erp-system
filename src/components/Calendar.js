// components/Calendar.js
import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialOrders } from '../utils/sampleData';

function OrdersCalendar() {
  const [orders] = useLocalStorage('orders', initialOrders);
  const [selectedDate, setSelectedDate] = useState(null);

  // Function to get orders for a specific date
  const getOrdersForDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];
    console.log(formattedDate)
    return orders.filter((order) => order.orderDate === formattedDate);
  };

  // Function to handle date selection
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-2">Orders Calendar View</h2>
      <h6 className=" font-italic mb-5">click on date to view orders</h6>
      

      <div className="mb-4 text-black">
        <Calendar onChange={handleDateChange} value={selectedDate} />
      </div>

      {/* Display orders for the selected date */}
      {selectedDate && (
        <div>
          <h3 className="text-lg font-semibold mb-2">Orders for {selectedDate.toDateString()}</h3>
          <ul className="divide-y divide-gray-200">
            {getOrdersForDate(selectedDate).map((order) => (
              <li key={order.id} className="py-2">
                <div>
                  <p className="text-lg font-semibold">Order ID: {order.id}</p>
                  <p className="text-sm">Customer: {order.customerName}</p>
                  <p className="text-sm">Status: {order.status}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OrdersCalendar;
