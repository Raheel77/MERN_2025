import "./App.css";
import Input from "./components/Input";
import Button from "./components/Button";
import Radio from "./components/Radio";

function App() {
  return (
    <div className="signup-form">
      <h2>Create Account</h2>

      <Input type="text" name="John Doe" label="Full Name" />
      <Input type="email" name="example@email.com" label="Password" />
      <Input type="password" name="••••••••" label="Password" />
      <Radio name1="Male" name2="Female" name3="Other" label="Gender" />

      <div className="btn-group">
        <Button text="Submit" />
        <Button text="Cancle" />
      </div>

      <div class="footer-text">
        Already have an account?
        <a href="#">Login</a>
      </div>
    </div>
  );
}

export default App;
