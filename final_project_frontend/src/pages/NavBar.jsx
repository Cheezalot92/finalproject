import React from "react";
import { Link } from "react-router-dom";
import {} from "react-router-dom";

const NavBar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {/* pathName === "UserProfile" ?  :null */}
        <li>
          <Link to="/register">Register Here</Link>
        </li>
        <li>
          <Link to="/UserProfile">Profile</Link>
        </li>
        <li>
          <Link to="/WelcomePage">Welcome</Link>
        </li>
        <li>
          <Link to="/Logout">Logout</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
