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
  const userId = localStorage.getItem("user_id");
  const [loading, setLoading] = useState(true);

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
          
        }

        // Fetch reviews
        const reviewsResponse = await fetch("http://127.0.0.1:8000/reviews/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access_token"),
          },
        });

        const reviewsData = await reviewsResponse.json();
        if (reviewsResponse.ok) {
          setReviews(reviewsData);
        } else {
          
        }

        // Fetch shows
        const showsResponse = await fetch("http://127.0.0.1:8000/shows/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access_token"),
          },
        });

        const showsData = await showsResponse.json();
        if (showsResponse.ok) {
          setShows(showsData);
        } else {
          
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [userId]);

  const handleReviewSubmit = async (event) => {
    event.preventDefault();
  
    try {
      // new review submit.. 
      const reviewResponse = await fetch("http://127.0.0.1:8000/reviews/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("access_token"),
        },
        body: JSON.stringify({
          rating: newReview.rating,
          review_text: newReview.reviewText,
          user: userProfile.id,
          show: shows.title,
        }),
      });
  
      if (reviewResponse.ok) {
        // fetch review to show the new review.. 
        const reviewsResponse = await fetch("http://127.0.0.1:8000/reviews/", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: localStorage.getItem("access_token"),
          },
        });
  
        const reviewsData = await reviewsResponse.json();
        setReviews(reviewsData);
  
        //this is to clear the review..
        setNewReview({
          rating: "",
          reviewText: "",
        });
      } else {

      }
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }


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

<h2>Submit a Review</h2>
      <form onSubmit={handleReviewSubmit}>
        <label>
          Rating:
          <input
            type="number"
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: e.target.value })
            }
          />
        </label>
        <label>
          Review Text:
          <textarea
            value={newReview.reviewText}
            onChange={(e) =>
              setNewReview({ ...newReview, reviewText: e.target.value })
            }
          />
        </label>
        <button type="submit">Submit Review</button>
      </form>

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
