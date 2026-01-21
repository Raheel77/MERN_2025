import React, { useState } from "react";
import Navi from "./Navi";
import { useSearchParams } from "react-router-dom";
export default function SignupForm_object() {
  let [usersData, setUserData] = useState({ name: "", email: "", pass: "" });
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [pass, setPass] = useState("");
  console.log(usersData);
  const SubmitForm = () => {
    // formVal.map((e) => {
    //   return e;
    // });
    console.log(name, email, pass);
  };
  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setUserData({ name: e.target.value });
        }}
        placeholder="Name"
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setUserData({ name: e.target.value });
        }}
      />
      <input
        type="text"
        placeholder="Password"
        onChange={(e) => {
          setPass(e.target.value);
        }}
      />

      <input type="submit" value="Submit" onClick={SubmitForm} />
    </div>
  );
}
