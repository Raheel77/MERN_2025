import React, { useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import { ListBulletIcon } from "@heroicons/react/16/solid";
import Input from "../../components/partial/Input";

export default function AddProduct() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    productCode: "",
    productName: "",
    category: "",
    price: "",
    discountedPrice: "",
  });

  const savedata = async () => {
    try {
      const generateId =
        "MENU-" + Math.random().toString(36).substr(2, 7).toUpperCase();
      const finalData = { ...formData, productCode: generateId };

      await setDoc(doc(db, "products", generateId), finalData);

      console.log("Catalog entry saved:", finalData);
      toast.success("Product added to catalog");
      // navigate("/catalog");
    } catch (error) {
      console.error("Error:", error);
      toast.error("Failed to save: " + error.message);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03]">
        <div className="px-5 py-4 sm:px-6 sm:py-5 flex items-center justify-between">
          <h3 className="text-base font-medium text-gray-800">
            Product Catalog Manager
          </h3>
          <button
            onClick={() => navigate("/products")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-black rounded-lg hover:bg-gray-800 transition"
          >
            <ListBulletIcon className="w-4 h-4" />
            View Catalog
          </button>
        </div>

        <div className="space-y-6 border-t border-gray-100 p-5">
          <div className="grid grid-cols-12 gap-4">
            {/* 1. Product Name */}
            <div className="col-span-12 md:col-span-8">
              <Input
                label="Product Name"
                placeholder="e.g. Double Beef Burger"
                OnChange={(e) =>
                  setFormData({ ...formData, productName: e.target.value })
                }
                type="text"
              />
            </div>

            {/* Category */}
            <div className="col-span-12 md:col-span-4">
              <Input
                label="Category"
                placeholder="e.g. Mains, Beverages"
                OnChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                type="text"
              />
            </div>

            {/* 2. Price */}
            <div className="col-span-12 md:col-span-6">
              <Input
                label="Standard Price"
                placeholder="0.00"
                OnChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                type="number"
              />
            </div>

            {/* 3. Discounted Price */}
            <div className="col-span-12 md:col-span-6">
              <Input
                label="Discounted Price"
                placeholder="0.00"
                OnChange={(e) =>
                  setFormData({ ...formData, discountedPrice: e.target.value })
                }
                type="number"
              />
            </div>

            {/* Action Button */}
            <div className="col-span-12 md:col-start-9 md:col-span-4">
              <button
                onClick={savedata}
                className="flex items-center justify-center w-full px-4 py-3 text-sm font-medium text-white transition rounded-lg bg-black hover:bg-gray-900 mt-6"
              >
                Save to Catalog
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
