import { Route, Routes } from "react-router-dom";
import Signup from "./Screens/Signup";
import "bootstrap/dist/css/bootstrap.min.css";
import Todo_list from "./Screens/Todo_list/Todo_list";
import Home from "./screens/Home";
import Signin from "./Screens/Signin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Todo_list />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
    </Routes>
  );
}

export default App;
