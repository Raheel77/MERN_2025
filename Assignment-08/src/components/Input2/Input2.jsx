import React from "react";
import Style from "../Input2/Input2.module.css";

export default function Input2({ name, type, label }) {
  return (
    <>
      <label>{label}</label>
      <input className={Style.inp} type={type} placeholder={name} />
    </>
  );
}
