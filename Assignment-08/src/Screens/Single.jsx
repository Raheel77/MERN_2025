import React from "react";
import Navi from "./Navi";

import { useParams } from "react-router-dom";

export default function Single() {
  // let param = useParams(); //{id:faraz}
  let { id } = useParams();

  return (
    <div>
      <Navi />
      <h1>Single {id}</h1>
    </div>
  );
}
