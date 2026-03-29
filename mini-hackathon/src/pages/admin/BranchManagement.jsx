import React, { useState } from "react";

export default function BranchManagement() {
    const [name, setName] = useState("");

    return (
        <div>
            <h3>Branches</h3>
            <input
                placeholder="Branch Name"
                onChange={(e) => setName(e.target.value)}
            />
            <button>Add Branch</button>
        </div>
    );
}