import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { useNavigate } from "react-router";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const ordersList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setOrders(ordersList);
      } catch (error) {
        console.error("Firebase Error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  console.log(orders);

  if (loading) return <div className="p-10 text-center">Loading Orders...</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>

      {orders.length === 0 ? (
        <div className="p-10 border-2 border-dashed text-center text-gray-500">
          No orders found in database.
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="bg-white border rounded-xl p-4 shadow-sm"
            >
              <div className="flex justify-between items-start border-b pb-3 mb-3">
                <div>
                  <p className="text-sm font-bold text-orange-600">
                    Order #{order.id.slice(-5)}
                  </p>
                  <h3 className="font-bold text-lg">
                    {order.customerName || "Walk-in Customer"}
                  </h3>
                  <p className="text-xs text-gray-500">{order.contact}</p>
                </div>
                <div className="text-right">
                  {/* We check for both totalAmount and total to be safe */}
                  <p className="text-xl font-black text-black">
                    ${(order.totalAmount || order.total || 0).toFixed(2)}
                  </p>
                  <span className="text-[10px] bg-gray-100 px-2 py-1 rounded uppercase font-bold">
                    {order.status}
                  </span>
                </div>
              </div>

              {/* Displaying the Items */}
              <div className="space-y-1">
                {order.items &&
                  order.items.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between text-sm text-gray-600"
                    >
                      <span>
                        {item.qty}x {item.productName}
                      </span>
                      <span>
                        ${(Number(item.discountedPrice) * item.qty).toFixed(2)}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
