import { useState, useEffect } from "react";
import NavBar from "../pages/NavBar";
import styled from "styled-components";
import { useAuth } from "../AuthContext";
import ReviewSection from "./ReviewForm";

const UserProfileContainer = styled.div`
   background-color: #ff0000;
  border: 1px solid #0a0000;
  padding: 40px;
  margin: 20px 20px 20px 20px;
  
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
  const [shows, setShows] = useState([])
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState("")
  const userId = localStorage.getItem("user_id");

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch user profile
        const userResponse = await fetch(`http://127.0.0.1:8000/user/${userId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access_token"),
          },
        });

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <NavBar />
      <UserProfileContainer>
        <ProfileHeader>User Profile</ProfileHeader>
        {userProfile && (
          <div>
            <p>Username: {userProfile.username}</p>
            <p>Bio: {userProfile.bio}</p>
            <img src={userProfile.avatar} />
          </div>
        )}

<ReviewSection
          userProfile={userProfile}
          setReviews={setReviews}
          shows={shows}
          newReview={newReview}
          setNewReview={setNewReview}
        />
      </UserProfileContainer>
    </div>
  );
};

export default UserProfile;
