import React, { useState } from "react";
import Navi from "./Navi";
import { useSearchParams } from "react-router-dom";
import Input from "../components/Input/Input";
import { Table } from "react-bootstrap";
export default function Signin() {
  let [usersData, setUserData] = useState({ name: "", email: "", pass: "" });
  let [getherData, setGetherData] = useState([]);
  const SubmitForm = () => {
    setGetherData([...getherData, usersData]);
  };
  console.log("getherData", getherData);
  // console.log("usersData", usersData);

  return (
    <>
      <Navi />
      <div
        style={{
          width: 500,
          margin: "100px auto",
          padding: 40,
          background: "rebeccapurple",
          borderRadius: "10px",
        }}
      >
        <h2 style={{ color: "#fff" }}>Signin Form</h2>
        <Input
          label="Email"
          ONChange={(e) => {
            setUserData({ ...usersData, email: e.target.value });
          }}
          type="email"
        />
        <Input
          label="Password"
          ONChange={(e) => {
            setUserData({ ...usersData, pass: e.target.value });
          }}
          type="password"
        />
        <br />
        <br />
        <input
          type="submit"
          className="btn btn-light"
          value="Submit"
          onClick={SubmitForm}
        />
        <br />
        <br />
        {getherData.length > 0 && (
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Username</th>
              </tr>
            </thead>
            <tbody>
              {getherData.map((e, i) => (
                <tr key={i}>
                  <td>{i + 1}</td>
                  <td>{e.name}</td>
                  <td>{e.email}</td>
                  <td>{e.pass}</td>
                </tr>
              ))}{" "}
            </tbody>
          </Table>
        )}
      </div>
    </>
  );
}
