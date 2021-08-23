import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HeaderStyles = styled.header`
  width: 100vw;
  top: 0;
  display: flex;
  justify-content: center;
  color: white;
  font-family: "Space Grotesk", sans-serif;
  font-size: clamp(1.5rem, 2.5vw, 3rem);
  min-height: 100px;
  nav {
    display: flex;
    justify-content: center;
    width: 100vw;
    padding: 1rem 0;
    background: orange;
    position: fixed;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  }

  ul {
    max-width: 600px;
    width: 100vw;
    display: flex;
    justify-content: space-evenly;
  }
  li {
    display: inline-block;
  }
  a {
    text-decoration: none;
    transition: color 0.3s;
    color: white;
  }
  a:visited {
    color: white;
  }
  a:hover {
    color: #ff00b3;
  }
`;

function Header() {
  return (
    <HeaderStyles>
      <nav>
        <ul>
          <li>
            <Link to="/">Posts</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            <Link to="/graph">Graph</Link>
          </li>
        </ul>
      </nav>
    </HeaderStyles>
  );
}

export default Header;
