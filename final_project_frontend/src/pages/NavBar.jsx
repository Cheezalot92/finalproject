import React from "react";
import { Link } from "react-router-dom";
// import { StyledNav } from "../components/NavBarCss";
import styled from "styled-components";

const StyledNav = styled.nav`
  background-color: #f48c06;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ul {
    list-style-type: none;
    display: flex;
    width: 100%;
    justify-content: space-between;
  }

  li {
    &:hover {
      background-color: #ff0000;
    }
  }

  a {
    float: left;
    width: 20%;
    text-align: center;
    color: #f5f5f5;
    text-decoration: none;
    padding: 15px;
    display: block;

    &:hover {
      /* color: black; */
    }
  }

  @media (max-width: 768px) {
    padding: 10px;
    float: none;
    display: block;
    width: 100%;

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
