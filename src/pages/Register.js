import React, { useState } from "react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) { alert(err.message); }
  };

  return (
    <div className="page-wrapper">
      <div className="split-layout">
        <form className="form-card" onSubmit={handleRegister}>
          <h2>Join Us</h2>
          <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} required />
          <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit" className="primary-btn full-width">Create Account</button>
        </form>
        <div className="side-quote-box">
          <p>“To the world you may be one person, but to one person you may be the world.”</p>
        </div>
      </div>
    </div>
  );
}

export default Register;