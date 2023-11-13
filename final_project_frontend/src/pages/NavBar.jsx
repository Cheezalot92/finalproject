import React from "react";
import { Link } from "react-router-dom";
// import { StyledNav } from "../components/NavBarCss";
import styled from "styled-components";



const StyledNav = styled.nav`
  width: 100% !important;
  list-style: none;
  background-color: #0c0c0c;
  padding: 15px;
  text-align: center;
  margin: none;
  box-sizing: border-box;
  

  a {
    width: 100%;
    color: #f5f5f5;
    text-decoration: underline;
    padding: 10px;
    display: inline-block;

    &:hover {
      background-color: #898989;
      color: #ffffff;
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
