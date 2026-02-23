import React, { useState } from "react";
import { Link } from "react-router-dom";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

function Home({ user }) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    bloodGroup: "",
    organ: "",
    diseases: "",
    age: "",
    phone: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "donor_forms"), {
        uid: user.uid,
        ...formData,
        email: user.email,
        timestamp: new Date()
      });
      setSubmitted(true);
    } catch (err) {
      alert("Error saving form: " + err.message);
    }
  };

  // 1. LANDING PAGE FOR LOGGED OUT USERS
  if (!user) {
    return (
      <div className="page-wrapper">
        <div className="split-layout">
          <div className="form-card">
            <h1 style={{ fontSize: '48px', lineHeight: '1.1', margin: '0 0 20px 0' }}>
              Every Second <br />
              <span style={{ color: '#d90429' }}>Counts.</span>
            </h1>
            <p style={{ color: '#666', marginBottom: '40px', fontSize: '18px', lineHeight: '1.6' }}>
              Join thousands of donors who have chosen to give the gift of life. 
              Your registration can save up to 8 lives and heal over 75 more.
            </p>
            <div className="hero-buttons" style={{ display: 'flex', gap: '20px' }}>
              <Link to="/login" style={{ flex: 1 }}>
                <button className="primary-btn full-width">Sign In</button>
              </Link>
              <Link to="/register" style={{ flex: 1 }}>
                <button className="secondary-btn full-width" style={{ padding: '16px' }}>
                  Sign Up
                </button>
              </Link>
            </div>
          </div>
          <div className="side-quote-box">
            <p>“The measure of life is not its duration, but its donation.”</p>
          </div>
        </div>
      </div>
    );
  }

  // 2. MEDICAL FORM FOR LOGGED IN USERS
  return (
    <div className="page-wrapper">
      {submitted ? (
        <div className="split-layout">
          <div className="form-card text-center" style={{ textAlign: 'center' }}>
            <h2 style={{ fontSize: '40px' }}>🎉 Hero Registered!</h2>
            <p style={{ fontSize: '18px', color: '#555' }}>
              Your medical details have been securely stored. Thank you for your bravery and kindness.
            </p>
            <button className="primary-btn" style={{marginTop: '20px'}} onClick={() => setSubmitted(false)}>
              Update Details
            </button>
          </div>
          <div className="side-quote-box">
            <p>“Someone is alive today because of a donor like you.”</p>
          </div>
        </div>
      ) : (
        <div className="split-layout">
          <form className="form-card" onSubmit={handleSubmit}>
            <h2>Medical Donor Form</h2>
            <p style={{marginBottom: '20px', color: '#666'}}>Please provide accurate medical details for our registry.</p>
            
            <label>Blood Group</label>
            <input 
              type="text" 
              placeholder="e.g. O+, B-, AB+" 
              required 
              onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })} 
            />
            
            <label>Organs you are willing to donate</label>
            <input 
              type="text" 
              placeholder="e.g. Kidney, Liver, Eyes" 
              required 
              onChange={(e) => setFormData({ ...formData, organ: e.target.value })} 
            />

            <label>Any Chronic Diseases? (If none, type 'None')</label>
            <input 
              type="text" 
              placeholder="Diabetes, Hypertension, etc." 
              required 
              onChange={(e) => setFormData({ ...formData, diseases: e.target.value })} 
            />

            <div style={{ display: 'flex', gap: '20px' }}>
              <div style={{ flex: 1 }}>
                <label>Age</label>
                <input 
                  type="number" 
                  placeholder="18+" 
                  required 
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })} 
                />
              </div>
              <div style={{ flex: 1 }}>
                <label>Phone Number</label>
                <input 
                  type="tel" 
                  placeholder="Contact Number" 
                  required 
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })} 
                />
              </div>
            </div>

            <button type="submit" className="primary-btn full-width" style={{ marginTop: '10px' }}>
              Submit Donor Details
            </button>
          </form>
          <div className="side-quote-box">
            <p>“Your blood is replaceable. A life is not.”</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;