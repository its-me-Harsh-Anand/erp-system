// App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Orders from './components/Orders';
import Calendar from './components/Calendar';

function App() {
  return (
    <Router>
      <div className="bg-gray-900 text-white min-h-screen">
        <nav className="bg-gray-800 p-4">
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:underline">Dashboard</Link></li>
            <li><Link to="/products" className="hover:underline">Products</Link></li>
            <li><Link to="/orders" className="hover:underline">Orders</Link></li>
            <li><Link to="/calendar" className="hover:underline">Calendar</Link></li>
          </ul>
        </nav>

        <div className="container mx-auto p-4">
        <Routes>
          <Route path="/products" element={<Products />}>
          </Route>
          <Route path="/orders" element={<Orders />}>
          </Route>
          <Route path="/calendar" element={<Calendar />}>
          </Route>
          <Route path="/" element={<Dashboard />}>
          </Route>
        </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
