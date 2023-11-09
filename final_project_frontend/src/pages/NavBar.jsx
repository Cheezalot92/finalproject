import React from "react";
import { Link } from "react-router-dom";
import { StyledNav } from "../components/NavBarCss";

const NavBar = () => {
  return (
    <StyledNav>
      <nav>
        <ul>
          <li>
            <Link to="/WelcomePage">Home</Link>
          </li>
          <li>
            <Link to="/register">Register Here</Link>
          </li>
          <li>
            <Link to="/UserProfile">Profile</Link>
          </li>
                  <li>
                    <Link to="/ShowList">Anime</Link>
            </li>
          <li>
            <Link to="/Logout">Logout</Link>
          </li>
        </ul>
      </nav>
    </StyledNav>
  );
};

export default NavBar;
