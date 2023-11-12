import { useState, useEffect } from "react";
import NavBar from "../pages/NavBar";
import styled from "styled-components";
import { useAuth } from "../AuthContext";

const UserProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 20px;
`;

const ProfileHeader = styled.h1`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ProfilePicture = styled.img`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 20px;
`;

const ProfileBio = styled.p`
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
`;

const FavoriteShowsHeading = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const FavoriteShowsList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  li {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

const ReviewSection = styled.div`
  margin-top: 20px;
  border: 1px solid #ccc;
  padding: 20px;
`;

const ReviewHeading = styled.h3`
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const ReviewInput = styled.textarea`
  width: 100%;
  height: 100px;
  resize: none;
  padding: 10px;
  border: 1px solid #ccc;
`;

const SubmitReviewButton = styled.button`
  background-color: #f6052d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [reviews, setReviews] = useState([]);
  const [shows, setShows] = useState([]);
  const [newReview, setNewReview] = useState({
    rating: "",
    reviewText: "",
  });
  const userId = localStorage.getItem("user_id")

  useEffect(() => {

    const init = async () => {
      const response = await fetch(`http://127.0.0.1:8000/user/${userId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("access_token"),
        },
      });
      const data = await response.json();
      console.log('My data', data);
      setUserProfile(data);
    };

    init();
    // Fetch user profile... needs to access specific user ID? save id , track token.
    
      /*.then((response) => response.json())
      .then((data) => { setUserProfile(data); console.log(data) })
      .catch((error) => console.error("Error fetching user profile:", error)); */

    // Fetch user's reviews
    fetch("http://127.0.0.1:8000/reviews/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access_token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error("Error fetching reviews:", error));

     // Fetch all shows
    fetch("http://127.0.0.1:8000/shows/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access_token"),
      },
    })
      .then((response) => response.json())
      .then((data) => setShows(data))
      .catch((error) => console.error("Error fetching shows:", error));
  }, []); // Empty dependency array ensures this effect runs once when the component mounts
  console.log({ userProfile });
  useEffect(() => {console.log("hello world")},[userProfile])
  return (
    <div>
      <NavBar />
      <h1>User Profile</h1>
      {userProfile && (
        <div>
          <p>Username: {userProfile.username}</p>
          <p>Bio: {userProfile.bio}</p>
          <img src={userProfile.avatar} />
        </div>
      )}

      <h2>Reviews</h2>
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>User: {review.user.username}</p>
            <p>Rating: {review.rating}</p>
            <p>Review Text: {review.review_text}</p>
          </li>
        ))}
      </ul>

      <h2>Shows</h2>
      <ul>
        {shows.map((show) => (
          <li key={show.id}>
            <p>Title: {show.title}</p>
            <p>Category: {show.category}</p>
            <p>Year: {show.year}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserProfile;
