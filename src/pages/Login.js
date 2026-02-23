import React, { useState } from "react"; // Ensure there is NO backslash here
import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) { 
      alert(err.message); 
    }
  };

  return (
    <div className="page-wrapper">
      <div className="split-layout">
        <form className="form-card" onSubmit={handleLogin}>
          <h2>Welcome Back</h2>
          <input 
            type="email" 
            placeholder="Email" 
            onChange={(e) => setEmail(e.target.value)} 
            required 
          />
          <input 
            type="password" 
            placeholder="Password" 
            onChange={(e) => setPassword(e.target.value)} 
            required 
          />
          <button type="submit" className="primary-btn full-width">Sign In</button>
        </form>
        <div className="side-quote-box">
          <p>“Life is a gift. Pass it on.”</p>
        </div>
      </div>
    </div>
  );
}

export default Login;