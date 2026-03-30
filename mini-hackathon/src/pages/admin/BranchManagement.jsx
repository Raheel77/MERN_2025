import React, { useState } from "react";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";
import {
  BuildingOffice2Icon,
  ArrowLeftIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";
import Input from "../../components/partial/Input";

export default function AddBranch() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    branchName: "",
    location: "",
    managerEmail: "",
    managerPassword: "",
    contactNumber: "",
  });

  const handleSaveBranch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Generate a Unique Branch ID (e.g., BR-7215)
      const branchId = "BR-" + Math.floor(1000 + Math.random() * 9000);

      const branchData = {
        ...formData,
        branchId: branchId,
        role: "branch manager", // Automated role assignment
        status: "active",
        createdAt: serverTimestamp(),
      };

      // Save to "branches" collection using the Branch ID as the Document ID
      await setDoc(doc(db, "branches", branchId), branchData);

      toast.success(`Branch ${branchName} registered successfully!`);
      navigate("/branches"); // Go back to the list view
    } catch (error) {
      console.error("Error saving branch:", error);
      toast.error("Failed to register branch: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8">
      <div className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header Section */}
        <div className="bg-blue-600 p-6 flex justify-between items-center text-white">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg">
              <BuildingOffice2Icon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold">Register New Branch</h2>
              <p className="text-xs text-blue-100">
                Setup credentials for a new outlet
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <ArrowLeftIcon className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSaveBranch} className="p-8 space-y-8">
          {/* General Information */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <BuildingOffice2Icon className="w-4 h-4" />
              General Information
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Branch Name"
                placeholder="e.g. North Nazimabad Branch"
                required
                OnChange={(e) =>
                  setFormData({ ...formData, branchName: e.target.value })
                }
              />
              <Input
                label="Location / Address"
                placeholder="e.g. Block H, Near KDA"
                required
                OnChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
              />
              <Input
                label="Branch Contact Number"
                placeholder="021-xxxxxxxx"
                type="tel"
                OnChange={(e) =>
                  setFormData({ ...formData, contactNumber: e.target.value })
                }
              />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Security & Access */}
          <div className="space-y-4">
            <h4 className="text-sm font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <ShieldCheckIcon className="w-4 h-4" />
              Manager Credentials
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input
                label="Manager Email (Login ID)"
                type="email"
                placeholder="branch@fastfood.com"
                required
                OnChange={(e) =>
                  setFormData({ ...formData, managerEmail: e.target.value })
                }
              />
              <Input
                label="Manager Password"
                type="password"
                placeholder="Minimum 6 characters"
                required
                OnChange={(e) =>
                  setFormData({ ...formData, managerPassword: e.target.value })
                }
              />
            </div>
            <p className="text-[11px] text-gray-500 bg-gray-50 p-3 rounded-lg border border-gray-100">
              <strong>Note:</strong> These credentials will allow the Branch
              Manager to log in and manage their specific inventory and staff.
            </p>
          </div>

          {/* Submit Action */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={loading}
              className="w-full md:w-auto bg-blue-600 text-white px-10 py-4 rounded-2xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 disabled:opacity-50"
            >
              {loading ? "Registering..." : "Finalize & Register Branch"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
