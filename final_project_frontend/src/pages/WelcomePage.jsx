import React from "react";
import NavBar from "./NavBar";
import styled from "styled-components";
import { Link } from "react-router-dom";

const StyleWelcome = styled.div`
  .container {
    width: 100%;
    margin: auto;
    margin-top: 20px;
    text-align: center;
  }

  h1 {
    margin-top: 150px;
    outline: 5px outset white;
    outline-color: #ffba08;
    background-color: #00000024;
    color: #ffba08;
    font-size: 40px;
    padding: 10px;
  }

  p {
    color: #ffba08;
    font-size: 18px;
    margin-bottom: 40px;
  }

  .boxes {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .box {
    background-color: #222(0, 0, 0, 0.124);
    width: 270px;
    height: 290px;
    margin: 20px;
    text-align: center;
    border: 1px solid #ffba08;
    border-radius: 10px;
    padding: 20px;
  }

  .box img {
    width: 220px;
    height: 120px;
    margin: 0 auto;
    display: block;
  }

  h2 {
    font-size: 20px;
    margin-top: 20px;
    margin-bottom: 10px;
  }
`;

export default function WelcomePage(userProfile) {
  const username = localStorage.getItem("username");
  return (
    <StyleWelcome>
      <NavBar />
      <div className="container">
        <h1>Welcome to AllAnime! {username}!</h1>
        <p>Your one-stop destination for all things anime!</p>

        <div className="boxes">
          <div className="box">
            <img src="/Naruto.png" alt="Random Anime Poster" />
            <h2>Latest Anime</h2>
            <p>Stay up-to-date on the newest and hottest anime releases.</p>
          </div>

          <div className="box">
            <img src="/Super.png" alt="Review Icon" />
            <h2>Leave Reviews</h2>
            <p>Share your thoughts and opinions on the anime you've watched.</p>
          </div>

          <div className="box">
            <img src="/Bleach.png" alt="Favorites Icon" />
            <h2>Track Your Favorites</h2>
            <p>Create a personalized list of your all-time favorite anime.</p>
          </div>

          <div className="box">
            <img src="/Slime.png" alt="Recommendations Icon" />
            <h2>Find Your Next Watch</h2>
            <Link to="/ShowList">Search Here!</Link>
            <p>Discover new anime recommendations based on your preferences.</p>
          </div>

          <div className="box">
            <img src="/MyHero.png" alt="Community Icon" />
            <h2>Join the AllAnime Community</h2>
            <p>
              Connect with fellow anime fans and expand your anime horizons.
            </p>
          </div>
        </div>
      </div>
    </StyleWelcome>
  );
}
