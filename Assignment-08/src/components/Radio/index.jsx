import React from "react";

export default function Radio({ name1, name2, name3, label }) {
  return (
    <>
      <label>{label}</label>
      <div className="gender">
        <label>
          <input type="radio" name={label} /> {name1}
        </label>
        <label>
          <input type="radio" name={label} /> {name2}
        </label>
        <label>
          <input type="radio" name={label} /> {name3}
        </label>
      </div>
    </>
  );
}
