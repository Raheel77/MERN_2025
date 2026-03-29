import React, { useState } from "react";

export default function ProductManagement() {
    const [product, setProduct] = useState("");
    const [price, setPrice] = useState("");

    return (
        <div>
            <h3>Products</h3>
            <input
                placeholder="Product"
                onChange={(e) => setProduct(e.target.value)}
            />
            <input
                placeholder="Price"
                onChange={(e) => setPrice(e.target.value)}
            />
            <button>Add</button>
        </div>
    );
}