import React from "react";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

function Navbar({ user }) {
  return (
    <nav className="navbar">
      <div className="logo">LifeLink</div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {user ? (
          <li><button className="logout-link" onClick={() => auth.signOut()}>Logout ({user.email.split('@')[0]})</button></li>
        ) : (
          <>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;