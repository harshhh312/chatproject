import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className="Navbar">
      <div className="logo">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.04 2 11C2 13.93 3.67 16.53 6.25 18.06L5.5 21.5L9.5 19.25C10.29 19.44 11.12 19.5 12 19.5C17.52 19.5 22 15.46 22 11C22 6.04 17.52 2 12 2Z" fill="#6366f1"/>
          <circle cx="8" cy="10" r="1.5" fill="white"/>
          <circle cx="12" cy="10" r="1.5" fill="white"/>
          <circle cx="16" cy="10" r="1.5" fill="white"/>
        </svg>
        <span>ChatBox</span>
      </div>
      <div className="user">
        <img src={currentUser?.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} alt="avatar" />
        <span>{currentUser?.displayName}</span>
        <button onClick={() => signOut(auth)}>LogOut</button>
      </div>
    </div>
  );
};

export default Navbar;