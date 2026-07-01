import React, { useState } from 'react'
import {createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth, db} from "../firebase"
import { doc, setDoc } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErr("");
    
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];
    
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      let downloadURL = "https://cdn-icons-png.flaticon.com/512/149/149071.png"; // Default avatar

      if (file) {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET);

        const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`, {
          method: "POST",
          body: formData,
        });

        const dataResponse = await response.json();
        if (dataResponse.secure_url) {
          downloadURL = dataResponse.secure_url;
        }
      }

      await updateProfile(res.user, {
        displayName,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "users", res.user.uid), {
        uid: res.user.uid,
        displayName,
        email,
        photoURL: downloadURL,
      });

      await setDoc(doc(db, "userChats", res.user.uid), {});
      navigate("/");

    } catch (err) {
      console.error("Registration Error:", err.message);
      setErr(err.message || "Failed to create an account.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='formcontainer'>
      <div className='formwrap'>
        <form onSubmit={handleSubmit}>
          <div className='logo'>
            <img src='https://cdn-icons-png.flaticon.com/512/11527/11527872.png' alt='Logo' />
            <span className='tittle'>Register</span>
          </div>
          <input type='text' placeholder='Display Name' required />
          <input type='email' placeholder='Email' required />
          <input type='password' placeholder='Password' required />
          <input style={{ display: "none" }} type='file' id='file' accept="image/*" />
          <label htmlFor='file'>
            <img src="https://cdn-icons-png.flaticon.com/512/9171/9171530.png" alt='Upload Avatar' />
            <span> Add an avatar </span>
          </label>
          <button disabled={loading}>
            {loading ? "Creating account..." : "Sign up"}
          </button>
          {err && <span style={{ color: "#ff6b6b", fontSize: "14px", textAlign: "center" }}>{err}</span>}
          <p>Already have an account? <Link to={"/login"}>Login</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Register;