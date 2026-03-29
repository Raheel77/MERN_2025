import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [discount, setDiscount] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    getProducts();
    getOffers();
  }, []);

  // ✅ Fetch Products
  const getProducts = async () => {
    try {
      const res = await axios.get("http://localhost:3000/products");
      setProducts(res.data);
    } catch (error) {
      console.log("Product Error:", error);
    }
  };
  console.log(products);
  // ✅ Fetch Discount
  const getOffers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/offers");
      if (res.data.length > 0) {
        setDiscount(res.data[0].discount);
      }
    } catch (error) {
      console.log("Offer Error:", error);
    }
  };

  // ✅ Price Calculation
  const getFinalPrice = (price) => {
    return price - (price * discount) / 100;
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-5">🍔 Product Catalog</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="border p-4 rounded-xl shadow hover:shadow-lg"
          >
            <h3 className="text-lg font-semibold">{item.name}</h3>

            {/* Original Price */}
            <p className="text-gray-400 line-through">Rs. {item.price}</p>

            {/* Discount */}
            <p className="text-green-600">{discount}% OFF</p>

            {/* Final Price */}
            <p className="text-xl font-bold text-blue-600">
              Rs. {getFinalPrice(item.price)}
            </p>

            <button
              onClick={() => navigate("/order", { state: item })}
              className="mt-3 w-full bg-blue-500 text-white py-2 rounded"
            >
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
