import React from "react";

export default function Input({ name, type, label }) {
  return (
    <>
      <label>{label}</label>
      <input type={type} placeholder={name} />
    </>
  );
}
