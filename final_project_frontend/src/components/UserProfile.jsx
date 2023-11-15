import { useState, useEffect } from "react";
import NavBar from "../pages/NavBar";
import styled from "styled-components";
import { useAuth } from "../AuthContext";
import ReviewSection from "./ReviewForm";

const UserProfileContainer = styled.div`
  background-color: #dc2f02;
  border: 1px solid #ffba08;
  padding: 50px;
  margin: 50px 50px;
  width: 100%;
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  display: grid;
  grid-template-columns: 1fr 2fr;
  grid-template-rows: 1fr 2fr;
  grid-gap: 10px;
  padding: 20px;

`;

const ProfileHeader = styled.h1`
  color: #000;
  font-family: sans-serif;
  font-size: 30px;
  text-align: center;
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
  text-align: center;
`;

const FavoriteShowsHeading = styled.h2`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ShowList = styled.ul`
  background-color: rgba(0, 0, 0, 0.377); /* Adjust the opacity value between 0 and 1 to control the transparency */
  padding: 10px;
  border: 4px solid #ffba08;
  border-radius: 5px;
  list-style-type: none;
  margin: 50px;
  li {
    color: white;
    font-size: 16px;
    margin-bottom: 10px;

  }
`;

const ShowListItem = styled.li`
  color: white;
  font-size: 16px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;

  button {
    background-color: #ffba08;
    color: white;
    padding: 5px 10px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
`;

const Div2 = styled.div`
  margin: 50px;
  

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
    const result = await fetch(`http://127.0.0.1:8000/shows/`, {
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


  const handleDeleteWatchLaterShow = async (showId) => {
    try {
      // Make an API call to remove the show from the user's watch later list
      const deleteResponse = await fetch(
        `http://127.0.0.1:8000/shows/${showId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access_token"),
          },
        }
      );
  
      if (!deleteResponse.ok) {
        throw new Error("Error removing show from watch later");
      }
  
      // Update the watchLaterShows state to remove the deleted show
      const updatedWatchLaterShows = watchLaterShows.filter(
        (show) => show.id !== showId
      );
      setWatchLaterShows(updatedWatchLaterShows);
    } catch (error) {
      console.error("Error removing show from watch later:", error);
    }
  };

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
    {userProfile.bio && <ProfileBio>Bio: {userProfile.bio}</ProfileBio>}
    {userProfile.avatar && <img src={userProfile.avatar} alt="User Avatar" />}
  </div>
)}
        {watchLaterShows && (
  <div>
    <h2>Show's I've Watched!</h2>
    <ShowList>
      {watchLaterShows.map((show) => (
        <ShowListItem key={show.id}>
          {show.title}
          <button onClick={() => handleDeleteWatchLaterShow(show.id)}>
            Remove
          </button>
        </ShowListItem>
      ))}
    </ShowList>
  </div>
)}
        <Div2>
        <ReviewSection
          userProfile={userProfile}
          setReviews={setReviews}
          shows={setShows}
          newReview={newReview}
          setNewReview={setNewReview}
          />
          </Div2>
      </UserProfileContainer>
    </div>
  );
};
export default UserProfile;
