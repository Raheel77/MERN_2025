import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import Input from "../../components/partial/Input";
import { ShoppingBagIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function PlaceOrder() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Consolidated state to handle both customer and product info
  const [orderForm, setOrderForm] = useState({
    customerName: "",
    contact: "",
    email: "",
    productId: "",
    productName: "",
    quantity: 1,
    unitPrice: 0,
  });

  // Fetch products for the dropdown
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const list = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProducts(list);
      } catch (error) {
        toast.error("Failed to load products");
      }
    };
    fetchProducts();
  }, []);

  // Handle product selection to auto-fill price
  const handleProductChange = (e) => {
    const selectedProd = products.find((p) => p.id === e.target.value);
    if (selectedProd) {
      setOrderForm({
        ...orderForm,
        productId: selectedProd.id,
        productName: selectedProd.productName,
        unitPrice: Number(selectedProd.discountedPrice || selectedProd.price),
      });
    }
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();

    if (!orderForm.productId) {
      return toast.warning("Please select a product from the menu");
    }

    setLoading(true);
    try {
      const calculatedTotal = orderForm.unitPrice * orderForm.quantity;

      // Formatting data so it matches the Orders page expectations
      const orderData = {
        customerName: orderForm.customerName,
        contact: orderForm.contact,
        email: orderForm.email,
        // We put the single item in an array so the Orders page .map() works
        items: [
          {
            productId: orderForm.productId,
            productName: orderForm.productName,
            qty: Number(orderForm.quantity),
            discountedPrice: orderForm.unitPrice,
          },
        ],
        totalAmount: calculatedTotal,
        status: "pending",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), orderData);
      toast.success("Order Placed Successfully!");
      navigate("/orders");
    } catch (err) {
      console.error("Order Error:", err);
      toast.error("Failed to save order: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header */}
        <div className="bg-black p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <ShoppingBagIcon className="w-8 h-8 text-orange-500" />
            <div>
              <h2 className="text-xl font-bold">Place New Order</h2>
              <p className="text-xs text-gray-400">Direct Entry Checkout</p>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-gray-800 rounded-full transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmitOrder} className="p-6 space-y-6">
          {/* Customer Info Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Customer Name"
              placeholder="Full Name"
              required
              OnChange={(e) =>
                setOrderForm({ ...orderForm, customerName: e.target.value })
              }
            />
            <Input
              label="Contact Number"
              placeholder="03xx-xxxxxxx"
              required
              OnChange={(e) =>
                setOrderForm({ ...orderForm, contact: e.target.value })
              }
            />
            <div className="md:col-span-2">
              <Input
                label="Email Address"
                type="email"
                placeholder="customer@example.com"
                required
                OnChange={(e) =>
                  setOrderForm({ ...orderForm, email: e.target.value })
                }
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Product Selection Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Product
              </label>
              <select
                onChange={handleProductChange}
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none"
                required
              >
                <option value="">Choose an item...</option>
                {products.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.productName} — ${p.discountedPrice || p.price}
                  </option>
                ))}
              </select>
            </div>

            <Input
              label="Quantity"
              type="number"
              min="1"
              value={orderForm.quantity}
              OnChange={(e) =>
                setOrderForm({ ...orderForm, quantity: e.target.value })
              }
            />
          </div>

          {/* Order Summary Display */}
          <div className="bg-orange-50 p-4 rounded-2xl flex justify-between items-center">
            <div>
              <p className="text-xs text-orange-600 font-bold uppercase tracking-wider">
                Total Amount
              </p>
              <h3 className="text-2xl font-black text-orange-700">
                ${(orderForm.unitPrice * orderForm.quantity).toFixed(2)}
              </h3>
            </div>
            <button
              disabled={loading}
              type="submit"
              className="bg-black text-white px-8 py-3 rounded-xl font-bold hover:bg-gray-800 transition-all disabled:opacity-50"
            >
              {loading ? "Processing..." : "Confirm Order"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
