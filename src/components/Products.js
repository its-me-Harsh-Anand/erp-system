// components/Products.js
import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { initialProducts } from '../utils/sampleData';

function Products() {
  const [products, setProducts] = useLocalStorage('products', initialProducts);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    price: 0,
    stockQuantity: 0,
  });

  const addProduct = () => {
    setProducts([...products, { ...newProduct, id: Date.now() }]);
    setNewProduct({
      name: '',
      category: '',
      price: 0,
      stockQuantity: 0,
    });
  };

  const deleteProduct = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    setProducts(updatedProducts);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Products Management</h2>

      <ul className="divide-y divide-gray-200">
        {products.map((product) => (
          <li key={product.id} className="py-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500">{product.category}</p>
                <p className="text-sm">${product.price} - In Stock: {product.stockQuantity}</p>
              </div>
              <button
                className="px-3 py-1 bg-red-500 text-white rounded"
                onClick={() => deleteProduct(product.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Add New Product</h3>
        <form>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="mb-4">
              <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                Product Name
              </label>
              <input
                type="text"
                id="productName"
                className="mt-1 p-2 border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                placeholder="Enter product name"
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                Category
              </label>
              <input
                type="text"
                id="category"
                className="mt-1 p-2 border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                placeholder="Enter category"
                value={newProduct.category}
                onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                Price
              </label>
              <input
                type="number"
                id="price"
                className="mt-1 p-2 border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                placeholder="Enter price"
                value={newProduct.price}
                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                required
              />
            </div>

            <div className="mb-4">
              <label htmlFor="stockQuantity" className="block text-sm font-medium text-gray-700">
                Stock Quantity
              </label>
              <input
                type="number"
                id="stockQuantity"
                className="mt-1 p-2 border border-gray-300 focus:outline-none focus:border-blue-500 text-black"
                placeholder="Enter stock quantity"
                value={newProduct.stockQuantity}
                onChange={(e) => setNewProduct({ ...newProduct, stockQuantity: e.target.value })}
                required
              />
            </div>
          </div>

          <button
            type="button"
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={addProduct}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default Products;
