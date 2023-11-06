import { useState } from "react"
import { useParams } from "react-router-dom";
import NavBar from "../pages/NavBar";




export default function UserProfile() {
  const { username } = useParams;

  return (
    <>
      <div>
        <NavBar/>
        <h1>{username}'s Profile</h1>
        <img src="avatar.jpg" alt="Profile Picture" />
        <p>Bio: Hello World</p>
        <h2>Favorite Shows</h2>
        <ul>
          <li>Show 1</li>
          <li>Show 2</li>
          <li>Show 3</li>
        </ul>

        <h3>Leave a review here:</h3>
      </div>
    </>
  );
}
