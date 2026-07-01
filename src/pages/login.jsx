import { signInWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { auth } from "../firebase";

const Login = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    
    const email = e.target[0].value;
    const password = e.target[1].value;
    
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErr(error.message || "Failed to log in.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='formcontainer'>
      <div className='formwrap'>
        <form onSubmit={handleSubmit}>
          <div className='logo'>
            <img src='https://cdn-icons-png.flaticon.com/512/11527/11527872.png' alt="Logo" />
            <span className='tittle'>Login</span>
          </div>
          <input type='email' placeholder='Email' required />
          <input type='password' placeholder='Password' required />
          <button disabled={loading}>
            {loading ? "Logging in..." : "Sign in"}
          </button>
          {err && <span style={{ color: "#ff6b6b", fontSize: "14px", textAlign: "center" }}>{err}</span>}
          <p>Don't have an account? <Link to={"/register"}>Register</Link></p>
        </form>
      </div>
    </div>
  );
};

export default Login;