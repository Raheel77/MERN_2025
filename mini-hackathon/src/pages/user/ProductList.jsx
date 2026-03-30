import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  PlusIcon,
  PencilSquareIcon,
  TrashIcon,
  ShoppingCartIcon,
} from "@heroicons/react/24/outline";

export default function ProductList() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  // 1. Fetch Catalog on Load
  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const productList = [];
        querySnapshot.forEach((doc) => {
          productList.push({ id: doc.id, ...doc.data() });
        });
        setProducts(productList);
      } catch (error) {
        toast.error(error.message);
      }
    };
    fetchData();
  }, []);

  // 2. Order/Cart Logic
  const addToOrder = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item,
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    toast.info(`${product.productName} added to cart`);
  };

  // 3. Move to Order Screen
  const handleCheckout = () => {
    if (cart.length === 0) {
      toast.warning("Your cart is empty");
      return;
    }

    const totalAmount = cart.reduce(
      (acc, item) =>
        acc + Number(item.discountedPrice || item.price) * item.qty,
      0,
    );

    // Navigate to the Order Form screen and pass the cart data
    navigate("/place-order", {
      state: {
        orderItems: cart,
        total: totalAmount,
      },
    });
  };

  // 4. Catalog Management (Delete/Update)
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this item from catalog?")) return;
    try {
      await deleteDoc(doc(db, "products", id));
      setProducts(products.filter((item) => item.id !== id));
      toast.success("Product removed");
    } catch (error) {
      toast.error("Error deleting product");
    }
  };

  const handleUpdate = async (product) => {
    const newName = prompt("Product Name", product.productName);
    const newPrice = prompt("Regular Price", product.price);
    const newDiscount = prompt("Discounted Price", product.discountedPrice);

    if (!newName || !newPrice) return;

    try {
      const updatedObj = {
        productName: newName,
        price: newPrice,
        discountedPrice: newDiscount,
      };
      await updateDoc(doc(db, "products", product.id), updatedObj);
      setProducts(
        products.map((p) =>
          p.id === product.id ? { ...p, ...updatedObj } : p,
        ),
      );
      toast.success("Product updated");
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="space-y-6 p-4 pb-32">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-gray-800">Menu Catalog</h3>
          <p className="text-sm text-gray-500">
            Select items to place an order or manage the menu
          </p>
        </div>
        <button
          onClick={() => navigate("/add-product")}
          className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-black rounded-xl hover:bg-gray-800 transition-all shadow-sm"
        >
          <PlusIcon className="w-5 h-5" />
          Add Product
        </button>
      </div>

      {/* Product Card Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((item) => (
          <div
            key={item.id}
            className="group relative bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-xl transition-all duration-300 flex flex-col"
          >
            {/* Category & Quick Actions */}
            <div className="mb-3 flex justify-between items-start">
              <span className="bg-gray-100 text-gray-600 text-[10px] uppercase tracking-widest font-bold px-2.5 py-1 rounded-md">
                {item.category || "General"}
              </span>
              <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleUpdate(item)}
                  className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg"
                >
                  <PencilSquareIcon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleDelete(item.id)}
                  className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg"
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Product Info */}
            <div className="flex-1">
              <h4 className="text-lg font-bold text-gray-900 leading-tight">
                {item.productName}
              </h4>
              <div className="mt-2 flex items-baseline gap-2">
                <p className="text-xl font-black text-black">
                  ${item.discountedPrice || item.price}
                </p>
                {item.discountedPrice &&
                  item.discountedPrice !== item.price && (
                    <p className="text-xs text-gray-400 line-through">
                      ${item.price}
                    </p>
                  )}
              </div>
            </div>

            {/* Add to Order Button */}
            <button
              onClick={() => addToOrder(item)}
              className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2"
            >
              <PlusIcon className="w-4 h-4 stroke-[3px]" />
              Add to Order
            </button>
          </div>
        ))}
      </div>

      {/* Floating Checkout Bar */}
      {cart.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[95%] max-w-2xl bg-black text-white p-4 rounded-2xl shadow-2xl flex items-center justify-between z-50 animate-in fade-in slide-in-from-bottom-4">
          <div className="flex items-center gap-4">
            <div className="bg-orange-500 p-2.5 rounded-xl relative">
              <ShoppingCartIcon className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-white text-black text-[10px] font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-black">
                {cart.reduce((a, b) => a + b.qty, 0)}
              </span>
            </div>
            <div>
              <p className="text-sm font-bold">Review Order</p>
              <p className="text-xs text-gray-400">
                Total: $
                {cart
                  .reduce(
                    (a, b) => a + Number(b.discountedPrice || b.price) * b.qty,
                    0,
                  )
                  .toFixed(2)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCart([])}
              className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleCheckout}
              className="bg-white text-black px-6 py-2.5 rounded-xl font-bold hover:bg-gray-100 transition-all active:scale-95"
            >
              Checkout
            </button>
          </div>
        </div>
      )}

      {/* Empty State */}
      {products.length === 0 && (
        <div className="text-center py-20 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 font-medium">Your menu is empty.</p>
          <button
            onClick={() => navigate("/add-product")}
            className="mt-2 text-sm text-blue-600 font-bold hover:underline"
          >
            Add your first product
          </button>
        </div>
      )}
    </div>
  );
}
