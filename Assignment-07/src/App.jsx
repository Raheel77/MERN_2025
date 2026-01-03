import "./App.css";
import Input from "./components/Input";
import Button from "./components/Button";
import Radio from "./components/Radio";
import {useState} from "react";

function App() {
    let [signUp, setSignUp] = useState(false);
    return (
        <div className="signup-form">
            <h2>{signUp ? "Create Account" : "Login"}</h2>
            {signUp ? (
                <>
                    <Input type="text" name="John Doe" label="Full Name"/>
                    <Input type="email" name="example@email.com" label="Password"/>
                    <Input type="password" name="••••••••" label="Password"/>
                    <Radio name1="Male" name2="Female" name3="Other" label="Gender"/>
                </>
            ) : (
                <>
                    <Input type="email" name="example@email.com" label="Password"/>
                    <Input type="password" name="••••••••" label="Password"/>
                </>
            )}

            <div className="btn-group">
                <Button text={signUp ? "Sign Up" : "Login"}/>
            </div>
            <div className="footer-text">
                {signUp
                    ? "Already have an account?"
                    : "Don't have an account?"}
                <a href="#" style={{marginLeft: "5px"}} onClick={()=>{
                    setSignUp(!signUp)
                }}>{signUp ? "Login" : "Sign Up"}</a>
            </div>
        </div>
    );
}

export default App;
