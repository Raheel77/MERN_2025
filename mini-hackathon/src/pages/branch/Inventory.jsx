import React, { useState } from "react";

export default function Inventory() {
    const [qty, setQty] = useState("");

    return (
        <div>
            <h3>Update Inventory</h3>
            <input
                placeholder="Chicken Qty"
                onChange={(e) => setQty(e.target.value)}
            />
            <button>Update</button>
        </div>
    );
}