import React from "react";
import Style from "../Input/Input.module.css";

export default function Input({ name, type, label }) {
  return (
    <>
      <label>{label}</label>
      <input className={Style.inp} type={type} placeholder={name} />

    </>
  );
}
