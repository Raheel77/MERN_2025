import { Route, Routes } from "react-router-dom";
import Home from "./Screens/Home";
import About from "./Screens/About";
import Landing from "./Screens/Landing";
import Single from "./Screens/Single";
import SignupForm from "./Screens/SignupForm";
import SignupForm_object from "./Screens/SignupForm_object";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route
        path="/element"
        element={
          <>
            <h1>Element</h1>
          </>
        }
      />
      <Route path="/about" element={<about />} />
      <Route path="/users" element={<Landing />} />
      <Route path="/users:id" element={<Single />} />
      <Route path="/singup" element={<SignupForm />} />
      <Route path="/singup2" element={<SignupForm_object />} />
    </Routes>
  );
}

export default App;
