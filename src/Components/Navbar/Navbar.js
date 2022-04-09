import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

import "./Navbar.css";
import { useLocation } from "react-router-dom";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../../Firebase/Firebase.init";

const Navbar = () => {
  const { pathname } = useLocation();
  const [user, setUser]=useState({});
  console.log(user);
  

useEffect(() => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
  setUser(user)
    } else {
     setUser({});
    }
  });

},[]);
const handleLogout = () => {
  signOut(auth).then(() => {
    // Sign-out successful.
  }).catch((error) => {
    // An error happened.
  });

}


  return (
    <nav
      style={
        pathname.includes("blog") ? { display: "none" } : { display: "flex" }
      }
    >
      <div className='logo-container'>
       <h1 className=''> Trizone</h1>
      </div>
      <div className='link-container'>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "link")}
          to='/'
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "link")}
          to='/videos'
        >
          Videos
        </NavLink>

        {user?.uid?(
          <button className="logout-button" onClick={handleLogout}>Logout</button>
        ): (
        <NavLink
          className={({ isActive }) => (isActive ? "active-link" : "link")}
          to='/login'
        >
          Login
          </NavLink>
          )}


      </div>
    </nav>
  );
};

export default Navbar;
