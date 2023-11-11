import React from "react";
import { Link } from "react-router-dom";
import { StyledNav } from "../components/NavBarCss";
import styled from "styled-components";



  const StyledNav = styled.nav`
  background-color: #060606;
  padding: 15px;
  text-align: center;

  a {
    color: #f5f5f5;
    text-decoration: none;
    padding: 10px;
    display: inline-block;

    &:hover {
      background-color: #f70404;
      color: #121111;
    }
  }

  @media (max-width: 768px) {
    padding: 5px;

    a {
      padding: 5px;
    }
  }
`;

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
