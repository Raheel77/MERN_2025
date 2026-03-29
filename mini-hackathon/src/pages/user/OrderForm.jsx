import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const OrderForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // ✅ Get selected product from Product Page
  const selectedProduct = location.state || {};

  const [form, setForm] = useState({
    name: "",
    contact: "",
    email: "",
    product: selectedProduct.name || "",
    quantity: 1,
    branchId: 1, // default branch
    userId: "user123", // later replace with Firebase user
  });

  const [loading, setLoading] = useState(false);

  // ✅ Handle Input Change
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ✅ Submit Order
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!form.name || !form.contact || !form.email) {
      alert("Please fill all fields");
      return;
    }

    if (form.quantity < 1) {
      alert("Quantity must be at least 1");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:3000/orders", form);

      alert("✅ Order Placed Successfully!");

      // Reset form
      setForm({
        name: "",
        contact: "",
        email: "",
        product: selectedProduct.name || "",
        quantity: 1,
        branchId: 1,
        userId: "user123",
      });

      navigate("/products");
    } catch (error) {
      console.log(error);
      alert("❌ Failed to place order");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Optional Total Price
  const total =
    selectedProduct.price && form.quantity
      ? selectedProduct.price * form.quantity
      : 0;

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 border rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-5 text-center">
        🛒 Place Your Order
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          name="name"
          placeholder="Enter Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Contact */}
        <input
          type="text"
          name="contact"
          placeholder="Enter Contact"
          value={form.contact}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Enter Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Product (Read Only) */}
        <input
          type="text"
          name="product"
          value={form.product}
          readOnly
          className="w-full border p-2 rounded bg-gray-100"
        />

        {/* Quantity */}
        <input
          type="number"
          name="quantity"
          value={form.quantity}
          onChange={handleChange}
          min="1"
          className="w-full border p-2 rounded"
        />

        {/* Branch Selection */}
        <select
          name="branchId"
          value={form.branchId}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="1">Lahore Branch</option>
        </select>

        {/* Total Price */}
        {total > 0 && (
          <p className="text-lg font-semibold">Total: Rs. {total}</p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Placing Order..." : "Place Order"}
        </button>
      </form>
    </div>
  );
};

export default OrderForm;
