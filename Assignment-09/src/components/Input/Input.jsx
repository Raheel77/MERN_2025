import React from "react";
import Style from "../Input/Input.module.css";

export default function Input({ type, label, ONChange }) {
  return (
    <>
      <input
        id="todo-input"
        onChange={ONChange}
        className={Style.inp}
        type={type}
        placeholder={label}
      />
    </>
  );
}
