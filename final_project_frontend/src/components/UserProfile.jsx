import { useState, useEffect } from "react";
import NavBar from "../pages/NavBar";
import styled from "styled-components";
import { useAuth } from "../AuthContext";
import ReviewSection from "./ReviewForm";

const UserProfileContainer = styled.div`
  background-color: #dc2f02;
  border: 1px solid #ffba08;
  padding: 100px;
  margin: 50px 50px 50px 50px;
`;

const ProfileHeader = styled.h1`
  color: #000;
  font-family: sans-serif;
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

const UserProfile = () => {
  const [userProfile, setUserProfile] = useState({});
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("");
  const [watchLaterShows, setWatchLaterShows] = useState([]);
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const userResponse = await fetch(
          `http://127.0.0.1:8000/user/${userId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: localStorage.getItem("access_token"),
            },
          }
        );

        const userData = await userResponse.json();
        if (userResponse.ok) {
          setUserProfile(userData);
        } else {
          // Handle error case
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const addToWatchLater = async () => {
    const result = await fetch("http://127.0.0.1:8000/shows/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: localStorage.getItem("access_token"),
      },
    });
    const data = await result.json();
    console.log({ result });
    console.log({ data });
    if (!result.ok) {
      throw new Error("Error adding show to watch later");
    }

    setWatchLaterShows(data);
  };

  useEffect(() => {
    addToWatchLater();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <UserProfileContainer>
        <ProfileHeader>{userProfile.username}'s Profile</ProfileHeader>
        {userProfile && (
          <div>
            <p>Bio: {userProfile.bio}</p>
            <img src={userProfile.avatar} />
          </div>
        )}
        {watchLaterShows && (
          <div>
            <h2>Watch Later</h2>
            <ul>
              {watchLaterShows.map((show) => (
                <li key={show.id}>{show.title}</li>
              ))}
            </ul>
          </div>
        )}
        <ReviewSection
          userProfile={userProfile}
          setReviews={setReviews}
          shows={setShows}
          newReview={newReview}
          setNewReview={setNewReview}
        />
      </UserProfileContainer>
    </div>
  );
};
export default UserProfile;
