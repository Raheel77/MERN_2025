import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import {
  BuildingOfficeIcon,
  MapPinIcon,
  TrashIcon,
  PlusIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";

export default function Branches() {
  const navigate = useNavigate();
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchBranches = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "branches"));
      const list = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBranches(list);
    } catch (error) {
      toast.error("Error loading branches");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Delete this branch?")) {
      try {
        await deleteDoc(doc(db, "branches", id));
        toast.success("Branch removed");
        setBranches(branches.filter((b) => b.id !== id));
      } catch (error) {
        toast.error("Delete failed");
      }
    }
  };

  const filtered = branches.filter((b) =>
    b.branchName?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-2xl font-black text-gray-800">Branch Network</h2>
          <p className="text-sm text-gray-500">
            Manage all active fast food outlets
          </p>
        </div>
        <button
          onClick={() => navigate("/add-branch")}
          className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-100"
        >
          <PlusIcon className="w-5 h-5" /> Add Branch
        </button>
      </div>

      <div className="relative mb-6">
        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search branches..."
          className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((branch) => (
          <div
            key={branch.id}
            className="bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-3 bg-blue-50 text-blue-600 rounded-xl">
                <BuildingOfficeIcon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-bold bg-gray-100 px-2 py-1 rounded text-gray-500 uppercase tracking-tighter">
                ID: {branch.branchId}
              </span>
            </div>
            <h3 className="text-lg font-bold text-gray-800 mb-1">
              {branch.branchName}
            </h3>
            <p className="text-sm text-gray-500 flex items-center gap-1 mb-6">
              <MapPinIcon className="w-4 h-4" /> {branch.location}
            </p>
            <div className="flex gap-2">
              <button className="flex-1 text-sm font-bold py-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                Edit Details
              </button>
              <button
                onClick={() => handleDelete(branch.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
              >
                <TrashIcon className="w-5 h-5" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
