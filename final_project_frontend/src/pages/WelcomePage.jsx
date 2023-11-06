import React from "react";
import { StyleWelcome } from "../components/WelcomePageCss";
import NavBar from "./NavBar";

export default function WelcomePage(props) {
    return (
        <StyleWelcome>
          <NavBar/>
    <div className="container">
      <h1>Welcome to Aniverse, {props.username}!</h1>
      <p>Your one-stop destination for all things anime!</p>

      <div className="boxes">
        <div className="box">
          <img src="anime-poster.jpg" alt="Random Anime Poster" />
          <h2>Latest Anime</h2>
          <p>Stay up-to-date on the newest and hottest anime releases.</p>
        </div>

        <div className="box">
          <img src="review-icon.png" alt="Review Icon" />
          <h2>Leave Reviews</h2>
          <p>Share your thoughts and opinions on the anime you've watched.</p>
        </div>

        <div className="box">
          <img src="favorites-icon.png" alt="Favorites Icon" />
          <h2>Track Your Favorites</h2>
          <p>Create a personalized list of your all-time favorite anime.</p>
        </div>

        <div className="box">
          <img src="recommendations-icon.png" alt="Recommendations Icon" />
          <h2>Find Your Next Watch</h2>
          <p>Discover new anime recommendations based on your preferences.</p>
        </div>

        <div className="box">
          <img src="community-icon.png" alt="Community Icon" />
          <h2>Join the Aniverse Community</h2>
          <p>Connect with fellow anime fans and expand your anime horizons.</p>
        </div>
      </div>
            </div>
            </StyleWelcome>
  );
  
}