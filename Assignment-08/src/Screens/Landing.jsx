import React, { useState } from "react";
import Navi from "./Navi";
import { useSearchParams } from "react-router-dom";

export default function Landing() {
  let [query, func] = useSearchParams();
  let val = query.get("q");
  let [usersData, setUserData] = useState("");
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [pass, setPass] = useState("");

  const SubmitForm = () => {
    // formVal.map((e) => {
    //   return e;
    // });
    console.log(name, email, pass);
  };
  return (
    <div>
      <Navi />
      <h1>All Users {val}</h1>

      <input
        type="text"
        onChange={(e) => {
          setName(e.target.value);
        }}
        placeholder="Name"
      />

      <input
        type="email"
        placeholder="Email"
        onChange={(e) => {
          setEmail(e.target.value);
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
