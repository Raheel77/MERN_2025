import React, { useState, useEffect } from "react";
import { db } from "../../config/firebase";
import {
  collection,
  getDocs,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux"; // Added Redux
import { toast } from "react-toastify";
import { StarIcon, ChatBubbleLeftRightIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarOutline } from "@heroicons/react/24/outline";

export default function SubmitReview() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user); // Get user from Redux
  const [branches, setBranches] = useState([]);
  const [loading, setLoading] = useState(false);

  const [reviewData, setReviewData] = useState({
    branchId: "",
    branchName: "",
    rating: 5,
    comment: "",
    customerName: user?.displayName || user?.email || "Anonymous", // Auto-fill
  });

  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "branches"));
        const list = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBranches(list);
      } catch (error) {
        toast.error("Could not load branches");
      }
    };
    fetchBranches();
  }, []);

  const handleRating = (val) => setReviewData({ ...reviewData, rating: val });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!reviewData.branchId) return toast.warning("Please select a branch");

    setLoading(true);
    try {
      await addDoc(collection(db, "reviews"), {
        ...reviewData,
        customerUid: user?.uid || "guest",
        createdAt: serverTimestamp(),
      });
      toast.success("Thank you for your feedback!");
      navigate("/");
    } catch (error) {
      toast.error("Submission failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="bg-yellow-400 p-8 text-center">
          <ChatBubbleLeftRightIcon className="w-12 h-12 mx-auto text-yellow-900 mb-2" />
          <h2 className="text-2xl font-black text-yellow-900">
            Rate Your Experience
          </h2>
          <p className="text-sm text-yellow-800 opacity-80">
            Feedback for:{" "}
            <span className="font-bold underline">
              {reviewData.branchName || "Select Branch"}
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Select Branch
            </label>
            <select
              required
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-yellow-400 outline-none"
              onChange={(e) => {
                const branch = branches.find((b) => b.id === e.target.value);
                setReviewData({
                  ...reviewData,
                  branchId: e.target.value,
                  branchName: branch?.branchName,
                });
              }}
            >
              <option value="">Choose an outlet...</option>
              {branches.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.branchName}
                </option>
              ))}
            </select>
          </div>

          <div className="text-center">
            <label className="block text-sm font-bold text-gray-700 mb-3">
              Your Rating
            </label>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((num) => (
                <button
                  key={num}
                  type="button"
                  onClick={() => handleRating(num)}
                  className="transform transition active:scale-90"
                >
                  {num <= reviewData.rating ? (
                    <StarIcon className="w-10 h-10 text-yellow-500" />
                  ) : (
                    <StarOutline className="w-10 h-10 text-gray-300" />
                  )}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              required
              rows="4"
              placeholder="Tell us about the food and service..."
              className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:ring-2 focus:ring-yellow-400 outline-none"
              onChange={(e) =>
                setReviewData({ ...reviewData, comment: e.target.value })
              }
            />
          </div>

          <button
            disabled={loading}
            className="w-full py-4 bg-black text-white rounded-2xl font-bold hover:bg-gray-800 transition shadow-lg disabled:opacity-50"
          >
            {loading ? "Sending..." : "Submit Review"}
          </button>
        </form>
      </div>
    </div>
  );
}
