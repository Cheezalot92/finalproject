import styled from "styled-components";

export const StyledNav = styled.nav`
  background-color: #f2f2f2;
  padding: 15px;
  text-align: center;

  a {
    color: #f6052d;
    text-decoration: none;
    padding: 10px;
    display: inline-block;

    &:hover {
      background-color: #ddd;
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