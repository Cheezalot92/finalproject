import React from "react";
import { StyleWelcome } from "../components/WelcomePageCss";
import NavBar from "./NavBar";


export default function WelcomePage(props) {
    return (
        <StyleWelcome>
          <NavBar/>
    <div className="container">
      <h1>Welcome to AllAnime! {props.username}!</h1>
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
          <p>Discover new anime recommendations based on your preferences.</p>
        </div>

        <div className="box">
          <img src="/MyHero.png" alt="Community Icon" />
          <h2>Join the AllAnime Community</h2>
          <p>Connect with fellow anime fans and expand your anime horizons.</p>
        </div>
      </div>
            </div>
            </StyleWelcome>
  );
  
}