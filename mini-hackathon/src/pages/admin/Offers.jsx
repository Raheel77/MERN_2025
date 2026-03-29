import React, { useState } from "react";

export default function Offers() {
    const [discount, setDiscount] = useState("");

    return (
        <div>
            <h3>Offers</h3>
            <input
                placeholder="Discount %"
                onChange={(e) => setDiscount(e.target.value)}
            />
            <button>Add Offer</button>
        </div>
    );
}