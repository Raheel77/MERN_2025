import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Review() {
  const [branches, setBranches] = useState([]);
  const [selectedBranch, setSelectedBranch] = useState(1);

  const [form, setForm] = useState({
    user: "",
    review: "",
  });

  // ✅ Fetch branches
  useEffect(() => {
    getBranches();
  }, []);

  const getBranches = async () => {
    try {
      const res = await axios.get("http://localhost:3000/branches");
      setBranches(res.data);
    } catch (error) {
      console.log("Branch Error:", error);
    }
  };

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit review
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.user || !form.review) {
      alert("Please fill all fields");
      return;
    }

    try {
      // ✅ Get selected branch
      const res = await axios.get(
        `http://localhost:3000/branches/${selectedBranch}`,
      );

      const branch = res.data;

      // ✅ Create new review
      const newReview = {
        id: Date.now(),
        user: form.user,
        review: form.review,
      };

      // ✅ Update reviews array
      const updatedReviews = [...(branch.reviews || []), newReview];

      // ✅ Update branch
      await axios.patch(`http://localhost:3000/branches/${selectedBranch}`, {
        reviews: updatedReviews,
      });

      alert("✅ Review Submitted!");

      // Reset form
      setForm({ user: "", review: "" });

      // Refresh branches (optional)
      getBranches();
    } catch (error) {
      console.log("Review Error:", error);
      alert("❌ Failed to submit review");
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 mt-6 border rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">⭐ Submit Review</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Select Branch */}
        <select
          value={selectedBranch}
          onChange={(e) => setSelectedBranch(e.target.value)}
          className="w-full border p-2 rounded"
        >
          {branches.map((b) => (
            <option key={b.id} value={b.id}>
              {b.name}
            </option>
          ))}
        </select>

        {/* User Name */}
        <input
          type="text"
          name="user"
          placeholder="Your Name"
          value={form.user}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Review */}
        <textarea
          name="review"
          placeholder="Write your review..."
          value={form.review}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        {/* Submit */}
        <button className="w-full bg-green-500 text-white py-2 rounded">
          Submit Review
        </button>
      </form>

      {/* 🔷 Show Existing Reviews */}
      <div className="mt-6">
        <h3 className="font-semibold mb-2">📢 Reviews</h3>

        {branches
          .find((b) => b.id == selectedBranch)
          ?.reviews?.map((r) => (
            <div key={r.id} className="border p-2 rounded mb-2">
              <p className="font-bold">{r.user}</p>
              <p>{r.review}</p>
            </div>
          ))}
      </div>
    </div>
  );
}
